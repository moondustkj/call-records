const {
  SET_CALLS_RECORD_LIST,
  SET_CALLS_ID_LIST,
  SET_CALLS_DURATION,
  SET_FILTERED_CALLS_LIST,
} = require('./actions');

const initialState = {
  callsList: [],
  callIdList: [],
  callsDuration: {},
  filteredCallRecords: [],
};

const callsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CALLS_RECORD_LIST:
      return {
        ...state,
        callsList: action.payload,
      };
    case SET_CALLS_ID_LIST:
      return {
        ...state,
        callIdList: action.payload.listofagents,
      };
    case SET_CALLS_DURATION:
      return {
        ...state,
        callsDuration: action.payload,
      };
    case SET_FILTERED_CALLS_LIST:
      return {
        ...state,
        filteredCallRecords: action.payload,
      };
    default:
      return state;
  }
};
export default callsReducer;
