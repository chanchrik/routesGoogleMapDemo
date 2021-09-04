import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

import fileStyles from "./ExportFile.module.css";

const ExportFile = (props) => {
  const exportToCSV = () => {
    debugger;
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";
    const ws = XLSX.utils.json_to_sheet(props.fileData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, props.fileName + fileExtension);
  };
  return (
    <div>
      <button className={fileStyles.exportBtn} onClick={exportToCSV}>
        Export Data
      </button>
    </div>
  );
};

export default ExportFile;
