window.addEventListener('load', () => {
  /**
   * @param {string} videoUrl 
   * @param {HTMLDivElement} parentElement 
   */
  function createVideoElement(videoUrl, parentElement) {
    const video = document.createElement('video')
    video.src = videoUrl
    video.controls = true
    video.autoplay = true
    video.muted = true
    video.classList.add('full')
    parentElement.insertBefore(video, parentElement.firstElementChild)

  }

  /** @this {HTMLAnchorElement} */
  function onClickLink() {
    const fullLink = (new URL(this.href, document.location)).href
    navigator.clipboard.writeText(fullLink)
  }

  /** @type {NodeListOf<HTMLAnchorElement>} */
  const links = document.querySelectorAll('.title-container .link a')
  for (const link of links) {
    link.addEventListener('click', onClickLink)
  }

  /** @type {NodeListOf<HTMLDivElement>} */
  const videoContainers = document.querySelectorAll('.video-container')
  for (const videoContainer of videoContainers) {
    const video = videoContainer.getAttribute('data-video')
    if (!video) {
      continue;
    }

    /** @type {HTMLDivElement} */
    const playButton = videoContainer.querySelector('.play-button')

    playButton.addEventListener('click', () => {
      createVideoElement(video, videoContainer)
      playButton.remove()
    })
  }
})
