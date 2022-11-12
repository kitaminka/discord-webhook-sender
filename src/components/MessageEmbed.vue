<template>
  <app-accordion :header="`Embed ${embed.id}`" :show-default="true" variant="secondary">
    <div class="message-embed">
      <div class="author">
        <p>Author</p>
        <app-input class="input" v-model="author" placeholder="Some author"/>
      </div>
      <div class="author-url">
        <p>Author URL</p>
        <app-input class="input" v-model="authorUrl" placeholder="https://example.com/"/>
      </div>
      <div class="author-icon-url">
        <p>Author Icon URL</p>
        <app-input class="input" v-model="authorIconUrl" placeholder="https://example.com/icon.png"/>
      </div>
      <div class="title">
        <p>Title</p>
        <app-input class="input" v-model="title" placeholder="Some title" maxlength="256"/>
      </div>
      <div class="description">
        <p>Description</p>
        <app-textarea class="message-settings__textarea" v-model="description" placeholder="Some description" maxlength="4096"/>
      </div>
      <div class="url">
        <p>URL</p>
        <app-input class="input" v-model="url" placeholder="https://example.com/"/>
      </div>
      <div class="color">
        <p>Color</p>
        <color-picker class="color-picker" v-model="color" @focusout="updateColor"/>
      </div>
      <div class="image-url">
        <p>Image URL</p>
        <app-input class="input" v-model="imageUrl" placeholder="https://example.com/image.png"/>
      </div>
      <div class="thumbnail-url">
        <p>Thumbnail URL</p>
        <app-input class="input" v-model="thumbnailUrl" placeholder="https://example.com/image.png"/>
      </div>
      <field-list class="field-list" :embed="embed"/>
      <error-message :show="emptyEmbedError">Embed cannot be empty.</error-message>
    </div>
  </app-accordion>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

import AppInput from '@/components/AppInput';
import ErrorMessage from '@/components/ErrorMessage';
import AppAccordion from '@/components/AppAccordion';
import AppTextarea from '@/components/AppTextarea';
import ColorPicker from '@/components/ColorPicker';
import FieldList from '@/components/FieldList';

export default {
  name: 'MessageEmbed',
  components: {
    FieldList,
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
    }
  },
  computed: {
    ...mapState([
      'validWebhookUrl'
    ]),
    ...mapGetters([
      'emptyEmbed'
    ]),
    emptyEmbedError() {
      return this.emptyEmbed(this.embed.id)
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
@import "@/styles/components.css";

.message-embed {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 10px;
}
.message-settings__textarea {
  height: 100px;
}
.color-picker {
  margin: 5px 0;
}
.author {
  grid-column-start: 1;
  grid-column-end: 3;
}
.title {
  grid-column-start: 1;
  grid-column-end: 3;
}
.description {
  grid-column-start: 1;
  grid-column-end: 3;
}

@media only screen and (max-width: 800px) {
  .message-embed {
    grid-template-columns: auto;
  }
  .author, .title, .description, .field-list {
    grid-column-start: 1;
    grid-column-end: 2;
  }
}
</style>