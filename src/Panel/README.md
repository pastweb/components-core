```tsx
import { withDefaultProps, provide } from '@pastweb/x';
import { DEFAULT_PROPS } from './constants';
import { PanelProps, PanelDefaultProps } from './types';

export function Panel(props: PanelProps) {
  const p = withDefaults<PanelDefaultProps>(props, defaultProps);
  provide('$$parentPanel', { props: p, ctx: {} });

  return (
    <article class={p.cls('Panel', { border: p.border, 'border-radius': p.borderRadius }, p.className)}>
      <header class={p.cls('header', { rtl: p.rtl })}>
        <render #if={p.header} content="p.header" />
        <span #if={!p.header} class={p.cls('title')}>{ p.title }</span>
        <div #if={!p.header} class={p.cls('closeButton')} @click={p.onClose}>
          <div class={p.cls('circle')} />
          <div class={p.cls('closeBar')} />
          <div class={p.cls('closeBar')} />
        </div>
      </header>
      <div class={p.cls('content')} #style={p.contentPadding ? { padding: p.contentPadding } : {}}>
        <children { ...p.childProps } />
      </div>
      <footer #if={p.footer} class={p.cls('footer')}>
        <render content={p.footer} />
      </footer>
    </article>
  );
}
```