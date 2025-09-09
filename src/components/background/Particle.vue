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

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const canvas = ref(null)
let ctx = null
let animationId = null
let particles = []

// 配置参数
const config = {
  numParticles: 200,
  maxParticles: 100,
  velocity: 0.04,
  limit: 360,
  diffusion: 200,
  zoom: 1
}

// 相机对象
let camera = {
  obj: { x: 0, y: 0, z: 150 },
  dest: { x: 0, y: 0, z: 1 },
  dist: { x: 0, y: 0, z: 200 },
  ang: { cplane: 0, splane: 0, ctheta: 0, stheta: 0 },
  zoom: 1,
  disp: { x: 0, y: 0, z: 0 }
}

// 鼠标目标位置
let mouseTarget = { x: 0, y: 0 }

// 工具函数
const degToRad = (deg) => deg * Math.PI / 180
const random = () => Math.sin(Math.floor(Math.random() * 360) * Math.PI / 180)

// 更新相机
const updateCamera = () => {
  camera.dist.x = camera.dest.x - camera.obj.x
  camera.dist.y = camera.dest.y - camera.obj.y
  camera.dist.z = camera.dest.z - camera.obj.z

  camera.ang.cplane = -camera.dist.z / Math.sqrt(camera.dist.x * camera.dist.x + camera.dist.z * camera.dist.z)
  camera.ang.splane = camera.dist.x / Math.sqrt(camera.dist.x * camera.dist.x + camera.dist.z * camera.dist.z)
  camera.ang.ctheta = Math.sqrt(camera.dist.x * camera.dist.x + camera.dist.z * camera.dist.z) /
      Math.sqrt(camera.dist.x * camera.dist.x + camera.dist.y * camera.dist.y + camera.dist.z * camera.dist.z)
  camera.ang.stheta = -camera.dist.y / Math.sqrt(camera.dist.x * camera.dist.x + camera.dist.y * camera.dist.y + camera.dist.z * camera.dist.z)
}

// 3D变换函数
const transform3D = {
  scale: (p, scale) => ({
    x: p.x * scale.x,
    y: p.y * scale.y,
    z: p.z * scale.z
  }),

  rotateX: (p, angle) => ({
    x: p.x,
    y: p.y * Math.cos(degToRad(angle)) - p.z * Math.sin(degToRad(angle)),
    z: p.y * Math.sin(degToRad(angle)) + p.z * Math.cos(degToRad(angle))
  }),

  rotateY: (p, angle) => ({
    x: p.x * Math.cos(degToRad(angle)) + p.z * Math.sin(degToRad(angle)),
    y: p.y,
    z: -p.x * Math.sin(degToRad(angle)) + p.z * Math.cos(degToRad(angle))
  }),

  rotateZ: (p, angle) => ({
    x: p.x * Math.cos(degToRad(angle)) - p.y * Math.sin(degToRad(angle)),
    y: p.x * Math.sin(degToRad(angle)) + p.y * Math.cos(degToRad(angle)),
    z: p.z
  }),

  translate: (p, pos) => ({
    x: p.x + pos.x,
    y: p.y + pos.y,
    z: p.z + pos.z
  }),

  perspective: (p) => {
    const factor = camera.dist.z / p.z * camera.zoom
    return {
      x: p.x * factor,
      y: p.y * factor,
      z: p.z * camera.zoom,
      p: camera.dist.z / p.z
    }
  },

  toScreen: (p, disp) => ({
    x: p.x + disp.x,
    y: -p.y + disp.y,
    z: p.z + disp.z,
    p: p.p
  })
}

// 完整的3D变换流程
const applyTransforms = (vertex, scale, rotation, position, display) => {
  let p = transform3D.scale(vertex, scale)
  p = transform3D.rotateX(p, rotation.x)
  p = transform3D.rotateY(p, rotation.y)
  p = transform3D.rotateZ(p, rotation.z)
  p = transform3D.translate(p, position)

  // 相机变换
  p = {
    x: p.x * camera.ang.cplane + p.z * camera.ang.splane,
    y: p.y,
    z: p.x * -camera.ang.splane + p.z * camera.ang.cplane
  }

  p = {
    x: p.x,
    y: p.y * camera.ang.ctheta - p.z * camera.ang.stheta,
    z: p.y * camera.ang.stheta + p.z * camera.ang.ctheta
  }

  p = {
    x: p.x - camera.obj.x,
    y: p.y - camera.obj.y,
    z: p.z - camera.obj.z
  }

  p = transform3D.perspective(p)
  p = transform3D.toScreen(p, display)

  return p
}

