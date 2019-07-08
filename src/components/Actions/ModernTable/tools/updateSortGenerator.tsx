import { Sorted, SortedId } from '../../../../store/reducer/views/list/type';
import { listUpdateSorted } from '../../../../store/actions/views/list';

const updateSortGenerator = (sorted: Array<Sorted>, updateSorted: typeof listUpdateSorted) => (
  id: SortedId,
) => () => {
  const existAtIndex = sorted.findIndex(s => s.id === id);

  // if user use shift key, keep old values
  const useArray: Array<Sorted> = [];

  if (existAtIndex !== -1) {
    if (sorted[existAtIndex].desc) {
      updateSorted([
        ...useArray.slice(0, existAtIndex),
        ...useArray.slice(existAtIndex + 1, useArray.length),
      ]);
    } else {
      updateSorted([
        ...useArray.slice(0, existAtIndex),
        {
          id,
          desc: true,
        },
        ...useArray.slice(existAtIndex + 1, useArray.length),
      ]);
    }
  } else {
    updateSorted([
      ...useArray.slice(0, existAtIndex),
      {
        id,
        desc: false,
      },
      ...useArray.slice(existAtIndex + 1, useArray.length),
    ]);
  }
};

export default updateSortGenerator;
