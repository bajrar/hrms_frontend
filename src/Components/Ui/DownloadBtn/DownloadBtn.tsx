import * as XLSX from 'xlsx';

const DownloadBtn = ({ report, reportName }: any) => {
  const downloadExcel = (report: any) => {
    const worksheet = XLSX.utils.json_to_sheet(report);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, 'AttendanceReport.xlsx');
  };
  return (
    <button
      onClick={() => downloadExcel(report)}
      className='d-flex download-btn justify-content-between align-items-center'
    >
      Download .xslx file{' '}
      <div className='dowload-icon'>
        <img src='/images/download-icon.png' alt='' />
      </div>
    </button>
  );
};

export default DownloadBtn;
