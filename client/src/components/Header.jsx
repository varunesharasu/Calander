"use client"
import { Calendar, ChevronLeft, ChevronRight, Plus, Search, Settings, Bell } from "lucide-react"
import { useCalendar } from "../context/CalendarContext"
import { formatDate, addMonths, addWeeks, addDays } from "../utils/dateUtils"
import { useState, useEffect } from "react"
import "../styles/Header.css"

export default function Header() {
  const { view, currentDate, searchTerm, dispatch, notifications } = useCalendar()
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const handlePrevious = () => {
    let newDate
    switch (view) {
      case "month":
        newDate = addMonths(currentDate, -1)
        break
      case "week":
        newDate = addWeeks(currentDate, -1)
        break
      case "day":
        newDate = addDays(currentDate, -1)
        break
      default:
        newDate = currentDate
    }
    dispatch({ type: "SET_CURRENT_DATE", payload: newDate })
  }

  const handleNext = () => {
    let newDate
    switch (view) {
      case "month":
        newDate = addMonths(currentDate, 1)
        break
      case "week":
        newDate = addWeeks(currentDate, 1)
        break
      case "day":
        newDate = addDays(currentDate, 1)
        break
      default:
        newDate = currentDate
    }
    dispatch({ type: "SET_CURRENT_DATE", payload: newDate })
  }

  const handleToday = () => {
    const today = new Date()
    dispatch({ type: "SET_CURRENT_DATE", payload: today })
    dispatch({ type: "SET_SELECTED_DATE", payload: today })
  }

  const getDateTitle = () => {
    switch (view) {
      case "month":
        return formatDate(currentDate, "MMMM YYYY")
      case "week":
        return `Week of ${formatDate(currentDate, "MMM D, YYYY")}`
      case "day":
        return formatDate(currentDate, "dddd, MMMM D, YYYY")
      default:
        return formatDate(currentDate, "MMMM YYYY")
    }
  }

  const requestNotificationPermission = async () => {
    if ("Notification" in window && Notification.permission === "default") {
      await Notification.requestPermission()
    }
  }

  return (
    <div className="header-content">
      <div className="header-left">
        <div className="header-logo">
          <div className="header-logo-icon">
            <Calendar />
          </div>
          <div className="header-logo-text">
            <h1>ProCalendar</h1>
            <p>Professional Calendar Suite</p>
          </div>
        </div>

        <div className="header-nav">
          <button onClick={handleToday}>Today</button>
          <button className="nav-button" onClick={handlePrevious}>
            <ChevronLeft />
          </button>
          <button className="nav-button" onClick={handleNext}>
            <ChevronRight />
          </button>
          <div className="header-title">{getDateTitle()}</div>
        </div>
      </div>

      <div className="header-right">
        <div className="search-container">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => dispatch({ type: "SET_SEARCH_TERM", payload: e.target.value })}
            className="search-input"
          />
        </div>

        <div className="view-toggle">
          {["month", "week", "day"].map((viewType) => (
            <button
              key={viewType}
              onClick={() => dispatch({ type: "SET_VIEW", payload: viewType })}
              className={view === viewType ? "active" : ""}
            >
              {viewType.charAt(0).toUpperCase() + viewType.slice(1)}
            </button>
          ))}
        </div>

        <button
          onClick={requestNotificationPermission}
          className="nav-button"
          title="Enable notifications"
          style={{ position: "relative" }}
        >
          <Bell />
          {notifications.length > 0 && <span className="notification-badge">{notifications.length}</span>}
        </button>

        <button onClick={() => dispatch({ type: "TOGGLE_EVENT_MODAL" })} className="create-button">
          <Plus />
          Create Event
        </button>

        <button onClick={() => dispatch({ type: "TOGGLE_SETTINGS_MODAL" })} className="nav-button">
          <Settings />
        </button>
      </div>
    </div>
  )
}
