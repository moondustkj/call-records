export const columns = [
  {
    title: 'Caller ID',
    dataIndex: 'call_id',
    sorter: {
      compare: (a, b) => a.call_id - b.call_id,
      multiple: 1,
    },
  },
  {
    title: 'Agent ID',
    dataIndex: 'agent_id',
    sorter: {
      compare: (a, b) => a.agent_id - b.agent_id,
      multiple: 3,
    },
  },
  {
    title: 'Call Duration',
    dataIndex: 'call_time',
    sorter: {
      compare: (a, b) => a.call_time - b.call_time,
      multiple: 2,
    },
  },
];
