<script lang="ts">
  import { page } from '$app/stores';
  import { cn, convertSelectData } from '$lib/utils';
  import { Check, ChevronsUpDown, X } from 'lucide-svelte';
  import { tick } from 'svelte';
  import UserAvatar from '../ui/UserAvatar.svelte';
  import { Button } from '../ui/button';
  import * as Command from '../ui/command';
  import * as Popover from '../ui/popover';

  type Props = {
    value: string;
    name?: string;
    removable?: boolean;
    onChange?: (newValue: string) => Promise<void>;
    onRemove?: (indexToRemove: string | undefined) => Promise<void>;
  };

  export let value: Props['value'] = '';
  export let name: Props['name'] = undefined;
  export let removable: Props['removable'] = false;
  export let onChange: Props['onChange'] = undefined;
  export let onRemove: Props['onRemove'] = undefined;

  let users = convertSelectData($page.data.fullUsersList);
  let open = false;

  $: selectedUser = users?.find((el) => el.value === value);

  function closeAndFocusTrigger(triggerId: string) {
    open = false;
    tick().then(() => {
      document.getElementById(triggerId)?.focus();
    });
  }
</script>

<Popover.Root bind:open let:ids positioning={{ placement: 'bottom-start' }}>
  <Popover.Trigger asChild let:builder>
    <div class="flex gap-2">
      <Button
        builders={[builder]}
        variant="outline"
        role="combobox"
        type="button"
        class={cn('flex-1 justify-between', !value && 'text-muted-foreground')}
      >
        <span class="flex items-center">
          {#if selectedUser}
            <UserAvatar
              class="mr-2 h-7 w-7"
              user={$page.data.fullUsersList?.find((user) => user.id === selectedUser?.value)}
            />
          {/if}
          {selectedUser?.label ?? 'Select a user...'}
        </span>
        <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
      {#if removable}
        <Button variant="destructive" on:click={() => onRemove?.(selectedUser?.value)} class="px-2">
          <X class="h-4 w-4" />
        </Button>
      {/if}
    </div>
  </Popover.Trigger>
  <Popover.Content class="w-[425px] p-0">
    <Command.Root>
      <Command.Input autofocus placeholder="Search user..." />
      <Command.Empty>No user found.</Command.Empty>
      <Command.Group>
        {#each users as user}
          <Command.Item
            value={user.label}
            onSelect={() => {
              value = user.value;
              closeAndFocusTrigger(ids.trigger);
              onChange?.(user.value).then(() => {
                value = '';
              });
            }}
          >
            <Check class={cn('mr-2 h-4 w-4', user.value !== value && 'text-transparent')} />
            <span class="flex items-center">
              <UserAvatar
                class="mr-2 h-7 w-7"
                user={$page.data.fullUsersList?.find((found) => found.id === user.value)}
              />
              {user.label}
            </span>
          </Command.Item>
        {/each}
      </Command.Group>
    </Command.Root>
  </Popover.Content>
</Popover.Root>

<input type="hidden" {name} bind:value />
