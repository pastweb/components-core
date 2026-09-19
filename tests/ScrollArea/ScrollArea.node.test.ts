import { describe, expect, it } from 'vitest';
import { scrollAreaMediator } from '../../src/ScrollArea';
import type { ScrollAreaDefaultProps } from '../../src/ScrollArea';

function props(contentPadding?: number | string): ScrollAreaDefaultProps {
  return {
    cls: (...values) => values.filter(Boolean).join(' '),
    ariaLabel: 'Scrollable content',
    className: '',
    hideX: false,
    hideY: false,
    scrollBottom: false,
    scrollRight: false,
    tabIndex: 0,
    contentPadding,
  };
}

describe('scrollAreaMediator', () => {
  it('given the default accessible name, when initialized, then ariaLabel is the default', () => {
    const mediator = scrollAreaMediator(props());

    expect(mediator.state.ariaLabel).toBe('Scrollable content');
  });

  it('given an explicit empty ariaLabel, when initialized, then the accessible name is omitted', () => {
    expect(scrollAreaMediator({ ...props(), ariaLabel: '' }).state.ariaLabel).toBeUndefined();
  });

  it('given zero padding, when style is requested, then zero is preserved', () => {
    expect(scrollAreaMediator(props(0)).getContentStyle()).toEqual({ padding: 0 });
  });

  it('given no padding, when style is requested, then no inline property is emitted', () => {
    expect(scrollAreaMediator(props()).getContentStyle()).toEqual({});
  });

  it('given end alignment props, when alignment is requested, then semantic ends are returned', () => {
    const mediator = scrollAreaMediator({ ...props(), scrollRight: true, scrollBottom: true });
    expect(mediator.getScrollAlignment()).toEqual({ horizontal: 'end', vertical: 'end' });
  });
});
