<template>
  <textarea
      :value="modelValue"
      :placeholder="placeholder"
      @input="updateTextarea"
      class="textarea"
      :maxlength="maxlength"
  >
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
    border: 3px solid #494962;
    background-color: #13132a;
    border-radius: 5px;
    font-family: 'Roboto', sans-serif;
    transition: background-color ease 0.2s;
  }
  .textarea:focus {
    background-color: #252549;
  }
</style>