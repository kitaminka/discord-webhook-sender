<template>
  <textarea :value="modelValue" :placeholder="placeholder" @input="updateTextarea" class="textarea" :maxlength="maxlength">
  </textarea>
</template>

<script>
export default {
  name: 'AppTextarea',
  props: [
    'placeholder',
    'maxlength',
    'modelValue'
  ],
  methods: {
    updateTextarea(event) {
      this.$emit('update:modelValue', event.target.value);
    }
  }
}
</script>

<style scoped>
.textarea {
  resize: none;
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
.textarea:focus {
  background-color: #2a2a4d;
}
</style>