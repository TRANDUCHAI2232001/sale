<template>
  <section class="sidebar-detail w-100 h-100 fixed-top d-flex justify-content-end" :class="{'d-none': !isOpen}">
    <div class="overlay-background w-100 h-100 position-absolute" @click="close"></div>
    <div class="sidebar-detail__menu w-50 bg-white fixed-right">
      <div class="header-sidebar">
        <h4 v-if="!isDetail">
          Chi tiết mặt hàng 
        </h4>
        <h4 v-else>
          Thêm mới mặt hàng
        </h4>
        <div class="right-header">
          <b-button v-if="!isDetail" variant="light" @click="updateService">Cập nhật</b-button>
          <b-button v-else variant="light" @click="addProduct()">Lưu</b-button>
          <div>
            <i class="fa-solid fa-xmark" @click="close"></i>
          </div>
        </div>
      </div>
      <div class="body-sidebar">
        <div v-if="service">
          <div class=" d-flex justify-content-center">
            <img :src="service.ImgUrl" alt="" style="height:250px;margin-left: auto; margin-right: auto">
          </div>
          <b-row class="row-productInfo">
            <b-col  class="d-flex input-productname">
              <span style="margin: auto 0; width: 15%">Tên mặt hàng: </span>
              <b-form-group>
                <b-form-input
                style="margin: auto 0"
                  maxlength="60"
                  placeholder="Tên mặt hàng"
                  v-model="service.ProductName"
                />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row class="row-productInfo">
            <b-col class="d-flex input-productname">
              <span style="margin: auto 0; width: 15%">Loại mặt hàng: </span>
              <b-form-group>
                <b-form-input
                style="margin: auto 0"
                  maxlength="60"
                  placeholder="Loại mặt hàng"
                  v-model="service.MenuName"
                />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row class="row-productInfo">
            <b-col  class="d-flex input-productname">
              <span style="margin: auto 0; width: 15%">Mã mặt hàng: </span>
              <b-form-group>
                <b-form-input
                style="margin: auto 0"
                  maxlength="60"
                  placeholder="Mã mặt hàng"
                  v-model="service.Code"
                />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row class="row-productInfo">
            <b-col  class="d-flex input-productname">
              <span style="margin: auto 0; width: 15%">Đơn giá: </span>
              <b-form-group>
                <b-form-input
                style="margin: auto 0"
                  maxlength="60"
                  placeholder="Đơn giá"
                  v-model="service.ProductTotalPrice"
                />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row class="row-productInfo">
            <b-col  class="d-flex input-productname">
              <span style="margin: auto 0; width: 15%">Số lượng: </span>
              <b-form-group>
                <b-form-input
                style="margin: auto 0"
                  maxlength="60"
                  placeholder="Số lượng"
                  v-model="service.Quantity"
                />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row class="row-productInfo">
            <b-form-group>
              <b-col cols="12" class="d-flex input-productname">
                <span style="margin: auto 0; width: 15%;">Link ảnh mặt hàng: </span>
                <b-form-input
                style="margin: auto 0"
                  maxlength="60"
                  placeholder="Link ảnh"
                  v-model="service.ImgUrl"
                />
              </b-col>
              </b-form-group>
          </b-row>
        </div>
        <div v-else>
          <div class=" d-flex justify-content-center">
            <img v-if="addService.ImgUrl" :src="addService.ImgUrl" alt="" style="height:250px;margin-left: auto; margin-right: auto">
          </div>
          <b-row class="row-productInfo">
            <b-col  class="d-flex input-productname">
              <span style="margin: auto 0; width: 15%">Tên mặt hàng: </span>
              <b-form-group>
                <b-form-input
                style="margin: auto 0"
                  maxlength="60"
                  placeholder="Nhập tên mặt hàng"
                  v-model="addService.ProductName"
                />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row class="row-productInfo">
            <b-col class="d-flex input-productname">
              <span style="margin: auto 0; width: 15%">Loại mặt hàng: </span>
              <b-form-group>
                <b-form-input
                style="margin: auto 0"
                  maxlength="60"
                  placeholder="Nhập loại mặt hàng"
                  v-model="addService.MenuName"
                />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row class="row-productInfo">
            <b-col  class="d-flex input-productname">
              <span style="margin: auto 0; width: 15%">Mã mặt hàng: </span>
              <b-form-group>
                <b-form-input
                style="margin: auto 0"
                  maxlength="60"
                  placeholder="Nhập mã mặt hàng"
                  v-model="addService.Code"
                />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row class="row-productInfo">
            <b-col  class="d-flex input-productname">
              <span style="margin: auto 0; width: 15%">Đơn giá: </span>
              <b-form-group>
                <b-form-input
                style="margin: auto 0"
                  maxlength="60"
                  placeholder="Nhập đơn giá"
                  v-model="addService.ProductTotalPrice"
                />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row class="row-productInfo">
            <b-col  class="d-flex input-productname">
              <span style="margin: auto 0; width: 15%">Số lượng: </span>
              <b-form-group>
                <b-form-input
                style="margin: auto 0"
                  maxlength="60"
                  placeholder="Nhập số lượng"
                  v-model="addService.Quantity"
                />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row class="row-productInfo">
            <b-form-group>
              <b-col cols="12" class="d-flex input-productname">
                <span style="margin: auto 0; width: 15%;">Link ảnh mặt hàng: </span>
                <b-form-input
                style="margin: auto 0"
                  placeholder="Nhập link ảnh"
                  v-model="addService.ImgUrl"
                />
              </b-col>
              </b-form-group>
          </b-row>
        </div>
      </div>
    </div>
