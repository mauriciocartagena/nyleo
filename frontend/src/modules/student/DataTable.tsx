import React, { useState } from "react";
import { usePagination, useSortBy, useTable } from "react-table";
import XLSX from "xlsx";
import Papa from "papaparse";
import {
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Box,
  Flex,
  IconButton,
  Input,
  Spacer,
  Text,
  Center,
  Heading,
  Select,
  Stack,
  useColorModeValue,
  Button,
} from "@chakra-ui/react";
import { ArrowLeftIcon, ChevronLeftIcon, ChevronRightIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { useExportData } from "react-table-plugins";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { UserOptions } from "jspdf-autotable";
import { ButtonExport } from "../../ui/ButtonExport";
import { StudentCreateModal } from "./StudenCreateModal";

interface DataTableProps {
  columns: any;
  data: any;
}

interface JsPDFCustom extends jsPDF {
  autoTable: (options: UserOptions) => void;
}

export const DataTable: React.FC<DataTableProps> = ({ columns, data }) => {
  const [isOpen, setIsOpen] = useState(false);

  const getExportFileBlob = ({ columns, data, fileType, fileName }) => {
    if (fileType === "csv") {
      // CSV example
      const headerNames = columns.map((col) => col.exportValue);
      const csvString = Papa.unparse({ fields: headerNames, data });
      return new Blob([csvString], { type: "text/csv" });
    } else if (fileType === "xlsx") {
      // XLSX example

      const header = columns.map((c) => c.exportValue);
      const compatibleData = data.map((row) => {
        const obj = {};
        header.forEach((col, index) => {
          obj[col] = row[index];
        });
        return obj;
      });

      let wb = XLSX.utils.book_new();
      let ws1 = XLSX.utils.json_to_sheet(compatibleData, {
        header,
      });
      XLSX.utils.book_append_sheet(wb, ws1, "React Table Data");
      XLSX.writeFile(wb, `${fileName}.xlsx`);

      return false;
    }
    // PDF example
    if (fileType === "pdf") {
      const headerNames = columns.map((column) => column.exportValue);

      const doc = new jsPDF() as JsPDFCustom;
      doc.autoTable({
        head: [headerNames],
        body: data,
        margin: { top: 20 },
        styles: {
          valign: "middle",
          halign: "center",
        },
      });
      doc.save(`${fileName}.pdf`);

      return false;
    }

    return false;
  };
  const tableInstance = useTable(
    {
      columns: columns,
      data: data,
      getExportFileBlob,
      initialState: {
        hiddenColumns: ["id_persona"],
      },
    },
    useSortBy,
    usePagination,
    useExportData
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    setPageSize,
    nextPage,
    previousPage,
    exportData,
    state: { pageIndex, pageSize },
  } = tableInstance;
  return (
    <>
      <StudentCreateModal open={isOpen} onRequestClose={() => setIsOpen(false)} />
      <Center p="4">
        <Heading fontStyle="normal" fontSize="4xl" fontWeight="extrabold">
          Lista de Estudiantes
        </Heading>
      </Center>

      <Box shadow="md" rounded="lg" overflowY="auto" overflowX="auto">
        <Box p={3} overflowY="auto" overflowX="auto">
          <ButtonExport formatName="csv" exportData={exportData} allData={true} name="Exportar todo en CSV" />
          <ButtonExport formatName="csv" exportData={exportData} allData={false} name="Exportar vista actual como CSV" />
          <ButtonExport formatName="xlsx" exportData={exportData} allData={true} name="Exportar todo en XLSX" />
          <ButtonExport formatName="xlsx" exportData={exportData} allData={false} name="Exportar vista actual como XLSX" />
          <ButtonExport formatName="pdf" exportData={exportData} allData={true} name="Exportar todo en PDF" />
          <ButtonExport formatName="pdf" exportData={exportData} allData={false} name="Exportar vista actual como PDF" />
        </Box>

        <Box alignContent="center" pb={3}>
          <Flex justifyContent="flex-end">
            <Button
              onClick={() => {
                setIsOpen(true);
              }}
            >
              Nuevo Estudiante
            </Button>
          </Flex>
        </Box>
        <Table {...getTableProps()} colorScheme="blackAlpha" as="table" bg={useColorModeValue("white", "gray.700")}>
          <Thead
            as="thead"
            p="0"
            // position="sticky"
            zIndex="1"
            top="0px"
            style={{ overflow: "scroll" }}
            bg={useColorModeValue("gray.200", "teal.500")}
          >
            {headerGroups.map((headerGroup) => (
              <Tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <Th textAlign="center" textColor={useColorModeValue("gray.900", "gray.100")} p="1em" className="th1" key={columns} {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <Tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>;
                  })}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Box>

      <Flex
        // borderTop="5px solid" borderColor="gray.200"
        justifyContent="flex-end"
        pt={4}
      >
        <Spacer />

        <Flex alignContent="center" justifyContent="flex-end">
          <IconButton
            mr="4"
            aria-label="Previous page"
            _focus={{ boxShadow: "" }}
            _hover={{ backgroundColor: "" }}
            _active={{ backgroundColor: "" }}
            icon={<ArrowLeftIcon w={2} h={2} />}
            disabled={!canPreviousPage}
            onClick={() => gotoPage(0)}
            colorScheme="teal"
          />

          <IconButton
            mr="4"
            aria-label="Previous page"
            _focus={{ boxShadow: "" }}
            _hover={{ backgroundColor: "" }}
            _active={{ backgroundColor: "" }}
            // fontSize="30px"
            icon={<ChevronLeftIcon />}
            disabled={!canPreviousPage}
            onClick={() => previousPage()}
            colorScheme="teal"
          />
          <Text m="0" alignSelf="center" mr="4">
            {pageIndex + 1} - {pageOptions.length}{" "}
          </Text>
          <IconButton
            mr="4"
            aria-label="Previous page"
            _focus={{ boxShadow: "" }}
            _hover={{ backgroundColor: "" }}
            _active={{ backgroundColor: "" }}
            // fontSize="30px"
            icon={<ChevronRightIcon />}
            disabled={!canNextPage}
            onClick={() => nextPage()}
            colorScheme="teal"
          />
          <IconButton
            mr="4"
            aria-label="Previous page"
            _focus={{ boxShadow: "" }}
            _hover={{ backgroundColor: "" }}
            _active={{ backgroundColor: "" }}
            fontSize="15px"
            icon={<ArrowRightIcon w={2} h={2} />}
            disabled={!canNextPage}
            onClick={() => gotoPage(pageCount - 1)}
            colorScheme="teal"
          />
          <Text mr="4" alignSelf="center" borderRightColor="" defaultValue={pageSize + 1} borderColor="gray.300" fontWeight="bold" fontSize="sm" whiteSpace="nowrap">
            Registros por página
          </Text>
          <Input
            mx="5px"
            alignSelf="center"
            // borderColor="gray.600"
            onChange={(e) => {
              let pageNumber = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(pageNumber);
            }}
            w="10%"
            size="sm"
            colorScheme="teal"
          />
          <Stack spacing={3}>
            <Select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
              }}
            >
              {[10, 20, 30, 40, 50].map((page) => (
                <option key={page} value={page}>
                  Show {page}
                </option>
              ))}
            </Select>
          </Stack>
        </Flex>
      </Flex>
    </>
  );
};
