<template>
  <div class="login_container">
    <div class="login_box">
      <!--头像区域-->
      <div class="avatar_box">
        <img src="../assets/PorygonZ.png" alt="PorygonZ">
      </div>
      <!--登录表单区-->
      <el-form ref="loginFormRef" class="login_form" :model="loginForm" :rules="loginFormRules">
        <!--用户名-->
        <el-form-item prop="username">
          <el-input prefix-icon="iconfont icon-user" v-model="loginForm.username"></el-input>
        </el-form-item>
        <!--密码-->
        <el-form-item prop="password">
          <el-input type="password" prefix-icon="iconfont icon-3702mima" v-model="loginForm.password"></el-input>
        </el-form-item>
        <!--按钮-->
        <el-form-item class="btns">
          <el-button type="primary">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      // 验证合法
      loginFormRules: {
        username: [
          {
            required: true,
            message: '请输入登录名称',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 10,
            message: '长度在 3 到 10 个字符',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入登录密码',
            trigger: 'blur'
          },
          {
            min: 6,
            max: 15,
            message: '长度在 6 到 15 个字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    resetLoginForm () {
      // resetFields方法是ele提供的
      this.$refs.loginFormRef.resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
  .login_container {
    background-color: #76bacc;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    > .login_box {
      width: 450px;
      height: 300px;
      background-color: #f7ce78;
      border-radius: 3px;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;

      > .avatar_box {
        height: 130px;
        width: 130px;
        border: 1px solid #eee;
        border-radius: 50%;
        padding: 6px;
        transform: translateY(-50%);
        background-color: #bbbbaa;
        box-shadow: 0 0 10px #ddd;

        > img {
          width: 100%;
          height: 100%;
          background-color: #e7e7d8;
          border-radius: 50%;
        }
      }
    }
  }

  .login_form {
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
    margin-top: -36px;
  }

  .btns {
    display: flex;
    justify-content: flex-end;
  }
</style>
