<script lang="ts">
  import { formatCommand, handleNewLine } from '$lib/utils';
  import type { Tooltip as TooltipPrimitive } from 'bits-ui';
  import { getFormField } from 'formsnap';
  import {
    Bold,
    ClipboardCopy,
    Heading,
    Italic,
    Link,
    List,
    ListChecks,
    ListOrdered
  } from 'lucide-svelte';
  import { addToast } from '../ui/Toaster.svelte';
  import { Button } from '../ui/button';
  import * as Tooltip from '../ui/tooltip';

  let textAreaRef: HTMLTextAreaElement;

  const { attrStore, actions, value: editorValue } = getFormField();

  const toolTipProps: TooltipPrimitive.Props = {
    positioning: { placement: 'bottom' },
    openDelay: 200,
    closeDelay: 100,
    group: 'actions'
  };

  const buttons: Custom.EditorButtons[] = [
    { name: 'Heading', icon: Heading, command: 'heading' },
    { name: 'Bold', icon: Bold, command: 'bold' },
    { name: 'Italic', icon: Italic, command: 'italic' },
    { name: 'Link', icon: Link, command: 'link' },
    { name: 'Ordered List', icon: ListOrdered, command: 'list-number' },
    { name: 'Unordered List', icon: List, command: 'list' },
    { name: 'Check List', icon: ListChecks, command: 'list-check' },
    { name: 'Copy to Clipboard', icon: ClipboardCopy }
  ];

  function handleInput(e: Event) {
    const { key, target } = e as KeyboardEvent;

    if (key === 'Enter') {
      const textarea = target as HTMLTextAreaElement;
      const pos = textarea.selectionStart;
      const value = $editorValue as string;

      editorValue.set(handleNewLine(value, pos));

      e.preventDefault();
    }
  }

  async function handleCopy() {
    try {
      navigator.clipboard.writeText($editorValue as string);
    } catch (err) {
      console.error(err);
      addToast({ data: { title: 'Error!', description: 'Something went wrong. Try again!' } });
    } finally {
      addToast({
        data: {
          title: 'Success!',
          description: 'Note contents have successfully been copied to your clipboard!'
        }
      });
    }
  }
</script>

<div class="relative">
  <textarea
    class="shadcn-textarea"
    rows="12"
    bind:this={textAreaRef}
    bind:value={$editorValue}
    on:keypress={handleInput}
    use:actions.textarea
    {...$attrStore}
  />

  <div class="button-container">
    {#each buttons as button (button.name)}
      <Tooltip.Root {...toolTipProps}>
        <Tooltip.Trigger asChild let:builder>
          <Button
            builders={[builder]}
            variant="outline"
            class="px-2"
            on:click={() =>
              button.command ? formatCommand(textAreaRef, button.command) : handleCopy()}
          >
            <svelte:component this={button.icon} class="h-4 w-4" />
          </Button>
        </Tooltip.Trigger>
        <Tooltip.Content>{button.name}</Tooltip.Content>
      </Tooltip.Root>
    {/each}
  </div>
</div>

<style lang="postcss">
  .button-container {
    @apply absolute bottom-0 w-max px-3 py-2;
  }

  .shadcn-textarea {
    @apply flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50;
  }
</style>
