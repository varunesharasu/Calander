// Simple date utilities without dayjs for now
export const getDaysInMonth = (date) => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
}

export const getFirstDayOfMonth = (date) => {
  return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
}

export const isSameDay = (date1, date2) => {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  )
}

export const isToday = (date) => {
  const today = new Date()
  return isSameDay(date, today)
}

export const formatMonthYear = (date) => {
  return date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  })
}

export const addMonths = (date, months) => {
  const newDate = new Date(date)
  newDate.setMonth(newDate.getMonth() + months)
  return newDate
}

export const subMonths = (date, months) => {
  const newDate = new Date(date)
  newDate.setMonth(newDate.getMonth() - months)
  return newDate
}

export const getWeekNumber = (date) => {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1)
  const pastDaysOfYear = (date - firstDayOfYear) / 86400000
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7)
}

export const getDayOfYear = (date) => {
  const start = new Date(date.getFullYear(), 0, 0)
  const diff = date - start
  const oneDay = 1000 * 60 * 60 * 24
  return Math.floor(diff / oneDay)
}

export const getQuarter = (date) => {
  return Math.ceil((date.getMonth() + 1) / 3)
}

export const isLeapYear = (year) => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
}

export const formatDate = (date, options = {}) => {
  const defaultOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }
  return date.toLocaleDateString("en-US", { ...defaultOptions, ...options })
}

export const formatTime = (date) => {
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })
}

export const getRelativeTime = (date) => {
  const now = new Date()
  const diffTime = date - now
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return "Today"
  if (diffDays === 1) return "Tomorrow"
  if (diffDays === -1) return "Yesterday"
  if (diffDays > 0) return `In ${diffDays} days`
  return `${Math.abs(diffDays)} days ago`
}

export const getHoursArray = () => {
  const hours = []
  for (let i = 0; i < 24; i++) {
    const date = new Date()
    date.setHours(i, 0, 0, 0)
    hours.push({
      hour: i,
      display: date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }),
      display24: String(i).padStart(2, "0") + ":00",
    })
  }
  return hours
}

export const getTimeSlots = () => {
  const slots = []
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const date = new Date()
      date.setHours(hour, minute, 0, 0)
      slots.push({
        time: String(hour).padStart(2, "0") + ":" + String(minute).padStart(2, "0"),
        display: date.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }),
        value: hour * 60 + minute,
      })
    }
  }
  return slots
}

export const sortEventsByTime = (events) => {
  return events.sort((a, b) => new Date(a.date) - new Date(b.date))
}
