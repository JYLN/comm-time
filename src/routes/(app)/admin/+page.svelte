<script lang="ts">
  import CustomerSelect from '$lib/components/forms/CustomerSelect.svelte';
  import TabCard from '$lib/components/ui/TabCard.svelte';
  import { addToast } from '$lib/components/ui/Toaster.svelte';
  import * as Form from '$lib/components/ui/form';
  import * as Tabs from '$lib/components/ui/tabs';
  import { adminCreateCustomerSchema, adminEditCustomerSchema } from '$lib/schemas/index.js';
  import { convertSelectData } from '$lib/utils.js';

  export let data;
</script>

<Tabs.Root class="max-w-[750px]">
  <Tabs.List class="mb-3 grid w-full grid-cols-2">
    <Tabs.Trigger value="add">Add Customer</Tabs.Trigger>
    <Tabs.Trigger value="edit">Edit Customer</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="add">
    <TabCard>
      <svelte:fragment slot="description">
        Fill out the form below to add a new customer.
      </svelte:fragment>
      <svelte:fragment slot="form">
        <Form.Root
          form={data.adminCreateCustomerForm}
          schema={adminCreateCustomerSchema}
          method="POST"
          action="?/createCustomer"
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
      </svelte:fragment>
    </TabCard>
  </Tabs.Content>
  <Tabs.Content value="edit">
    <TabCard>
      <svelte:fragment slot="description">Select a customer below to edit.</svelte:fragment>
      <svelte:fragment slot="form">
        <Form.Root
          form={data.adminEditCustomerForm}
          schema={adminEditCustomerSchema}
          method="POST"
          action="?/editCustomer"
          let:config
          class="grid gap-4"
          debug={true}
          let:formValues
        >
          <Form.Field {config} name="id" let:setValue let:value>
            <CustomerSelect
              {setValue}
              {value}
              customers={convertSelectData(data.fullCustomersList)}
            />
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
      </svelte:fragment>
    </TabCard>
  </Tabs.Content>
</Tabs.Root>
