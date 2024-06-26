import { Account } from "@/types/user";
import { MongoClient } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
  const client = new MongoClient(process.env.MONGODB_URI!);

  const new_account = (await req.json()) as Account;
  try {
    await client.connect();
    const database = client.db("studybuddy");
    const collection = database.collection("accounts");

    await collection.insertOne(new_account);
    await client.close();
    return NextResponse.json({});
  } catch (e) {
    throw new Error(`Error in new account: ${e}`);
  }
}

export async function GET(req: NextRequest) {
  const client = new MongoClient(process.env.MONGODB_URI!);

  const email = req.nextUrl.searchParams.get("email");
  try {
    await client.connect();
    const database = client.db("studybuddy");
    const collection = database.collection("accounts");

    const account = await collection.findOne({ email: email });
    await client.close();
    return NextResponse.json(account);
  } catch (e) {
    throw new Error(`Error in fetching account: ${e}`);
  }
}

export async function PUT(req: NextRequest) {
  const client = new MongoClient(process.env.MONGODB_URI!);

  const email = req.nextUrl.searchParams.get("email");
  const field = req.nextUrl.searchParams.get("field") as
    | "name"
    | "photo"
    | "email"
    | "photoBase64";
  if (!field || !email) throw new Error("Missing query parameters");

  const new_account = (await req.json()) as Account;
  try {
    await client.connect();
    const database = client.db("studybuddy");
    const collection = database.collection("accounts");

    await collection.updateOne(
      { email: email },
      { $set: { [field]: new_account[field] } }
    );

    await client.close();

    return NextResponse.json({});
  } catch (e) {
    throw new Error(`Error in updating account: ${e}`);
  }
}
