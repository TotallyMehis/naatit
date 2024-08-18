foreach ($InputFilePath in $args)
{
    $OutputFilename = [System.IO.Path]::GetFileNameWithoutExtension($InputFilePath)

    ffmpeg -y -i "$InputFilePath" -c:v libaom-av1 -filter:v fps=20 -pix_fmt yuv420p -row-mt 1 -cpu-used 0 -crf 40 -pass 1 -an -f null NUL
    ffmpeg -y -i "$InputFilePath" -c:v libaom-av1 -filter:v fps=20 -pix_fmt yuv420p -row-mt 1 -cpu-used 0 -crf 40 -pass 2 -an "$OutputFilename.avif"
}
