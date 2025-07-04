// Get number of days in a month
export const getDaysInMonth = (date) => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
}

// Get the first day of the month (0 = Sunday, 1 = Monday, etc.)
export const getFirstDayOfMonth = (date) => {
  return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
}

// Check if two dates are the same day
export const isSameDay = (date1, date2) => {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  )
}

// Check if a date is today
export const isToday = (date) => {
  const today = new Date()
  return isSameDay(date, today)
}

// Format month and year for display
export const formatMonthYear = (date) => {
  return date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  })
}

// Add months to a date
export const addMonths = (date, months) => {
  const newDate = new Date(date)
  newDate.setMonth(newDate.getMonth() + months)
  return newDate
}

// Subtract months from a date
export const subMonths = (date, months) => {
  const newDate = new Date(date)
  newDate.setMonth(newDate.getMonth() - months)
  return newDate
}

// Get week number of the year
export const getWeekNumber = (date) => {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1)
  const pastDaysOfYear = (date - firstDayOfYear) / 86400000
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7)
}

// Check if a year is a leap year
export const isLeapYear = (year) => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
}
