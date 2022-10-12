<template>
    <div class="body-sale">
        <div class="left-body">
            <b-card class="search-nav-service">
              <b-row>
                  <b-col cols="8">
                    <b-form-group>
                      <b-form-input
                        v-model="keyWordSearchService"
                        placeholder="Tìm kiếm theo tên hoặc mã sản phẩm"
                        @input="searchService()"
                      />
                </b-form-group>
                  </b-col>
                  <b-col cols="4">
                    <b-button variant="primary" @click="searchService()" style="float: right;">
                        Tìm kiếm
                        <i class="fa-solid fa-magnifying-glass" style="font-size:14px;padding-left:5px"></i>
                    </b-button>
                  </b-col>
              </b-row>
            </b-card>
            <b-card no-body pills
              class="service-tabs">
                <b-tabs v-model="tabIndex" small card>
                    <b-tab
                        v-for="(menu, indexMenu) in listService"
                        :key="indexMenu"
                        :title="menu.MenuName"
                    >
                    <vue-custom-scrollbar
                        class="tab-content"
                        :settings="settingScroll"
                    >
                        <div class="service-list">
                            <div
                              v-for="(menuDetail, indexMenuDetail) in menu.MenuDetail"
                              :key="indexMenuDetail"
                              class="service-item"
                              @click="selectSevice(menuDetail)"
                              >
                                <div class="body-semi-bold">
                                    {{ menuDetail.ProductName }}
                                </div>
                                <div class="Quantity">
                                    SL: {{ menuDetail.Quantity }}
                                </div>
                                <div class="img-service">
                                  <img :src="menuDetail.ImgUrl" alt="" style="height:50px;margin-left: auto; margin-right: auto">
                                </div>
                                <div class="code">
                                    #{{ menuDetail.Code }}
                                </div>
                                <div class="price">
                                    {{ formatPrice(menuDetail.ProductTotalPrice) }}
                                </div>
                            </div>
                        </div>
                        </vue-custom-scrollbar>
                    </b-tab>
                </b-tabs>
            </b-card>
        </div>
        <div class="mid-body">
          <b-card 
            border-variant="1"
          >
          <template #header>
            <div class="d-flex" style="justify-content: space-between;min-height: 60px;">
              <i class="fa-solid fa-cart-shopping" style="font-size:40px ;margin: auto 0;"></i>
              <b-button variant="warning" style="margin: auto 0;font-weight: 900;font-size: 20px;" 
              @click="$refs.confirmPayment.open({
                  dataConfirm: {
                    title: 'Thanh toán',
                    content: 'Bạn có chắc chắn thanh toán hóa đơn?',
                  }
                })"
              > 
                Thanh toán
              </b-button>
            </div>
          </template>
          <div
              class="row golfer-info"
            >
              <div class="col-7">
                <div style="margin-bottom:8px;display: flex;justify-content: center;">
                  <b-avatar src="http://phunuvietnam.mediacdn.vn/media/news/33abffcedac43a654ac7f501856bf700/anh-profile-tiet-lo-g-ve-ban-1.jpg" size="100px" icon="people"></b-avatar>
                </div>
                <b-row>
                  <b-col>
                    <b-form-group>
                      <b-form-input
                        maxlength="60"
                        placeholder="Họ và tên"
                        v-model="addPayment.MemberName"
                      />
                    </b-form-group>
                  </b-col>
                </b-row>
              </div>

              <div class="col-5">
                <b-row>
                  <b-col
                    cols="12"
                    class="text-right"
                  >
                    <b-form-group>
                      <b-form-radio-group
                        button-variant="outline-primary"
                        buttons
                        class="sex-list"
                      >
                        <b-form-radio
                          v-for="option in listSex"
                          :key="option"
                          :value="option"
                          @click="addPayment.SexCode = option"
                        >
                           {{ option }}
                        </b-form-radio>
                      </b-form-radio-group>
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col>
                    <b-form-group>
                      <b-form-input
                        type="email"
                        maxlength="50"
                        placeholder="Email"
                        v-model="addPayment.Email"
                      />
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col>
                    <b-form-group>
                      <b-form-input
                        type="number"
                        maxlength="20"
                        placeholder="Số điện thoại"
                        v-model="addPayment.PhoneNumber"
                      />
                    </b-form-group>
                  </b-col>
                </b-row>
              </div>
            </div>
          </b-card>
          <b-card class="table-add-service">
            <b-table 
              class="table-service"
              small 
              sticky-header="true" 
              :fields="fields" 
              :items="items" 
              bordered
              head-variant="light"
              responsive="sm"
              style="max-height: calc(100vh - 440px);min-height: calc(100vh - 440px);"
              >
              <template #cell(ProductTotalPrice)="data">
                {{ formatPrice(data.item.ProductTotalPrice) }}
              </template>

              <template #cell(TotalAmount)="data">
                {{ formatPrice(data.item.TotalAmount) }}
              </template>

              <template #cell(Amount)="data">
                <input
                    style="max-width:75px;text-align: center;"
                    v-model="data.item.Amount"
                    type="number"
                    class="item-other-Quantity"
                    @input="changeTotalAmount(data.item)"
                  >
              </template>

              <template #cell(action)="data">
                <div @click="removeService(data.item.id)">
                  <i class="fa-sharp fa-solid fa-trash" style="color:red"></i>
                </div>
              </template>
            </b-table>
            <div class="allTotalAmount">
              <span>Thành tiền</span>
              <span>{{ formatPrice(SumAllTotalAmout()) }}</span>
            </div>
          </b-card>
        </div>

        <div class="right-body">
          <b-card class="timeline-payment">
            <b-row>
              <b-form-group>
                      <b-form-input
                        v-model="keyWordPayment"
                        placeholder="Tìm kiếm theo Mã hóa đơn, Tên khách hàng hoặc Số điện thoại"
                        @input="searchPayment()"
                      />
                </b-form-group>
            </b-row>
            <app-timeline style="margin-top:15px">
                <app-timeline-item
                  v-for="item in ListPayment"
                  :key="item"
                  :title="`Mã hóa đơn: ${item.PaymentCode}`"
                  :subtitle="`Tổng: ${formatPrice(item.TotalAmount)}`"
                  :subtitle2="`${item.MemberName}`"
                  :subtitle3="`${item.PhoneNumber}`"
                  :time="item.PaymentDate"
                  variant="success"
                />
              </app-timeline>
          </b-card>
        </div>
        <AddService
        ref="AddService"
        :service="serviceSelect"
        @event="handleEvent"
      />
      <confirm-dialog
      ref="confirmPayment"
      @confirmDialog="Payment"
    />
    </div>
