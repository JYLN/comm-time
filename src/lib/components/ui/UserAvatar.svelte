<script lang="ts">
  import { page } from '$app/stores';
  import { getAvatarImageUrl, getAvatarInitials } from '$lib/utils';
  import type { HTMLAttributes } from 'svelte/elements';
  import type { UsersResponse } from '../../../backend-types';
  import * as Avatar from './avatar';

  type Props = Expand<{ user: UsersResponse }> & HTMLAttributes<HTMLDivElement>;

  let className: Props['class'] = undefined;
  let user: Props['user'] = $page.data.user;

  export { className as class, user };

  const { collectionId, id, avatar, name } = user;
</script>

<Avatar.Root class={className}>
  <Avatar.Image src={getAvatarImageUrl(collectionId, id, avatar)} />
  <Avatar.Fallback>{getAvatarInitials(name)}</Avatar.Fallback>
</Avatar.Root>
