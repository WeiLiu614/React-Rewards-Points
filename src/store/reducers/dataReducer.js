const initialState = {
  list: [],
  isLoading: false,
  error: null,
};

export const dataReducer = (state=initialState, action) => {
  switch(action.type) {
    case 'DATA_FETCH_BEGIN': {
      return {
        ...state,
        isLoading: true
      }
    } 

    case 'DATA_FETCH_FAILURE': {
      return {
        ...state,
        isLoading: false,
        error: action.error
      }
    }

    case 'DATA_FETCH_SUCCESS': {
      return {
        ...state,
        isLoading: false,
        list: action.payload
      }
    }
  }
}