#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Read current version from package.json
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const currentVersion = packageJson.version;

console.log(`Current version: ${currentVersion}`);

// Get version type from command line argument
const versionType = process.argv[2] || 'patch';

if (!['major', 'minor', 'patch'].includes(versionType)) {
  console.error('Usage: node scripts/create-release.js [major|minor|patch]');
  process.exit(1);
}

try {
  // Bump version
  console.log(`Bumping ${versionType} version...`);
  execSync(`npm version ${versionType}`, { stdio: 'inherit' });
  
  // Get new version
  const newPackageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const newVersion = newPackageJson.version;
  
  console.log(`New version: ${newVersion}`);
  
  // Push changes and tags
  console.log('Pushing changes and tags...');
  execSync('git push', { stdio: 'inherit' });
  execSync('git push --tags', { stdio: 'inherit' });
  
  console.log(`✅ Release v${newVersion} created successfully!`);
  console.log('GitHub Actions will now build and create the release automatically.');
  
} catch (error) {
  console.error('❌ Error creating release:', error.message);
  process.exit(1);
}