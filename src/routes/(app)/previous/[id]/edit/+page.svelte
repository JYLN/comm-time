<script lang="ts">
  import EditTimeEntryForm from '$lib/components/forms/EditTimeEntryForm.svelte';
  import { Button } from '$lib/components/ui/button';
  import { humanize } from '$lib/utils.js';
  import { Undo2 } from 'lucide-svelte';

  export let data;
</script>

<main class="container mx-auto">
  <div class="flex gap-3">
    <Button variant="ghost" size="icon" href="/previous">
      <Undo2 />
    </Button>
    <div>
      <h2 class="heading-1 mb-2">Edit - {data.timeEntry?.name}</h2>
      <p class="mb-4 text-sm text-muted-foreground">
        Start Time: {humanize(data.timeEntry?.start_time)} • End Time: {humanize(
          data.timeEntry?.end_time
        )}
      </p>
    </div>
  </div>
  <EditTimeEntryForm />
</main>
