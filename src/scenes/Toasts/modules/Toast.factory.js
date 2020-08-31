let id = 0;

const defaultOptions = {
  type: 'info',
  timeout: 3000,
};

export function createDefaultToast(options) {
  return {
    ...defaultOptions,
    ...options,
    // eslint-disable-next-line no-plusplus
    id: id++,
  };
}
