import type { AccordionContext } from '../../types';
import type {
  AccordionPanelDefaultProps,
  AccordionPanelState,
} from '../types';
import { getIsDisabled } from './getIsDisabled';

/**
 * Builds the complete AccordionPanel class name from local and inherited inputs.
 *
 * @example
 * ```ts
 * getClassName(props, state, context);
 * ```
 */
export function getClassName(
  props: AccordionPanelDefaultProps,
  state: AccordionPanelState,
  context: AccordionContext,
): string {
  return props.cls(
    'AccordionPanel',
    props.className || context.className,
    {
      'is-disabled': getIsDisabled(props, context),
      'is-open': state.isOpen,
    },
  );
}
