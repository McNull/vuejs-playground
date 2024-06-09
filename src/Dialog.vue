<script setup lang="ts">

const props = defineProps<{
  open: boolean
}>()

</script>

<template>
  <div class="dialog-background" :class="{ open: props.open }" @click.stop>
    <div class="dialog">
      <slot />
    </div>
  </div>
</template>

<style>

/*
nav {
  --bg: #fff;
  --bg-light: #fff;
  --border: #ddd;
  --btn: #666;
  --highlight: #333;
  --green: #3ca877;
  --purple: #904cbc;
  --btn-bg: #eee;

  color: var(--base);
  height: var(--nav-height);
  box-sizing: border-box;
  padding: 0 1em;
  background-color: var(--bg);
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.33);
  position: relative;
  z-index: 999;
  display: flex;
  justify-content: space-between;
}

.dark nav {
  --base: #ddd;
  --bg: #1a1a1a;
  --bg-light: #242424;
  --border: #383838;
  --highlight: #fff;
  --btn-bg: #333;

  box-shadow: none;
  border-bottom: 1px solid var(--border);
}*/

.dialog-background {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5000;
  opacity: 0;
  transition: background 0.3s;
  backdrop-filter: blur(5px);
  background: rgba(0, 0, 0, 0.5);
  pointer-events: none;
}

.dialog-background.open {
  opacity: 1;
  pointer-events: all;
    
}

.dialog {
  background: white;
  color: black;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  min-width: 50%;
  max-width: 80%;
  max-height: 80%;
  overflow: auto;
}

.open .dialog {
  pointer-events: all;
}



</style>