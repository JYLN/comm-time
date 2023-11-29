<script lang="ts">
  import { timeStops } from '$lib/stores/timeStore';
  import { getFormField } from 'formsnap';

  export let id: string = '';

  const { value, actions, name } = getFormField();

  $: if (name === 'start_time') {
    $value = $timeStops[0];
  } else if (name === 'id') {
    $value = id;
  }
</script>

<input type="hidden" use:actions.input />
