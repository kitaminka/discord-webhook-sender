<template>
  <input
      type="text"
      :value="modelValue"
      :placeholder="placeholder"
      @input="updateInput"
      class="input"
  >
</template>

<script>
export default {
  name: "AppInput",
  props: [
      'placeholder',
      'modelValue'
  ],
  methods: {
    updateInput(event) {
      this.$emit('update:modelValue', event.target.value);
    }
  }
}
</script>

<style scoped>
  .input {
    color: #f2f8ff;
    padding: 5px;
    font-size: 15px;
    border: 3px solid #494962;
    background-color: #13132a;
    border-radius: 5px;
  }
</style>