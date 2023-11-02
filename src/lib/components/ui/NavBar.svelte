<script lang="ts">
  import { AlignLeft, FolderClock, History, Moon, Sun } from 'lucide-svelte';
  import { mode, toggleMode } from 'mode-watcher';
  import * as Avatar from './avatar';
  import { Button } from './button';
  import * as DropdownMenu from './dropdown-menu';
</script>

<nav>
  <div class="buttons">
    <Button variant="link" href="/previous">
      <History class="mr-2 h-4 w-4" />
      Previous Time
    </Button>
    <Button variant="link">
      <FolderClock class="mr-2 h-4 w-4" />
      Shared Time
    </Button>
  </div>
  <div class="mobile">
    <DropdownMenu.Root positioning={{ placement: 'bottom-end' }}>
      <DropdownMenu.Trigger asChild let:builder>
        <Button variant="outline" builders={[builder]}>
          <AlignLeft class="h-6 w-6" />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content class="w-56">
        <DropdownMenu.Item>
          <History class="mr-2 h-4 w-4" />
          Previous Time
        </DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item>
          <FolderClock class="mr-2 h-5 w-5" />
          Shared Time
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  </div>
  <div class="actions">
    <DropdownMenu.Root positioning={{ placement: 'bottom-end' }}>
      <DropdownMenu.Trigger asChild let:builder>
        <Button variant="ghost" class="relative h-9 w-9 rounded-full px-0" builders={[builder]}>
          <Avatar.Root class="h-9 w-9">
            <Avatar.Fallback>JB</Avatar.Fallback>
          </Avatar.Root>
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content class="w-56">
        <DropdownMenu.Label>
          <div class="space-y-1">
            <p class="text-sm font-bold leading-none">Jaylen Baxter</p>
            <p class="text-xs leading-none text-muted-foreground">you@example.com</p>
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
          <DropdownMenu.Item>Log out</DropdownMenu.Item>
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
