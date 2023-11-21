<script lang="ts">
  import * as Card from '$lib/components/ui/card';
</script>

<Card.Root class="max-w-[750px]">
  <Card.Header>
    <Card.Description>
      <slot name="description" />
    </Card.Description>
  </Card.Header>
  <Card.Content>
    <slot name="form" />
  </Card.Content>
</Card.Root>
