import { useState } from 'react';
import dayjs from 'dayjs';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());

  const startOfMonth = currentDate.startOf('month');
  const endOfMonth = currentDate.endOf('month');
  const startDay = startOfMonth.day();
  const daysInMonth = currentDate.daysInMonth();

  const days = [];
  for (let i = 0; i < startDay; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const prevMonth = () => setCurrentDate(currentDate.subtract(1, 'month'));
  const nextMonth = () => setCurrentDate(currentDate.add(1, 'month'));

  return (
    <div className="bg-white p-4 rounded-2xl shadow-lg w-full max-w-md">
      <div className="flex justify-between items-center mb-4">
        <button onClick={prevMonth} className="text-lg font-bold">&lt;</button>
        <h2 className="text-xl font-bold">
          {currentDate.format('MMMM YYYY')}
        </h2>
        <button onClick={nextMonth} className="text-lg font-bold">&gt;</button>
      </div>
      <div className="grid grid-cols-7 gap-2 text-center font-semibold text-gray-600">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day}>{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2 mt-2 text-center">
        {days.map((day, idx) => (
          <div key={idx} className="h-10 flex items-center justify-center">
            {day ? (
              <div className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-blue-100 cursor-pointer">
                {day}
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
