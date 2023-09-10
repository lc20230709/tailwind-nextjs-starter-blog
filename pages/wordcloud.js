import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import cloud from 'd3-cloud';

const WordCloud = ({ data }) => {
  const ref = useRef();

  useEffect(() => {
    const wordsArray = Object.keys(data).map(key => ({ text: key, size: data[key] * 5 })); // 将大小调小

    const layout = cloud()
      .size([500, 500])
      .words(wordsArray)
      .padding(1) // 减小padding
      .rotate(() => 0) // 不旋转
      .fontSize(d => d.size)
      .on('end', draw);

    layout.start();

    function draw(words) {
      d3.select(ref.current).html('');

      const svg = d3
        .select(ref.current)
        .append('svg')
        .attr('width', 500)
        .attr('height', 500)
        .append('g')
        .attr('transform', 'translate(250,250)');

      svg
        .selectAll('text')
        .data(words)
        .enter()
        .append('text')
        .style('font-size', d => `${d.size}px`)
        .attr('text-anchor', 'middle')
        .attr('transform', d => `translate(${[d.x, d.y]})rotate(${d.rotate})`)
        .text(d => d.text);
    }
  }, [data]);

  return <div ref={ref}></div>;
};

export default WordCloud;