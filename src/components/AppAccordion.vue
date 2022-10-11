<template>
  <div class="accordion">
    <div class="accordion__header" @click="toggleShow">
      <div class="accordion__icon" :class="{active: show}">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M12 10L8 6L4 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
      </div>
      <h3>{{header}}</h3>
    </div>
    <div class="accordion__content" v-if="show">
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppAccordion',
  data() {
    return {
      show: false
    }
  },
  props: [
    'header',
    'showDefault'
  ],
  created() {
    this.show = this.$props.showDefault;
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
  background-color: #121225;
  overflow: hidden;
}
.accordion__header {
  display: grid;
  grid-template-columns: auto auto;
  justify-content: left;
  align-items: center;
  grid-gap: 10px;
  padding: 15px;
  cursor: pointer;
  user-select: none;
}
.accordion__icon {
  display: grid;
  justify-content: center;
  align-items: center;
}
.active {
  transform: rotate(180deg);
}
.accordion__content {
  max-height: min-content;
  padding: 0 15px 15px 15px;
}
</style>