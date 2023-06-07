import { Select } from 'antd';
import { Space, Table, Tag, Input } from 'antd';
import NepaliDate from 'nepali-date-converter';
import type { ColumnsType } from 'antd/es/table';
import { AiOutlineSearch } from 'react-icons/ai';
import './projects.css';

interface DataType {
  key: string;
  teamMember: string;
  date: string;
}

const Projects = () => {
  const columns: ColumnsType<DataType> = [
    {
      title: 'TEAM MEMBERS',
      dataIndex: 'teamMember',
      key: 'teamMember',
      render: (text) => (
        <div>
          <p>{text}</p>
          <p>test@test.com</p>
        </div>
      ),
    },
    {
      title: 'DATE ADDED',
      dataIndex: 'date',
      key: 'date',
      render: (date) => new NepaliDate(date).format('DD/MM/YYYY'),
    },
  ];

  const data: DataType[] = [
    {
      key: '1',
      teamMember: 'test',
      date: new Date().toISOString(),
    },
    {
      key: '2',
      teamMember: 'test',
      date: new Date().toISOString(),
    },
    {
      key: '3',
      teamMember: 'test',
      date: new Date().toISOString(),
    },
    {
      key: '4',
      teamMember: 'test',
      date: new Date().toISOString(),
    },
    {
      key: '5',
      teamMember: 'test',
      date: new Date().toISOString(),
    },
  ];

  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value: string) => {
    console.log('search:', value);
  };

  const onInputSearch = (e: any) => console.log(e.target.value);

  return (
    <div className='project-container'>
      <p>Assigned Projects</p>
      <hr />
      <div className='project-input-container'>
        <Select
          showSearch
          size='large'
          placeholder='Select a project'
          optionFilterProp='children'
          onChange={onChange}
          onSearch={onSearch}
          style={{ width: 286 }}
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          options={[
            {
              value: 'jack',
              label: 'Jack',
            },
            {
              value: 'lucy',
              label: 'Lucy',
            },
            {
              value: 'tom',
              label: 'Tom',
            },
          ]}
        />

        <Input
          placeholder='Search'
          style={{ width: 200 }}
          size='large'
          onChange={onInputSearch}
          suffix={<AiOutlineSearch />}
        />
      </div>

      <div className='project-table-container'>
        <Table
          columns={columns}
          pagination={{ position: ['bottomCenter'], pageSize: 5 }}
          dataSource={data}
        />
      </div>
    </div>
  );
};

export default Projects;
