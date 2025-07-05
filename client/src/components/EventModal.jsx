"use client"

import { useState, useEffect } from "react"
import { X, Calendar, Clock, Tag, MapPin, Users, Bell, Repeat, Trash2, Save, AlertTriangle } from "lucide-react"
import { useCalendar } from "../context/CalendarContext"
import { formatDate, getTimeSlots } from "../utils/dateUtils"
import "../styles/EventModal.css"

export default function EventModal() {
  const { showEventModal, selectedEvent, selectedDate, categories, dispatch, canDeleteEvent, isEventTimeInPast } =
    useCalendar()

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "09:00",
    endTime: "10:00",
    category: "personal",
    location: "",
    attendees: "",
    reminder: "15",
    recurring: "none",
    allDay: false,
  })

  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (selectedEvent) {
      setFormData({
        title: selectedEvent.title || "",
        description: selectedEvent.description || "",
        date: formatDate(selectedEvent.date, "YYYY-MM-DD"),
        time: formatDate(selectedEvent.date, "HH:mm"),
        endTime: selectedEvent.endDate ? formatDate(selectedEvent.endDate, "HH:mm") : "10:00",
        category: selectedEvent.category || "personal",
        location: selectedEvent.location || "",
        attendees: selectedEvent.attendees || "",
        reminder: selectedEvent.reminder || "15",
        recurring: selectedEvent.recurring || "none",
        allDay: selectedEvent.allDay || false,
      })
    } else if (selectedDate) {
      setFormData((prev) => ({
        ...prev,
        date: formatDate(selectedDate, "YYYY-MM-DD"),
      }))
    }
  }, [selectedEvent, selectedDate])

  const timeSlots = getTimeSlots()

  const validateForm = () => {
    const newErrors = {}

    if (!formData.title.trim()) {
      newErrors.title = "Title is required"
    }

    if (!formData.date) {
      newErrors.date = "Date is required"
    }

    if (!formData.allDay && formData.time >= formData.endTime) {
      newErrors.endTime = "End time must be after start time"
    }

    // Check if event time is in the past
    if (!formData.allDay && isEventTimeInPast(formData.date, formData.time)) {
      newErrors.time = "Cannot create events in the past"
    }

    // For all-day events, check if the date is in the past
    if (formData.allDay) {
      const eventDate = new Date(formData.date)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      eventDate.setHours(0, 0, 0, 0)

      if (eventDate < today) {
        newErrors.date = "Cannot create events in the past"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    if (!validateForm()) {
      setIsLoading(false)
      return
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const eventDate = new Date(`${formData.date}T${formData.time}`)
    const endDate = new Date(`${formData.date}T${formData.endTime}`)

    const eventData = {
      id: selectedEvent?.id || Date.now().toString(),
      title: formData.title,
      description: formData.description,
      date: eventDate,
      endDate: formData.allDay ? null : endDate,
      category: formData.category,
      location: formData.location,
      attendees: formData.attendees,
      reminder: formData.reminder,
      recurring: formData.recurring,
      allDay: formData.allDay,
      duration: formData.allDay ? null : (endDate - eventDate) / (1000 * 60),
    }

    if (selectedEvent) {
      dispatch({ type: "UPDATE_EVENT", payload: eventData })
    } else {
      dispatch({ type: "ADD_EVENT", payload: eventData })
    }

    setIsLoading(false)
    handleClose()
  }

  const handleDelete = async () => {
    if (!selectedEvent) return

    if (!canDeleteEvent(selectedEvent)) {
      alert("Cannot delete event within 30 minutes of start time!")
      return
    }

    if (window.confirm("Are you sure you want to delete this event?")) {
      setIsLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 500))
      dispatch({ type: "DELETE_EVENT", payload: selectedEvent.id })
      setIsLoading(false)
      handleClose()
    }
  }

  const handleClose = () => {
    dispatch({ type: "TOGGLE_EVENT_MODAL" })
    dispatch({ type: "SET_SELECTED_EVENT", payload: null })
    setFormData({
      title: "",
      description: "",
      date: "",
      time: "09:00",
      endTime: "10:00",
      category: "personal",
      location: "",
      attendees: "",
      reminder: "15",
      recurring: "none",
      allDay: false,
    })
    setErrors({})
  }

  const getTimeUntilEvent = () => {
    if (!selectedEvent) return null
    const now = new Date()
    const eventTime = new Date(selectedEvent.date)
    const timeDifference = eventTime.getTime() - now.getTime()
    const minutesDifference = Math.floor(timeDifference / (1000 * 60))

    if (minutesDifference <= 30 && minutesDifference > 0) {
      return minutesDifference
    }
    return null
  }

  const minutesUntilEvent = getTimeUntilEvent()

  if (!showEventModal) return null

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div className="modal-header-content">
            <div className="modal-header-info">
              <div className="modal-icon">
                <Calendar />
              </div>
              <div className="modal-title-section">
                <h2>{selectedEvent ? "Edit Event" : "Create New Event"}</h2>
                <p>Fill in the details for your event</p>
              </div>
            </div>
            <button onClick={handleClose} className="modal-close">
              <X />
            </button>
          </div>
        </div>

        {/* Delete Warning */}
        {selectedEvent && minutesUntilEvent !== null && (
          <div className="delete-warning">
            <AlertTriangle />
            <span>Cannot delete event within 30 minutes of start time ({minutesUntilEvent} minutes remaining)</span>
          </div>
        )}

        {/* Past Time Warning */}
        {(errors.time || errors.date) &&
          (errors.time === "Cannot create events in the past" ||
            errors.date === "Cannot create events in the past") && (
            <div className="past-time-warning">
              <AlertTriangle />
              <span>Cannot create events in the past. Please select a future date and time.</span>
            </div>
          )}

        {/* Form */}
        <div className="modal-body">
          <form onSubmit={handleSubmit} className="modal-form">
            {/* Title */}
            <div className="form-group">
              <label className="form-label">Event Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                className={`form-input ${errors.title ? "error" : ""}`}
                placeholder="Enter event title..."
              />
              {errors.title && <p className="error-message">{errors.title}</p>}
            </div>

            {/* Description */}
            <div className="form-group">
              <label className="form-label-with-icon">
                <Tag />
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                className="form-input form-textarea"
                placeholder="Add event description..."
              />
            </div>

            {/* Date and All Day */}
            <div className="form-group-inline">
              <div className="form-group">
                <label className="form-label-with-icon">
                  <Calendar />
                  Date *
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
                  className={`form-input ${errors.date ? "error" : ""}`}
                />
                {errors.date && <p className="error-message">{errors.date}</p>}
              </div>

              <div className="form-group">
                <label className="form-label">All Day Event</label>
                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.allDay}
                      onChange={(e) => setFormData((prev) => ({ ...prev, allDay: e.target.checked }))}
                      className="checkbox-input"
                    />
                    <span className="checkbox-text">This is an all-day event</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Time Selection */}
            {!formData.allDay && (
              <div className="form-group-inline">
                <div className="form-group">
                  <label className="form-label-with-icon">
                    <Clock />
                    Start Time
                  </label>
                  <select
                    value={formData.time}
                    onChange={(e) => setFormData((prev) => ({ ...prev, time: e.target.value }))}
                    className={`form-input ${errors.time ? "error" : ""}`}
                  >
                    {timeSlots.map((slot) => (
                      <option key={slot.time} value={slot.time}>
                        {slot.display}
                      </option>
                    ))}
                  </select>
                  {errors.time && <p className="error-message">{errors.time}</p>}
                </div>

                <div className="form-group">
                  <label className="form-label">End Time</label>
                  <select
                    value={formData.endTime}
                    onChange={(e) => setFormData((prev) => ({ ...prev, endTime: e.target.value }))}
                    className={`form-input ${errors.endTime ? "error" : ""}`}
                  >
                    {timeSlots.map((slot) => (
                      <option key={slot.time} value={slot.time}>
                        {slot.display}
                      </option>
                    ))}
                  </select>
                  {errors.endTime && <p className="error-message">{errors.endTime}</p>}
                </div>
              </div>
            )}

            {/* Category and Reminder */}
            <div className="form-group-inline">
              <div className="form-group">
                <label className="form-label-with-icon">
                  <Tag />
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
                  className="form-input"
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label-with-icon">
                  <Bell />
                  Reminder
                </label>
                <select
                  value={formData.reminder}
                  onChange={(e) => setFormData((prev) => ({ ...prev, reminder: e.target.value }))}
                  className="form-input"
                >
                  <option value="none">No reminder</option>
                  <option value="5">5 minutes before</option>
                  <option value="15">15 minutes before</option>
                  <option value="30">30 minutes before</option>
                  <option value="60">1 hour before</option>
                  <option value="1440">1 day before</option>
                </select>
              </div>
            </div>

            {/* Location and Attendees */}
            <div className="form-group-inline">
              <div className="form-group">
                <label className="form-label-with-icon">
                  <MapPin />
                  Location
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                  className="form-input"
                  placeholder="Enter location..."
                />
              </div>

              <div className="form-group">
                <label className="form-label-with-icon">
                  <Users />
                  Attendees
                </label>
                <input
                  type="text"
                  value={formData.attendees}
                  onChange={(e) => setFormData((prev) => ({ ...prev, attendees: e.target.value }))}
                  className="form-input"
                  placeholder="Comma-separated emails..."
                />
              </div>
            </div>

            {/* Recurring */}
            <div className="form-group">
              <label className="form-label-with-icon">
                <Repeat />
                Recurring
              </label>
              <select
                value={formData.recurring}
                onChange={(e) => setFormData((prev) => ({ ...prev, recurring: e.target.value }))}
                className="form-input"
              >
                <option value="none">Does not repeat</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>

            {/* Action Buttons */}
            <div className="form-actions">
              <div className="form-actions-left">
                {selectedEvent && (
                  <button
                    type="button"
                    onClick={handleDelete}
                    disabled={isLoading || (selectedEvent && !canDeleteEvent(selectedEvent))}
                    className={`button button-danger ${isLoading || (selectedEvent && !canDeleteEvent(selectedEvent)) ? "button-loading" : ""}`}
                    title={
                      selectedEvent && !canDeleteEvent(selectedEvent)
                        ? "Cannot delete event within 30 minutes"
                        : "Delete event"
                    }
                  >
                    <Trash2 />
                    Delete Event
                  </button>
                )}
              </div>
              <div className="form-actions-right">
                <button
                  type="button"
                  onClick={handleClose}
                  disabled={isLoading}
                  className={`button button-secondary ${isLoading ? "button-loading" : ""}`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`button button-primary ${isLoading ? "button-loading" : ""}`}
                >
                  {isLoading ? (
                    <>
                      <div className="loading-spinner" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save />
                      {selectedEvent ? "Update Event" : "Create Event"}
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
