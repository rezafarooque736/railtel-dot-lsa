"use client";

import { Cross2Icon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import {
  network_carriage_services,
  routing_protocols,
  stateList,
} from "@/data";

export function DataTableToolbar({ table, globalFilter, setGlobalFilter }) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center flex-1 space-x-2">
        <Input
          placeholder="Filter table..."
          value={globalFilter ?? ""}
          onChange={(event) => setGlobalFilter(event.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("state") && (
          <DataTableFacetedFilter
            column={table.getColumn("state")}
            title="States"
            options={stateList}
          />
        )}
        {table.getColumn("routing_protocol") && (
          <DataTableFacetedFilter
            column={table.getColumn("routing_protocol")}
            title="Routing Protocol"
            options={routing_protocols}
          />
        )}
        {table.getColumn("network_carriage_service") && (
          <DataTableFacetedFilter
            column={table.getColumn("network_carriage_service")}
            title="Network Carriage Service"
            options={network_carriage_services}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
}
