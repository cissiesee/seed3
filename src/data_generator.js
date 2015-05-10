define(function(require) {
	require('lodash');
	return function(dataType, opts) {
		var data;

		var dataMaker = {
			'cube': function(opts) {
				type = opts.type || 'normal';
				data = [];
				var nodesNum = opts.nodesNum; //[10, 20]

				switch(type) {
					case 'normal':
						for(var i = 0; i < opts.seriesNum; i++) {
							var nodes = [];
							for(var j = 0; j < nodesNum; j++) {
								var nodeValue = Math.round(Math.random() * (opts.max - opts.min) + opts.min);
								nodes.push({key: 'key' + j, value: nodeValue});
							}
							data.push({
								name: 'series' + i,
								data: nodes
							});
						}
						break;
					case 'values':
						for(var i = 0; i < opts.seriesNum; i++) {
							var nodes = [];
							for(var j = 0; j < nodesNum; j++) {
								var xValue = Math.random() * (opts.x.max - opts.x.min) + opts.x.min;
								var yValue = Math.random() * (opts.y.max - opts.y.min) + opts.y.min;
								nodes.push({valuex: xValue, valuey: yValue});
							}
							data.push({
								name: 'series' + i,
								data: nodes
							});
						}
						break;
					case 'radar':
						var data = [];
						var max = opts.max;
						var min = opts.min;
						for(var i = 0; i < opts.seriesNum; i++) {
							var nodes = [];
							//nodes.push({'label' : ((2005) + '-' + (2009))});
							nodes.push({co_patenting : calValueWithOpt(min,max)});
							nodes.push({growth_in_patent_stock : calValueWithOpt(min,max)});
							nodes.push({internationalization : calValueWithOpt(min,max)});
							nodes.push({patent_complexity : calValueWithOpt(min,max)});
							nodes.push({patent_influence : calValueWithOpt(min,max)});
							nodes.push({scientific_content : calValueWithOpt(min,max)});
							nodes.push({tech_specialization : calValueWithOpt(min,max)});
							data.push({
								name: 'series' + i,
								data: nodes
							});
						}
						break;
					case 'litigation':
						var data = [];
						var plaintiffNum = opts.plaintiffNum;
						var defendantNum = opts.defendantNum;
						var assignName = "Novartis Pharmaceuticals Corporation";
						var plaintiffNnameArray = [
							"Sun Pharmaceutical Industries LTD.",
							"Dr. Reddy`S Laboratories Ltd.",
							"Dr. Reddys Laboratories, Ltd.",
							"Ranbaxy, Inc.",
							"Mylan Pharmaceuticals, Inc.",
							"Watson Pharmaceuticals, Inc.",
							"Charles R. Baker",
							"Teva Pharmaceuticals USA, Inc.",
							"Breckenridge Pharmaceutical, Inc.",
							"ROXANE LABORATORIES, INC.",
							"Apotex Corp.",
							"Watson Pharmaceuticals, Inc."
						];

						for(var i = 0;i < plaintiffNum;i++){
							var node = {};
							var year = 2000 + Math.floor(Math.random()*10);
							node.caseFrom = year;
							node.caseTo = year+Math.floor(Math.random()*10)+1;
							node.damages = 0;
							node.defendantNname = _.sample(plaintiffNnameArray);
							node.judgement = "";
							node.plaintiffNname = assignName;
							node.status = _.sample(['ongoing','closed']);
							data.push(node);
						}

						for(var i = 0;i < defendantNum;i++){
							var node = {};
							var year = 2000 + Math.floor(Math.random()*10);
							node.caseFrom = year;
							node.caseTo = year+Math.floor(Math.random()*10)+1;
							node.damages = 0;
							node.plaintiffNname = _.sample(plaintiffNnameArray);
							node.judgement = "";
							node.defendantNname = assignName;
							node.status = _.sample(['ongoing','closed']);
							data.push(node);
						}
						data.sort(function(a,b){return a.caseFrom < b.caseFrom});
						_.forEach(data,function(item,key){item.id = key;})
				}
				return data;
			},
			'strategy' : function(opts){
				var data = [];
				var max = opts.max;
				var min = opts.min;
				for(var i = 0; i < opts.seriesNum; i++) {
					var nodes = [];
					for(var j = 0; j < opts.nodesNum; j++) {
						var node = {};
						node.label = (2010 - j * 5) + '-' + (2014 - j * 5);
						node.period = j;
						node.co_patenting = calValueWithOpt(min,max);
						node.growth_in_patent_stock = calValueWithOpt(min,max);
						node.internationalization = calValueWithOpt(min,max);
						node.patent_complexity = calValueWithOpt(min,max);
						node.patent_influence = calValueWithOpt(min,max);
						node.scientific_content = calValueWithOpt(min,max);
						node.tech_specialization = calValueWithOpt(min,max);
						nodes.push(node);
					}
					data.push({
						name: 'series' + i,
						nodes: nodes
					});
				}
				return data;
			},
			'hierarchical': function(opts) {

			},
			'relational': function() {

			},
			'geo': function() {

			}
		}

		var calValueWithOpt = function(min,max){
			return Math.round(Math.random() * (max - min) + min);
		}

		return dataMaker[dataType](opts);
	}
})