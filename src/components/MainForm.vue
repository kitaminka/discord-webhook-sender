<template>
  <div class="form">
    <app-input placeholder="test" v-model="text"/>
  </div>
</template>

<script>
import AppInput from '@/components/AppInput';

export default {
  name: "MainForm",
  data() {
    return {
      text: 'ss'
    }
  },
  components: {
    AppInput
  }
}
</script>

<style scoped>

</style>