<template>
  <div class="embed-buttons" @click.stop>
    <transition>
      <app-button class="button" variant="secondary" @click="moveEmbedUp(embed.id)" v-show="allowMoveEmbedUp(embed.id)">
        <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 10L8 6L4 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
      </app-button>
    </transition>
    <transition>
      <app-button class="button" variant="secondary" @click="moveEmbedDown(embed.id)" v-show="allowMoveEmbedDown(embed.id)">
        <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g transform="rotate(180 8 8)">
            <path d="M12 10L8 6L4 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
          </g>
        </svg>
      </app-button>
    </transition>
    <app-button class="button" variant="danger" @click="deleteEmbed(embed.id)">
      <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none">
        <path d="M19 6L5 6M14 5L10 5M6 10L6 20C6 20.6666667 6.33333333 21 7 21 7.66666667 21 11 21 17 21 17.6666667 21 18 20.6666667 18 20 18 19.3333333 18 16 18 10"/>
      </svg>
    </app-button>
  </div>
</template>

<script>
import AppButton from '@/components/AppButton.vue';
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'EmbedButtons',
  components: {
    AppButton
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