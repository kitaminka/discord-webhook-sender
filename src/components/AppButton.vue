<template>
  <button class="button">
    <slot/>
  </button>
</template>

<script>
export default {
  name: 'AppButton'
};
</script>

<style scoped>
.button {
  color: white;
  padding: 7px 12px;
  font-size: 15px;
  transition: background-color ease 0.1s;
  background-color: #399a58;
  border: none;
  border-radius: 5px;
  font-family: 'Roboto', sans-serif;
}
.button:hover {
  background-color: #246738;
}
</style>