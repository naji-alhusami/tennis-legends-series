import React, { Suspense } from "react";
import BookingContainer from "@/components/booking/booking-container";
import BookingSteps from "@/components/booking/booking-steps";
import BookingInfo from "@/components/booking/booking-Info";

import classes from "@/components/booking/booking";
import { fetchTimeSlots } from "@/lib/generate-times";
import { fetchEventsFromMongo } from "@/lib/events/fetchEventsFromMongo";
import { fetchTakenTimesFromMongo } from "@/lib/takenTimes/fetchTakenTimesFromMongo";

async function BookingPage({ searchParams }) {
  const newDate = searchParams.date;
  const newCourt = searchParams.court;
  const timeSlots = await fetchTimeSlots(newDate, newCourt);
  const events = await fetchEventsFromMongo();

  const takenTimes = await fetchTakenTimesFromMongo();
  console.log(takenTimes);
  return (
    <div className={classes.bookingContainer}>
      <BookingContainer />
      <BookingSteps />
      <Suspense
        fallback={
          <div style={{ height: "400px", backgroundColor: "red" }}>
            Loading...xxx
          </div>
        }
      >
        {events.data.map((takenTime) => (
          <p key={takenTime._id}>{takenTime.date}</p>
        ))}
      </Suspense>
      {/* <BookingInfo
          timeSlots={timeSlots}
          events={events}
          takenTimes={takenTimes}
        /> */}
    </div>
  );
}

export default BookingPage;
