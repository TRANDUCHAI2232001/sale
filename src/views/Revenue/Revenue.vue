<template>
  <div>
    <div class="d-flex">
      <div style="width:50%">
        <BarChart
          v-if="this.testData.labels"
          :chartData="testData" 
          :options="options"
        />
      </div>
      <div style="width:50%;margin-left: 20px;" >
        <p class="tilteRevenueByDay">Chi tiết doanh thu theo ngày {{ todayRevenueTitle }}</p>
        <div class="RevenueByDay d-flex">
          <div class="itemRevenueByDay" style="background: #CEF6F5;">
          <p>Tổng số lượt mua hàng</p>
          <h2>{{ NumberOfPaymentOnDay }}</h2>
        </div>
        <div class="itemRevenueByDay" style="background: #81F79F;">
            <p>Tổng doanh thu</p>
            <h2>{{ formatPrice(RevenueOnDay) }}</h2>
        </div>
        <div class="itemRevenueByDay" style="background: #FA5858;">
          <p>Tổng chi phí</p>
          <h2> {{ formatPrice(CostOnDay)}}</h2>
        </div>
        </div>
        <div class="d-flex justify-content-center">
          <div class="totalRevenueByDay">
            <h1>Tổng lợi nhuận theo ngày</h1>
            <h2>{{ formatPrice( RevenueOnDay - CostOnDay ) }}</h2>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom-body">
      <p class="title-table">Bảng doanh thu và chi phí năm 2022</p>
      <DxDataGrid
            ref="tablePackage"
            :height="150"
            class="table-serivce"
            :show-borders="false"
            :data-source="listData"
            :show-column-lines="true"
            :show-row-lines="true"
            :allow-column-reordering="true"
            :allow-column-resizing="true"
            column-resizing-mode="widget"
            :column-auto-width="true"
        >
        <DxColumn
            v-for="(item, i) in configTable"
            :caption="item.caption"
            :data-field="item.field"
            :data-type="item.type"
            :alignment="item.alignment"
            :cell-template="(item.cellTemplate) ? item.cellTemplate : false"
            :width="item.width"
            >

        </DxColumn>
        <template #t1 ="{ data }">
          <div v-if="data.data.T1 != 0 "> 
            {{ formatPrice(data.data.T1) }}
          </div>
          <div v-else>
            0
          </div>
        </template>
        <template #t2 ="{ data }">
          <div v-if="data.data.T2 != 0 "> 
            {{ formatPrice(data.data.T2) }}
          </div>
          <div v-else>
            0
          </div>
        </template>
        <template #t3 ="{ data }">
          <div v-if="data.data.T3 != 0 "> 
            {{ formatPrice(data.data.T3) }}
          </div>
          <div v-else>
            0
          </div>
        </template>
        <template #t4 ="{ data }">
          <div v-if="data.data.T4 != 0 "> 
            {{ formatPrice(data.data.T4) }}
          </div>
          <div v-else>
            0
          </div>
        </template>
        <template #t5 ="{ data }">
          <div v-if="data.data.T5 != 0 "> 
            {{ formatPrice(data.data.T5) }}
          </div>
          <div v-else>
            0
          </div>
        </template>
        <template #t6 ="{ data }">
          <div v-if="data.data.T6 != 0 "> 
            {{ formatPrice(data.data.T6) }}
          </div>
          <div v-else>
            0
          </div>
        </template>
        <template #t7 ="{ data }">
          <div v-if="data.data.T7 != 0 "> 
            {{ formatPrice(data.data.T7) }}
          </div>
          <div v-else>
            0
          </div>
        </template>
        <template #t8 ="{ data }">
          <div v-if="data.data.T8 != 0 "> 
            {{ formatPrice(data.data.T8) }}
          </div>
          <div v-else>
            0
          </div>
        </template>
        <template #t9 ="{ data }">
          <div v-if="data.data.T9 != 0 "> 
            {{ formatPrice(data.data.T9) }}
          </div>
          <div v-else>
            0
          </div>
        </template>
        <template #t10 ="{ data }">
          <div v-if="data.data.T10 != 0 "> 
            {{ formatPrice(data.data.T10) }}
          </div>
          <div v-else>
            0
          </div>
        </template>
        <template #t11 ="{ data }">
          <div v-if="data.data.T11 != 0 "> 
            {{ formatPrice(data.data.T11) }}
          </div>
          <div v-else>
            0
          </div>
        </template>
        <template #t12 ="{ data }">
          <div v-if="data.data.T12 != 0 "> 
            {{ formatPrice(data.data.T12) }}
          </div>
          <div v-else>
            0
          </div>
        </template>

      </DxDataGrid>
    </div>
  </div>
