"use client"

import { useState, useEffect } from "react"
import { X, Calendar, Clock, Tag, FileText, Bell, Repeat } from "lucide-react"
import { useEvents } from "../context/EventContext"

const EventModal = ({ isOpen, onClose, selectedDate, editingEvent }) => {
  const { addEvent, updateEvent } = useEvents()

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: selectedDate,
    time: "09:00",
    category: "personal",
    priority: "medium",
    reminder: "15",
    recurring: "none",
    location: "",
  })

  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (editingEvent) {
      const eventDate = new Date(editingEvent.date)
      setFormData({
        title: editingEvent.title || "",
        description: editingEvent.description || "",
        date: eventDate,
        time: eventDate.toTimeString().slice(0, 5),
        category: editingEvent.category || "personal",
        priority: editingEvent.priority || "medium",
        reminder: editingEvent.reminder || "15",
        recurring: editingEvent.recurring || "none",
        location: editingEvent.location || "",
      })
    } else {
      setFormData((prev) => ({
        ...prev,
        date: selectedDate,
      }))
    }
  }, [editingEvent, selectedDate])

  const categories = [
    { value: "personal", label: "Personal", color: "bg-blue-500" },
    { value: "work", label: "Work", color: "bg-green-500" },
    { value: "health", label: "Health", color: "bg-red-500" },
    { value: "social", label: "Social", color: "bg-purple-500" },
    { value: "travel", label: "Travel", color: "bg-orange-500" },
    { value: "education", label: "Education", color: "bg-indigo-500" },
  ]

  const priorities = [
    { value: "low", label: "Low", color: "text-green-600" },
    { value: "medium", label: "Medium", color: "text-yellow-600" },
    { value: "high", label: "High", color: "text-red-600" },
  ]

  const validateForm = () => {
    const newErrors = {}

    if (!formData.title.trim()) {
      newErrors.title = "Title is required"
    }

    if (!formData.date) {
      newErrors.date = "Date is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validateForm()) return

    const eventDateTime = new Date(formData.date)
    const [hours, minutes] = formData.time.split(":")
    eventDateTime.setHours(Number.parseInt(hours), Number.parseInt(minutes))

    const eventData = {
      ...formData,
      date: eventDateTime,
    }

    if (editingEvent) {
      updateEvent(editingEvent.id, eventData)
    } else {
      addEvent(eventData)
    }

    onClose()
  }

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>

      <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-white/20">
        <div className="sticky top-0 bg-white/80 backdrop-blur-xl border-b border-slate-200/50 p-6 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-800">{editingEvent ? "Edit Event" : "Create New Event"}</h2>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-xl transition-colors duration-200">
              <X className="w-6 h-6 text-slate-600" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Event Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border ${errors.title ? "border-red-300" : "border-slate-200"} focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200`}
              placeholder="Enter event title..."
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center">
              <FileText className="w-4 h-4 mr-2" />
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 resize-none"
              placeholder="Add event description..."
            />
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                Date *
              </label>
              <input
                type="date"
                value={formData.date.toISOString().split("T")[0]}
                onChange={(e) => handleChange("date", new Date(e.target.value))}
                className={`w-full px-4 py-3 rounded-xl border ${errors.date ? "border-red-300" : "border-slate-200"} focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200`}
              />
              {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                Time
              </label>
              <input
                type="time"
                value={formData.time}
                onChange={(e) => handleChange("time", e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
              />
            </div>
          </div>

          {/* Category and Priority */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center">
                <Tag className="w-4 h-4 mr-2" />
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleChange("category", e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Priority</label>
              <select
                value={formData.priority}
                onChange={(e) => handleChange("priority", e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
              >
                {priorities.map((priority) => (
                  <option key={priority.value} value={priority.value}>
                    {priority.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Location</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => handleChange("location", e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
              placeholder="Enter location..."
            />
          </div>

          {/* Reminder and Recurring */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center">
                <Bell className="w-4 h-4 mr-2" />
                Reminder
              </label>
              <select
                value={formData.reminder}
                onChange={(e) => handleChange("reminder", e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
              >
                <option value="none">No reminder</option>
                <option value="5">5 minutes before</option>
                <option value="15">15 minutes before</option>
                <option value="30">30 minutes before</option>
                <option value="60">1 hour before</option>
                <option value="1440">1 day before</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center">
                <Repeat className="w-4 h-4 mr-2" />
                Recurring
              </label>
              <select
                value={formData.recurring}
                onChange={(e) => handleChange("recurring", e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
              >
                <option value="none">No repeat</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-slate-200/50">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 text-slate-600 hover:text-slate-800 font-medium transition-colors duration-200"
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              {editingEvent ? "Update Event" : "Create Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EventModal
