# TaskBar

TaskBar renders one control for each window registered with an application
`WindowManager`. It provides desktop-style selection, restore, and minimization
through the manager's `manageWindow` command.

## When to use

Use TaskBar with one application-level `WindowManager` when several managed
windows can remain open at once. Do not use it for unrelated page navigation or
as a replacement for a toolbar.

## Props

| PropName | Type | Required | Default | Description |
|---|---|---:|---:|---|
| `cls` | `(...args: ClassValue[]) => string` | yes | - | Resolves component and state classes. |
| `manager` | `WindowManager` | yes | - | The application-level manager whose registered windows are displayed. |
| `className` | `string` | no | `""` | Adds classes to the taskbar root. |
| `ariaLabel` | `string` | no | `"Window taskbar"` | Names the navigation landmark. |
| `getLabel` | `(window: ManagedWindowState) => string` | no | `window.meta.label ?? window.meta.title ?? window.id` | Resolves the accessible and visible task button label. |

## Mediator state and API

| Property | Type | Description |
|---|---|---|
| `state.activeId` | `string \| null` | ID of the manager's active window. |
| `state.windows` | `readonly ManagedWindowState[]` | Registered windows in stable taskbar order. |
| `manageWindow` | `(window: ManagedWindowState) => boolean` | Delegates task-button selection to the manager. It activates an inactive window, minimizes an active visible window, and restores a minimized window. |

## CSS Variables

| Variable | Part | State | CSS property | Default | Description | Platforms |
|---|---|---|---|---|---|---|
| `--pw_TaskBar_root_default_gap` | root | default | `gap` | `0.04em` | Gap between task controls. | Web, Capacitor |
| `--pw_TaskBar_root_default_min-height` | root | default | `min-height` | `3.5em` | Minimum taskbar height. | Web, Capacitor |
| `--pw_TaskBar_root_default_padding` | root | default | `padding` | `0.125em` | Inner taskbar spacing. | Web, Capacitor |
| `--pw_TaskBar_root_default_border-color` | root | default | `border-color` | `var(--pw_border-color)` | Taskbar border colour. | Web, Capacitor |
| `--pw_TaskBar_root_default_border-style` | root | default | `border-style` | `var(--pw_border-style)` | Taskbar border style. | Web, Capacitor |
| `--pw_TaskBar_root_default_border-width` | root | default | `border-width` | `var(--pw_border-width)` | Taskbar border width. | Web, Capacitor |
| `--pw_TaskBar_root_default_border-radius` | root | default | `border-radius` | `var(--pw_border-radius)` | Taskbar corner radius. | Web, Capacitor |
| `--pw_TaskBar_root_default_background-color` | root | default | `background-color` | `var(--pw_control_background-color)` | Taskbar background. | Web, Capacitor |
| `--pw_TaskBar_taskButton_default_min-width` | taskButton | default | `min-width` | `2.75em` | Minimum task-button width. | Web, Capacitor |
| `--pw_TaskBar_taskButton_default_min-height` | taskButton | default | `min-height` | `2.75em` | Minimum task-button height. | Web, Capacitor |
| `--pw_TaskBar_taskButton_default_max-width` | taskButton | default | `max-width` | `16em` | Maximum task-button width before text truncates. | Web, Capacitor |
| `--pw_TaskBar_taskButton_default_padding` | taskButton | default | `padding` | `var(--pw_padding)` | Task-button inner spacing. | Web, Capacitor |
| `--pw_TaskBar_taskButton_default_margin` | taskButton | default | `margin` | `0.25em` | Task-button spacing. | Web, Capacitor |
| `--pw_TaskBar_taskButton_default_border-color` | taskButton | default | `border-color` | `var(--pw_border-color)` | Task-button border colour. | Web, Capacitor |
| `--pw_TaskBar_taskButton_default_border-style` | taskButton | default | `border-style` | `var(--pw_border-style)` | Task-button border style. | Web, Capacitor |
| `--pw_TaskBar_taskButton_default_border-width` | taskButton | default | `border-width` | `var(--pw_border-width)` | Task-button border width. | Web, Capacitor |
| `--pw_TaskBar_taskButton_default_border-radius` | taskButton | default | `border-radius` | `var(--pw_border-radius)` | Task-button corner radius. | Web, Capacitor |
| `--pw_TaskBar_taskButton_default_background-color` | taskButton | default | `background-color` | `var(--pw_control_background-color)` | Task-button background. | Web, Capacitor |
| `--pw_TaskBar_taskButton_default_color` | taskButton | default | `color` | `inherit` | Task-button text colour. | Web, Capacitor |
| `--pw_TaskBar_taskButton_default_font-size` | taskButton | default | `font-size` | `inherit` | Task-button font size. | Web, Capacitor |
| `--pw_TaskBar_taskButton_default_font-weight` | taskButton | default | `font-weight` | `var(--pw_semibold_font-weight)` | Task-button font weight. | Web, Capacitor |
| `--pw_TaskBar_taskButton_default_line-height` | taskButton | default | `line-height` | `var(--pw_line-height)` | Task-button line height. | Web, Capacitor |
| `--pw_TaskBar_taskButton_default_transition-duration` | taskButton | default | `transition-duration` | `var(--pw_transition-duration)` | Task-button transition duration. | Web, Capacitor |
| `--pw_TaskBar_taskButton_minimised_box-shadow` | taskButton | minimised | `box-shadow` | inset shared shadow | Inset shadow that indicates a minimized window. | Web, Capacitor |

```xts
import { useMediator, withDefaultProps } from '@pastweb/x';
import { taskBarMediator } from '@pastweb/components-core/TaskBar';
import { DEFAULT_PROPS } from './constants';

export function TaskBar(props: TaskBarProps) {
  const p = withDefaultProps<TaskBarDefaultProps>(props, DEFAULT_PROPS);
  const m = useMediator<TaskBarMediator>(taskBarMediator, p);
  const s = m.state;

  return (
    <nav class={p.cls('TaskBar', p.className)} aria-label={p.ariaLabel}>
      {s.windows.map(window => (
        <button
          key={window.id}
          type='button'
          class={p.cls('taskButton', {
            'is-active': window.id === s.activeId,
            'is-minimised': window.status === 'minimized',
          })}
          aria-pressed={window.id === s.activeId}
          @click={() => m.manageWindow(window)}
        >
          {p.getLabel(window)}
        </button>
      ))}
    </nav>
  );
}
```

## Keyboard and accessibility behaviour

- The root is a named `nav` landmark and each window is a native button.
- `aria-pressed` identifies the active task. Native button keyboard activation
  runs the same manager command as a pointer click.
- Horizontal overflow remains available when more windows are open than fit in
  the taskbar.
- The taskbar uses the `--pw_z-index_window-max` layer so its controls remain
  reachable when floating managed windows overlap the same workspace.

## Native renderer mapping

Native renderers map the taskbar to an accessible horizontal collection of
native buttons and use the same `manageWindow` command for activation,
minimization, and restoration.
