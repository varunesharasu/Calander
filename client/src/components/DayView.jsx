"use client"

import React from "react"
import { useCalendar } from "../context/CalendarContext"
import { formatDate, isToday, isSameDay, getEventPosition } from "../utils/dateUtils"
import { MapPin } from "lucide-react"
import "../styles/DayView.css"

export default function DayView() {
  const { currentDate, events, categories, filterCategory, searchTerm, dispatch } = useCalendar()

  const timeSlots = Array.from({ length: 24 }, (_, i) => i)

  const getEventsForDay = () => {
    let dayEvents = events.filter((event) => isSameDay(event.date, currentDate))

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

  const dayEvents = getEventsForDay()

  const handleEventClick = (event) => {
    dispatch({ type: "SET_SELECTED_EVENT", payload: event })
    dispatch({ type: "TOGGLE_EVENT_MODAL" })
  }

  const getCategoryColor = (categoryId) => {
    const category = categories.find((c) => c.id === categoryId)
    return category ? category.color : "#6b7280"
  }

  return (
    <div className="day-view-container">
      {/* Day header */}
      <div className="day-header">
        <h2 className="day-title">{formatDate(currentDate, "dddd, MMMM D, YYYY")}</h2>
        {isToday(currentDate) && <p className="day-subtitle">Today</p>}
      </div>

      {/* Events summary */}
      <div className="day-summary">
        <h3 className="day-summary-title">
          {dayEvents.length} event{dayEvents.length !== 1 ? "s" : ""} today
        </h3>
        {dayEvents.length > 0 && (
          <div className="day-summary-events">
            {dayEvents.slice(0, 3).map((event) => (
              <div key={event.id} className="day-summary-event">
                <div className="day-summary-dot" style={{ backgroundColor: getCategoryColor(event.category) }} />
                <span>{formatDate(event.date, "h:mm A")}</span>
                <span>{event.title}</span>
              </div>
            ))}
            {dayEvents.length > 3 && <p className="day-summary-more">+{dayEvents.length - 3} more events</p>}
          </div>
        )}
      </div>

      {/* Time grid */}
      <div className="day-grid">
        {timeSlots.map((hour) => (
          <React.Fragment key={hour}>
            <div className="day-time-slot">
              {hour === 0 ? "12 AM" : hour < 12 ? `${hour} AM` : hour === 12 ? "12 PM" : `${hour - 12} PM`}
            </div>
            <div className="day-content-slot">
              {dayEvents
                .filter((event) => event.date.getHours() === hour)
                .map((event) => {
                  const position = getEventPosition(event)
                  return (
                    <div
                      key={event.id}
                      className="day-event"
                      style={{
                        backgroundColor: getCategoryColor(event.category),
                        top: `${position.top}%`,
                        height: `${Math.max(position.height, 15)}%`,
                      }}
                      onClick={() => handleEventClick(event)}
                    >
                      <div className="day-event-title">{event.title}</div>
                      <div className="day-event-details">
                        <span>{formatDate(event.date, "h:mm A")}</span>
                        {event.location && (
                          <>
                            <MapPin />
                            <span>{event.location}</span>
                          </>
                        )}
                      </div>
                      {event.description && <div className="day-event-description">{event.description}</div>}
                    </div>
                  )
                })}
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
