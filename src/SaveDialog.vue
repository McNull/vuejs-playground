<script setup lang="ts">
import { watch } from 'vue';

import Dialog from './Dialog.vue';
import PlaygroundList from './PlaygroundList.vue';

const props = defineProps<{
  playground: any
}>();

watch(() => props.playground.saveDialog.open, (open) => {

  function closeDialog() {
    props.playground.saveDialog.open = false;
  }

  if (open) {
    // add event listener to escape key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeDialog();
      }
    })
  } else {
    // remove event listener
    window.removeEventListener('keydown', closeDialog);
  }
});

</script>

<template>
  <Dialog :open="playground.saveDialog.open">
    <div class="playground-dialog">
      <h1>Save</h1>
      <form @submit.prevent="playground.save">
        <label for="saveDialogName">Name</label>
        <input type="text" v-model="playground.saveDialog.name" required id="saveDialogName">
        <div class="buttons">
          <input type="submit" value="Save" @click="playground.save">
          <button @click="playground.saveDialog.open = false">Cancel</button>
        </div>
        
      </form>
      
      <PlaygroundList :playground="playground" @name-click="(name: string) => playground.saveDialog.name = name"/>
    </div>
  </Dialog>
</template>

<style scoped>
</style>