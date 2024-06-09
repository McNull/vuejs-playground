<script setup lang="ts">



import { Icon } from '@iconify/vue';



const props = defineProps<{
  playground: any
}>();

function removeSaved(name) {
  if (confirm('Are you sure you want to delete this playground?')) {
    props.playground.removeSaved(name)
  }
}

</script>

<template>
  <div v-if="props.playground.savedPlaygrounds.length" class="playground-list">
    <h2>Playgrounds</h2>
    <ul>
      <li v-for="name in props.playground.savedPlaygrounds" :key="name">
        <div class="item">
          <div class="name">
            <a href="#" @click.prevent="$emit('nameClick', name)">
              {{ name }}
            </a>
          </div>
          <div class="buttons">
            <button title="Load" @click.prevent="props.playground.load(name)">
              <Icon icon="ri:upload-2-fill" />
            </button>
            <button title="Save" @click.prevent="removeSaved(name)">
              <Icon icon="ep:delete" />
            </button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.playground-list ul {
  list-style: none;
  padding: 0;
  max-height: 50vh;
  overflow: auto;
}

.playground-list .item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5em;
}

.playground-list .item button {
  background: none;
  padding: 0.5em;

  border-radius: 4px;
  border: 1px solid #666;
}

.playground-list .item button svg {
  width: 1.4em;
  height: 1.4em;
}
</style>