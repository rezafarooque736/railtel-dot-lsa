"use client";

import { Button } from "@/components/ui/button";
import { CaretSortIcon } from "@radix-ui/react-icons";

export const lsaColumns = [
  {
    accessorKey: "service_id",
    header: () => <div className="text-center">Servide Id</div>,
    cell: ({ row }) => (
      <div className="font-medium text-center text-slate-900">
        {row.getValue("service_id")}
      </div>
    ),
  },
  {
    accessorKey: "organisation_name",
    header: "Organisation Name",
    cell: ({ row }) => (
      <div className="w-40 font-medium text-slate-900">
        {row.getValue("organisation_name")}
      </div>
    ),
  },
  {
    accessorKey: "network_ip_address",
    header: () => (
      <div className="text-center">
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
      <div className="text-center">Other IP addresses allotted, if any</div>
    ),
    cell: ({ row }) => (
      <div className="flex flex-wrap w-40 text-center text-slate-800">
        {row.getValue("other_ip_address")}
      </div>
    ),
  },

  {
    accessorKey: "email",
    header: <div className="text-center">Email</div>,
    cell: ({ row }) => (
      <div className="text-slate-800">{row.getValue("email")}</div>
    ),
  },
  {
    accessorKey: "phone_no",
    header: () => <div className="text-center">Phone Number</div>,
    cell: ({ row }) => (
      <div className="w-max text-slate-800">{row.getValue("phone_no")}</div>
    ),
  },
  {
    accessorKey: "address",
    header: () => <div className="text-center">Address</div>,
    cell: ({ row }) => (
      <div className="w-40 text-slate-800">{row.getValue("address")}</div>
    ),
  },
  {
    accessorKey: "state",
    header: () => <div className="text-center">State</div>,
    cell: ({ row }) => (
      <div className="text-center w-28 text-slate-800">
        {row.getValue("state")}
      </div>
    ),
  },

  {
    accessorKey: "date_since_network_ip_address",
    header: () => (
      <div className="text-center">
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
          {formattedDate}
        </div>
      );
    },
  },
  {
    accessorKey: "date_since_other_ip_address",
    header: () => (
      <div className="text-center">Date since other IP addresses allotted</div>
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
          {formattedDate}
        </div>
      );
    },
  },

  {
    accessorKey: "routing_protocol",
    header: () => <div className="text-center">Routing Protocol</div>,
    cell: ({ row }) => (
      <div className="text-center text-slate-800">
        {row.getValue("routing_protocol")}
      </div>
    ),
  },
  {
    accessorKey: "bandwidth",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Bandwidth
          <CaretSortIcon className="w-5 h-5 ml-2 opacity-80 shrink-0" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-center text-slate-800">
        {row.getValue("bandwidth")}
      </div>
    ),
  },
  {
    accessorKey: "type",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Type
          <CaretSortIcon className="w-4 h-4 ml-2 opacity-70 shrink-0" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-center lowercase text-slate-800">
        {row.getValue("type")}
      </div>
    ),
  },
];
