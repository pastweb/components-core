import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  createMediatorContextUtils,
  reactive,
  type ClassValue,
  type ContextUtils,
} from '@pastweb/tools';
import {
  ACCORDION_CONTEXT_KEY,
  accordionMediator,
  accordionPanelMediator,
} from '../../src/Accordion';
import type {
  AccordionContext,
  AccordionDefaultProps,
  AccordionPanelDefaultProps,
} from '../../src/Accordion';

const cls = (...values: ClassValue[]) => values.flatMap(value => {
  if (!value) return [];
  if (typeof value === 'string') return [value];

  return Object.entries(value)
    .filter(([, enabled]) => enabled)
    .map(([className]) => className);
}).join(' ');

function createAccordionProps(
  overrides: Partial<AccordionDefaultProps> = {},
): AccordionDefaultProps {
  return {
    cls,
    ariaLabel: 'Account sections',
    className: '',
    disabled: false,
    rtl: false,
    transitionDuration: 500,
    ...overrides,
  };
}

function createPanelProps(
  overrides: Partial<AccordionPanelDefaultProps> = {},
): AccordionPanelDefaultProps {
  return {
    cls,
    className: '',
    disabled: false,
    headingLevel: 2,
    isOpen: false,
    landmark: false,
    rtl: false,
    title: '',
    transitionDuration: 250,
    ...overrides,
  };
}

function createPanelMediator(
  props = reactive(createPanelProps()),
  accordionContext: AccordionContext = {
    className: '',
    disabled: undefined,
    rtl: false,
    transitionDuration: 500,
  },
) {
  const context: ContextUtils = {
    getContext: <T>(key: string) => (
      key === ACCORDION_CONTEXT_KEY ? accordionContext as T : undefined
    ),
    setContext: vi.fn(),
  };

  return createMediatorContextUtils(accordionPanelMediator, props, {}, context);
}

afterEach(() => vi.useRealTimers());

describe('accordionMediator', () => {
  it('given server rendering, when initialized, then it derives state without platform APIs', () => {
    const mediator = accordionMediator(createAccordionProps({ id: 'account' }));

    expect(mediator.id).toBe('_account');
    expect(mediator.state).toEqual({
      ariaLabel: 'Account sections',
      isDisabled: undefined,
      role: 'group',
    });

    mediator.useBeforeUnmount();
  });

  it('given reactive accordion props, when they change, then the shared context is updated', async () => {
    const props = reactive(createAccordionProps());
    const mediator = accordionMediator(props);
    const context = mediator.getContext();

    props.className = 'compact';
    props.disabled = true;
    props.rtl = true;
    props.transitionDuration = 180;

    await vi.waitFor(() => expect(mediator.state.isDisabled).toBe(true));
    expect(context).toEqual({
      className: 'compact',
      disabled: true,
      rtl: true,
      transitionDuration: 180,
    });
  });
});

describe('accordionPanelMediator', () => {
  it('given server rendering, when initialized, then it derives a closed panel state without platform APIs', () => {
    const mediator = createPanelMediator(
      reactive(createPanelProps({ id: 'account' })),
    );

    expect(mediator.id).toBe('_account');
    expect(mediator.triggerId).toBe('trigger_account');
    expect(mediator.panelId).toBe('panel_account');
    expect(mediator.state).toEqual({
      className: 'AccordionPanel',
      hideBorderBottom: true,
      isDisabled: undefined,
      isOpen: false,
      isRtl: undefined,
      role: undefined,
      transitionDuration: '250ms',
    });

    mediator.useBeforeUnmount();
  });

  it('given an enabled closed panel, when toggled, then it opens and reports the state', () => {
    const onOpenChange = vi.fn();
    const mediator = createPanelMediator(
      reactive(createPanelProps({ onOpenChange })),
    );

    mediator.onToggle();

    expect(mediator.state.isOpen).toBe(true);
    expect(mediator.state.hideBorderBottom).toBe(false);
    expect(onOpenChange).toHaveBeenCalledWith(true);

    mediator.useBeforeUnmount();
  });

  it('given a disabled accordion, when toggled, then the panel state does not change', () => {
    const onOpenChange = vi.fn();
    const mediator = createPanelMediator(
      reactive(createPanelProps({ onOpenChange })),
      { className: '', disabled: true, rtl: false, transitionDuration: 500 },
    );

    mediator.onToggle();

    expect(mediator.state.isOpen).toBe(false);
    expect(onOpenChange).not.toHaveBeenCalled();

    mediator.useBeforeUnmount();
  });

  it('given an open panel, when it closes and its transition completes, then its border is hidden', () => {
    const mediator = createPanelMediator(reactive(createPanelProps({ isOpen: true })));

    mediator.onToggle();
    mediator.onTransitionEnd();

    expect(mediator.state.isOpen).toBe(false);
    expect(mediator.state.hideBorderBottom).toBe(true);

    mediator.useBeforeUnmount();
  });
});
