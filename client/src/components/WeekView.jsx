"use client"

import React from "react"
import { useCalendar } from "../context/CalendarContext"
import { getWeekDays, startOfWeek, formatDate, isToday, isSameDay, getEventPosition } from "../utils/dateUtils"
import "../styles/WeekView.css"

export default function WeekView() {
  const { currentDate, selectedDate, events, categories, filterCategory, searchTerm, dispatch } = useCalendar()

  const weekStart = startOfWeek(currentDate)
  const weekDays = getWeekDays(weekStart)
  const timeSlots = Array.from({ length: 24 }, (_, i) => i)

  const getEventsForDay = (date) => {
    let dayEvents = events.filter((event) => isSameDay(event.date, date))

    if (filterCategory !== "all") {
      dayEvents = dayEvents.filter((event) => event.category === filterCategory)
    }

    if (searchTerm) {
      dayEvents = dayEvents.filter(
        (event) =>
          event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (event.description && event.description.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    return dayEvents.sort((a, b) => a.date - b.date)
  }

  const handleEventClick = (event) => {
    dispatch({ type: "SET_SELECTED_EVENT", payload: event })
    dispatch({ type: "TOGGLE_EVENT_MODAL" })
  }

  const getCategoryColor = (categoryId) => {
    const category = categories.find((c) => c.id === categoryId)
    return category ? category.color : "#6b7280"
  }

  return (
    <div className="week-view-container">
      {/* Week header */}
      <div className="week-header">
        <div className="week-header-time"></div>
        {weekDays.map((day) => (
          <div key={day.toISOString()} className="week-header-day">
            <div className="week-header-day-name">{formatDate(day, "ddd")}</div>
            <div className={`week-header-day-number ${isToday(day) ? "today" : ""}`}>{day.getDate()}</div>
          </div>
        ))}
      </div>

      {/* Time grid */}
      <div className="week-grid">
        {timeSlots.map((hour) => (
          <React.Fragment key={hour}>
            <div className="time-slot">
              {hour === 0 ? "12 AM" : hour < 12 ? `${hour} AM` : hour === 12 ? "12 PM" : `${hour - 12} PM`}
            </div>
            {weekDays.map((day) => {
              const dayEvents = getEventsForDay(day).filter((event) => {
                const eventHour = event.date.getHours()
                return eventHour === hour
              })

              return (
                <div key={`${day.toISOString()}-${hour}`} className="day-column">
                  {dayEvents.map((event) => {
                    const position = getEventPosition(event)
                    return (
                      <div
                        key={event.id}
                        className="week-event"
                        style={{
                          backgroundColor: getCategoryColor(event.category),
                          top: `${position.top}%`,
                          height: `${Math.max(position.height, 10)}%`,
                        }}
                        onClick={() => handleEventClick(event)}
                        title={`${event.title} - ${formatDate(event.date, "h:mm A")}`}
                      >
                        <div className="week-event-title">{event.title}</div>
                        <div className="week-event-time">{formatDate(event.date, "h:mm A")}</div>
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
