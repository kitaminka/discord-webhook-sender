<template>
  <button class="button" :class="variant">
    <slot/>
  </button>
</template>

<script>
export default {
  name: 'AppButton',
  props: [
    'variant'
  ]
};
</script>

<style scoped>
.button {
  color: white;
  padding: 7px 12px;
  font-size: 15px;
  transition: background-color ease 0.2s;
  background-color: #399a58;
  border: none;
  border-radius: 5px;
  font-family: 'Roboto', sans-serif;
  cursor: pointer;
}
.button:hover {
  background-color: #246738;
}
.button:active {
  background-color: #1c4f28;
}
.button:disabled {
  cursor: not-allowed;
  background-color: #706f6f;
}
.blue {
  background-color: #1770a8;
}
.blue:hover {
  background-color: #135c85;
}
.blue:active {
  background-color: #0f4c75;
}
</style>