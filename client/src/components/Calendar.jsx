import { useState } from "react";
import dayjs from "dayjs";
import CalendarHeader from "./CalendarHeader";
import Day from "./Day";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [events, setEvents] = useState({});

  const prevMonth = () => setCurrentDate(currentDate.subtract(1, "month"));
  const nextMonth = () => setCurrentDate(currentDate.add(1, "month"));

  const handleAddEvent = (date, text) => {
    setEvents((prev) => ({
      ...prev,
      [date]: [...(prev[date] || []), text],
    }));
  };

  const generateCalendarDays = () => {
    const startOfMonth = currentDate.startOf("month");
    const endOfMonth = currentDate.endOf("month");
    const startDay = startOfMonth.day(); // 0 (Sun) - 6 (Sat)
    const daysInMonth = currentDate.daysInMonth();

    const prevMonth = currentDate.subtract(1, "month");
    const nextMonth = currentDate.add(1, "month");
    const daysInPrevMonth = prevMonth.daysInMonth();

    const calendarDays = [];

    // Leading days from previous month
    for (let i = startDay - 1; i >= 0; i--) {
      const day = daysInPrevMonth - i;
      calendarDays.push({
        day,
        date: prevMonth.date(day),
        isCurrentMonth: false,
      });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      calendarDays.push({
        day: i,
        date: currentDate.date(i),
        isCurrentMonth: true,
      });
    }

    // Trailing days from next month
    const totalCells = 42; // 6 weeks * 7 days
    const remaining = totalCells - calendarDays.length;

    for (let i = 1; i <= remaining; i++) {
      calendarDays.push({
        day: i,
        date: nextMonth.date(i),
        isCurrentMonth: false,
      });
    }

    return calendarDays;
  };

  return (
    <div className="bg-lightCard p-4 rounded-2xl shadow-xl w-full max-w-2xl">
      <CalendarHeader date={currentDate} onPrev={prevMonth} onNext={nextMonth} />
      <div className="grid grid-cols-7 text-center mt-4 text-sm font-medium text-gray-500">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 mt-2 gap-y-2">
        {generateCalendarDays().map((info, i) => (
          <Day
            key={i}
            day={info.day}
            date={info.date}
            isCurrentMonth={info.isCurrentMonth}
            events={events}
            onAddEvent={handleAddEvent}
          />
        ))}
      </div>
    </div>
  );
};

export default Calendar;