</section>
  </template>
  <script>
    import { useToast } from "vue-toastification";
    import axios from "axios";
  export default {
    props: {
      service: {
        type: Object,
        default: {}
      },
      isDetail: {
        type: Boolean
      },
      idIndex: {
        type:Number
      }
    },
    data() {
        return {
            isOpen: false,
            addService: {
              "MenuName": null,
              "ProductTotalPrice": null,
              "ProductName": null,
              "ImgUrl": null,
              "Code": null,
              "Quantity": null
            }
        }
    },
    
    methods: {
        open() {
            this.isOpen = true;
        },
        close() {
          this.isOpen = false;
        },
        async updateService() {
          await axios.patch(`http://localhost:3000/Product/${this.service.id}`, {
              "MenuName": this.service.MenuName,
              "ProductTotalPrice": this.service.ProductTotalPrice,
              "ProductName": this.service.ProductName,
              "ImgUrl": this.service.ImgUrl,
              "Code": this.service.Code,
              "Quantity": this.service.Quantity
          }).then(res => {
            useToast().success("Thành công", {
              timeout: 2000
            });
            this.$emit('event',{type: 'afterUpdateService'})
            this.close()
          })
        },
        async addProduct() {
          await axios.post(`http://localhost:3000/Product`, {
            "MenuName": this.addService.MenuName,
              "ProductTotalPrice": Number(this.addService.ProductTotalPrice),
              "ProductName": this.addService.ProductName,
              "ImgUrl": this.addService.ImgUrl,
              "Code": this.addService.Code,
              "Quantity": this.addService.Quantity,
              "id": this.idIndex + 1
          }).then(res => {
            useToast().success("Thành công", {
              timeout: 2000
            });
            this.$emit('event',{type: 'afterAddService'})
            this.close()
          })
        }
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
      .header-sidebar {
        height:50px;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid;
        background: #114A9F;
        color: #fff;
        h4 {
          padding-left:10px ;
          margin: auto 0 ;
        }
        .right-header {
          display: flex;
          margin: auto 0 ;
          div > i {
          cursor: pointer;
          padding:0 20px ;
          font-size: 25px;
        }
        }
      }
    }
    .input-productname {
        .is-invalid {
          margin-bottom: 0 !important;
        }
      }
      .row-productInfo {
        margin-left:5px ;
        margin-top: 20px;
      }
  </style>
  
  