</template>
<script>
import axios from "axios";
import AppTimeline from '@/components/AppTimeline.vue'
import AppTimelineItem from '@/components/AppTimelineItem.vue'
import { useToast } from "vue-toastification";
import ConfirmDialog from '@/components/ConfirmDialog.vue'
import AddService from '@/components/AddService.vue'
import dayjs from 'dayjs'
export default {
    data() {
        return {
            listService: null,
            allServices: null,
            keyWordSearchService: null,
            serviceSelect: null,
            addMember: {
            SexCode: null,
          },
          listSex: [
            'Nam',
            'Nữ',
            'Khác'
          ],
          fields: [
          { key: 'Code', label: 'Mã mặt hàng' },
          { key: 'ProductName', label: 'Tên mặt hàng' },
          { key: 'ProductTotalPrice', label: 'Đơn giá' },
          { key: 'Amount', label: 'Số lượng' },
          { key: 'TotalAmount', label: 'Tổng' },
          { key: 'action', label: '' },
        ],
        items: [],
        ListPayment : null,
        ListAllPayment: null,
        keyWordPayment: null,
        addPayment: {
          "id":null,
          "PaymentCode":null,
          "PaymentDate":null,
          "TotalAmount":null,
          "MemberName": null,
          "PhoneNumber":null,
          "Email":null,
          "SexCode": null
        },
        isExceedQuantity : false
        }
    },
    components: {
      AddService,
      AppTimeline,
      AppTimelineItem,
      'confirm-dialog': ConfirmDialog,
    },
    created() {
      this.getProductList()
      this.listPayment()
    },
    methods: {
      searchService() {
      const tmpAllService = []
      this.allServices.forEach(x => {
        const MenuDetail = []
        x.MenuDetail.forEach(y => {
          if(y.ProductName.toUpperCase().includes(this.keyWordSearchService.toUpperCase()) || y.Code.toUpperCase().includes(this.keyWordSearchService.toUpperCase())) {
            MenuDetail.push(y)
          }
        })
        if(MenuDetail.length > 0) {
          tmpAllService.push({
            MenuName: x.MenuName,
            MenuDetail: MenuDetail
          })
        }
      })
      this.listService = tmpAllService
    },
    async getProductList() {
      await axios.get(`http://localhost:3000/Product`).then(res => {
        const ProductList = []
        res.data.forEach(x => {
          if(!ProductList.find(y =>y.MenuName === x.MenuName)) {
            ProductList.push({
            MenuName: x.MenuName,
            MenuDetail: res.data.filter(z => z.MenuName === x.MenuName)
          })
          }
        })
        this.listService = ProductList
        this.allServices = ProductList
      }) 
    },
    handleEvent(data) {
      data.data.TotalAmount = this.sumTotalAmount(data.data.ProductTotalPrice,data.data.Amount)
      if (this.items.length > 0 ) {
        for(let i = 0; i< this.items.length;i++) {
          if(this.items[i].id === data.data.id) {
            this.items[i].Amount += data.data.Amount
            this.items[i].TotalAmount += data.data.TotalAmount
            break
        } else {
          this.items.push(data.data)
          break
        }
        }
      } else {
        this.items.push(data.data)
      }
    },
    selectSevice(menuDetail) {
      // console.log(menuDetail)
      this.serviceSelect = menuDetail
      this.$refs.AddService.open()
    },
    sumTotalAmount(Price,Amount) {
      return Price * Amount
    },
    changeTotalAmount(item) {
      this.items.find(x => {
        if(x.id == item.id) {
          x.TotalAmount = this.sumTotalAmount(item.ProductTotalPrice,item.Amount)
        }
      })
    },
    removeService(id) {
      this.items.find((x,index) => {
        // console.log(x,index)
        if(x.id === id) {
          this.items.splice(index,1)
        }
      })
    },
    SumAllTotalAmout() {
      let sum = 0
      this.items.forEach(x => {
        sum += x.TotalAmount
      })
      return sum
    },
    async listPayment() {
      await axios.get(`http://localhost:3000/Payment`).then(res => {
        const paymentTemp =  res.data.sort(function(a, b){
          if(new Date(a.PaymentDate) < new Date(b.PaymentDate)) {
                return 1
            } else {
                return -1
            }
        })
        this.ListPayment = paymentTemp
        this.ListAllPayment = paymentTemp
      }) 
    },
    searchPayment() {
      const tmpAllPayment = []
      this.ListAllPayment.forEach(x => {
        if(String(x.PaymentCode).includes(this.keyWordPayment.toUpperCase()) || x.MemberName.toUpperCase().includes(this.keyWordPayment.toUpperCase()) || String(x.PhoneNumber).includes(this.keyWordPayment.toUpperCase())) {
          tmpAllPayment.push(x)
        }
      })
      this.ListPayment = tmpAllPayment
    },
    async Payment() {
      // console.log(this.items)
      for (let i = 0; i < this.items.length; i++) {
        if(this.items[i].Quantity < this.items[i].Amount) {
          this.isExceedQuantity = true
          break
        } else {
          this.isExceedQuantity = false
        }
      }
      this.addPayment.id = this.ListPayment[0].id + 1 
      this.addPayment.PaymentDate = dayjs().format("DD/MM/YYYY HH:mm")
      this.addPayment.TotalAmount = this.SumAllTotalAmout()
      this.addPayment.PaymentCode = Math.floor(Math.random() * 1000000)
      if(!this.addPayment.MemberName && !this.addPayment.PhoneNumber) {
        useToast().error("Tên và số điện thoại khách hàng không thể bỏ trống", {
        timeout: 2000
        });
      } else if (!this.addPayment.TotalAmount){
        useToast().error("Vui lòng chọn ít nhất 1 mặt hàng", {
        timeout: 2000
        });
      } else if (this.isExceedQuantity){
        useToast().error("Đã có mặt hàng được chọn đã vượt quá số lượng mặt hàng. Vui lòng kiểm tra lại đơn hàng", {
        timeout: 2000
        });
      } else {
        await axios.post(`http://localhost:3000/Payment`,this.addPayment ).then(res => {
          useToast().success("Thành công", {
            timeout: 2000
          });
          for (let i = 0; i < this.items.length; i++) {
            this.inventoryUpdate(this.items[i])
          }
          setTimeout( ()=> {
            this.getProductList()
            this.listPayment()
            this.resetForm()
          },500)
      })
      }
    },
    async inventoryUpdate(data) {
      await axios.patch(`http://localhost:3000/Product/${data.id}`, {
            "Quantity": data.Quantity - data.Amount
        })
    },
    resetForm() {
      this.addPayment =  {
          "id":null,
          "PaymentCode":null,
          "PaymentDate":null,
          "TotalAmount":null,
          "MemberName": null,
          "PhoneNumber":null,
          "Email":null,
          "SexCode": null
        }
        this.items = []
    }
    }
}
</script>
<style lang="scss">
.body-sale {
  display: flex;
}
.left-body {
    .search-nav-service{
      max-height: 80px;
      margin: 5px;
    }
    width: 30%;
    border-right: 1px solid #e9ebf1;
    background-color: #f8f8f8;
    .service-tabs {
      margin:0 5px;
        ul {
          // margin: 15px 5px 15px 5px;
          > li > button {
            font-weight: 500;
            font-size: 12px;
            letter-spacing: 0.4px;
            color: #424244;
            &.active {
              color: #000;
              box-shadow: none;
            }
            &.disabled {
              opacity: 0.5;
            }
          }
        }
          .tab-content {
            height: calc(100vh - 60px - 80px - 50px);
            overflow: hidden;
            .service-list {
              display: flex;
              flex-wrap: wrap;
              max-width: 851px;
              .service-item {
                height: 120px;
                flex-grow: 1;
                width: 160px;
                max-width: 160px;
                background: #ffffff;
                box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.06);
                border-radius: 6px;
                margin: 5px;
                padding: 8px 10px;
                position: relative;
                .body-semi-bold {
                  padding-right: 15px;
                }
                .tag {
                  position: absolute;
                  top: 0;
                  right: 0;
                  background-color: #fdb913;
                  border-radius: 0 6px 0 6px;
                  width: 24px;
                  height: 24px;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                }
                .price {
                  position: absolute;
                  bottom: 8px;
                  right: 10px;
                  font-weight: 400;
                  font-size: 14px;
                  color: #5d5f65;
                  del {
                    color: #adafb6;
                  }
                }
                .Quantity {
                  position: absolute;
                  top: 8px;
                  right: 10px;
                  font-weight: 400;
                  font-size: 14px;
                  color: #5d5f65;
                  del {
                    color: #adafb6;
                  }
                }
                .img-service {
                  display: flex;
                  align-items: center;
                }
                .code {
                  position: absolute;
                  bottom: 10px;
                  left: 10px;
                  font-weight: 400;
                  font-size: 10px;
                  color: #fdb913;
                }
                &:hover,
                &.active {
                  cursor: pointer;
                  box-shadow: 0px 0px 10px rgba(17, 74, 159, 0.3);
                }
              }
            }
          }
        
      } 
}
.mid-body{
    width: 35%;
    margin: 5px 0;
    .table-add-service {
      margin-top: 5px;
      height: calc(100vh - 340px);
      .table-service::-webkit-scrollbar {
          width: 6px;
          background-color: #F5F5F5;
      } 
      td, div{
        text-align: center;
      }
    }
}
.right-body{
    width: 35%;
    margin: 5px;
    .timeline-payment {
      min-height: calc(100vh - 60px);
      max-height: calc(100vh - 60px);
      overflow-y: auto;
    }::-webkit-scrollbar {
          width: 6px;
          background-color: #F5F5F5;
      } 
}
.allTotalAmount {
  height:50px;
  display: flex;
  justify-content: space-between;
  font-size: 25px;
  font-weight: bold;
  background: #F08080;
  border-radius: 5px;
  span {
    margin: auto 0;
    padding: 0 5px;
  }
}
</style>