import { sizesFormFieldSelector } from '../../../components/forms/selectors';

export const lastSizesCopiedFromNameSelector = state =>
  sizesFormFieldSelector(state, 'lastCopiedFrom');

export const COPY_SIZES_FROM_ANOTHER_ENTITY = 'COPY_SIZES_FROM_ANOTHER_ENTITY';

export function copySizesToForm(sizesToCopy = [], copiedFrom) {
  return {
    type: COPY_SIZES_FROM_ANOTHER_ENTITY,
    payload: { sizesToCopy, copiedFrom },
  };
}

function prepareForCopying(sizes) {
  sizes.forEach(size => {
    delete size.id;
  });
}

export function copySizesPlugin(state, { type, payload }) {
  switch (type) {
    case COPY_SIZES_FROM_ANOTHER_ENTITY: {
      const { sizesToCopy, copiedFrom } = payload;
      prepareForCopying(sizesToCopy);

      return {
        ...state,
        values: {
          ...state.values,
          sizes: [...state.values.sizes, ...sizesToCopy],

          lastCopiedFrom: copiedFrom,
        },
      };
    }
    default:
      return state;
  }
}
