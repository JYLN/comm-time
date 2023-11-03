<script lang="ts">
  import EditTimeEntryForm from '$lib/components/forms/EditTimeEntryForm.svelte';

  export let data;
</script>

<main class="container mx-auto">
  <h2 class="heading-1">Edit {data.timeEntry?.name}</h2>
  <EditTimeEntryForm form={data.form} customers={data.customerData} />
</main>
