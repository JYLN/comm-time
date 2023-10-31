<script lang="ts">
	import { FolderClock, History } from 'lucide-svelte';
	import * as Avatar from './avatar';
	import { Button } from './button';
	import * as DropdownMenu from './dropdown-menu';
</script>

<nav>
	<div class="buttons">
		<Button variant="link">
			<History class="mr-2 h-4 w-4" />
			Previous Time
		</Button>
		<Button variant="link">
			<FolderClock class="mr-2 h-4 w-4" />
			Shared Time
		</Button>
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
						<p class="text-sm font-medium leading-none">Jaylen Baxter</p>
						<p class="text-xs leading-none text-muted-foreground">you@example.com</p>
					</div>
				</DropdownMenu.Label>
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
		@apply mb-4 flex items-center border-b px-6 py-3;
	}

	.buttons {
		@apply flex-1;
	}
</style>
