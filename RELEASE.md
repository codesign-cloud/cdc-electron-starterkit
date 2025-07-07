# Release Process

This project is configured with automated GitHub Actions to build and release Windows executables.

## How it works

1. **On every push** to `main`/`master`: The workflow builds the app to test that everything compiles correctly
2. **On tag push** (version tags like `v1.0.0`): The workflow builds the app and creates a GitHub release with Windows executables

## Creating a Release

### Method 1: Using the release scripts (Recommended)

```bash
# For patch version (1.0.0 -> 1.0.1)
npm run release:patch

# For minor version (1.0.0 -> 1.1.0)
npm run release:minor

# For major version (1.0.0 -> 2.0.0)
npm run release:major
```

These scripts will:
- Bump the version in `package.json`
- Create a git tag
- Push changes and tags to GitHub
- Trigger the GitHub Actions workflow automatically

### Method 2: Manual process

```bash
# Bump version manually
npm version patch  # or minor, major

# Push changes and tags
git push
git push --tags
```

## What gets built

The GitHub Actions workflow will create:
- **NSIS Installer** (`.exe`) - Standard Windows installer
- **Portable Executable** (`.exe`) - Standalone executable that doesn't require installation
- **MSI Package** (if configured) - Windows Installer package

## Build Configuration

The build configuration is in `package.json` under the `build` section:

```json
{
  "build": {
    "appId": "cdc.starterkit.electron",
    "productName": "CDC Electron Starterkit",
    "win": {
      "target": [
        {
          "target": "nsis",
          "arch": ["x64"]
        },
        {
          "target": "portable", 
          "arch": ["x64"]
        }
      ]
    }
  }
}
```

## GitHub Actions Workflow

The workflow file is located at `.github/workflows/build-and-release.yml` and includes:

- **Build job**: Runs on Windows, builds the app, uploads artifacts
- **Release job**: Creates GitHub release with built executables (only on tag push)
- **Build-on-push job**: Tests builds on every push without releasing

## Requirements

- Repository must have GitHub Actions enabled
- The `GITHUB_TOKEN` is automatically provided by GitHub Actions
- Repository must match the one configured in `package.json` (`codesign-cloud/cdc-electron-starterkit`)

## Troubleshooting

If builds fail:
1. Check the GitHub Actions logs in the "Actions" tab of your repository
2. Ensure all dependencies are properly listed in `package.json`
3. Test the build locally with `npm run build`
4. Make sure the repository name in `package.json` matches your actual repository

## Local Testing

To test the build process locally:

```bash
# Install dependencies
npm ci

# Build renderer
npm run build:renderer

# Build for Windows (requires Windows or cross-compilation setup)
npm run build