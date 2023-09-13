import * as core from '@actions/core'
import { svgHTML } from './canvas/index.js'

function run() {
  const words = [
    'React',
    'Vue',
    'Nuxt3',
    'Nextjs',
    'Pinia',
    'Zustand',
    'Rust',
    'TS',
    'JS'
  ]
  svgHTML(words)
  core.info('running~~~~')
}

run()
