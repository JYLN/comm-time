<script lang="ts">
  import * as Card from '../ui/card';
</script>

<Card.Root>
  <Card.Header>
    <Card.Description>
      <slot name="description" />
    </Card.Description>
  </Card.Header>
  <Card.Content>
    <slot name="form" />
  </Card.Content>
</Card.Root>
