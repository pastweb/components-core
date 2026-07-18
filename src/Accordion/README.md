## Accordion

### Props
| PropName           | type                               | required | default | Description                                                   |
|--------------------|------------------------------------|----------|---------|---------------------------------------------------------------|
| cls                | (...args: ClassValue[]) => string; |    yes   |    -    | function to handle CssModules classes and classes switching   |
| className          | string                             |    no    |    ""   | additional classes to be applied to the accordion             |
| rtl                | boolean                            |    no    |  false  | enable right-to-left layout                                   |
| transitionDuration | number                             |    no    |   500   | duration of the panel transition in milliseconds              |

### Children
The Accordion component renders its direct children (typically `<AccordionPanel>` components) inside a wrapper div. It passes the following props to each child via `<render>`:
- `className`: The parent's `className`
- `cls`: The parent's `cls` function
- `rtl`: The parent's `rtl` value

```tsx
// Accordion
import { setContext, withDefaultProps } from '@pastweb/x';
import { AccordionPanel } from './AccordionPanel';
import { DEFAULT_PROPS, ACCORDION_CONTEXT_KEY } from './constants';
import type { AccordionProps, AccordionDefaultProps, AccordionContext } from './types';

export function Accordion(props: AccordionProps) {
  const p = withDefaultProps<AccordionDefaultProps>(props, DEFAULT_PROPS);

  setContext(ACCORDION_CONTEXT_KEY, {
    className: p.className,
    rtl: p.rtl,
  });

  return (
    <div className={p.cls('Accordion')}>
      <children />
    </div>
  );
}
```

---

## AccordionPanel

### Props
| PropName           | type                               | required | default | Description                                                   |
|--------------------|------------------------------------|----------|---------|---------------------------------------------------------------|
| cls                | (...args: ClassValue[]) => string; |    yes   |    -    | function to handle CssModules classes and classes switching   |
| className          | string                             |    no    |    ""   | additional classes to be applied to the panel                 |
| isOpen             | boolean                            |    no    |  false  | controls if the panel is initially open                       |
| title              | string \| number                   |    no    |    ""   | the title of the panel (rendered in default header)           |
| rtl                | boolean                            |    no    |  false  | enable right-to-left layout                                   |
| transitionDuration | number                             |    no    |   500   | duration of the panel transition in milliseconds              |

### Slots
| SlotName | Description | Default Content |
|----------|-------------|-----------------|
| header   | Custom content for the panel header (clickable to toggle) | `<span class='title'> <render content={p.title} /> </span>` + a close button composed of divs (`.closeButton`, `.circle`, `.closeBar`) |

### Children
The AccordionPanel renders its direct children inside the content area (`.content`), which expands/collapses based on the `isOpen` state. Use this for the panel's body content.

```tsx
// AccordionPanel
import { computed, getContext, useMediator, withDefaultProps } from '@pastweb/x';
import { accordionPanel } from '@pastweb/components/Accordion';
import { DEFAULT_ACCORDION_PANEL_PROPS, ACCORDION_CONTEXT_KEY } from './constants';
import { AccordionPanelProps, AccordionPanelDefaultProps, AccordionPanelMediatior, AccordionContext } from './types';

export function AccordionPanel(props: AccordionPanelProps) {
  const p = withDefaultProps<AccordionPanelDefaultProps>(props, DEFAULT_ACCORDION_PANEL_PROPS);
  const m = useMediator<AccordionPanelMediatior>(accordionPanel, p);
  const s = m.state;
  const c = getContext<AccordionContext>(ACCORDION_CONTEXT_KEY);

  const className = computed(() => `${c.className} ${p.className}`);
  const rtl = computed(() => p.rtl ?? c.rtl);

  return (
    <article class={p.cls('AccordionPanel', className.value, s.isOpen ? 'is-open' : '')}>
      <header class={p.cls('header', { rtl: rtl.value })} @click={m.onToggleClick}>
        <slot name='header'>
          <span class={p.cls('title')}>
            <render content={p.title} />
          </span>
          <div class={p.cls('closeButton', s.isOpen ? 'is-open' : '')}>
            <div class={p.cls('circle')} />
            <div class={p.cls('closeBar')} />
            <div class={p.cls('closeBar')} />
          </div>
        </slot>
      </header>
      <div class={p.cls('container', s.isOpen ? 'is-open' : '')}>
        <div class={p.cls('content')}>
          <children />
        </div>
      </div>
    </article>
  );
}
```
