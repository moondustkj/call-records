import { Button, Input, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import {
  fetchCallRecords,
  setCallsRecordList,
  updateCallLabels,
} from '../Calls/actions';

const Table = styled.table`
  width: 70%;
  margin: 10px auto;
  th {
    background-color: wheat;
  }
  th,
  td {
    padding: 10px;
    border: 1px solid #aaacb3;
    text-align: center;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  padding: 20px;
`;

export default function CallLabels() {
  const dispatch = useDispatch();
  const { callsList } = useSelector(state => state.calls);
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [labelToAdd, setLabelsToAdd] = useState('');

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    setLabelsToAdd('');
    if (isAllChecked) setIsAllChecked(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setLabelsToAdd('');
  };

  useEffect(() => {
    dispatch(fetchCallRecords());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = e => {
    const updatedList = [...callsList];
    if (e.target.value === 'checkAll') {
      updatedList.forEach(item => {
        // eslint-disable-next-line no-param-reassign
        item.isChecked = e.target.checked;
        setIsAllChecked(e.target.checked);
      });
    } else {
      updatedList.find(
        item => item.call_id === parseInt(e.target.name, 10),
      ).isChecked = e.target.checked;
    }
    dispatch(setCallsRecordList(updatedList));
  };

  const addLabels = () => {
    const info = {
      op: title.toLowerCase(),
      label: labelToAdd,
      callIds: callsList
        .filter(item => item.isChecked)
        .map(item => item.call_id),
    };
    dispatch(updateCallLabels(info, handleOk));
  };

  return (
    <Wrapper>
      <h3>Calls List</h3>
      <div style={{ marginBottom: '20px' }}>
        <Button
          type="button"
          disabled={!callsList.filter(item => item.isChecked).length}
          onClick={() => {
            showModal();
            setTitle('Add');
          }}
        >
          Add
        </Button>
        <Button
          type="button"
          disabled={!callsList.filter(item => item.isChecked).length}
          style={{ marginLeft: '10px' }}
          onClick={() => {
            showModal();
            setTitle('Remove');
          }}
        >
          Remove
        </Button>
      </div>
      <Modal
        title={`${title} Labels`}
        visible={isModalVisible}
        onOk={addLabels}
        onCancel={handleCancel}
      >
        <h3>Call Label</h3>
        <Input
          placeholder={`Enter label to ${title}`}
          onChange={e => setLabelsToAdd(e.target.value)}
        />
      </Modal>
      <Table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                name="checkAll"
                value="checkAll"
                checked={isAllChecked}
                onChange={handleChange}
              />
            </th>
            <th>Call ID</th>
            <th>Labels</th>
          </tr>
        </thead>
        <tbody>
          {typeof callsList !== 'undefined' && callsList && callsList.length
            ? callsList.map(item => (
                <>
                  <tr key={item.call_id}>
                    <td>
                      <input
                        type="checkbox"
                        name={item.call_id}
                        value={item.call_id}
                        checked={item.isChecked}
                        onChange={handleChange}
                      />
                    </td>
                    <td>{item.call_id}</td>
                    <td>{item.label_id.join(', ')}</td>
                  </tr>
                </>
              ))
            : null}
        </tbody>
      </Table>
    </Wrapper>
  );
}
