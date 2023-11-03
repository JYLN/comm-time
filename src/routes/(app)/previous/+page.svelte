<script lang="ts">
  import TimeTable from '$lib/components/ui/TimeTable.svelte';

  export let data;
</script>

<main class="container mx-auto">
  <TimeTable form={data.form} />
</main>
