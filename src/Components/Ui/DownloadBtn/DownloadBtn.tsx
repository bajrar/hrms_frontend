import * as XLSX from 'xlsx';
import { dailyReportsHeader, footer, monthlyReportsHeader } from '../../../utils/Constants';
import { columnWidths } from '../../../utils/sheets';

const DownloadBtn = ({ report, date, type }: any) => {
  const addRowsToWorksheet = (rows: any[], worksheet: any) => {
    rows.forEach((row: any) => {
      XLSX.utils.sheet_add_aoa(worksheet, [row.data], row.opts);
    });
  };

  const downloadExcel = (report: any) => {
    const workbook = XLSX.utils.book_new();
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet([]);
    const [year, month] = date?.split('/');
    const mappedReports =
      type === 'Daily Reports'
        ? report.map(({ key, view, ...rest }: any) => rest)
        : report.map((item: any, index: any) => ({ sn: index + 1, ...item }));
    const header = type === 'Daily Reports' ? dailyReportsHeader(year, month) : monthlyReportsHeader(year, month);

    /* Add header & footer to sheets */
    const rowsToAdd = [...header, ...footer];
    addRowsToWorksheet(rowsToAdd, worksheet);

    // Set column widths in the worksheet
    const calcColumnWidth = columnWidths(mappedReports);
    worksheet['!cols'] = Object.keys(calcColumnWidth).map((key) => ({
      wch: calcColumnWidth[key],
    }));
    //Starting in the second row to avoid overriding and skipping headers
    XLSX.utils.sheet_add_json(worksheet, mappedReports, { origin: 'A7', skipHeader: true });
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, 'AttendanceReport.xlsx');
  };

  return (
    <button
      onClick={() => downloadExcel(report)}
      className="d-flex download-btn justify-content-between align-items-center"
    >
      Download .xslx file{' '}
      <div className="dowload-icon">
        <img src="/images/download-icon.png" alt="" />
      </div>
    </button>
  );
};

export default DownloadBtn;
