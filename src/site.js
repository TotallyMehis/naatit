window.addEventListener('load', () => {
  /**
   * @param {string} videoUrl 
   * @param {HTMLDivElement} parentElement 
   */
  function createVideoElement(videoUrl, parentElement) {
    const video = document.createElement('video')
    video.controls = true
    video.autoplay = true
    video.muted = true
    video.width = 1920
    video.classList.add('full')
    
    const source = document.createElement('source')
    source.type = 'video/webm'
    source.src = videoUrl

    video.appendChild(source)
    parentElement.appendChild(video)

    /** @type {HTMLVideoElement|HTMLImageElement} */
    const thumbnail = parentElement.firstElementChild
    thumbnail.classList.add('hidden')
  }

  /** @this {HTMLSpanElement} */
  function onClickLink() {
    const videoUrl = this.getAttribute('data-embed-video-url')
    const fullLink = (new URL(videoUrl, document.location)).href
    navigator.clipboard.writeText(fullLink)
  }

  /** @type {NodeListOf<HTMLSpanElement>} */
  const links = document.querySelectorAll('.title-container .link')
  for (const link of links) {
    link.addEventListener('click', onClickLink)
  }

  /** @type {NodeListOf<HTMLDivElement>} */
  const videoContainers = document.querySelectorAll('.video-container')
  for (const videoContainer of videoContainers) {
    const fullVideoUrl = videoContainer.getAttribute('data-video')
    if (!fullVideoUrl) {
      continue;
    }

    /** @type {HTMLDivElement} */
    const playButton = videoContainer.querySelector('.play-button')

    playButton.addEventListener('click', () => {
      createVideoElement(fullVideoUrl, videoContainer)
      playButton.remove()
    })
  }
})
