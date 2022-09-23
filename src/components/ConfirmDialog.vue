<template>
  <b-modal
    id="modal-primary"
    v-model="dialog"
    ok-variant="primary"
    cancel-variant="outline-secondary"
    cancel-title="Quay lại"
    ok-title="Xác nhận"
    modal-class="modal-primary"
    centered
    size="xs"
    :title="item.dataConfirm.title"
    :hide-footer="item.dataConfirm.hideFooter"
    @ok="confirmDialog"
  >
    <b-card-text>
      <div style="padding: 20px 16px">
        {{ item.dataConfirm.content }}
      </div>
    </b-card-text>
  </b-modal>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      item: {
        dataConfirm: {
          title: '',
          content: '',
          hideFooter: false,
        },
      },
    }
  },
  methods: {
    open(item) {
      this.dialog = true
      this.item = item
    },
    close() {
      this.dialog = false
    },
    confirmDialog() {
      this.$emit('confirmDialog', this.item)
      this.close()
    },
  },
}
</script>
