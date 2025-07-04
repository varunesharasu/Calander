"use client"
import { ChevronLeft, ChevronRight, CalendarIcon } from "lucide-react"
import { useState } from "react"
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
  const [isTransitioning, setIsTransitioning] = useState(false)

  const daysInMonth = getDaysInMonth(currentDate)
  const firstDayOfMonth = getFirstDayOfMonth(currentDate)

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
  const remainingDays = 42 - calendarDays.length

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

  const handleMonthChange = (direction) => {
    setIsTransitioning(true)
    setTimeout(() => {
      if (direction === "prev") {
        onCurrentDateChange(subMonths(currentDate, 1))
      } else {
        onCurrentDateChange(addMonths(currentDate, 1))
      }
      setIsTransitioning(false)
    }, 150)
  }

  const handleDateClick = (date) => {
    onDateSelect(date)
  }

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  return (
    <div className="p-8">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => handleMonthChange("prev")}
          className="group p-3 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 rounded-xl transition-all duration-300 ease-out hover:scale-110 hover:shadow-lg border border-transparent hover:border-blue-200/50"
          aria-label="Previous month"
        >
          <ChevronLeft className="w-6 h-6 text-slate-600 group-hover:text-blue-600 transition-colors duration-300" />
        </button>

        <div className="text-center">
          <h2
            className={`text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent transition-all duration-300 ${isTransitioning ? "opacity-50 scale-95" : "opacity-100 scale-100"}`}
          >
            {formatMonthYear(currentDate)}
          </h2>
          <div className="flex items-center justify-center mt-2 space-x-2">
            <CalendarIcon className="w-4 h-4 text-slate-400" />
            <span className="text-sm text-slate-500 font-medium">{currentDate.getFullYear()}</span>
          </div>
        </div>

        <button
          onClick={() => handleMonthChange("next")}
          className="group p-3 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 rounded-xl transition-all duration-300 ease-out hover:scale-110 hover:shadow-lg border border-transparent hover:border-blue-200/50"
          aria-label="Next month"
        >
          <ChevronRight className="w-6 h-6 text-slate-600 group-hover:text-blue-600 transition-colors duration-300" />
        </button>
      </div>

      {/* Week Days Header */}
      <div className="grid grid-cols-7 gap-2 mb-4">
        {weekDays.map((day) => (
          <div key={day} className="h-12 flex items-center justify-center">
            <span className="text-sm font-semibold text-slate-500 bg-gradient-to-r from-slate-100 to-blue-50 px-3 py-2 rounded-lg border border-slate-200/50">
              {day}
            </span>
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div
        className={`calendar-grid grid grid-cols-7 gap-2 ${isTransitioning ? "opacity-50 scale-98" : "opacity-100 scale-100"} transition-all duration-300`}
      >
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
              style={{ animationDelay: `${index * 0.01}s` }}
              aria-label={`Select ${date.toLocaleDateString()}`}
            >
              <span className="relative z-10">{day}</span>
            </button>
          )
        })}
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex justify-center space-x-4">
        <button
          onClick={() => {
            const today = new Date()
            onCurrentDateChange(today)
            onDateSelect(today)
          }}
          className="btn-primary"
        >
          <CalendarIcon className="w-4 h-4 mr-2" />
          Today
        </button>

        <button className="btn-secondary">
          <span className="mr-2">📊</span>
          View Stats
        </button>
      </div>
    </div>
  )
}

export default Calendar
