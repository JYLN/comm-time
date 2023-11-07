<script lang="ts">
  import { sharedUsersSchema, type SharedUsersSchema } from '$lib/schemas';
  import { onMount, tick } from 'svelte';
  import type { SuperValidated } from 'sveltekit-superforms';
  import { superForm } from 'sveltekit-superforms/client';
  import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
  import * as Form from '../ui/form';
  import { Label } from '../ui/label';
  import UserSelect from './UserSelect.svelte';

  export let formData: SuperValidated<SharedUsersSchema>;
  export let users: string[] | undefined;

  const { form, enhance, errors } = superForm(formData, {
    validators: sharedUsersSchema
  });

  $: formErrors = $errors.shared_users?._errors ? true : false;

  onMount(() => {
    $form.shared_users = users;
  });

  async function addUser(newValue: string) {
    console.log('Adding user...');
    if (!newValue) return;
    $form.shared_users = [...($form.shared_users as string[]), newValue];
    await tick();
  }

  async function removeUser(userToRemove: string | undefined) {
    console.log('Removing user');
    if (!userToRemove) return;
    $form.shared_users = $form.shared_users?.filter(
      (_, i) => i !== $form.shared_users?.indexOf(userToRemove)
    );
    await tick();
  }
</script>

<form method="POST" action="?/shareTimeEntry" use:enhance class="grid gap-4">
  <Label for="users">Users</Label>
  {#if $form.shared_users}
    {#each $form.shared_users as _, i}
      <UserSelect
        name="shared_users"
        bind:value={$form.shared_users[i]}
        removable={true}
        onRemove={removeUser}
      />
    {/each}
  {/if}

  <UserSelect onChange={addUser} />

  {#if $errors.shared_users?._errors}
    <p class="text-sm text-destructive">{$errors.shared_users._errors}</p>
  {/if}

  <Form.Button disabled={formErrors}>Submit</Form.Button>
</form>

<SuperDebug data={$form} />
