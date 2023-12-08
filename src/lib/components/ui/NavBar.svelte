<script lang="ts">
  import { page } from '$app/stores';
  import { AlarmPlus, AlignLeft, FolderClock, History, Moon, Sun } from 'lucide-svelte';
  import { mode, toggleMode } from 'mode-watcher';
  import UserAvatar from './UserAvatar.svelte';
  import { Button } from './button';
  import * as DropdownMenu from './dropdown-menu';

  const links = [
    { href: '/', name: 'New Entry', icon: AlarmPlus },
    { href: '/previous', name: 'Previous Time', icon: History },
    { href: '/shared', name: 'Shared Time', icon: FolderClock }
  ];
</script>

<nav>
  <div class="buttons">
    {#each links as link}
      <Button variant="link" href={link.href}>
        <svelte:component this={link.icon} class="mr-2 h-4 w-4" />
        {link.name}
      </Button>
    {/each}
  </div>
  <div class="mobile">
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild let:builder>
        <Button variant="outline" builders={[builder]}>
          <AlignLeft class="h-6 w-6" />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content class="w-56" side="bottom" align="end" sideOffset={8}>
        {#each links as link}
          <DropdownMenu.Item href={link.href}>
            <svelte:component this={link.icon} class="mr-2 h-4 w-4" />
            {link.name}
          </DropdownMenu.Item>
        {/each}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  </div>
  <div class="actions">
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild let:builder>
        <Button variant="ghost" class="relative h-9 w-9 rounded-full px-0" builders={[builder]}>
          <UserAvatar class="h-9 w-9" />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content class="w-56" side="bottom" align="end" sideOffset={8}>
        <DropdownMenu.Label>
          <div class="space-y-1">
            <p class="text-sm font-bold leading-none">{$page.data.user.name ?? 'Admin'}</p>
            <p class="text-xs leading-none text-muted-foreground">{$page.data.user.email}</p>
          </div>
        </DropdownMenu.Label>
        <DropdownMenu.Separator />
        <DropdownMenu.Group>
          <DropdownMenu.Item
            on:click={toggleMode}
            title="Toggle {$mode === 'light' ? 'Dark' : 'Light'} Mode"
            role="switch"
            aria-checked={$mode === 'dark'}
            aria-label="Light/Dark Mode Switcher"
          >
            <Sun class="mr-2 h-4 w-4 dark:hidden" />
            <Moon class="mr-2 hidden h-4 w-4 dark:block" />
            Switch to {$mode === 'light' ? 'dark' : 'light'} mode
          </DropdownMenu.Item>
        </DropdownMenu.Group>
        <DropdownMenu.Separator />
        <DropdownMenu.Group>
          <DropdownMenu.Item href="/logout">Log out</DropdownMenu.Item>
        </DropdownMenu.Group>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  </div>
</nav>

<style lang="postcss">
  nav {
    @apply mb-4 flex items-center border-b bg-background px-6 py-3;
  }

  .buttons {
    @apply hidden flex-1 sm:block;
  }

  .mobile {
    @apply flex-1 sm:hidden;
  }
</style>
