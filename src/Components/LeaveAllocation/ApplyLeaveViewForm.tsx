import { Button } from 'antd';

const ApplyLeaveViewForm = ({ leaveRow, UpdateLeaveStatus }: any) => {
  const Heading = [
    {
      title: 'EMPLOYMENT NAME',
      value: leaveRow?.employeeName,
    },
    {
      title: 'LEAVE TYPE',
      value: leaveRow?.leaveType,
    },
    {
      title: 'DATE',
      value: `${leaveRow?.from}-${leaveRow?.to}`,
    },
    {
      title: 'MANAGER',
      value: leaveRow?.approvedBy,
    },
    {
      title: 'STATUS',
      value: leaveRow?.status,
    },
    {
      title: 'REASON FOR LEAVE',
      value: leaveRow?.reason,
    },
  ];

  return (
    <>
      <table className="application-table w-100">
        <tbody>
          {Heading.map((item, index) => (
            <tr className="application-table-row" key={index}>
              <th className="application-table-head fs-5" style={{ width: '30%' }}>
                {item.title}
              </th>
              <td className="application-table-body fs-5" style={{ color: 'black' }}>
                {item.value}
              </td>
            </tr>
          ))}

          <tr className="application-table-row">
            <th className="application-table-head fs-5">REJECT WITH NOTE:</th>
            <td className="application-table-body">
              <textarea
                name="rejectNote"
                id="rejectNote"
                rows={4}
                className="rounded-4 p-3 fs-5"
                style={{ width: '100%' }}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div className="d-flex gap-5 justify-content-end  ">
        <Button
          style={{
            background: '#BB2124',
          }}
          size="large"
          onClick={() => UpdateLeaveStatus({ status: 'rejected' })}
        >
          Reject
        </Button>
        <Button
          style={{
            background: '#023C87',
          }}
          size="large"
          onClick={() => UpdateLeaveStatus({ status: 'accepted' })}
        >
          Accept
        </Button>
      </div>
    </>
  );
};

export default ApplyLeaveViewForm;
