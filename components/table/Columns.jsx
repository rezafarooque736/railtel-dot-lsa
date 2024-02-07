"use client";

import { Button } from "@/components/ui/button";
import { CaretSortIcon } from "@radix-ui/react-icons";

import {
  routing_protocols,
  network_carriage_services,
  stateList,
} from "@/data";

import { DataTableColumnHeader } from "./data-table-column-header";

export const columns = [
  {
    accessorKey: "service_id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Service Id" />
    ),
    cell: ({ row }) => (
      <div className="font-medium text-center text-slate-900">
        {row.getValue("service_id")}
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "organisation_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Organisation Name" />
    ),
    cell: ({ row }) => (
      <div className="w-40 font-medium text-slate-900">
        {row.getValue("organisation_name")}
      </div>
    ),
  },
  {
    accessorKey: "network_ip_address",
    header: () => (
      <div className="text-xs text-center">
        Network IP addresses/block allotted/configured for routing
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex flex-wrap w-40 text-center text-slate-800">
        {row.getValue("network_ip_address")}
      </div>
    ),
  },
  {
    accessorKey: "other_ip_address",
    header: () => (
      <div className="text-xs text-center">
        Other IP addresses allotted, if any
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex flex-wrap w-40 text-center text-slate-800">
        {row.getValue("other_ip_address")}
      </div>
    ),
  },

  {
    accessorKey: "email",
    header: <div className="text-xs text-center">Email</div>,
    cell: ({ row }) => (
      <div className="text-slate-800">{row.getValue("email")}</div>
    ),
  },
  {
    accessorKey: "phone_no",
    header: () => <div className="text-xs text-center">Phone Number</div>,
    cell: ({ row }) => (
      <div className="w-max text-slate-800">{row.getValue("phone_no")}</div>
    ),
  },
  {
    accessorKey: "address",
    header: () => <div className="text-xs text-center">Address</div>,
    cell: ({ row }) => (
      <div className="w-40 text-slate-800">{row.getValue("address")}</div>
    ),
  },
  {
    accessorKey: "state",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="State" />
    ),
    cell: ({ row }) => {
      const state = stateList.find(
        (state) => state.value === row.getValue("state")
      );

      if (!state) {
        return null;
      }

      return (
        <div className="text-center w-28 text-slate-800">
          <span>{state.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },

  {
    accessorKey: "date_since_network_ip_address",
    header: () => (
      <div className="text-xs text-center">
        Date since network IP addresses allotted
      </div>
    ),
    cell: ({ row }) => {
      const formattedDate = new Intl.DateTimeFormat("en-IN", {
        year: "numeric",
        month: "short",
        day: "2-digit",
      }).format(new Date(row.getValue("date_since_network_ip_address")));

      return (
        <div className="text-sm text-center text-slate-800 w-max">
          {formattedDate.replaceAll("-", " ")}
        </div>
      );
    },
  },
  {
    accessorKey: "date_since_other_ip_address",
    header: () => (
      <div className="text-xs text-center">
        Date since other IP addresses allotted
      </div>
    ),
    cell: ({ row }) => {
      const dateValue = row.getValue("date_since_other_ip_address");

      if (!dateValue) {
        return null;
      }

      const formattedDate = new Intl.DateTimeFormat("en-IN", {
        year: "numeric",
        month: "short",
        day: "2-digit",
      }).format(new Date(dateValue));

      return (
        <div className="text-sm text-center text-slate-800 w-max">
          {formattedDate.replaceAll("-", " ")}
        </div>
      );
    },
  },

  {
    accessorKey: "routing_protocol",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Routing" />
    ),
    cell: ({ row }) => {
      const routing_protocol = routing_protocols.find(
        (routing_protocol) =>
          routing_protocol.value === row.getValue("routing_protocol")
      );

      if (!routing_protocol) {
        return null;
      }

      return (
        <div className="text-center text-slate-800">
          <span>{routing_protocol.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },

  {
    accessorKey: "bandwidth",
    header: () => <div className="text-xs text-center">Bandwidth</div>,
    cell: ({ row }) => (
      <div className="w-max text-slate-800">{row.getValue("bandwidth")}</div>
    ),
  },

  {
    accessorKey: "network_carriage_service",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Network Carriage Service" />
    ),
    cell: ({ row }) => {
      const network_carriage_service = network_carriage_services.find(
        (network_carriage_service) =>
          network_carriage_service.value ===
          row.getValue("network_carriage_service")
      );

      if (!network_carriage_service) {
        return null;
      }

      return (
        <div className="text-center text-slate-800">
          <span>{network_carriage_service.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
];
