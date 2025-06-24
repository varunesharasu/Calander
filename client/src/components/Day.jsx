import { useState } from "react";
import dayjs from "dayjs";
import EventModal from "./EventModal";

const Day = ({ day, date, isCurrentMonth, events, onAddEvent }) => {
  const [open, setOpen] = useState(false);
  const isToday = dayjs().isSame(date, "day");
  const formattedDate = date.format("YYYY-MM-DD");

  const baseStyle = isCurrentMonth ? "text-lightText" : "text-gray-400";

  return (
    <div className="h-20 p-1">
      <div
        onClick={() => setOpen(true)}
        className={`h-full w-full rounded-xl p-1 border ${isToday ? "border-primary bg-blue-50" : "border-lightBorder"} cursor-pointer hover:bg-blue-100 transition`}
      >
        <div className={`text-sm font-bold ${baseStyle}`}>{day}</div>
        {events[formattedDate]?.slice(0, 2).map((evt, i) => (
          <div key={i} className="text-xs bg-primary text-white rounded mt-1 px-1 truncate">
            {evt}
          </div>
        ))}
      </div>

      {open && (
        <EventModal
          date={formattedDate}
          onClose={() => setOpen(false)}
          onSave={onAddEvent}
        />
      )}
    </div>
  );
};

export default Day;
