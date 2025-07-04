"use client"

import { useState } from "react"
import Calendar from "./components/Calendar"
import Header from "./components/Header"

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [currentDate, setCurrentDate] = useState(new Date())

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <Calendar
              selectedDate={selectedDate}
              onDateSelect={setSelectedDate}
              currentDate={currentDate}
              onCurrentDateChange={setCurrentDate}
            />
          </div>

          {selectedDate && (
            <div className="mt-6 bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Selected Date</h3>
              <p className="text-gray-600">
                {selectedDate.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default App
