<template lang="">
  <div>
    <b-modal
          v-if="service"
            id="add-service"
            size="lg"
            v-model="isOpen"
            centered
            hide-header
            cancel-variant="none"
            ok-title="Thêm dịch vụ"
            cancel-title="Quay lại"
            ok-variant="primary"
            :no-close-on-backdrop="true"
            @ok="saveService"
        >
            <b-card-header style="height:40px">
                <div class="d-flex justify-content-between align-items-center block-header">
                    <p class="mb-0 title-modal color-primary">
                        Thêm mặt hàng
                    </p>
                </div>
            </b-card-header>
            <b-card-body>
              <b-form-group>
            <p class="mb-0">
              Tên dịch vụ
            </p>
            <b-form-input
              placeholder="Tên dịch vụ"
              v-model="service.ProductName"
            />
          </b-form-group>
          <b-form-group>
            <p class="mb-0">
              Giá
            </p>
            <cleave
              class="form-control"
              :raw="true"
              :options="number"
              placeholder="1,000,000"
              v-model="service.ProductTotalPrice"
            />
          </b-form-group>
            <b-form-group>
              <p class="mb-0">
                Số lượng
              </p>
              <b-form-input
                placeholder="Số lượng"
                v-model="numberSelect"
              />
            </b-form-group>
            </b-card-body>
        </b-modal>
  </div>
</template>
<script>
import  Cleave  from 'vue-cleave-component'
import { useToast } from "vue-toastification";
export default {
  props: [
    'service'
  ],
  components: {
    Cleave
  },

  data() {
    return {
      isOpen: false,
      number: {
        numeral: true,
        numeralThousandsGroupStyle: 'thousand',
      },
      numberSelect: 1
    }
  },
  methods: {
    open() {
      this.isOpen = true
    },
    hideModal() {
        this.$bvModal.hide('modal-sendEmail')
    },
    saveService() {
      if(this.service.ProductName.length > 0 && this.service.ProductTotalPrice.length > 0 && String(this.numberSelect).length > 0 ) {
        this.service.Amount = this.numberSelect
        this.$emit('event',{data: this.service})
      } else {
        useToast().error("Tên mặt hàng,đơn giá hoặc số lượng không được bỏ trống", {
        timeout: 2000
        });
      }
    }
  }
}
</script>
<style lang="scss">
#add-service {
  .block-header {
    .title-modal {
      font-style: normal;
      font-weight: 500;
      font-size: 18px;
      line-height: 21px;
    }
  }

  .color-primary {
    color: #114A9F;
  }
  .content-body-modal {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
  }


  .block {
    margin-top: 20px;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .dot {
      width: 10px;
      height: 10px;
      border-radius: 100%;
      padding: 0;
    }

    p {
      margin-bottom: 0;
      margin-left: 10px;
    }
  }
  .inputEmail{
    display: flex;
    margin-bottom: 10px;
  }
}
</style>