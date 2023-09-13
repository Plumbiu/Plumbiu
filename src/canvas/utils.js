function randomColor() {
  const random = [
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255)
  ]
  return `rgb(${random.join(',')})`
}

export function draw(d3n, layout, words) {
  d3n
    .createSVG()
    .append('svg')
    .attr('width', layout.size()[0])
    .attr('height', layout.size()[1])
    .append('g')
    .attr('transform', 'translate(' + layout.size()[0] / 2 + ',' + layout.size()[1] / 2 + ')')
    .selectAll('text')
    .data(words)
    .enter()
    .append('text')
    .style('font-size', d => {
      return d.size + 'px'
    })
    .style('font-family', 'Impact')
    .attr('text-anchor', 'middle')
    .style('fill', () => randomColor())
    .attr('transform', d => 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')')
    .text(d => d.text)
}
