// DISH HELPERS

export const hasExtras = ({ extras, extra_lists }) =>
  (extras || []).length || (extra_lists || []).length;
export const hasSizes = ({ sizes }) => (sizes || []).length;
export const isNotSatisfiesSizesLimits = (extra, selectedSize) =>
  extra.sizes && extra.sizes.length && !extra.sizes.includes(selectedSize);
