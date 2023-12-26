// SVG setup: Population pyramid

const chart = d3.select("#svgWrapper");

let width = chart.node().getBoundingClientRect().width;
let height = chart.node().getBoundingClientRect().height;

let widthDivided = width / 3;

const margin = {
    top: 20,
    left: 50,
    bottom: 50,
    right: 50,
};

const svgPyramid = d3
    .select("#svg")
    .attr("width", width)
    .attr("height", height);

// filter data for the 3 pyramids at the end, and the
let age1950 = age.filter((d) => d.year === 1950);
let age1993 = age.filter((d) => d.year === 1993);
let age2067 = age.filter((d) => d.year === 2067);
let age2100 = age.filter((d) => d.year === 2100);

let ageExtent = d3.extent(age, (d) => d.age);
let valueExtent = d3.extent(age, (d) => d.value);

const xM = d3
    .scaleLinear()
    .domain(valueExtent)
    .range([width / 2, margin.left]);

const xF = d3
    .scaleLinear()
    .domain(valueExtent)
    .range([width / 2, width - margin.right]);

const y = d3
    .scaleLinear()
    .domain(ageExtent)
    .range([height - margin.bottom, margin.top]);

const xM2 = d3
    .scaleLinear()
    .domain(valueExtent)
    .range([widthDivided / 2, 0]);

const xF2 = d3
    .scaleLinear()
    .domain(valueExtent)
    .range([widthDivided / 2, widthDivided]);

// create g element
let gPyramid = svgPyramid.append("g");

// add all axes and labels
gPyramid
    .append("text")
    .attr("x", xM(100))
    .attr("y", 20)
    .attr("fill", "#fff")
    .attr("id", "textM")
    .text("Male");

gPyramid
    .append("text")
    .attr("x", xF(100))
    .attr("y", 20)
    .attr("fill", "#fff")
    .attr("id", "textF")
    .text("Female");

gPyramid
    .append("text")
    .attr("x", xM(0))
    .attr("y", height - 2)
    .attr("fill", "#fff")
    .attr("id", "textSource")
    .attr("text-anchor", "middle")
    .style("font-size", 14)
    .text("Source: UN World Population Prospects 2022");

function createXAxis(axis, scale) {
  return axis(scale).tickFormat((d) => {
    if (d === 0) {
      return "0";
    }
    if (d % 50 === 0) {
      return d + "K";
    } else {
      return "";
    }
  });
}

let xAxisM = createXAxis(d3.axisBottom, xM);
let xAxisF = createXAxis(d3.axisBottom, xF);
    
gPyramid
    .append("g")
    .attr("class", "x-axis-M")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(xAxisM);

gPyramid
    .append("g")
    .attr("class", "x-axis-F")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(xAxisF);

gPyramid
    .append("path")
    .attr(
        "d",
        `M${margin.left + 80},${y(100)} L${margin.left + 50},${y(100)} L${
      margin.left + 50
    },${y(64)} L${margin.left + 80},${y(64)}`
    )
    .attr("fill", "none")
    .attr("stroke", "#fff")
    .attr("class", "annotation");

gPyramid
    .append("path")
    .attr(
        "d",
        `M${margin.left + 80},${y(64)} L${margin.left + 50},${y(64)} L${
      margin.left + 50
    },${y(14)} L${margin.left + 80},${y(14)}`
    )
    .attr("fill", "none")
    .attr("stroke", "#fff")
    .attr("class", "annotation");

gPyramid
    .append("path")
    .attr(
        "d",
        `M${margin.left + 80},${y(14)} L${margin.left + 50},${y(14)} L${
      margin.left + 50
    },${y(0)} L${margin.left + 80},${y(0)}`
    )
    .attr("fill", "none")
    .attr("stroke", "#fff")
    .attr("class", "annotation");

gPyramid
    .append("text")
    .attr("class", "annotationText")
    .attr("x", 80)
    .attr("y", y(82.5))
    .attr("fill", "#fff")
    .attr("text-anchor", "end")
    .text("65+");

