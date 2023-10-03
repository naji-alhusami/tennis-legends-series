import React, { Fragment, useContext, useEffect } from "react";
import { motion } from "framer-motion";

import AuthContext from "@/store/auth-context";

import classes from "./booking-times-step.module.css";
import { generateTimeSlots } from "./generate-times";
import { fetchTakenTimesFromMongo } from "@/lib/fetchTakenTimes";
// import { sendTimeSlotsToMongo } from "@/lib/sendTimeSlots";
// import { fetchTimeSlotsFromMongo } from "@/lib/fetchTimeSlots";

function TimeSelectionStep(props) {
  const {
    setTimeInfo,
    timeSlots,
    isLoadingTimes,
    setIsLoadingTimes,
    activeDay,
    setTimeSlots,
  } = useContext(AuthContext);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoadingTimes(true);
        // generate all the times
        const generatedTimes = await generateTimeSlots(activeDay);
        // fetch the taken times
        const takenTimes = await fetchTakenTimesFromMongo();
        // check if there are taken times and give them false status
        if (takenTimes && takenTimes.data.length > 0) {
          console.log("inside taken times");
          const updatedGeneratedTimes = generatedTimes.map((timeSlot) => {
            const isTaken = takenTimes.data.some(
              (takenTime) =>
                takenTime.date === timeSlot.date &&
                takenTime.time === timeSlot.time
            );
            return {
              ...timeSlot,
              status: isTaken ? false : timeSlot.status, // Set status to false if taken, true otherwise
            };
          });
          setTimeSlots(updatedGeneratedTimes);

          // send the times to Mongo (with a false status of the taken times)
          // await sendTimeSlotsToMongo(updatedGeneratedTimes);
        } else {
          console.log("without takentimes");
          // send the times to Mongo
          // await sendTimeSlotsToMongo(generatedTimes);
          setTimeSlots(generateTimeSlots);
        }

        // Fetch time slots from MongoDB
        // const dataFromMongo = await fetchTimeSlotsFromMongo();

        setIsLoadingTimes(false);
      } catch (error) {
        console.error(error.message || "Error here!");
        setIsLoadingTimes(false);
      }
    }

    fetchData();
  }, [activeDay]);
  
  function timeHandler(time) {
    setTimeInfo(time);
    props.nextStepHandler();
  }

  return (
    <Fragment>
      <div className={classes.timeContainer}>
        <h1>Time:</h1>
        {isLoadingTimes ? (
          <p>Loading Times...</p>
        ) : (
          timeSlots.map((timeSlot) => {
            if (timeSlot.status === true) {
              return (
                <p
                  className={classes.availableTime}
                  key={timeSlot.id}
                  onClick={() => timeHandler(timeSlot)}
                >
                  {timeSlot.time}
                </p>
              );
            } else {
              return (
                <p className={classes.notAvailableTime} key={timeSlot.id}>
                  {timeSlot.time}
                </p>
              );
            }
          })
        )}
      </div>
      <p
        className={classes.bookButton}
        // whileHover={{ scale: 1.1 }}
        // whileTap={{ scale: 0.9 }}
        onClick={props.prevStepHandler}
      >
        Back
      </p>
    </Fragment>
  );
}

export default TimeSelectionStep;
