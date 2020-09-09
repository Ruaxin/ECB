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
          <el-button type="primary" @click="addDialogVisible=true">添加角色</el-button>
        </el-col>
      </el-row>
      <!--      角色列表-->
      <el-table :data="roleList" border stripe>
        <el-table-column type="expand">
          <template v-slot="scope">
            <el-row :class="['bdbottom',i1 === 0 ? 'bdtop' : '']"
                    v-for="(item1,i1) in scope.row.children"
                    :key="item1.id">
              <!--              渲染一级权限-->
              <el-col :span="5">
                <el-tag>{{item1.authName}}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <!--              渲染二级和三级权限-->
              <el-col :span="19">
                <el-row :class="[i2 === 0 ? '' : 'bdtop']"
                        v-for="(item2,i2) in item1.children"
                        :key="item2.id">
                  <el-col :span="6">
                    <el-tag type="success">{{item2.authName}}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="18">
                    <el-tag type="warning"
                            v-for="(item3) in item2.children"
                            :key="item3.id">
                      {{item3.authName}}
                    </el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="roleName" label="角色名称"></el-table-column>
        <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
        <el-table-column label="操作" width="300px">
          <template v-slot="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              @click="showEditDialog(scope.row.id)"
              size="mini">编辑
            </el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              @click="removeRolesById(scope.row.id)"
              size="mini">删除
            </el-button>
            <el-button type="warning" icon="el-icon-setting" size="mini">分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!--添加角色对话框-->
    <el-dialog
      title="添加用户"
      :visible.sync="addDialogVisible"
      @close="addDialogClosed"
      width="50%">
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="70px">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="addForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="addForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRoles">确 定</el-button>
      </span>
    </el-dialog>
    <!--修改用户对话框-->
    <el-dialog
      title="修改角色"
      :visible.sync="editDialogVisible"
      @close="editDialogClosed"
      width="50%">
      <el-form
        :model="editForm"
        :rules="editFormRules"
        ref="editFormRef"
        label-width="70px">
        <el-form-item label="角色 ID">
          <el-input v-model="editForm.roleId" disabled></el-input>
        </el-form-item>
        <el-form-item label="角色名称">
          <el-input v-model="editForm.roleName" prop="roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="editForm.roleDesc" prop="roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editRolesInfo">确 定</el-button>
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
        addDialogVisible: false,
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
        editDialogVisible: false,
        editForm: [],
        editFormRules: {
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
      // 添加角色
      addDialogClosed () {
        this.$refs.addFormRef.resetFields()
      },
      addRoles () {
        this.$refs.addFormRef.validate(async (valid) => {
          if (valid) {
            const { data: res } = await this.$http.post('roles', this.addForm)
            if (res.meta.status === 201) {
              this.$message.success('添加角色成功')
              // 隐藏对话框
              this.addDialogVisible = false
              // 刷新列表
              this.getRolesList()
            } else {
              this.$message.error('添加角色失败')
            }
          }
        })
      },
      // 修改角色
      async showEditDialog (id) {
        const { data: res } = await this.$http.get(`roles/${id}`)
        if (res.meta.status === 200) {
          this.editForm = res.data
          this.editDialogVisible = true
        } else {
          this.$message.error('查询用户信息失败')
        }
      },
      editDialogClosed () {
        this.$refs.editFormRef.resetFields()
      },
      editRolesInfo () {
        this.$refs.editFormRef.validate(async (valid) => {
          if (valid) {
            const { data: res } = await this.$http.put(`roles/${this.editForm.roleId}`, this.editForm)
            if (res.meta.status === 200) {
              this.$message.success('修改成功')
              this.editDialogVisible = false
              this.getRolesList()
            } else {
              this.$message.error('修改失败')
            }
          }
        })
      },
      // 删除
      async removeRolesById (id) {
        const confirmResult = await this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(error => error)
        if (confirmResult === 'confirm') {
          const { data: res } = await this.$http.delete(`roles/${id}`)
          if (res.meta.status === 200) {
            this.$message.success('删除角色成功')
            this.getRolesList()
          } else {
            this.$message.error('删除角色失败')
          }
        } else {
          this.$message.info('已取消删除')
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .el-tag {
    margin: 7px;
  }

  .bdtop {
    border-top: 1px solid #eee;
  }

  .bdbottom {
    border-bottom: 1px solid #eee;
  }
</style>
