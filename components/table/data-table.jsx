"use client";

import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useState } from "react";
import UpdateModal from "./update-modal";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { DataTableToolbar } from "./data-table-toolbar";
import { DataTablePagination } from "./data-table-pagination";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";

export function DataTable({ columns, data, tableHeaderText }) {
  const [selectedRow, setSelectedRow] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [globalFilter, setGlobalFilter] = useState("");

  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState({});
  const [columnFilters, setColumnFilters] = useState([]);
  const [sorting, setSorting] = useState([]);

  const { data: session } = useSession();

  const handleUpdateButtonClick = (row) => {
    setOpenModal(true);
    setSelectedRow(row);
  };

  const closeUpdateModal = () => {
    setOpenModal(false);
    setSelectedRow(null); // Reset selectedRow when the modal is closed
  };

  const table = useReactTable({
    data,
    columns:
      session?.user?.role === "admin"
        ? [
            ...columns,
            {
              accessorKey: "update",
              header: () => <div className="text-xs text-center">Action</div>,
              cell: ({ row }) => (
                <div
                  className="border cursor-pointer hover:text-primary w-max"
                  onClick={() => handleUpdateButtonClick(row.original)}
                >
                  <Pencil2Icon className="w-4 h-4" />
                </div>
              ),
            },
          ]
        : [...columns],
    state: {
      globalFilter,
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    onGlobalFilterChange: setGlobalFilter,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between py-4">
        <DataTableToolbar
          table={table}
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
        <h1
          className={cn("font-semibold text-slate-600", {
            hidden: session?.user?.role !== "admin",
          })}
        >
          {tableHeaderText}
        </h1>
      </div>

      <div className="border rounded-md">
        {/* Conditionally render UpdateModal */}
        {selectedRow && (
          <UpdateModal
            open={openModal}
            closeUpdateModal={closeUpdateModal} // Close the modal and reset selectedRow
            selectedRow={selectedRow}
          />
        )}
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
