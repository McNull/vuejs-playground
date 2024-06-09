<script setup lang="ts">
import Dialog from './Dialog.vue';
import PlaygroundList from './PlaygroundList.vue';

const props = defineProps<{
  playground: any
}>();

</script>

<template>
  <Dialog :open="playground.saveDialog.open">
    <div class="playground-dialog">
      <h1>Save</h1>
      <form @submit.prevent="playground.save">
        <label for="saveDialogName">Name</label>
        <input v-model="playground.saveDialog.name" required id="saveDialogName">
        <div class="buttons">
          <button @click="playground.saveDialog.open = false">Cancel</button>
          <input type="submit" value="Save" @click="playground.save">
        </div>
        
      </form>
      <hr>
      <PlaygroundList :playground="playground" @name-click="(name: string) => playground.saveDialog.name = name"/>
    </div>
  </Dialog>
</template>

<style scoped>
</style>