<template>
  <input :value="modelValue" :placeholder="placeholder" @input="updateInput" class="input"/>
</template>

<script>
export default {
  name: 'AppInput',
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
  outline: none;
  color: white;
  padding: 7px;
  font-size: 15px;
  border: none;
  background-color: #23234f;
  border-radius: 5px;
  font-family: 'Roboto', sans-serif;
  transition: background-color ease 0.2s;
}
.input:focus {
  background-color: #2a2a4d;
}
</style>