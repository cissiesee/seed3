define(function(require,exports){

    require('d3')
    require('jquery');

    exports.draw = function(div, options) {

        var chinaJsonPath = "mapdata/china.json";

        var nodes = [];
        var provinceNodes = [];
        var countriesNodes = [];
        var background = "#D1EEEE";
        var overColor = "#F08080";
        var svg = null;
        var width = options.width;
        var height = options.height;
        var textColor = 'black';
        var inBackLayer = false;

        svg = d3.select(div).append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(0,0)");

        var projection = d3.geo.mercator()
            .center([107, 38])
            .scale(width / 2 - 40)
            .translate([width / 4 + 80, height / 2]);

        var path = d3.geo.path().projection(projection);


        d3.json(chinaJsonPath, function (error, root) {

            var backColor;

            svg.selectAll(".pathChina")
                .data(root.features)
                .enter()
                .append("path")
                .attr("class", "pathChina")
                .attr("stroke", "#000")
                .attr("stroke-width", 0.3)
                .attr("fill", function (d) {
                    return background;
                })
                .attr("d", path)
                .on("mouseover", function (d) {
                    if(inBackLayer)return;
                    backColor = d3.select(this).attr("fill");
                    var colorPre = d3.select(this)
                        .attr("fill", overColor);

                    svg.append("text").attr("class","province_name")
                                .attr("dx", path.centroid(d)[0]).attr("dy",path.centroid(d)[1]).attr("text-anchor","middle")
                                .attr("fill",textColor).attr("font-size","12px").attr("fill-opacity",1)
                                .text(d.properties.name);
                })
                .on("mouseout", function (d) {
                    d3.select(this)
                        .attr("fill", backColor);
                    d3.select('.province_name').remove();
                }).on("click", function (d) {
                    if(inBackLayer){
                        d3.selectAll(".pathChina").attr("opacity",1);
                        inBackLayer = false;
                        d3.selectAll(".pathProvince").remove();
                        d3.selectAll(".pathCountry").remove();
                        d3.selectAll(".city-name").remove();
                        d3.selectAll(".country-name").remove();
                    }else{
                        var id = d.properties.id;
                        clickChina(d,  "mapdata/geometryProvince/" + id + ".json");

                    }

                });

            $(document).on('click',function(){
                if(inBackLayer){
                    d3.selectAll(".pathChina").attr("opacity",1);
                    inBackLayer = false;
                    d3.selectAll(".pathProvince").remove();
                    d3.selectAll(".pathCountry").remove();
                    d3.selectAll(".city-name").remove();
                    d3.selectAll(".country-name").remove();
                }
            });

            root.features.forEach(function (d) {
                var centroid = path.centroid(d);
                centroid.x = centroid[0];
                centroid.y = centroid[1];
                centroid.id = d.properties.id;
                centroid.name = d.properties.name;
                centroid.feature = d;
                nodes.push(centroid);
            });



            //nodes.forEach(function(d){
            //    var name = d.name;
            //    if(name != undefined) {
            //        svg.append("text").attr("class","province_name")
            //            .attr("dx",d.x).attr("dy",d.y).attr("text-anchor","middle")
            //            .attr("fill",textColor).attr("font-size","12px").attr("fill-opacity",1)
            //            .text(d.name);
            //    }
            //});

        });

        function clickChina(d, path) {
            d3.selectAll(".pathChina").attr("opacity",0.5);
            inBackLayer = true;
            removePath();
            drawPrivenceMap(d, path, svg);
            d3.event.preventDefault();
            d3.event.stopPropagation();
        }

        function clickProvince(d) {
            removePath();
            drawCountryMap(d, svg);
            d3.event.preventDefault();
            d3.event.stopPropagation();
        }

        function clickCountry(d, path) {
            removePath();
            drawPrivenceMap(d, path, svg);
            d3.event.preventDefault();
            d3.event.stopPropagation();
        }

        function drawPrivenceMap(d, mapPath, svg) {

            d3.json(mapPath, function(error, root) {

                //if (error)
                //    return console.error(error);
                //console.log(root.features);
                var earlierNode = nodes.filter(function(item){return item.id == d.properties.id})[0];
                console.log('d',earlierNode);
                var projection = d3.geo.mercator()
                    .center(getCenters(root.features))
                    //.center([earlierNode.x,earlierNode.y])
                    .center(root.cp)
                    .scale(width / 2 - 40)

                    //.translate([width/3*1, height/2]);

                var path = d3.geo.path().projection(projection);

                //var color = d3.scale.category20();

                svg.selectAll(".pathProvince")
                    .data( root.features )
                    .enter()
                    .append("path")
                    .attr("class", "pathProvince")
                    .attr("stroke","#000")
                    .attr("stroke-width",0.3)
                    .attr("fill", function(d){
                        return background;
                    })
                    .attr("d", path )
                    .on("mouseover",function(d){
                        d3.select(this)
                            .attr("fill",overColor);

                    })
                    .on("mouseout",function(d){
                        d3.select(this)
                            .attr("fill",background);
                    }).on("click",function(d){
                        clickProvince(d);
                    });

                //获取中心点坐标
                root.features.forEach(function(d) {
                    var centroid = path.centroid(d);
                    centroid.x = centroid[0];
                    centroid.y = centroid[1];
                    centroid.id = d.properties.id;
                    centroid.name = d.properties.name
                    centroid.feature = d;
                    provinceNodes.push(centroid);
                });
                //provinceNodes.forEach(function(d){
                //    var name = d.name;
                //    if(name != undefined) {
                //        svg.append("text").attr("class","city-name")
                //            .attr("dx",d.x).attr("dy",d.y).attr("text-anchor","middle")
                //            .attr("fill",textColor).attr("font-size","12px").attr("fill-opacity",1)
                //            .text(d.name);
                //    }
                //});

            });

        }


        function drawCountryMap(d,svg) {
            var id = d.properties.id;

            var mapPath = "mapdata/geometryCouties/" + id + "00.json";

            d3.json(mapPath, function(error, root) {


                var zoomScale = getZoomScale(root.features, width/2, height/2);

                var centers = getCenters(root.features);

                var projection = d3.geo.mercator()
                    .center(centers)
                    .scale(zoomScale*60)
                    .translate([width/3*1, height/2]);
                var path = d3.geo.path().projection(projection);

                svg.selectAll(".pathCountry")
                    .data( root.features )
                    .enter()
                    .append("path")
                    .attr("class", "pathCountry")
                    .attr("stroke","#000")
                    .attr("stroke-width",0.3)
                    .attr("fill", function(d,i){
                        return background;
                    })
                    .attr("d", path )
                    .on("mouseover",function(d,i){
                        d3.select(this)
                            .attr("fill",overColor);
                    })
                    .on("mouseout",function(d,i){
                        d3.select(this)
                            .attr("fill",background);
                    }).on("click",function(d,i){
                        clickCountry(d,"mapdata/geometryProvince/" + id.substr(0,2) + ".json");
                    });
                //获取中心点坐标
                root.features.forEach(function(d, i) {
                    var centroid = path.centroid(d);
                    centroid.x = centroid[0];
                    centroid.y = centroid[1];
                    centroid.id = d.properties.id;
                    centroid.name = d.properties.name
                    centroid.feature = d;
                    countriesNodes.push(centroid);
                });
                countriesNodes.forEach(function(d){
                    var name = d.name;
                    if(name != undefined) {
                        svg.append("text").attr("class","country-name")
                            .attr("dx",d.x).attr("dy",d.y).attr("text-anchor","middle")
                            .attr("fill",textColor).attr("font-size","12px").attr("fill-opacity",1)
                            .text(d.name);
                    }
                });
            });//end json

        }//end drawMap


        function removePath(){
            d3.selectAll(".pathProvince").remove();
            d3.selectAll(".pathCountry").remove();
            d3.selectAll(".city-name").remove();
            d3.selectAll(".country-name").remove();
            provinceNodes = [];
            countriesNodes = [];
        }
    }

    function getCenters(features){
        var longitudeMin = 100000;//最小经度
        var latitudeMin = 100000;//最小维度
        var longitudeMax = 0;//最大经度
        var latitudeMax = 0;//最大纬度
        features.forEach(function(e){
            var a = d3.geo.bounds(e);//[[最小经度，最小维度][最大经度，最大纬度]]
            if(a[0][0] < longitudeMin) {
                longitudeMin = a[0][0];
            }
            if(a[0][1] < latitudeMin) {
                latitudeMin = a[0][1];
            }
            if(a[1][0] > longitudeMax) {
                longitudeMax = a[1][0];
            }
            if(a[1][1] > latitudeMax) {
                latitudeMax = a[1][1];
            }
        });

        var a = (longitudeMax + longitudeMin)/2;
        var b = (latitudeMax + latitudeMin)/2;

        return [a, b];
    }

    function getZoomScale(features, width, height){
        var longitudeMin = 100000;//最小经度
        var latitudeMin = 100000;//最小维度
        var longitudeMax = 0;//最大经度
        var latitudeMax = 0;//最大纬度
        features.forEach(function(e){
            var a = d3.geo.bounds(e);//[[最小经度，最小维度][最大经度，最大纬度]]
            if(a[0][0] < longitudeMin) {
                longitudeMin = a[0][0];
            }
            if(a[0][1] < latitudeMin) {
                latitudeMin = a[0][1];
            }
            if(a[1][0] > longitudeMax) {
                longitudeMax = a[1][0];
            }
            if(a[1][1] > latitudeMax) {
                latitudeMax = a[1][1];
            }
        });

        var a = longitudeMax-longitudeMin;
        var b = latitudeMax-latitudeMin;
        return Math.min(width/a, height/b);
    }


});
