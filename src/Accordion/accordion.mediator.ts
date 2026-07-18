import { AccordionDefaultProps, AccordionMediator, AccordionContext } from './types';

export function accordionMediator(props: AccordionDefaultProps): AccordionMediator {
  function getContext(): AccordionContext {
    return {
      className: props.className,
      disabled: props.disabled,
      rtl: props.rtl,
    };
  }

  return { getContext };
}
