<template>
  <div class="login_container">
    <div class="login_box">
      <!--头像区域-->
      <div class="avatar_box">
        <img src="../assets/PorygonZ.png" alt="PorygonZ">
      </div>
      <!--登录表单区-->
      <el-form class="login_form">
        <!--用户名-->
        <el-form-item>
          <el-input></el-input>
        </el-form-item>
        <!--密码-->
        <el-form-item>
          <el-input></el-input>
        </el-form-item>
        <!--按钮-->
        <el-form-item class="btns">
          <el-button type="primary">登录</el-button>
          <el-button type="info">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login'
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
