import { reactive, effect } from '@pastweb/tools';
import { DOTS_INITIAL, DOTS_LEFT, DOTS_RIGHT } from './constants';
import type { PaginationDefaultProps, PaginationMediator, PaginationState } from './types';

const getPageNumbers = (total: number): number[] => Array.from({ length: total }, (_, i) => i + 1);

export function paginationMediator(props: PaginationDefaultProps): PaginationMediator {
  const state = reactive<PaginationState>({
    current: props.current,
    pages: [],
  });

  let numberOfPages = getPageNumbers(props.total);

  effect(
    current => { state.current = current; },
    () => props.current,
  );

  function calcDots() {
    const { current, pages } = state;
    let tempNumberOfPages = [...pages];

    // If the number of pages is smaller than 8, then show all the pages
    if (numberOfPages.length < 8) {
      tempNumberOfPages = numberOfPages;
    } else {
      // If the number of pages is bigger than 7, then show the first 4 buttons, the dots, and the last page
      if (current >= 1 && current <= 3) {
        tempNumberOfPages = [1, 2, 3, 4, DOTS_INITIAL, numberOfPages.length];
      } else if (current === 4) {
        // If I click on the 4th button, show the first 5 buttons, the dots, and the last page
        const sliced = numberOfPages.slice(0, 5);
        tempNumberOfPages = [...sliced, DOTS_INITIAL, numberOfPages.length];
      } else if (
        // If I click on the 5th button, then show just the first button, the left dots, the central pages, the right dots, and the last page
        current > 4 &&
        current < numberOfPages.length - 2
      ) {
        // The left portion of the buttons
        const slicedLeft = numberOfPages.slice((current as number) - 2, current);
        // The right portion of the buttons
        const slicedRight = numberOfPages.slice(current, (current as number) + 1);
        // Take all the items to construct the array of buttons to render
        tempNumberOfPages = [
          1,
          DOTS_LEFT,
          ...slicedLeft,
          ...slicedRight,
          DOTS_RIGHT,
          numberOfPages.length,
        ];
        // If I click on one of the last 3 buttons
      } else if (current > numberOfPages.length - 3) {
        const sliced = numberOfPages.slice(numberOfPages.length - 4);
        tempNumberOfPages = [1, DOTS_LEFT, ...sliced];
        // Handle the click event on the dots
      }
    }

    state.pages = tempNumberOfPages;
  }

  calcDots();

  effect(calcDots, () => state.current);
  effect(
    total => {
      numberOfPages = getPageNumbers(total);
      calcDots();
    },
    () => props.total,
  );

  function onNext() {
    const newPage = state.current + 1;
    state.current = newPage;
    props.onChange(newPage);
  }
  function onPrev() {
    const newPage = state.current - 1;
    state.current = newPage;
    props.onChange(newPage);
  }

  function onPageChange(page: number | string) {
    let newPage = page;
    const { pages } = state

    if (page === DOTS_INITIAL) {
      // When showing the first buttons, the click on the dots sets the current button on the 5th
      newPage = (pages[pages.length - 3] as number) + 1;
      // The click on the right dots sets the current button + 2
    } else if (page === DOTS_RIGHT) {
      newPage = (pages[3] as number) + 2;
      // The click on the left dots sets the current button - 2
    } else if (page === DOTS_LEFT) {
      newPage = (pages[3] as number) - 2;
    }

    state.current = newPage as number;
    props.onChange(newPage as number);
  }

  return {
    state,
    onPageChange,
    onPrev,
    onNext,
  };
}
