import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  createMediatorContextUtils,
  reactive,
  type ContextUtils,
} from '@pastweb/tools';
import {
  ACCORDION_CONTEXT_KEY,
  DEFAULT_TRANSITION_DURATION,
  accordionMediator,
  accordionPanelMediator,
} from '../../src/Accordion';
import type {
  AccordionContext,
  AccordionDefaultProps,
  AccordionPanelDefaultProps,
} from '../../src/Accordion';

function createAccordionProps(
  overrides: Partial<AccordionDefaultProps> = {},
): AccordionDefaultProps {
  return {
    cls: (...values) => values.filter(Boolean).join(' '),
    ariaLabel: 'Account sections',
    className: '',
    disabled: false,
    rtl: false,
    transitionDuration: 500,
    ...overrides,
  };
}

function createProps(
  overrides: Partial<AccordionPanelDefaultProps> = {},
): AccordionPanelDefaultProps {
  return {
    cls: (...values) => values.filter(Boolean).join(' '),
    className: '',
    disabled: false,
    headingLevel: 2,
    isOpen: false,
    landmark: false,
    title: '',
    rtl: false,
    transitionDuration: 250,
    ...overrides,
  };
}

function createPanelMediator(
  overrides: Partial<AccordionPanelDefaultProps> = {},
  accordionContext: AccordionContext = {
    className: '',
    disabled: undefined,
    rtl: false,
    transitionDuration: 500,
  },
) {
  return createPanelMediatorFromProps(
    reactive(createProps(overrides)),
    accordionContext,
  );
}

function createPanelMediatorFromProps(
  props: AccordionPanelDefaultProps,
  accordionContext: AccordionContext | undefined,
) {
  const context: ContextUtils = {
    getContext: <T>(key: string) => (
      key === ACCORDION_CONTEXT_KEY ? accordionContext as T : undefined
    ),
    setContext: vi.fn(),
  };

  return createMediatorContextUtils(
    accordionPanelMediator,
    props,
    {},
    context,
  );
}

afterEach(() => {
  vi.useRealTimers();
});

describe('accordionMediator', () => {
  it('given generated and explicit IDs, when initialized, then it follows the component ID format', () => {
    const generated = accordionMediator(createAccordionProps());
    const explicit = accordionMediator(createAccordionProps({ id: 'account' }));

    expect(generated.id).toMatch(/^accordion_/);
    expect(explicit.id).toBe('_account');

    generated.useBeforeUnmount();
    explicit.useBeforeUnmount();
  });

  it('given enabled labelled props, when initialized, then it exposes normalized state', () => {
    const mediator = accordionMediator(createAccordionProps());

    expect(mediator.state).toEqual({
      ariaLabel: 'Account sections',
      isDisabled: undefined,
      role: 'group',
    });
  });

  it('given accordion props change, when effects run, then state and context expose current values', async () => {
    const props = reactive(createAccordionProps());
    const mediator = accordionMediator(props);
    const context = mediator.getContext();

    props.ariaLabel = '';
    props.className = 'updated';
    props.disabled = true;
    props.rtl = true;
    props.transitionDuration = 250;

    await vi.waitFor(() => {
      expect(mediator.state.ariaLabel).toBeUndefined();
      expect(mediator.state.isDisabled).toBe(true);
      expect(mediator.state.role).toBeUndefined();
      expect(context.disabled).toBe(true);
    });
    expect(context.className).toBe('updated');
    expect(context.rtl).toBe(true);
    expect(context.transitionDuration).toBe(250);
  });
});

