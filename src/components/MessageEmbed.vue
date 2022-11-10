<template>
  <app-accordion :header="`Embed ${embed.id}`" :show-default="true" variant="secondary">
    <div class="message-embed">
      <div class="message-embed__author">
        <p>Author</p>
        <app-input class="message-embed__input" v-model="author" placeholder="Some author"/>
      </div>
      <div class="message-embed__author-url">
        <p>Author URL</p>
        <app-input class="message-embed__input" v-model="authorUrl" placeholder="https://example.com/"/>
      </div>
      <div class="message-embed__author-icon-url">
        <p>Author Icon URL</p>
        <app-input class="message-embed__input" v-model="authorIconUrl" placeholder="https://example.com/icon.png"/>
      </div>
      <div class="message-embed__title">
        <p>Title</p>
        <app-input class="message-embed__input" v-model="title" placeholder="Some title" maxlength="256"/>
      </div>
      <div class="message-embed__description">
        <p>Description</p>
        <app-textarea class="message-settings__textarea" v-model="description" placeholder="Some description" maxlength="4096"/>
      </div>
      <div class="message-embed__url">
        <p>URL</p>
        <app-input class="message-embed__input" v-model="url" placeholder="https://example.com/"/>
      </div>
      <div class="message-embed__color">
        <p>Color</p>
        <color-picker class="message-embed__color-picker" v-model="color" @focusout="updateColor"/>
      </div>
      <div class="message-embed__image-url">
        <p>Image URL</p>
        <app-input class="message-embed__input" v-model="imageUrl" placeholder="https://example.com/image.png"/>
      </div>
      <div class="message-embed__thumbnail-url">
        <p>Thumbnail URL</p>
        <app-input class="message-embed__input" v-model="thumbnailUrl" placeholder="https://example.com/image.png"/>
      </div>
      <app-accordion header="Fields" :show-default="false"  class="embed-fields">
        <div class="embed-fields__buttons">
          <app-button @click="createEmbedField(embed.id)" :disabled="disableCreateField">Create field</app-button>
          <app-button @click="deleteAllEmbedFields(embed.id)" :disabled="disableDeleteFields" variant="danger">Delete all fields</app-button>
        </div>
        <div class="embed-fields__fields">
          <embed-field class="embed-fields__field" v-for="field in this.embed.fields" :field="field" :key="field.id" @updateField="updateField"/>
        </div>
      </app-accordion>
      <error-message :show="emptyEmbedError">Embed cannot be empty.</error-message>
    </div>
  </app-accordion>
</template>

<script>
import {mapState, mapMutations} from 'vuex';

import AppInput from '@/components/AppInput';
import ErrorMessage from '@/components/ErrorMessage';
import AppAccordion from '@/components/AppAccordion';
import AppTextarea from '@/components/AppTextarea';
import ColorPicker from '@/components/ColorPicker';
import EmbedField from '@/components/EmbedField';
import AppButton from '@/components/AppButton';

export default {
  name: 'MessageEmbed',
  components: {
    AppButton,
    EmbedField,
    ColorPicker,
    AppTextarea,
    AppAccordion,
    ErrorMessage,
    AppInput
  },
  data() {
    return {
      color: '#000000'
    }
  },
  props: [
    'embed'
  ],
  emits: [
    'updateEmbed'
  ],
  methods: {
    ...mapMutations([
      'createEmbedField',
      'deleteAllEmbedFields',
      'updateEmbedField'
    ]),
    updateColor() {
      const colorInt = parseInt(this.color.substring(1), 16);
      if (!isNaN(colorInt) && colorInt <= 16777215 && this.color.length <= 7) {
        this.$emit('updateEmbed', {
          id: this.embed.id,
          color: colorInt
        });
      } else {
        this.color = `#${this.embed.color.toString(16)}`;
      }
    },
    updateField(field) {
      this.updateEmbedField({
        embedId: this.embed.id,
        field
      });
    }
  },
  computed: {
    ...mapState([
      'validWebhookUrl'
    ]),
    emptyEmbedError() {
      // TODO Move this to store and update disableSendButton in WebhookSettings
      return (this.embed.title.length === 0
        && this.embed.description.length === 0
        && this.embed.author.name.length === 0
        && this.embed.image.url.length === 0
        && this.embed.thumbnail.url.length === 0
        && this.embed.fields.length === 0)
        && this.validWebhookUrl;
    },
    disableCreateField() {
      return this.embed.fields.length >= 25;
    },
    disableDeleteFields() {
      return this.embed.fields.length <= 0;
    },
    title: {
      get() {
        return this.embed.title;
      },
      set(title) {
        this.$emit('updateEmbed', {
          id: this.embed.id,
          title
        });
      }
    },
    description: {
      get() {
        return this.embed.description;
      },
      set(description) {
        this.$emit('updateEmbed', {
          id: this.embed.id,
          description
        });
      }
    },
    author: {
      get() {
        return this.embed.author.name;
      },
      set(author) {
        this.$emit('updateEmbed', {
          id: this.embed.id,
          author: {
            name: author
          }
        });
      }
    },
    authorUrl: {
      get() {
        return this.embed.author.url;
      },
      set(authorUrl) {
        this.$emit('updateEmbed', {
          id: this.embed.id,
          author: {
            url: authorUrl
          }
        });
      }
    },
    authorIconUrl: {
      get() {
        return this.embed.author.icon_url;
      },
      set(authorIconUrl) {
        this.$emit('updateEmbed', {
          id: this.embed.id,
          author: {
            icon_url: authorIconUrl
          }
        });
      }
    },
    url: {
      get() {
        return this.embed.url;
      },
      set(url) {
        this.$emit('updateEmbed', {
          id: this.embed.id,
          url
        });
      }
    },
    imageUrl: {
      get() {
        return this.embed.image.url;
      },
      set(imageUrl) {
        this.$emit('updateEmbed', {
          id: this.embed.id,
          image: {
            url: imageUrl
          }
        });
      }
    },
    thumbnailUrl: {
      get() {
        return this.embed.thumbnail.url;
      },
      set(thumbnailUrl) {
        this.$emit('updateEmbed', {
          id: this.embed.id,
          thumbnail: {
            url: thumbnailUrl
          }
        });
      }
    }
  }
};
</script>

<style scoped>
.message-embed {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 10px;
}
.message-embed__input {
  box-sizing: border-box;
  margin: 5px 0;
  width: 100%;
}
.message-settings__textarea {
  box-sizing: border-box;
  margin: 5px 0;
  width: 100%;
  height: 100px;
}
.message-embed__color-picker {
  margin: 5px 0;
}
.message-embed__author {
  grid-column-start: 1;
  grid-column-end: 3;
}
.message-embed__title {
  grid-column-start: 1;
  grid-column-end: 3;
}
.message-embed__description {
  grid-column-start: 1;
  grid-column-end: 3;
}
.embed-fields {
  margin-top: 5px;
  grid-column-start: 1;
  grid-column-end: 3;
}
.embed-fields__buttons {
  justify-content: left;
  grid-template-columns: auto auto;
  display: grid;
  grid-gap: 10px;
  margin-bottom: 10px;
}
.embed-fields__fields {
  display: grid;
  grid-gap: 10px;
}
.embed-fields__field {
  box-sizing: border-box;
  width: 100%;
}

@media only screen and (max-width: 800px) {
  .message-embed {
    grid-template-columns: auto;
  }
  .message-embed__author, .message-embed__title, .message-embed__description, .embed-fields {
    grid-column-start: 1;
    grid-column-end: 2;
  }
}
</style>