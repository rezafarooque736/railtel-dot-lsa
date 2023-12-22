import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req, { params: { state } }) {
  try {
    const dotLsaSateData = await db.dotlsa.findMany({
      where: {
        state,
      },
    });

    return NextResponse.json({
      type: "success",
      message: "Data fetched successfully",
      success: true,
      data: dotLsaSateData,
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
