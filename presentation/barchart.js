async function draw() {
  // load data
  const data = await d3.json("data/xyvalues.json")

  // accessor functions for the data elements
  const xAccessor = (d) => d.x
  const yAccessor = (d) => d.y

  // dimensions
  // these should be consistent with the css-properties of #barchart!
  let dimensions = {
    // first the container, i.e. the g
    width: 300,
    height: 300,
    // leave some space for title, tick and axis labels etc.
    margin: {
      top: 50,
      bottom: 50,
      left: 70,
      right: 30
    }
  }

  dimensions.ctrWidth = dimensions.width - dimensions.margin.left - dimensions.margin.right
  dimensions.ctrHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom

  // draw image: insert an svg-element into the <div id="barchart"></div>
  const svg = d3.select('#barchart')
    .append('svg')
    .attr('width', dimensions.width)
    .attr('height', dimensions.height)
  
  // g is short for group -> a container that groups the shapes together
  const ctr = svg.append('g')
    .attr('transform',
          `translate(${dimensions.margin.left}, ${dimensions.margin.top})`
    )
  
  // the tooltips
  const tooltip = d3.select('#tooltip')
  // and the mouse-over
  const mouseenter = function(event, datum) {
    d3.select(this)
      .attr('fill', 'purple')
      .attr('r', 8)
    tooltip.style('display', 'block')
      .style('top', yScale(yAccessor(datum)) - 40 + "px")
      .style('left', xScale(xAccessor(datum)) + "px")
    
    tooltip.select('.tt-label span')
      .text(datum.label)
    
      tooltip.select('.tt-x span')
      .text(xAccessor(datum))

      tooltip.select('.tt-y span')
      .text(yAccessor(datum))
  }

  const mouseleave = function(event) {
    d3.select(this)
      .attr('fill', 'red')
      .attr('r', 5)
    tooltip.style('display', 'none')
  }

  // set scales
  const xScale = d3.scaleLinear()
    .domain(d3.extent(data, xAccessor))
    .range([0, dimensions.ctrWidth])
  
  const yScale = d3.scaleLinear()
    .domain(d3.extent(data, yAccessor))
    .range([dimensions.ctrHeight, 0])

  // draw circles
  ctr.selectAll('circle')
    .data(data)
    .join('circle')
    .attr('cx', d => xScale(xAccessor(d)))
    .attr('cy', d => yScale(yAccessor(d)))
    .attr('r', 5)
    .attr('fill', 'red')
    // and attach the mouse-over events
    .on('mouseenter', mouseenter)
    .on('mouseleave', mouseleave)

  // axes
  const xAxis = d3.axisBottom(xScale)
    .ticks(5)
  const yAxis = d3.axisLeft(yScale)
  
  // put the shapes from the axis-function into a separate group
  const xAxisGroup = ctr.append('g')
    .call(xAxis)
    .style('transform', `translateY(${dimensions.ctrHeight}px)`)
    .classed('axis', true)
  
  xAxisGroup.append('text')
    .attr('x', dimensions.ctrWidth / 2)
    .attr('y', dimensions.margin.bottom - 5)
    .attr('fill', 'black')
    .text('x')

  const yAxisGroup = ctr.append('g')
    .call(yAxis)
    //.style('transform', `translateX(${dimensions.ctrHeight}px)`)
    .classed('axis', true)

  yAxisGroup.append('text')
    .attr('x', -dimensions.ctrHeight / 2)
    .attr('y', -dimensions.margin.left + 25)
    .attr('fill', 'black')
    .text('y') 
    .style('transform', 'rotate(270deg)')
    .style('text-anchor', 'middle')
}

draw()