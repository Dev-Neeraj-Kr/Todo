# Todo App

A modern, feature-rich Todo application built with React, Vite, and Tailwind CSS. Manage your tasks efficiently with priority levels, search functionality, and persistent storage.

## Features

✨ **Core Functionality**
- ✅ Create, read, update, and delete todos
- 🎯 Assign priority levels (High, Medium, Low) to each task
- 📝 Edit existing todos and their priorities
- ✔️ Mark todos as completed or active
- 🔍 Search todos in real-time
- 📊 Filter todos by status (All, Active, Completed)
- 💾 Persistent storage using localStorage - your todos survive page refreshes
- 🎨 Beautiful, responsive UI with Tailwind CSS styling

## Tech Stack

- **Frontend Framework**: React 19.2.4
- **Build Tool**: Vite 8.0.4
- **Styling**: Tailwind CSS 4.2.2
- **Package Manager**: npm
- **Code Quality**: ESLint
- **Development Server**: Vite HMR (Hot Module Replacement)

## Project Structure

```
Todo/
├── src/
│   ├── App.jsx              # Main application component with all todo logic
│   ├── App.css              # Component-specific styles
│   ├── main.jsx             # React app entry point
│   ├── index.css            # Global styles
│   └── assets/              # Static assets
├── public/                  # Static files served as-is
├── vite.config.js           # Vite configuration
├── eslint.config.js         # ESLint rules
├── package.json             # Project dependencies and scripts
├── index.html               # HTML template
└── README.md                # This file
```

## Prerequisites

Before you begin, ensure you have the following installed on your system:
- **Node.js** (v16.0 or higher) - [Download here](https://nodejs.org/)
- **npm** (usually comes with Node.js) or **yarn**
- **Git** (optional, for cloning the repository)

## Installation Steps

### 1. Clone or Download the Project

**Using Git:**
```bash
git clone <repository-url>
cd Todo
```

**Or download the ZIP file and extract it**, then navigate to the project folder.

### 2. Navigate to Project Directory

```bash
cd Todo
```

### 3. Install Dependencies

Install all required npm packages:

```bash
npm install
```

This will install:
- React and React DOM
- Vite and build tools
- Tailwind CSS
- ESLint and related plugins

### 4. Start Development Server

Run the development server with hot module replacement:

```bash
npm run dev
```

The application will start and you'll see output like:
```
  VITE v8.0.4  ready in 245 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h + enter to show help
```

Open your browser and navigate to `http://localhost:5173/` to view the app.

## Available Scripts

### Development
```bash
npm run dev
```
Starts the Vite development server with hot reload. Perfect for active development.

### Build for Production
```bash
npm run build
```
Creates an optimized production build in the `dist/` folder.

### Preview Production Build
```bash
npm run preview
```
Serves the production build locally to preview before deployment.

### Lint Code
```bash
npm run lint
```
Runs ESLint to check code quality and style compliance.

## Usage

### Adding a Todo
1. Type your task in the input field at the top
2. Select a priority level from the dropdown (High, Medium, or Low)
3. Click the "+" button or press Enter to add the todo

### Managing Todos
- **Complete a Todo**: Click the checkbox to mark as done
- **Edit a Todo**: Click the edit (pencil) icon to modify the task or priority
- **Delete a Todo**: Click the delete (trash) icon to remove the todo
- **Search Todos**: Use the search bar to filter todos by text
- **Filter by Status**: Use the filter buttons (All, Active, Completed) to view specific todos

### Data Persistence
All todos are automatically saved to your browser's localStorage. Your tasks will persist even after:
- Closing the browser tab
- Refreshing the page
- Restarting your computer

## Browser Support

Works in all modern browsers that support:
- ES6+ JavaScript
- localStorage API
- CSS Grid/Flexbox

Tested on:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Development Workflow

1. Make changes to files in the `src/` directory
2. Vite's HMR will automatically refresh your browser
3. Run `npm run lint` to check code quality
4. Build and test with `npm run build` and `npm run preview`

## Deployment

To deploy this app:

1. Build the project:
   ```bash
   npm run build
   ```

2. Upload the contents of the `dist/` folder to your hosting service (Netlify, Vercel, GitHub Pages, etc.)

Example with Netlify:
- Connect your Git repository to Netlify
- Set build command: `npm run build`
- Set publish directory: `dist`
- Deploy!

## Troubleshooting

### Port 5173 already in use?
```bash
npm run dev -- --port 3000
```

### Dependencies not installing?
```bash
npm install --force
```

### Clear node_modules and reinstall:
```bash
rm -r node_modules package-lock.json
npm install
```

## Future Enhancements

Potential features for future versions:
- Due dates and reminders
- Task categories/tags
- Recurring todos
- Export/import functionality
- Dark mode toggle
- Multiple todo lists
- Sync across devices with backend


## Contributing

Feel free to fork this project and submit pull requests for any improvements!

## Support

If you encounter any issues or have questions, please create an issue in the repository.

---

**Happy task managing! 🚀**
