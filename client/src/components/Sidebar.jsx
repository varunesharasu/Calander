"use client"
import { useCalendar } from "../context/CalendarContext"
import { formatDate, isToday } from "../utils/dateUtils"
import { TrendingUp, Calendar, Users, Clock } from "lucide-react"
import "../styles/Sidebar.css"

export default function Sidebar() {
  const { categories, filterCategory, events, dispatch } = useCalendar()

  const todayEvents = events.filter((event) => isToday(event.date))
  const upcomingEvents = events
    .filter((event) => event.date > new Date())
    .sort((a, b) => a.date - b.date)
    .slice(0, 5)

  const getEventsByCategory = () => {
    const eventsByCategory = {}
    categories.forEach((category) => {
      eventsByCategory[category.id] = events.filter((event) => event.category === category.id).length
    })
    return eventsByCategory
  }

  const eventsByCategory = getEventsByCategory()

  return (
    <div className="sidebar-content">
      {/* Categories Section */}
      <div className="sidebar-section">
        <div className="sidebar-section-title">
          <TrendingUp className="sidebar-section-icon" />
          Categories
        </div>

        <div className="category-list">
          <button
            onClick={() => dispatch({ type: "SET_FILTER_CATEGORY", payload: "all" })}
            className={`category-item ${filterCategory === "all" ? "active" : ""}`}
          >
            <div className="category-item-left">
              <div className="category-dot" style={{ background: "linear-gradient(135deg, #3b82f6, #8b5cf6)" }} />
              <span className="category-name">All Events</span>
            </div>
            <span className="category-count">{events.length}</span>
          </button>

          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => dispatch({ type: "SET_FILTER_CATEGORY", payload: category.id })}
              className={`category-item ${filterCategory === category.id ? "active" : ""}`}
            >
              <div className="category-item-left">
                <div className="category-dot" style={{ backgroundColor: category.color }} />
                <span className="category-name">{category.name}</span>
              </div>
              <span className="category-count">{eventsByCategory[category.id] || 0}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Today's Events */}
      <div className="sidebar-section">
        <div className="sidebar-section-title">
          <Calendar className="sidebar-section-icon" />
          Today's Events
        </div>

        {todayEvents.length > 0 ? (
          <div className="event-list">
            {todayEvents.map((event) => (
              <div
                key={event.id}
                className="event-item"
                onClick={() => {
                  dispatch({ type: "SET_SELECTED_EVENT", payload: event })
                  dispatch({ type: "TOGGLE_EVENT_MODAL" })
                }}
              >
                <div className="event-item-content">
                  <div
                    className="event-item-dot"
                    style={{ backgroundColor: categories.find((c) => c.id === event.category)?.color }}
                  />
                  <div className="event-item-details">
                    <p className="event-item-title">{event.title}</p>
                    <p className="event-item-time">
                      <Clock />
                      {formatDate(event.date, "h:mm A")}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <Calendar className="empty-state-icon" />
            <p className="empty-state-text">No events today</p>
          </div>
        )}
      </div>

      {/* Upcoming Events */}
      <div className="sidebar-section">
        <div className="sidebar-section-title">
          <Users className="sidebar-section-icon" />
          Upcoming
        </div>

        {upcomingEvents.length > 0 ? (
          <div className="event-list">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="event-item"
                onClick={() => {
                  dispatch({ type: "SET_SELECTED_EVENT", payload: event })
                  dispatch({ type: "TOGGLE_EVENT_MODAL" })
                }}
              >
                <div className="event-item-content">
                  <div
                    className="event-item-dot"
                    style={{ backgroundColor: categories.find((c) => c.id === event.category)?.color }}
                  />
                  <div className="event-item-details">
                    <p className="event-item-title">{event.title}</p>
                    <p className="event-item-time">
                      <Clock />
                      {formatDate(event.date, "MMM D, h:mm A")}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <Users className="empty-state-icon" />
            <p className="empty-state-text">No upcoming events</p>
          </div>
        )}
      </div>
    </div>
  )
}
