"use client"

import { useState } from "react"
import { X, Download, Upload, Plus, Sun, Moon, Monitor } from "lucide-react"
import { useCalendar } from "../context/CalendarContext"
import { exportToICS } from "../utils/dateUtils"
import "../styles/SettingsModal.css"

export default function SettingsModal() {
  const { showSettingsModal, settings, categories, events, dispatch } = useCalendar()

  const [newCategory, setNewCategory] = useState({ name: "", color: "#2f5249" })

  const handleSettingChange = (key, value) => {
    dispatch({
      type: "UPDATE_SETTINGS",
      payload: { [key]: value },
    })
  }

  const handleAddCategory = () => {
    if (newCategory.name.trim()) {
      const category = {
        id: newCategory.name.toLowerCase().replace(/\s+/g, "-"),
        name: newCategory.name,
        color: newCategory.color,
      }
      dispatch({ type: "ADD_CATEGORY", payload: category })
      setNewCategory({ name: "", color: "#2f5249" })
    }
  }

  const handleExport = () => {
    const icsContent = exportToICS(events)
    const blob = new Blob([icsContent], { type: "text/calendar" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "calendar-events.ics"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleImport = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const content = e.target.result
          // Basic ICS parsing - in a real app, you'd use a proper ICS parser
          const events = parseICSContent(content)
          events.forEach((event) => {
            dispatch({ type: "ADD_EVENT", payload: event })
          })
        } catch (error) {
          console.error("Error importing calendar:", error)
          alert("Error importing calendar file")
        }
      }
      reader.readAsText(file)
    }
  }

  const parseICSContent = (content) => {
    // Simplified ICS parsing - in production, use a proper library
    const events = []
    const lines = content.split("\n")
    let currentEvent = null

    lines.forEach((line) => {
      const [key, value] = line.split(":")

      if (key === "BEGIN" && value === "VEVENT") {
        currentEvent = { id: Date.now().toString() + Math.random() }
      } else if (key === "END" && value === "VEVENT" && currentEvent) {
        events.push(currentEvent)
        currentEvent = null
      } else if (currentEvent) {
        switch (key) {
          case "SUMMARY":
            currentEvent.title = value
            break
          case "DESCRIPTION":
            currentEvent.description = value
            break
          case "DTSTART":
            currentEvent.date = new Date(
              value.replace(/(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})/, "$1-$2-$3T$4:$5:$6"),
            )
            break
          case "LOCATION":
            currentEvent.location = value
            break
        }
      }
    })

    return events.map((event) => ({
      ...event,
      category: "personal",
      reminder: "15",
      recurring: "none",
    }))
  }

  const handleClose = () => {
    dispatch({ type: "TOGGLE_SETTINGS_MODAL" })
  }

  const themeOptions = [
    { value: "light", label: "Light", icon: Sun },
    { value: "dark", label: "Dark", icon: Moon },
    { value: "system", label: "System", icon: Monitor },
  ]

  if (!showSettingsModal) return null

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content settings-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-header-content">
            <div className="modal-header-info">
              <div className="modal-icon">
                <Monitor />
              </div>
              <div className="modal-title-section">
                <h2>Settings</h2>
                <p>Customize your calendar experience</p>
              </div>
            </div>
            <button onClick={handleClose} className="modal-close">
              <X />
            </button>
          </div>
        </div>

        <div className="modal-body">
          <div className="settings-modal-body">
            {/* Theme Settings */}
            <div className="settings-section">
              <h3 className="settings-section-title">Appearance</h3>
              <div className="settings-group">
                <div className="settings-item">
                  <label className="form-label">Theme</label>
                  <div className="theme-selector">
                    {themeOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleSettingChange("theme", option.value)}
                        className={`theme-option ${settings.theme === option.value ? "active" : ""}`}
                      >
                        <option.icon />
                        <span>{option.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* General Settings */}
            <div className="settings-section">
              <h3 className="settings-section-title">General</h3>
              <div className="settings-group">
                <div className="settings-item">
                  <label className="form-label">Week starts on</label>
                  <select
                    value={settings.weekStartsOn}
                    onChange={(e) => handleSettingChange("weekStartsOn", Number.parseInt(e.target.value))}
                    className="form-input"
                  >
                    <option value={0}>Sunday</option>
                    <option value={1}>Monday</option>
                  </select>
                </div>

                <div className="settings-item">
                  <label className="form-label">Time format</label>
                  <select
                    value={settings.timeFormat}
                    onChange={(e) => handleSettingChange("timeFormat", e.target.value)}
                    className="form-input"
                  >
                    <option value="12">12-hour (AM/PM)</option>
                    <option value="24">24-hour</option>
                  </select>
                </div>

                <div className="settings-checkbox">
                  <input
                    type="checkbox"
                    id="notifications"
                    checked={settings.notifications}
                    onChange={(e) => handleSettingChange("notifications", e.target.checked)}
                  />
                  <label htmlFor="notifications">Enable notifications</label>
                </div>
              </div>
            </div>

            {/* Categories */}
            <div className="settings-section">
              <h3 className="settings-section-title">Categories</h3>
              <div className="categories-section">
                <div className="categories-list">
                  {categories.map((category) => (
                    <div key={category.id} className="category-display">
                      <div className="category-color-dot" style={{ backgroundColor: category.color }} />
                      <span className="category-name-display">{category.name}</span>
                    </div>
                  ))}
                </div>

                <div className="add-category-form">
                  <input
                    type="text"
                    value={newCategory.name}
                    onChange={(e) => setNewCategory((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="Category name"
                    className="add-category-input"
                  />
                  <input
                    type="color"
                    value={newCategory.color}
                    onChange={(e) => setNewCategory((prev) => ({ ...prev, color: e.target.value }))}
                    className="add-category-color"
                  />
                  <button onClick={handleAddCategory} className="add-category-button">
                    <Plus />
                    Add
                  </button>
                </div>
              </div>
            </div>

            {/* Import/Export */}
            <div className="settings-section">
              <h3 className="settings-section-title">Import/Export</h3>
              <div className="import-export-section">
                <div className="import-export-buttons">
                  <button onClick={handleExport} className="button button-secondary">
                    <Download />
                    Export Calendar
                  </button>

                  <label className="file-input-label">
                    <Upload />
                    Import Calendar
                    <input type="file" accept=".ics" onChange={handleImport} className="file-input-hidden" />
                  </label>
                </div>
                <p className="import-export-description">
                  Export your events to ICS format or import from other calendar applications.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
