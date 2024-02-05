import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req, { params: { state } }) {
  try {
    let dotLsaStateData;
    // when state is railtel returns all data, if any other location returns data based on state.
    if (state === "railtel") {
      dotLsaStateData = await db.dotlsa.findMany();
    } else {
      dotLsaStateData = await db.dotlsa.findMany({
        where: {
          state,
        },
      });
    }

    return NextResponse.json({
      type: "success",
      message: "Data fetched successfully",
      success: true,
      data: dotLsaStateData,
    });
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
