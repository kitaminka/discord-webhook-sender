<template>
  <div class="accordion">
    <h3 class="accordion__header" @click="toggleShow">{{header}}</h3>
    <transition>
      <div class="accordion__content" v-if="show">
        <slot/>
      </div>
    </transition>
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
    'header'
  ],
  methods: {
    toggleShow() {
      this.show = !this.show;
    }
  }
};
</script>

<style scoped>
.accordion {
  padding: 15px;
  border-radius: 5px;
  background-color: #121225;
  grid-column-start: 2;
}
.accordion__content {
  height: 100px;
}

.v-enter-active {
  transition: opacity 0.4s ease, height 0.2s ease, margin 0.2s ease;
}
.v-leave-active {
  transition: opacity 0.2s ease, height 0.4s ease, margin 0.4s ease;
}
.v-enter-from,
.v-leave-to {
  height: 0;
  opacity: 0;
  margin: 0;
}
</style>