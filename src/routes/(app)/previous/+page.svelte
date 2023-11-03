<script lang="ts">
  import TimeTable from '$lib/components/ui/TimeTable.svelte';

  export let data;
</script>

<main class="container mx-auto">
  {#if data.tableData.length > 0}
    <TimeTable form={data.form} data={data.tableData} />
  {:else}
    <h2 class="heading-1">
      No time entries created.
      <a href="/" class="underline transition-colors hover:text-muted-foreground">Go back</a>
      to create one.
    </h2>
  {/if}
</main>
