<script lang="ts">
  import CustomerSelect from '$lib/components/forms/CustomerSelect.svelte';
  import AdminAddCustomerForm from '$lib/components/forms/admin/AdminAddCustomerForm.svelte';
  import TabCard from '$lib/components/ui/TabCard.svelte';
  import * as Card from '$lib/components/ui/card';
  import * as Form from '$lib/components/ui/form';
  import * as Tabs from '$lib/components/ui/tabs';
  import { adminEditCustomerSchema } from '$lib/schemas/index.js';
  import { convertSelectData } from '$lib/utils.js';

  export let data;
</script>

<section class="grid w-full grid-cols-[1fr_400px] gap-6">
  <div>
    <Tabs.Root>
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
            <AdminAddCustomerForm />
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
  </div>
  <aside>
    <Card.Root>
      <Card.Header>
        <Card.Title>Customers</Card.Title>
      </Card.Header>
      <Card.Content>
        <ul class="space-y-2">
          {#each data.fullCustomersList as customer (customer.id)}
            <li>{customer.name}</li>
          {/each}
        </ul>
      </Card.Content>
    </Card.Root>
  </aside>
</section>
