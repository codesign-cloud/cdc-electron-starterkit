# CDC Electron Starterkit

A modern, secure, and feature-rich Electron + React starter template with best practices built-in.

## 🚀 Features

- **Modern Stack**: Electron 37+ with React 19
- **Security First**: Context isolation, disabled node integration, CSP headers
- **Development Experience**: Hot reload, dev tools, source maps
- **Build System**: Webpack 5 with Babel transpilation
- **Testing**: Jest setup with example tests
- **Cross-Platform**: Windows, macOS, and Linux support
- **Modern UI**: Beautiful gradient design with responsive layout

## 📦 What's Included

- ✅ Secure IPC communication between main and renderer processes
- ✅ Modern React with hooks and error boundaries
- ✅ Webpack configuration for development and production
- ✅ Hot reload during development
- ✅ Professional application menu
- ✅ CSS modules support
- ✅ Jest testing framework
- ✅ Cross-platform build configuration
- ✅ Security best practices implemented

## 🛠 Installation

```bash
# Clone the repository
git clone https://github.com/codesign-cloud/cdc-electron-starterkit.git
cd cdc-electron-starterkit

# Install dependencies
npm install
```

## 🚀 Development

**Important**: You need to build the React app first before running Electron!

### Quick Start (Recommended)
```bash
# This automatically builds the React app AND starts Electron with hot reload
npm start
```

### Manual Process (if needed)
```bash
# Step 1: Build the React app first
npm run build:renderer:dev

# Step 2: Then start Electron
npm run start:electron
```

### Other Development Commands
```bash
# Build renderer for development (with source maps) - REQUIRED before first run
npm run build:renderer:dev

# Build renderer for production (optimized)
npm run build:renderer

# Clean build artifacts
npm run clean
```

**Note**: The `npm start` command runs both webpack (to build React) and Electron simultaneously with hot reload, so you don't need to build separately when using it.

## 🧪 Testing

```bash
# Run tests once
npm test

# Run tests in watch mode
npm run test:watch
```

## 📦 Building for Production

```bash
# Build the app for all platforms
npm run build

# Build and publish (requires proper GitHub setup)
npm run release
```

## 🏗 Project Structure

```
cdc-electron-starterkit/
├── src/
│   ├── __tests__/          # Test files
│   ├── main.js             # Electron main process
│   ├── preload.js          # Secure bridge script
│   ├── renderer.jsx        # React application
│   ├── index.html          # HTML template
│   └── style.css           # Application styles
├── dist/                   # Built files (auto-generated)
├── docs/                   # Documentation
├── package.json            # Dependencies and scripts
├── webpack.config.js       # Webpack configuration
├── babel.config.js         # Babel configuration
└── jest.config.js          # Jest configuration
```

### File Structure for Development:

```
src/
├── renderer.jsx     ← Main React app (edit here!)
├── style.css        ← Styling (edit here!)
├── index.html       ← HTML template
├── main.js          ← Electron main process
└── preload.js       ← Security bridge
```

## 🔒 Security Features

This starterkit implements Electron security best practices:

- **Context Isolation**: Enabled to prevent renderer access to Node.js APIs
- **Node Integration**: Disabled in renderer process
- **Preload Script**: Secure bridge for IPC communication
- **Content Security Policy**: Configured for development and production
- **Sandboxing**: Ready to be enabled for additional security
- **Menu Security**: Prevents unauthorized window creation

## 🎨 Customization

### Styling
- Modify `src/style.css` for global styles
- The app uses a modern gradient design that's fully customizable
- Responsive design works on all screen sizes

### Adding Features
- Add new IPC handlers in `src/main.js`
- Expose them securely through `src/preload.js`
- Use them in your React components via `window.electronAPI`

### Build Configuration
- Modify `package.json` build section for app metadata
- Update `webpack.config.js` for build customizations
- Configure `babel.config.js` for JavaScript transpilation

## 📋 Scripts Reference

| Script | Description |
|--------|-------------|
| `npm start` | Start development with hot reload |
| `npm run dev` | Alias for start |
| `npm test` | Run tests once |
| `npm run test:watch` | Run tests in watch mode |
| `npm run build:renderer` | Build renderer for production |
| `npm run build:renderer:dev` | Build renderer for development |
| `npm run build` | Build app for all platforms |
| `npm run release` | Build and publish app |
| `npm run clean` | Clean build artifacts |

## 🐛 Troubleshooting

### Common Issues

1. **App won't start**: Make sure you've run `npm install` and `npm run build:renderer`
2. **Hot reload not working**: Check that both webpack and electron processes are running
3. **Build fails**: Ensure all dependencies are installed and up to date

### Development Tips

- Use `Ctrl+Shift+I` (or `Cmd+Option+I` on Mac) to open DevTools
- Check the console for any JavaScript errors
- Use the Network tab to debug resource loading issues

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the CC0-1.0 License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with [Electron](https://electronjs.org/)
- UI powered by [React](https://reactjs.org/)
- Bundled with [Webpack](https://webpack.js.org/)
- Tested with [Jest](https://jestjs.io/)

---

**Happy coding! 🎉**