describe('accordionPanelMediator', () => {
  it('given a closed panel, when initialized, then its content starts closed and hidden', () => {
    const mediator = createPanelMediator();

    expect(mediator.state).toMatchObject({
      isOpen: false,
      isContentHidden: true,
      hideBorderBottom: true,
    });

    mediator.useBeforeUnmount();
  });

  it('given Accordion context changes, when effects run, then inherited state stays normalized', async () => {
    const context = reactive<AccordionContext>({
      className: 'theme-dark',
      disabled: undefined,
      rtl: true,
      transitionDuration: 320,
    });
    const mediator = createPanelMediator({ transitionDuration: undefined }, context);

    expect(mediator.state).toMatchObject({
      className: 'AccordionPanel theme-dark',
      isDisabled: undefined,
      isRtl: true,
      role: undefined,
      transitionDuration: '320ms',
    });

    context.className = 'theme-light';
    context.disabled = true;
    context.rtl = false;
    context.transitionDuration = 180;

    await vi.waitFor(() => {
      expect(mediator.state).toMatchObject({
        className: 'AccordionPanel theme-light is-disabled',
        isDisabled: true,
        isRtl: undefined,
        transitionDuration: '180ms',
      });
    });

    mediator.useBeforeUnmount();
  });

  it('given a disabled Accordion context, when toggled, then panel state remains unchanged', () => {
    const onOpenChange = vi.fn();
    const mediator = createPanelMediator(
      { onOpenChange },
      {
        className: '',
        disabled: true,
        rtl: false,
        transitionDuration: 500,
      },
    );

    mediator.onToggle();

    expect(mediator.state.isOpen).toBe(false);
    expect(onOpenChange).not.toHaveBeenCalled();

    mediator.useBeforeUnmount();
  });

  it('given local panel props change, when effects run, then semantic state is normalized', async () => {
    const props = reactive(createProps({
      className: 'local-panel',
      landmark: false,
      transitionDuration: 180,
    }));
    const context = reactive<AccordionContext>({
      className: '',
      disabled: undefined,
      rtl: false,
      transitionDuration: 320,
    });
    const mediator = createPanelMediatorFromProps(props, context);

    expect(mediator.state.role).toBeUndefined();
    expect(mediator.state.className).toBe('AccordionPanel local-panel');
    expect(mediator.state.transitionDuration).toBe('180ms');

    props.className = 'updated-panel';
    props.disabled = true;
    props.headingLevel = 5;
    props.landmark = true;
    props.rtl = true;
    context.transitionDuration = 240;

    await vi.waitFor(() => {
      expect(mediator.state.isDisabled).toBe(true);
      expect(mediator.state.isRtl).toBe(true);
      expect(mediator.state.role).toBe('region');
      expect(mediator.state.Heading).toBe('h5');
      expect(mediator.state.className).toBe('AccordionPanel updated-panel is-disabled');
      expect(mediator.state.transitionDuration).toBe('180ms');
    });

    mediator.useBeforeUnmount();
  });

  it('given a closed panel, when toggled, then it opens immediately and reports the change', () => {
    const onOpenChange = vi.fn();
    const mediator = createPanelMediator({ onOpenChange });

    mediator.onToggle();

    expect(mediator.state).toMatchObject({
      isOpen: true,
      isContentHidden: false,
      hideBorderBottom: false,
    });
    expect(onOpenChange).toHaveBeenCalledWith(true);

    mediator.useBeforeUnmount();
  });

  it('given an open panel, when toggled closed, then visual content remains until its transition completes', () => {
    vi.useFakeTimers();
    const mediator = createPanelMediator({ isOpen: true });

    mediator.onToggle();

    expect(mediator.state.isOpen).toBe(false);
    expect(mediator.state.isContentHidden).toBe(false);

    vi.advanceTimersByTime(249);
    expect(mediator.state.isContentHidden).toBe(false);

    vi.advanceTimersByTime(1);
    expect(mediator.state.isContentHidden).toBe(true);
    expect(mediator.state.hideBorderBottom).toBe(true);

    mediator.useBeforeUnmount();
  });

  it('given no duration or Accordion context, when closing, then the timer uses the stylesheet default', () => {
    vi.useFakeTimers();
    const mediator = createPanelMediatorFromProps(
      reactive(createProps({ isOpen: true, transitionDuration: undefined })),
      undefined,
    );

    expect(mediator.state.transitionDuration).toBeUndefined();

    mediator.onToggle();
    vi.advanceTimersByTime(DEFAULT_TRANSITION_DURATION - 1);
    expect(mediator.state.isContentHidden).toBe(false);

    vi.advanceTimersByTime(1);
    expect(mediator.state.isContentHidden).toBe(true);

    mediator.useBeforeUnmount();
  });

  it('given focus inside an open panel, when it closes, then the mounted trigger receives focus', () => {
    vi.useFakeTimers();
    const mediator = createPanelMediator({ isOpen: true });
    const trigger = { focus: vi.fn() };
    const content = {
      children: ['active-reference'],
      ownerDocument: { activeElement: 'active-reference' },
      contains(reference: string) {
        return this.children.includes(reference);
      },
    };

    mediator.useMounted(trigger, content);

    mediator.onToggle();
    vi.advanceTimersByTime(16);

    expect(trigger.focus).toHaveBeenCalledOnce();

    mediator.useBeforeUnmount();
  });

  it('given focus outside an open panel, when it closes, then focus remains unchanged', () => {
    vi.useFakeTimers();
    const mediator = createPanelMediator({ isOpen: true });
    const trigger = { focus: vi.fn() };
    const content = {
      children: ['inside-reference'],
      ownerDocument: { activeElement: 'outside-reference' },
      contains(reference: string) {
        return this.children.includes(reference);
      },
    };

    mediator.useMounted(trigger, content);

    mediator.onToggle();
    vi.advanceTimersByTime(16);

    expect(trigger.focus).not.toHaveBeenCalled();

    mediator.useBeforeUnmount();
  });

  it('given a closing panel, when its transition ends, then it completes without waiting for the fallback timer', () => {
    vi.useFakeTimers();
    const mediator = createPanelMediator({ isOpen: true });

    mediator.onToggle();
    mediator.onTransitionEnd();

    expect(mediator.state.isContentHidden).toBe(true);
    expect(mediator.state.hideBorderBottom).toBe(true);
    expect(vi.getTimerCount()).toBe(1);

    vi.advanceTimersByTime(16);
    expect(vi.getTimerCount()).toBe(0);

    mediator.useBeforeUnmount();
  });

  it('given a child transition, when it bubbles through the panel, then the close transition remains pending', () => {
    vi.useFakeTimers();
    const mediator = createPanelMediator({ isOpen: true });
    const panel = {};

    mediator.onToggle();
    mediator.onTransitionEnd({ currentTarget: panel, target: {} });

    expect(mediator.state.isContentHidden).toBe(false);

    vi.advanceTimersByTime(250);
    expect(mediator.state.isContentHidden).toBe(true);

    mediator.useBeforeUnmount();
  });

  it('given a disabled panel, when toggled, then its state and callback remain unchanged', () => {
    const onOpenChange = vi.fn();
    const mediator = createPanelMediator({ disabled: true, onOpenChange });

    mediator.onToggle();

    expect(mediator.state.isOpen).toBe(false);
    expect(onOpenChange).not.toHaveBeenCalled();

    mediator.useBeforeUnmount();
  });

  it('given multiple panels, when initialized, then each mediator receives a unique fallback ID', () => {
    const first = createPanelMediator();
    const second = createPanelMediator();

    expect(first.id).not.toBe(second.id);

    first.useBeforeUnmount();
    second.useBeforeUnmount();
  });

  it('given an explicit panel ID, when initialized, then the mediator derives every related ID', () => {
    const mediator = createPanelMediator({ id: 'account' });

    expect(mediator.id).toBe('_account');
    expect(mediator.triggerId).toBe('trigger_account');
    expect(mediator.panelId).toBe('panel_account');

    mediator.useBeforeUnmount();
  });

  it('given a heading level, when initialized, then the mediator resolves the heading element', () => {
    const mediator = createPanelMediator({ headingLevel: 4 });

    expect(mediator.state.Heading).toBe('h4');

    mediator.useBeforeUnmount();
  });

  it('given a pending close timer, when unmounted, then the fallback timer is cleared', () => {
    vi.useFakeTimers();
    const mediator = createPanelMediator({ isOpen: true });

    mediator.onToggle();
    expect(vi.getTimerCount()).toBe(2);

    mediator.useBeforeUnmount();
    vi.advanceTimersByTime(16);
    expect(vi.getTimerCount()).toBe(0);
  });
});
