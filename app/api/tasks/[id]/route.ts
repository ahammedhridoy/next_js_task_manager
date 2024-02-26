import prisma from "@/app/utils/connect";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// Update Task
export const PUT = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const { userId } = auth();
    const { title, description, date, isCompleted, isImportant } =
      await req.json();
    const { id } = params;
    if (!userId) {
      return new NextResponse("Unauthorized", {
        status: 401,
      });
    }
    const task = await prisma.task.update({
      where: {
        id: id,
      },
      data: {
        title,
        description,
        date,
        isCompleted,
        isImportant,
      },
    });
    return new NextResponse(JSON.stringify(task), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse("Error Updating Task", {
      status: 500,
    });
  }
};

//   Delete Task
export const DELETE = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const { userId } = auth();
    console.log(userId);
    const { id } = params;
    console.log(id);
    if (!userId) {
      return new NextResponse("Unauthorized", {
        status: 401,
      });
    }
    const task = await prisma.task.delete({
      where: {
        id,
      },
    });
    console.log(task);
    return new NextResponse(JSON.stringify(task), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse("Error Deleting Task", {
      status: 500,
    });
  }
};

// Update complete
export const PATCH = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const { userId } = auth();
    const { isCompleted } = await req.json();
    const { id } = params;
    if (!userId) {
      return new NextResponse("Unauthorized", {
        status: 401,
      });
    }
    const task = await prisma.task.update({
      where: {
        id: id,
      },
      data: {
        isCompleted,
      },
    });
    return new NextResponse(JSON.stringify(task), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse("Error Updating Task", {
      status: 500,
    });
  }
};
