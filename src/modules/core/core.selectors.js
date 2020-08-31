const coreSliceSelector = state => state.Core;

export const singInLoadingSelector = state =>
  coreSliceSelector(state).signInLoading;

export const themeSelector = state => coreSliceSelector(state).theme;

export const themeColorSelector = state =>
  themeSelector(state).palette.primary.main;
export const bgColorSelector = state => coreSliceSelector(state).bgColor;

export const forgotPasswordLoadingSelector = state =>
  coreSliceSelector(state).forgotPasswordLoading;
export const resetPasswordLoadingSelector = state =>
  coreSliceSelector(state).resetPasswordLoading;
export const dictionarySelector = state => coreSliceSelector(state).dictionary;
export const isAuthSelector = state => coreSliceSelector(state).isAuth;

export const roleSelector = state => {
  return coreSliceSelector(state).role;
};

export const authRestaurantIdSelector = ({ Core }) => Core.role.restaurant_id;
