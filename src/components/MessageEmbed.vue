<template>
  <app-accordion :header="`Embed ${id}`" :show-default="true" variant="secondary">
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
        <app-input class="message-embed__input" v-model="title" placeholder="Some title"/>
      </div>
      <div class="message-embed__description">
        <p>Description</p>
        <app-textarea class="message-settings__textarea" v-model="description" placeholder="Some description" maxlength="4096"/>
        <error-message :show="emptyEmbedError">Embed cannot be empty.</error-message>
      </div>
      <div class="message-embed__url">
        <p>URL</p>
        <app-input class="message-embed__input" v-model="url" placeholder="https://example.com/"/>
      </div>
      <div class="message-embed__color">
        <p>Color</p>
        <color-picker class="message-embed__color-picker" v-model="color"/>
      </div>
    </div>
  </app-accordion>
</template>

<script>
import {mapState, mapMutations, mapGetters} from 'vuex';

import AppInput from '@/components/AppInput';
import ErrorMessage from '@/components/ErrorMessage';
import AppAccordion from '@/components/AppAccordion';
import AppTextarea from '@/components/AppTextarea';
import ColorPicker from '@/components/ColorPicker';

export default {
  name: 'MessageEmbed',
  components: {
    ColorPicker,
    AppTextarea,
    AppAccordion,
    ErrorMessage,
    AppInput
  },
  props: [
    'id'
  ],
  methods: {
    ...mapMutations([
      'updateEmbed'
    ])
  },
  computed: {
    ...mapState([
      'validWebhookUrl'
    ]),
    ...mapGetters([
      'embedById'
    ]),
    emptyEmbedError() {
      const embed = this.embedById(this.id);
      return (embed.title.length === 0 && embed.description.length === 0 && embed.author.name.length === 0) && this.validWebhookUrl;
    },
    title: {
      get() {
        return this.embedById(this.id).title;
      },
      set(title) {
        this.updateEmbed({
          id: this.id,
          title
        });
      }
    },
    description: {
      get() {
        return this.embedById(this.id).description;
      },
      set(description) {
        this.updateEmbed({
          id: this.id,
          description
        });
      }
    },
    author: {
      get() {
        return this.embedById(this.id).author.name;
      },
      set(author) {
        this.updateEmbed({
          id: this.id,
          author: {
            name: author
          }
        });
      }
    },
    authorUrl: {
      get() {
        return this.embedById(this.id).author.url;
      },
      set(authorUrl) {
        this.updateEmbed({
          id: this.id,
          author: {
            url: authorUrl
          }
        });
      }
    },
    authorIconUrl: {
      get() {
        return this.embedById(this.id).author.icon_url;
      },
      set(authorIconUrl) {
        this.updateEmbed({
          id: this.id,
          author: {
            icon_url: authorIconUrl
          }
        });
      }
    },
    url: {
      get() {
        return this.embedById(this.id).url;
      },
      set(url) {
        this.updateEmbed({
          id: this.id,
          url
        });
      }
    },
    color: {
      get() {
        return `#${this.embedById(this.id).color.toString(16)}`;
      },
      set(color) {
        const colorInt = parseInt(color.substring(1), 16);
        this.updateEmbed({
          id: this.id,
          color: !isNaN(colorInt) ? colorInt : 0
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

@media only screen and (max-width: 800px) {
  .message-embed {
    grid-template-columns: auto;
  }
  .message-embed__author, .message-embed__title, .message-embed__description {
    grid-column-start: 1;
    grid-column-end: 2;
  }
}
</style>