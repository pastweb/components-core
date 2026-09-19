import { describe, expect, it, vi } from 'vitest';
import { reactive } from '@pastweb/tools';
import { panelMediator } from '../../src/Panel';
import type { PanelDefaultProps } from '../../src/Panel';

function createProps(overrides: Partial<PanelDefaultProps> = {}): PanelDefaultProps {
  return {
    cls: (...values) => values.filter(Boolean).join(' '),
    ariaLabel: '',
    border: true,
    borderRadius: true,
    className: '',
    closeButton: true,
    closeLabel: 'Close panel',
    headingLevel: 2,
    id: undefined,
    title: 'Account',
    contentPadding: 0,
    onClose: vi.fn(),
    rtl: false,
    ...overrides,
  };
}

describe('panelMediator', () => {
  it('given generated and explicit IDs, when initialized, then it follows the component ID format', () => {
    const generated = panelMediator(createProps());
    const explicit = panelMediator(createProps({ id: 'account-panel' }));

    expect(generated.state.id).toMatch(/^panel_/);
    expect(generated.state.titleId).toBe(`title${generated.state.id}`);
    expect(explicit.state.id).toBe('_account-panel');
    expect(explicit.state.titleId).toBe('title_account-panel');

    generated.useBeforeUnmount();
    explicit.useBeforeUnmount();
  });

  it('given no title, when initialized, then it does not expose an empty title relationship', () => {
    const mediator = panelMediator(createProps({ title: '' }));

    expect(mediator.state.titleId).toBeUndefined();
    expect(mediator.state.ariaLabel).toBeUndefined();
    mediator.useBeforeUnmount();
  });

  it('given no title and an ariaLabel, when initialized, then the article name is exposed', () => {
    const mediator = panelMediator(createProps({ title: '', ariaLabel: 'Filter options' }));

    expect(mediator.state.ariaLabel).toBe('Filter options');
    expect(mediator.state.titleId).toBeUndefined();
    mediator.useBeforeUnmount();
  });

  it('given a heading level, when initialized, then it exposes the matching semantic heading', () => {
    const mediator = panelMediator(createProps({ headingLevel: 4 }));

    expect(mediator.state.heading).toBe('h4');
    mediator.useBeforeUnmount();
  });

  it('given a close callback, when close is requested, then it reports close intent', () => {
    const onClose = vi.fn();
    const mediator = panelMediator(createProps({ onClose }));

    mediator.onClose();

    expect(onClose).toHaveBeenCalledOnce();
    mediator.useBeforeUnmount();
  });

  it('given panel props change, when effects run, then state exposes current values', async () => {
    const props = reactive(createProps({ id: 'account-panel' }));
    const mediator = panelMediator(props);

    props.title = '';
    props.ariaLabel = 'Filter options';
    props.headingLevel = 3;

    await vi.waitFor(() => {
      expect(mediator.state.titleId).toBeUndefined();
      expect(mediator.state.ariaLabel).toBe('Filter options');
      expect(mediator.state.heading).toBe('h3');
    });
    mediator.useBeforeUnmount();
  });
});
