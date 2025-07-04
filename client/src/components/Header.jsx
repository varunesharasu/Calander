"use client"

import { CalendarIcon, Sparkles } from "lucide-react"
import { useState, useEffect } from "react"

const Header = () => {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <header className="relative bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-lg shadow-slate-200/20">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-indigo-500/5"></div>

      <div className="relative container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg shadow-blue-500/25">
                <CalendarIcon className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -top-1 -right-1">
                <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                ProCalendar
              </h1>
              <p className="text-sm text-slate-500 font-medium">Professional Calendar Management</p>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <div className="text-right">
              <div className="text-lg font-semibold text-slate-800">
                {currentTime.toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "short",
                  day: "numeric",
                })}
              </div>
              <div className="text-sm text-slate-500 font-mono">
                {currentTime.toLocaleTimeString("en-US", {
                  hour12: false,
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </div>
            </div>

            <div className="w-px h-12 bg-gradient-to-b from-transparent via-slate-300 to-transparent"></div>

            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
              <span className="text-sm font-medium text-slate-600">Live</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
