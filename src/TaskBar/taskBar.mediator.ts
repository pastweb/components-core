import { effect, reactive } from '@pastweb/tools';
import type { WindowManagerState } from '@pastweb/tools';
import type { TaskBarDefaultProps, TaskBarMediator, TaskBarState } from './types';

export function taskBarMediator(props: TaskBarDefaultProps): TaskBarMediator {
  const snapshot = props.manager.state;
  let windowIds = snapshot.windows.map(window => window.id);
  const state = reactive<TaskBarState>({
    activeId: snapshot.activeId,
    windows: snapshot.windows,
  });

  effect(
    (snapshot: WindowManagerState) => {
      state.activeId = snapshot.activeId;
      const windowsById = new Map(snapshot.windows.map(window => [window.id, window]));
      const knownWindowIds = new Set(windowIds);

      windowIds = [
        ...windowIds.filter(id => windowsById.has(id)),
        ...snapshot.windows.filter(window => !knownWindowIds.has(window.id)).map(window => window.id),
      ];
      state.windows = windowIds.map(id => windowsById.get(id)!);
    },
    () => props.manager.state,
  );

  return {
    manageWindow: window => props.manager.manageWindow(window),
    state,
  };
}
