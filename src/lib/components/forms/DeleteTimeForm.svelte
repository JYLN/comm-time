<script lang="ts">
  import { page } from '$app/stores';
  import { deleteTimeEntrySchema } from '$lib/schemas';
  import type { SuperValidated } from 'sveltekit-superforms';
  import { addToast } from '../ui/Toaster.svelte';
  import * as AlertDialog from '../ui/alert-dialog';
  import * as Form from '../ui/form';
  import HiddenInput from './HiddenInput.svelte';

  const form = $page.data.deleteTimeForm as SuperValidated<Custom.Forms.DeleteTimeEntrySchema>;

  export let id: string;
  export let open: boolean;
</script>

<Form.Root
  {form}
  schema={deleteTimeEntrySchema}
  options={{
    onResult: ({ result }) => {
      switch (result.type) {
        case 'success':
        case 'redirect':
          open = false;
          addToast({
            data: { title: 'Success!', description: 'Time entry deleted successfully!' }
          });
          break;
      }
    },
    onError: ({ result }) => {
      console.log(result);
      addToast({ data: { title: 'Error!', description: result.error.message } });
    }
  }}
  method="POST"
  enctype="multipart/form-data"
  action="?/deleteTimeEntry"
  let:config
>
  <Form.Field {config} name="id">
    <Form.Item hidden>
      <HiddenInput {id} />
    </Form.Item>
  </Form.Field>
  <AlertDialog.Action asChild>
    <Form.Button>Delete</Form.Button>
  </AlertDialog.Action>
</Form.Root>
