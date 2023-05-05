<template>
  <app-header/>
  <app-main/>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import AppHeader from '@/components/AppHeader.vue';
import AppMain from '@/components/AppMain.vue';

export default {
  name: 'App',
  components: {
    AppHeader,
    AppMain
  },
  computed: {
    ...mapState([
      'message',
      'embeds'
    ])
  },
  methods: {
    ...mapActions([
      'saveMessageToLocalStorage',
      'loadMessageFromLocalStorage'
    ])
  },
  watch: {
    message: {
      handler() {
        this.saveMessageToLocalStorage();
      },
      deep: true
    },
    embeds: {
      handler() {
        this.saveMessageToLocalStorage();
      },
      deep: true
    }
  },
  beforeMount() {
    this.loadMessageFromLocalStorage();
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

* {
  margin: 0;
  padding: 0;
}
html, body {
  font-family: 'Roboto', sans-serif;
  color: white;
  background-color: #030318;
  width: 100%;
  min-height: 100%;
}

.primary {
  --button-background-color: #399a58;
  --button-background-color-hover: #246738;
  --button-background-color-active: #1c4f28;
}
.secondary {
  --button-background-color: #138fb6;
  --button-background-color-hover: #107494;
  --button-background-color-active: #0c5772;
}
.danger {
  --button-background-color: #ec3232;
  --button-background-color-hover: #b92525;
  --button-background-color-active: #8f1919;
}
</style>
