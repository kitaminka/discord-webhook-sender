<template>
  <div class="embed-field">
    <h3 class="embed-field__header">Field {{field.id}}</h3>
    <div class="embed-field__name">
      <p>Name</p>
      <app-input class="embed-field__input"
                 placeholder="Some name"
                 v-model="name"
                 maxlength="256"/>
    </div>
    <div class="embed-field__value">
      <p>Value</p>
      <app-textarea class="embed-field__textarea"
                    placeholder="Some value"
                    v-model="value"
                    maxlength="1024"/>
    </div>
  </div>
</template>

<script>
import AppInput from '@/components/AppInput';
import AppTextarea from '@/components/AppTextarea';

export default {
  name: 'EmbedField',
  components: {
    AppTextarea,
    AppInput
  },
  props: [
    'field'
  ],
  computed: {
    name: {
      get() {
        return this.field.name;
      },
      set(name) {
        this.$emit('updateField', {
          id: this.field.id,
          name: name,
        });
      }
    },
    value: {
      get() {
        return this.field.value;
      },
      set(value) {
        this.$emit('updateField', {
          id: this.field.id,
          value: value
        });
      }
    }
  }
};
</script>

<style scoped>
.embed-field__header {
  margin-bottom: 5px;
}
.embed-field__input {
  box-sizing: border-box;
  margin: 5px 0;
  width: 100%;
}
.embed-field__textarea {
  box-sizing: border-box;
  margin: 5px 0;
  width: 100%;
  height: 75px;
}
</style>