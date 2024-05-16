## Description
A demo to create animated population pyramids by year in D3, then also show small multiple pyramids at the end of multiple years

<img width="983" alt="Screenshot 2023-12-26 at 19 41 02" src="https://github.com/jhjanicki/animatedPyramid/assets/6565011/9d15e157-3a50-43ba-b856-2021f9f6ae80">
<img width="983" alt="Screenshot 2023-12-26 at 19 41 24" src="https://github.com/jhjanicki/animatedPyramid/assets/6565011/f51b97b8-7f1a-45f4-a625-4de44769da3f">

## Data
UN World Population Prospects 2022, Taiwan data

## Tutorial

### Data
data.js: Main data, includes year from 1950-2100, age from 0-100, sex FM and M
age.js: Secondary data, not as important but to keep track of total population by year

### SVG setup
```
const chartPyramid = d3.select("#chartPyramid");

let widthPyramid = chartPyramid.node().getBoundingClientRect().width;
let heightPyramid = chartPyramid.node().getBoundingClientRect().height;

let widthDivided = widthPyramid / 3;

const margin = {
  top: 20,
  left: 50,
  bottom: 50,
  right: 50,
};

const svgPyramid = d3
  .select("#svgPyramid")
  .attr("width", widthPyramid)
  .attr("height", heightPyramid);
```
### Only need data for one year 
```
let age1950 = age.filter(d => d.year === 1950)
```
### Create a pyramid that splits into three

Create a group for each of the three pyramids
```
let g1950 = gPyramid.append("g").attr("class", "g1950");
let g1993 = gPyramid
  .append("g")
  .attr("class", "g1993")
  .attr("transform", `translate(${widthDivided},0)`);
let g2100 = gPyramid
  .append("g")
  .attr("class", "g2100")
  .attr("transform", `translate(${widthDivided * 2},0)`);
```
