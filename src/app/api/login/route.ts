import { lucia } from "@/lib/auth";
import * as context from "next/headers";
import { NextResponse } from "next/server";
import { verify } from "argon2";
import type { NextRequest } from "next/server";
import { db } from "@/lib/prisma";
export const GET = async (request: NextRequest) => {
 return NextResponse.json(
   {
     error: "Invalid usernaasdasdme",
   },
   {
     status: 400,
   },
 );
}
export const POST = async (request: NextRequest) => {
  const formData = await request.formData();
  const username = formData.get("email");
  const password = formData.get("password");
  // basic check
  if (
    typeof username !== "string" ||
    username.length < 1 ||
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
    password.length < 1 ||
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
    // find user by key
    // and validate password

    const user = await db.user.findFirst({where: {email: username}})
    if (!user) {
      return NextResponse.json(
        {
          error: "Invalid username",
        },
        {
          status: 400,
        },
      );
    }


    const validPassword = await verify(user.password_hash, password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });

    if (!validPassword) {
      return new Response("Invalid password", {status: 400})
    }
   
	const session = await lucia.createSession(user.id, {});
  const sessionCookie = lucia.createSessionCookie(session?.id);
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/", // redirect to profile page
        "Set-Cookie": sessionCookie.serialize(),
      },
    });
  } catch (e) {
    // if (
    //   e instanceof LuciaError &&
    //   (e.message === "AUTH_INVALID_KEY_ID" ||
    //     e.message === "AUTH_INVALID_PASSWORD")
    // ) {
    //   // user does not exist or invalid password
    //   return NextResponse.json(
    //     {
    //       error: "Incorrect username or password",
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
