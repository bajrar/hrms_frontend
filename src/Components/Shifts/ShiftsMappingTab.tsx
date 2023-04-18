import { useState } from 'react';

import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import { WorkingCondition } from '../../utils/Constants';
import Selects from '../Ui/Selects/Selects';

export interface DataType {
  id?: string;
  employeeName?: string;
  shiftName: string;
}

const ShiftsMappingTab = () => {
  const [shiftType, setShiftTYpe] = useState('All');
  const [searchText, setSearchText] = useState('');
  const onSelect = () => {
    console.log('solla');
  };

  const columns: ColumnsType<DataType> = [
    {
      title: 'EID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'EMPLOYEE NAME',
      dataIndex: 'employeeName',
      key: 'employeeName',
    },
    {
      title: 'SHIFT NAME',
      dataIndex: 'shiftName',
      key: 'shiftName',
    },
  ];

  return (
    <div className='shift-mapping-container'>
      <div className='d-flex align-items-center shift-header'>
        <Selects
          defaultValue='All'
          onSelect={onSelect}
          value={shiftType}
          options={WorkingCondition}
        />
        <input
          type='text'
          placeholder='Search'
          className='search-field '
          value={searchText}
          onChange={(e) => setSearchText(e.target.value.toLowerCase())}
        />
      </div>
      <Table
        columns={columns}
        dataSource={[]}
        className='shift-Mapping-table'
      />
    </div>
  );
};

export default ShiftsMappingTab;
