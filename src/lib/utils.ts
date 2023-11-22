import { PUBLIC_LOCAL_POCKETBASE } from '$env/static/public';
import { clsx, type ClassValue } from 'clsx';
import moment from 'moment';
import { cubicOut } from 'svelte/easing';
import type { TransitionConfig } from 'svelte/transition';
import { twMerge } from 'tailwind-merge';
import type { CustomersResponse, UsersResponse } from '../backend-types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type FlyAndScaleParams = {
  y?: number;
  x?: number;
  start?: number;
  duration?: number;
};

export const flyAndScale = (
  node: Element,
  params: FlyAndScaleParams = { y: -8, x: 0, start: 0.95, duration: 150 }
): TransitionConfig => {
  const style = getComputedStyle(node);
  const transform = style.transform === 'none' ? '' : style.transform;

  const scaleConversion = (valueA: number, scaleA: [number, number], scaleB: [number, number]) => {
    const [minA, maxA] = scaleA;
    const [minB, maxB] = scaleB;

    const percentage = (valueA - minA) / (maxA - minA);
    const valueB = percentage * (maxB - minB) + minB;

    return valueB;
  };

  const styleToString = (style: Record<string, number | string | undefined>): string => {
    return Object.keys(style).reduce((str, key) => {
      if (style[key] === undefined) return str;
      return str + `${key}:${style[key]};`;
    }, '');
  };

  return {
    duration: params.duration ?? 200,
    delay: 0,
    css: (t) => {
      const y = scaleConversion(t, [0, 1], [params.y ?? 5, 0]);
      const x = scaleConversion(t, [0, 1], [params.x ?? 0, 0]);
      const scale = scaleConversion(t, [0, 1], [params.start ?? 0.95, 1]);

      return styleToString({
        transform: `${transform} translate3d(${x}px, ${y}px, 0) scale(${scale})`,
        opacity: t
      });
    },
    easing: cubicOut
  };
};

export const formatToString = (num: number): string => {
  return num.toString().padStart(2, '0');
};

export const humanize = (value: number | string): string => {
  if (typeof value === 'number') {
    const duration = moment.duration(value);

    const hours = duration.hours();
    const minutes = duration.minutes();
    const seconds = duration.seconds();

    return hours > 1 ? `${hours}h ${minutes}m ${seconds}s` : `${minutes}m ${seconds}s`;
  }

  return moment(value).format('MM/DD/YY hh:mma');
};

export const convertSelectData = (arr: CustomersResponse[] | UsersResponse[] | undefined) => {
  return arr
    ? arr
        .map((obj) => ({
          label: obj.name,
          value: obj.id
        }))
        .sort((a, b) => a.label.localeCompare(b.label))
    : [];
};

export type SelectData = {
  label: string;
  value: string;
}[];

export const getAvatarInitials = (name: string) => {
  if (name && typeof name === 'string') {
    return name.match(/(\b\S)?/g)?.join('');
  }
  return undefined;
};

export const getAvatarImageUrl = (
  collectionId: string,
  recordId: string,
  fileName: string,
  size = '0x0'
) => {
  return `${PUBLIC_LOCAL_POCKETBASE}/api/files/${collectionId}/${recordId}/${fileName}?thumb=${size}`;
};
