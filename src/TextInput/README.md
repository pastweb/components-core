```tsx
import { withDefaultProps, useMediator } from '@pastweb/x';
import { textInput } from '@pastweb/components/TextInput';
import { DEFAULT_PROPS } from './constants';
import { TextInputProps, TextInputDefaultProps, TextInputMediator } from './types';

export function TextInput(props: TextInputProps) {
  const p = withDefaultProps<TextInputDefaultProps>(props, DEFAULT_PROPS);
  const m = useMediator<TextInputMediator>(textInput, p);

  return (
    <div #ref={p.ref} class={p.cls('TextInput', p.className)}>
      <span #if={p.leftComponent} class={p.cls('leftComponent')}>
        <render content={p.leftComponent} />
      </span>
      <input
        type={p.type}
        tabIndex={p.tabIndex}
        autoComplete={p.autocomplete}
        placeholder={p.placeholder}
        disabled={p.disabled}
        name={p.name}
        id={p.id}
        value={p.value}
        required={p.required}
        max={p.max}
        min={p.min}
        @change={m.onChange}
        @keydown={m.onKeyDown}
      />
      <span #if={p.rightComponent} class={p.cls('rightComponent')}>
        <render content={p.rightComponent} />
      </span>
      <div #if={p.loadingComponent} class={p.cls('loading')}>
        <render content={p.loadingComponent} />
      </div>
    </div>
  );
}
```