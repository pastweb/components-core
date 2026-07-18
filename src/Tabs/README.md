## Tab
| PropName   | type                               | required | default | Description                                                   |
|------------|------------------------------------|----------|---------|---------------------------------------------------------------|
| label      | string \| number \| any            |    yes   |    ""   | label text or content for the tab header                      |
| className  | string                             |    no    |    ""   | additional classes to be applied to the tab                   |
| onClick    | () => void                         |    no    |   noop  | callback fired when the tab is clicked                        |
| content    | string \| number \| any            |    no    |    ""   | content to render in the active tab body                      |

## Tabs

### Props
| PropName     | type                               | required | default | Description                                                   |
|--------------|------------------------------------|----------|---------|---------------------------------------------------------------|
| cls          | (...args: ClassValue[]) => string; |    yes   |    -    | function to handle CssModules classes and classes switching   |
| className    | string                             |    no    |    ""   | additional classes to be applied to the tabs                  |
| tabs         | Tab[]                              |    yes   |    -    | array of tabs to render                                       |
| activeTab    | number                             |    no    |    0    | index of the initially active tab (0-based)                   |
| content      | any                                |    no    |    -    | optional custom content for the active tab (overrides tab.content) |

```tsx
import { withDefaultProps, useMediator } from '@pastweb/x';
import { tabs } from '@pastweb/components/Tabs';
import { DEFAULT_PROPS, DEFAULT_TAB_PROPS } from './constants';
import { TabsProps, TabsDefaultProps , Tab, TabDefaultProps, TabsMediator, Content } from './types';

export function Tabs(props: TabsProps) {
  const p = withDefaultProps<TabsDefaultProps>(props, DEFAULT_PROPS);
  const m = useMediator<TabsMediator>(tabs, p);
  const s = m.state;

  return (
    <div class={p.cls('Tabs', p.className)}>
      <header>
        <ul class={p.cls('TabList')}>
          {p.tabs.map((tab: Tab, i: number) => {
            const tb = withDefaultProps<TabDefaultProps>(tab, DEFAULT_TAB_PROPS);
            return (
              <li
                class={p.cls('Tab', tb.className, { ['is-active']: i === s.activeTab })}
                @click={() => {
                  m.setActiveTab(i);
                  tb.onClick?.();
                }}
              >
                <render content={tb.label} />
              </li>
            );
          })}
        </ul>
      </header>
      <div class={p.cls('content')}>
        <render #if={p.content} content={p.content} prop={p.tabs[s.activeTab]} />
        <render #else-if={p.tabs[s.activeTab].content} content={p.tabs[s.activeTab].content} />
      </div>
    </div>
  );
}
```
