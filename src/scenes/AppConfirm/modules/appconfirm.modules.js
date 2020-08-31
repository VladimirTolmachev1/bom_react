export const SHOW_CONFIRM = '/app/show-confirm';
export const CLOSE_CONFIRM = '/app/close-confirm';

const getInitialState = () => ({
  onSuccess: () => {},
  open: false,
  header: null,
  content: null,
});

// todo add delay to clear state in middleware
export function reducer(state = getInitialState(), action = {}) {
  switch (action.type) {
    case SHOW_CONFIRM: {
      return {
        ...state,
        open: true,
        ...action.config,
      };
    }
    case CLOSE_CONFIRM: {
      return {
        ...state,
        open: false,
      };
    }
    default: {
      return state;
    }
  }
}

export function showConfirm(config) {
  return {
    type: SHOW_CONFIRM,
    config,
  };
}

export function closeConfirm() {
  return {
    type: CLOSE_CONFIRM,
  };
}
