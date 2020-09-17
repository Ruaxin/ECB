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
      </el-row>
      <!--        表格区域-->
      <tree-table
        class="treeTable"
        :data="cateList"
        :selection-type="false"
        :expand-type="false"
        show-index
        index-text="#"
        border
        :show-row-hover="false"
        :columns="columns">
        <!--          是否有效-->
        <template v-slot:isok="scope">
          <i
            class="el-icon-success"
            style="color: #76bacc"
            v-if="scope.row.cat_deleted === false"></i>
          <i
            class="el-icon-error"
            style="color: #76bacc"
            v-else></i>
        </template>
        <!--          排序-->
        <template v-slot:order="scope">
          <el-tag v-if="scope.row.cat_level === 0">一级</el-tag>
          <el-tag type="success" v-else-if="scope.row.cat_level === 1">二级</el-tag>
          <el-tag type="warning" v-else>三级</el-tag>
        </template>
        <!--          操作-->
        <template v-slot:opt>
          <el-button size="mini" type="primary" icon="el-icon-edit">编辑</el-button>
          <el-button size="mini" type="danger" icon="el-icon-delete">删除</el-button>
        </template>
      </tree-table>
      <!--        分页区域-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="querInfo.pagenum"
        :page-sizes="[3,5, 10, 15]"
        :page-size="querInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
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
        // 自定义树形表单数据
        columns: [
          {
            label: '分类名称',
            prop: 'cat_name'
          },
          {
            label: '是否有效',
            // 表示将当前列定义为模板
            type: 'template',
            // 当前模板的名称
            template: 'isok'
          },
          {
            label: '排序',
            type: 'template',
            template: 'order'
          },
          {
            label: '操作',
            type: 'template',
            template: 'opt'
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
      },
      // 改变页面显示数
      handleSizeChange (newSize) {
        this.querInfo.pagesize = newSize
        this.getCateList()
      },
      handleCurrentChange (newPage) {
        this.querInfo.pagenum = newPage
        this.getCateList()
      }
    }
  }
</script>

<style lang="scss" scoped>
  .treeTable {
    margin-top: 15px;
  }
</style>
