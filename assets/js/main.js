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
   		//runs after the ajax call is complete;
		$(document).ajaxStop(function () {
			view.generateQuote();
			view.buttonClick();
    	});
  },

  	generateQuote: function() {
  		var quoteData = controller.getCurrentQuote();
  		$("#quote").html(quoteData.quote);
  		$("h3").html("-"+quoteData.author);
  	},

  	buttonClick: function() {
  		$(".btn").on("click", function(){
  			
  			// view.generateQuote();
  			/*It seems I do not need to run the above function because when the view.init function is fired once (as happens on intial page load), 
  			the .ajaxStop jQuery method ( which contains view.generate() ) will fire each
  			subsequent time an ajax call ends without having to have view.init() fired again. */ 
  			
  			//Fires an ajax call
  			controller.getQuoteInfo();

  			// DO NOT REMOVE!
  			/* Running the ajax call ( using controller.getQuoteInfo() ) everytime the button is clicked causes the controller.getQuoteInfo function
  			to attach (bind) to the click event. The method below is needed to prevent multiple ajax calls to be attached to the click event.
  			To better understand this, comment out the below line of code and uncomment //console.log(response)   (use CTRL+F) and, refresh the app, and
  			click the button repeatedly and watch the console. */
  			$( this ).off('click');
  			/*  $( "button").unbind( "click" );   would also perform the desired action as .off. Or I could have ommitted the above .off method and the .unbind
  			method entirely and just made the the .on method into the .one method. It's all personal preference.
  			See more here: http://stackoverflow.com/questions/6120943/why-is-this-jquery-ajax-click-event-firing-multiple-times.*/
  		});
  	}

}; //end view


/*====================
	INITIALIZE APP
====================*/
controller.init();