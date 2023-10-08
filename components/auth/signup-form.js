"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

import classes from "./signup-form.module.css";
// import Notification from "../ui/notification";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [role, setRole] = useState("");
  const router = useRouter();

  // const [selectedDate, setSelectedDate] = useState(null);
  // const [requestStatus, setRequestStatus] = useState();
  // const [errorMessage, setErrorMessage] = useState(null);

  // useEffect(() => {
  //   if (requestStatus === "Success" || requestStatus === "Error") {
  //     const timer = setTimeout(() => {
  //       setRequestStatus(null);
  //       setErrorMessage(null);
  //     }, 3000);

  //     return () => clearTimeout(timer);
  //   }
  // }, [requestStatus]);

  async function submitHandler(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          password,
          passwordConfirmation,
          role,
        }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      if (!response.ok) {
        console.log("Validation Error:", data);
      } else {
        const form = event.target;
        form.reset();
      }
      router.replace("/auth/login");
      return data;
    } catch (error) {
      console.log("Error", error.message);
    }
  }

  // setRequestStatus("Pending");
  // setErrorMessage(null);

  // const enteredEmail = emailInputRef.current.value;
  // const enteredName = nameInputRef.current.value;
  // const enteredPassword = passwordInputRef.current.value;
  // const enteredPasswordConfirmation =
  //   passwordConfirmationInputRef.current.value;
  // const enteredRole = roleInputRef.current.value;
  // try {
  //   const result = await createUser(
  //     enteredName,
  //     enteredEmail,
  //     enteredPassword,
  //     enteredPasswordConfirmation,
  //     enteredRole
  //   );
  // setRequestStatus("Success");
  // } catch (error) {
  // setErrorMessage(error.message);
  // setRequestStatus("Error");
  //   console.log(error.message);
  // }

  // let notification;

  // if (requestStatus === "Pending") {
  //   notification = {
  //     status: "Pending",
  //     title: "Creating Your Member...",
  //     message: "We Are Creating Your Member!",
  //   };
  // }

  // if (requestStatus === "Success") {
  //   notification = {
  //     status: "Success",
  //     title: "Success!",
  //     message: "Your Member Created Successfully!",
  //   };
  // }

  // if (requestStatus === "Error") {
  //   notification = {
  //     status: "Error",
  //     title: "Error!",
  //     message: errorMessage,
  //   };
  // }

  return (
    <div className={classes.signupForm}>
      <h1>Signup</h1>
      <form onSubmit={submitHandler}>
        <div>
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            id="name"
            placeholder="Your Name"
            required
          />
        </div>
        <div>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Your Email"
            required
          />
        </div>
        <div>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Your Password"
            required
          />
        </div>
        <div>
          <input
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            type="password"
            placeholder="Password Confirmation"
            required
          />
        </div>

        <div>
          <select
            onChange={(e) => setRole(e.target.value)}
            className={classes.select}
            required
          >
            <option value="">Select your role</option>
            <option value="player">Player</option>
            <option value="trainer">Trainer</option>
          </select>
        </div>
        <div className={classes.notMember}>
          <button className={classes.button}>Signup</button>

          <h3>Already A Member?</h3>
          <Link href="/auth/login" className={classes.button}>
            Login
          </Link>
        </div>
        {/* {notification && (
          <Notification
            status={notification.status}
            title={notification.title}
            message={notification.message}
          />
        )} */}
      </form>
    </div>
  );
}

export default Signup;
