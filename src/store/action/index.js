import {getTransactionData} from '../../services/data-service';

export const fetchData = () => {
  return dispatch => {
    dispatch({type: 'DATA_FETCH_BEGIN'});
    getTransactionData().then((data) => {
      dispatch({
        type: 'DATA_FETCH_SUCCESS',
        payload: data
      })
    })
  }
}