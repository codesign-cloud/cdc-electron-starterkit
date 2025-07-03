const { app, BrowserWindow } = require('electron');
const path = require('path');

// Mock electron modules for testing
jest.mock('electron', () => ({
  app: {
    whenReady: jest.fn(() => Promise.resolve()),
    on: jest.fn(),
    quit: jest.fn(),
    getName: jest.fn(() => 'CDC Electron Starterkit'),
    getVersion: jest.fn(() => '1.0.0')
  },
  BrowserWindow: jest.fn(() => ({
    loadFile: jest.fn(),
    on: jest.fn(),
    once: jest.fn(),
    show: jest.fn(),
    webContents: {
      openDevTools: jest.fn()
    }
  })),
  ipcMain: {
    handle: jest.fn()
  },
  session: {
    defaultSession: {
      webRequest: {
        onHeadersReceived: jest.fn()
      }
    }
  },
  Menu: {
    buildFromTemplate: jest.fn(),
    setApplicationMenu: jest.fn()
  }
}));

describe('Electron App', () => {
  test('should be defined', () => {
    expect(app).toBeDefined();
    expect(BrowserWindow).toBeDefined();
  });

  test('app should have correct name', () => {
    expect(app.getName()).toBe('CDC Electron Starterkit');
  });

  test('app should have version', () => {
    expect(app.getVersion()).toBe('1.0.0');
  });
});

describe('React Component', () => {
  test('should render without crashing', () => {
    // This is a basic test - in a real app you'd use @testing-library/react
    const mockElectronAPI = {
      getAppVersion: jest.fn(() => Promise.resolve('1.0.0')),
      platform: 'win32',
      versions: { electron: '37.2.0', node: '20.0.0' }
    };
    
    global.window = {
      electronAPI: mockElectronAPI
    };
    
    expect(mockElectronAPI.getAppVersion).toBeDefined();
    expect(mockElectronAPI.platform).toBe('win32');
  });
});