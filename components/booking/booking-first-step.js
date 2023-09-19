import React, { Fragment, useState, useEffect, useContext } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import BookingCourtDate from "./booking-calendar";
import { fetchTimeSlots } from "./generate-times";
import AuthContext from "@/store/auth-context";
import { AiFillCaretDown } from "react-icons/ai";

import classes from "./booking-first-step.module.css";

function SelectionStep({
  handleChangeCourts,
  selectedCourtType,
  // courtTypeImages,
  changeStep,
  isShowCourts,
  setIsShowCourts,
}) {
  const [timeSlots, setTimeSlots] = useState([]);
  console.log(timeSlots);
  const { activeDay, numberOfPlayers, setNumberOfPlayers } =
    useContext(AuthContext);

  useEffect(() => {
    fetchTimeSlots(activeDay, setTimeSlots);
  }, [activeDay]);

  useEffect(() => {
    // This effect runs whenever 'timeSlots' changes
    console.log(timeSlots);

    // Send timeSlots to MongoDB
    sendTimeSlotsToMongo(timeSlots);
  }, [timeSlots]);

  // Start of send Times to Mongo
  async function sendTimeSlotsToMongo(timeSlots) {
    try {
      const response = await fetch("/api/timeSlots/insertTimeSlots", {
        method: "POST",
        body: JSON.stringify(timeSlots),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Time slots sent to MongoDB successfully:", data);
      } else {
        console.error(
          "Error sending time slots to MongoDB:",
          data.message || "Something went wrong!"
        );
      }
    } catch (error) {
      console.error("Error sending time slots to MongoDB:", error);
    }
  }
  // End of send Times to Mongo

  // const times = await sendTimeSlots(timeSlots);

  const courtTypeImages = {
    "Clay Courts": "/images/clay.jpg",
    "Hard Courts": "/images/hard.jpg",
  };

  const handleShowCourts = () => {
    setIsShowCourts(!isShowCourts);
  };

  const decreasePlayers = () => {
    if (numberOfPlayers > 1) {
      setNumberOfPlayers(numberOfPlayers - 1);
    }
  };

  const increasePlayers = () => {
    if (numberOfPlayers < 4) {
      setNumberOfPlayers(numberOfPlayers + 1);
    }
  };

  return (
    <Fragment>
      <div>
        <div className={classes.bookingForm}>
          <div className={classes.bookingPlayers}>
            <Image
              src={courtTypeImages[selectedCourtType]}
              alt={selectedCourtType}
              style={{ filter: "brightness(0.7)" }}
              width={400}
              height={300}
              priority={true}
            />
            <div className={classes.courtsContainer}>
              <h3>Courts:</h3>
              <AiFillCaretDown
                onClick={handleShowCourts}
                style={{ marginTop: "1rem" }}
              />
              <div>
                {isShowCourts && (
                  <ul>
                    <li onClick={handleChangeCourts}>Clay Courts</li>
                    <li onClick={handleChangeCourts}>Hard Courts</li>
                  </ul>
                )}
              </div>
            </div>
            <div className={classes.playersContainer}>
              <h3>Players:</h3>
              <span>{numberOfPlayers}</span>
              <button onClick={increasePlayers}>+</button>
              <button onClick={decreasePlayers}>-</button>
            </div>
          </div>
          <BookingCourtDate />
        </div>

        <div className={classes.timeContainer}>
          <h1>Time:</h1>
          <div className={classes.time}>
            {/* {timeSlots} */}
            {timeSlots.map((timeSlot) => (
              <button
                key={timeSlot.id}
                onClick={() => console.log("clicked")}
                // onClick={() => timeHandler(timeSlot)}
              >
                {timeSlot.time}
              </button>
            ))}
          </div>
        </div>
        <motion.div
          className={classes.bookButton}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={changeStep}
        >
          <p>Next</p>
        </motion.div>
      </div>
    </Fragment>
  );
}

export default SelectionStep;
