import { CalendarIcon } from "lucide-react"

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-center">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary-500 rounded-lg">
              <CalendarIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">React Calendar</h1>
              <p className="text-sm text-gray-600">Select dates and manage your schedule</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
