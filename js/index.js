export default {
  canvasInstance: null,
  ctx: null,
  imageInstance: null,

  init() {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    this.canvasInstance = canvas
    this.ctx = ctx
  },

  loadImage(imgSrc) {
    const img = new Image()
    img.setAttribute('crossorigin', 'anonymous')
    img.src= `${imgSrc}&time=${new Date().valueOf()}`

    img.onload = () => {
      this.imageInstance = img

      let canvasDefaultWidth = this.imgInstance.width
      let canvasDefaultHeight = this.imgInstance.height

      this.canvas.width = canvasDefaultWidth
      this.canvas.height = canvasDefaultHeight
      
      this.ctx.save()
      this.ctx.drawImage(this.imgInstance, 0, 0, canvasDefaultWidth, canvasDefaultHeight)
      this.ctx.restore()
    }

    this.imgInstance.onerror = () => { throw new Error('图片加载失败!') }
  },

  saveImage() {
    const dataUrl = this.canvas.toDataURL()
    this.downloadLink(dataUrl)
  },

  downloadImage(imgUrl) {
    let fileName = `${new Date().valueOf()}`
    try {
      // todo regexp
      fileName = this.previewSrc.match(/[^\/\\]+$/g)[0].split('?')[0]
    } catch (error) {}

    const downloadEle = document.createElement('a')
    downloadEle.href = imgUrl
    downloadEle.download = fileName
    downloadEle.click()
    downloadEle.remove()
  }
}