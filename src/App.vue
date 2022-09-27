<template>
  <div>
    <webhook-settings/>
  </div>
</template>

<script>
import WebhookSettings from "@/components/WebhookSettings";

export default {
  name: 'App',
  components: {
    WebhookSettings
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

* {
  margin: 0;
  padding: 0;
}
html, body {
  width: 100%;
  height: 100%;
}
#app {
  display: flex;
  justify-content: center;
  padding-top: 50px;
  width: 100%;
  font-family: 'Roboto', sans-serif;
  height: 100%;
  background-color: #030318FF;
  color: white;
}
</style>
