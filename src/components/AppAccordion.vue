<template>
  <div class="accordion" :class="variant">

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