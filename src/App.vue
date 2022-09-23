
<template>
  <header>
  <div class="left-nav">
    <img alt="Vue logo" class="logo" src="https://webcanthogiare.com/uploads/post/menu_1570072368051_o_1dm7pm4tfunkt951lovkav144cd.jpg" width="35" height="35" />
    <span style="padding:5px">Sale Management</span>
  </div>

  <div class="right-nav">
    <b-nav card-header pills>
      <b-nav-item to="/sale" active-class="active" style="margin-right: 5px;">Bán hàng</b-nav-item>
      <b-nav-item to="/ware-house" active-class="active" style="margin-right: 5px;">Kho</b-nav-item>
    </b-nav>
  </div>
</header>
  <!-- <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header> -->

  <RouterView class="RouterView"/>
</template>
<script >
  import { RouterLink, RouterView } from 'vue-router'
  export default {
    methods: {
      components: {
      },
    }
  }
</script>
<style lang="scss">
header {
  padding: 0 20px;
  display: flex;
  min-height: 50px;
  align-items: center;
  background: #114A9F;
  color: #fff;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
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
                                    