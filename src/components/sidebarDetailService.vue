<template>
    <b-navbar
      id="sidebar-detail-service"
      v-model="isOpen"
      shadow
      bg-variant="white"
      backdrop
      right
      title="Chi tiết mặt hàng"
    >
    <div>
      abc
    </div>
    </b-navbar>
  </template>
  <script>
  export default {
    data() {
        return {
            isOpen: true
        }
    },
    methods: {
        open() {
            this.isOpen = true
            console.log(this.isOpen)
        }
    }
  }
  </script>
  <style lang="">
    
  </style>
  
  