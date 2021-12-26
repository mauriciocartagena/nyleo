import React from "react";
import { Button } from "@chakra-ui/react";
interface ButtonExportProps {
  formatName: string;
  exportData: any;
  name: string;
  allData: boolean;
}

export const ButtonExport: React.FC<ButtonExportProps> = ({ formatName, exportData, name, allData }) => {
  return (
    <Button
      m={2}
      onClick={() => {
        exportData(formatName, allData);
      }}
    >
      {name}
    </Button>
  );
};
