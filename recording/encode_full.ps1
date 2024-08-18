foreach ($InputFilePath in $args)
{
    $OutputFilename = [System.IO.Path]::GetFileNameWithoutExtension($InputFilePath)

    ffmpeg -y -i "$InputFilePath" -c:v libaom-av1 -pix_fmt yuv420p -row-mt 1 -cpu-used 2 -crf 30 -pass 1 -an -f null NUL
    ffmpeg -y -i "$InputFilePath" -c:v libaom-av1 -pix_fmt yuv420p -row-mt 1 -cpu-used 2 -crf 30 -pass 2 -an "$OutputFilename.webm"
}
