<script lang="ts">
  import { page } from '$app/stores';
  import { deleteTimeEntrySchema, type DeleteTimeEntrySchema } from '$lib/schemas';
  import { humanize } from '$lib/utils';
  import { MoreHorizontal, Pencil, ScrollText, Share, Trash2 } from 'lucide-svelte';
  import type { SuperValidated } from 'sveltekit-superforms';
  import type { UsersResponse } from '../../../backend-types';
  import SharedUserForm from '../forms/SharedUserForm.svelte';
  import TimeEntryHiddenInput from '../forms/TimeEntryHiddenInput.svelte';
  import * as AlertDialog from '../ui/alert-dialog';
  import { Button } from './button';
  import * as Dialog from './dialog';
  import * as DropdownMenu from './dropdown-menu';
  import * as Form from './form';
  import NotesDisplay from './NotesDisplay.svelte';
  import { Separator } from './separator';
  import UserAvatar from './UserAvatar.svelte';
  import UserAvatarStack from './UserAvatarStack.svelte';

  export let id: string;
  export let name: string;
  export let customer: string;
  export let notes: string;
  export let elapsed_time: number;
  export let shared_users: UsersResponse[];
  export let author: UsersResponse;
  export let start_time: string;
  export let end_time: string;
  export let deleteTimeForm: SuperValidated<DeleteTimeEntrySchema> | undefined = undefined;

  let actionsOpen = false;
  let noteDialogOpen = false;
  let deleteDialogOpen = false;
  let shareDialogOpen = false;
</script>

<DropdownMenu.Root positioning={{ placement: 'bottom-end' }} bind:open={actionsOpen}>
  <DropdownMenu.Trigger asChild let:builder>
    <Button variant="ghost" builders={[builder]} size="icon" class="relative h-8 w-8 p-0">
      <MoreHorizontal class="h-4 w-4" />
    </Button>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content>
    <DropdownMenu.Label>Actions</DropdownMenu.Label>
    <DropdownMenu.Group>
      <DropdownMenu.Item on:click={() => (noteDialogOpen = true)}>
        <ScrollText class="mr-2 h-4 w-4" />
        Show notes
      </DropdownMenu.Item>
    </DropdownMenu.Group>
    {#if $page.url.pathname === '/previous'}
      <DropdownMenu.Separator />
      <DropdownMenu.Group>
        <DropdownMenu.Item on:click={() => (actionsOpen = false)} href="/previous/{id}/edit">
          <Pencil class="mr-2 h-4 w-4" />
          Edit time entry
        </DropdownMenu.Item>
        <DropdownMenu.Item on:click={() => (shareDialogOpen = true)}>
          <Share class="mr-2 h-4 w-4" />
          Share time entry
        </DropdownMenu.Item>
      </DropdownMenu.Group>
      <DropdownMenu.Separator />
      <DropdownMenu.Group>
        <DropdownMenu.Item class="text-destructive" on:click={() => (deleteDialogOpen = true)}>
          <Trash2 class="mr-2 h-4 w-4" />
          Delete time entry
        </DropdownMenu.Item>
      </DropdownMenu.Group>
    {/if}
  </DropdownMenu.Content>
</DropdownMenu.Root>

<Dialog.Root bind:open={noteDialogOpen} openFocus="[data-bits-dialog-close]">
  <Dialog.Content class="max-w-3xl">
    <Dialog.Header class="mb-3 space-y-3">
      <Dialog.Title class="mb-1 text-4xl">{name}</Dialog.Title>
      <Separator />
      <Dialog.Description>
        <div class="grid grid-flow-col grid-cols-2 grid-rows-3 gap-y-4">
          <div class="flex items-center gap-2">
            <div class="basis-1/3">Created by</div>
            <div class="flex items-center gap-1">
              <UserAvatar user={author} class="h-9 w-9 border-2 dark:border-background" />
              {author.name}
            </div>
          </div>

          <div class="flex items-center gap-2">
            <div class="basis-1/3">Shared with</div>
            <div>
              {#if shared_users}
                <UserAvatarStack users={shared_users} />
              {:else}
                <p>None</p>
              {/if}
            </div>
          </div>

          <div class="flex items-center gap-2">
            <div class="basis-1/3">Start Time</div>
            <div>{humanize(start_time)}</div>
          </div>

          <div class="flex items-center gap-2">
            <div class="basis-1/3">Customer</div>
            <div>{customer}</div>
          </div>

          <div class="flex items-center gap-2">
            <div class="basis-1/3">Elapsed Time</div>
            <div>{humanize(elapsed_time)}</div>
          </div>

          <div class="flex items-center gap-2">
            <div class="basis-1/3">End Time</div>
            <div>{humanize(end_time)}</div>
          </div>
        </div>
      </Dialog.Description>
      <Separator />
    </Dialog.Header>
    <NotesDisplay {notes} />
  </Dialog.Content>
</Dialog.Root>

<AlertDialog.Root bind:open={deleteDialogOpen}>
  <AlertDialog.Content>
    <AlertDialog.Header>
      <AlertDialog.Title>Are you sure?</AlertDialog.Title>
      <AlertDialog.Description>
        Deleting this time entry is permanent. Time entries cannot be recovered.
      </AlertDialog.Description>
    </AlertDialog.Header>
    <AlertDialog.Footer>
      <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
      {#if deleteTimeForm}
        <Form.Root
          form={deleteTimeForm}
          schema={deleteTimeEntrySchema}
          options={{
            onResult: ({ result }) => {
              switch (result.type) {
                case 'success':
                case 'redirect':
                  deleteDialogOpen = false;
                  break;
              }
            }
          }}
          let:config
          action="?/deleteTimeEntry"
          method="POST"
        >
          <Form.Field {config} name="id">
            <Form.Item hidden>
              <TimeEntryHiddenInput {id} />
            </Form.Item>
          </Form.Field>
          <AlertDialog.Action asChild>
            <Form.Button>Delete</Form.Button>
          </AlertDialog.Action>
        </Form.Root>
      {/if}
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>

<Dialog.Root bind:open={shareDialogOpen} openFocus="[data-bits-dialog-close]">
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>Share - {name}</Dialog.Title>
      <Dialog.Description>
        Sharing a time entry allows other users to view the name, customer, time, and notes of a
        time entry. Select users below to share this time entry. Click 'Submit' when finished.
      </Dialog.Description>
    </Dialog.Header>
    <SharedUserForm
      formData={$page.data.sharedUsersForm}
      users={shared_users.map((user) => user.id)}
      {id}
      bind:open={shareDialogOpen}
    />
  </Dialog.Content>
</Dialog.Root>
