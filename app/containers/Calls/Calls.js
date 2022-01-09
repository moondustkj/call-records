import { Col, Pagination, Select, Slider, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import {
  fetchCallRecords,
  fetchAgents,
  fetchCallsDuration,
  filterCallsList,
} from './actions';
import { columns } from './callsService';

const Calls = () => {
  const dispatch = useDispatch();
  const { callIdList, callsDuration, filteredCallRecords } = useSelector(
    state => state.calls,
  );
  const numEachPage = 10;
  const [maxPageCount, setMaxPageCount] = useState(10);
  const [minPageCount, setMinPageCount] = useState(0);
  const [filterValues, setFilterValues] = useState({
    caller_id: [],
    duration: [callsDuration.minimum, callsDuration.maximum],
  });

  useEffect(() => {
    dispatch(fetchCallRecords());
    dispatch(fetchAgents());
    dispatch(fetchCallsDuration());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { Option } = Select;

  function onChange(value) {
    const updatedFilters = {
      ...filterValues,
      caller_id: value,
    };
    setFilterValues(updatedFilters);
    dispatch(filterCallsList(updatedFilters));
  }

  function onAfterChange(value) {
    const updatedFilters = {
      ...filterValues,
      duration: value,
    };
    setFilterValues(updatedFilters);
    dispatch(filterCallsList(updatedFilters));
  }

  function handlePagination(value) {
    setMinPageCount((value - 1) * numEachPage);
    setMaxPageCount(!value ? numEachPage : value * numEachPage);
  }
  function onChangeHAndler(pagination, filters, sorter, extra) {
    console.log('params', pagination, filters, sorter, extra);
  }
  return (
    <Wrapper>
      <h3>Calls Record</h3>
      <Col span={6}>
        <FiltersSection>
          <h4>Filters</h4>
          <hr />
          <Box>
            <h4>Call ID</h4>
            <Select
              showSearch
              style={{ width: '100%' }}
              placeholder="Select a call id"
              optionFilterProp="children"
              mode="multiple"
              allowClear
              defaultValue={
                filterValues.caller_id ? filterValues.caller_id : undefined
              }
              onChange={onChange}
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {typeof callIdList !== 'undefined' && callIdList.length
                ? callIdList.map(id => <Option value={id}>{id}</Option>)
                : null}
            </Select>
          </Box>
          <Box>
            <h4>Call Duration</h4>
            <Slider
              range
              onAfterChange={onAfterChange}
              min={callsDuration.minimum}
              defaultValue={[
                callsDuration.minimum,
                Math.floor(callsDuration.maximum),
              ]}
              max={Math.floor(callsDuration.maximum) + 1}
            />
          </Box>
        </FiltersSection>
      </Col>
      <Col span={17}>
        {filteredCallRecords && filteredCallRecords.length ? (
          <>
            {/* <Table>
              <thead>
                <tr>
                  <th>Call ID</th>
                  <th>Agent ID</th>
                  <th>Call time</th>
                </tr>
              </thead>
              <tbody>
                {typeof filteredCallRecords !== 'undefined' &&
                filteredCallRecords &&
                filteredCallRecords.length
                  ? filteredCallRecords
                      .slice(minPageCount, maxPageCount)
                      .map(item => (
                        <>
                          <tr>
                            <td>{item.call_id}</td>
                            <td>{item.agent_id}</td>
                            <td>{item.call_time}</td>
                          </tr>
                        </>
                      ))
                  : null}
              </tbody>
            </Table> */}
            <Table
              columns={columns}
              dataSource={filteredCallRecords}
              onChange={onChangeHAndler}
            />
            {/* <Pagination
              style={{
                display: 'block',
                margin: '40px auto',
                width: 'fit-content',
              }}
              defaultCurrent={1}
              defaultPageSize={numEachPage}
              onChange={handlePagination}
              total={filteredCallRecords && filteredCallRecords.length}
            /> */}
          </>
        ) : (
          <NoDataScreen>
            <h2> No data found</h2>
          </NoDataScreen>
        )}
      </Col>
    </Wrapper>
  );
};

const NoDataScreen = styled.div`
  text-transform: capitalize;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
`;

const Wrapper = styled.div`
  width: 100%;
  padding: 20px;
  .ant-pagination {
    width: 100%;
    text-align: center;
  }
  table {
    margin: 0px 0 10px 35px;
  }
`;

const FiltersSection = styled.div`
  width: 100%;
  border: 1px solid #e7e7e8;
  border-radius: 5px;
  padding: 20px;
`;

const Box = styled.div`
  margin: 20px 0;
`;

// const Table = styled.table`
//   width: 100%;
//   margin-left: 10px;
//   th {
//     background-color: wheat;
//   }
//   th,
//   td {
//     padding: 10px;
//     border: 1px solid #aaacb3;
//     text-align: center;
//   }
// `;
export default Calls;
