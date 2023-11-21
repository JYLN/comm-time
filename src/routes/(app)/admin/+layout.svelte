<script lang="ts">
  import { Separator } from '$lib/components/ui/separator';
</script>

<main class="container mx-auto">
  <header class="space-y-1">
    <h2 class="text-3xl font-bold">Admin Settings</h2>
    <p class="text-sm text-muted-foreground">Manage settings for the overall application.</p>
  </header>
  <Separator class="my-6" />
  <slot />
</main>
