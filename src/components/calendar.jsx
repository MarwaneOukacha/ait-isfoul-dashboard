import React from "react";
import { useCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import { createViewMonthGrid } from "@schedule-x/calendar";
import { createEventsServicePlugin } from "@schedule-x/events-service";
import "@schedule-x/theme-default/dist/index.css";

const eventsServicePlugin = createEventsServicePlugin();

const CalendarComponent = () => {
  const calendarApp = useCalendarApp({
    views: [createViewMonthGrid()],
    plugins: [eventsServicePlugin],
  });

  if (!calendarApp)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-gray-500 text-lg animate-pulse">Loading calendar...</div>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-lg min-h-[80vh] flex flex-col">
      <header className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Customer bookings Calendar</h1>
        <p className="text-gray-500 mt-1">Plan and organize your events effortlessly.</p>
      </header>

      <main className="flex-1">
        <div className="border rounded-lg overflow-hidden shadow-sm">
          <ScheduleXCalendar calendarApp={calendarApp} />
        </div>
      </main>

      <footer className="mt-6 text-center text-sm text-gray-400">
        © 2025 Your Company. All rights reserved.
      </footer>
    </div>
  );
};

export default CalendarComponent;
