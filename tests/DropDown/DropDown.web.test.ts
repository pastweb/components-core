import { afterEach, describe, expect, it, vi } from 'vitest';
import { dropdownMediator } from '../../src/DropDown';
import type { DropDownDefaultProps } from '../../src/DropDown';

function createProps(overrides: Partial<DropDownDefaultProps> = {}): DropDownDefaultProps {
  return {
    cls: (...values) => values.filter(Boolean).join(' '),
    ariaLabel: 'DropDown',
    arrow: true,
    className: '',
    contentClassName: '',
    offset: 2,
    disabled: false,
    isVisible: false,
    visibleOn: 'click',
    placement: 'bottom',
    hideOnClickOut: true,
    hideOnBlur: true,
    position: 'absolute',
    clickTimeGap: 16,
    onClick: vi.fn(),
    onChange: vi.fn(),
    onContext: vi.fn(),
    onClickOut: vi.fn(),
    onMouseEnter: vi.fn(),
    onMouseLeave: vi.fn(),
    ...overrides,
  };
}

function mountMediator(props: DropDownDefaultProps = createProps()) {
  const mediator = dropdownMediator(props);
  const root = document.createElement('div');
  const target = document.createElement('span');
  const container = document.createElement('div');
  const content = document.createElement('div');
  const item = document.createElement('button');
  root.append(target, container);
  container.append(content);
  content.append(item);
  mediator.useMounted(root, target, container, content);
  return { mediator, root, target, container, content, item };
}

afterEach(() => {
  vi.useRealTimers();
});

describe('dropdownMediator content clicks', () => {
  it('given focused dropdown content, when it hides, then focus returns to the trigger', () => {
    const { mediator, root, target, item } = mountMediator(createProps({ isVisible: true }));
    target.tabIndex = 0;
    document.body.append(root);
    item.focus();

    expect(document.activeElement).toBe(item);

    mediator.hide();

    expect(mediator.state.isVisible).toBe(false);
    expect(document.activeElement).toBe(target);

    root.remove();
    mediator.useBeforeUnmount();
  });

  it('given an open dropdown, when hide is called, then it is not visible', () => {
    const { mediator } = mountMediator(createProps({ isVisible: true }));

    mediator.hide();

    expect(mediator.state.isVisible).toBe(false);
    mediator.useBeforeUnmount();
  });

  it('given an open dropdown, when onClick is invoked from content, then it stays visible', () => {
    vi.useFakeTimers();
    const onClick = vi.fn();
    const { mediator, item } = mountMediator(createProps({ isVisible: true, onClick }));

    mediator.onClick({ target: item });
    vi.advanceTimersByTime(16);

    expect(mediator.state.isVisible).toBe(true);
    expect(onClick).not.toHaveBeenCalled();
    mediator.useBeforeUnmount();
  });

  it('given hide-on-blur already closed the dropdown, when onClick is invoked from content, then it stays hidden', () => {
    vi.useFakeTimers();
    const onClick = vi.fn();
    const { mediator, item } = mountMediator(createProps({ onClick }));
    mediator.state.isVisible = false;

    mediator.onClick({ target: item });
    vi.advanceTimersByTime(16);

    expect(mediator.state.isVisible).toBe(false);
    expect(onClick).not.toHaveBeenCalled();
    mediator.useBeforeUnmount();
  });

  it('given an open dropdown, when a click lands inside the container, then it stays visible', () => {
    const onClickOut = vi.fn();
    const { mediator, item } = mountMediator(createProps({ isVisible: true, onClickOut }));

    item.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(mediator.state.isVisible).toBe(true);
    expect(onClickOut).not.toHaveBeenCalled();
    mediator.useBeforeUnmount();
  });
});
