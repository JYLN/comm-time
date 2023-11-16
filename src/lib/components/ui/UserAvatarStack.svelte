<script lang="ts">
  import { cn } from '$lib/utils';
  import type { Tooltip as TooltipPrimitive } from 'bits-ui';
  import type { UsersResponse } from '../../../backend-types';
  import UserAvatar from './UserAvatar.svelte';
  import * as Avatar from './avatar';
  import * as Tooltip from './tooltip';

  export let users: UsersResponse[] | undefined;

  let stack_class = 'h-9 w-9 border-2 dark:border-background';
  const displayedUsers = users?.slice(0, 3);
  const nonDisplayedUsers = users?.slice(3);
  const toolTipProps: TooltipPrimitive.Props = {
    positioning: { placement: 'bottom' },
    openDelay: 200,
    closeDelay: 100,
    group: 'user',
    portal: null
  };
</script>

<div
  class={cn(
    'flex items-center justify-end',
    displayedUsers?.length == 2 && '-space-x-2',
    displayedUsers?.length == 3 && '-space-x-3'
  )}
>
  {#if displayedUsers}
    {#each displayedUsers as user (user.id)}
      <Tooltip.Root {...toolTipProps}>
        <Tooltip.Trigger>
          <UserAvatar {user} class={stack_class} />
        </Tooltip.Trigger>
        <Tooltip.Content>
          <p>{user.name}</p>
        </Tooltip.Content>
      </Tooltip.Root>
    {/each}

    {#if nonDisplayedUsers && nonDisplayedUsers.length > 0}
      <Tooltip.Root {...toolTipProps}>
        <Tooltip.Trigger>
          <Avatar.Root class={stack_class}>
            <Avatar.Fallback>+{nonDisplayedUsers.length}</Avatar.Fallback>
          </Avatar.Root>
        </Tooltip.Trigger>
        <Tooltip.Content>
          {#each nonDisplayedUsers as user (user.id)}
            <p>{user.name}</p>
          {/each}
        </Tooltip.Content>
      </Tooltip.Root>
    {/if}
  {/if}
</div>
