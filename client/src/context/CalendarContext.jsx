"use client"

import { createContext, useContext, useReducer, useEffect } from "react"
import { generateRecurringEvents } from "../utils/dateUtils"

const CalendarContext = createContext()

const initialState = {
  events: [],
  view: "month", // month, week, day
  currentDate: new Date(),
  selectedDate: new Date(),
  selectedEvent: null,
  showEventModal: false,
  showSettingsModal: false,
  searchTerm: "",
  filterCategory: "all",
  categories: [
    { id: "personal", name: "Personal", color: "#3b82f6" },
    { id: "work", name: "Work", color: "#10b981" },
    { id: "health", name: "Health", color: "#ef4444" },
    { id: "social", name: "Social", color: "#8b5cf6" },
    { id: "travel", name: "Travel", color: "#f59e0b" },
    { id: "education", name: "Education", color: "#6366f1" },
  ],
  settings: {
    weekStartsOn: 0, // 0 = Sunday, 1 = Monday
    timeFormat: "12", // 12 or 24
    notifications: true,
    theme: "light", // Changed default to light theme
  },
  notifications: [],
}

function calendarReducer(state, action) {
  switch (action.type) {
    case "SET_VIEW":
      return { ...state, view: action.payload }

    case "SET_CURRENT_DATE":
      return { ...state, currentDate: action.payload }

    case "SET_SELECTED_DATE":
      return { ...state, selectedDate: action.payload }

    case "SET_EVENTS":
      return { ...state, events: action.payload }

    case "ADD_EVENT":
      const newEvents = [...state.events]
      if (action.payload.recurring && action.payload.recurring !== "none") {
        const recurringEvents = generateRecurringEvents(
          action.payload,
          new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
        )
        newEvents.push(...recurringEvents)
      } else {
        newEvents.push(action.payload)
      }
      return { ...state, events: newEvents }

    case "UPDATE_EVENT":
      return {
        ...state,
        events: state.events.map((event) => (event.id === action.payload.id ? action.payload : event)),
      }

    case "DELETE_EVENT":
      return {
        ...state,
        events: state.events.filter((event) => event.id !== action.payload),
      }

    case "SET_SELECTED_EVENT":
      return { ...state, selectedEvent: action.payload }

    case "TOGGLE_EVENT_MODAL":
      return { ...state, showEventModal: !state.showEventModal }

    case "TOGGLE_SETTINGS_MODAL":
      return { ...state, showSettingsModal: !state.showSettingsModal }

    case "SET_SEARCH_TERM":
      return { ...state, searchTerm: action.payload }

    case "SET_FILTER_CATEGORY":
      return { ...state, filterCategory: action.payload }

    case "ADD_CATEGORY":
      return {
        ...state,
        categories: [...state.categories, action.payload],
      }

    case "UPDATE_SETTINGS":
      return {
        ...state,
        settings: { ...state.settings, ...action.payload },
      }

    case "ADD_NOTIFICATION":
      return {
        ...state,
        notifications: [...state.notifications, action.payload],
      }

    case "REMOVE_NOTIFICATION":
      return {
        ...state,
        notifications: state.notifications.filter((n) => n.id !== action.payload),
      }

    default:
      return state
  }
}