gPyramid
    .append("text")
    .attr("class", "annotationText")
    .attr("x", 80)
    .attr("y", y(40))
    .attr("fill", "#fff")
    .attr("text-anchor", "end")
    .text("15-64");

gPyramid
    .append("text")
    .attr("class", "annotationText")
    .attr("x", 80)
    .attr("y", y(7))
    .attr("fill", "#fff")
    .attr("text-anchor", "end")
    .text("0-14");

// create g elements for the 3 squished pyramids at the end

let g1950 = gPyramid.append("g").attr("class", "g1950");
let g1993 = gPyramid
    .append("g")
    .attr("class", "g1993")
    .attr("transform", `translate(${widthDivided},0)`);
let g2100 = gPyramid
    .append("g")
    .attr("class", "g2100")
    .attr("transform", `translate(${widthDivided * 2},0)`);

// draw the bars for the 3 squished pyramids but set them to invisible to start
g1950
    .selectAll("rect.bars1950")
    .data(age1950)
    .join("rect")
    .attr("class", "bars bars1950")
    .attr("x", (d) => (d.sex === "M" ? xM2(d.value) : xF2(0)))
    .attr("y", (d) => y(d.age))
    .attr("height", height / age1950.length)
    .attr("width", (d) =>
        d.sex === "M" ? xM2(0) - xM2(d.value) : xF2(d.value) - xF2(0)
    )
    .attr("fill", (d) => colorPyramid(d))
    .style("opacity", 0);

g1950
    .append("text")
    .attr("x", 0)
    .attr("y", 30)
    .attr("fill", "#fff")
    .text("1950")
    .style("opacity", 0);

g1993
    .selectAll("rect.bars1993")
    .data(age1993)
    .join("rect")
    .attr("class", "bars bars1993")
    .attr("x", (d) => (d.sex === "M" ? xM2(d.value) : xF2(0))) //xM(d.value)
    .attr("y", (d) => y(d.age))
    .attr("height", height / age1950.length)
    .attr("width", (d) =>
        d.sex === "M" ? xM2(0) - xM2(d.value) : xF2(d.value) - xF2(0)
    )
    .attr("fill", (d) => colorPyramid(d))
    .style("opacity", 0);

g1993
    .append("text")
    .attr("x", 0)
    .attr("y", 30)
    .attr("fill", "#fff")
    .text("1993")
    .style("opacity", 0);

g2100
    .append("text")
    .attr("x", 0)
    .attr("y", 30)
    .text("2100")
    .attr("fill", "#fff")
    .style("opacity", 0);

// main pyramid animation
let gBars = gPyramid.append("g").attr("class", "gBars");

gBars
    .selectAll("rect.barsAll")
    .data(age1950)
    .join("rect")
    .attr("class", (d) => (d.sex === "M" ? "barsAll male" : "barsAll female"))
    .attr("x", (d) => (d.sex === "M" ? xM(d.value) : xF(0))) //xM(d.value)
    .attr("y", (d) => y(d.age))
    .attr("height", height / age1950.length)
    .attr("width", (d) =>
        d.sex === "M" ? xM(0) - xM(d.value) : xF(d.value) - xF(0)
    )
    .attr("fill", (d) => colorPyramid(d));

function colorPyramid(d) {
    if (d.sex === "M") {
        if (d.age >= 64) {
            return "#CE7960";
        } else if (d.age < 64 && d.age >= 15) {
            return "#F19430";
        } else {
            return "#F4C44D";
        }
    } else {
        if (d.age >= 64) {
            return "#6065AD";
        } else if (d.age < 64 && d.age >= 15) {
            return "#8892C1";
        } else {
            return "#A2C4D9";
        }
    }
}

function squishPyramids() {
    gPyramid
        .selectAll("rect.barsAll")
        .transition()
        .duration(300)
        .attr("transform", `translate(${widthDivided * 2},0)`)
        .attr("x", (d) => (d.sex === "M" ? xM2(d.value) : xF2(0)))
        .attr("width", (d) =>
            d.sex === "M" ? xM2(0) - xM2(d.value) : xF2(d.value) - xF2(0)
        );

    gPyramid
        .selectAll("rect.bars1950")
        .transition()
        .duration(300)
        .style("opacity", 1);
    gPyramid
        .selectAll("rect.bars1993")
        .transition()
        .duration(300)
        .style("opacity", 1);

    gPyramid.selectAll("text").style("opacity", 1);
    d3.selectAll(".x-axis-M").style("opacity", 0);
    d3.selectAll(".x-axis-F").style("opacity", 0);
    d3.selectAll(".annotation").style("opacity", 0);
    d3.selectAll(".annotationText").style("opacity", 0);
}

