<template lang="">
    <div>
        <b-modal
            id="updateWareHouse"
            size="lg"
            v-model="isOpen"
            centered
            hide-header
            cancel-variant="none"
            ok-title="Lưu"
            cancel-title="Quay lại"
            ok-variant="primary"
            :no-close-on-backdrop="true"
            @ok="UpdateProductList"
        >
            <b-card-header style="height:40px;color: #114A9F;">
                <div class="d-flex justify-content-between align-items-center block-header">
                    <h4 class="mb-0 title-modal color-primary">
                        Nhập kho
                    </h4>
                </div>
            </b-card-header>
            <b-card-body>
                <b-form-group>
                  <v-select
                  v-if="listService"
                    multiple
                    taggable
                    placeholder="Tìm kiếm theo tên sản phẩm"
                    label="ProductName"
                    :options="listService"
                    @input="SearchProduct()"
                    v-model="serviceSelect"
                  />
                </b-form-group>
                <b-table 
                v-if="serviceSelect"
                    class="table-service"
                    small 
                    sticky-header="true" 
                    :fields="fields" 
                    :items="serviceSelect" 
                    bordered
                    head-variant="light"
                    responsive="sm"
                    >
                    <template #cell(ProductTotalPrice)="data">
                        {{ formatPrice(data.item.ProductTotalPrice) }}
                    </template>

                    <template #cell(Amount)="data">
                        <input
                            style="max-width:75px;text-align: center;"
                            v-model="data.item.Amount"
                            type="number"
                            class="item-other-Quantity"
                        >
                    </template>

                    <template #cell(action)="data">
                        <div @click="removeService(data.item.id)">
                        <i class="fa-sharp fa-solid fa-trash" style="color:red"></i>
                        </div>
                    </template>
                    </b-table>
            </b-card-body>
        </b-modal>
    </div>
</template>
<script>
import axios from "axios";
import { useToast } from "vue-toastification";
import dayjs from 'dayjs'
export default {
    data() {
        return {
            isOpen: false,
            listService: null,
            serviceSelect: null,
            fields: [
                { key: 'Code', label: 'Mã mặt hàng' },
                { key: 'MenuName', label: 'Loại mặt hàng' },
                { key: 'ProductName', label: 'Tên mặt hàng' },
                { key: 'ProductTotalPrice', label: 'Đơn giá' },
                { key: 'Amount', label: 'Số lượng' },
                { key: 'action', label: '' },
            ],
            listGoodsReceipt: null
        }
    },
    created() {
        this.getProductList()
        this.getListGoodsReceipt()
    },
    watch: {
        serviceSelect() {
            // console.log(this.serviceSelect)
        }
    },
    methods: {
        open() {
            this.isOpen = true
        },
        async getProductList() {
            await axios.get(`http://localhost:3000/Product`).then(res => {
                this.listService = res.data
                this.listService.forEach(X => {
                    X.Amount = 0
                })
            }) 
        },
        removeService(ProductId) {
            this.serviceSelect.find((x, index) => {
                if(x.id == ProductId) {
                    this.serviceSelect.splice(index , 1)
                }
            })
        },
        async UpdateProductList() {
            console.log(this.serviceSelect)
            const check =  this.serviceSelect.filter(x => x.Amount < 0 || x.Amount == 0)
            if(check.length > 0 ){
                useToast().error("Số lượng phải lớn hơn 0", {
                        timeout: 2000
                });
            } else {
                await this.GoodsReceipt(this.serviceSelect)
                for (let i = 0; i < this.serviceSelect.length;i++) {
                var total = this.serviceSelect[i].Quantity + this.serviceSelect[i].Amount
                await axios.patch(`http://localhost:3000/Product/${this.serviceSelect[i].id}`, {
                    "Quantity": total
                }).then(res => {
                    if(res.status === 200) {
                        this.isOpen = false
                        useToast().success("Thành công", {
                        timeout: 2000
                        });
                        this.$emit('event',{type: 'afterUpdateService'})
                    }
                })
            }
            }
            
        },
        async GoodsReceipt(data) {
            let i = 0
            data.forEach(x => {
                i = i + (x.ProductTotalPrice * x.Amount)
            })
            const body = {
                GoodsReceiptDate :dayjs().format("DD/MM/YYYY"),
                TotalAmount: i,
                id: this.listGoodsReceipt[this.listGoodsReceipt.length - 1].id + 1
            }
            await axios.post(`http://localhost:3000/GoodsReceipt`, body).then(res => {
                console.log(res)
            })
        },
        async getListGoodsReceipt() {
            await axios.get(`http://localhost:3000/GoodsReceipt`).then(res => {
                this.listGoodsReceipt = res.data
            })
        }
    }
}
</script>
<style lang="scss">
#updateWareHouse {
    
}
</style>