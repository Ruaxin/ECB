<template>
  <div>
    <!--面包屑导航-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>参数列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--    卡片-->
    <el-card class="box-card">
      <el-alert
        title="注意：只允许为第三级分类设置相关参数"
        type="warning"
        :closable="false"
        show-icon>
      </el-alert>
      <el-row class="cat_opt">
        <el-col>
          <span>选择商品分类：</span>
          <el-cascader
            v-model="selectedCateKeys"
            :options="cateList"
            :props="propsList"
            class="parCascader"
            @change="handleChange"></el-cascader>
        </el-col>
      </el-row>
      <el-tabs v-model="activeName" @tab-click="handleTabClick">
        <el-tab-pane label="动态参数" name="many">
          <el-button
            type="primary"
            size="mini"
            @click="addDialogVisible=true"
            :disabled="isBtnDisabled">添加参数
          </el-button>
          <el-table
            :data="manyTableData"
            stripe
            border>
            <el-table-column type="expand"></el-table-column>
            <el-table-column type="index" label="#"></el-table-column>
            <el-table-column prop="attr_name" label="参数名称"></el-table-column>
            <el-table-column label="操作">
              <template>
                <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
                <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="静态属性" name="only">
          <el-button
            type="primary"
            size="mini"
            @click="addDialogVisible=true"
            :disabled="isBtnDisabled">添加属性
          </el-button>
          <el-table
            :data="onlyTableData"
            stripe
            border>
            <el-table-column type="expand"></el-table-column>
            <el-table-column type="index" label="#"></el-table-column>
            <el-table-column prop="attr_name" label="属性名称"></el-table-column>
            <el-table-column label="操作">
              <template>
                <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
                <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <!--    添加参数对话框-->
    <el-dialog
      :title="'添加'+titleText"
      :visible.sync="addDialogVisible"
      @close="addDialogClosed"
      width="50%">
      <el-form
        ref="addFormRef"
        :model="addForm"
        :rules="addFormRules"
        label-width="100px">
        <el-form-item prop="attr_name" :label="titleText">
          <el-input v-model="addForm.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="addDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addParams">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'Params',
    data () {
      return {
        cateList: [],
        propsList: {
          expandTrigger: 'hover',
          value: 'cat_id',
          label: 'cat_name',
          children: 'children'
        },
        selectedCateKeys: [],
        activeName: 'many',
        manyTableData: [],
        onlyTableData: [],
        addDialogVisible: false,
        addForm: { attr_name: '' },
        addFormRules: {
          attr_name: {
            required: true,
            message: '请输入参数名称',
            trigger: 'blur'
          },
        },
      }
    },
    created () {
      this.getCateList()
    },
    methods: {
      async getCateList () {
        const { data: res } = await this.$http.get('categories')
        if (res.meta.status === 200) {
          this.cateList = res.data
        } else {
          this.$message.error('商品分类数据列表失败')
        }
      },
      handleChange () {
        this.getParamsData()
      },
      handleTabClick () {
        this.getParamsData()
      },
      async getParamsData () {
        if (this.selectedCateKeys.length === 3) {
          const { data: res } = await this.$http.get(`categories/${this.cateId}/attributes`, { params: { sel: this.activeName } })
          if (res.meta.status === 200) {
            if (this.activeName === 'many') {
              this.manyTableData = res.data
            } else {
              this.onlyTableData = res.data
            }
          }
        } else {
          this.selectedCateKeys = []
        }
      },
      addDialogClosed () {
        this.$refs.addFormRef.resetFields()
      },
      addParams () {
        this.$refs.addFormRef.validate(async valid => {
          if (valid) {
            const { data: res } = await this.$http.post(`categories/${this.cateId}/attributes`, {
              attr_name: this.addForm.attr_name,
              attr_sel: this.activeName
            })
            if (res.meta.status === 201) {
              this.$message.success('添加参数成功')
            } else {
              this.$message.error('添加参数失败')
            }
            this.addDialogVisible = false
            this.getParamsData()
          }
        })
      }
    },
    computed: {
      isBtnDisabled () {
        return this.selectedCateKeys.length !== 3
      },
      cateId () {
        if (this.selectedCateKeys.length === 3) {
          return this.selectedCateKeys[2]
        } else {
          return null
        }
      },
      titleText () {
        return this.activeName === 'many' ? '动态参数' : '静态属性'
      }
    }
  }
</script>

<style lang="scss" scoped>
  .cat_opt {
    margin: 15px 0;
  }

  .parCascader {
    width: 300px;
  }
</style>
