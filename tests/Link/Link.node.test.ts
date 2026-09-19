import { describe, expect, it, vi } from 'vitest';
import { reactive } from '@pastweb/tools';
import { linkMediator } from '../../src/Link';
import type { LinkDefaultProps } from '../../src/Link';

function createProps(overrides: Partial<LinkDefaultProps> = {}): LinkDefaultProps {
  return {
    cls: (...values) => values.filter(Boolean).join(' '),
    className: '',
    disabled: false,
    href: '/documentation',
    target: '_self',
    id: undefined,
    onClick: vi.fn(),
    ...overrides,
  };
}

describe('linkMediator', () => {
  it('given an available link, when initialized, then isDisabled is omitted', () => {
    const mediator = linkMediator(createProps());

    expect(mediator.state.isDisabled).toBeUndefined();
  });

  it('given an available link, when activated, then it reports the event', () => {
    const onClick = vi.fn();
    const event = { preventDefault: vi.fn() };
    const mediator = linkMediator(createProps({ onClick }));

    mediator.onClick(event);

    expect(onClick).toHaveBeenCalledWith(event);
    expect(event.preventDefault).not.toHaveBeenCalled();
  });

  it('given a disabled link, when activated, then navigation is prevented and not reported', () => {
    const onClick = vi.fn();
    const event = { preventDefault: vi.fn() };
    const mediator = linkMediator(createProps({ disabled: true, onClick }));

    mediator.onClick(event);

    expect(mediator.state.isDisabled).toBe(true);
    expect(event.preventDefault).toHaveBeenCalledOnce();
    expect(onClick).not.toHaveBeenCalled();
  });

  it('given link props change, when effects run, then isDisabled exposes the current value', async () => {
    const props = reactive(createProps());
    const mediator = linkMediator(props);

    props.disabled = true;

    await vi.waitFor(() => {
      expect(mediator.state.isDisabled).toBe(true);
    });

    props.disabled = false;

    await vi.waitFor(() => {
      expect(mediator.state.isDisabled).toBeUndefined();
    });
  });
});
