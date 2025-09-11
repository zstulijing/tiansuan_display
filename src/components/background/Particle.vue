<template>
  <div class="particle-container">
    <canvas
        ref="canvas"
        @mousemove="handleMouseMove"
        @touchmove.passive="handleTouchMove"
        @mousedown="addParticles"
        @touchstart.passive="addParticles"
    ></canvas>
  </div>
</template>

<script>
export default {
  name: 'ParticleAnimation',
  data() {
    return {
      ctx: null,
      animationId: null,
      particles: [],
      // 配置参数
      config: {
        numParticles: 200,
        maxParticles: 100,
        velocity: 0.04,
        limit: 360,
        diffusion: 200,
        zoom: 1
      },
      // 相机对象
      camera: {
        obj: { x: 0, y: 0, z: 150 },
        dest: { x: 0, y: 0, z: 1 },
        dist: { x: 0, y: 0, z: 200 },
        ang: { cplane: 0, splane: 0, ctheta: 0, stheta: 0 },
        zoom: 1,
        disp: { x: 0, y: 0, z: 0 }
      },
      // 鼠标目标位置
      mouseTarget: { x: 0, y: 0 },
      // 全局旋转
      globalRotation: { x: 0, y: 0, z: 0 }
    }
  },

  mounted() {
    if (this.$refs.canvas) {
      this.ctx = this.$refs.canvas.getContext('2d')
      this.ctx.globalCompositeOperation = 'source-over'

      this.resizeCanvas()
      this.initParticles()
      this.animate()

      window.addEventListener('resize', this.resizeCanvas)
    }
  },

  beforeDestroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId)
    }
    window.removeEventListener('resize', this.resizeCanvas)
  },

  methods: {
    // 工具函数
    degToRad(deg) {
      return deg * Math.PI / 180
    },

    random() {
      return Math.sin(Math.floor(Math.random() * 360) * Math.PI / 180)
    },

    // 更新相机
    updateCamera() {
      this.camera.dist.x = this.camera.dest.x - this.camera.obj.x
      this.camera.dist.y = this.camera.dest.y - this.camera.obj.y
      this.camera.dist.z = this.camera.dest.z - this.camera.obj.z

      this.camera.ang.cplane = -this.camera.dist.z / Math.sqrt(this.camera.dist.x * this.camera.dist.x + this.camera.dist.z * this.camera.dist.z)
      this.camera.ang.splane = this.camera.dist.x / Math.sqrt(this.camera.dist.x * this.camera.dist.x + this.camera.dist.z * this.camera.dist.z)
      this.camera.ang.ctheta = Math.sqrt(this.camera.dist.x * this.camera.dist.x + this.camera.dist.z * this.camera.dist.z) /
          Math.sqrt(this.camera.dist.x * this.camera.dist.x + this.camera.dist.y * this.camera.dist.y + this.camera.dist.z * this.camera.dist.z)
      this.camera.ang.stheta = -this.camera.dist.y / Math.sqrt(this.camera.dist.x * this.camera.dist.x + this.camera.dist.y * this.camera.dist.y + this.camera.dist.z * this.camera.dist.z)
    },

    // 3D变换函数
    transform3DScale(p, scale) {
      return {
        x: p.x * scale.x,
        y: p.y * scale.y,
        z: p.z * scale.z
      }
    },

    transform3DRotateX(p, angle) {
      return {
        x: p.x,
        y: p.y * Math.cos(this.degToRad(angle)) - p.z * Math.sin(this.degToRad(angle)),
        z: p.y * Math.sin(this.degToRad(angle)) + p.z * Math.cos(this.degToRad(angle))
      }
    },

    transform3DRotateY(p, angle) {
      return {
        x: p.x * Math.cos(this.degToRad(angle)) + p.z * Math.sin(this.degToRad(angle)),
        y: p.y,
        z: -p.x * Math.sin(this.degToRad(angle)) + p.z * Math.cos(this.degToRad(angle))
      }
    },

    transform3DRotateZ(p, angle) {
      return {
        x: p.x * Math.cos(this.degToRad(angle)) - p.y * Math.sin(this.degToRad(angle)),
        y: p.x * Math.sin(this.degToRad(angle)) + p.y * Math.cos(this.degToRad(angle)),
        z: p.z
      }
    },

    transform3DTranslate(p, pos) {
      return {
        x: p.x + pos.x,
        y: p.y + pos.y,
        z: p.z + pos.z
      }
    },

    transform3DPerspective(p) {
      const factor = this.camera.dist.z / p.z * this.camera.zoom
      return {
        x: p.x * factor,
        y: p.y * factor,
        z: p.z * this.camera.zoom,
        p: this.camera.dist.z / p.z
      }
    },

    transform3DToScreen(p, disp) {
      return {
        x: p.x + disp.x,
        y: -p.y + disp.y,
        z: p.z + disp.z,
        p: p.p
      }
    },

    // 完整的3D变换流程
    applyTransforms(vertex, scale, rotation, position, display) {
      let p = this.transform3DScale(vertex, scale)
      p = this.transform3DRotateX(p, rotation.x)
      p = this.transform3DRotateY(p, rotation.y)
      p = this.transform3DRotateZ(p, rotation.z)
      p = this.transform3DTranslate(p, position)

      // 相机变换
      p = {
        x: p.x * this.camera.ang.cplane + p.z * this.camera.ang.splane,
        y: p.y,
        z: p.x * -this.camera.ang.splane + p.z * this.camera.ang.cplane
      }

      p = {
        x: p.x,
        y: p.y * this.camera.ang.ctheta - p.z * this.camera.ang.stheta,
        z: p.y * this.camera.ang.stheta + p.z * this.camera.ang.ctheta
      }

      p = {
        x: p.x - this.camera.obj.x,
        y: p.y - this.camera.obj.y,
        z: p.z - this.camera.obj.z
      }

      p = this.transform3DPerspective(p)
      p = this.transform3DToScreen(p, display)

      return p
    },

    // 创建粒子
    createParticle() {
      return {
        vertex: {
          x: this.random(),
          y: this.random(),
          z: this.random()
        },
        scale: { x: 0, y: 0, z: 0 },
        rotation: { x: 20, y: -20, z: 0 },
        position: {
          x: this.config.diffusion * Math.sin(360 * Math.random() * Math.PI / 180),
          y: this.config.diffusion * Math.sin(360 * Math.random() * Math.PI / 180),
          z: this.config.diffusion * Math.sin(360 * Math.random() * Math.PI / 180)
        },
        calc: {
          x: 360 * Math.random(),
          y: 360 * Math.random(),
          z: 360 * Math.random()
        },
        output: { x: 0, y: 0, z: 0, p: 0 }
      }
    },

    // 更新粒子
    updateParticle(particle, globalRotation, objectSize) {
      // 更新计算值
      for (let key in particle.calc) {
        particle.calc[key] += this.config.velocity
        if (particle.calc[key] > this.config.limit) particle.calc[key] = 0
      }

      // 更新位置
      particle.position = {
        x: this.config.diffusion * Math.cos(particle.calc.x * Math.PI / 180),
        y: this.config.diffusion * Math.sin(particle.calc.y * Math.PI / 180),
        z: this.config.diffusion * Math.sin(particle.calc.z * Math.PI / 180)
      }

      particle.rotation = globalRotation
      particle.scale = objectSize

      // 应用3D变换
      particle.output = this.applyTransforms(
          particle.vertex,
          particle.scale,
          particle.rotation,
          particle.position,
          this.camera.disp
      )
    },

    // 绘制粒子
    drawParticle(particle, index) {
      if (particle.output.p < 0) return

      const gradient = this.ctx.createRadialGradient(
          particle.output.x, particle.output.y, particle.output.p,
          particle.output.x, particle.output.y, particle.output.p * 2
      )

      this.ctx.globalCompositeOperation = 'lighter'
      gradient.addColorStop(0, 'hsla(255, 255%, 255%, 1)')
      gradient.addColorStop(0.5, `hsla(${index + 2}, 85%, 40%, 1)`)
      gradient.addColorStop(1, `hsla(${index}, 85%, 40%, 0.5)`)

      this.ctx.fillStyle = gradient
      this.ctx.beginPath()
      this.ctx.arc(particle.output.x, particle.output.y, particle.output.p * 2, 0, Math.PI * 2, false)
      this.ctx.fill()
      this.ctx.closePath()
    },

    // 初始化粒子
    initParticles() {
      this.particles = []
      for (let i = 0; i < this.config.numParticles; i++) {
        this.particles.push(this.createParticle())
      }
    },

    // 添加粒子
    addParticle() {
      this.particles.push(this.createParticle())
    },

    // 更新场景
    updateScene() {
      // 更新相机位置（鼠标跟踪）
      this.camera.obj.x += (this.mouseTarget.x - this.camera.obj.x) * 0.05
      this.camera.obj.y += (this.mouseTarget.y - this.camera.obj.y) * 0.05

      this.updateCamera()

      // 更新全局旋转
      this.globalRotation.x += 0.1
      this.globalRotation.y += 0.1
      this.globalRotation.z += 0.1

      // 获取画布尺寸
      const w = this.$refs.canvas.width
      const h = this.$refs.canvas.height

      const objectSize = {
        x: w / 5,
        y: h / 5,
        z: w / 5
      }

      // 更新所有粒子
      this.particles.forEach(particle => {
        this.updateParticle(particle, this.globalRotation, objectSize)
      })
    },

    // 渲染场景
    renderScene() {
      const w = this.$refs.canvas.width
      const h = this.$refs.canvas.height

      this.ctx.clearRect(0, 0, w, h)

      this.particles.forEach((particle, index) => {
        this.drawParticle(particle, index)
      })
    },

    // 动画循环
    animate() {
      this.updateScene()
      this.renderScene()
      this.animationId = requestAnimationFrame(this.animate)
    },

    // 调整画布大小
    resizeCanvas() {
      if (this.$refs.canvas) {
        this.$refs.canvas.width = window.innerWidth
        this.$refs.canvas.height = window.innerHeight
        this.camera.disp.x = this.$refs.canvas.width / 2
        this.camera.disp.y = this.$refs.canvas.height / 2
      }
    },

    // 事件处理
    handleMouseMove(event) {
      if (!this.$refs.canvas) return
      this.mouseTarget.x = (event.clientX - this.$refs.canvas.width / 2) * -0.8
      this.mouseTarget.y = (event.clientY - this.$refs.canvas.height / 2) * 0.8
    },

    handleTouchMove(event) {
      event.preventDefault()
      if (!this.$refs.canvas || !event.touches[0]) return
      this.mouseTarget.x = (event.touches[0].clientX - this.$refs.canvas.width / 2) * -0.8
      this.mouseTarget.y = (event.touches[0].clientY - this.$refs.canvas.height / 2) * 0.8
    },

    addParticles(event) {
      if (event.type === 'touchstart') {
        event.preventDefault()
      }
      for (let i = 0; i < this.config.maxParticles; i++) {
        this.addParticle()
      }
    }
  }
}
</script>


<style scoped>
.particle-container {
  pointer-events: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(ellipse farthest-corner at center center, #1b44e4 0%, #020f3a 100%);
  cursor: move;
  overflow: hidden;
  opacity: .2
}

canvas {
  display: block;
}
</style>