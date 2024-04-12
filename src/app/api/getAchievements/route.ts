// eslint-disable
import clientPromise from "@/lib/mongodb";
import { Collection, Document } from "mongodb";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";


export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email")

  try {
    const client = await clientPromise; // Wait for the database connection
    const db = client.db("studybuddy");
    const userCollection = db.collection("accounts");

    if (!email) {
      return new Response("user Id must be present", { status: 404 });
    }
    const user = await userCollection.findOne({ email });
    if (!user) {
      return new Response("No Such User", { status: 404 });
    }
    console.log(user.achievements)
    console.log(!user.achievements);
    if (!user.achievements) {
      await userCollection.updateOne(
        { email: email },
        { $set: { achievements: [] } }
      );
      return Response.json([]);
    }

    return Response.json([...user.achievements]);

  } catch (error) {
    return new Response("Fatal Error occured while getting user achievements", {
      status: 500,
    });
  }
}

// export async function PUT(req: Request, context: routeParams) {
//   const email = context.params.email;

//   try {
//     const client = await clientPromise; // Wait for the database connection
//     const db = client.db("studybuddy");
//     const userCollection = db.collection("accounts");

//     if (!email) {
//       return new Response("user Id must be present", { status: 404 });
//     }
//     const user = await userCollection.findOne({ email });
//     if (!user) {
//       return new Response("No Such User", { status: 404 });
//     }
//     if (!user.projects) {
//       await userCollection.updateOne(
//         { email: email },
//         { $set: { projects: [] } }
//       );
//     }

//     const data = await req.json();

//     for (const item of data) {
//       const { projectid, ...updatedData } = item; // Extract email and TaskID from item
//       await userCollection.findOneAndUpdate(
//         { email, "projects.projectid": projectid }, // Find user with matching email and task_id
//         { $set: { "projects.$": item } } // Update the matching task
//       );
//     }
//     return new Response("Updated User Projects", { status: 200 });
//   } catch (error) {
//     return new Response("Fatal Error occured while updating user Projects", {
//       status: 500,
//     });
//   }
// }

export async function POST(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email")

  try {
    const client = await clientPromise; // Wait for the database connection
    const db = client.db("studybuddy");
    const userCollection = db.collection("accounts");

    if (!email) {
      return new Response("user Id must be present", { status: 404 });
    }
    const user = await userCollection.findOne({ email });
    if (!user) {
      return new Response("No Such User", { status: 404 });
    }
    
    console.log(user.achievements)
    console.log(!user.achievements);
    if (!user.achievements) {
      await userCollection.updateOne(
        { email: email },
        { $set: { achievements: [] } }
      );
    }

    const data : Array<Document> = await req.json();

    await userCollection.updateOne(
      { email: email },
      //@ts-ignore
      { $push: { "achievements": { $each: data } } } // Add taskData to tasks array
    );

    return new Response("Inserted achievements Successfully", { status: 200 });
  } catch (error) {
    return new Response("Fatal Error occured while inserting user achievements", {
      status: 500,
    });
    // res.status(500).json({ error: 'Error fetching data from MongoDB' });
  }
}

// export async function DELETE(req: Request, context: routeParams) {
//   const email = context.params.email;
//   const projectid = await req.text()

//   try {
//     const client = await clientPromise; // Wait for the database connection
//     const db = client.db("studybuddy");
//     const userCollection = db.collection("accounts");
//     console.log(projectid)

//     if (!email) {
//       return new Response("user Id must be present", { status: 404 });
//     }
//     const user = await userCollection.findOne({ email });
//     if (!user) {
//       return new Response("No Such User", { status: 404 });
//     }
//     if (!user.projects) {
//       await userCollection.updateOne(
//         { email: email },
//         { $set: { projects: [] } }
//       );
//       return new Response("Projects Already Empty and Deleted", { status: 201 })
//     }


//     await userCollection.updateOne(
//       { email: email },
//       //@ts-ignore
//       { $pull: { "projects": { "projectid": projectid } } } 
//     );
//     return new Response("Deleted Projects Successfully", { status: 200 });
//   } catch (error) {
//     return new Response("Fatal Error occured while deleting user projects", {
//       status: 500,
//     });
//     // res.status(500).json({ error: 'Error fetching data from MongoDB' });
//   }
// }
