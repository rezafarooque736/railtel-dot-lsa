import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(req) {
  try {
    const data = await req.json();

    await db.dotlsa.update({
      where: {
        id: data.id,
      },
      data: {
        service_id: data.service_id,
        network_ip_address: data.network_ip_address,
        other_ip_address: data.other_ip_address,
        email: data.email,
        phone_no: data.phone_no,
        address: data.address,
        state: data.state,
        routing_protocol: data.routing_protocol,
        bandwidth: data.bandwidth,
        network_carriage_service: data.network_carriage_service,
        date_since_network_ip_address: data.date_since_network_ip_address,
        date_since_other_ip_address: data.date_since_other_ip_address,
      },
    });

    return NextResponse.json(
      {
        type: "success",
        message: "Successfully updated",
        success: true,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        type: "error",
        message: error.message,
        success: false,
      },
      {
        status: 500, //server side error
      }
    );
  }
}
