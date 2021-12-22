import React from "react";
import { usePagination, useSortBy, useTable } from "react-table";
import { Table, Tbody, Td, Th, Thead, Tr, Box, Flex, IconButton, Input, Spacer, Text } from "@chakra-ui/react";
import { ArrowLeftIcon, ChevronLeftIcon, ChevronRightIcon, ArrowRightIcon } from "@chakra-ui/icons";

interface DataTableProps {
  columns: any;
  data: any;
}

export const DataTable: React.FC<DataTableProps> = ({ columns, data }) => {
  const tableInstance = useTable(
    {
      columns: columns,
      data: data,
    },
    useSortBy,
    usePagination
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
    state: { pageIndex, pageSize },
  } = tableInstance;
  return (
    <>
      <Box
        overflowY="auto"
        css={{
          "&::-webkit-scrollbar": {
            width: "4px",
          },
          "&::-webkit-scrollbar-track": {
            width: "6px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "rgba(0,0,0,.2)",
            borderRadius: "24px",
          },
        }}
      >
        <Table {...getTableProps()} colorScheme="blackAlpha" ariant="striped" bg="gray.300">
          <Thead p="0" position="sticky" zIndex="1" top="0px" style={{ overflow: "scroll" }} bg="gray.400">
            {headerGroups.map((headerGroup) => (
              <Tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <Th borderColor="gray.300" p="1em" className="th1" key={columns} color={"gray.800"} {...column.getHeaderProps()}>
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

      <Flex borderTop="5px solid" borderColor="gray.200" justifyContent="flex-end">
        <Spacer />
        <Flex alignContent="center">
          <IconButton
            aria-label="Previous page"
            _focus={{ boxShadow: "" }}
            _hover={{ backgroundColor: "" }}
            _active={{ backgroundColor: "" }}
            color="gray.800"
            bg="white"
            fontSize="15px"
            icon={<ArrowLeftIcon />}
            disabled={!canPreviousPage}
            onClick={() => gotoPage(0)}
          />
          <IconButton
            aria-label="Previous page"
            _focus={{ boxShadow: "" }}
            _hover={{ backgroundColor: "" }}
            _active={{ backgroundColor: "" }}
            color="gray.800"
            bg="white"
            fontSize="30px"
            icon={<ChevronLeftIcon />}
            disabled={!canPreviousPage}
            onClick={() => previousPage()}
          />
          <Text m="0" alignSelf="center">
            {pageIndex + 1} - {pageOptions.length}{" "}
          </Text>
          <IconButton
            aria-label="Previous page"
            _focus={{ boxShadow: "" }}
            _hover={{ backgroundColor: "" }}
            _active={{ backgroundColor: "" }}
            color="gray.800"
            bg="white"
            fontSize="30px"
            icon={<ChevronRightIcon />}
            disabled={!canNextPage}
            onClick={() => nextPage()}
          />
          <IconButton
            aria-label="Previous page"
            _focus={{ boxShadow: "" }}
            _hover={{ backgroundColor: "" }}
            _active={{ backgroundColor: "" }}
            color="gray.800"
            bg="white"
            fontSize="15px"
            icon={<ArrowRightIcon />}
            disabled={!canNextPage}
            onClick={() => gotoPage(pageCount - 1)}
          />
          <Text m="0" alignSelf="center" borderRightColor="" defaultValue={pageSize + 1} borderColor="gray.300" fontWeight="bold" fontSize="sm" whiteSpace="nowrap">
            Go to page
          </Text>
          <Input
            mx="5px"
            alignSelf="center"
            borderColor="gray.600"
            onChange={(e) => {
              let pageNumber = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(pageNumber);
            }}
            w="10%"
            size="sm"
          />
          <select
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
          </select>
        </Flex>
      </Flex>
    </>
  );
};
