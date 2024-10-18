import { auth } from "@/lib/auth";
import * as context from "next/headers";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";
import { act } from "react";

const USER_TABLE_UNIQUE_CONSTRAINT_ERROR = "unique constraint error";
export const POST = async (request: NextRequest) => {
  const formData = await request.formData();
  const username = formData.get("email");
  const password = formData.get("password");
  // basic check
  if (
    typeof username !== "string" ||
    username.length < 4 ||
    username.length > 31
  ) {
    return NextResponse.json(
      {
        error: "Invalid username",
      },
      {
        status: 400,
      },
    );
  }
  if (
    typeof password !== "string" ||
    password.length < 6 ||
    password.length > 255
  ) {
    return NextResponse.json(
      {
        error: "Invalid password",
      },
      {
        status: 400,
      },
    );
  }
  try {

    const user = await auth.createUser({
      userId: username.toLowerCase(),
      key: null,
      attributes: {
        email: username,
      },
    });
    
    const session = await auth.createSession({
      userId: username.toLowerCase(),
      attributes: {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 days
        active: true,
      },
    });

    const authRequest = auth.handleRequest(request.method, context);
    authRequest.setSession(session);
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/", // redirect to profile page
      },
    });
  } catch (e) {
    // this part depends on the database you're using
    // check for unique constraint error in user table
    // if (
    //   e instanceof SomeDatabaseError &&
    //   e.message === USER_TABLE_UNIQUE_CONSTRAINT_ERROR
    // ) {
    //   return NextResponse.json(
    //     {
    //       error: "Username already taken",
    //     },
    //     {
    //       status: 400,
    //     },
    //   );
    // }

    console.error(e);

    return NextResponse.json(
      {
        error: "An unknown error occurred",
      },
      {
        status: 500,
      },
    );
  }
};
