<script lang="ts">
  import { page } from '$app/stores';
  import { Button } from '$lib/components/ui/button';
</script>

<main>
  <article>
    <h1>{$page.status}</h1>
    <p>{$page.error?.message}</p>
  </article>
  <Button on:click={() => history.back()}>Go back</Button>
</main>

<style lang="postcss">
  main {
    @apply container mx-auto flex h-screen flex-col items-center justify-center py-5;
  }

  h1 {
    @apply mb-3 font-jetmono text-7xl font-bold;
  }

  p {
    @apply text-xl font-medium text-muted-foreground;
  }

  article {
    @apply grid grid-rows-2 justify-items-center;
  }
</style>
