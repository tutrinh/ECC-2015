// jQuery show hide

var tblFirstRowHeightGlobal;
//var tutu;

	$(function() {
		// toggleCertificate
			//get height
		 	var tblFirstRowHeight = $('.table-certificates tr:first-child').height();
		 	//console.log('the table height is ' + tblFirstRowHeight);
			var tblHeight = $('.table-certificates').height();
			//console.log('the table height is ' + tblHeight);

			var buffer = 7;

			tblFirstRowHeight = tblFirstRowHeight + buffer;
			tblHeight = tblHeight + buffer;

			tblFirstRowHeightGlobal = tblFirstRowHeight;

			//on load
			$('.table-certificate-wrapper').css({height:tblFirstRowHeight});


		 // certificate_wrapper
		 $('a#toggleCertificate').on('click',function(e){
		 	e.preventDefault();
		 	//$(this).toggleClass('active');
		 	//$('.table-certificate-wrapper').toggleClass('active');
		 	if($(this).hasClass('active')){
		 		$(this).removeClass('active');
		 		$(this).html('&#9660; Show Award-Winning and Accredited & Certified Hospitals');
		 	}else{
		 		$(this).addClass('active');
		 		$(this).html('&#9650; Collapse Options');//html ascii arrow down
		 	}
		 	if($('.table-certificate-wrapper').hasClass('active')){
		 		$('.table-certificate-wrapper').removeClass('active');
		 		$('.table-certificate-wrapper').animate({height:tblFirstRowHeight});
		 	}else{
		 		$('.table-certificate-wrapper').addClass('active');
		 		$('.table-certificate-wrapper').animate({height:tblHeight});

		 	}
		 	
		 	//$('.table-certificate-wrapper').slideToggle().toggleClass('active');
		 	//
		 	//
		 	//
		 	//console.log('on click');
		 	/*if($(this).hasClass('active')){
		 		$(this).text('Collapse Options');
		 	}else{
		 		$(this).text('&#9660; Show Award-Winning and Accredited & Certified Hospitals');
		 	}*/
		 	//
		 	
		 	/*if($('.table-certificate-wrapper').hasClass('active')){
		 		$('.table-certificate-wrapper').animate({height:tblHeight});
		 	}else{
		 		$('.table-certificate-wrapper').animate({height:tblFirstRowHeight});
		 	}*/
			




		 });



	

		$('a#Next').on('click',function(e){
			e.preventDefault();
			//console.log(e);
			return false;
		});
		// $('a#Next').live('click',function(e){
		// 	e.preventDefault();
		// 	//console.log(e);
		// 	return false;
		// });
		
		
		$('a#Previous').on('click',function(e){
		  e.preventDefault();
			//console.log(e);
			return false;
		});
		// $('a#Previous').live('click',function(e){
		//   e.preventDefault();
		// 	//console.log(e);
		// 	return false;
		// });

	});//End 


//Functions
//
function closeList(){
	
	if($('.table-certificate-wrapper').hasClass('active')){
		$('.table-certificate-wrapper').removeClass('active');
		//$('.table-certificate-wrapper').animate({height:28});
		$('.table-certificate-wrapper').animate({height:tblFirstRowHeightGlobal});
	}
	if($('a#toggleCertificate').hasClass('active')){
		$('a#toggleCertificate').removeClass('active');
		$('a#toggleCertificate').text('Show Award-Winng and Accredited & Certified Hospitals');
	}
};

function resetDropdown(){
	$('#hospitalName').prop('selectedIndex',0);
	$('#hospitalName').trigger('chosen:updated');
}
	


