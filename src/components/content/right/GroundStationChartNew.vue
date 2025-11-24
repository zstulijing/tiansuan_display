<script>
import ChartBox from "@/components/content/ChartBox.vue";
export default {
  components: {
    ChartBox
  }
}
</script>

<template>
  <chart-box>
    <template #title>地面站信息</template>
    <template #content>


      <div class="ground-station-info">
        <el-row style="margin-top:15px">
          <span style="float: left;font-weight: bold;">
            地面站名称：
          </span>
          <span style="float: right; width:60%">
            <span style="float: left;">天算华东站</span>
          </span>
        </el-row>

        <el-row style="margin-top:15px">
          <span style="float: left;font-weight: bold;">
            <i class="el-icon-user" style="margin-right:5px" />归属类型:
          </span>
          <span style="float: right; width:60%">
            <span style="float: left;">天算华东站</span>
          </span>
        </el-row>
        <el-row style="margin-top:20px">
          <span style="float: left;font-weight: bold;">
            <i class="el-icon-map-location"/>
            经纬度：
          </span>
          <span style="float: right; width:60%">
            <span style="float: left;">121.39, 37.52</span>
          </span>
        </el-row>
        <el-row style="margin-top:20px">
          <span style="float: left;font-weight: bold;">
            <i class="el-icon-d-caret"/>
            海拔高度：
          </span>
          <span style="float: right; width:60%">
            <span style="float: left;">47.8 m</span>
          </span>
        </el-row>
        <el-row style="margin-top:20px">
          <span style="float: left;font-weight: bold;">
            <i class="el-icon-position"/>
            天线类型：
          </span>
          <span style="float: right; width:60%">
            <span style="float: left;">Cross Yagi (UHF)</span>
          </span>
        </el-row>
        <el-row style="margin-top:20px">
          <span style="float: left;font-weight: bold;">
            <i class="el-icon-circle-check"/>
            历史成功率：
          </span>
          <span style="float: right; width:60%">
            <span style="float: left;">0.82</span>
          </span>
        </el-row>
        <el-row style="margin-top:20px">
          <span style="float: left;font-weight: bold;">
            <i class="el-icon-time"/>
            历史观测次数：
          </span>
          <span style="float: right; width:60%">
            <span style="float: left;">9627</span>
          </span>
        </el-row>
      </div>

    </template>
  </chart-box>
</template>

<style scoped lang="less">
.ground-station-info {
  margin-top: 20px;
  color: #ffffffAA;
}

</style>