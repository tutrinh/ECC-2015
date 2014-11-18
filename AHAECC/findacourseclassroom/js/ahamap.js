    var map;
    var markers = [];
    var infoWindow;
    var locationSelect;
	var award;
	var resultset = 1;
    var side_bar_html = "";
    var lastlinkid;

	var perPage=4;
	var currentPage=1;
	var currentAddress='';
//set pagination... insta
	function displayPagination_backup_method(currentPage){
       document.getElementById("side_bar").innerHTML =side_bar_html;
		var startResult=(currentPage-1)*perPage;
		var endResult = startResult+perPage;
		if(endResult > markers.length){
			endResult=markers.length;
		}
		for(startResult; startResult<endResult; startResult++ ){
			document.getElementById('link'+startResult).style.display='block';
		}
        paginateResults('.result-holder', "side_bar");
	}
    //replaced previous code with the following!!!! Delete previous code in comments.. only left for reference 10-13-14
    function displayPagination(currentPage){
        totalPage = Math.ceil(parseInt(markers.length)/perPage);
        prevPages = [];
        nextPages = [];
        maxPageNav = 6;
        maxPageNavSplit = maxPageNav/2;
        for(var i=1; i<=totalPage; i++){
                if((i>currentPage) && (i<=(currentPage+maxPageNavSplit))&&(i!=currentPage)){
                nextPages.push('<a onclick="displayPagination('+(i)+')">'+(i)+'<\/a>');
            }
        }
        for(var x=currentPage-1; x>=1; x--){
            if((x<currentPage)&& (x<(maxPageNavSplit+1))){
                prevPages.push('<a onclick="displayPagination('+(currentPage-x)+')">'+(currentPage-x)+'<\/a>');
            }
        }
        var buttonHtml = "";
        var showPageHtml='';
        if(resultset ==1){
            if(totalPage == 1){
                buttonHtml = '';
            }else if(currentPage == 1){
                buttonHtml = '<div class="classResults pages"><a class="jp-previous jp-disabled">Prev</a>'+prevPages.join("")+'<a href=javascript: void(0)" class="jp-current">'+currentPage+'</a>'+nextPages.join("")+'<a class="jp-next" onclick="displayPagination('+(currentPage+1)+')">Next</a></div>';

            }
            else if(currentPage == totalPage){
                buttonHtml = '<div class="classResults pages"><a class="jp-previous" onclick="displayPagination('+(currentPage-1)+')">Prev</a>'+prevPages.join("")+'<a class="jp-current">'+currentPage+'</a>'+nextPages.join("")+'<a href=javascript: void(0)" class="jp-next jp-disabled">Next</a></div>';

            }
            else{
                buttonHtml = '<div class="classResults pages"><a class="jp-previous" onclick="displayPagination('+(currentPage-1)+')">Prev</a>'+prevPages.join("")+'<a class="jp-current">'+currentPage+'</a>'+nextPages.join("")+'<a class="jp-next" onclick="displayPagination('+(currentPage+1)+')">Next</a></div>';
            }
        }
        else{
            showPageHtml = '';//'<div id="totalCount" class="list-total"><h4>Sorry, there are '+markers.length+'<span> classes in your area</span></h4> </div>';
            buttonHtml = '';

        }
        document.getElementById("side_bar").innerHTML = showPageHtml + buttonHtml + side_bar_html + buttonHtml;

        for(var i=0; i<markers.length;i++){
            document.getElementById('link'+i).style.display='none';
        }
        var startResult=(currentPage-1)*perPage;
        var endResult = startResult+perPage;
        if(endResult > markers.length){
            endResult=markers.length;
        }
        for(startResult; startResult<endResult; startResult++ ){
            document.getElementById('link'+startResult).style.display='block';
        }
    }
    //END PAGINATION CODE REPLACE 10-13-14	
    //Load map
	window.onload = function load() {
      	closeList();
    	document.getElementById("addressInput").value='Address or City/State or Zip';
		resultset = 1;
      	map = new google.maps.Map(document.getElementById("map"), {
        center: new google.maps.LatLng(38, -96),
        zoom: 4,
        mapTypeId: 'roadmap',
		mapTypeControl: true,
		streetViewControl: true,
	 	zoomControl: true,
  	 	zoomControlOptions: {
   	 	style: google.maps.ZoomControlStyle.MEDIUM
  		}
      });
        //Autocomplete input box
        var input = /** @type {HTMLInputElement} */document.getElementById('addressInput');
        var placesOptions = {
            types: ['geocode'],
            componentRestrictions: {country: "us"}
        };
        autocomplete = new google.maps.places.Autocomplete(input, placesOptions);
        autocomplete.bindTo('bounds', map);
        var componentForm = {
            street_number: 'short_name',
            route: 'long_name',
            locality: 'long_name',
            administrative_area_level_1: 'short_name',
            country: 'long_name',
            postal_code: 'short_name'
        };
        //Initialize event listener for place change for autocomplete to get state
        google.maps.event.addListener(autocomplete, 'place_changed', function() {

            var place = autocomplete.getPlace();


            for (var i = 0; i < place.address_components.length; i++) {
                var addressType = place.address_components[i].types[0];
                if (addressType === "administrative_area_level_1") {
                    var val = place.address_components[i][componentForm[addressType]];

                    stateName = val;

                }
            }

        });//end event

        infoWindow = new google.maps.InfoWindow();
        locationSelect = document.getElementById("locationSelect");
        locationSelect.onchange = function() {
            var markerNum = locationSelect.options[locationSelect.selectedIndex].value;
            if (markerNum != "none"){
                google.maps.event.trigger(markers[markerNum], 'click');
            }
        };
        document.getElementById("side_bar").innerHTML ='';

        //HTML5 geolocation
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var pos = new google.maps.LatLng(position.coords.latitude,
                    position.coords.longitude);
                map.setCenter(pos);
                searchLocationsNear(map.getCenter());
            }, function() {
                handleNoGeolocation(true);
            });
        } else {
            // Browser doesn't support Geolocation
            handleNoGeolocation(false);
        }
    }

   function handleNoGeolocation(errorFlag) {
	  if (errorFlag) {
		var content = 'Error: The Geolocation service failed.';
	  } else {
		var content = 'Error: Your browser doesn\'t support geolocation.';
	  }

		//errorDiv.innerHTML=content;
 		//errorDiv.style.display='block';
		//alert(content);

	  map.setCenter(new google.maps.LatLng(38, -96));
	}

   function searchLocations(e) {

   	   closeList();
       var address = document.getElementById("addressInput").value;
       var courseId = document.getElementById('courseId').value;
       currentAddress = address;
       var errorDiv = document.getElementById('errorDiv');
       var courseErrorDiv = document.getElementById('courseErrorDiv');
       errorDiv.style.display='none';
       courseErrorDiv.style.display='none';
       if(address == '' || address == 'Address or City/State or Zip'){
           errorDiv.innerHTML="Error! Please enter a full address or city/state or postal code."
           errorDiv.style.display='block';
           //HTML5 geolocation
           if(navigator.geolocation) {
               navigator.geolocation.getCurrentPosition(function(position) {
                   var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                   map.setCenter(pos);
                   searchLocationsNear(map.getCenter());
               }, function() {
                   handleNoGeolocation(true);
               });
           } else {
               // Browser doesn't support Geolocation
               handleNoGeolocation(false);
           }
       }else if(courseId == null || courseId == ''){
           courseErrorDiv.innerHTML="Error! Please Choose a course."
           courseErrorDiv.style.display='block';
       } else{
           //address =address + ', USA';
           var geocoder = new google.maps.Geocoder();
           geocoder.geocode({address: address}, function(results, status) {
               if (status == google.maps.GeocoderStatus.OK) {
                   searchLocationsNear(results[0].geometry.location);
               } else {
                   errorDiv.innerHTML="Error! Please enter valid full address or city/state or postal code."
                   errorDiv.style.display='block';
                   closeList();
               }
           });
       }
   }

   function clearLocations() {
     infoWindow.close();
     for (var i = 0; i < markers.length; i++) {
       markers[i].setMap(null);
     }
     markers.length = 0;
     side_bar_html = "";
     locationSelect.innerHTML = "";
     var option = document.createElement("option");
     option.value = "none";
     option.innerHTML = "See all results:";
     locationSelect.appendChild(option);
   }

   function searchLocationsNear(center) {
     clearLocations();

     var radius = $('#slider').slider("value");
     var sliderValue = document.getElementById('distance').value;
	 var radiusValue = sliderValue.split(" "); 
     var address = document.getElementById("addressInput").value;
     var courseId = document.getElementById('courseId').value;
     var fromDate = document.getElementById("from").value;
     var toDate = document.getElementById('to').value;


     var searchUrl = '/AHAECC/findacourseclassroom/eccTraningCenter_Site.jsp?address=' + address + '&radius=' + radiusValue[0] +'&courseId=' + courseId + '&startDate=' + fromDate + '&endDate=' + toDate;
     var bounds = new google.maps.LatLngBounds();
     getValues(searchUrl, center);
     map.fitBounds(bounds);
       if(radius == 0) {
           map.setZoom(12);
       }else if(radius == 1) {
           map.setZoom(11);
       }else if(radius == 2) {
           map.setZoom(10);
       }else if(radius == 3) {
           map.setZoom(9);
       }else if(radius == 4) {
           map.setZoom(8);
       }else if(radius == 5) {
           map.setZoom(7);
       }else if(radius == 6) {
           map.setZoom(5);

     }else {
		map.setZoom(9);
	 }
	 codeAddress(center);


    }

	function getValues(searchUrl, center){
	       var xmlDoc = locationsInformation(searchUrl);
	       var xml = parseXml(xmlDoc);
	       var bounds = new google.maps.LatLngBounds();
	       var markerNodes = xml.documentElement.getElementsByTagName("marker");
	       if(markerNodes[0] == null) {
			  resultset =0;
	          var latlng = new google.maps.LatLng(parseFloat(center.lat()),parseFloat(center.lng()));
	          createOption('No results found', 0, 0);
	          createMarker(latlng, 'No results found', 'Centered on Location City', null, null, null, 0,null,null, null);
	          bounds.extend(latlng);
		   } else{
			  resultset =1;
		   }
	       var phoneNumber = '';
	       var address = '';
	       var email = null;
	       var siteURL = null;
	       var repositoryId = null;
		   for (var i = 0; i < markerNodes.length; i++) {
	 	      var id = markerNodes[i].getAttribute("id");
		      var name = markerNodes[i].getElementsByTagName("name")[0].childNodes[0].nodeValue;
		      if(markerNodes[i].getElementsByTagName("address") != null && markerNodes[i].getElementsByTagName("address")[0] != null) {
		    	  address = markerNodes[i].getElementsByTagName("address")[0].childNodes[0].nodeValue;
		      }
		      var city = markerNodes[i].getElementsByTagName("city")[0].childNodes[0].nodeValue;
		      var state = markerNodes[i].getElementsByTagName("state")[0].childNodes[0].nodeValue;
		      var zip = markerNodes[i].getElementsByTagName("zip")[0].childNodes[0].nodeValue;
		      if(markerNodes[i].getElementsByTagName("phoneNumber") != null && markerNodes[i].getElementsByTagName("phoneNumber")[0] != null){
		    	  phoneNumber = markerNodes[i].getElementsByTagName("phoneNumber")[0].childNodes[0].nodeValue;
		      }
		      var latitude = markerNodes[i].getElementsByTagName("latitude")[0].childNodes[0].nodeValue;
		      var longitude = markerNodes[i].getElementsByTagName("longitude")[0].childNodes[0].nodeValue;
		      var isTraningCenter = markerNodes[i].getElementsByTagName("isTraningCenter")[0].childNodes[0].nodeValue;

		      if(markerNodes[i].getElementsByTagName("email") != null && markerNodes[i].getElementsByTagName("email")[0] != null){
		    	  email = markerNodes[i].getElementsByTagName("email")[0].childNodes[0].nodeValue;
		      }
		      if(markerNodes[i].getElementsByTagName("URL") != null && markerNodes[i].getElementsByTagName("URL")[0] != null){
		    	  siteURL = markerNodes[i].getElementsByTagName("URL")[0].childNodes[0].nodeValue;
		      }
		      if(markerNodes[i].getElementsByTagName("repositoryId") != null && markerNodes[i].getElementsByTagName("repositoryId")[0] != null){
		    	  repositoryId = markerNodes[i].getElementsByTagName("repositoryId")[0].childNodes[0].nodeValue;
		      }

		      var distance = 0;
		      if(markerNodes[i].getElementsByTagName("distance")[0].childNodes[0] != null){
		      	distance = markerNodes[i].getElementsByTagName("distance")[0].childNodes[0].nodeValue;
		      }
	          distance = parseFloat(distance);
	          var latlng = new google.maps.LatLng(parseFloat(latitude),parseFloat(longitude));

	         createOption(name, distance, i);
	         createMarker(latlng, name, address, city, state, zip, phoneNumber, distance, isTraningCenter, siteURL, email, id, isTraningCenter, repositoryId);
	         bounds.extend(latlng);
	       }
		   var listener = google.maps.event.addListener(map, "idle", function() {
				  google.maps.event.removeListener(listener);
			   });

		   var useragent = navigator.userAgent;
			if (useragent.indexOf('iPhone') != -1 || useragent.indexOf('Android') != -1 ) {
			   locationSelect.style.visibility = "visible";
			 } else {
				locationSelect.style.visibility = "hidden";
			 }
			locationSelect.onchange = function() {
			 var markerNum = locationSelect.options[locationSelect.selectedIndex].value;
			 google.maps.event.trigger(markers[markerNum], 'click');
			};
	       google.maps.event.addListener(infoWindow,"closeclick", function() {
	           document.getElementById(lastlinkid).style.background="#F7F6F4";
	           closeDetails();//added close Details here
	       });
	      displayPagination(1);


	}

