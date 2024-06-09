<script setup lang="ts">

import { ref, watch } from 'vue';
import Dialog from './Dialog.vue';
import PlaygroundList from './PlaygroundList.vue';

const props = defineProps<{
  playground: any
}>();

const inputName = ref<HTMLInputElement | null>(null);

function onSubmit() {

  const name = props.playground.loadDialog.name;
  
  // check if the name is unique
  if (props.playground.savedPlaygrounds.includes(name)) {
    alert('Playground with the same name already exists.');
    inputName.value?.focus();
    return;
  }

  // load the playground
  props.playground.load(name);
 
}

watch(() => props.playground.loadDialog.open, (open) => {
  if (open) {
    inputName.value?.focus();
    // select all text
    inputName.value?.select();
  }
});

</script>

<template>
  <Dialog :open="playground.loadDialog.open">
    <div class="playground-dialog">
      <h1>New</h1>
      <form @submit.prevent="onSubmit">
        <label for="loadDialogName">Name</label>
        <input ref="inputName" v-model="playground.loadDialog.name" id="loadDialogName">
        <div class="buttons">
          <button @click.prevent="playground.loadDialog.open = false">Cancel</button>
          <input type="submit" value="Create">
        </div>
      </form>
      <hr>
      <PlaygroundList :playground="playground" @name-click="(name: string) => playground.loadDialog.name = name" />
    </div>
  </Dialog>
</template>

<style scoped>
</style>