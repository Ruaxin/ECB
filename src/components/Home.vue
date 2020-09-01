<template>
  <div>
    <el-container class="home-container">
      <el-header>
        <div>
          <img src="../assets/Gengar.png" alt="Gengar" class="gengar">
          <span>电商后台管理系统</span>
        </div>
        <el-button type="info" @click="logout">退出</el-button>
      </el-header>
      <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: 'Home',
    methods: {
      logout () {
        window.sessionStorage.clear()
        this.$router.push('/login')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .home-container {
    height: 100vh;
  }

  .el-header {
    background-color: #f7ce78;
    display: flex;
    justify-content: space-between;
    padding-left: 6px;
    align-items: center;
    color: #716696;
    font-size: 20px;

    > div {
      display: flex;
      align-items: center;

      > span {
        margin-left: 12px;
      }
    }
  }

  .el-aside {
    background-color: #cf5568;
  }

  .el-main {
    background-color: #76bacc;
  }

  .gengar {
    width: 56px;
    height: 56px;
  }
</style>
