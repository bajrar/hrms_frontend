// Calculate column widths based on the maximum number of characters in each column
export const columnWidths = (mappedReports: any) =>
  mappedReports.reduce((acc: any, row: any) => {
    Object.keys(row).forEach((key) => {
      const columnLength = String(row[key]).length < 10 ? 10 : String(row[key]).length;
      if (!acc[key] || acc[key] < columnLength) {
        acc[key] = columnLength;
      }
    });
    return acc;
  }, {});
