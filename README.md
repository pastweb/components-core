# Components


```xts
import { withDefaultProps } from '@pastweb/x';
import { DEFAULT_PROPS } from './constants';
import { ButtonDefaultProps, ButtonProps } from './types';

export function Button(props: ButtonProps) {
  const p = withDefaultProps<ButtonDefaultProps>(props, DEFAULT_PROPS);

  return (
    <button
      :ref={p.ref}
      :class={p.cls('Button', p.className)}
      :@click={p.onClick}
      :disabled={p.disabled}
      :tabIndex={p.tabIndex}
    >
      <children #each={child}>
        <span>
          <render :content={child} />
        </span>
      </children>
      <div
        #if={p.loadingComponent && p.className.includes('is-loading')}
        :class={p.cls('loading')}
      >
        { p.loadingComponent }
      </div>
    </button>
  );
}
```

<div style="text-align: center;">
  <img src="https://raw.githubusercontent.com/pastweb/components/refs/heads/master/assets/xjs-logo.svg?token=GHSAT0AAAAAADE3DQ73VNVM7A7QDNS73QQA2B2ZV7Q" alt="xjs" style="width: 100%; max-width: 100px;">
  <img src="https://raw.githubusercontent.com/pastweb/components/refs/heads/master/assets/xts-logo.svg?token=GHSAT0AAAAAADE3DQ73RSJUYHM7Z4WM3HI62B2ZWUQ" alt="xts" style="width: 100%; max-width: 100px;">
</div>
