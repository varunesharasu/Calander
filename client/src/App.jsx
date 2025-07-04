// "use client"

// import { useState, useEffect } from "react"
// import Calendar from "./components/Calendar"
// import Header from "./components/Header"
// import DateInfo from "./components/DateInfo"
// import Stats from "./components/Stats"
// import EventModal from "./components/EventModal"
// import EventList from "./components/EventList"
// import SearchBar from "./components/SearchBar"
// import { EventProvider } from "./context/EventContext"

// function App() {
//   const [selectedDate, setSelectedDate] = useState(new Date())
//   const [currentDate, setCurrentDate] = useState(new Date())
//   const [isLoaded, setIsLoaded] = useState(false)
//   const [showEventModal, setShowEventModal] = useState(false)
//   const [editingEvent, setEditingEvent] = useState(null)

//   useEffect(() => {
//     setIsLoaded(true)
//   }, [])

//   const handleAddEvent = () => {
//     setEditingEvent(null)
//     setShowEventModal(true)
//   }

//   const handleEditEvent = (event) => {
//     setEditingEvent(event)
//     setShowEventModal(true)
//   }

//   return (
//     <EventProvider>
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
//         <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM5QzkyQUMiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-40"></div>

//         <Header />

//         <main className="relative container mx-auto px-4 py-8">
//           <div
//             className={`max-w-7xl mx-auto transition-all duration-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
//           >
//             {/* Search Bar */}
//             <div className="mb-6 fade-in">
//               <SearchBar />
//             </div>

//             {/* Stats Section */}
//             <div className="mb-8 fade-in">
//               <Stats selectedDate={selectedDate} currentDate={currentDate} />
//             </div>

//             <div className="grid lg:grid-cols-3 gap-8">
//               {/* Calendar Section */}
//               <div className="lg:col-span-2">
//                 <div className="glass-card rounded-3xl overflow-hidden slide-in-up">
//                   <Calendar
//                     selectedDate={selectedDate}
//                     onDateSelect={setSelectedDate}
//                     currentDate={currentDate}
//                     onCurrentDateChange={setCurrentDate}
//                     onAddEvent={handleAddEvent}
//                   />
//                 </div>
//               </div>

//               {/* Sidebar */}
//               <div className="space-y-6">
//                 <div className="bounce-in">
//                   <DateInfo selectedDate={selectedDate} onAddEvent={handleAddEvent} />
//                 </div>

//                 <div className="glass-card rounded-2xl p-6 fade-in" style={{ animationDelay: "0.2s" }}>
//                   <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
//                     <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mr-3"></div>
//                     Quick Actions
//                   </h3>
//                   <div className="space-y-3">
//                     <button
//                       onClick={() => {
//                         const today = new Date()
//                         setCurrentDate(today)
//                         setSelectedDate(today)
//                       }}
//                       className="w-full btn-secondary text-left"
//                     >
//                       📅 Go to Today
//                     </button>
//                     <button onClick={handleAddEvent} className="w-full btn-secondary text-left">
//                       ➕ Add Event
//                     </button>
//                     <button className="w-full btn-secondary text-left">📊 View Analytics</button>
//                     <button className="w-full btn-secondary text-left">📤 Export Calendar</button>
//                   </div>
//                 </div>

//                 <EventList selectedDate={selectedDate} onEditEvent={handleEditEvent} />
//               </div>
//             </div>
//           </div>
//         </main>

//         {/* Event Modal */}
//         {showEventModal && (
//           <EventModal
//             isOpen={showEventModal}
//             onClose={() => setShowEventModal(false)}
//             selectedDate={selectedDate}
//             editingEvent={editingEvent}
//           />
//         )}
//       </div>
//     </EventProvider>
//   )
// }

// export default App









"use client"

import { useState, useEffect } from "react"
import Calendar from "./components/Calendar"
import Header from "./components/Header"
import DateInfo from "./components/DateInfo"
import Stats from "./components/Stats"
import EventModal from "./components/EventModal"
import EventList from "./components/EventList"
import SearchBar from "./components/SearchBar"
import Timeline from "./components/Timeline"
import { EventProvider } from "./context/EventContext"

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [currentDate, setCurrentDate] = useState(new Date())
  const [isLoaded, setIsLoaded] = useState(false)
  const [showEventModal, setShowEventModal] = useState(false)
  const [editingEvent, setEditingEvent] = useState(null)
  const [viewMode, setViewMode] = useState("calendar") // "calendar" or "timeline"

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleAddEvent = (eventDate = null) => {
    setEditingEvent(null)
    if (eventDate) {
      setSelectedDate(eventDate)
    }
    setShowEventModal(true)
  }

  const handleEditEvent = (event) => {
    setEditingEvent(event)
    setShowEventModal(true)
  }

  return (
    <EventProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%239C92AC' fillOpacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>

        <Header />

        <main className="relative container mx-auto px-4 py-8">
          <div
            className={`max-w-7xl mx-auto transition-all duration-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            {/* Search Bar */}
            <div className="mb-6 fade-in">
              <SearchBar />
            </div>

            {/* View Mode Toggle */}
            <div className="mb-6 flex justify-center fade-in">
              <div className="glass-card rounded-xl p-1 flex">
                <button
                  onClick={() => setViewMode("calendar")}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    viewMode === "calendar" ? "bg-blue-500 text-white shadow-lg" : "text-slate-600 hover:bg-white/50"
                  }`}
                >
                  📅 Calendar View
                </button>
                <button
                  onClick={() => setViewMode("timeline")}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    viewMode === "timeline" ? "bg-blue-500 text-white shadow-lg" : "text-slate-600 hover:bg-white/50"
                  }`}
                >
                  ⏰ Timeline View
                </button>
              </div>
            </div>

            {/* Stats Section */}
            <div className="mb-8 fade-in">
              <Stats selectedDate={selectedDate} currentDate={currentDate} />
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                {viewMode === "calendar" ? (
                  <div className="glass-card rounded-3xl overflow-hidden slide-in-up">
                    <Calendar
                      selectedDate={selectedDate}
                      onDateSelect={setSelectedDate}
                      currentDate={currentDate}
                      onCurrentDateChange={setCurrentDate}
                      onAddEvent={handleAddEvent}
                    />
                  </div>
                ) : (
                  <div className="slide-in-up">
                    <Timeline selectedDate={selectedDate} onAddEvent={handleAddEvent} onEditEvent={handleEditEvent} />
                  </div>
                )}
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
                    <button onClick={() => handleAddEvent()} className="w-full btn-secondary text-left">
                      ➕ Add Event
                    </button>
                    <button
                      onClick={() => setViewMode(viewMode === "calendar" ? "timeline" : "calendar")}
                      className="w-full btn-secondary text-left"
                    >
                      🔄 Switch View
                    </button>
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
