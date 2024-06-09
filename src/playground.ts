import { ref, reactive, onMounted, nextTick, computed } from 'vue';
import { QUERY_KEY_NAME, STORAGE_KEY_PREFIX } from './constants.ts';

////////////////////////////////////////////////////////////////////////////////////////////////////////

function usePlayground(store: any) {

  const name = ref('');

  // read the query string to get the name
  const query = new URLSearchParams(location.search);
  name.value = query.get(QUERY_KEY_NAME) || '';

  function _load(name: string) {
    const key = `${STORAGE_KEY_PREFIX}${name}`;
    const hash = localStorage.getItem(key);
    if (hash) {
      store.deserialize(hash);
      console.log('Loaded:', name, hash.length, 'bytes');
    }
  }

  if(name.value) {
    _load(name.value);
  }

  const saveDialog = reactive({
    open: false,
    name: '',
    inputName: null as HTMLInputElement | null
  });

  const loadDialog = reactive({
    open: false,
    name: '',
    inputName: null as HTMLInputElement | null
  });

  onMounted(() => {
    saveDialog.inputName = document.querySelector('#saveDialogName');
  });

  function openSaveDialog() {
    refreshSavedPlaygrounds();

    saveDialog.name = name.value;
    saveDialog.open = true;

    nextTick(() => {
      saveDialog.inputName?.focus();
      saveDialog.inputName?.setSelectionRange(0, saveDialog.inputName.value.length);
    })
  }

  function openLoadDialog() {
    refreshSavedPlaygrounds();

    loadDialog.name = ''; // name.value;
    loadDialog.open = true;

    nextTick(() => {
      loadDialog.inputName?.focus();
      loadDialog.inputName?.setSelectionRange(0, loadDialog.inputName.value.length);
    })
  }

  function load(name: string) {
    debugger;
    // set window url to the new name
    const query = new URLSearchParams(location.search);
    query.set(QUERY_KEY_NAME, name);
    const url = `${location.pathname}?${query}`;
    window.location.href = url;
  }

  function save() {

    if (!saveDialog.name) {
      saveDialog.inputName?.focus();
      return;
    }

    const hash = store.serialize();
    const key = `${STORAGE_KEY_PREFIX}${saveDialog.name}`;
    localStorage.setItem(key, hash);
    saveDialog.open = false;
    name.value = saveDialog.name;

    refreshSavedPlaygrounds();

    console.log('Saved:', saveDialog.name, hash.length, 'bytes');

    // rewrite query string with the new name
    const query = new URLSearchParams(location.search);
    query.set(QUERY_KEY_NAME, saveDialog.name);
    history.replaceState({}, '', `${location.pathname}?${query}`);
  }

  const savedPlaygrounds = ref<string[]>([]);

  function refreshSavedPlaygrounds() {
    const keys = Object.keys(localStorage);
    const names = keys
      .filter(key => key.startsWith(STORAGE_KEY_PREFIX))
      .map(key => key.slice(STORAGE_KEY_PREFIX.length));
    savedPlaygrounds.value = names;
  }
  
  function removeSaved(name: string) {
    const key = `${STORAGE_KEY_PREFIX}${name}`;
    localStorage.removeItem(key);
    refreshSavedPlaygrounds();
    console.log('Removed:', name);
  }

  return reactive({
    name,
    saveDialog,
    loadDialog,
    openLoadDialog,
    openSaveDialog,
    save,
    load,
    savedPlaygrounds,
    removeSaved  
  });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////

export default usePlayground;