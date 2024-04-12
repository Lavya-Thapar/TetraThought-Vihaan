import clientPromise from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

export const dynamic = "force-dynamic";

interface routeParams {
  params: {
    userid: string;
  };
}

export async function GET(req: Request, context: routeParams) {
  const userid = context.params.userid;

  try {
    const client = await clientPromise; // Wait for the database connection
    const db = client.db("studybuddy");
    const userCollection = db.collection("users");

    if (!userid) {
      return new Response("user Id must be present", { status: 404 });
    }
    const user = await userCollection.findOne({ userid });
    if (!user) {
      return new Response("No Such User", { status: 404 });
    }
    if (!user.projects) {
      await userCollection.updateOne(
        { userid: userid },
        { $set: { projects: [] } }
      );
      return Response.json({ result: [], count: 0 });
    }
    return Response.json({
      result: [...user.projects],
      count: user.projects.length,
    });
  } catch (error) {
    return new Response("Fatal Error occured while getting user projects", {
      status: 500,
    });
  }
}

export async function PUT(req: Request, context: routeParams) {
  const userid = context.params.userid;

  try {
    const client = await clientPromise; // Wait for the database connection
    const db = client.db("studybuddy");
    const userCollection = db.collection("users");

    if (!userid) {
      return new Response("user Id must be present", { status: 404 });
    }
    const user = await userCollection.findOne({ userid });
    if (!user) {
      return new Response("No Such User", { status: 404 });
    }
    if (!user.projects) {
      await userCollection.updateOne(
        { userid: userid },
        { $set: { projects: [] } }
      );
    }

    const data = await req.json();

    for (const item of data) {
      const { projectid, ...updatedData } = item; // Extract userid and TaskID from item
      await userCollection.findOneAndUpdate(
        { userid, "projects.projectid": projectid }, // Find user with matching userid and task_id
        { $set: { "projects.$": item } } // Update the matching task
      );
    }
    return new Response("Updated User Projects", { status: 200 });
  } catch (error) {
    return new Response("Fatal Error occured while updating user Projects", {
      status: 500,
    });
  }
}

export async function POST(req: Request, context: routeParams) {
  const userid = context.params.userid;

  try {
    const client = await clientPromise; // Wait for the database connection
    const db = client.db("studybuddy");
    const userCollection = db.collection("users");

    if (!userid) {
      return new Response("user Id must be present", { status: 404 });
    }
    const user = await userCollection.findOne({ userid });
    if (!user) {
      return new Response("No Such User", { status: 404 });
    }
    if (!user.projects) {
      await userCollection.updateOne(
        { userid: userid },
        { $set: { projects: [] } }
      );
    }

    const data = await req.json();

    await userCollection.updateOne(
      { userid: userid },
      { $push: { "projects": { $each: data } } } // Add taskData to tasks array
    );

    return new Response("Inserted Projects Successfully", { status: 200 });
  } catch (error) {
    return new Response("Fatal Error occured while inserting user projects", {
      status: 500,
    });
    // res.status(500).json({ error: 'Error fetching data from MongoDB' });
  }
}

export async function DELETE(req: Request, context: routeParams) {
  const userid = context.params.userid;
  const projectid = req.text()

  try {
    const client = await clientPromise; // Wait for the database connection
    const db = client.db("studybuddy");
    const userCollection = db.collection("users");

    if (!userid) {
      return new Response("user Id must be present", { status: 404 });
    }
    const user = await userCollection.findOne({ userid });
    if (!user) {
      return new Response("No Such User", { status: 404 });
    }
    if (!user.projects) {
      await userCollection.updateOne(
        { userid: userid },
        { $set: { projects: [] } }
      );
    }


    await userCollection.updateOne(
      { userid: userid },
      { $pull: { "projects": { "projectid": projectid } } } 
    );
    return new Response("Deleted Projects Successfully", { status: 200 });
  } catch (error) {
    return new Response("Fatal Error occured while deleting user projects", {
      status: 500,
    });
    // res.status(500).json({ error: 'Error fetching data from MongoDB' });
  }
}
