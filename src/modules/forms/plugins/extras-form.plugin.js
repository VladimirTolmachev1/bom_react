import { extrasFormFieldSelector } from '../../../components/forms/selectors';

function removeSizeRestrictionsFromExtras(extras) {
  extras.forEach(extra => {
    extra.sizes = [];
  });
}

function removeSizesRestrictionsFormExtrasLists(lists) {
  lists.forEach(list => {
    removeSizeRestrictionsFromExtras(list.items);
  });
}

export const lastExtrasCopiedFromNameSelector = state =>
  extrasFormFieldSelector(state, 'lastCopiedFrom');

export const COPY_EXTRAS_FROM_ANOTHER_ENTITY =
  'COPY_EXTRAS_FROM_ANOTHER_ENTITY';

export const copyExtrasToForm = ({
  extrasToCopy = [],
  extrasListsToCopy = [],
  copiedFrom = null,
}) => ({
  type: COPY_EXTRAS_FROM_ANOTHER_ENTITY,
  payload: { extrasToCopy, copiedFrom, extrasListsToCopy },
});

export function copyExtrasPlugin(state, { type, payload }) {
  switch (type) {
    case COPY_EXTRAS_FROM_ANOTHER_ENTITY: {
      const { extrasToCopy, extrasListsToCopy, copiedFrom } = payload;

      removeSizeRestrictionsFromExtras(extrasToCopy);
      removeSizesRestrictionsFormExtrasLists(extrasListsToCopy);

      return {
        ...state,
        values: {
          ...state.values,
          extras: [...(state.values.extras || []), ...extrasToCopy],

          extra_lists: [
            ...(state.values.extra_lists || []),
            ...extrasListsToCopy,
          ],

          lastCopiedFrom: copiedFrom,
        },
      };
    }
    default:
      return state;
  }
}
