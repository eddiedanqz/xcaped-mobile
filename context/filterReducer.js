export default (state, action) => {
  switch (action.type) {
    case 'ADD_FILTERS': {
      return {
        ...state,
        filters: action.payload,
      };
    }

    case 'CLEAR_FILTERS': {
      return {
        ...state,
        filters: action.payload,
      };
    }

    default:
      return state;
  }
};