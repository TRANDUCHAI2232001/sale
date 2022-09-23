
const mixin = {
  methods: {
      formatPrice(value) {
      if (isNaN(value) || value == null) return
      return value.toLocaleString(undefined, { maximumFractionDigits: 4 })
    },
    settingScroll() {
      return {
        suppressScrollY: false,
        suppressScrollX: false,
        wheelPropagation: false,
      }
    }

  },
} 
export default mixin