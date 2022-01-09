import axios from 'axios';

export const SET_CALLS_RECORD_LIST = 'SET_CALLS_RECORD_LIST';
export const SET_CALLS_ID_LIST = 'SET_CALLS_ID_LIST';
export const SET_CALLS_DURATION = 'SET_CALLS_DURATION';
export const SET_FILTERED_CALLS_LIST = 'SET_FILTERED_CALLS_LIST';

const setCallsRecordList = payload => ({
  type: SET_CALLS_RECORD_LIST,
  payload,
});
const setCallsIDList = payload => ({
  type: SET_CALLS_ID_LIST,
  payload,
});
const setCallsDuration = payload => ({
  type: SET_CALLS_DURATION,
  payload,
});
const setFilteredCallsList = payload => ({
  type: SET_FILTERED_CALLS_LIST,
  payload,
});

export function fetchCallRecords() {
  return dispatch =>
    axios
      .get('https://damp-garden-93707.herokuapp.com/getcalllist', {
        headers: {
          user_id: '24b456',
        },
      })
      .then(res => {
        dispatch(setCallsRecordList(res.data.data));
      })
      .catch(err => {
        dispatch(setCallsRecordList([]));
      });
}

export function fetchAgents() {
  return dispatch =>
    axios
      .get('https://damp-garden-93707.herokuapp.com/getlistofagents')
      .then(res => {
        console.log(res, 'res');
        dispatch(setCallsIDList(res.data.data));
      })
      .catch(err => {
        console.log('err', err);
        dispatch(setCallsIDList([]));
      });
}

export function fetchCallsDuration() {
  return dispatch =>
    axios
      .get('https://damp-garden-93707.herokuapp.com/getdurationrange')
      .then(res => {
        dispatch(setCallsDuration(res.data.data));
      })
      .catch(err => {
        dispatch(setCallsDuration({}));
      });
}
export function filterCallsList(filterApplied) {
  return dispatch => {
    const postData = {
      info: {
        filter_agent_list: filterApplied.caller_id,
        filter_time_range: filterApplied.duration,
      },
    };
    axios
      .post(
        'https://damp-garden-93707.herokuapp.com/getfilteredcalls',
        postData,
      )
      .then(res => {
        console.log('res of filter', res.data.data);
        dispatch(setFilteredCallsList(res.data.data));
      })
      .catch(err => {
        dispatch(setFilteredCallsList([]));
      });
  };
}
