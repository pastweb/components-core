import { describe, expect, it, vi } from 'vitest';
import { reactive } from '@pastweb/tools';
import { iconMediator } from '../../src/Icon';
import type { IconDefaultProps } from '../../src/Icon';

function createProps(overrides: Partial<IconDefaultProps> = {}): IconDefaultProps {
  return {
    cls: (...values) => values.filter(Boolean).join(' '),
    ariaLabel: '',
    className: '',
    src: '',
    name: '',
    collection: {},
    apiUrl: 'https://api.iconify.design',
    ...overrides,
  };
}

describe('iconMediator', () => {
  it('given an SVG source, when initialized, then it exposes inline icon data', () => {
    const mediator = iconMediator(createProps({ src: '<svg viewBox="0 0 1 1"></svg>' }));

    expect(mediator.state.iconData).toContain('<svg');
    expect(mediator.state.src).toBe('');
  });

  it('given an image source, when initialized, then it exposes the image URL', () => {
    const mediator = iconMediator(createProps({ src: '/icons/account.png' }));

    expect(mediator.state.iconData).toBe('');
    expect(mediator.state.src).toBe('/icons/account.png');
  });

  it('given a local collection icon, when initialized, then it resolves the named source', () => {
    const mediator = iconMediator(createProps({
      name: 'actions:close',
      collection: { actions: { close: '<svg data-icon="close"></svg>' } },
    }));

    expect(mediator.state.collectionName).toBe('actions');
    expect(mediator.state.iconName).toBe('close');
    expect(mediator.state.iconData).toContain('data-icon="close"');
  });

  it('given the default accessible name, when initialized, then the icon stays decorative', () => {
    const mediator = iconMediator(createProps());

    expect(mediator.state.ariaLabel).toBeUndefined();
    expect(mediator.state.role).toBeUndefined();
    expect(mediator.state.ariaHidden).toBe(true);
  });

  it('given an explicit empty ariaLabel, when initialized, then the accessible name is omitted', () => {
    const mediator = iconMediator(createProps({ ariaLabel: '' }));

    expect(mediator.state.ariaLabel).toBeUndefined();
    expect(mediator.state.role).toBeUndefined();
    expect(mediator.state.ariaHidden).toBe(true);
  });

  it('given a meaningful ariaLabel, when initialized, then it exposes image semantics', () => {
    const mediator = iconMediator(createProps({ ariaLabel: 'Close' }));

    expect(mediator.state.ariaLabel).toBe('Close');
    expect(mediator.state.role).toBe('img');
    expect(mediator.state.ariaHidden).toBeUndefined();
  });

  it('given icon accessibility props change, when effects run, then state exposes current values', async () => {
    const props = reactive(createProps({ ariaLabel: 'Close' }));
    const mediator = iconMediator(props);

    props.ariaLabel = '';

    await vi.waitFor(() => {
      expect(mediator.state.ariaLabel).toBeUndefined();
      expect(mediator.state.role).toBeUndefined();
      expect(mediator.state.ariaHidden).toBe(true);
    });
  });
});
