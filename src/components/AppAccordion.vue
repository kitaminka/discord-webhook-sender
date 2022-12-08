<template>
  <div class="accordion" :class="variant">
    <div class="header" @click="toggleShow">
      <div class="icon" :class="{active: show}">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M12 10L8 6L4 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
      </div>
      <h3>{{header}}</h3>
    </div>
    <div v-show="show"  class="content">
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppAccordion',
  data() {
    return {
      show: this.$props.showDefault
    }
  },
  props: {
    header: String,
    showDefault: Boolean,
    variant: {
      type: String,
      default: 'primary'
    }
  },
  methods: {
    toggleShow() {
      this.show = !this.show;
    }
  }
};
</script>

<style scoped>
.accordion {
  border-radius: 5px;
  padding: 15px;
  background-color: var(--accordion-background-color);
  overflow: hidden;
}
.header {
  display: grid;
  grid-template-columns: auto auto;
  justify-content: left;
  align-items: center;
  grid-gap: 10px;
  cursor: pointer;
  user-select: none;
}
.icon {
  display: grid;
  justify-content: center;
  align-items: center;
}
.active {
  transform: rotate(180deg);
}
.content {
  box-sizing: border-box;
}
.content {
  padding-top: 15px;
}
</style>