<script lang="ts">
  import { getFormField } from 'formsnap';
  import { writable } from 'svelte/store';

  export let store = writable([]);
  export let id: string = '';

  const { setValue, actions, name } = getFormField();

  $: if (name === 'start_time') {
    setValue($store[0]);
  } else if (name === 'id') {
    setValue(id);
  }
</script>

<input type="hidden" use:actions.input />
