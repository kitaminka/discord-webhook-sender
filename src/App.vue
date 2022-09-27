<template>
  <MainForm/>
</template>

<script>
import MainForm from "@/components/MainForm";

export default {
  name: 'App',
  components: {
    MainForm
  },
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
html, body {
  width: 100%;
  height: 100%;
}
#app {
  width: 100%;
  height: 100%;
  background-color: #030318FF;
  color: #f2f8ff;
}
</style>
