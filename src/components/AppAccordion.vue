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
</style>