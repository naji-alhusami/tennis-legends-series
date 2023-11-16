import React, { Suspense } from "react";
import CalendarEvents from "@/components/calendaraa/calendar-events";
import Image from "next/image";
import Headers from "@/components/ui/headers";
import calendarEvents from "@/public/images/calendar-events.jpg";
import classes from "../../components/calendar/calendar-events.module.css";
import LoadingData from "@/components/ui/loading-data";

export const metadata = {
  title: "Member Calendar Events",
  description: "Check your calendar events in Tennis Net Club",
};

async function CalendarPage() {
  return (
    <div>
      <div className={classes.image}>
        <Image src={calendarEvents} alt="calendar-events" />
      </div>
      <div className={classes.text}>
        <Headers
          H3Header="Courses, Lessons & Reserved Courts"
          H1Header="TIME SLOTS"
          H2Header="My Calendar"
          PHeader="Check your time slots, including (events, training sessions, and
            reserved courts)"
        />
      </div>
      <Suspense fallback={<LoadingData />}>
        <CalendarEvents />
      </Suspense>
    </div>
  );
}

export default CalendarPage;
