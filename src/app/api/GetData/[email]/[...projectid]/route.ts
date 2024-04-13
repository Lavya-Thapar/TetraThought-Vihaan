// eslint-disable
import clientPromise from "@/lib/mongodb";

export const dynamic = "force-dynamic";

interface routeParams {
  params: {
    email: string;
    projectid: Array<string>;
  };
}

export async function GET(req: Request, context: routeParams) {
  const email = context.params.email;
  const projectid = context.params.projectid[0];

  try {
    const client = await clientPromise; // Wait for the database connection
    const db = client.db("studybuddy");
    const userCollection = db.collection("accounts");

    if (!email) {
      return new Response("user Id must be present", { status: 404 });
    }
    const user = await userCollection.findOne({ email: email });

    if (!user) {
      return new Response("No Such User", { status: 404 });
    }

    const project = await userCollection.findOne(
      {
        email: email,
        "projects.projectid": projectid,
      },
      { projection: { projects: 1 } }
    );

    if (!project) {
      return new Response("No Such Project id to fetch", { status: 404 });
    }



    if (!project.tasks) {
      await userCollection.updateOne(
        { email: email },
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
  const email = context.params.email;
  const projectid = context.params.projectid[0];

  try {
    const client = await clientPromise; // Wait for the database connection
    const db = client.db("studybuddy");
    const userCollection = db.collection("accounts");

    if (!email) {
      return new Response("user Id must be present", { status: 404 });
    }
    const user = await userCollection.findOne({ email: email });

    if (!user) {
      return new Response("No Such User", { status: 404 });
    }

    const project = await userCollection.findOne(
      {
        email: email,
        "projects.projectid": projectid,
      },
      { projection: { projects: 1 } }
    );

    if (!project) {
      return new Response("No Such Project id to fetch", { status: 404 });
    }
    console.log(project.tasks)
    // if (!project.tasks) {
    //   await userCollection.updateOne(
    //     { email: email },
    //     { $set: { "projects.$[project].tasks": [] } },
    //     { arrayFilters: [{ "project.projectid": projectid }] }
    //   );
    // }

    const data = await req.json();

    for (const item of data) {
      const { task_id, ...updatedData } = item; // Extract email and TaskID from item
      await userCollection.updateOne(
        { email }, // Find user with matching email and task_id
        { $set: { "projects.$[project].tasks.$[task]": item } },
        {
          arrayFilters: [
            { "project.projectid": projectid },
            { "task.task_id": task_id },
          ],
        }
      );
    }
    return new Response("Updated Data", { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Fatal Error occured while updating user tasks", {
      status: 500,
    });
  }
}

export async function POST(req: Request, context: routeParams) {
  const email = context.params.email;
  const projectid = context.params.projectid[0];

  try {
    const client = await clientPromise; // Wait for the database connection
    const db = client.db("studybuddy");
    const userCollection = db.collection("accounts");

    if (!email) {
      return new Response("user Id must be present", { status: 404 });
    }
    const user = await userCollection.findOne({ email: email });

    if (!user) {
      return new Response("No Such User", { status: 404 });
    }

    const project = await userCollection.findOne(
      {
        email: email,
        "projects.projectid": projectid,
      },
      { projection: { projects: 1 } }
    );

    if (!project) {
      return new Response("No Such Project id to fetch", { status: 404 });
    }

    // if (!project.tasks) {
    //   await userCollection.updateOne(
    //     { email: email },
    //     { $set: { "projects.$[project].tasks": [] } },
    //     { arrayFilters: [{ "project.projectid": projectid }] }
    //   );
    // }

    const data = await req.json();
    for (let item of data) {
      await userCollection.updateOne(
        { email: email },
        //@ts-ignore
        { $push: { "projects.$[project].tasks": item } }, // Add taskData to tasks array
        { arrayFilters: [{ "project.projectid": projectid }] }
      );
    }

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
  const email = context.params.email;
  const projectid = context.params.projectid[0];
  const task_id = context.params.projectid[1];
  console.log(context)
  try {
    const client = await clientPromise; // Wait for the database connection
    const db = client.db("studybuddy");
    const userCollection = db.collection("accounts");

    if (!email) {
      return new Response("user Id must be present", { status: 404 });
    }
    const user = await userCollection.findOne({ email: email });

    if (!user) {
      return new Response("No Such User", { status: 404 });
    }

    const project = await userCollection.findOne(
      {
        email: email,
        "projects.projectid": projectid,
      },
      { projection: { projects: 1 } }
    );

    if (!project) {
      return new Response("No Such Project id to fetch", { status: 404 });
    }

    // if (!project.tasks) {
    //   await userCollection.updateOne(
    //     { email: email },
    //     { $set: { "projects.$[project].tasks": [] } },
    //     { arrayFilters: [{ "project.projectid": projectid }] }
    //   );
    // }

    await userCollection.updateOne(
      { email: email },
      //@ts-ignore
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
