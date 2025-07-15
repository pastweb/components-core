```tsx
import { isValidElement, cloneElement, createwElement } from 'x';
import { Component, withDefaultProps } from '@pastweb/x';
import { DEFAULT_PROPS } from './constants';
import { NotificationProps, NotificationDefaultProps } from './types';

export function Notification(props: NotificationProps) {
  const p = withDefaultProps<NotificationDefaultProps>(props, DEFAULT_PROPS);

  return (
    <article class={p.cls('Notification', p.className)}>
      <header #if={p.title || p.onClose || p.header} class={cls({ rtl: p.rtl })}>
        <span #if={!p.header && p.title} class={p.cls('title')}>
          <render content={p.title} />
        </span>
        <div #if={!p.header && p.onClose} class={p.cls('closeButton')} @click={onClose}>
          <div class={p.cls('circle')} />
          <div class={p.cls('closeBar')} />
          <div class={p.cls('closeBar')} />
        </div>
        <render #if={p.header} content={header} />
      </header>
      <div class={p.cls('content')}>
        <children />
      </div>
      <footer #if={p.footer} class={p.cls('footer')}>
        <render content={p.footer} />
      </footer>
    </article>
  );
}
```