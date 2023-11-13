// "use client";
"use server";
import React from "react";

import Image from "next/legacy/image";

import Signup from "@/components/auth/signup-form";
import Login from "@/components/auth/login-form";
import signup from "@/public/images/signup.jpg";
import classes from "@/components/auth/signup-form.module.css";
import AddExtraInfo from "@/components/auth/add-extra-info";

async function AuthType({ params, searchParams }) {
  return (
    <div className={classes.signup}>
      <div className={classes.image}>
        <Image
          src={signup}
          alt="signup"
          // height={500}
          // width={500}
          layout="fill"
          objectFit="cover"
          priority={true}
        />
      </div>
      <div>
        {params.authType === "signup" ? (
          <Signup />
        ) : params.authType === "signin" ? (
          <Login callbackUrl={searchParams.callbackUrl || "/"} />
        ) : (
          <AddExtraInfo />
        )}
      </div>
    </div>
  );
}

export default AuthType;
