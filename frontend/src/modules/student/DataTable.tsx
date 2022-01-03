import React, { useState } from "react";
import { usePagination, useSortBy, useTable } from "react-table";
import XLSX from "xlsx";
import Papa from "papaparse";
import { IoIosAddCircle } from "react-icons/io";

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
} from "@chakra-ui/react";
import {
  ArrowLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowRightIcon,
} from "@chakra-ui/icons";
import { useExportData } from "react-table-plugins";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { UserOptions } from "jspdf-autotable";
import { ButtonExport } from "../../ui/ButtonExport";
import StudentCreateModal from "./StudentCreateModal";
import { Button } from "../../ui/Button";
import { GrDocumentCsv, GrDocumentExcel, GrDocumentPdf } from "../../icons";
// GrDocumentCsv
interface DataTableProps {
  columns: any;
  data: any;
}

interface JsPDFCustom extends jsPDF {
  autoTable: (options: UserOptions) => void;
}

export const DataTable: React.FC<DataTableProps> = ({ columns, data }) => {
  const [open, setOpen] = useState(false);
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
      <Center p="4">
        <Heading fontStyle="normal" fontSize="2.6rem" fontWeight="extrabold">
          Lista de Estudiantes
        </Heading>
      </Center>

      <Box rounded="lg" overflowY="auto" overflowX="auto">
        <Box p={3} overflowY="auto" overflowX="auto">
          <ButtonExport
            formatName="csv"
            exportData={exportData}
            allData={true}
            name="Exportar todo en CSV"
            icon={
              <GrDocumentCsv
                width={20}
                height={20}
                color={useColorModeValue("#000", "#fff")}
              />
            }
          />
          <ButtonExport
            formatName="csv"
            exportData={exportData}
            allData={false}
            name="Exportar vista actual como CSV"
            icon={
              <GrDocumentCsv
                width={20}
                height={20}
                color={useColorModeValue("#000", "#fff")}
              />
            }
          />
          <ButtonExport
            formatName="xlsx"
            exportData={exportData}
            allData={true}
            name="Exportar todo en XLSX"
            icon={
              <GrDocumentExcel
                width={20}
                height={20}
                color={useColorModeValue("#000", "#fff")}
              />
            }
          />
          <ButtonExport
            formatName="xlsx"
            exportData={exportData}
            allData={false}
            name="Exportar vista actual como XLSX"
            icon={
              <GrDocumentExcel
                width={20}
                height={20}
                color={useColorModeValue("#000", "#fff")}
              />
            }
          />
          <ButtonExport
            formatName="pdf"
            exportData={exportData}
            allData={true}
            name="Exportar todo en PDF"
            icon={
              <GrDocumentPdf
                width={20}
                height={20}
                color={useColorModeValue("#000", "#fff")}
              />
            }
          />
          <ButtonExport
            formatName="pdf"
            exportData={exportData}
            allData={false}
            name="Exportar vista actual como PDF"
            icon={
              <GrDocumentPdf
                width={20}
                height={20}
                color={useColorModeValue("#000", "#fff")}
              />
            }
          />
        </Box>

        <Box alignContent="center" pb={3}>
          <Flex justifyContent="flex-end">
            <Button
              onClick={() => {
                setOpen(true);
              }}
              style={{
                backgroundColor: "#2374e1",
                fontSize: ".9375rem",
                padding: "0.5rem 1rem",
              }}
              icon={<IoIosAddCircle size={20} />}
              name="Nuevo Estudiante"
            >
              Nuevo Estudiante
            </Button>
          </Flex>
        </Box>
        <Table
          {...getTableProps()}
          colorScheme="blackAlpha"
          as="table"
          bg={useColorModeValue("white", "gray.700")}
        >
          <Thead
            as="thead"
            p="0"
            // position="sticky"
            zIndex="1"
            top="0px"
            style={{ overflow: "scroll" }}
            bg={useColorModeValue("gray.200", "#242526")}
          >
            {headerGroups.map((headerGroup) => (
              <Tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <Th
                    textAlign="center"
                    textColor={useColorModeValue("gray.900", "#b0b3b8")}
                    p="1em"
                    className="th1"
                    key={columns}
                    {...column.getHeaderProps()}
                  >
                    {column.render("Header")}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody
            {...getTableBodyProps()}
            bg={useColorModeValue("gray.50", "#2c3138")}
          >
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <Tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
                    );
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
          <Text
            mr="4"
            alignSelf="center"
            borderRightColor=""
            defaultValue={pageSize + 1}
            borderColor="gray.300"
            fontWeight="bold"
            fontSize="sm"
            whiteSpace="nowrap"
          >
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
      {open ? (
        <StudentCreateModal pageProps onRequestClose={() => setOpen(false)} />
      ) : null}
    </>
  );
};