//    Creates Markers //
    function createMarker(latlng, name, address, city, state, zip, phoneNumber, distance, isTraningCenter, siteURL, email, id, isTC, repositoryId) {

	  var awardicon = new google.maps.MarkerImage('/AHAECC/findacourseclassroom/images/award.png',
      new google.maps.Size(20, 18),
      new google.maps.Point(0,0),
      new google.maps.Point(0, 18));

	  var noawardicon = new google.maps.MarkerImage('/AHAECC/findacourseclassroom/images/noaward.png',
      new google.maps.Size(24, 22),
      new google.maps.Point(0,0),
      new google.maps.Point(0, 22));

	  var noresultsicon = new google.maps.MarkerImage('/AHAECC/findacourseclassroom/images/noresults.png',
      new google.maps.Size(32, 37),
      new google.maps.Point(0,0),
      new google.maps.Point(0, 37));
	  award = noawardicon;
      
	  var catDisplayName = '';
	  var siteURLHtml='';
	  if(siteURL != null && siteURL != '' && siteURL !='#'){
		  siteURLHtml = "<a href='"+siteURL+"' target=_blank class=learnmore>Website</a>";
	  }
	  var isTCHtml='<span class="label label-aha-tc pull-right">TS</span>';
	  var isTCHtmlSide='<span class="label label-aha-tc pull-left">TS</span>';
	  
	  if(isTC != null && (isTC=='true' || isTC=='True')){
		  isTCHtml='<span class="label label-default pull-right">TC</span>';
		  isTCHtmlSide='<span class="label label-default pull-left">TC</span>';
	  }
	  if (resultset ==1) {
        var html = '<div id="store-infowindow" style="min-Width:200px">'+
        		'<h2 style="max-Width:220px; line-height: 1em; margin-top:3px;"><a href="'+siteURL+'" target="_blank">' + name + '</a></h2>'+
                '<div class="distance pull-right">'+distance.toFixed(1)+' mi</div>'+
                '<ul style="max-Width:200px;">'+
                '<li>'+ address +'</li>'+
                '<li>'+ city + ',&nbsp;' + state + '&nbsp;' + zip+'</li>'+
                '</ul>'+isTCHtml+
                '<div class="link"><a href="tel:'+phoneNumber+'">'+phoneNumber+'</a></div>'+
                '<div class="link"><a href="mailto:'+email+'">'+email+'</a></div>'+
                '<div class="clear"><div class="link col-xs-4 mb0 pl0"><a href="'+siteURL+'">website</a></div>'+
                '<div class="link col-xs-4 mb0"></div></div>'+
                '</div>'+
                '<div class="button row" >'+
                '<a class="classDetails sf-button standard transparent-dark stroke-to-fill" style="margin-top:10px" id="infoWinFullSchedule" onclick="toggleDetails(\''+id+'\','+ (markers.length) + ',\''+isTC+'\''+',\''+repositoryId+'\');">Details</a>'+
                '</div>'+
                '</div>';
        var marker = new google.maps.Marker({
            map: map,
            position: latlng,
    		title: name,
            animation: google.maps.Animation.DROP,
    		icon: "/AHAECC/findacourseclassroom/images/marker.png"
          });
	  }
	  else {
	      var marker = new google.maps.Marker({
	          map: map,
	          position: latlng,
	  		title: name,
	          animation: google.maps.Animation.DROP,
	  		icon: "/AHAECC/findacourseclassroom/images/noresults.png"
	        });
		var html = "<div class=contentwindow><b>" + name + ",<br>please adjust your search criteria.</b></div>";
	  }

	  var infowindow = new google.maps.InfoWindow({
        contentwindow: html,
        maxWidth: 300
      });

      var linkid = "link"+(markers.length);
	  var progid = "program"+(markers.length);
	  var cPage = Math.ceil(parseInt(markers.length+1)/perPage)
      google.maps.event.addListener(marker, 'click', function() {
        closeDetails(); //added close Details here
    	goDim();
        displayPagination(cPage);
        currentPage = cPage;
        infoWindow.setContent(html)
        infoWindow.open(map, marker);
        document.getElementById(linkid).style.background="#f5f5f5"; // added style to linkID 10/14/14
        lastlinkid=linkid;
      });
      markers.push(marker);

	  if (resultset ==1) {
		side_bar_html += '<li class="result clearfix" id="'+linkid+'"><a onclick="javascript:event.preventDefault();myclick(' + (markers.length-1) + ')" href="" class="location-link"><h2 class="store-name">' + name + '</h2><ul class="address"><li>' + address + '<\/li><li>' + city +',&nbsp;'+state+'&nbsp;'+zip+ '<\/li><li><a href="tel:'+phoneNumber+'">'+phoneNumber+'</a><\/li><li><a href="mailto:'+email+'">'+email+'</a><\/li></ul></a><div class="clear"><div class="col-xs-2 mb0 pl0">'+isTCHtmlSide+'</div><span class="links col-xs-4 mb0"><a href=\"'+siteURL+'\" target="_blank" >website<\/a></span><span class="grey col-xs-2 mb0">' + distance.toFixed(1) +'&nbsp;mi<\/span></div><a href="javascript:myclick(' + (markers.length-1) + ')" class="classDetails" onclick="event.preventDefault();toggleDetails(\''+id+'\','+ (markers.length-1) + ',\''+isTC+'\''+',\''+repositoryId+'\')">Training Center Details</a><\/li>';
	  }else{
      	side_bar_html += '<li class="result clearfix" id="'+linkid+'"><h3 class="help-block text-center">' + name + '<br\/>Please broaden your search<\/h3><\/li>';
	  }
    }
    function goDim(){
    	for(var i=0; i<markers.length; i++){
    		document.getElementById("link"+i).style.background="#ffffff";
    	}
    }
    // This function picks up the click and opens the corresponding info window
    function myclick(i) {
    	google.maps.event.trigger(markers[i], "click");
    }


    function createOption(name, distance, num) {
      var option = document.createElement("option");
      option.value = num;
      option.innerHTML = name + "(" + distance.toFixed(1) + ")";
      locationSelect.appendChild(option);
    }


    function parseXml(str) {
		var doc = null;
		if (window.ActiveXObject) {
			doc = new ActiveXObject('Microsoft.XMLDOM');
			doc.loadXML(str);
		} else if (window.DOMParser) {
			var parser = new DOMParser();
			doc = parser.parseFromString(str, 'text/xml');
		}

		var errorMsg = null;
		if (doc.parseError && doc.parseError.errorCode != 0) {
			errorMsg = "XML Parsing Error: " + doc.parseError.reason
				  + " at line " + doc.parseError.line
				  + " at position " + doc.parseError.linepos;
		}else {
			if (doc.documentElement) {
				if (doc.documentElement.nodeName == "parsererror") {
					errorMsg = doc.documentElement.childNodes[0].nodeValue;
				}
			}else {
				errorMsg = "XML Parsing Error!";
			}
		}

		if (errorMsg) {
			alert (errorMsg);
			return false;
		}

		return doc;
    }

    function doNothing() {}

	function detectBrowser() {
	  var useragent = navigator.userAgent;
	  var mapdiv = document.getElementById("map");

	  if (useragent.indexOf('iPhone') != -1 || useragent.indexOf('Android') != -1 ) {
	    mapdiv.style.width = '100%';
	    mapdiv.style.height = '100%';
	  } else {
	    mapdiv.style.width = '';
	    mapdiv.style.height = '';
		mapdiv.style.border = '0px solid white';
	  }
	}

	function codeAddress(center) {
		 geocoder = new google.maps.Geocoder();
	    var address = document.getElementById("addressInput").value;


		var mypositionicon = new google.maps.MarkerImage('/AHAECC/findacourseclassroom/images/logo.png',
		new google.maps.Size(25, 33),
		new google.maps.Point(0,0),
		new google.maps.Point(0, 33));

		geocoder.geocode({'location': center}, function(results, status) {
			  if (status == google.maps.GeocoderStatus.OK) {
				map.setCenter(results[0].geometry.location);
				var marker = new google.maps.Marker({
					map: map,
                    animation: google.maps.Animation.DROP,
					icon: '/AHAECC/findacourseclassroom/images/myloc.png',
					position: results[0].geometry.location
				});
			  } else {
					alert("Onload: Geocode was not successful for the following reason: " + status);
			  }
		});
    }
    //Ajax call
	function locationsInformation(uri) {
		//uri = "mapdata.xml"
		var responseMsg ="";
		var xmlhttp = getHTTPRequest();
		xmlhttp.open('GET',uri,false);
		xmlhttp.onreadystatechange = function()
		{
			if (xmlhttp.readyState == 4)
			{
				responseMsg=xmlhttp.responseText;

			}
		};
		xmlhttp.send(null);
		if(responseMsg == null || responseMsg.length < 1){
			responseMsg=xmlhttp.responseXML;
		}

		return responseMsg;
	}

	function getHTTPRequest() {
		var xmlhttp = false;
		try {
			xmlhttp = new ActiveXObject('Msxml2.XMLHTTP');
		} catch (e) {
		try {
			xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
		} catch (E) {
			xmlhttp = false;
		}
		}
		if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
			xmlhttp = new XMLHttpRequest();
		}
		return xmlhttp;
	}
	function printPage(){
		window.print();
	}

    function paginateResults(results, container){
       // $(results).jPages("destroy");
        $(results).jPages({
            containerID : container,
            perPage: 5
        });
    }
    function closeDetails(){
        if($(".store_detail_overlay .classResults").has("a.jp-current").length){
            $(".classResults").jPages("destroy");
        }
        displayPagination(currentPage);
        $('.store_detail_overlay').hide();
        $('#refine').show();
        $('#side_bar').removeClass("hide");

    }
    function toggleDetails(tcId, i, isTrainingCenter, repositoryId){
    	var courseId = document.getElementById('courseId').value;	
        if($(".store_detail_overlay").css("display") == 'none') {
    		var includePageURL = "/findacourseclassroom/eccClasses.jsp?courseId="+courseId +"&tc_id="+tcId+"&isTrainingCenter="+isTrainingCenter+"&rId="+repositoryId ;
    		forward(includePageURL, i);
         }
    }
    function forward(params, i) {	   
		DynamicFileIncluder.getInclude(params,function(data) {	    
		dwr.util.setValue("store-details", data, { escapeHtml:false }); 
        google.maps.event.trigger(markers[i], "click");
        $('.store_detail_overlay').show();
        $('#refine').hide();
        $('#side_bar').addClass("hide");
        paginateResults('.classResults', "classList");
		
	});  
}
