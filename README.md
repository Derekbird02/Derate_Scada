import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const ExportToExcel = ({ data }) => {
  // Group the emcodes by platform
  const groupDataByPlatform = (data) => {
    const groupedData = {};

    data.forEach((item) => {
      const { emcode, platform } = item;
      if (!groupedData[platform]) {
        groupedData[platform] = [];
      }
      groupedData[platform].push(emcode);
    });

    // Convert grouped data into an array of rows where each platform is a column
    const platforms = Object.keys(groupedData);
    const maxLength = Math.max(...Object.values(groupedData).map(arr => arr.length));
    
    // Create rows with emcodes under respective platforms
    const rows = Array.from({ length: maxLength }, (_, index) => {
      return platforms.map((platform) => groupedData[platform][index] || "");
    });

    // Add platform names as the header row
    return [platforms, ...rows];
  };

  const exportToExcel = () => {
    const groupedData = groupDataByPlatform(data);

    // Create a new workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(groupedData);

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // Generate the Excel file
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    // Save the Excel file
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, 'platform_emcodes.xlsx');
  };

  return (
    <button
      onClick={exportToExcel}
      className="px-4 py-2 bg-green-500 text-white rounded-md"
    >
      Export to Excel
    </button>
  );
};

export default ExportToExcel;