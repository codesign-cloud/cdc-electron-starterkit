# Automatic Release Process

This project now features **fully automated releases** that trigger when the version in `package.json` changes!

## How it works

1. **On every push**: GitHub Actions checks if the version in `package.json` has changed
2. **If version changed**: Automatically builds the app, creates a git tag, and publishes a GitHub release
3. **If version unchanged**: Just builds the app to test that everything compiles correctly

## Creating a Release (Super Easy!)

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
- Push the changes to GitHub
- **GitHub Actions automatically detects the version change and creates the release!**

### Method 2: Manual version bump

```bash
# Bump version manually
npm version patch  # or minor, major

# Push changes
git push

# GitHub Actions will automatically handle the rest!
```

### Method 3: Edit package.json directly

You can even manually edit the version in `package.json`, commit, and push - the workflow will detect the change and create a release automatically!

## What Gets Built Automatically

When a version change is detected, GitHub Actions will:
- **Build** the Windows executable
- **Create a git tag** (e.g., `v1.0.1`)
- **Create a GitHub release** with:
  - NSIS Installer (`.exe`) - Standard Windows installer
  - Portable Executable (`.exe`) - Standalone executable
  - Auto-generated release notes

## Workflow Jobs

The new workflow includes these jobs:

1. **check-version**: Detects if version in `package.json` changed
2. **build**: Builds the app and uploads artifacts (always runs)
3. **create-tag-and-release**: Creates tag and GitHub release (only if version changed)
4. **build-only**: Test build without release (only if version unchanged)

## Example Workflow

```bash
# Current version is 1.0.0
npm run release:patch

# This will:
# 1. Change package.json version to 1.0.1
# 2. Commit the change
# 3. Push to GitHub
# 4. GitHub Actions detects version change
# 5. Builds Windows executable
# 6. Creates tag v1.0.1
# 7. Creates GitHub release with executables
```

## Monitoring Releases

- Check the **Actions** tab to see the build progress
- Check the **Releases** section to see published releases
- Each release will include download links for Windows executables

## Benefits of This Approach

✅ **Fully Automated**: Just bump version and push  
✅ **No Manual Tagging**: Tags are created automatically  
✅ **Version Control**: Only creates releases when version actually changes  
✅ **Consistent**: Same process every time  
✅ **Safe**: Still builds and tests on every push  

## Troubleshooting

If releases aren't being created:
1. Ensure the version in `package.json` actually changed
2. Check the Actions tab for any workflow errors
3. Verify you have push permissions to the repository
4. Make sure the workflow file is in the correct location

## Local Testing

To test builds locally without releasing:

```bash
npm ci
npm run build:renderer
npm run build