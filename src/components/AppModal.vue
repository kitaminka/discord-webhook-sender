<template>
  <div class="modal">
    <div class="modal__content">
<!--      <slot/>-->
      <p>Test content</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppModal'
};
</script>

<style scoped>
.modal {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: grid;
  justify-content: center;
  align-items: center;
  background-color: rgba(19, 19, 42, 0.3);
}
.modal__content {
  display: grid;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 100px;
  border-radius: 5px;
  background-color: #232364;
}
</style>