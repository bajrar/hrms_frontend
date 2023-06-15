import { Select } from 'antd';
import { Space, Table, Tag, Input } from 'antd';
import NepaliDate from 'nepali-date-converter';
import type { ColumnsType } from 'antd/es/table';
import { AiOutlineSearch } from 'react-icons/ai';
import './projects.css';
import { useEffect, useState } from 'react';
import { useGetProjectTeamQuery } from '../../../redux/features/projectTeam.slice';
import Spinner from '../../Spinner/Spinner';

interface DataType {
  key: string;
  teamMember: string;
  date: string;
}

type PropTypes = {
  projectTeam: string;
};

type Team = {
  _id: string;
  teamMember: { name: string; employee: string };
  joinDate: string;
};

const columns: ColumnsType<DataType | Team> = [
  {
    title: 'TEAM MEMBERS',
    dataIndex: 'teamMember',
    key: 'teamMember',
    render: ({ name, email }) => (
      <div>
        <p>{name}</p>
        <p>{email}</p>
      </div>
    ),
  },
  {
    title: 'DATE ADDED',
    dataIndex: 'date',
    key: 'date',
    render: (date) => new NepaliDate('2075-03-05').format('MMMM DD, YYYY'),
  },
];

const Projects = ({ projectTeam = 'HRMS' }: PropTypes) => {
  const [team, setTeam] = useState<Team[]>();
  const [teamCache, setTeamCache] = useState<Team[]>();
  const { data, error, isLoading } = useGetProjectTeamQuery(projectTeam);

  useEffect(() => {
    if (data?.employees?.length > 0) {
      const mapped = data.employees.map((entry: any) => ({
        id: entry._id,
        teamMember: { name: entry.employeeName, email: entry.email },
        joinDate: new Date().toISOString(),
      }));
      setTeam(mapped);
      setTeamCache(mapped);
    }
  }, [isLoading, data]);

  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onInputSearch = (e: any) => {
    console.log(e.target.value);
    if (e.target.value) {
      const filtered = teamCache?.filter((emp: any) =>
        emp.teamMember.name.toLowerCase().includes(e.target.value.toLowerCase())
      );
      return setTeam(filtered);
    }
    setTeam(teamCache);
  };

  return (
    <div className='project-container'>
      <p>Assigned Projects</p>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
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
              defaultValue={projectTeam}
              options={[{ value: projectTeam, label: projectTeam }]}
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
              dataSource={team}
            />
          </div>
        </>
      )}
      <hr />
    </div>
  );
};

export default Projects;
