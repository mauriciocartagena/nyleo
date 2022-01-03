import React, { ReactNode } from "react";
import { Button, useColorModeValue } from "@chakra-ui/react";
interface ButtonExportProps {
  formatName: string;
  exportData: any;
  name: string;
  allData: boolean;
  icon?: ReactNode;
  loading?: boolean;
}

export const ButtonExport: React.FC<ButtonExportProps> = ({
  formatName,
  exportData,
  name,
  allData,
  icon,
  loading,
}) => {
  return (
    <Button
      bg={useColorModeValue("#e4e6eb", "RGB(255, 255, 255,0.1)")}
      m={2}
      onClick={() => {
        exportData(formatName, allData);
      }}
    >
      <span className={loading ? "opacity-0" : `flex items-center`}>
        {icon ? <span className={`mr-2 items-center`}>{icon}</span> : null}
        {name}
      </span>
    </Button>
  );
};
