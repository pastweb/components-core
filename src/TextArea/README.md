```tsx
import { withDefaultProps } from '@pastweb/x';
import { DEFAULT_PROPS } from './constants';
import { TextAreaDefaultProps, TextAreaProps } from './types';

export function TextArea(props: TextAreaProps) {
  const p = withDefaultProps<TextAreaDefaultProps>(props, DEFAULT_PROPS);

  return (
    <div class={p.cls('TextArea', p.className)}>
      <textarea
        #style={{ resize: !p.resizeable ? 'none' : 'both' }}
        id={p.id}
        tabIndex={p.tabIndex}
        value={p.value}
        cols={p.cols}
        rows={p.rows}
        name={p.name}
        disabled={p.disabled}
        placeholder={p.placeholder}
        maxLength={p.maxLength}
        @change={p.onChange}
      />
        <div #if={p.loadingComponent} class={p.cls('loading')}>
          <render content={p.loadingComponent} />
        </div>
    </div>
  );
}
```