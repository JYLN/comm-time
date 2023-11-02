<script lang="ts">
  import { humanize } from '$lib/utils';
  import { MoreHorizontal, Pencil, ScrollText, Share, Trash2 } from 'lucide-svelte';
  import * as Dialog from '../ui/dialog';
  import * as DropdownMenu from '../ui/dropdown-menu';
  import { Button } from './button';

  export let id: string;
  export let name: string;
  export let customer: string;
  export let notes: string;
  export let elapsed_time: number;

  let noteDialogOpen = false;
</script>

<DropdownMenu.Root positioning={{ placement: 'bottom-end' }}>
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
    <DropdownMenu.Separator />
    <DropdownMenu.Group>
      <DropdownMenu.Item href="/previous/{id}/edit">
        <Pencil class="mr-2 h-4 w-4" />
        Edit time entry
      </DropdownMenu.Item>
      <DropdownMenu.Item>
        <Share class="mr-2 h-4 w-4" />
        Share time entry
      </DropdownMenu.Item>
    </DropdownMenu.Group>
    <DropdownMenu.Separator />
    <DropdownMenu.Group>
      <DropdownMenu.Item class="text-destructive">
        <Trash2 class="mr-2 h-4 w-4" />
        Delete time entry
      </DropdownMenu.Item>
    </DropdownMenu.Group>
  </DropdownMenu.Content>
</DropdownMenu.Root>

<Dialog.Root bind:open={noteDialogOpen}>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>{name}</Dialog.Title>
      <Dialog.Description>{customer} • {humanize(elapsed_time)}</Dialog.Description>
    </Dialog.Header>
    <div class="prose prose-zinc dark:prose-invert">
      {notes}
    </div>
  </Dialog.Content>
</Dialog.Root>
