import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

const App = () => {
    const [version, setVersion] = useState('Loading...');
    const [error, setError] = useState(null);

    useEffect(() => {
        const getVersion = async () => {
            try {
                if (window.electronAPI && window.electronAPI.getAppVersion) {
                    const appVersion = await window.electronAPI.getAppVersion();
                    setVersion(appVersion);
                } else {
                    throw new Error('Electron API not available');
                }
            } catch (err) {
                console.error('Failed to get app version:', err);
                setError(err.message);
                setVersion('Unknown');
            }
        };
        getVersion();
    }, []);

    return (
        <div className="app">
            <header className="app-header">
                <h1>🚀 CDC Electron Starterkit</h1>
                <p className="subtitle">A modern Electron + React starter template</p>
            </header>
            <main className="app-main">
                <div className="info-card">
                    <h2>Application Info</h2>
                    <p>
                        <strong>Version:</strong>
                        <span className={`version ${error ? 'error' : ''}`}>
                            {version}
                        </span>
                    </p>
                    {error && (
                        <div className="error-message">
                            <strong>Error:</strong> {error}
                        </div>
                    )}
                </div>

                <div className="features-card">
                    <h2>Features</h2>
                    <ul>
                        <li>✅ Electron {window.electronAPI?.versions?.electron || 'Unknown'}</li>
                        <li>✅ React {React.version}</li>
                        <li>✅ Modern ES6+ with Babel</li>
                        <li>✅ Webpack bundling</li>
                        <li>✅ Hot reload in development</li>
                        <li>✅ Secure IPC communication</li>
                        <li>✅ Context isolation enabled</li>
                    </ul>
                </div>
            </main>

            <footer className="app-footer">
                <p>Built with ❤️ using Electron + React</p>
            </footer>
        </div>
    );
};

// Error boundary for better error handling
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('React Error Boundary caught an error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="error-boundary">
                    <h1>Something went wrong.</h1>
                    <p>{this.state.error?.message}</p>
                    <button onClick={() => window.location.reload()}>
                        Reload App
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

// Initialize the React app
const container = document.getElementById('root');
if (container) {
    const root = createRoot(container);
    root.render(
        <ErrorBoundary>
            <App />
        </ErrorBoundary>
    );
} else {
    console.error('Root container not found');
}