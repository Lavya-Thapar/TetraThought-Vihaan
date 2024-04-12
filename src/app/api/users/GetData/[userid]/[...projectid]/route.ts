import clientPromise from "@/lib/mongodb";

export const dynamic = "force-dynamic";

interface routeParams {
  params: {
    userid: string;
    projectid: Array<string>;
  };
}

export async function GET(req: Request, context: routeParams) {
  const userid = context.params.userid;
  const projectid = context.params.projectid[0];

  try {
    const client = await clientPromise; // Wait for the database connection
    const db = client.db("studybuddy");
    const userCollection = db.collection("users");

    if (!userid) {
      return new Response("user Id must be present", { status: 404 });
    }
    const user = await userCollection.findOne({ userid: userid });

    if (!user) {
      return new Response("No Such User", { status: 404 });
    }

    const project = await userCollection.findOne(
      {
        userid: userid,
        "projects.projectid": projectid,
      },
      { projection: { projects: 1 } }
    );

    if (!project) {
      return new Response("No Such Project id to fetch", { status: 404 });
    }

    if (!project.tasks) {
      await userCollection.updateOne(
        { userid: userid },
        { $set: { "projects.$[project].tasks": [] } },
        { arrayFilters: [{ "project.projectid": projectid }] }
      );
      return Response.json({
        result: [],
        count: 0,
      });
    } else {
      return Response.json({
        result: [...project.tasks],
        count: project.tasks.length,
      });
    }
  } catch (error) {
    return new Response("Fatal Error occured while getting user tasks", {
      status: 500,
    });
  }
}

export async function PUT(req: Request, context: routeParams) {
  const userid = context.params.userid;
  const projectid = context.params.projectid[0];

  try {
    const client = await clientPromise; // Wait for the database connection
    const db = client.db("studybuddy");
    const userCollection = db.collection("users");

    if (!userid) {
      return new Response("user Id must be present", { status: 404 });
    }
    const user = await userCollection.findOne({ userid: userid });

    if (!user) {
      return new Response("No Such User", { status: 404 });
    }

    const project = await userCollection.findOne(
      {
        userid: userid,
        "projects.projectid": projectid,
      },
      { projection: { projects: 1 } }
    );
    
    if (!project) {
      return new Response("No Such Project id to fetch", { status: 404 });
    }
    
    if (!project.tasks) {
      await userCollection.updateOne(
        { userid: userid },
        { $set: { "projects.$[project].tasks": [] } },
        { arrayFilters: [{ "project.projectid": projectid }] }
      );
    }

    const data = await req.json();

    for (const item of data) {
      const { task_id, ...updatedData } = item; // Extract userid and TaskID from item
      await userCollection.updateOne(
        { userid }, // Find user with matching userid and task_id
        { $set: { "projects.$[project].tasks.$[task]": item } },
        {
          arrayFilters: [
            { "project.projectid": projectid}, {"task.task_id": task_id },
          ],
          upsert: true,
        }
      );
    }
    return new Response("Updated Data", { status: 200 });
  } catch (error) {
    console.error(error)
    return new Response("Fatal Error occured while updating user tasks", {
      status: 500,
    });
  }
}

export async function POST(req: Request, context: routeParams) {
  const userid = context.params.userid;
  const projectid = context.params.projectid[0];

  try {
    const client = await clientPromise; // Wait for the database connection
    const db = client.db("studybuddy");
    const userCollection = db.collection("users");

    if (!userid) {
      return new Response("user Id must be present", { status: 404 });
    }
    const user = await userCollection.findOne({ userid: userid });

    if (!user) {
      return new Response("No Such User", { status: 404 });
    }

    const project = await userCollection.findOne(
      {
        userid: userid,
        "projects.projectid": projectid,
      },
      { projection: { projects: 1 } }
    );

    if (!project) {
      return new Response("No Such Project id to fetch", { status: 404 });
    }

    if (!project.tasks) {
      await userCollection.updateOne(
        { userid: userid },
        { $set: { "projects.$[project].tasks": [] } },
        { arrayFilters: [{ "project.projectid": projectid }] }
      );
    }

    const data = await req.json();

    await userCollection.updateOne(
      { userid: userid },
      { $push: { "projects.$[project].tasks": { $each: data } } }, // Add taskData to tasks array
      { arrayFilters: [{ "project.projectid": projectid }] }
    );

    return new Response("Inserted Tasks Successfully", { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Fatal Error occured while inserting user tasks", {
      status: 500,
    });
    // res.status(500).json({ error: 'Error fetching data from MongoDB' });
  }
}

export async function DELETE(req: Request, context: routeParams) {
  const userid = context.params.userid;
  const projectid = context.params.projectid[0];
  const task_id = context.params.projectid[1];

  try {
    const client = await clientPromise; // Wait for the database connection
    const db = client.db("studybuddy");
    const userCollection = db.collection("users");

    if (!userid) {
      return new Response("user Id must be present", { status: 404 });
    }
    const user = await userCollection.findOne({ userid: userid });

    if (!user) {
      return new Response("No Such User", { status: 404 });
    }

    const project = await userCollection.findOne(
      {
        userid: userid,
        "projects.projectid": projectid,
      },
      { projection: { projects: 1 } }
    );

    if (!project) {
      return new Response("No Such Project id to fetch", { status: 404 });
    }

    if (!project.tasks) {
      await userCollection.updateOne(
        { userid: userid },
        { $set: { "projects.$[project].tasks": [] } },
        { arrayFilters: [{ "project.projectid": projectid }] }
      );
    }

    await userCollection.updateOne(
      { userid: userid },
      { $pull: { "projects.$[project].tasks": { task_id: task_id } } },
      { arrayFilters: [{ "project.projectid": projectid }] }
    );
    return new Response("Deleted Tasks Successfully", { status: 200 });
  } catch (error) {
    return new Response("Fatal Error occured while deleting user data", {
      status: 500,
    });
    // res.status(500).json({ error: 'Error fetching data from MongoDB' });
  }
}


