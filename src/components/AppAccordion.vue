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
  border-radius: 5px;
  background-color: #121225;
  grid-column-start: 2;
  overflow: hidden;
}
.accordion__header {
  padding: 15px;
}
.accordion__content {
  max-height: 100px;
  padding: 0 15px 15px 15px;
}

.v-enter-active, .v-leave-active {
  transition: max-height 0.4s linear;
}

.v-enter-from,
.v-leave-to {
  max-height: 0;
}
</style>