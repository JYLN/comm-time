<script lang="ts">
  import EditTimeEntryForm from '$lib/components/forms/EditTimeEntryForm.svelte';
  import { addToast } from '$lib/components/ui/Toaster.svelte';
  import { editTimeEntrySchema, type EditTimeEntrySchema } from '$lib/schemas/index.js';
  import { convertSelectData } from '$lib/utils.js';
  import type { FormOptions } from 'formsnap';

  export let data;

  const options: FormOptions<EditTimeEntrySchema> = {
    validators: editTimeEntrySchema,
    onResult: ({ result }) => {
      switch (result.type) {
        case 'success':
        case 'redirect':
          addToast({
            data: {
              title: 'Success!',
              description: 'This time entry has been successfully edited!'
            }
          });
          break;
      }
    },
    onError: ({ result }) => {
      console.log(result);
      addToast({ data: { title: 'Error!', description: result.error.message } });
    }
  };
</script>

<main class="container mx-auto">
  <h2 class="heading-1">Edit - {data.timeEntry?.name}</h2>
  {#if data.form}
    <EditTimeEntryForm
      form={data.form}
      customers={convertSelectData(data.customerData)}
      {options}
    />
  {/if}
</main>
