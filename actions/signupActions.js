"use server";

import { hashPassword } from "@/lib/auth";
import User from "@/models/userModel";
// import { redirect } from "next/navigation";

export async function signupWithCredentials(data) {
  // try {
    const user = await User.findOne({ email: data.email });
    if (user) {
      throw new Error("Email already Exists!");
    }

    if (!data.name || data.name.trim().length > 10) {
      throw new Error("Name Should Not Be More than 10 Characters");
    }

    if (!data.email || !data.email.includes("@")) {
      throw new Error("Invalid Email");
    }

    if (!data.password || data.password.trim().length < 6) {
      throw new Error("Password Should Be More than 6 Characters");
    }
    if (data.password !== data.passwordConfirmation) {
      throw new Error("Passwords Should Be Matched");
    }

    if (data.password) {
      data.password = await hashPassword(data.password);
    }

    console.log({ data });

    return {
      message: "Signup Success, Please Check Your Email To Verify Your Email.",
    };
  // } catch (error) {
    // redirect(`/errors?error=${error.message}`);
  //   return {
  //     error: error.message,
  //   };
  // }
}
