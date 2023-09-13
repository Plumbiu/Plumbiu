import { createCanvas } from 'canvas'
import sharp from 'sharp'
import D3Node from 'd3-node'
import cloud from 'd3-cloud'
import { draw } from './utils.js'
import { height, width, wordcloud } from './config.js'

// d3-node options
const options = { selector: '#chart', container: '<div id="chart"></div>' }
// create d3-node instance
const d3n = new D3Node(options)

// generate word-cloud.png
export function run() {
  // foramt words
  const words = wordcloud.map(d => ({
    text: d,
    size: 10 + Math.random() * 90
  }))
  // d3-cloud node example
  const layout = cloud()
    // use node-canvas create canvas object
    .canvas(() => createCanvas(1, 1))
    .size([width, height])
    .words(words)
    .padding(5)
    .rotate(() => Math.floor(Math.random() * 90))
    .fontSize(d => d.size)
    .on('end', () => draw(d3n, layout, words))

  layout.start()
  /*
    github profile can not show svg directly, we can't just put <svg> in README.md
    and svg's size is not correct, we need to set `width` and `height` by ourself
  */
  const svg =
    '<p align="center">\n' +
    d3n
      .svgString()
      .replace(
        'xmlns="http://www.w3.org/2000/svg"',
        `xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"`
      ) +
    '\n</p>'
  // generate image file
  sharp(Buffer.from(svg))
    .resize(2.5 * width, 2.5 * height)
    .toFile('word-cloud.png', (err, info) => {
      if (err) {
        console.log('err', err)
      } else {
        console.log(info)
      }
    })
}

run()
