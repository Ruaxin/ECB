<template>
  <div>
    <el-container class="home-container">
      <el-header>
        Header
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
  }

  .el-aside {
    background-color: #cf5568;
  }

  .el-main {
    background-color: #76bacc;
  }
</style>