export function CalendarProvider({ children }) {
  const [state, dispatch] = useReducer(calendarReducer, initialState)

  // Load data from localStorage on mount
  useEffect(() => {
    try {
      const savedEvents = localStorage.getItem("calendar-events")
      const savedSettings = localStorage.getItem("calendar-settings")
      const savedCategories = localStorage.getItem("calendar-categories")

      if (savedEvents) {
        const events = JSON.parse(savedEvents).map((event) => ({
          ...event,
          date: new Date(event.date),
          endDate: event.endDate ? new Date(event.endDate) : null,
        }))
        dispatch({ type: "SET_EVENTS", payload: events })
      }

      if (savedSettings) {
        const settings = JSON.parse(savedSettings)
        dispatch({ type: "UPDATE_SETTINGS", payload: settings })
      }

      if (savedCategories) {
        const categories = JSON.parse(savedCategories)
        dispatch({ type: "SET_CATEGORIES", payload: categories })
      }
    } catch (error) {
      console.error("Error loading data from localStorage:", error)
    }
  }, [])

  // Save data to localStorage when state changes
  useEffect(() => {
    try {
      localStorage.setItem("calendar-events", JSON.stringify(state.events))
    } catch (error) {
      console.error("Error saving events to localStorage:", error)
    }
  }, [state.events])

  useEffect(() => {
    try {
      localStorage.setItem("calendar-settings", JSON.stringify(state.settings))
    } catch (error) {
      console.error("Error saving settings to localStorage:", error)
    }
  }, [state.settings])

  useEffect(() => {
    try {
      localStorage.setItem("calendar-categories", JSON.stringify(state.categories))
    } catch (error) {
      console.error("Error saving categories to localStorage:", error)
    }
  }, [state.categories])

  // Theme management
  useEffect(() => {
    const applyTheme = (theme) => {
      const root = document.documentElement

      if (theme === "system") {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
        root.setAttribute("data-theme", prefersDark ? "dark" : "light")
      } else {
        root.setAttribute("data-theme", theme)
      }
    }

    applyTheme(state.settings.theme)

    // Listen for system theme changes
    if (state.settings.theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
      const handleChange = () => applyTheme("system")
      mediaQuery.addEventListener("change", handleChange)
      return () => mediaQuery.removeEventListener("change", handleChange)
    }
  }, [state.settings.theme])

  // Notification system
  useEffect(() => {
    if (!state.settings.notifications) return

    const checkReminders = () => {
      const now = new Date()
      state.events.forEach((event) => {
        if (event.reminder && event.reminder !== "none") {
          const reminderTime = new Date(event.date.getTime() - Number.parseInt(event.reminder) * 60000)
          if (now >= reminderTime && now < new Date(reminderTime.getTime() + 60000)) {
            showNotification(event)
          }
        }
      })
    }

    const interval = setInterval(checkReminders, 60000) // Check every minute
    return () => clearInterval(interval)
  }, [state.events, state.settings.notifications])

  const showNotification = (event) => {
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification(`Upcoming Event: ${event.title}`, {
        body: event.description || `Event starts at ${event.date.toLocaleTimeString()}`,
        icon: "/calendar-icon.png",
      })
    }

    const notification = {
      id: Date.now(),
      title: event.title,
      message: `Event starts at ${event.date.toLocaleTimeString()}`,
      type: "reminder",
    }

    dispatch({ type: "ADD_NOTIFICATION", payload: notification })

    // Auto-remove notification after 5 seconds
    setTimeout(() => {
      dispatch({ type: "REMOVE_NOTIFICATION", payload: notification.id })
    }, 5000)
  }

  // Check if event can be deleted (not within 30 minutes)
  const canDeleteEvent = (event) => {
    const now = new Date()
    const eventTime = new Date(event.date)
    const timeDifference = eventTime.getTime() - now.getTime()
    const minutesDifference = timeDifference / (1000 * 60)

    return minutesDifference > 30 || minutesDifference < 0 // Can delete if more than 30 minutes away or already passed
  }

  // Check if event time is in the past
  const isEventTimeInPast = (eventDate, eventTime) => {
    const now = new Date()
    const eventDateTime = new Date(`${eventDate}T${eventTime}`)
    return eventDateTime < now
  }

  const value = {
    ...state,
    dispatch,
    showNotification,
    canDeleteEvent,
    isEventTimeInPast,
  }

  return <CalendarContext.Provider value={value}>{children}</CalendarContext.Provider>
}

export function useCalendar() {
  const context = useContext(CalendarContext)
  if (!context) {
    throw new Error("useCalendar must be used within a CalendarProvider")
  }
  return context
}
