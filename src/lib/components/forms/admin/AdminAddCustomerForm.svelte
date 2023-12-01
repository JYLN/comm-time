<script lang="ts">
  import { page } from '$app/stores';
  import { addToast } from '$lib/components/ui/Toaster.svelte';
  import { adminAddCustomerSchema } from '$lib/schemas';
  import type { SuperValidated } from 'sveltekit-superforms';
  import * as Form from '../../ui/form';

  const form = $page.data
    .adminAddCustomerForm as SuperValidated<Custom.Forms.AdminAddCustomerSchema>;
</script>

<Form.Root
  {form}
  schema={adminAddCustomerSchema}
  options={{
    onResult: ({ result }) => {
      switch (result.type) {
        case 'success':
        case 'redirect':
          addToast({
            data: { title: 'Success!', description: 'Customer successfully added!' }
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
  action="?/addCustomer"
  let:config
  class="grid gap-4"
  debug={true}
>
  <Form.Field {config} name="name">
    <Form.Item>
      <Form.Label>New Customer Name</Form.Label>
      <Form.Input />
      <Form.Validation />
    </Form.Item>
  </Form.Field>
  <Form.Button>Submit</Form.Button>
</Form.Root>
