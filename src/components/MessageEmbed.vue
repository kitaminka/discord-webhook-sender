<template>
  <div class="message-embed">
    <div class="header" @click="toggleEmbedShow">
      <div class="icon" :class="{active: show}">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 10L8 6L4 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
      </div>
      <h3>{{embed.title || 'Embed'}}</h3>
      <div class="header-buttons">
        <app-button class="header-button" variant="secondary" @click.stop="moveEmbedUp(embed.id)">
          <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 10L8 6L4 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
          </svg>
        </app-button>
        <app-button class="header-button" variant="secondary" @click.stop="moveEmbedDown(embed.id)">
          <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g transform="rotate(180 8 8)">
              <path d="M12 10L8 6L4 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            </g>
          </svg>
        </app-button>
        <app-button class="header-button" variant="danger" @click.stop="deleteEmbed(embed.id)">
          <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none">
            <path d="M19 6L5 6M14 5L10 5M6 10L6 20C6 20.6666667 6.33333333 21 7 21 7.66666667 21 11 21 17 21 17.6666667 21 18 20.6666667 18 20 18 19.3333333 18 16 18 10"/>
          </svg>
        </app-button>
      </div>
    </div>
    <transition @enter="enter" @after-enter="afterEnter" @leave="leave" @after-leave="afterLeave">
      <div class="embed" v-show="show">
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
          <app-textarea class="textarea" v-model="description" placeholder="Some description" maxlength="4096"/>
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
    </transition>
  </div>
</template>

<script>
import {mapState, mapGetters, mapMutations} from 'vuex';

import AppInput from '@/components/AppInput';
import ErrorMessage from '@/components/ErrorMessage';
import AppTextarea from '@/components/AppTextarea';
import ColorPicker from '@/components/ColorPicker';
import FieldList from '@/components/FieldList';
import AppButton from '@/components/AppButton.vue';

export default {
  name: 'MessageEmbed',
  components: {
    AppButton,
    FieldList,
    ColorPicker,
    AppTextarea,
    ErrorMessage,
    AppInput
  },
  data() {
    return {
      color: '#000000',
      show: false,
      transitioning: false
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
      'moveEmbedUp',
      'moveEmbedDown',
      'deleteEmbed'
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
    toggleEmbedShow() {
      if (this.transitioning) return;
      this.transitioning = true;
      this.show = !this.show;
    },
    enter(embed) {
      embed.style.height = 'auto';
      const height = getComputedStyle(embed).height;
      embed.style.height = 0;
      getComputedStyle(embed);
      setTimeout(() => {
        embed.style.height = height;
      });
    },
    afterEnter(embed) {
      embed.style.height = 'auto';
      this.transitioning = false;
    },
    leave(embed) {
      embed.style.height = getComputedStyle(embed).height;
      getComputedStyle(embed);
      setTimeout(() => {
        embed.style.height = 0;
      });
    },
    afterLeave() {
      this.transitioning = false;
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
.message-embed {
  margin-bottom: 15px;
  border-radius: 5px;
  padding: 15px;
  background-color: #121225;
  overflow: hidden;
}
.header {
  height: 24px;
  display: grid;
  grid-template-columns: auto 1fr auto;
  justify-content: left;
  align-items: center;
  grid-gap: 10px;
  cursor: pointer;
  user-select: none;
}
.icon {
  display: grid;
  justify-content: center;
  align-items: center;
  transition: transform .3s ease-in-out;
}
.active {
  transform: rotate(180deg);
}
.header-buttons {
  display: grid;
  grid-template-columns: auto auto auto;
  grid-gap: 10px;
  justify-content: right;
  align-items: center;
}
.header-button {
  padding: 0;
  display: grid;
  justify-content: center;
  align-items: center;
  height: 24px;
  width: 24px;
}
.embed {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 10px;
}
.author {
  margin-top: 15px;
}
.color-picker {
  margin: 5px 0;
  box-sizing: border-box;
  width: 100%;
}
.input {
  margin: 5px 0;
  box-sizing: border-box;
  width: 100%;
}
.textarea {
  box-sizing: border-box;
  margin: 5px 0;
  height: 100px;
  width: 100%;
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

.v-enter-active, .v-leave-active {
  transition: height .3s ease-in-out;
  overflow: hidden;
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