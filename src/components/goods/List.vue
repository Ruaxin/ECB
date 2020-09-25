<template>
  <div>
    <!--面包屑导航-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            placeholder="请输入内容">
            <el-button
              slot="append"
              icon="el-icon-search">
            </el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary">添加用户</el-button>
        </el-col>
      </el-row>
      <el-table :data="goodsList" border stripe>
        <el-table-column label="#" type="index"/>
        <el-table-column label="商品名称" prop="goods_name"/>
        <el-table-column width="120px" label="商品价格(元)" prop="goods_price"/>
        <el-table-column width="110px" label="商品重量" prop="goods_weight"/>
        <el-table-column width="160px" label="创建时间">
          <template v-slot="scope">
            {{ scope.row.add_time|dateFormat }}
          </template>
        </el-table-column>
        <el-table-column width="130px" label="操作">
          <template>
            <el-button type="primary" icon="el-icon-edit" size="mini"/>
            <el-button type="danger" icon="el-icon-delete" size="mini"/>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'List',
  data () {
    return {
      // 查询
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 10
      },
      goodsList: [],
      total: 0,
    }
  },
  created () {
    this.getGoodsList()
  },
  methods: {
    async getGoodsList () {
      const { data: res } = await this.$http.get('goods', {
        params: this.queryInfo
      })
      if (res.meta.status === 200) {
        this.goodsList = res.data.goods
        this.total = res.data.total
      } else {
        this.$message.error('获取商品列表失败')
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
