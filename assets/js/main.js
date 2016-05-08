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
	        	
	        	//parses the JSON object and returns javascript object
	        	var obj = JSON.parse(response);
	        	
	        	controller.setCurrentQuote(obj);
	    	}
	  	}); 
	},

	//takes quote data from API call and sets it accordingly to model.currentQuote 
	setCurrentQuote: function(obj) {
		model.currentQuote= {
			"quote": obj.quote,
			"author": obj.author,
			"category": obj.category,
		};
	},

	//retrieves data from model.currentQuote
	//will be used for the view
	getCurrentQuote: function(){
		return model.currentQuote;
	}

}; // end controller object


/*====================
	INITIALIZE APP
====================*/
controller.init();