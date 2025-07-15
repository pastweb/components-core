```tsx
// Accordion
import { withDefaultProps } from '@pastweb/x';
import { AccordionPanel } from './AccordionPanel';
import { ACCORDION_DEFAULT_PROPS } from './constants';
import type { AccordionProps, AccordionDefaultProps, AccordionItem } from './types';

export function Accordion(props: AccordionProps) {
  const p = withDefaultProps<AccordionDefaultProps>(props, ACCORDION_DEFAULT_PROPS);
  const { cls, className, items, rtl } = p;

  return (
    <div className={cls('Accordion')}>
      <AccordionPanel
        #for={(item, i) in items}
        key={i}
        cls={cls}
        rtl={rtl}
        className={className}
        {...itemProps}
      />
    </div>
  );
}
```

```tsx
// AccordionPanel
import { withDefaultProps, useMediator } from '@pastweb/x';
import { accordionPanel } from '@pastweb/components/Accordion';
import { ACCORDION_PANEL_DEFAULT_PROPS } from './constants';
import { AccordionPanelProps, AccordionPanelDefaultProps, AccordionPanelMediatior } from './types';

export function AccordionPanel(props: AccordionPanelProps) {
  const p = withDefaultProps<AccordionPanelDefaultProps>(props, ACCORDION_PANEL_DEFAULT_PROPS);
  const m = useMediator<AccordionPanelMediatior>(accordionPanel, p);
  const s = m.state;

  return (
    <article class={p.cls('AccordionPanel', p.className, s.isOpen ? 'is-open' : '')}>
      <header class={p.cls('header', { rtl: p.rtl })}>
        <render #if={p.header} content={p.header} />
        <span #if={!p.header} class={p.cls('title')}>
          <render content={p.title} />
        </span>
        <div
          #if={!p.header}
          class={p.cls('closeButton', s.isOpen ? 'is-open' : '')}
          @click={m.onToggleClick}
        >
          <div class={p.cls('circle')} />
          <div class={p.cls('closeBar')} />
          <div class={p.cls('closeBar')} />
        </div>
      </header>
      <div class={p.cls('container', s.isOpen ? 'is-open' : '')}>
        <div class={p.cls('content')}>
          <render content={p.content} />
        </div>
      </div>
    </article>
  );
}
```