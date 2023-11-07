<script lang="ts">
  import TimeTable from '$lib/components/ui/TimeTable.svelte';

  export let data;
</script>

<main class="container mx-auto">
  {#if data.tableData && data.tableData.length > 0}
    <TimeTable data={data.tableData} />
  {:else}
    <h2 class="heading-1">No time entries shared. Come back when one is shared with you!</h2>
  {/if}
</main>
