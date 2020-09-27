<template>
  <div>
    <!--面包屑导航-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-alert
        title="添加商品信息"
        center
        show-icon
        :closable="false"
        type="info">
      </el-alert>
      <el-steps
        :space="200"
        :active="activeIndex - 0"
        align-center
        finish-status="success">
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <el-tabs
        tab-position="left"
        v-model="activeIndex"
        style="height: 200px;">
        <el-tab-pane label="基本信息" name="0">用户管理</el-tab-pane>
        <el-tab-pane label="商品参数" name="1">配置管理</el-tab-pane>
        <el-tab-pane label="商品属性" name="2">角色管理</el-tab-pane>
        <el-tab-pane label="商品图片" name="3">定时任务补偿</el-tab-pane>
        <el-tab-pane label="商品内容" name="4">定时任务补偿</el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Add',
  data () {
    return {
      activeIndex: '0'
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>

</style>
