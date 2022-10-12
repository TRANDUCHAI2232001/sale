<template>
    <li
      v-bind="$attrs"
      class="timeline-item"
      :class="[`timeline-variant-${variant}`, fillBorder ? `timeline-item-fill-border-${variant}` : null]"
    >
      <div
        v-if="!icon"
        class="timeline-item-point"
      />
      <div
        v-else
        class="timeline-item-icon d-flex align-items-center justify-content-center rounded-circle"
      >
        <feather-icon :icon="icon" />
      </div>
  
      <slot>
        <div class="d-flex flex-sm-row flex-column flex-wrap justify-content-between mb-1 mb-sm-0">
          <h5 v-text="title" style="font-weight:bold" />
          <small
            class="timeline-item-time text-nowrap text-muted"
            v-text="time"
          />
        </div>
        <p
          class="mb-0"
          v-text="subtitle"
        />
        <p><i class="fa-solid fa-user"></i> <span style="padding:0 10px 0 5px" v-text="subtitle2"></span> <i class="fa-solid fa-phone"></i><span style="padding:0 10px 0 5px" v-text="subtitle3"></span></p>
      </slot>
    </li>
  </template>
  <script>
    export default {
      props: {
        variant: {
          type: String,
          default: 'primary',
        },
        title: {
          type: String,
          default: null,
        },
        subtitle: {
          type: String,
          default: null,
        },
        subtitle2: {
          type: String,
          default: null,
        },
        subtitle3: {
          type: String,
          default: null,
        },
        time: {
          type: String,
          default: null,
        },
        icon: {
          type: String,
          default: null,
        },
        fillBorder: {
          type: Boolean,
          default: false,
        },
      },
    }
    </script>
    <style lang="scss">
.timeline-item {
  padding-left: 2.5rem;
  position: relative;
  &:not(:last-of-type) {
    padding-bottom: 2rem;
    border-left: 1px solid #ebe9f1;
  }

  // This gives shade to last timeline-item but isn't that revolutionary

  .timeline-item-point {
    position: absolute;
    left: -6px;
    width: 12px;
    height: 12px;
    top: 0;
    border-radius: 50%;
    z-index: 1;

    &:before {
      content: '';
      z-index: 1;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      position: absolute;
      top: -4px;
      left: -4px;
      bottom: 0;
      right: 0;
      background-color: #17b75e;
    }
  }

  .timeline-item-icon {
    position: absolute;
    left: -12px;
    top: 0;
    width: 24px;
    height: 24px;
    background-color: #fff;
    z-index: 1;
  }
}


    </style>