"use client"

import { useEffect } from "react"
import { CalendarProvider, useCalendar } from "./context/CalendarContext"
import Header from "./components/Header"
import Sidebar from "./components/Sidebar"
import MonthView from "./components/MonthView"
import WeekView from "./components/WeekView"
import DayView from "./components/DayView"
import EventModal from "./components/EventModal"
import SettingsModal from "./components/SettingsModal"
import NotificationCenter from "./components/NotificationCenter"

import "./styles/global.css"
import "./styles/App.css"

function CalendarApp() {
  const { view } = useCalendar()

  // Request notification permission on app load
  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission()
    }
  }, [])

  const renderView = () => {
    switch (view) {
      case "month":
        return <MonthView />
      case "week":
        return <WeekView />
      case "day":
        return <DayView />
      default:
        return <MonthView />
    }
  }

  return (
    <div className="app-container">
      <div className="app-header">
        <Header />
      </div>
      <div className="app-body">
        <div className="app-sidebar">
          <Sidebar />
        </div>
        <div className="app-main">{renderView()}</div>
      </div>
      <EventModal />
      <SettingsModal />
      <NotificationCenter />
    </div>
  )
}

export default function App() {
  return (
    <CalendarProvider>
      <CalendarApp />
    </CalendarProvider>
  )
}
