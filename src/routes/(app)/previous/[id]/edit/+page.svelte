<script lang="ts">
  import EditTimeEntryForm from '$lib/components/forms/EditTimeEntryForm.svelte';
  import { convertCustomerData } from '$lib/utils.js';

  export let data;
</script>

<main class="container mx-auto">
  <h2 class="heading-1">Edit - {data.timeEntry?.name}</h2>
  {#if data.form}
    <EditTimeEntryForm form={data.form} customers={convertCustomerData(data.customerData)} />
  {/if}
</main>
