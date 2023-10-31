<script lang="ts">
	import TimeEntryForm from '$lib/components/forms/time-entry-form.svelte';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Separator } from '$lib/components/ui/separator';

	export let data;
</script>

<main>
	<div class="timer">
		<Card.Root>
			<Card.Header>
				<Card.Title class="text-center text-6xl font-bold">00:00</Card.Title>
				<Separator />
			</Card.Header>
			<Card.Content class="grid gap-1">
				<Button variant="success">Start</Button>
				<Button>Pause</Button>
				<Button variant="destructive">Reset</Button>
			</Card.Content>
		</Card.Root>
	</div>
	<div class="time-data-form">
		<Card.Root>
			<Card.Header>
				<Card.Title class="text-xl font-bold">New Time Entry</Card.Title>
				<Separator />
			</Card.Header>
			<Card.Content>
				<TimeEntryForm form={data.form} />
			</Card.Content>
		</Card.Root>
	</div>
</main>

<style lang="postcss">
	main {
		@apply grid grid-cols-[30%_1fr] grid-rows-1 gap-5 px-5;
	}
</style>