// 粒子类
class Particle {
  constructor() {
    this.vertex = {
      x: random(),
      y: random(),
      z: random()
    }
    this.scale = { x: 0, y: 0, z: 0 }
    this.rotation = { x: 20, y: -20, z: 0 }
    this.position = {
      x: config.diffusion * Math.sin(360 * Math.random() * Math.PI / 180),
      y: config.diffusion * Math.sin(360 * Math.random() * Math.PI / 180),
      z: config.diffusion * Math.sin(360 * Math.random() * Math.PI / 180)
    }
    this.calc = {
      x: 360 * Math.random(),
      y: 360 * Math.random(),
      z: 360 * Math.random()
    }
    this.output = { x: 0, y: 0, z: 0, p: 0 }
  }

  update(globalRotation, objectSize) {
    // 更新计算值
    for (let key in this.calc) {
      this.calc[key] += config.velocity
      if (this.calc[key] > config.limit) this.calc[key] = 0
    }

    // 更新位置
    this.position = {
      x: config.diffusion * Math.cos(this.calc.x * Math.PI / 180),
      y: config.diffusion * Math.sin(this.calc.y * Math.PI / 180),
      z: config.diffusion * Math.sin(this.calc.z * Math.PI / 180)
    }

    this.rotation = globalRotation
    this.scale = objectSize

    // 应用3D变换
    this.output = applyTransforms(
        this.vertex,
        this.scale,
        this.rotation,
        this.position,
        camera.disp
    )
  }

  draw(ctx, index) {
    if (this.output.p < 0) return

    const gradient = ctx.createRadialGradient(
        this.output.x, this.output.y, this.output.p,
        this.output.x, this.output.y, this.output.p * 2
    )

    ctx.globalCompositeOperation = 'lighter'
    gradient.addColorStop(0, 'hsla(255, 255%, 255%, 1)')
    gradient.addColorStop(0.5, `hsla(${index + 2}, 85%, 40%, 1)`)
    gradient.addColorStop(1, `hsla(${index}, 85%, 40%, 0.5)`)

    ctx.fillStyle = gradient
    ctx.beginPath()
    ctx.arc(this.output.x, this.output.y, this.output.p * 2, 0, Math.PI * 2, false)
    ctx.fill()
    ctx.closePath()
  }
}

// 初始化粒子
const initParticles = () => {
  particles = []
  for (let i = 0; i < config.numParticles; i++) {
    particles.push(new Particle())
  }
}

// 添加粒子
const addParticle = () => {
  particles.push(new Particle())
}

// 更新场景
let globalRotation = { x: 0, y: 0, z: 0 }

const updateScene = () => {
  // 更新相机位置（鼠标跟踪）
  camera.obj.x += (mouseTarget.x - camera.obj.x) * 0.05
  camera.obj.y += (mouseTarget.y - camera.obj.y) * 0.05

  updateCamera()

  // 更新全局旋转
  globalRotation.x += 0.1
  globalRotation.y += 0.1
  globalRotation.z += 0.1

  // 获取画布尺寸
  const w = canvas.value.width
  const h = canvas.value.height

  const objectSize = {
    x: w / 5,
    y: h / 5,
    z: w / 5
  }

  // 更新所有粒子
  particles.forEach(particle => {
    particle.update(globalRotation, objectSize)
  })
}

// 渲染场景
const renderScene = () => {
  const w = canvas.value.width
  const h = canvas.value.height

  ctx.clearRect(0, 0, w, h)

  particles.forEach((particle, index) => {
    particle.draw(ctx, index)
  })
}

// 动画循环
const animate = () => {
  updateScene()
  renderScene()
  animationId = requestAnimationFrame(animate)
}

// 调整画布大小
const resizeCanvas = () => {
  if (canvas.value) {
    canvas.value.width = window.innerWidth
    canvas.value.height = window.innerHeight
    camera.disp.x = canvas.value.width / 2
    camera.disp.y = canvas.value.height / 2
  }
}

// 事件处理
const handleMouseMove = (event) => {
  if (!canvas.value) return
  mouseTarget.x = (event.clientX - canvas.value.width / 2) * -0.8
  mouseTarget.y = (event.clientY - canvas.value.height / 2) * 0.8
}

const handleTouchMove = (event) => {
  event.preventDefault()
  if (!canvas.value || !event.touches[0]) return
  mouseTarget.x = (event.touches[0].clientX - canvas.value.width / 2) * -0.8
  mouseTarget.y = (event.touches[0].clientY - canvas.value.height / 2) * 0.8
}

const addParticles = (event) => {
  if (event.type === 'touchstart') {
    event.preventDefault()
  }
  for (let i = 0; i < config.maxParticles; i++) {
    addParticle()
  }
}

// 生命周期
onMounted(() => {
  if (canvas.value) {
    ctx = canvas.value.getContext('2d')
    ctx.globalCompositeOperation = 'source-over'

    resizeCanvas()
    initParticles()
    animate()

    window.addEventListener('resize', resizeCanvas)
  }
})

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
  window.removeEventListener('resize', resizeCanvas)
})
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