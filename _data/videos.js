const fs = require('fs').promises

/**
 * @typedef MapData
 * @type {object}
 * @property {string} name
 * @property {boolean} hidden
 * @property {VideoData[]} videos
 */

/**
 * @typedef VideoData
 * @type {object}
 * @property {string} title
 * @property {string | undefined} thumbnail
 * @property {boolean | undefined} thumbnail_video
 * @property {string} full
 * @property {string} external
 * @property {boolean} hidden
 * @property {string} description
 */

/**
 * @typedef VideoOutputData
 * @type {object}
 * @property {string} title
 * @property {string} thumbnail
 * @property {string} thumbnail_embed
 * @property {boolean | undefined} thumbnail_video
 * @property {string} full
 * @property {string} external
 * @property {boolean} hidden
 * @property {string} description
 * @property {string} map
 */

/**
 * 
 * @param {MapData[]} maps 
 */
async function mapFileToVideos(maps) {
  /** @type {string[]} */
  let thumbnailFiles = []
  try {
    thumbnailFiles = await fs.readdir('./public/thumbs/')
  } catch (err) {
    console.error('Failed to retrieve filenames of public/thumbs/-directory', err)
    throw err
  }

  /**
   * 
   * @param {string} p 
   */
  const getBaseFilenameOfThumbnail = p => {
    const pathSepIndex = p.lastIndexOf('/')
    let extIndex = p.lastIndexOf('.')
    if (extIndex === -1) {
      extIndex = undefined
    }

    return p.substring(pathSepIndex + 1, extIndex)
  }

  /**
   * @param {string} mainThumbnailFile 
   * @returns {string | undefined}
   */
  const getEmbedThumbnail = (mainThumbnailFile) => {
    const baseFilename = getBaseFilenameOfThumbnail(video.thumbnail)
    const embedThumbnailName = baseFilename + '.webp'

    const hasEmbedThumbnail = thumbnailFiles.some(filename => filename === embedThumbnailName)
    
    if (!hasEmbedThumbnail) {
      return undefined 
    }

    return '/' + embedThumbnailName
  }
  
  /** @type {VideoOutputData[]} */
  const output = []

  for (const map of maps) {
    if (map.hidden) {
      continue
    }

    for (const video of map.videos) {
      if (video.hidden || !video.thumbnail) {
        continue
      }

      const thumbnail_embed = getEmbedThumbnail()

      output.push({
        title: video.title,
        thumbnail: video.thumbnail,
        thumbnail_embed,
        thumbnail_video: video.thumbnail_video,
        full: video.full,
        external: video.external,
        hidden: video.hidden,
        description: video.description,
        map: map.name
      })
    }
  }

  return output
}

async function getVideos() {
  try {
    const content = await fs.readFile('./_data/maps.json', { encoding: 'utf-8' })

    /** @type {MapData[]} */
    const maps = JSON.parse(content)

    return mapFileToVideos(maps)
  } catch (err) {
    console.error('Failed to read maps.json for video page generation!', err)
    throw err
  }
}


module.exports = async function () {
  return await getVideos()
}
