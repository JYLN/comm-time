<script lang="ts">
  import Toaster from '$lib/components/ui/Toaster.svelte';
  import { ModeWatcher } from 'mode-watcher';
  import '../app.pcss';
</script>

<Toaster />
<ModeWatcher />
<slot />
