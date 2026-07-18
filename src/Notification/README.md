## Notification

### Props
| PropName       | type                               | required | default | Description                                                   |
|----------------|------------------------------------|----------|---------|---------------------------------------------------------------|
| cls            | (...args: ClassValue[]) => string; |    yes   |    -    | function to handle CssModules classes and classes switching   |
| onClose        | () => void                         |    no    |    -    | callback to close the notification                            |
| className      | string                             |    no    |    ""   | additional classes to be applied to the notification          |
| rtl            | boolean                            |    no    |  false  | enable right-to-left layout                                   |
| title          | string                             |    no    |    ""   | title text displayed in the header                            |
| header         | boolean                            |    no    |  false  | enable the header section (shows if true or if title/onClose provided) |
| footer         | boolean                            |    no    |  false  | enable the footer section                                     |

### Children
The main content to render inside the notification body (`.content`).

### Slots
| SlotName | Description | Default Content |
|----------|-------------|-----------------|
| header   | Custom content for the notification header (renders if `header` is true or `title`/`onClose` provided) | Conditional: `<span class='title'> <render content={title} /> </span>` if `header && title`; close button (divs for `.circle`, `.closeBar`) if `header && onClose` |
| footer   | Custom content for the notification footer (renders if `footer` is true) | - |

```tsx
import { withDefaultProps } from '@pastweb/x';
import { DEFAULT_PROPS } from './constants';
import type { NotificationDefaultProps, NotificationProps } from './types';

export function Notification(props: NotificationProps) {
  const p = withDefaultProps<NotificationDefaultProps>(props, DEFAULT_PROPS);

  return (
    <article #ref={ref} class={cls('Notification', p.className)}>
      <header #if={p.title || p.onClose} class={cls({ rtl: p.rtl })}>
        <slot name='header'>
          <span #if={p.title} class={cls('title')}>
            <render content={title} />
          </span>
          <div #if={p.onClose} class={cls('closeButton')} @click={p.onClose}>
            <div className={cls('circle')} />
            <div className={cls('closeBar')} />
            <div className={cls('closeBar')} />
          </div>
        </slot>
      </header>
      <div class={cls('content')}>
        <children />
      </div>
      <slot name='footer' map={content => (<footer class={cls('footer')}>{content}</footer>)} />
    </article>
  );
}
```
