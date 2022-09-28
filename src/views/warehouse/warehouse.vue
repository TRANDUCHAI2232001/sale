<template lang="">
    <div class="warehouse">
        <b-card
        no-body
        style="margin:5px"
        >
      <b-row>
        <b-col
            cols="4"
          align="left"
          style="margin:auto 0;padding-left:30px"
          class="d-flex "
        >
          <div class="d-select-perPage d-flex" style="margin:auto 0">
            <span style="padding-right:10px;margin:auto 0">Số kết quả trên trang</span>
            <v-select
                v-model="perPage"
                :options="optionPerPage"
                :clearable="false"
                style="min-width: 100px"
              />
          </div>
          <div style="margin-left:10px">
            <b-dropdown
            variant="outline-primary"
            class="mr-2"
            >
            <template #button-content>
                <span class="align-middle">Xuất file</span>
            </template>
            <b-dropdown-item @click="exportExcel()">
                Xuất Excel
            </b-dropdown-item>
            </b-dropdown>
          </div>
        </b-col>
        <b-col align="right" cols="8">
          <div class="p-2">
            <b-button
              variant="outline-primary"
              @click="addService"
            >
            <i class="fa-sharp fa-solid fa-circle-plus" style="margin:auto"></i>
              <span class="align-middle" style="padding-left:8px">Nhập kho</span>
            </b-button>
          </div>
        </b-col>
      </b-row>
    </b-card>
    <b-card style="margin:0 5px">
        <b-overlay
            :show="isLoading"
            :opacity="0.3"
            rounded="sm"
        >
        <DxDataGrid
                    ref="tablePackage"
                    :height="500"
                    class="table-serivce"
                    :show-borders="false"
                    :data-source="listService"
                    :show-column-lines="true"
                    :show-row-lines="true"
                    :allow-column-reordering="true"
                    :allow-column-resizing="true"
                    column-resizing-mode="widget"
                    :column-auto-width="true"
                    @cellClick="viewDetailService"
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
                <template #total-price="{ data }">
                  <div v-if="data.data.ProductTotalPrice">
                    {{ formatPrice(data.data.ProductTotalPrice) }}
                  </div>
                </template>

                <!-- Bật cố định column -->
                <DxColumnFixing :enabled="true" />

                <!-- Cho phép group -->
                <DxGroupPanel :visible="false" />

                <!-- Phân trang -->
                <DxPaging :page-size="perPage" />
                <DxPager
                  :visible="true"
                  display-mode="full"
                  :show-info="true"
                />
              </DxDataGrid>
        </b-overlay>
    </b-card>
    <SidebarDetailService
        ref="DetailService"
        :service="serviceSelect"
        :isDetail="isDetail"
        :idIndex="idIndex"
        @event="handleEvent"
    />
