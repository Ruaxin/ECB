<template>
  <div>
    <!--面包屑导航-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--    卡片视图-->
    <el-card>
      <!--      添加角色按钮区-->
      <el-row>
        <el-col>
          <el-button type="primary" @click="addRolesVisible=true">添加角色</el-button>
        </el-col>
      </el-row>
      <!--      角色列表-->
      <el-table :data="roleList" border stripe>
        <el-table-column type="expand"></el-table-column>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="roleName" label="角色名称"></el-table-column>
        <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
        <el-table-column label="操作" width="300px">
          <template>
            <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
            <el-button type="warning" icon="el-icon-setting" size="mini">分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!--添加用户对话框-->
    <el-dialog
      title="添加用户"
      :visible.sync="addRolesVisible"
      @close="addRolesClosed"
      width="50%">
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="70px">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="addForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="oleDesc">
          <el-input v-model="addForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addRolesVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRoles">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'Roles',
    data () {
      return {
        roleList: [],
        addRolesVisible: false,
        addForm: {
          roleName: '',
          roleDesc: '',
        },
        addFormRules: {
          roleName: [
            {
              roleName: true,
              message: '请输入角色名称',
              trigger: 'blur'
            },
            {
              min: 3,
              max: 10,
              message: '长度在 3 到 10 个字符',
              trigger: 'blur'
            }
          ],
          roleDesc: [
            {
              required: false,
              message: '请输入角色描述',
              trigger: 'blur'
            }
          ]
        },
      }
    },
    created () {
      this.getRolesList()
    },
    methods: {
      async getRolesList () {
        const { data: res } = await this.$http.get('roles')
        if (res.meta.status === 200) {
          this.roleList = res.data
        } else {
          this.$message.error('获取角色列表失败')
        }
      },
      // 添加角色重置
      addRolesClosed () {
        this.$refs.addFormRef.resetFields()
      },
      addRoles () {
        this.$refs.addFormRef.validate(async (valid) => {
          if (valid) {
            const { data: res } = await this.$http.post('roles', this.addForm)
            if (res.meta.status === 201) {
              this.$message.success('添加角色成功')
              // 隐藏对话框
              this.addRolesVisible = false
              // 刷新列表
              this.getRolesList()
            } else {
              this.$message.error('添加角色失败')
            }
          }
        })
      },
    }
  }
</script>

<style lang="scss" scoped>

</style>
