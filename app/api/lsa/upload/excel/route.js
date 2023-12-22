import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import * as XLSX from "xlsx";
import { findUniqueAndNonUniqueServiceIds } from ".";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file)
      return NextResponse.json(
        { success: false, error: "No file uploaded." },
        { status: 400 }
      );

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Use the xlsx library to read the Excel file
    const workbook = XLSX.read(buffer, { type: "buffer" });

    // Assuming the first sheet is the one you want to read
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    // Convert the sheet data to JSON
    const jsonData = XLSX.utils.sheet_to_json(sheet);

    // get all data from database
    const allDotLsaFromDb = await db.dotlsa.findMany();

    // when non unique service id from user in excel sheet comes
    const { nonUniqueValues: nonUniqueServiceIdsFromUser } =
      findUniqueAndNonUniqueServiceIds(jsonData, "service_id");

    if (nonUniqueServiceIdsFromUser.length > 0) {
      return NextResponse.json({
        type: "error",
        message:
          "These service ids are not unique in your sheet: " +
          nonUniqueServiceIdsFromUser.join(", "),
        success: false,
      });
    }

    // service id already present in database. but again send by user in excel sheet then
    const { uniqueArrayOfObjects, nonUniqueValues: nonUniqueServiceIdsFromDB } =
      findUniqueAndNonUniqueServiceIds(
        jsonData.concat(allDotLsaFromDb),
        "service_id"
      );

    if (uniqueArrayOfObjects.length > 0) {
      for (const item of uniqueArrayOfObjects) {
        const dataObject = {
          organisation_name: item.organisation_name,
          network_ip_address: item.network_ip_address,
          date_since_network_ip_address: new Date(
            `${item.date_since_network_ip_address}`
          ),
          bandwidth: item.bandwidth.trim(),
          email: item.email,
          phone_no: item.phone_no.toString(),
          address: item.address,
          state: item.state,
        };

        if (item.service_id) {
          dataObject.service_id = item.service_id.toString();
        }

        if (item.other_ip_address) {
          dataObject.other_ip_address = item.other_ip_address;
        }

        if (item.date_since_other_ip_address) {
          dataObject.date_since_other_ip_address = new Date(
            `${item.date_since_other_ip_address}`
          );
        }

        if (item.type) {
          dataObject.type = item.type;
        }

        if (item.routing_protocol) {
          dataObject.routing_protocol = item.routing_protocol;
        }

        await db.dotlsa.create({
          data: dataObject,
        });
      }
    }

    if (nonUniqueServiceIdsFromDB.length > 0) {
      return NextResponse.json({
        type: "warning",
        message:
          "These service ids already in database, you will have to update its data manually: " +
          nonUniqueServiceIdsFromDB.join(", "),
        success: false,
      });
    }

    let resData;
    for (const item of jsonData) {
      const dataObject = {
        organisation_name: item.organisation_name,
        network_ip_address: item.network_ip_address,
        date_since_network_ip_address: new Date(
          `${item.date_since_network_ip_address}`
        ),
        bandwidth: item.bandwidth.trim(),
        email: item.email,
        phone_no: item.phone_no.toString(),
        address: item.address,
        state: item.state,
      };

      if (item.service_id) {
        dataObject.service_id = item.service_id.toString();
      }

      if (item.other_ip_address) {
        dataObject.other_ip_address = item.other_ip_address;
      }

      if (item.date_since_other_ip_address) {
        dataObject.date_since_other_ip_address = new Date(
          `${item.date_since_other_ip_address}`
        );
      }

      if (item.type) {
        dataObject.type = item.type;
      }

      if (item.routing_protocol) {
        dataObject.routing_protocol = item.routing_protocol;
      }

      resData = await db.dotlsa.create({
        data: dataObject,
      });
    }

    return NextResponse.json(
      {
        type: "success",
        notUnique: resData,
        message: "New data created successfully",
        success: true,
      },
      {
        status: 201, //data created successfully
      }
    );
  } catch (error) {
    console.error("error", error.message);
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
