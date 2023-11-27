<script lang="ts">
  import { getFormField } from 'formsnap';
  import { Bold, Italic, Link, Underline } from 'lucide-svelte';
  import { Textarea } from '../ui/textarea';
  import * as ToggleGroup from '../ui/toggle-group';

  const { attrStore, setValue } = getFormField();

  let editorValue: string;
  let actionValue: string[];
</script>

<div class="flex flex-col gap-2">
  <Textarea
    class="resize-y"
    {...$attrStore}
    on:input={() => setValue(editorValue)}
    bind:value={editorValue}
  />

  <ToggleGroup.Root
    type="multiple"
    class="w-max justify-start rounded-md border px-2 py-1"
    bind:value={actionValue}
  >
    <!-- Bold -->
    <ToggleGroup.Item value="">
      <Bold class="h-4 w-4" />
    </ToggleGroup.Item>
    <!-- Underline -->
    <ToggleGroup.Item value="">
      <Underline class="h-4 w-4" />
    </ToggleGroup.Item>
    <!-- Italic -->
    <ToggleGroup.Item value="">
      <Italic class="h-4 w-4" />
    </ToggleGroup.Item>
    <!-- Link -->
    <ToggleGroup.Item value="">
      <Link class="h-4 w-4" />
    </ToggleGroup.Item>
  </ToggleGroup.Root>
</div>
