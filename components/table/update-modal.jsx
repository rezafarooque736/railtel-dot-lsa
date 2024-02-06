"use client";

import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import DatePickerComponent from "../helpers/date-picker-component";
import { updateLSAData } from "@/services";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import {
  network_carriage_services,
  routing_protocols,
  stateList,
} from "@/data";

export default function UpdateModal({
  open,
  closeUpdateModal,
  selectedRow: row,
}) {
  const router = useRouter();
  const [date_since_network_ip_address, setDate_since_network_ip_address] =
    useState(null);
  const [date_since_other_ip_address, setDate_since_other_ip_address] =
    useState(null);

  useEffect(() => {
    row?.date_since_network_ip_address &&
      setDate_since_network_ip_address(
        new Date(row?.date_since_network_ip_address)
      );

    row?.date_since_other_ip_address &&
      setDate_since_other_ip_address(
        new Date(row?.date_since_other_ip_address)
      );
  }, [row?.date_since_network_ip_address, row?.date_since_other_ip_address]);

  const form = useForm({
    defaultValues: {
      service_id: row.service_id,
      network_ip_address: row.network_ip_address,
      other_ip_address: row.other_ip_address ?? "",
      email: row.email,
      phone_no: row.phone_no,
      address: row.address,
      state: row.state,
      routing_protocol: row.routing_protocol,
      bandwidth: row.bandwidth,
      network_carriage_service: row.network_carriage_service,
    },
  });

  const handleUpdateData = async (values) => {
    values.date_since_network_ip_address = date_since_network_ip_address;
    values.date_since_other_ip_address = date_since_other_ip_address;
    values.id = row.id;
    await updateLSAData(values);

    closeUpdateModal();
    router.refresh();
    toast.success(`Service id ${values.service_id} updated Successfully`);
  };

  return (
    <Dialog open={open} onOpenChange={closeUpdateModal}>
      <DialogContent className="w-full pb-3 overflow-y-auto h-[90vh]">
        <DialogHeader>
          <DialogTitle>Update {row?.organisation_name}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleUpdateData)}
              className="w-full"
            >
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="service_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Service Id</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your Service Id" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="network_ip_address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Network IP addresses/block allotted/configured for
                        routing
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Network IP address"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="other_ip_address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Other IP addresses allotted, if any</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Other IP address"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Email Address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone_no"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Phone Number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>address</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select State" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {stateList.map((state) => (
                            <SelectItem key={state.value} value={state.value}>
                              {state.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div>
                  <span className="text-sm font-medium text-slate-900">
                    Date since network IP addresses allotted
                  </span>
                  <DatePickerComponent
                    date={date_since_network_ip_address}
                    setDate={setDate_since_network_ip_address}
                  />
                </div>

                <div>
                  <span className="text-sm font-medium text-slate-900">
                    Date since other IP addresses allotted
                  </span>
                  <DatePickerComponent
                    date={date_since_other_ip_address}
                    setDate={setDate_since_other_ip_address}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="routing_protocol"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Routing Protocol</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Routing Protocol" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {routing_protocols.map((r_protocols) => (
                            <SelectItem
                              key={r_protocols.value}
                              value={r_protocols.value}
                            >
                              {r_protocols.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bandwidth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bandwidth</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Bandwidth" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="network_carriage_service"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Network Carriage Service</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Network Carriage Service" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {network_carriage_services.map((c_service) => (
                            <SelectItem
                              key={c_service.value}
                              value={c_service.value}
                            >
                              {c_service.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                className="w-full mt-6 hover:bg-primary-hover"
                type="submit"
              >
                Update
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
