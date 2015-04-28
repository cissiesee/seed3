
define(function(require){
    var when = require('when');
    require('queue');
    var rateById = d3.map();

// var quantize = d3.scale.quantize()
//     .domain([0, 3])
//     .range(d3.range(3).map(function(i) {return "q" + i;}));

    var width = 960, height = 600;

    var proj = d3.geo.mercator().center([105, 38]).scale(750).translate([width/2, height/2]);
    var path = d3.geo.path().projection(proj);

    var svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height);

    //queue()
    //    .defer(d3.json, "geoData/china_cities.json")
    //    .defer(d3.json, "geoData/china_provinces.json")
    //    //.defer(d3.csv, "data/china_cities.csv", function(d) {rateById.set(d.id, +d.value);})
    //    .await(makeMap);

    //not using queue, use when.all
    when.all([
        (function(){
            var defer = when.defer();
            d3.json('geoData/china_cities.json',function(err,json){
                if (err) return console.warn(err);
                defer.resolve(json);

            });
            return defer.promise;
        })(),
        (function(){
            var defer = when.defer();
            d3.json('geoData/china_provinces.json',function(err,json){
                if (err) return console.warn(err);
                defer.resolve(json);
            });
            return defer.promise;
        })()
        ]).then(function(values){
            console.log('values',values);
            makeMap(undefined,values[0],values[1]);
        });

    function makeMap(error, counties, states) {
        svg.append("g")
            .attr("class", "counties")
            .selectAll("path")
            .data(counties.features)
            .enter()
            .append("path")
            .attr("class", function(d) { return "q" + rateById.get(d.id); })
            .attr("d", path);

        svg.append("g")
            .attr("class", "states")
            .selectAll("path")
            .data(states.features)
            .enter()
            .append("path")
            .attr("d", path)
    }
});