</template>

<script lang="ts">
import { BarChart } from 'vue-chart-3';
import { Chart, registerables } from "chart.js";
import axios from "axios";
import dayjs from 'dayjs'
import {
  DxDataGrid,
  DxColumn,
  DxEditing,
  DxFilterRow,
  DxHeaderFilter,
  DxGroupPanel,
  DxGrouping,
  DxScrolling,
  DxPaging,
  DxPager,
  DxSummary,
  DxLookup,
  DxTotalItem,
  DxGroupItem,
  DxMasterDetail,
  DxStringLengthRule,
  DxRequiredRule,
  DxRangeRule,
  DxValueFormat,
  DxColumnChooser,
  DxColumnFixing,
  DxSelection,
  DxExport
} from 'devextreme-vue/data-grid'
const dataGridRef = 'tablePackage'
Chart.register(...registerables);
export default {
  components: { 
    BarChart,
    DxDataGrid,
  DxColumn,
  DxEditing,
  DxFilterRow,
  DxHeaderFilter,
  DxGroupPanel,
  DxGrouping,
  DxScrolling,
  DxPaging,
  DxPager,
  DxSummary,
  DxLookup,
  DxTotalItem,
  DxGroupItem,
  DxMasterDetail,
  DxStringLengthRule,
  DxRequiredRule,
  DxRangeRule,
  DxValueFormat,
  DxColumnChooser,
  DxColumnFixing,
  DxSelection,
  DxExport
   },
  data() {
    return {
      testData: {
      labels: null,
      datasets: [
        {
          label: '(VND)',
          data: null,
          backgroundColor: ['#3e95cd', '#8e5ea2', '#3cba9f', '#e8c3b9', '#c45850', '#C3C750', '#C78750'],
        },
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: null,
        },
      },
    },
    DateChart: null,
    today: dayjs(),
    listPaymentOnWeek: null,
    currentPage:1,
    perPage: 10,
    dataGridRef: 'tablePackage',
    optionPerPage: [10, 20, 50],
    configTable: [
      {
      caption: 'Tháng',
      field: 'Type',
      isShow: true,
      alignment: 'center',
      width: '16%',
      },
      {
      caption: 'Tháng 1',
      field: 'T1',
      isShow: true,
      cellTemplate: 't1',
      alignment: 'center',
      width: '7%',
      },
      {
      caption: 'Tháng 2',
      field: 'T2',
      isShow: true,
      cellTemplate: 't2',
      alignment: 'center',
      width: '7%',
      },
      {
      caption: 'Tháng 3',
      field: 'T3',
      cellTemplate: 't3',
      isShow: true,
      alignment: 'center',
      width: '7%',
      },
      {
      caption: 'Tháng 4',
      field: 'T4',
      cellTemplate: 't4',
      isShow: true,
      alignment: 'center',
      width: '7%',
      },
      {
      caption: 'Tháng 5',
      field: 'T5',
      cellTemplate: 't5',
      isShow: true,
      alignment: 'center',
      width: '7%',
      },
      {
      caption: 'Tháng 6',
      field: 'T6',
      cellTemplate: 't6',
      isShow: true,
      alignment: 'center',
      width: '7%',
      },
      {
      caption: 'Tháng 7',
      field: 'T7',
      cellTemplate: 't7',
      isShow: true,
      alignment: 'center',
      width: '7%',
      },
      {
      caption: 'Tháng 8',
      field: 'T8',
      isShow: true,
      cellTemplate: 't8',
      alignment: 'center',
      width: '7%',
      },
      {
      caption: 'Tháng 9',
      field: 'T9',
      cellTemplate: 't9',
      isShow: true,
      alignment: 'center',
      width: '7%',
      },
      {
      caption: 'Tháng 10',
      field: 'T10',
      isShow: true,
      cellTemplate: 't10',
      alignment: 'center',
      width: '7%',
      },
      {
      caption: 'Tháng 11',
      field: 'T11',
      cellTemplate: 't11',
      isShow: true,
      alignment: 'center',
      width: '7%',
      },
      {
      caption: 'Tháng 12',
      field: 'T12',
      isShow: true,
      cellTemplate: 't12',
      alignment: 'center',
      width: '7%',
      }
  ],
    listData:[
      {
        Type: 'Doanh thu',
        T1: 0,
        T2: 0,
        T3: 0,
        T4: 0,
        T5: 0,
        T6: 0,
        T7: 0,
        T8: 0,
        T9: 0,
        T10: 0,
        T11: 0,
        T12: 0,
      },
      {
        Type: 'Chi phí',
        T1: 0,
        T2: 0,
        T3: 0,
        T4: 0,
        T5: 0,
        T6: 0,
        T7: 0,
        T8: 0,
        T9: 0,
        T10: 0,
        T11: 0,
        T12: 0,
      },
      {
        Type: 'Tổng',
        T1: 0,
        T2: 0,
        T3: 0,
        T4: 0,
        T5: 0,
        T6: 0,
        T7: 0,
        T8: 0,
        T9: 0,
        T10: 0,
        T11: 0,
        T12: 0,
      }
    ],
    listDate: [
      '01/2022',
      '02/2022',
      '03/2022',
      '04/2022',
      '05/2022',
      '06/2022',
      '07/2022',
      '08/2022',
      '09/2022',
      '10/2022',
      '11/2022',
      '12/2022',
    ],
    listPaymentOnYear: null,
    NumberOfPaymentOnDay: null,
    RevenueOnDay: null,
    CostOnDay: null,
    todayRevenueTitle: dayjs().format("DD/MM/YYYY")
    }
  },
  created() {
    this.listPayment()
    this.getListGoodsReceipt()
  },
  // mounted() {
  //   this.SumAmoutTable()
  // },
  computed: {
        dataGrid() {
          return this.$refs[dataGridRef].instance
        },
      },
  methods: {
    async listPayment() {
      var dataPaymentTemp = []
      await axios.get(`http://localhost:3000/Payment`).then(res => {
        this.DateChart = [dayjs(this.today).add(-6, 'day').format("DD/MM/YYYY"),dayjs(this.today).add(-5, 'day').format("DD/MM/YYYY"),dayjs(this.today).add(-4, 'day').format("DD/MM/YYYY"),dayjs(this.today).add(-3, 'day').format("DD/MM/YYYY"),dayjs(this.today).add(-2, 'day').format("DD/MM/YYYY"),dayjs(this.today).add(-1, 'day').format("DD/MM/YYYY"),dayjs(this.today).format("DD/MM/YYYY")]
        this.NumberOfPaymentOnDay = res.data.filter(x => x.PaymentDate.slice(0,10) === dayjs().format("DD/MM/YYYY")).length
        let sumRevenueOnDay = 0 
        res.data.filter(x => x.PaymentDate.slice(0,10) === dayjs().format("DD/MM/YYYY")).forEach(y => {
          sumRevenueOnDay += y.TotalAmount
        })
        this.RevenueOnDay = sumRevenueOnDay
        this.listPaymentOnWeek = res.data
        this.listPaymentOnYear = res.data
        for(let i = 0; i < this.listPaymentOnWeek.length; i++) {
          this.listPaymentOnWeek[i].PaymentDate = this.listPaymentOnWeek[i].PaymentDate.slice(0,10)
        }
        this.DateChart.forEach (y => {
          var tong = 0
          this.listPaymentOnWeek.forEach(z => {
            if(z.PaymentDate === y) {
              tong += z.TotalAmount
            }
          })
          dataPaymentTemp.push( tong )
        })
        this.options.plugins.title.text = `Biểu đồ doanh thu theo tuần (${this.DateChart[0]} - ${this.DateChart[6]})`
        this.testData.datasets[0].data = dataPaymentTemp
        this.testData.labels = this.DateChart
        this.listDate.forEach((x,index) => {
          let tong = 0
          this.listPaymentOnYear.filter(y => y.PaymentDate.slice(3, 10) === x ).forEach(z => {
            tong += z.TotalAmount
          })
          if(index === 0) {
            this.listData[0].T1 = tong
          }
          if(index === 1) {
            this.listData[0].T2 = tong
          }
          if(index === 2) {
            this.listData[0].T3 = tong
          }
          if(index === 3) {
            this.listData[0].T4 = tong
          }
          if(index === 4) {
            this.listData[0].T5 = tong
          }
          if(index === 5) {
            this.listData[0].T6 = tong
          }
          if(index === 6) {
            this.listData[0].T7 = tong
          }
          if(index === 7) {
            this.listData[0].T8 = tong
          }
          if(index === 8) {
            this.listData[0].T9 = tong
          }
          if(index === 9) {
            this.listData[0].T10 = tong
          }
          if(index === 10) {
            this.listData[0].T11 = tong
          }
          if(index === 11) {
            this.listData[0].T12 = tong
          }
        })
      })
    },
    async getListGoodsReceipt() {
      await axios.get(`http://localhost:3000/GoodsReceipt`).then(res => {
        var sumCostOnDay = 0
        res.data.filter(x => x.GoodsReceiptDate.slice(0,10) === dayjs().format("DD/MM/YYYY")).forEach(y => {
          sumCostOnDay += y.TotalAmount
        })
        this.CostOnDay = sumCostOnDay
          this.listGoodsReceipt = res.data
          this.listDate.forEach ((x, index) => {
            if( index === 0) {
              var dataTemp =  this.listGoodsReceipt.filter(y => y.GoodsReceiptDate.slice(3, 10) == x)
              if(dataTemp.length > 0) {
                let i = 0
                dataTemp.forEach(z => {
                  i += z.TotalAmount
                })
                this.listData[1].T1 = i
              } else {
                this.listData[1].T1 = 0
              }
            }
            if( index === 1) {
              var dataTemp =  this.listGoodsReceipt.filter(y => y.GoodsReceiptDate.slice(3, 10) == x)
              if(dataTemp.length > 0) {
                let i = 0
                dataTemp.forEach(z => {
                  i += z.TotalAmount
                })
                this.listData[1].T2 = i
              } else {
                this.listData[1].T2 = 0
              }
            }
            if( index === 2) {
              var dataTemp =  this.listGoodsReceipt.filter(y => y.GoodsReceiptDate.slice(3, 10) == x)
              if(dataTemp.length > 0) {
                let i = 0
                dataTemp.forEach(z => {
                  i += z.TotalAmount
                })
                this.listData[1].T3 = i
              } else {
                this.listData[1].T3 = 0
              }
            }
            if( index === 3) {
              var dataTemp =  this.listGoodsReceipt.filter(y => y.GoodsReceiptDate.slice(3, 10) == x)
              if(dataTemp.length > 0) {
                let i = 0
                dataTemp.forEach(z => {
                  i += z.TotalAmount
                })
                this.listData[1].T4 = i
              } else {
                this.listData[1].T4 = 0
              }
            }
            if( index === 4) {
              var dataTemp =  this.listGoodsReceipt.filter(y => y.GoodsReceiptDate.slice(3, 10) == x)
              if(dataTemp.length > 0) {
                let i = 0
                dataTemp.forEach(z => {
                  i += z.TotalAmount
                })
                this.listData[1].T5 = i
              } else {
                this.listData[1].T5 = 0
              }
            }
            if( index === 5) {
              var dataTemp =  this.listGoodsReceipt.filter(y => y.GoodsReceiptDate.slice(3, 10) == x)
              if(dataTemp.length > 0) {
                let i = 0
                dataTemp.forEach(z => {
                  i += z.TotalAmount
                })
                this.listData[1].T6 = i
              } else {
                this.listData[1].T6 = 0
              }
            }
            if( index === 6) {
              var dataTemp =  this.listGoodsReceipt.filter(y => y.GoodsReceiptDate.slice(3, 10) == x)
              if(dataTemp.length > 0) {
                let i = 0
                dataTemp.forEach(z => {
                  i += z.TotalAmount
                })
                this.listData[1].T7 = i
              } else {
                this.listData[1].T7 = 0
              }
            }
            if( index === 7) {
              var dataTemp =  this.listGoodsReceipt.filter(y => y.GoodsReceiptDate.slice(3, 10) == x)
              if(dataTemp.length > 0) {
                let i = 0
                dataTemp.forEach(z => {
                  i += z.TotalAmount
                })
                this.listData[1].T8 = i
              } else {
                this.listData[1].T8 = 0
              }
            }
            if( index === 8) {
              var dataTemp =  this.listGoodsReceipt.filter(y => y.GoodsReceiptDate.slice(3, 10) == x)
              if(dataTemp.length > 0) {
                let i = 0
                dataTemp.forEach(z => {
                  i += z.TotalAmount
                })
                this.listData[1].T9 = i
              } else {
                this.listData[1].T9 = 0
              }
            }
            if( index === 9) {
              var dataTemp =  this.listGoodsReceipt.filter(y => y.GoodsReceiptDate.slice(3, 10) == x)
              if(dataTemp.length > 0) {
                let i = 0
                dataTemp.forEach(z => {
                  i += z.TotalAmount
                })
                this.listData[1].T10 = i
              } else {
                this.listData[1].T10 = 0
              }
            }
            if( index === 10) {
              var dataTemp =  this.listGoodsReceipt.filter(y => y.GoodsReceiptDate.slice(3, 10) == x)
              if(dataTemp.length > 0) {
                let i = 0
                dataTemp.forEach(z => {
                  i += z.TotalAmount
                })
                this.listData[1].T11 = i
              } else {
                this.listData[1].T11 = 0
              }
            }
            if( index === 11) {
              var dataTemp =  this.listGoodsReceipt.filter(y => y.GoodsReceiptDate.slice(3, 10) == x)
              if(dataTemp.length > 0) {
                let i = 0
                dataTemp.forEach(z => {
                  i += z.TotalAmount
                })
                this.listData[1].T12 = i
              } else {
                this.listData[1].T12 = 0
              }
            }
          })
      }).then( () => {
        this.SumAmoutTable()
      })
    },
    SumAmoutTable() {
      for(let x in this.listData[2]) {
        if( x != "Type" ) {
          this.listData[2][x] = this.listData[0][x] - this.listData[1][x]
        }
      }
    }
  }
}
</script>
<style lang="scss">
.bottom-body {
  margin-top: 10px;
   .title-table {
    margin-bottom: 5px;
    text-align: center;
    font-style: italic;
  }
}
.RevenueByDay{
  .itemRevenueByDay {
    margin: 0 5px;
    width: 33.3%;
    min-height: 100px;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
    border: solid #000 1px;
    border-radius: 10px 10px;
    p {
      text-align: center;
      padding: 10px 0;
      font-size: 22px;
      font-weight: bold;
      color: #000;
      margin-bottom: 0;
    }
    h2 {
      text-align: center;
      font-weight: bold;
    }
  }
}
.totalRevenueByDay {
  width: 50%;
  margin-top: 30px;
  margin-right: 5px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  border: solid #000 1px;
  border-radius: 10px 10px;
  min-height: 150px;
  background: #F4FA58;
  h1 {
    padding: 10px 0;
    font-size: 30px;
    text-align: center;
    font-weight: bold;
  }
  h2 {
      text-align: center;
      font-weight: bold;
    }
}
.tilteRevenueByDay {
  padding-top: 10px;
  font-size: 18px;
  text-align: center;
  font-style: italic;
  font-weight: bold;
}
</style>