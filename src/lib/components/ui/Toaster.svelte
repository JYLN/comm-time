<script lang="ts" context="module">
  export type ToastData = {
    title: string;
    description: string;
  };

  const {
    elements: { content, title, description, close },
    helpers,
    states: { toasts },
    actions: { portal }
  } = createToaster<ToastData>();

  export const addToast = helpers.addToast;
</script>

<script lang="ts">
  import { createToaster, melt } from '@melt-ui/svelte';
  import { X } from 'lucide-svelte';
  import { flip } from 'svelte/animate';
  import { fly } from 'svelte/transition';
</script>

<div
  class="fixed right-0 top-0 z-50 flex w-full flex-col items-end gap-2 p-4 md:bottom-0 md:top-auto md:w-1/4"
  use:portal
>
  {#each $toasts as { id, data } (id)}
    <div
      use:melt={$content(id)}
      class="relative flex w-full items-center rounded-md border bg-background p-6 text-foreground"
      in:fly={{ duration: 150, x: '100%' }}
      out:fly={{ duration: 150, x: '100%' }}
      animate:flip={{ duration: 300 }}
    >
      <div class="grid gap-1">
        <h3 use:melt={$title(id)} class="font-bold">
          {data.title}
        </h3>
        <p use:melt={$description(id)} class="text-sm text-muted-foreground">
          {data.description}
        </p>
      </div>
      <button
        use:melt={$close(id)}
        class="absolute right-4 top-4 grid place-items-start rounded-md p-1 transition hover:bg-accent active:scale-90"
      >
        <X class="h-4 w-4" />
      </button>
    </div>
  {/each}
</div>
