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
 * @property {string} thumbnail
 * @property {string} thumbnail_embed
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
function mapFileToVideos(maps) {
  /** @type {VideoOutputData[]} */
  const output = []

  for (const map of maps) {
    if (map.hidden) {
      continue
    }

    for (const video of map.videos) {
      if (video.hidden) {
        continue
      }

      output.push({
        title: video.title,
        thumbnail: video.thumbnail,
        thumbnail_embed: video.thumbnail_embed,
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
