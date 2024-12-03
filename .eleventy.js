import esbuild from 'esbuild'
import { minify } from 'html-minifier'

/**
 * @param {import('@11ty/eleventy').UserConfig} eleventyConfig 
 */
export default function (eleventyConfig) {
  const isDevelopment = false

  eleventyConfig.addPassthroughCopy({ 'public/**': '.' })

  eleventyConfig.addWatchTarget('./src/')

  eleventyConfig.addTransform('htmlmin', function (content, outputPath) {
    if (outputPath.endsWith('.html')) {
      return minify(content, {
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        removeComments: true,
        useShortDoctype: true
      })
    }

    return content
  })

  eleventyConfig.on('afterBuild', async () => {
    await esbuild.build({
      entryPoints: ['src/site.css', 'src/site.js'],
      outdir: '_site',
      minify: !isDevelopment,
      sourcemap: isDevelopment,
      define: {
        'DEBUG': isDevelopment ? 'true' : 'false'
      }
    })
  })
}
