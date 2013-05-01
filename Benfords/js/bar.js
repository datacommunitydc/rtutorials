

status ="Billable - Aged"
//var formatTime = d3.time.format("%Y-%m-%d");

data = [
{"digit": 1, "prob":0.30103000},
{"digit": 2, "prob":0.17609126},
{"digit": 3, "prob":0.12493874 },
{"digit": 4, "prob":0.09691001 },
{"digit": 5, "prob":0.07918125},
{"digit": 6, "prob":0.06694679 },
{"digit": 7, "prob":0.05799195},
{"digit": 8, "prob":0.05115252},
{"digit": 9, "prob":0.04575749}
]

Math.log = (function() {
  var log = Math.log;
  return function(n, base) {
    return log(n)/(base ? log(base) : 1);
  };
})();


function build_benford_dist(base){
    var out = []
    for (var i=0;i<(base-1);i++)
        { 
        out[i] = {'digit':i+1,'prob':  Math.log( (1 + (1/(i+1))), base)}

        }
    return out

}

  $(function() {
    $( "#slider" ).slider({
      value:10,
      min: 3,
      max: 50,
      step: 1,
      slide: function( event, ui ) {
       // $( "#amount" ).val( "$" + ui.value );
        $('#titleText')[0].innerHTML = "Benford's Distribution for base: " + (ui.value )
       console.log( ui.value)
       drawBar(build_benford_dist( ui.value ), groups,"org")
      }
    });
})





var m = [120, 60, 60, 60],
    w = 960 - m[1] - m[3],
    h = 600 - m[0] - m[2];

var margin = {top: 10, right: 10, bottom: 100, left: 40},
    margin2 = {top: 430, right: 10, bottom: 20, left: 40},
    width = 850 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom,
    height2 = 500 - margin2.top - margin2.bottom,
    duration = 3000,
    delay = 500;

var color = d3.scale.category10();

var svg = d3.select("#vis").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)

    svg.append('svg:rect')
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("class", "background")

y = d3.scale.ordinal().rangeRoundBands([0, h-10], .1);
x = d3.scale.linear().range([0, width - margin.left - 100])


 xAxis = d3.svg.axis().scale(x).orient("top").tickSize(-h),
    yAxis = d3.svg.axis().scale(y).orient("right").tickSize(0);

svg.append('text')
        .attr("class", "countText")
        .attr("text-anchor", "left")
        .attr("x", 450)
        .attr("y", 20)
        .text("")

  groups = svg.append("g")
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform",  "translate(100,30 )")

  svg.append("g")
      .attr("class", "y axis")
      .attr("transform",  "translate(0,30 )")

drawBar(data, groups , "org");


function drawBar(data, groups , level){
    console.log(level);
    console.log(data);



d3.selectAll("rect.entering")
  .attr("class", "exiting")
  .transition().duration(1500).ease("exp-in-out")
      .attr("width",  "0")
      .style("opacity", .8)
  .transition().duration(2000).ease("exp-in-out")
      .remove()


    y.domain(data.map(function(d) { return d.digit }));

    if ($('#recalcDomain').is(':checked')){
        x.domain([0 ,  d3.max(data, function(d){return d.prob})]);
    } else {
        x.domain([0 ,  1])
    }



    groups.selectAll("rect.entering").data(data)
      .enter().insert("rect")
      .attr("class", "entering")
      .attr("y", function(d) { return y(d.digit)+30   })
      .attr("height" , y.rangeBand())

                    .attr("fill-opacity", .8)
      .attr("x", "100")
      .style("fill", function(d){return color(d.digit)})

      .on("mouseover", function(d, i) 
            { 
              console.log(d);
                d3.select(this)
                    .attr("fill-opacity", 1);
                d3.select(".countText")
                 .attr("fill-opacity", 0) 
                 .attr("y", y(d.digit)+45+(y.rangeBand()/2)) 
                 .attr("x",  x(d.prob)+100) 
                    .text(d.prob)
                    .transition().duration(500).ease("exp-in-out").attr("fill-opacity", 1);

      //          d3.selectAll(".x").transition().duration(500).ease("exp-in-out").attr("fill-opacity", 0)
            })
            .on("mouseout", function(d, i) 
            {
                d3.select(this)
                    .attr("fill-opacity", .8);
                d3.select(".countText")
                    .transition().duration(500).ease("exp-in-out").attr("fill-opacity", 0)

                d3.selectAll(".x").transition().duration(500).ease("exp-in-out").attr("fill-opacity", 1)
            })
     .transition().duration(1500).ease("exp-in-out")
      .attr("width", function(d){ return x(d.prob)})
    //.on("click", function(d){


               //drawBar(rawData, groups, "org");

                  //})

  d3.selectAll(".y")
      .style("z-index", 999)
      .transition().duration(1500).ease("exp-in-out")
      .call(yAxis);

  d3.selectAll(".x").transition().duration(1500).ease("exp-in-out")
      .call(xAxis)

}




