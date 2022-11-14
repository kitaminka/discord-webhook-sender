<template>
  <div class="color-picker">
    <input
      class="picker"
      type="color"
      :value="modelValue"
      @input="updateInput"
    />
    <input
      class="color-input"
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
.picker {
  border: none;
  height: 100%;
  width: 100%;
}
.color-input {
  padding: 7px;
  outline: none;
  width: 100%;
  border: none;
  font-size: 15px;
  color: white;
  font-family: 'Roboto', sans-serif;
  background-color: #13132a;
}
</style>