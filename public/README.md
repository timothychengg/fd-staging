# Public Assets Directory

Place your video files here for the home page banner.

## Video Requirements

The hero banner video should be placed in this directory with one of these names:
- `hero-banner.mp4` (primary format - **RECOMMENDED**)
- `hero-banner.webm` (optional, for better compression)

### ⚠️ IMPORTANT: Convert MOV files to MP4

**MOV files (QuickTime) are NOT well-supported in web browsers** (especially Chrome and Firefox). You MUST convert your MOV file to MP4 for it to work.

### How to Convert MOV to MP4:

#### Option 1: Using Online Converter (Easiest)
1. Go to https://cloudconvert.com/mov-to-mp4 or https://convertio.co/mov-mp4/
2. Upload your `IMG_3289.MOV` file
3. Convert to MP4
4. Download and rename to `hero-banner.mp4`
5. Place in this `/public` directory

#### Option 2: Using FFmpeg (Command Line)
If you have FFmpeg installed:
```bash
# Install FFmpeg (if not installed):
# macOS: brew install ffmpeg
# Ubuntu/Debian: sudo apt install ffmpeg
# Windows: Download from https://ffmpeg.org/

# Convert MOV to MP4 (optimized for web):
ffmpeg -i IMG_3289.MOV -c:v libx264 -preset medium -crf 23 -c:a aac -b:a 128k -movflags +faststart hero-banner.mp4

# This will create an optimized MP4 file that's web-friendly
```

#### Option 3: Using QuickTime Player (macOS)
1. Open `IMG_3289.MOV` in QuickTime Player
2. File → Export As → Web...
3. Choose "Web" quality
4. Save as `hero-banner.mp4`

#### Option 4: Using HandBrake (Free, Cross-platform)
1. Download HandBrake from https://handbrake.fr/
2. Open your MOV file
3. Use "Web" preset
4. Export as MP4
5. Rename to `hero-banner.mp4`

### Recommended Video Specifications:
- **Format**: MP4 (H.264 codec) - **REQUIRED for web compatibility**
- **Resolution**: 1920x1080 (Full HD) or higher
- **Aspect Ratio**: 16:9
- **Duration**: 10-30 seconds (will loop automatically)
- **File Size**: Keep under 10MB for optimal performance (your current file is 16MB - consider compressing)
- **Frame Rate**: 24-30 fps
- **Codec**: H.264 video, AAC audio

### Optimization Tips:
1. **Compress large videos** - Your current file is 16MB. Aim for under 10MB:
   ```bash
   ffmpeg -i hero-banner.mp4 -vcodec libx264 -crf 28 -preset slow hero-banner-compressed.mp4
   ```
2. Use WebM format for smaller file sizes (better compression)
3. Ensure the video is muted (required for autoplay)
4. Use "faststart" flag for MP4 to enable progressive download

The video will automatically:
- Loop continuously
- Autoplay on page load (muted)
- Fall back to a static image if the video fails to load
- Be optimized for performance with hardware acceleration

