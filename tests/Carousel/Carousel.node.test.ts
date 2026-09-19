import { describe, expect, it, vi } from 'vitest';
import {
  createMediatorContextUtils,
  reactive,
  type ContextUtils,
} from '@pastweb/tools';
import {
  CAROUSEL_CONTEXT_KEY,
  carouselItemMediator,
  carouselMediator,
} from '../../src/Carousel';
import type {
  CarouselContext,
  CarouselDefaultProps,
  CarouselItemDefaultProps,
} from '../../src/Carousel';

function createProps(overrides: Partial<CarouselDefaultProps> = {}): CarouselDefaultProps {
  return {
    cls: (...values) => values.filter(Boolean).join(' '),
    ariaLabel: 'Featured content',
    className: '',
    current: 0,
    disabled: false,
    nextAriaLabel: 'Next slide',
    prevAriaLabel: 'Previous slide',
    showCommands: true,
    ...overrides,
  };
}

function createItemProps(
  overrides: Partial<CarouselItemDefaultProps> = {},
): CarouselItemDefaultProps {
  return {
    cls: (...values) => values.filter(Boolean).join(' '),
    className: '',
    disabled: false,
    ...overrides,
  };
}

function createItemMediator(
  props: CarouselItemDefaultProps,
  carouselContext: CarouselContext,
) {
  const context: ContextUtils = {
    getContext: <T>(key: string) => (
      key === CAROUSEL_CONTEXT_KEY ? carouselContext as T : undefined
    ),
    setContext: vi.fn(),
  };

  return createMediatorContextUtils(
    carouselItemMediator,
    props,
    {},
    context,
  );
}

describe('carouselMediator', () => {
  it('given generated and explicit IDs, when initialized, then it follows the component ID format', () => {
    const generated = carouselMediator(createProps());
    const explicit = carouselMediator(createProps({ id: 'featured' }));

    expect(generated.id).toMatch(/^carousel_/);
    expect(explicit.id).toBe('_featured');

    generated.useBeforeUnmount();
    explicit.useBeforeUnmount();
  });

  it('given labelled enabled props, when initialized, then renderer state is normalized', () => {
    const mediator = carouselMediator(createProps({ className: 'featured' }));

    expect(mediator.state).toMatchObject({
      ariaLabel: 'Featured content',
      ariaLive: 'polite',
      ariaRoleDescription: 'carousel',
      className: 'Carousel featured',
      isDisabled: undefined,
      role: 'region',
      transform: 'translateX(-0%)',
    });

    mediator.useBeforeUnmount();
  });

  it('given reactive semantic props, when changed, then state and context stay normalized', async () => {
    const props = reactive(createProps());
    const mediator = carouselMediator(props);
    const context = mediator.getContext();

    props.ariaLabel = '';
    props.className = 'updated';
    props.disabled = true;

    await vi.waitFor(() => {
      expect(mediator.state).toMatchObject({
        ariaLabel: undefined,
        ariaRoleDescription: undefined,
        className: 'Carousel updated is-disabled',
        isDisabled: true,
        role: undefined,
      });
    });
    expect(context.isDisabled).toBe(true);

    mediator.useBeforeUnmount();
  });

  it('given three slides, when navigating, then it wraps and reports the current slide', () => {
    const onCurrentChange = vi.fn();
    const mediator = carouselMediator(createProps({ onCurrentChange }));
    mediator.registerItem();
    mediator.registerItem();
    mediator.registerItem();

    mediator.prev();
    expect(mediator.state.current).toBe(2);
    expect(mediator.state.transform).toBe('translateX(-200%)');

    mediator.next();
    expect(mediator.state.current).toBe(0);
    expect(onCurrentChange).toHaveBeenNthCalledWith(1, 2);
    expect(onCurrentChange).toHaveBeenNthCalledWith(2, 0);

    mediator.useBeforeUnmount();
  });

  it('given Carousel context, when commands are used, then it exposes live command state and behavior', () => {
    const mediator = carouselMediator(createProps());
    mediator.registerItem();
    mediator.registerItem();
    const context = mediator.getContext();

    context.next();
    expect(context.current).toBe(1);

    context.prev();
    expect(context.current).toBe(0);

    mediator.useBeforeUnmount();
  });

  it('given a disabled carousel, when navigation is requested, then its slide remains unchanged', () => {
    const mediator = carouselMediator(createProps({ disabled: true }));
    mediator.registerItem();
    mediator.registerItem();

    mediator.next();

    expect(mediator.state.current).toBe(0);
    mediator.useBeforeUnmount();
  });
});

describe('carouselItemMediator', () => {
  it('given Carousel context, when mounted, then it normalizes position and active state', async () => {
    const parentState = reactive({
      current: 0,
      isDisabled: undefined as true | undefined,
      itemsCount: 0,
    });
    const context: CarouselContext = {
      get current() {
        return parentState.current;
      },
      get isDisabled() {
        return parentState.isDisabled;
      },
      get itemsCount() {
        return parentState.itemsCount;
      },
      prev: vi.fn(),
      next: vi.fn(),
      registerItem() {
        const index = parentState.itemsCount;
        parentState.itemsCount += 1;
        return index;
      },
    };
    const mediator = createItemMediator(
      reactive(createItemProps({ className: 'story' })),
      context,
    );

    mediator.useBeforeMount();

    await vi.waitFor(() => {
      expect(mediator.state).toMatchObject({
        ariaHidden: undefined,
        ariaLabel: 'Slide 1 of 1',
        className: 'CarouselItem story active',
        inert: undefined,
        isActive: true,
        isDisabled: undefined,
      });
    });

    parentState.current = 1;
    parentState.isDisabled = true;

    await vi.waitFor(() => {
      expect(mediator.state).toMatchObject({
        ariaHidden: true,
        className: 'CarouselItem story is-disabled',
        inert: true,
        isActive: false,
        isDisabled: true,
      });
    });
  });
});
