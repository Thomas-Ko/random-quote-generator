/*====================
	MODEL
====================*/

var model = {
	//Current Quote data; nulls will be replaced with info from API call (see controller.getQuoteInfo)
	currentQuote: {
  		"quote": null,
  		"author": null,
  		"category": null,
  	}
};


/*====================
	CONTROLLER
====================*/

var controller = {
	init: function(){
		controller.getQuoteInfo();
	},
	//gets quote information from Random Famous Quotes API
	//found on https://market.mashape.com/andruxnet/random-famous-quotes
	getQuoteInfo : function(){
	  	
	  	$.ajax({
	    	
	    	type: 'GET',
	  		
	  		headers: {
	  			"X-Mashape-Key" : "6Iu9kPGuX0mshBsKo5KY7GLDwPuPp16l1r6jsneoYIvlUDSM1z",
	  			Accept: "application/json",
	  			"Content-Type": "application/x-www-form-urlencoded",
	  		},

	    	url: 'https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous',
	    	
	    	success: function( response ) {
	        	console.log( response ); 
	        	
	        	var obj = JSON.parse(response);
	        	
	        	console.log(obj.quote);
	        	console.log(obj.author);
	        	console.log(obj.category);
	    	}
	  	}); 
	} 

}; 


/*====================
	INITIALIZE APP
====================*/
controller.init();