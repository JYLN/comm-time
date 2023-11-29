<script lang="ts">
  import { page } from '$app/stores';
  import { getAvatarImageUrl, getAvatarInitials } from '$lib/utils';
  import * as Avatar from './avatar';

  let className: Custom.AvatarProps['class'] = undefined;
  let user: Custom.AvatarProps['user'] = $page.data.user;

  export { className as class, user };

  const { collectionId, id, avatar, name } = user;
  const initials = getAvatarInitials(name) || 'AD';
</script>

<Avatar.Root class={className}>
  {#if avatar}
    <Avatar.Image src={getAvatarImageUrl(collectionId, id, avatar)} />
  {/if}
  <Avatar.Fallback>{initials}</Avatar.Fallback>
</Avatar.Root>
