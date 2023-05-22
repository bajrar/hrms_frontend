import React from "react";
import NepaliDate from "nepali-date-converter";

const UpcomingEvents = () => {
  const getLastDayOfMonth = (year: Number, month: any) => {
    const nepaliMonths = [
      31, // Baisakh
      32, // Jestha
      31, // Ashad
      32, // Shrawan
      31, // Bhadra
      30, // Ashwin
      30, // Kartik
      30, // Mangsir
      29, // Poush
      29, // Magh
      30, // Falgun
      30, // Chaitra
    ];

    return nepaliMonths[month];
  };

  const result = () => {
    const date = new NepaliDate();
    const month = date.getMonth();
    const year = date.getYear();
    const lastDayOfMonth = getLastDayOfMonth(year, month);

    const output = [];
    for (let i = 1; i <= lastDayOfMonth; i++) {
      output.push(i);
    }

    return output;
  };

  const calendarData = result();

  const upcomingEvents = [
    {
      date: "2023-05-25",
      time: "14:00",
      title: "Meeting",
      description: "Work From Home",
    },
    {
      date: "2023-05-28",
      time: "10:30",
      title: "Birthday",
      description: "Birthday",
    },
    {
      date: "2023-06-02",
      time: "19:00",
      title: "Holiday",
      description: "Work From Homes",
    },
    {
      date: "2023-05-28",
      time: "10:30",
      title: "Birthday",
      description: "Birthday",
    },
    {
      date: "2023-05-25",
      time: "14:00",
      title: "Meeting",
      description: "Work From Home",
    },
    // Add more event objects as needed
  ];

  return (
    <>
      <div className="upcoming-events-heading">
        <h4>Events</h4>
        <p>Dont's miss the important schedule</p>
      </div>
      <div className="upcoming-events-calendar">
        {calendarData.map((item, index) => {
          return (
            <div className="upcoming-events-calendar-item" key={index}>
              <button>{item}</button>
            </div>
          );
        })}
      </div>
      <div className="upcoming-event-today">
        <h4>Today</h4>
        <p>No Events</p>
      </div>
      <div className="upcoming-event-upcoming">
        <h4>Upcoming</h4>
        <div className="upcoming-event-upcoming-events">
          {upcomingEvents.map((event, index) => (
            <div className="upcoming-event-upcoming-events-items" key={index}>
              <p>Date: {event.date}</p>
              <h5>{event.title}</h5>
              <p>Description: {event.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default UpcomingEvents;
