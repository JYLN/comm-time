<script lang="ts">
  import { getFormField } from 'formsnap';
  import { Bold, Italic, Link, Underline } from 'lucide-svelte';
  import { Button } from '../ui/button';

  const { attrStore, actions, value: editorValue } = getFormField();

  let textAreaRef: HTMLTextAreaElement;
</script>

<div class="flex flex-col gap-2">
  <textarea
    class="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
    bind:this={textAreaRef}
    bind:value={$editorValue}
    use:actions.textarea
    {...$attrStore}
  />

  <div class="w-max rounded-md border px-2 py-1">
    <Button variant="ghost">
      <Bold class="h-4 w-4" />
    </Button>
    <Button variant="ghost">
      <Underline class="h-4 w-4" />
    </Button>
    <Button variant="ghost">
      <Italic class="h-4 w-4" />
    </Button>
    <Button variant="ghost">
      <Link class="h-4 w-4" />
    </Button>
  </div>
</div>
