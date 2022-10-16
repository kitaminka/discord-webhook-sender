<template>
  <div class="embed-message">
    <div class="embed-message__title">
      <p>Embed title</p>
      <app-input v-model="editableTitle"/>
    </div>
    <div class="embed-message__description">
      <p>Embed description</p>
      <app-input v-model="editableDescription"/>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

import AppInput from '@/components/AppInput';

export default {
  name: 'MessageEmbed',
  components: {
    AppInput
  },
  data() {
    return {
      editableTitle: this.title,
      editableDescription: this.description
    }
  },
  props: [
    'id',
    'title',
    'description'
  ],
  watch: {
    // title() {
    //   this.editableTitle = this.title;
    // },
    // description() {
    //   console.log(1 )
    //   this.editableDescription = this.description;
    // },
    // editableTitle() {
    //   this.setEmbedTitle({
    //     id: this.id,
    //     title: this.editableTitle
    //   });
    // },
    // editableDescription() {
    //   this.setEmbedDescription({
    //     id: this.id,
    //     title: this.editableDescription
    //   });
    // }
  },
  methods: {
    ...mapMutations([
      'setEmbedTitle',
      'setEmbedDescription'
    ])
  },
};
</script>

<style scoped>

</style>