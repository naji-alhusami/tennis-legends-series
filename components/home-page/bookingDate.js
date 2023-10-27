import React, { useRef, useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import classes from "./booking.module.css";
import AuthContext from "@/store/auth-context";

function BookingDate() {
  const currentDate = new Date();

  const datePickerRef = useRef(null);

  const handleDateChange = (date) => {
    console.log(date);
    setActiveDay(date);
  };

  const toggleCalendar = () => {
    if (datePickerRef.current) {
      datePickerRef.current.setOpen(true);
    }
  };

  return (
    <div className={classes.dateContainer}>
      <h3>Date:</h3>
      <div className={classes.dateDisplay}>
        {activeDay
          ? activeDay.toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })
          : null}
        <button onClick={toggleCalendar}>Choose</button>
        <div className={classes.reactDatePicker}>
          <DatePicker
            onChange={handleDateChange}
            ref={datePickerRef}
            minDate={currentDate}
            showPopperArrow={false}
          />
        </div>
      </div>
    </div>
  );
}

export default BookingDate;
