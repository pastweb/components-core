## Panel

### Props
| PropName         | type                               | required | default | Description                                                   |
|------------------|------------------------------------|----------|---------|---------------------------------------------------------------|
| cls              | (...args: ClassValue[]) => string; |    yes   |    -    | function to handle CssModules classes and classes switching   |
| border           | boolean                            |    no    |  true   | enable border styling on the panel                            |
| borderRadius     | boolean                            |    no    |  true   | enable border-radius styling on the panel                     |
| className        | string                             |    no    |    ""   | additional classes to be applied to the panel                 |
| closeButton      | boolean                            |    no    |  true   | enable the close button in the header                         |
| title            | string                             |    no    |    ""   | title text displayed in the default header                    |
| childProps       | Record<string, any>                |    no    |    {}   | additional props to spread onto child elements                |
| contentPadding   | number \| string                   |    no    |    0    | padding for the content area (applied as inline style)        |
| onClose          | () => void                         |    no    |   noop  | callback fired when the close button is clicked               |
| rtl              | boolean                            |    no    |  false  | enable right-to-left layout                                   |
| footer           | boolean                            |    no    |  false  | enable the footer section                                     |

### Children
The main content to render inside the panel body (`.content`), with `childProps` spread onto the children.

### Slots
| SlotName | Description | Default Content |
|----------|-------------|-----------------|
| header   | Custom content for the panel header | `<span class='title'>{title}</span>` + close button (divs for `.circle`, `.closeBar`) with `@click={onClose}` |
| footer   | Custom content for the panel footer (renders if `footer` is true) | - |

```tsx
import { withDefaultProps } from '@pastweb/x';
import { DEFAULT_PROPS } from './constants';
import { PanelProps, PanelDefaultProps } from './types';

export function Panel(props: PanelProps) {
  const p = withDefaults<PanelDefaultProps>(props, defaultProps);
  
  useBeforeMount(() => setContext('$$parentPanel', { props: p, ctx: {} }));

  return (
    <article class={p.cls('Panel', { border: p.border, 'border-radius': p.borderRadius }, p.className)}>
      <header class={p.cls('header', { rtl: p.rtl })}>
        <slot name='header'>
          <span class={p.cls('title')}>{ p.title }</span>
          <div class={p.cls('closeButton')} @click={p.onClose}>
            <div class={p.cls('circle')} />
            <div class={p.cls('closeBar')} />
            <div class={p.cls('closeBar')} />
          </div>
        </slot>
      </header>
      <div class={p.cls('content')} #style={p.contentPadding ? { padding: p.contentPadding } : {}}>
        <children #each={child}>
          <child { ...p.childProps } />
        </children>
      </div>
      <slot name='footer' map={content => <footer class={p.cls('footer')}>{content}</footer>}/>
    </article>
  );
}
```
