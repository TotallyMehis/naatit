# Naatit

## Build

```bash
npm install
npm run build # Output in _site
```

## Development

```bash
npm install
npm run serve # Served @ localhost:8080
```

### Video encoding settings

Videos should be encoded using FFMPEG VP9.

```bash
# Full video
ffmpeg -y -i "input.mp4" -c:v libvpx-vp9 -row-mt 1 -cpu-used 2 -deadline good -b:v 0 -crf 30 -pass 1 -an -f null NUL
ffmpeg -y -i "input.mp4" -c:v libvpx-vp9 -row-mt 1 -cpu-used 2 -deadline good -b:v 0 -crf 30 -pass 2 -an "output.webm"

# Thumbnail video
ffmpeg -y -i "input.mp4" -c:v libvpx-vp9 -filter:v fps=20 -row-mt 1 -cpu-used 0 -deadline best -b:v 0 -crf 40 -pass 1 -an -f null NUL
ffmpeg -y -i "input.mp4" -c:v libvpx-vp9 -filter:v fps=20 -row-mt 1 -cpu-used 0 -deadline best -b:v 0 -crf 40 -pass 2 -an "output.webm"
```
