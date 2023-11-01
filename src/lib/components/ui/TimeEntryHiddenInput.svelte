<script lang="ts">
  import { getFormField } from 'formsnap';

  export let store;

  const { setValue, actions, name } = getFormField();

  $: if (name === 'start_time') {
    setValue($store[0]);
  } else if (name === 'end_time') {
    setValue($store[$store.length - 1]);
  } else if (name === 'time_stops') {
    setValue($store.join(','));
  }
</script>

<input type="hidden" use:actions.input />
