<script lang="ts">
  import { page } from '$app/stores';
  import { sharedUsersSchema, type SharedUsersSchema } from '$lib/schemas';
  import { onMount, tick } from 'svelte';
  import type { SuperValidated } from 'sveltekit-superforms';
  import { superForm } from 'sveltekit-superforms/client';
  import type { UsersResponse } from '../../../backend-types';
  import { Button } from '../ui/button';
  import { Label } from '../ui/label';
  import { addToast } from '../ui/Toaster.svelte';
  import UserSelect from './UserSelect.svelte';

  export let users: UsersResponse[] | undefined;
  export let id: string;
  export let open: boolean;

  const { form, enhance, errors } = superForm(
    $page.data.sharedUsersForm as SuperValidated<SharedUsersSchema>,
    {
      validators: sharedUsersSchema,
      onResult: ({ result }) => {
        switch (result.type) {
          case 'success':
          case 'redirect':
            open = false;
            addToast({
              data: { title: 'Success!', description: 'Shared users updated successfully!' }
            });
            break;
        }
      },
      onError: ({ result }) => {
        console.log(result);
        addToast({ data: { title: 'Error!', description: result.error.message } });
      }
    }
  );

  $: formErrors = $errors.shared_users?._errors ? true : false;

  onMount(() => {
    $form.id = id;
    $form.shared_users = users?.map((user) => user.id) || [];
  });

  async function addUser(newValue: string) {
    console.log('ADDING USER');
    if (!newValue) return;
    $form.shared_users = [...($form.shared_users as string[]), newValue];
    await tick();
  }

  async function removeUser(userToRemove: string | undefined) {
    if (!userToRemove) return;
    $form.shared_users = $form.shared_users?.filter(
      (_, i) => i !== $form.shared_users?.indexOf(userToRemove)
    );
    await tick();
  }
</script>

<form method="POST" action="?/shareTimeEntry" use:enhance class="grid gap-4">
  <input type="hidden" name="id" bind:value={$form.id} />
  <Label for="users">Users</Label>
  {#if $form.shared_users}
    {#key $form.shared_users}
      {#each $form.shared_users as _, i}
        <UserSelect
          name="shared_users"
          bind:value={$form.shared_users[i]}
          removable={true}
          onRemove={removeUser}
        />
      {/each}
    {/key}
  {/if}

  <UserSelect onChange={addUser} />

  {#if formErrors}
    <p class="text-sm text-destructive">{$errors.shared_users?._errors}</p>
  {/if}

  <Button type="submit" disabled={formErrors}>Submit</Button>
</form>
