#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');

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
  
  // Push changes (GitHub Actions will detect version change and create release automatically)
  console.log('Pushing changes...');
  execSync('git push', { stdio: 'inherit' });
  
  console.log(`✅ Version bumped to v${newVersion}!`);
  console.log('🚀 GitHub Actions will automatically:');
  console.log('   - Detect the version change');
  console.log('   - Build the Windows executable');
  console.log('   - Create a git tag');
  console.log('   - Create a GitHub release');
  console.log('');
  console.log('Check the Actions tab in your repository to monitor progress.');
  
} catch (error) {
  console.error('❌ Error creating release:', error.message);
  process.exit(1);
}