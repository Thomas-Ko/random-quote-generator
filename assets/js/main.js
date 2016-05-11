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
		view.init();
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
	        	//console.log(response); 
	        	
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
		// console.log("setCurrentQuote");
	},

	//retrieves data from model.currentQuote; will be used in view
	getCurrentQuote: function(){
		// console.log("getCurrentQuote");
		return model.currentQuote;
	}

}; // end controller


/*====================
	VIEW
====================*/

view = {

 	init: function(){   		
		// $(document).ajaxStop(function () {
			view.renderQuote();
			view.buttonClick();
			view.twitterClick();
    	// });
  },

  	//runs each time after the ajax call is complete;
  	renderQuote: function() {
  		$(document).ajaxStop(function () {
  			var quoteData = controller.getCurrentQuote();
  			$("h2").html("&ldquo;" + quoteData.quote + "&rdquo;");
  			$("h3").html("-"+quoteData.author);
  		});
  	},

  	//fires ajax call on click the "New Quote" button
  	buttonClick: function() {
  		$(".quote-button").on("click", function(){
  			
  			// view.renderQuote();
  			/*It seems I do not need to run the above function because when the view.init function is fired once (as happens on intial page load), 
  			the .ajaxStop jQuery method ( which contains view.renderQuote() ) will fire each
  			subsequent time an ajax call ends without having to have view.init() fired again. */ 
  			
  			//Fires an ajax call

  			controller.getQuoteInfo();
  		});
  	},

  	//takes the quote on display and allows user to tweet it
  	twitterClick: function(){
  		$(".twitter-share-button").on("click", function(){
  			var quoteData = controller.getCurrentQuote();
  			var quote = encodeURIComponent(quoteData.quote);
  			var author = encodeURIComponent(quoteData.author);
  			console.log(quote);
  			$(".twitter-share-button").attr("href", 'https://twitter.com/intent/tweet?text=' +quote + "%20-" + author);
  		});
  	}

}; //end view


/*====================
	INITIALIZE APP
====================*/
controller.init();