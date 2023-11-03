<script lang="ts">
  import EditTimeEntryForm from '$lib/components/forms/EditTimeEntryForm.svelte';
  import { convertCustomerData } from '$lib/utils.js';

  export let data;
</script>

{#if data.form}
  <main class="container mx-auto">
    <h2 class="heading-1">Edit - {data.timeEntry?.name}</h2>
    <EditTimeEntryForm form={data.form} customers={convertCustomerData(data.customerData)} />
  </main>
{/if}
