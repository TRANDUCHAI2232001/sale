
<template>
  <div>
    <header v-if="isLogin">
    <div class="d-flex">
      <div class="left-nav">
      <b-link href="/">
        <img alt="Vue logo" class="logo" src="https://webcanthogiare.com/uploads/post/menu_1570072368051_o_1dm7pm4tfunkt951lovkav144cd.jpg" width="35" height="35" />
        <span style="padding:5px;color: #fff; text-decoration: none !important;">Sale Management</span>
      </b-link>
    </div>

    <div class="right-nav">
      <b-nav card-header pills>
        <b-nav-item to="/sale" active-class="active" style="margin-right: 5px;">Bán hàng</b-nav-item>
        <b-nav-item to="/ware-house" active-class="active" style="margin-right: 5px;">Kho</b-nav-item>
        <b-nav-item to="/Revenue" active-class="active" style="margin-right: 5px;">Kiểm toán</b-nav-item>
      </b-nav>
    </div>
    </div>
    <div class="nav-user">
      <b-nav-item-dropdown
      right
      toggle-class="d-flex align-items-center dropdown-user-link"
      class="user-dropdown"
    >
      <template #button-content>
        <div class="d-sm-flex d-none">
          <span class="user-name font-weight-bolder pr-50" style="padding-right: 10px;">
            <template v-if="userData">
              {{ userData.userName }}
            </template>
          </span>
          <i class="fa-solid fa-user" style="margin:auto 0"></i>
        </div>
      </template>
      <b-dropdown-item
        link-class="d-flex align-items-center"
        @click="LogOut"
      >
      <i class="fa-solid fa-arrow-right-from-bracket" style="margin-right:5px"></i>
        <span>Đăng xuất</span>
      </b-dropdown-item>
    </b-nav-item-dropdown>
    </div>
  </header>
    <RouterView class="RouterView"/>
  </div>
</template>
<script >
  import { RouterLink, RouterView } from 'vue-router'
  export default {
    data() {
      return{
        userData: JSON.parse(localStorage.getItem("userData"))
      }
    },
    computed: {
      isLogin() {
        if(localStorage.getItem("userData")) {
          return true
        } else {
          return false
        }
      }
    },
    methods: {
      LogOut() {
        localStorage.removeItem('userData')
        this.$router.push({ name: 'LogIn' })
        setTimeout(() => {
          window.location.reload()
        },100)
      }
    }
  }
</script>
<style lang="scss">
header {
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  min-height: 50px;
  align-items: center;
  background: #114A9F;
  color: #fff;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  .left-nav {
    a {
      text-decoration: none;
    }
  }
  .right-nav{
    padding-left: 20px ;
    a {
      color: #fff;
      text-decoration: none;
    }
    li:hover {
      background: #fff;
      border-radius: 5px;
      a {
        color: #000;
      }
    }
    .nav-pills .nav-link.active, .nav-pills .show > .nav-link {
    color: #000 ;
    background-color: #fff;
}
  }
  .nav-user {
    .btn-secondary { 
    background: #114A9F;
    border: none;
    }
    .dropdown-toggle::after {
      display: none;
    }
    .dropdown-menu {
      padding: 0;
    }
    li {
      list-style-type: none;
    }
  }
}
.RouterView {
  width: 100%;
  position: absolute;
  top: 50px;
}
.nav-select {
  background: #fff;
  border-radius: 5px;
}
</style>
                                    