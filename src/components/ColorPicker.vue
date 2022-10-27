<template>
  <div class="color-picker">
    <input
      class="color-picker__picker"
      type="color"
      :value="modelValue"
      @input="updateInput"
    />
    <input
      class="color-picker__input"
      type="text"
      :value="modelValue"
      @input="updateInput"
    />
  </div>
</template>

<script>
export default {
  name: 'ColorPicker',
  props: [
    'modelValue'
  ],
  methods: {
    updateInput(event) {
      this.$emit('update:modelValue', event.target.value);
    }
  }
};
</script>

<style scoped>
.color-picker {
  display: grid;
  grid-template-columns: 1fr 1fr;
  border: 3px solid #494962;
  background-color: #13132a;
  border-radius: 5px;
}
.color-picker__picker {
  width: 100%;
}
.color-picker__input {
  outline: none;
  padding-left: 7px;
  border: none;
  font-size: 15px;
  color: white;
  font-family: 'Roboto', sans-serif;
  background-color: #13132a;
}
</style>