</div>
</template>
<script>
import axios from "axios";
import 'devextreme/dist/css/dx.light.css'
import { Workbook } from 'exceljs'
import { exportDataGrid } from 'devextreme/excel_exporter'
import { saveAs } from 'file-saver-es'
import SidebarDetailService from '@/components/sidebarDetailService.vue'
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
  DxExport,
} from 'devextreme-vue/data-grid'
const dataGridRef = 'tablePackage'
export default {
    components: {
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
        DxExport,
        SidebarDetailService
    },
    data() {
        return {
            isLoading: false,
            currentPage:1,
            perPage: 10,
            dataGridRef: 'tablePackage',
            optionPerPage: [10, 20, 50],
            configTable: [
            {
                caption: 'Loại mặt hàng',
                field: 'MenuName',
                isShow: true,
                alignment: 'center',
                width: '20%',
                },
                {
                caption: 'Mã mặt hàng',
                field: 'Code',
                isShow: true,
                alignment: 'center',
                width: '20%',
                },
                {
                caption: 'Tên mặt hàng',
                field: 'ProductName',
                isShow: true,
                alignment: 'center',
                width: '20%',
                },
                {
                caption: 'Đơn giá',
                field: 'ProductTotalPrice',
                isShow: true,
                cellTemplate: 'total-price',
                alignment: 'center',
                width: '20%',
                },
                {
                caption: 'Số lượng',
                field: 'Quantity',
                isShow: true,
                alignment: 'center',
                width: '20%',
                },
            ],
            listService: null,
            isOpenSidebar: false,
            serviceSelect: null,
            isDetail: null,
            idIndex: null
        }
    },
    created() {
        this.getProductList()
    },
    computed: {
        dataGrid() {
          return this.$refs[dataGridRef].instance
        },
      },
      methods: {
        async getProductList() {
            await axios.get(`http://localhost:3000/Product`).then(res => {
                this.listService = res.data
                this.idIndex = this.listService[this.listService.length - 1 ].id
            }) 
        },
        viewDetailService(item) {
            this.isDetail = false
            this.serviceSelect = item.data
            this.$refs.DetailService.open()
        },
        addService() {
            this.isDetail = true
            this.serviceSelect = null
            this.$refs.DetailService.open()
        },
        exportExcel() {
            const workbook = new Workbook()
            const worksheet = workbook.addWorksheet('Service')
            exportDataGrid({
                component: this.dataGrid,
                worksheet,
                autoFilterEnabled: true,
                PrintSelectedRowsOnly: true,
                topLeftCell: { row: 4, column: 1 },
            }).then(cellRange => {
                // header
                const headerRow = worksheet.getRow(2)
                headerRow.height = 30
                worksheet.mergeCells(2, 1, 2, 8)

                headerRow.getCell(1).value = `Danh sách mặt hàng`
                headerRow.getCell(1).font = { name: 'Segoe UI Light', size: 22 }
                headerRow.getCell(1).alignment = { horizontal: 'center' }

                // footer
                const footerRowIndex = cellRange.to.row + 2
                const footerRow = worksheet.getRow(footerRowIndex)
                worksheet.mergeCells(footerRowIndex, 1, footerRowIndex, 8)
                footerRow.getCell(1).font = { color: { argb: 'BFBFBF' }, italic: true }
                footerRow.getCell(1).alignment = { horizontal: 'right' }
            }).then(() => {
                workbook.xlsx.writeBuffer().then(buffer => {
                saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'Product.xlsx')
                })
            })
        },
        handleEvent(data) {
            if(data.type === 'afterUpdateService') {
                this.getProductList()
            }
            if(data.type === 'afterAddService') {
                this.getProductList()
            }
        }
      }
}
</script>
<style lang="scss">
.warehouse {
    width: 99.6%;
}
.dx-datagrid {
    font-family:'Times New Roman', Times, serif;
    background-color: transparent;
    color: #5D5F65;
    .dx-checkbox-icon {
        border: 1px solid #ddd;
    }
    .dx-data-row > td {
        border-left: none;
        border-right: none;
        padding: 11px 7px;
        font-size: 14px;
        vertical-align: middle!important;
        position: relative;
    }
    .dx-column-lines > td {
        border-left: 1px solid #ddd;
        border-right: 1px solid #ddd;
    }
    .dx-datagrid-headers {
        border-bottom: 0;
        .dx-row {
            background: #b8c2cc!important;
            td {
                font-weight: 500;
                font-size: 16px;
                color: #434442;
                line-height: 14px;
                letter-spacing: 1px;
                text-transform: uppercase;
                padding: 10px;
                &.dx-pointer-events-none {
                    border-left: none
                }
                .dx-select-checkbox {
                    display: block;
                }
            }
        }
    }
    .dx-datagrid-rowsview {
        border-top: 1px solid #ddd;
        .dx-row {
            border-top: none;
            border-bottom: none;
            td {
                padding: 9px;
                border-top: none;
                border-bottom: none;
                &.dx-pointer-events-none {
                    border-left: none;
                }
                .dx-select-checkbox {
                    display: block;
                }

            }
            &.dx-row-lines {
                td {
                    border-top: 1px solid #ddd;
                    border-bottom: 1px solid #ddd;
                }
                &.dx-selection {
                    td {
                        border-top: 1px solid #ddd!important;
                        border-bottom: 1px solid #ddd!important;
                    }
                }
            }
            &.dx-row-alt {
                td {
                    // opacity: 0.75;
                }
            }
            &.dx-selection {
                td {

                    border-top: none!important;
                    border-bottom: none!important;
                }
            }
            &.dx-state-hover {
                td {
                    .dx-select-checkbox {
                        .dx-checkbox-icon:focus-visible {
                            outline: none;
                        }
                    }
                }
            }
            &.dx-group-row {
                td {
                    font-weight: 500;
                    font-size: 14px;
                    line-height: 14px;
                    letter-spacing: 1px;
                    text-transform: uppercase;
                }
            }
        }
    }
    .dx-datagrid-total-footer {
        .dx-datagrid-content {
            padding: 0;
            tr {
                td {
                    padding: 0;
                    &.dx-command-select {
                        border-left: 1px solid #fff;
                        border-right: 1px solid #ddd;
                    }
                    .dx-datagrid-summary-item {
                        text-transform: uppercase;
                        font-size: 0.857rem;
                        letter-spacing: 0.5px;
                        font-weight: bold;
                        padding: 0.72rem 2rem;
                        &.ez-column-lines {
                            border-right: 1px solid #ddd;
                        }
                    }
                }
            }
        }
    }
    .dx-datagrid-pager {
        // border-top: none;
        padding: 20px 15px;

        .dx-pages {
            font-size: 14px;
            color: #747571;
            .dx-info {
                line-height: 18px;
                color: #747571;
            }
            .dx-page-indexes {
                .dx-navigate-button {
                    font-size: 14px;
                    padding: 6px 10px;
                }
                .dx-prev-button, .dx-next-button {
                    line-height: 23px;
                    border-radius: 50%;
                    &:hover {
                        background-color: #114a9f;
                        color: #fff; 
                    }
                }
                .dx-next-button {
                    margin-left: 5px;
                }
                .dx-page {
                    border-radius: 5rem;
                    background-color: rgba(156, 158, 164, 0.12);
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    width: 28px;
                    height: 28px;
                    font-size: 14px;
                    padding: 0;
                    &.dx-selection, &:hover {
                        background-color:#114a9f;
                        color: #fff;
                    }
                }
            }
        }
    }
}
.d-select-perPage {
    .is-invalid{
        margin-bottom: 0 !important;
    }
}
</style>