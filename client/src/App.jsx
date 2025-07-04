"use client"

import { useState, useEffect } from "react"
import Calendar from "./components/Calendar"
import Header from "./components/Header"
import DateInfo from "./components/DateInfo"
import Stats from "./components/Stats"

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [currentDate, setCurrentDate] = useState(new Date())
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%239C92AC&quot; fill-opacity=&quot;0.03&quot;%3E%3Ccircle cx=&quot;30&quot; cy=&quot;30&quot; r=&quot;2&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
        
        <Header />
        
        <main className="relative container mx-auto px-4 py-8">
          <div className={`max-w-7xl mx-auto transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            
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
                  />
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <div className="bounce-in">
                  <DateInfo selectedDate={selectedDate} />
                </div>
                
                <div className="glass-card rounded-2xl p-6 fade-in" style={{animationDelay: '0.2s'}}>
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
                    <button className="w-full btn-secondary text-left">
                      📝 Add Event
                    </button>
                    <button className="w-full btn-secondary text-left">
                      🔔 Set Reminder
                    </button>
                  </div>
                </div>

                <div className="glass-card rounded-2xl p-6 fade-in" style={{animationDelay: '0.4s'}}>
                  <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
                    <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full mr-3"></div>
                    Upcoming
                  </h3>
                  <div className="space-y-3 text-sm text-slate-600">
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100/50">
                      <span>Team Meeting</span>
                      <span className="text-blue-600 font-medium">Tomorrow</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg border border-emerald-100/50">
                      <span>Project Review</span>
                      <span className="text-emerald-600 font-medium">Friday</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export default App
