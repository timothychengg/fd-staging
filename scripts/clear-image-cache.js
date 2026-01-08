#!/usr/bin/env node

/**
 * Script to clear Next.js image optimization cache
 * Run this if you're experiencing image optimization errors
 */

const fs = require('fs');
const path = require('path');

const cacheDirs = [
  path.join(process.cwd(), '.next/cache/images'),
  path.join(process.cwd(), '.next/cache'),
];

console.log('🧹 Clearing Next.js image cache...\n');

cacheDirs.forEach((dir) => {
  if (fs.existsSync(dir)) {
    try {
      fs.rmSync(dir, { recursive: true, force: true });
      console.log(`✅ Cleared: ${dir}`);
    } catch (error) {
      console.error(`❌ Error clearing ${dir}:`, error.message);
    }
  } else {
    console.log(`ℹ️  Not found: ${dir}`);
  }
});

console.log('\n✨ Cache cleared! Restart your dev server.');

