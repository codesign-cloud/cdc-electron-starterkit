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
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 font-inter">
            {/* Header */}
            <header className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">🚀</span>
                            </div>
                            <div>
                                <h1 className="text-xl font-semibold text-gray-900">CDC Electron Starterkit</h1>
                                <p className="text-sm text-gray-500">Electron + React + Tailwind CSS </p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <span className={`badge ${error ? 'badge-error' : 'badge-success'}`}>
                                v{version}
                            </span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Electron app</h2>
                    <p className="text-md text-gray-600">A modern starter template with React, Webpack, and hot reload.</p>
                </div>

                {/* Error Alert */}
                {error && (
                    <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 animate-fade-in-up">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-red-800">Error occurred</h3>
                                <p className="mt-1 text-sm text-red-700">{error}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Cards Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* Application Info Card */}
                    <div className="card animate-fade-in-up">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">Application Info</h3>
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between py-2 border-b border-gray-100">
                                <span className="text-sm font-medium text-gray-600">App Version</span>
                                <span className={`badge ${error ? 'badge-error' : 'badge-success'}`}>
                                    {version}
                                </span>
                            </div>
                            <div className="flex items-center justify-between py-2 border-b border-gray-100">
                                <span className="text-sm font-medium text-gray-600">Electron</span>
                                <span className="text-sm text-gray-900">
                                    {window.electronAPI?.versions?.electron || 'Unknown'}
                                </span>
                            </div>
                            <div className="flex items-center justify-between py-2">
                                <span className="text-sm font-medium text-gray-600">React</span>
                                <span className="text-sm text-gray-900">{React.version}</span>
                            </div>
                        </div>
                    </div>

                    {/* Features Card */}
                    <div className="card animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">Features</h3>
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                        <div className="space-y-3">
                            {[
                                `Electron ${window.electronAPI?.versions?.electron || 'Unknown'}`,
                                `React ${React.version}`,
                                'Modern ES6+ with Babel',
                                'Webpack bundling',
                                'Hot reload in development',
                                'Secure IPC communication',
                                'Context isolation enabled',
                                'Tailwind CSS styling'
                            ].map((feature, index) => (
                                <div key={index} className="flex items-center space-x-3 py-1">
                                    <div className="flex-shrink-0">
                                        <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <span className="text-sm text-gray-700">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    <button 
                        className="btn-primary w-full sm:w-auto"
                        onClick={() => window.open('https://github.com/codesign-cloud/cdc-electron-starterkit', '_blank')}
                    >
                        View on GitHub
                    </button>
                    <button 
                        className="btn-secondary w-full sm:w-auto"
                        onClick={() => window.location.reload()}
                    >
                        Reload App
                    </button>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 mt-0">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col sm:flex-row items-center justify-between">
                        <p className="text-sm text-gray-500">
                            Built with ❤️ using Electron + React + Tailwind CSS
                        </p>
                        <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                            <a href="https://electronjs.org" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">
                                Electron
                            </a>
                            <a href="https://reactjs.org" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">
                                React
                            </a>
                            <a href="https://tailwindcss.com" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">
                                Tailwind CSS
                            </a>
                        </div>
                    </div>
                </div>
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
                <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
                    <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                        </div>
                        <h1 className="text-xl font-semibold text-gray-900 mb-2">Something went wrong</h1>
                        <p className="text-gray-600 mb-6">{this.state.error?.message}</p>
                        <button 
                            className="btn-primary w-full"
                            onClick={() => window.location.reload()}
                        >
                            Reload App
                        </button>
                    </div>
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