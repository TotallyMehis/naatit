# Naatit

[naatit.mehis.dev](https://naatit.mehis.dev)

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

Videos should be encoded using FFMPEG's VP9 encoder.

```bash
# Replace '/dev/null' with 'NUL' when using Windows.
# Specifying YUV 420 here because webms with YUV 422 bug out on Firefox for Android.

# Full video
ffmpeg -y -i "input.mp4" -c:v libvpx-vp9 -pix_fmt yuv420p -row-mt 1 -cpu-used 2 -deadline good -b:v 0 -crf 30 -pass 1 -an -f null /dev/null
ffmpeg -y -i "input.mp4" -c:v libvpx-vp9 -pix_fmt yuv420p -row-mt 1 -cpu-used 2 -deadline good -b:v 0 -crf 30 -pass 2 -an "output.webm"

# Thumbnail video
ffmpeg -y -i "input.mp4" -c:v libvpx-vp9 -filter:v fps=20 -pix_fmt yuv420p -row-mt 1 -cpu-used 0 -deadline best -b:v 0 -crf 40 -pass 1 -an -f null /dev/null
ffmpeg -y -i "input.mp4" -c:v libvpx-vp9 -filter:v fps=20 -pix_fmt yuv420p -row-mt 1 -cpu-used 0 -deadline best -b:v 0 -crf 40 -pass 2 -an "output.webm"
```
