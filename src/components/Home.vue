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
        <el-aside :width="isCollapse? '64px' : '200px'">
          <div class="toggle-button" @click="toggleCollapse">|||</div>
          <el-menu
            background-color="#de7f8b"
            text-color="#333c4f"
            :unique-opened="true"
            :collapse="isCollapse"
            :collapse-transition="false"
            active-text-color="#ffd04b">
            <!--一级菜单-->
            <el-submenu :index="item.id+''" v-for="item in menuList" :key="item.id">
              <template slot="title">
                <i :class="iconsObj[item.id]"></i>
                <span>{{item.authName}}</span>
              </template>
              <!--二级菜单-->
              <el-menu-item :index="subItem.id+''" v-for="subItem in item.children" :key="subItem.id">
                <template slot="title">
                  <i class="el-icon-s-help"></i>
                  <span>{{subItem.authName}}</span>
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
    created () {
      this.getMenuList()
    },
    data () {
      return {
        menuList: [],
        iconsObj: {
          '125': 'iconfont icon-user',
          '103': 'iconfont icon-tijikongjian',
          '101': 'iconfont icon-shangpin',
          '102': 'iconfont icon-danju',
          '145': 'iconfont icon-baobiao',
        },
        isCollapse: false
      }
    },
    methods: {
      // 登录
      logout () {
        window.sessionStorage.clear()
        this.$router.push('/login')
      },
      // 获取侧边栏菜单
      async getMenuList () {
        const { data: res } = await this.$http.get('menus')
        if (res.meta.status === 200) {
          this.menuList = res.data
        }
        console.log(res)
      },
      toggleCollapse () {
        this.isCollapse = !this.isCollapse
      }
    }
  }
</script>

<style lang="scss" scoped>
  .home-container {
    height: 100vh;

    > .el-header {
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

        > .ball {
          width: 56px;
          height: 56px;
        }

        > span {
          margin-left: 12px;
        }
      }
    }
  }

  .el-aside {
    background-color: #de7f8b;
    font-weight: 600;

    > .el-menu {
      border-right: none;
    }

  }

  .el-main {
    background-color: #76bacc;
  }

  .iconfont {
    margin-right: 6px;
  }

  .el-icon-s-help {
    color: #333c4f;
  }

  .toggle-button {
    background-color: #cf5568;
    font-size: 16px;
    line-height: 36px;
    color: #333c4f;
    text-align: center;
    letter-spacing: 0.6em;
    cursor: pointer;
    font-weight: bold;
  }
</style>
