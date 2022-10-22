<template>
  <button class="button" :class="variant">
    <slot/>
  </button>
</template>

<script>
export default {
  name: 'AppButton',
  props: {
    variant: {
      type: String,
      default: 'primary'
    }
  }
};
</script>

<style scoped>
@import "@/styles/main.css";

.button {
  color: white;
  padding: 7px 12px;
  font-size: 15px;
  transition: background-color ease 0.2s;
  border: none;
  border-radius: 5px;
  font-family: 'Roboto', sans-serif;
  cursor: pointer;
  background-color: var(--button-background-color);
}
.button:hover {
  background-color: var(--button-background-color-hover);
}
.button:active {
  background-color: var(--button-background-color-active);
}
.button:disabled {
  cursor: not-allowed;
  background-color: #706f6f;
}
</style>