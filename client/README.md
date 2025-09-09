
# ProCalendar

A feature-rich, modern calendar application built with React and Vite. ProCalendar offers advanced event management, multiple calendar views, notifications, import/export, and customization options, making it a powerful alternative to Google Calendar.

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Getting Started](#getting-started)
- [Folder Structure](#folder-structure)
- [Usage](#usage)
- [Customization](#customization)
- [Import/Export](#importexport)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **Multiple Views:** Month, Week, Day, and Agenda views for flexible event visualization.
- **Advanced Event Management:** Create, edit, delete, duplicate, and bulk manage events.
- **Categories & Tags:** Organize events by customizable categories and tags.
- **Reminders & Notifications:** Get browser notifications for upcoming events.
- **Recurring Events:** Support for daily, weekly, monthly, and custom recurring events.
- **Event History:** View and restore deleted or modified events.
- **Advanced Search:** Filter events by text, category, date range, location, and reminders.
- **Import/Export:** Import events from JSON files and export your calendar data (JSON/ICS).
- **Customizable Settings:** Change theme (light/dark/system), week start day, time format, and more.
- **Responsive Design:** Works seamlessly on desktop and mobile devices.

---

## Demo

> _To run a live demo locally, see [Getting Started](#getting-started)._

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**
	```sh
	git clone https://github.com/varunesharasu/Calander.git
	cd Calander/client
	```

2. **Install dependencies:**
	```sh
	npm install
	# or
	yarn install
	```

3. **Start the development server:**
	```sh
	npm run dev
	# or
	yarn dev
	```

4. **Open in browser:**
	Visit [http://localhost:5173](http://localhost:5173) (default Vite port).

---

## Folder Structure

```
client/
├── public/                # Static assets
├── src/
│   ├── components/        # UI components (Calendar, MonthView, EventModal, etc.)
│   ├── context/           # React Context for calendar state management
│   ├── styles/            # CSS files for styling
│   ├── utils/             # Utility functions (date handling, etc.)
│   ├── App.jsx            # Main application component
│   ├── main.jsx           # Entry point
│   ├── index.css          # Global styles
├── package.json           # Project metadata and dependencies
├── vite.config.js         # Vite configuration
└── README.md              # Project documentation
```

---

## Usage

- **Create/Edit Events:** Click "Create Event" or select a date to add events. Edit by clicking on an event.
- **Bulk Actions:** Select multiple events for bulk delete, duplicate, or category change.
- **Switch Views:** Use the header to toggle between Month, Week, Day, and Agenda views.
- **Search & Filter:** Use the advanced search bar to find events by text, category, date, etc.
- **Notifications:** Enable browser notifications for event reminders in settings.
- **Import/Export:** Use the Import/Export modal to backup or restore your calendar data.

---

## Customization

- **Themes:** Switch between light, dark, or system theme in settings.
- **Categories:** Add, edit, or remove event categories.
- **Settings:** Configure week start day, time format, notifications, and more.

---

## Import/Export

- **Export:** Download your calendar data as JSON or ICS (for use in other calendar apps).
- **Import:** Upload a JSON file to restore events and settings.

---

## Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements and bug fixes.

---

## License

This project is licensed under the MIT License.

---

## Dependencies

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/) (via plugin)
- [Day.js](https://day.js.org/) (date utilities)
- [Lucide React](https://lucide.dev/) (icons)

---

## Author

Made by [varunesharasu](https://github.com/varunesharasu)

---

Feel free to further customize this README for your needs!
