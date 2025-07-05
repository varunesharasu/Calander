"use client"
import { useCalendar } from "../context/CalendarContext"
import { getMonthCalendarDays, formatDate, isToday, isSameDay } from "../utils/dateUtils"
import { Plus } from "lucide-react"
import "../styles/MonthView.css"

export default function MonthView() {
  const { currentDate, selectedDate, events, categories, filterCategory, searchTerm, dispatch } = useCalendar()

  const calendarDays = getMonthCalendarDays(currentDate)
  const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

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

  const handleDayClick = (date) => {
    dispatch({ type: "SET_SELECTED_DATE", payload: date })
  }

  const handleEventClick = (event, e) => {
    e.stopPropagation()
    dispatch({ type: "SET_SELECTED_EVENT", payload: event })
    dispatch({ type: "TOGGLE_EVENT_MODAL" })
  }

  const handleAddEvent = (date, e) => {
    e.stopPropagation()
    dispatch({ type: "SET_SELECTED_DATE", payload: date })
    dispatch({ type: "SET_SELECTED_EVENT", payload: null })
    dispatch({ type: "TOGGLE_EVENT_MODAL" })
  }

  const getCategoryColor = (categoryId) => {
    const category = categories.find((c) => c.id === categoryId)
    return category ? category.color : "#6b7280"
  }

  const isOtherMonth = (date) => {
    return date.getMonth() !== currentDate.getMonth()
  }

  return (
    <div className="calendar-container">
      <div className="calendar-card">
        {/* Week day headers */}
        <div className="calendar-header">
          {weekDays.map((day) => (
            <div key={day} className="calendar-header-day">
              <div className="hidden md:block">{day}</div>
              <div className="md:hidden">{day.slice(0, 3)}</div>
            </div>
          ))}
        </div>

        {/* Calendar days grid */}
        <div className="calendar-grid">
          {calendarDays.map((date, index) => {
            const dayEvents = getEventsForDay(date)
            const isCurrentDay = isToday(date)
            const isSelected = isSameDay(date, selectedDate)
            const isOtherMonthDay = isOtherMonth(date)

            return (
              <div
                key={index}
                className={`
                  calendar-day
                  ${isOtherMonthDay ? "other-month" : ""}
                  ${isCurrentDay ? "today" : ""}
                  ${isSelected ? "selected" : ""}
                `}
                onClick={() => handleDayClick(date)}
              >
                {/* Day header */}
                <div className="calendar-day-header">
                  <div className="calendar-day-number">{date.getDate()}</div>
                  <div className="calendar-day-actions">
                    {dayEvents.length > 3 && <span className="day-event-count">+{dayEvents.length - 3}</span>}
                    <button onClick={(e) => handleAddEvent(date, e)} className="add-event-button" title="Add event">
                      <Plus />
                    </button>
                  </div>
                </div>

                {/* Events */}
                <div className="calendar-events">
                  {dayEvents.slice(0, 3).map((event) => (
                    <div
                      key={event.id}
                      className="calendar-event"
                      style={{ backgroundColor: getCategoryColor(event.category) }}
                      onClick={(e) => handleEventClick(event, e)}
                      title={`${event.title} - ${formatDate(event.date, "h:mm A")}`}
                    >
                      {event.title}
                      {event.isRecurring && " ↻"}
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
