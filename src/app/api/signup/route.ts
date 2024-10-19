import { lucia } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { hash } from "argon2";
import { error } from "console";
import { generateIdFromEntropySize } from "lucia";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

const USER_TABLE_UNIQUE_CONSTRAINT_ERROR = "unique constraint error";
export const POST = async (request: NextRequest) => {
  const formData = await request.formData();
  const username = formData.get("email");
  const password = formData.get("password");
  const role = formData.get("role");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // basic check
  if (
    typeof username !== "string" ||
    username.length < 4 ||
    username.length > 31||
    !emailRegex.test(username)
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
    password.length < 8 ||
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
  if (
    typeof role !== "string" ||
     (role !== "operator" && role !== "manager") 
    
  ) {
    return NextResponse.json(
      {
        error: "Invalid Role",
      },
      {
        status: 400,
      },
    );
  }
  try {

    const userId = generateIdFromEntropySize(10);
    
    const password_hash = await hash(password, {
      // recommended minimum parameters
      memoryCost: 19456,
      timeCost: 2,
      parallelism: 1,
    });


    const res = await db.user.create({data: {id: userId, email: username, password_hash, role}})

    // const user = await auth.createUser({
    //   key: {
    //     providerId: "username", // auth method
    //     providerUserId: username.toLowerCase(), // unique id when using "username" auth method
    //     password, // hashed by Lucia
    //   },
    //   attributes: {
    //     username,
    //   },
    // });
    
    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    return new Response(null, {
      status: 302,
      headers: {
        "Set-Cookie": sessionCookie.serialize(),
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
        success: false,
        error: "An unknown error occurred",
      },
      {
        status: 500,
      },
    );
  }
};
