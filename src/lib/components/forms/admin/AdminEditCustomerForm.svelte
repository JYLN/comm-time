<script lang="ts">
  import { page } from '$app/stores';
  import { adminEditCustomerSchema } from '$lib/schemas';
  import type { SuperValidated } from 'sveltekit-superforms';
  import { addToast } from '../../ui/Toaster.svelte';
  import * as Form from '../../ui/form';
  import CustomerSelect from '../CustomerSelect.svelte';

  const form = $page.data
    .adminEditCustomerForm as SuperValidated<Custom.Forms.AdminEditCustomerSchema>;
</script>

<Form.Root
  {form}
  schema={adminEditCustomerSchema}
  options={{
    onResult: ({ result }) => {
      switch (result.type) {
        case 'success':
        case 'redirect':
          addToast({
            data: { title: 'Success!', description: 'Customer successfully updated!' }
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
  action="?/editCustomer"
  let:config
  let:formValues
  class="grid gap-4"
  debug={true}
>
  <Form.Field {config} name="id">
    <CustomerSelect />
    <Form.Validation />
  </Form.Field>
  {#if formValues.id}
    <Form.Field {config} name="new_name">
      <Form.Label>Update Name</Form.Label>
      <Form.Input />
      <Form.Validation />
    </Form.Field>
  {/if}
  <Form.Button>Submit</Form.Button>
</Form.Root>
