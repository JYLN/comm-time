<script lang="ts">
  import { getFormField } from 'formsnap';

  export let store;

  const { setValue, actions, name } = getFormField();

  $: if (name === 'start_time') {
    setValue($store[0]);
  }
</script>

<input type="hidden" use:actions.input />
