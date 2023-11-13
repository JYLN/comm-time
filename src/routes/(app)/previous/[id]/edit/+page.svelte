<script lang="ts">
  import EditTimeEntryForm from '$lib/components/forms/EditTimeEntryForm.svelte';
  import { addToast } from '$lib/components/ui/Toaster.svelte';
  import { Button } from '$lib/components/ui/button';
  import { editTimeEntrySchema, type EditTimeEntrySchema } from '$lib/schemas/index.js';
  import { convertSelectData } from '$lib/utils.js';
  import type { FormOptions } from 'formsnap';
  import { Undo2 } from 'lucide-svelte';
  import moment from 'moment';

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
              description: 'Time entry edited successfully!'
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
  <div class="flex gap-3">
    <Button variant="ghost" size="icon" href="/previous">
      <Undo2 />
    </Button>
    <div>
      <h2 class="heading-1 mb-2">Edit - {data.timeEntry?.name}</h2>
      <p class="mb-4 text-sm text-muted-foreground">
        Start Time: {moment(data.timeEntry?.start_time).format('MM/DD/YY hh:mma')} • End Time: {moment(
          data.timeEntry?.end_time
        ).format('MM/DD/YY hh:mma')}
      </p>
    </div>
  </div>
  {#if data.form}
    <EditTimeEntryForm
      form={data.form}
      customers={convertSelectData(data.customerData)}
      {options}
    />
  {/if}
</main>
