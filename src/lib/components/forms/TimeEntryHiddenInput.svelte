<script lang="ts">
  import { timeStops } from '$lib/stores/timeStore';
  import { getFormField } from 'formsnap';

  export let id: string = '';

  const { setValue, actions, name } = getFormField();

  $: if (name === 'start_time') {
    setValue($timeStops[0]);
  } else if (name === 'id') {
    setValue(id);
  }
</script>

<input type="hidden" use:actions.input />
