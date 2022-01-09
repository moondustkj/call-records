import axios from 'axios';

export const SET_CALLS_RECORD_LIST = 'SET_CALLS_RECORD_LIST';
export const SET_CALLS_ID_LIST = 'SET_CALLS_ID_LIST';
export const SET_CALLS_DURATION = 'SET_CALLS_DURATION';
export const SET_FILTERED_CALLS_LIST = 'SET_FILTERED_CALLS_LIST';

export const setCallsRecordList = payload => ({
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
        const updatedList = res.data.data.call_data.map(item => ({
          ...item,
          isChecked: false,
        }));
        dispatch(setCallsRecordList(updatedList));
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
        dispatch(setCallsIDList(res.data.data));
      })
      .catch(err => {
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
        dispatch(setFilteredCallsList(res.data.data));
      })
      .catch(err => {
        dispatch(setFilteredCallsList([]));
      });
  };
}

export const updateCallLabels = (info, callback) => dispatch => {
  const postData = {
    operation: {
      callList: [...info.callIds],
      label_ops: [{ name: info.label, op: info.op }],
    },
  };
  axios
    .post('https://damp-garden-93707.herokuapp.com/applyLabels', postData, {
      headers: {
        user_id: '24b456',
      },
    })
    .then(res => {
      if (res.data.message === 'successfull') {
        callback();
        dispatch(fetchCallRecords());
      } else {
        callback();
      }
    })
    .catch(err => {
      console.log('err', err);
    });
};
