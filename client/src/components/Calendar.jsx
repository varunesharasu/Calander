"use client"
import { ChevronLeft, ChevronRight } from "lucide-react"
import {
  getDaysInMonth,
  getFirstDayOfMonth,
  isSameDay,
  isToday,
  formatMonthYear,
  addMonths,
  subMonths,
} from "../utils/dateUtils"

const Calendar = ({ selectedDate, onDateSelect, currentDate, onCurrentDateChange }) => {
  const daysInMonth = getDaysInMonth(currentDate)
  const firstDayOfMonth = getFirstDayOfMonth(currentDate)
  const today = new Date()

  // Generate calendar days
  const calendarDays = []

  // Previous month's trailing days
  const prevMonth = subMonths(currentDate, 1)
  const daysInPrevMonth = getDaysInMonth(prevMonth)

  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    const day = daysInPrevMonth - i
    const date = new Date(prevMonth.getFullYear(), prevMonth.getMonth(), day)
    calendarDays.push({
      date,
      day,
      isCurrentMonth: false,
      isToday: isToday(date),
      isSelected: selectedDate && isSameDay(date, selectedDate),
    })
  }

  // Current month days
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    calendarDays.push({
      date,
      day,
      isCurrentMonth: true,
      isToday: isToday(date),
      isSelected: selectedDate && isSameDay(date, selectedDate),
    })
  }

  // Next month's leading days
  const nextMonth = addMonths(currentDate, 1)
  const remainingDays = 42 - calendarDays.length // 6 rows × 7 days

  for (let day = 1; day <= remainingDays; day++) {
    const date = new Date(nextMonth.getFullYear(), nextMonth.getMonth(), day)
    calendarDays.push({
      date,
      day,
      isCurrentMonth: false,
      isToday: isToday(date),
      isSelected: selectedDate && isSameDay(date, selectedDate),
    })
  }

  const handlePrevMonth = () => {
    onCurrentDateChange(subMonths(currentDate, 1))
  }

  const handleNextMonth = () => {
    onCurrentDateChange(addMonths(currentDate, 1))
  }

  const handleDateClick = (date) => {
    onDateSelect(date)
  }

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  return (
    <div className="p-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={handlePrevMonth}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          aria-label="Previous month"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>

        <h2 className="text-xl font-semibold text-gray-900">{formatMonthYear(currentDate)}</h2>

        <button
          onClick={handleNextMonth}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          aria-label="Next month"
        >
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Week Days Header */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((day) => (
          <div key={day} className="h-10 flex items-center justify-center text-sm font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((calendarDay, index) => {
          const { date, day, isCurrentMonth, isToday: isDayToday, isSelected } = calendarDay

          let dayClasses = "calendar-day"

          if (isDayToday) {
            dayClasses += " today"
          } else if (isSelected) {
            dayClasses += " selected"
          } else if (!isCurrentMonth) {
            dayClasses += " other-month"
          }

          return (
            <button
              key={index}
              onClick={() => handleDateClick(date)}
              className={dayClasses}
              aria-label={`Select ${date.toLocaleDateString()}`}
            >
              {day}
            </button>
          )
        })}
      </div>

      {/* Today Button */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={() => {
            const today = new Date()
            onCurrentDateChange(today)
            onDateSelect(today)
          }}
          className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors duration-200 text-sm font-medium"
        >
          Go to Today
        </button>
      </div>
    </div>
  )
}

export default Calendar
