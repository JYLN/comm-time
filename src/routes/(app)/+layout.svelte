<script lang="ts">
  import NavBar from '$lib/components/ui/NavBar.svelte';
  import { expoInOut } from 'svelte/easing';
  import { fade, fly } from 'svelte/transition';

  export let data;
</script>

<NavBar />

{#key data.url}
  <div
    in:fly={{ x: -100, duration: 300, delay: 400 }}
    out:fade={{ duration: 400, easing: expoInOut }}
  >
    <slot />
  </div>
{/key}
