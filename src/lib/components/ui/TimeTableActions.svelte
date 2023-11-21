<script lang="ts">
  import { page } from '$app/stores';
  import { deleteTimeEntrySchema, type DeleteTimeEntrySchema } from '$lib/schemas';
  import { MoreHorizontal, Pencil, ScrollText, Share, Trash2 } from 'lucide-svelte';
  import type { SuperValidated } from 'sveltekit-superforms';
  import type { UsersResponse } from '../../../backend-types';
  import { humanize } from '../../utils';
  import SharedUserForm from '../forms/SharedUserForm.svelte';
  import TimeEntryHiddenInput from '../forms/TimeEntryHiddenInput.svelte';
  import * as AlertDialog from '../ui/alert-dialog';
  import * as Sheet from '../ui/sheet';
  import { Button } from './button';
  import * as DropdownMenu from './dropdown-menu';
  import * as Form from './form';
  import NotesDisplay from './NotesDisplay.svelte';
  import { Separator } from './separator';
  import { addToast } from './Toaster.svelte';
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

  let actionsOpen: boolean = false;
  let noteSheetOpen: boolean = false;
  let deleteDialogOpen: boolean = false;
  let shareSheetOpen: boolean = false;
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
      <DropdownMenu.Item on:click={() => (noteSheetOpen = true)}>
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
        <DropdownMenu.Item on:click={() => (shareSheetOpen = true)}>
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

<Sheet.Root bind:open={noteSheetOpen} openFocus="[data-bits-dialog-close]">
  <Sheet.Content class="w-full sm:max-w-3xl">
    <Sheet.Header class="mb-3 space-y-3">
      <Sheet.Title class="mb-1 text-4xl">{name}</Sheet.Title>
      <Separator />
      <Sheet.Description class="mb-3 space-y-3">
        <div class="grid gap-y-4 sm:grid-flow-col sm:grid-cols-2 sm:grid-rows-3">
          <div class="flex items-center gap-2 text-left">
            <div class="basis-1/4 sm:basis-1/3">Created by</div>
            <div class="flex items-center gap-1">
              <UserAvatar user={author} class="h-9 w-9 border-2 dark:border-background" />
              {author.name}
            </div>
          </div>

          <div class="flex items-center gap-2 text-left">
            <div class="basis-1/4 sm:basis-1/3">Shared with</div>
            <div>
              {#if shared_users}
                <UserAvatarStack users={shared_users} />
              {:else}
                <p>None</p>
              {/if}
            </div>
          </div>

          <div class="flex items-center gap-2 text-left">
            <div class="basis-1/4 sm:basis-1/3">Start Time</div>
            <div>{humanize(start_time)}</div>
          </div>

          <div class="flex items-center gap-2 text-left">
            <div class="basis-1/4 sm:basis-1/3">Customer</div>
            <div>{customer}</div>
          </div>

          <div class="flex items-center gap-2 text-left">
            <div class="basis-1/4 sm:basis-1/3">Elapsed Time</div>
            <div>{humanize(elapsed_time)}</div>
          </div>

          <div class="flex items-center gap-2 text-left">
            <div class="basis-1/4 sm:basis-1/3">End Time</div>
            <div>{humanize(end_time)}</div>
          </div>
        </div>
      </Sheet.Description>
      <Separator />
    </Sheet.Header>
    <NotesDisplay {notes} />
  </Sheet.Content>
</Sheet.Root>

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

<Sheet.Root bind:open={shareSheetOpen} openFocus="[data-bits-dialog-close]">
  <Sheet.Content class="w-full sm:max-w-xl">
    <Sheet.Header class="mb-3">
      <Sheet.Title>Share - {name}</Sheet.Title>
      <Sheet.Description>
        Sharing a time entry allows other users to view the name, customer, time, and notes of a
        time entry. Select users below to share this time entry. Click 'Submit' when finished.
      </Sheet.Description>
    </Sheet.Header>
    <SharedUserForm
      formData={$page.data.sharedUsersForm}
      users={shared_users}
      {id}
      bind:open={shareSheetOpen}
    />
  </Sheet.Content>
</Sheet.Root>
