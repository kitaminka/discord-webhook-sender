<template>
  <div class="embed-buttons" @click.stop>
    <transition>
      <app-button class="button" variant="secondary" @click="moveEmbedUp(embed.id)" v-show="allowMoveEmbedUp(embed.id)">
        <app-icon name="up"/>
      </app-button>
    </transition>
    <transition>
      <app-button class="button" variant="secondary" @click="moveEmbedDown(embed.id)" v-show="allowMoveEmbedDown(embed.id)">
        <app-icon name="down"/>
      </app-button>
    </transition>
    <app-button class="button" variant="danger" @click="deleteEmbed(embed.id)">
      <app-icon name="delete"/>
    </app-button>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

import AppButton from '@/components/AppButton.vue';
import AppIcon from '@/components/AppIcon.vue';

export default {
  name: 'EmbedButtons',
  components: {
    AppButton,
    AppIcon
  },
  props: [
    'embed'
  ],
  methods: {
    ...mapMutations([
      'deleteEmbed',
      'moveEmbedUp',
      'moveEmbedDown'
    ]),
  },
  computed: {
    ...mapGetters([
      'allowMoveEmbedUp',
      'allowMoveEmbedDown'
    ])
  }
};
</script>

<style scoped>
.embed-buttons {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: auto;
  grid-gap: 10px;
  justify-content: right;
  align-items: center;
  cursor: default;
}
.button {
  padding: 0;
  display: grid;
  justify-content: center;
  align-items: center;
  height: 24px;
  width: 24px;
}

.v-enter-active, .v-leave-active {
  transition: opacity .3s ease-in-out;
}
.v-enter-from, .v-leave-to {
  opacity: 0;
}
</style>