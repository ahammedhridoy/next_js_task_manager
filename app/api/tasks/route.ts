import prisma from "@/app/utils/connect";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { NextApiRequest } from "next";

// Create a new task
export const POST = async (req: NextApiRequest) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return new NextResponse("Unauthorized", {
        status: 401,
      });
    }
    const { title, description, date, isCompleted, isImportant } =
      await req.json();
    if (!title || !description || !date) {
      return new NextResponse("All fields are required", {
        status: 400,
      });
    }
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
    return new NextResponse(JSON.stringify(task), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse("Something went wrong when created task", {
      status: 500,
    });
  }
};

// Get Tasks

export const GET = async (req: NextApiRequest) => {
  try {
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

// Update Complete
// export const PUT = async (req: Request) => {
//   try {
//     const { userId } = auth();
//     const { isCompleted, id } = await req.json();
//     if (!userId) {
//       return new NextResponse("Unauthorized", {
//         status: 401,
//       });
//     }
//     const task = await prisma.task.update({
//       where: {
//         id,
//       },
//       data: isCompleted,
//     });
//     console.log(task);
//     return new NextResponse(JSON.stringify(task), {
//       status: 200,
//     });
//   } catch (error) {
//     console.log(error);
//     return new NextResponse("Error Updating Task", {
//       status: 500,
//     });
//   }
// };
