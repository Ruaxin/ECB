<template>
  <div>
    <!--面包屑导航-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <!--    卡片视图-->
    <el-card>
      <el-row>
        <el-col>
          <el-button type="primary">添加商品</el-button>
        </el-col>
        <!--        表格区域-->
        <tree-table
          :data="cateList"
          :selection-type="false"
          :expand-type="false"
          show-index
          index-text="#"
          border
          :show-row-hover="false"
          :columns="columns"></tree-table>
        <!--        分页区域-->
      </el-row>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: 'Cate',
    data () {
      return {
        // 商品分类的数据列表
        cateList: [],
        querInfo: {
          type: 3,
          pagenum: 1,
          pagesize: 5
        },
        // 总数据条数
        total: 0,
        columns: [
          {
            label: '分类名称',
            prop: 'cat_name'
          }
        ]
      }
    },
    created () {
      this.getCateList()
    },
    methods: {
      // 获取商品分类数据
      async getCateList () {
        const { data: res } = await this.$http.get('categories', { params: this.querInfo })
        if (res.meta.status === 200) {
          this.cateList = res.data.result
          this.total = res.data.total
        } else {
          this.$message.error('获取商品分类失败')
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
