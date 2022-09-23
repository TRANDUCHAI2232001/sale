<template>
  <section class="sidebar-detail w-100 h-100 fixed-top d-flex justify-content-end" :class="{'d-none': !isOpen}">
    <div class="overlay-background w-100 h-100 position-absolute" @click="close"></div>
    <b-nav vertical class="sidebar-detail__menu w-50 bg-white fixed-right">
      <slot>
        <b-nav-item active>Active</b-nav-item>
        <b-nav-item>Link</b-nav-item>
        <b-nav-item>Another Link</b-nav-item>
        <b-nav-item disabled>Disabled</b-nav-item>
      </slot>
    </b-nav>
</section>
  </template>
  <script>
  export default {
    props: {
      hasOpen: {
        type: Boolean,
        default: false,
      }
    },
    data() {
        return {
            isOpen: false
        }
    },
    
    methods: {
        open() {
            this.isOpen = true;
        },
        close() {
          this.isOpen = false;
        }
    },
    watch: {
      hasOpen: function(value) {
        this.isOpen = value;
      }
    },
    mounted() {
      this.isOpen = this.hasOpen;
      console.log('mounted isOpen', this.isOpen);
    }
  }
  </script>
  <style lang="scss" scoped>
    .sidebar-detail {
      &__menu {
        z-index: 1030;
      }
      .overlay-background {
        background: #0000009e;
        z-index: 1029;
      }
    }
  </style>
  
  