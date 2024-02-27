import prisma from "@/app/utils/connect";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";

// Create a new task
//@ts-ignore
export const POST = async (req: Request) => {
  //@ts-ignore
  try {
    //@ts-ignore
    const { userId } = getAuth(req);
    //@ts-ignore
    if (!userId) {
      //@ts-ignore
      return new NextResponse("Unauthorized", {
        //@ts-ignore
        status: 401,
      });
    }
    //@ts-ignore
    const { title, description, date, isCompleted, isImportant } =
      //@ts-ignore
      await req.json();
    //@ts-ignore
    if (!title || !description || !date) {
      //@ts-ignore
      return new NextResponse("All fields are required", {
        status: 400,
      });
    }
    //@ts-ignore
    const task = await prisma.task.create({
      data: {
        title,
        description,
        date,
        isCompleted,
        isImportant,
        userId,
      },
    });
    console.log(task);
    //@ts-ignore
    return new NextResponse(JSON.stringify(task), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    //@ts-ignore
    return new NextResponse("Something went wrong when created task", {
      status: 500,
    });
  }
};

// Get Tasks

export const GET = async (req: Request) => {
  try {
    //@ts-ignore
    const { userId } = getAuth(req);
    if (!userId) {
      return new NextResponse("Unauthorized", {
        status: 401,
      });
    }
    const tasks = await prisma.task.findMany({});
    return new NextResponse(JSON.stringify(tasks), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse("Something went wrong when getting task", {
      status: 500,
    });
  }
};
