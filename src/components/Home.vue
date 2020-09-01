<template>
  <div>
    <el-container class="home-container">
      <el-header>
        <div>
          <img src="../assets/Ball.png" alt="Ball" class="ball">
          <span>电商后台管理系统</span>
        </div>
        <el-button type="info" @click="logout">退出</el-button>
      </el-header>
      <el-container>
        <!--侧边栏-->
        <el-aside width="200px">
          <el-menu
            background-color="#cf5568"
            text-color="#fff"
            active-text-color="#ffd04b">
            <!--一级菜单-->
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>导航一</span>
              </template>
              <!--二级菜单-->
              <el-menu-item index="1-4-1">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>二级</span>
                </template>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
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
    color: #333c4f;
    font-size: 20px;
    font-weight: bold;

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

  .ball {
    width: 56px;
    height: 56px;
  }
</style>
