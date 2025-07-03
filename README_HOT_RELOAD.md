# Hot Reload Setup Guide

## How Hot Reload Works Now

The improved `npm start` command now:

1. **Builds React app first** - Ensures the bundle exists before Electron starts
2. **Starts webpack in watch mode** - Automatically rebuilds when files change
3. **Waits for bundle** - Electron waits for the initial build to complete
4. **Starts Electron** - Launches the app with hot reload enabled

## Testing Hot Reload

### 1. Start the Application
```bash
npm start
```

This will:
- Build the React app initially
- Start webpack in watch mode
- Launch Electron when ready
- Enable hot reload for both React and Electron

### 2. Test React Hot Reload
1. Open `src/renderer.jsx`
2. Change the title text: `🚀 CDC Electron Starterkit` → `🔥 Hot Reload Working!`
3. Save the file
4. The app should automatically update without restarting

### 3. Test CSS Hot Reload
1. Open `src/style.css`
2. Change the gradient colors in the `body` selector
3. Save the file
4. The styling should update immediately

### 4. Test Electron Main Process Reload
1. Open `src/main.js`
2. Change the window size (width/height)
3. Save the file
4. Electron should restart automatically with new window size

## How It Works

### Package.json Scripts
```json
{
  "start": "npm run build:renderer:dev && npm-run-all -p watch:renderer start:electron:delayed",
  "start:electron:delayed": "cross-env NODE_ENV=development wait-on dist/renderer.bundle.js && electron .",
  "watch:renderer": "webpack --mode=development --watch"
}
```

### Key Components

1. **Initial Build**: `npm run build:renderer:dev` ensures bundle exists
2. **Parallel Execution**: `npm-run-all -p` runs webpack watch and electron together
3. **Wait-on**: Ensures Electron waits for webpack bundle before starting
4. **Electron-reloader**: Watches main process files and restarts when changed
5. **Webpack Watch**: Rebuilds React app when source files change

### File Watching

- **React Files** (`src/renderer.jsx`, `src/style.css`): Webpack rebuilds → Browser refreshes
- **Main Process** (`src/main.js`, `src/preload.js`): Electron-reloader restarts app
- **HTML** (`src/index.html`): Electron-reloader restarts app

## Troubleshooting

### Hot Reload Not Working?

1. **Check if both processes are running**:
   - Webpack should show "webpack compiled successfully"
   - Electron should show the app window

2. **Check for errors**:
   - Look for webpack compilation errors
   - Check Electron console for JavaScript errors

3. **Manual restart**:
   - Stop with `Ctrl+C`
   - Run `npm run clean`
   - Run `npm start` again

### Performance Tips

- **Babel caching** is enabled for faster rebuilds
- **Source maps** are optimized for development
- **Watch options** are tuned for better performance

## Development Workflow

```bash
# Start development (recommended)
npm start

# Clean build artifacts if needed
npm run clean

# Build for production
npm run build:renderer

# Run tests
npm test
```

The hot reload setup now provides a smooth development experience with automatic rebuilding and reloading for both React and Electron components.