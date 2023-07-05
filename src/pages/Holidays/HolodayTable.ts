import { ColumnsType } from "antd/es/table";
import { IHoliday } from "../../interface/Holiday/Holiday";

export const holidayColumns: ColumnsType<IHoliday> = [
    {
      title: 'HOLIDAY NAME',
      dataIndex: 'holidayName',
      key: 'holidayName',
    },
    {
      title: 'DATE',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'APPLICABLE TO',
      dataIndex: 'applicableTo',
      key: 'applicableTo',
    },
    {
      title: 'NOTES',
      dataIndex: 'notes',
      key: 'notes',
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
      key: 'status',
    },
  ];
