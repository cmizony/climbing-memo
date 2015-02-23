/******************
 * Handle Data File
 ******************/
function handleFileSelect (evt) {
	evt.stopPropagation();
	evt.preventDefault();

	var file = evt.dataTransfer.files[0];

	if (file)
	{
		var reader = new FileReader();
		reader.onload = function(e) { 
			var csv = e.target.result;
			var data = processData(csv);
			initAnalyzer(data);
		}
		reader.readAsText(file);
	}
}

function processData (csv) {
	var allTextLines = csv.split(/\r\n|\n/);
	var lines = [];

	for (var i=0; i < allTextLines.length; i++) {
		var data = allTextLines[i].split(',');
		var columns = [];

		for (var j=0; j<data.length; j++) {
			if (data[j].length > 0)
				columns.push(data[j]);
		}
		if (columns.length > 0)
			lines.push(columns);
	}
	return lines;
}

function handleDragOver (evt) {
	evt.stopPropagation();
	evt.preventDefault();
	evt.dataTransfer.dropEffect = 'copy'; 
}

/******************
 * Create analyzer
 ******************/
function initAnalyzer (data) {
	$('#panel-data').html( '<table class="table table-striped table-bordered" id="custom-datatable"></table>' );

	var timeout;

	// Create dataTable
	var dataTable = $('#custom-datatable').dataTable( {
		"data": data,
		"aLengthMenu": [5, 10, 25,50],
		"iDisplayLength": 5,
		"columns": [
			{ "title": "Name" },
			{ "title": "Latitude" },
			{ "title": "Longitude" },
			{ "title": "Country" },
			{ "title": "Elevation" },
			{ "title": "Type" },
			{ "title": "Routes" },
			{ "title": "Grade" },
		],
		"columnDefs": [
			{
				"targets": [ 1,2 ],
				"visible": false,
				"searchable": false
			}
		],
		"fnDrawCallback": function (o) {
			window.clearTimeout(timeout);
			timeout = window.setTimeout(drawSubPanels,800);
		},
	} );

	function drawSubPanels () {
		var data = getFilteredData(dataTable);

		drawGoogleMap(data);
		drawScatterPlot(data);
	}
};


function drawGoogleMap (data) {

	var map = new google.maps.Map(document.getElementById('panel-map'),{} );
	var bounds = new google.maps.LatLngBounds();

	console.log(data);
	for (var key in data)
	{
		var site = data[key];

		console.log(site);
		// Test valid site to display
		if (typeof site !== 'object' ||	!site ||
			!site.hasOwnProperty('name') ||
			!site.hasOwnProperty('latitude') ||
			!site.hasOwnProperty('longitude'))
			continue;

		var contentString = '<div style="white-space:nowrap">'+
			'<b>'+site.location+'</b></div>';

		marker = new google.maps.Marker({
			position: new google.maps.LatLng(site.latitude,site.longitude),
			map: map,
			title: site.name,
			infowindow: new google.maps.InfoWindow({content: contentString}),
		});

		bounds.extend(marker.position);

		google.maps.event.addListener(marker, 'click', function() {
			this.infowindow.open(map,this);
		});

		google.maps.event.trigger(map, 'resize');
		map.fitBounds(bounds);
	}
}

function drawScatterPlot(data) {

	var margin_focus = {top: 20, right: 25, bottom: 30, left: 50},
	width      = $("#panel-chart").width() - margin_focus.left - margin_focus.right,
	height     = 300 - margin_focus.top - margin_focus.bottom,
	selected_x = "routes",
	selected_y = "grade";

	var x_focus = d3.scale.linear().range([0, width]),
	y_focus = d3.scale.linear().range([height, 0]);

	var x_axis_focus = d3.svg.axis().scale(x_focus).orient("bottom"),
	y_axis_focus = d3.svg.axis().scale(y_focus).orient("left");

	var focus;

	//REMOVE SVG
	$("#panel-chart").empty();

	// CREATE NEW SVG
	var svg = d3.select("#panel-chart").append("svg")
		.attr("width", width + margin_focus.left + margin_focus.right)
		.attr("height", height + margin_focus.top + margin_focus.bottom);

	focus = svg.append("g")
		.attr("transform", "translate(" + margin_focus.left + "," + margin_focus.top + ")");

	// CREATE CHART DATA
	var chart_data = new Array();
	for (var i = 0 ; i < data.length ; i++)
	{
		var object = data[i];
		object[selected_x] = parseNumber(object[selected_x]);
		object[selected_y] = parseNumber(object[selected_y]);

		if (object[selected_x] > 0 && object[selected_y] > 0)
			chart_data.push(object);
	}

	// CREATE DOMAIN
	x_focus.domain([
		d3.min(chart_data, function(d) { return d[selected_x] }),
		d3.max(chart_data, function(d) { return d[selected_x] })
	]);
	y_focus.domain([
		d3.min(chart_data, function(d) { return d[selected_y] }),
		d3.max(chart_data, function(d) { return d[selected_y] })
	]);

	// TOOLTIP DIV
	var div = d3.select("body").append("div")   
		.attr("class", "tooltip")               
		.style("opacity", 0);

	// DOTS
	focus.selectAll(".dot")
		.data(chart_data)
		.enter()
		.append("circle")
		.attr("class", "dot-usage")
		.attr("r", 5)       
		.attr("cx", function(d) { return x_focus(d[selected_x]) } )
		.attr("cy", function(d) { return y_focus(d[selected_y]) } )
		.style("fill", "lightskyblue")
		.on("mouseover", function(d) {      
			div.style("background", "skyblue");
			div.transition()        
			.duration(200)      
			.style("opacity", .8);

		div.html(d.name)  
			.style("left", (event.pageX) + "px")     
			.style("top", (event.pageY-18)  + "px");    
		})                  
	.on("mouseout", function(d) {       
		div.transition()        
		.duration(500)      
		.style("opacity", 0);   
	});

	focus.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(x_axis_focus);

	focus.append("g")
		.attr("class", "y axis")
		.call(y_axis_focus)
		.append("text")
		.attr("transform", "rotate(-90)")
		.attr("y", 6)
		.attr("dy", ".71em")
		.style("text-anchor", "end");

	focus.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(x_axis_focus)
		.append("text")
		.attr("x", width)
		.attr("y", "-6")
		.style("text-anchor", "end");

	svg.selectAll('.axis line, .axis path').style({'stroke': 'Black', 'fill': 'none', 'stroke-width': '1px','shape-rendering':'crispEdges'});

	function parseNumber(string) {
		if (!string || string.length == 0)
			return 0;
		return parseFloat(string.replace(",",""));
	}
}

/******************
 * DataTable utils
 * ****************/

function getFilteredData (dataTable) {
	var o = dataTable.fnSettings();
	var header = new Array();
	var data = new Array();

	// get Headers
	o.aoColumns.forEach(function(entry){
		header[entry.sTitle.toLowerCase()] = entry.mData;
	});

	// Fitler rows
	var rows = o.oInstance._('tr', {"filter":"applied"});
	for (var i = 0 ; i< rows.length ; i ++) {
		var entry = rows[i];
		var obj = new Object();
		for (var index in header)
			obj[index] = $('<p>'+entry[header[index]]+'</p>').text();
		data.push(obj);
	}

	return data;
}
