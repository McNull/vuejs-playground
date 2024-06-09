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
  
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  min-width: 50%;
  max-width: 80%;
  max-height: 80%;
  overflow: auto;
  opacity: 0;
  transition: opacity 0.3s;

  background-color: #ccc;
  color: #333;
  font-size: 110%;
}

.dialog, .dialog * {
  box-sizing: border-box;
}

.dialog label {
  font-weight: bold;
}

.dialog h1, .dialog h2, .dialog h3, .dialog h4, .dialog h5, .dialog h6 {
  color: white;
}

.dialog form {
  display: flex;
  flex-direction: column;
  gap: 1em;
  margin-bottom: 1rem;
}

.dialog form input[type="text"] {
  padding: 0.5em;
  color: #333;
  border-radius: 5px;
  height: 2.5em;
  background-color: #aaa;
  border: none;
  font-size: 1.5em;
}

.dialog form input[type="text"]:focus {
  outline: none;
}

.dialog form input[type="submit"], .dialog form button {
  height: 3em;
  padding: 1em;
  border-radius: 5px;
  border: none;
  background-color: #aaa;
  color: white;
  cursor: pointer;
  /* font-size: 1em; */
}

.dialog form input[type="submit"] {
  background-color: #333;
  
}

.dialog form button:hover {
  background-color: #888;
}

.dialog form input[type="submit"]:hover {
  background-color: #666;
}

.dialog form .buttons {
  display: flex;
  gap: 0.5em;
  justify-content: flex-end;
}

.open .dialog {
  pointer-events: all;
  opacity: 1;
}



</style>