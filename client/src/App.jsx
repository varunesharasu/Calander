"use client"

import { useState, useEffect } from "react"
import Calendar from "./components/Calendar"
import Header from "./components/Header"
import DateInfo from "./components/DateInfo"
import Stats from "./components/Stats"
import EventModal from "./components/EventModal"
import EventList from "./components/EventList"
import SearchBar from "./components/SearchBar"
import { EventProvider } from "./context/EventContext"

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [currentDate, setCurrentDate] = useState(new Date())
  const [isLoaded, setIsLoaded] = useState(false)
  const [showEventModal, setShowEventModal] = useState(false)
  const [editingEvent, setEditingEvent] = useState(null)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleAddEvent = () => {
    setEditingEvent(null)
    setShowEventModal(true)
  }

  const handleEditEvent = (event) => {
    setEditingEvent(event)
    setShowEventModal(true)
  }

  return (
    <EventProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM5QzkyQUMiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-40"></div>

        <Header />

        <main className="relative container mx-auto px-4 py-8">
          <div
            className={`max-w-7xl mx-auto transition-all duration-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            {/* Search Bar */}
            <div className="mb-6 fade-in">
              <SearchBar />
            </div>

            {/* Stats Section */}
            <div className="mb-8 fade-in">
              <Stats selectedDate={selectedDate} currentDate={currentDate} />
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Calendar Section */}
              <div className="lg:col-span-2">
                <div className="glass-card rounded-3xl overflow-hidden slide-in-up">
                  <Calendar
                    selectedDate={selectedDate}
                    onDateSelect={setSelectedDate}
                    currentDate={currentDate}
                    onCurrentDateChange={setCurrentDate}
                    onAddEvent={handleAddEvent}
                  />
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <div className="bounce-in">
                  <DateInfo selectedDate={selectedDate} onAddEvent={handleAddEvent} />
                </div>

                <div className="glass-card rounded-2xl p-6 fade-in" style={{ animationDelay: "0.2s" }}>
                  <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mr-3"></div>
                    Quick Actions
                  </h3>
                  <div className="space-y-3">
                    <button
                      onClick={() => {
                        const today = new Date()
                        setCurrentDate(today)
                        setSelectedDate(today)
                      }}
                      className="w-full btn-secondary text-left"
                    >
                      📅 Go to Today
                    </button>
                    <button onClick={handleAddEvent} className="w-full btn-secondary text-left">
                      ➕ Add Event
                    </button>
                    <button className="w-full btn-secondary text-left">📊 View Analytics</button>
                    <button className="w-full btn-secondary text-left">📤 Export Calendar</button>
                  </div>
                </div>

                <EventList selectedDate={selectedDate} onEditEvent={handleEditEvent} />
              </div>
            </div>
          </div>
        </main>

        {/* Event Modal */}
        {showEventModal && (
          <EventModal
            isOpen={showEventModal}
            onClose={() => setShowEventModal(false)}
            selectedDate={selectedDate}
            editingEvent={editingEvent}
          />
        )}
      </div>
    </EventProvider>
  )
}

export default App
