"use client"
import { X, Bell, CheckCircle, AlertCircle, Info } from "lucide-react"
import { useCalendar } from "../context/CalendarContext"
import "../styles/NotificationCenter.css"

export default function NotificationCenter() {
  const { notifications, dispatch } = useCalendar()

  const handleDismiss = (id) => {
    dispatch({ type: "REMOVE_NOTIFICATION", payload: id })
  }

  const getNotificationIcon = (type) => {
    switch (type) {
      case "success":
        return <CheckCircle className="notification-icon success" />
      case "error":
        return <AlertCircle className="notification-icon error" />
      case "reminder":
        return <Bell className="notification-icon reminder" />
      default:
        return <Info className="notification-icon info" />
    }
  }

  if (notifications.length === 0) return null

  return (
    <div className="notification-container">
      {notifications.map((notification) => (
        <div key={notification.id} className="notification animate-slideInRight">
          <div className="notification-content">
            {getNotificationIcon(notification.type)}
            <div className="notification-body">
              <h4 className="notification-title">{notification.title}</h4>
              <p className="notification-message">{notification.message}</p>
            </div>
            <button onClick={() => handleDismiss(notification.id)} className="notification-close">
              <X />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
