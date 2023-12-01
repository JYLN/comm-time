<script lang="ts">
  import AdminAddCustomerForm from '$lib/components/forms/admin/AdminAddCustomerForm.svelte';
  import AdminEditCustomerForm from '$lib/components/forms/admin/AdminEditCustomerForm.svelte';
  import TabCard from '$lib/components/ui/TabCard.svelte';
  import * as Card from '$lib/components/ui/card';
  import * as Tabs from '$lib/components/ui/tabs';

  export let data;
</script>

<svelte:head>
  <title>Admin - CommTime</title>
</svelte:head>

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
            <AdminEditCustomerForm />
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
