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

## Recording video

Videos have been recorded using OBS with `Indistinguishable Quality, Large File Size` setting.

### In-game settings

- High settings
- 8x MSAA
- 100% Brightness

Copy the contents of `recording/cfg` directory to `game/csgo/cfg`.

```bash
# Apply settings to record video. 
exec rec.cfg

# Apply settings to record thumbnails. 
exec rec_thumb.cfg

# Apply settings to record flashbang thumbnails. 
exec rec_thumb_flash.cfg

# All recording settings off. 
exec rec_off.cfg
```

### Encoding

Videos should be encoded using FFMPEG's AV1 encoder. The Powershell scripts inside `recording` directory will perform this for you with the correct settings:

```powershell
# Both scripts accept multiple files, encoding them sequentially.

# Encode thumbnail animated image into a THUMB_VIDEO.avif file.
.\encode_thumb.ps1 "C:\PATH_TO\THUMB_VIDEO.mp4" ...

# Encode full video into a FULL_VIDEO.webm file.
.\encode_full.ps1 "C:\PATH_TO\FULL_VIDEO.mp4" ...

# Encode thumbnail image into a FULL_VIDEO.webp file. This is used for embeds.
.\encode_embed_thumb.ps1 "C:\PATH_TO\FULL_VIDEO.mp4" ...
```
