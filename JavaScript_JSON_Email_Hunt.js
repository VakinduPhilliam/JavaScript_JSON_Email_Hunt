
/*JAVASCRIPT ONLY*/
/*The script below uses JQuery and Ajax to load a local JSON text file into HTML DOM*/
/*The script then iterates through each JSON object, identifying emails in the file and their frequency of occurrence.*/
/*The email frequencies are then displayed to the user*/
/*Written by Vakindu Philliam*/
 
  $( function() {
 
    $('#getWords').click( function() {
      $.ajax( "Email.txt", {
        cache: false,
        dataType: "json",
        error: errorHandler,
        success: success
      } );
    } );
 
    function success(feed) {
		 var freqMap = {};
		 var n = [];
							
     $.each(feed, function(){
		 
		  //Function to validate that the character is an email	
			 
        function isEmail(value){      
          var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
          return emailPattern.test(value); 
         }
		 
		 //Function to map word occurrences
		 
		    function wordFreq(string) {
          var words = string.replace(/[.]/g, '').split(/\s/);
          words.forEach(function(w) {
					
				if(isEmail(w)){
					
          if (!freqMap[w]) {
            freqMap[w] = 0;
          }
          freqMap[w] += 1;
					
				 }	
					
         });
				 
				 //Return mapped values
				 
        return freqMap;
       }
			 
			 //For each object method, map Email frequencies in each object parameter
			 
			 wordFreq(this.city); 
			 wordFreq(this.Timeline);
			 wordFreq(this.Notes);
			 wordFreq(this.Contributors);
			 
		 });
		 
		 //Display Email frequency results
		 
		 //Displayed as raw data
		 document.write("Displayed as Row Data."+"</p>");
		 document.write(freqMap);
		 
		 //Displayed as organised data
		 document.write("Displayed as Organised Data."+"</p>");
		 
		 //Iterate through objects
		 
		 for(var prop in freqMap){
  		if(freqMap[prop]>=2){
		  
			n.push(prop);
			
   			}
		 
		 document.write(n);
    		
		  }
		}
   
	 //Handle any errors found during program execution
	 
    function errorHandler() {
      document.write( "There was a problem retrieving the data file." );
    }
 
  } );
 