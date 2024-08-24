foreach ($InputFilePath in $args)
{
    $OutputFilename = [System.IO.Path]::GetFileNameWithoutExtension($InputFilePath)

    ffmpeg -y -i "$InputFilePath" -frames:v 1 -c:v libwebp -pix_fmt yuv420p -compression_level 6 "$OutputFilename.webp"
}
