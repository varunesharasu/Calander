import { Clock, Calendar, Sun } from "lucide-react"

const DateInfo = ({ selectedDate }) => {
  if (!selectedDate) return null

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getDateDetails = (date) => {
    const dayOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24)
    const weekNumber = Math.ceil(dayOfYear / 7)

    return {
      dayOfYear,
      weekNumber,
      quarter: Math.ceil((date.getMonth() + 1) / 3),
    }
  }

  const details = getDateDetails(selectedDate)

  return (
    <div className="glass-card rounded-2xl p-6 bounce-in">
      <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
        <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full mr-3"></div>
        Selected Date
      </h3>

      <div className="space-y-4">
        <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100/50">
          <div className="flex items-center mb-2">
            <Calendar className="w-4 h-4 text-blue-600 mr-2" />
            <span className="text-sm font-medium text-blue-800">Full Date</span>
          </div>
          <p className="text-slate-700 font-semibold">{formatDate(selectedDate)}</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg border border-emerald-100/50">
            <div className="flex items-center mb-1">
              <Sun className="w-3 h-3 text-emerald-600 mr-1" />
              <span className="text-xs font-medium text-emerald-800">Day of Year</span>
            </div>
            <p className="text-sm font-bold text-emerald-700">{details.dayOfYear}</p>
          </div>

          <div className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-100/50">
            <div className="flex items-center mb-1">
              <Clock className="w-3 h-3 text-purple-600 mr-1" />
              <span className="text-xs font-medium text-purple-800">Week #</span>
            </div>
            <p className="text-sm font-bold text-purple-700">{details.weekNumber}</p>
          </div>
        </div>

        <div className="p-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border border-orange-100/50">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-orange-800">Quarter</span>
            <span className="text-sm font-bold text-orange-700">Q{details.quarter}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DateInfo