function stretchPyramid() {
    gPyramid
        .selectAll("rect.barsAll")
        .attr("transform", `translate(0,0)`)
        .transition()
        .duration(300)
        .attr("x", (d) => (d.sex === "M" ? xM(d.value) : xF(0)))
        .attr("width", (d) =>
            d.sex === "M" ? xM(0) - xM(d.value) : xF(d.value) - xF(0)
        );

    gPyramid
        .selectAll("rect.bars1950")
        .transition()
        .duration(300)
        .style("opacity", 0);
    gPyramid
        .selectAll("rect.bars1993")
        .transition()
        .duration(300)
        .style("opacity", 0);

    gPyramid.selectAll("text").style("opacity", 0);
    d3.selectAll(".x-axis-M").style("opacity", 1);
    d3.selectAll(".x-axis-F").style("opacity", 1);
    d3.selectAll(".annotation").style("opacity", 1);
    d3.selectAll(".annotationText").style("opacity", 1);
}

let currentYear = 1950;
let intervalAge;

function animatePyramid() {
    let population = data.filter(
        (d) => d.country === "Taiwan" && d.year === currentYear
    )[0].sum_value;

    if (currentYear < 2100) {
        currentYear++;
    }

    if (currentYear === 1993) {
        clearInterval(intervalAge);
        animationRunning = false;
        d3.select("#marker").html("2/4");
    }

    if (currentYear === 2067) {
        clearInterval(intervalAge);
        animationRunning = false;
        d3.select("#marker").html("3/4");
    }

    if (currentYear === 2100) {
        clearInterval(intervalAge);
        animationRunning = false;
        squishPyramids();
        d3.select("#textSource").style("opacity", 0);
        d3.select("#textF").style("opacity", 0);
        d3.select("#textM").style("opacity", 0);
        d3.select("#marker").html("4/4");
        d3.select("#year").html(currentYear);
        d3.select("#population").html(population * 1000);
        return;
    }

    d3.select("#year").html(currentYear);
    d3.select("#population").html(population * 1000);

    let pyramidYear = age.filter((d) => d.year === currentYear);

    gPyramid
        .selectAll("rect.barsAll")
        .data(pyramidYear)
        .transition()
        .duration(60)
        .attr("x", (d) => (d.sex === "M" ? xM(d.value) : xF(0)))
        .attr("y", (d) => y(d.age))
        .attr("width", (d) =>
            d.sex === "M" ? xM(0) - xM(d.value) : xF(d.value) - xF(0)
        )
        .attr("fill", (d) => colorPyramid(d));
}


let index = 0;
let animationRunning = false; // Flag to track if the animation is currently running

$("#next").on("click", function() {
    if (index == 0) {
        index++;
        intervalAge = setInterval(animatePyramid, 75); // Start the animation on the first click
        animationRunning = true; // Set the flag to indicate animation is running
    } else if (index == 1 && !animationRunning) {
        clearInterval(intervalAge); // Pause the animation
        intervalAge = setInterval(animatePyramid, 75);
        animationRunning = true; // Set the flag to indicate animation is running
        index++;
    } else if (index == 2 && !animationRunning) {
        clearInterval(intervalAge); // Pause the animation
        $("#next").css("display", "none");
        intervalAge = setInterval(animatePyramid, 75);
        animationRunning = true; // Set the flag to indicate animation is running
        index++;
    } else if (index == 3 && !animationRunning) {
        clearInterval(intervalAge); // Pause the animation
        intervalAge = setInterval(animatePyramid, 75);
        animationRunning = true; // Set the flag to indicate animation is running
        index++;
    }
});

