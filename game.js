$(document).ready(function(){
//begining

var buttonList = ["Dog", "Cat", "Parrot"]

function makeButtons (){
	$("#buttonContainer").empty();
	for (i=0; i<buttonList.length; i++){
		var newButton= $("<button>");
		$(newButton).text(buttonList[i]);
		$(newButton).attr("data-value", buttonList[i]);
		$("#buttonContainer").append(newButton);
	}
}

makeButtons();

$("#submitItem").on("click", function(event) {
      event.preventDefault();

      buttonList.push($("#newItem").val().trim());

      makeButtons();

    });

$(document.body).on("click", "button", function(event) {
	var queryURL = "https://api.giphy.com/v1/gifs/search?q="+$(this).attr("data-value")+"&limit=10&api_key=WmLiWDvOpRplhl58Mxi80PhMWSoD7bSf";
	
	$.ajax({
      url: queryURL,
      method: 'GET'
    }).done(function(response) {
    	$("#gifContainer").empty();

	    for (i=0; i<response.data.length;i++){
		    var newDiv= $("<div>");
		    $(newDiv).attr("class", "gifButton")
		    $(newDiv).attr("data-state", "still");
		    $(newDiv).attr("data-rating", response.data[i].rating);
		    $(newDiv).attr("data-still", response.data[i].images.fixed_height_still.url);
		    $(newDiv).attr("data-animated", response.data[i].images.fixed_height.url);
		    var image= $("<img>").attr("src", response.data[i].images.fixed_height_still.url);
		    $(newDiv).append(image);
		    var rating = $("<p>").text("Rating: "+ $(newDiv).attr("data-rating"))
		    $(newDiv).append(rating);
		    $("#gifContainer").append(newDiv);
		}
      
    });
});

$(document.body).on("click", ".gifButton", function(event) {
	console.log("click");
	$(this).empty();
	if ($(this).attr("data-state")=="still"){
		$(this).attr("data-state", "animated")
		var image= $("<img>").attr("src", $(this).attr("data-animated"));
		$(this).append(image);
		var rating = $("<p>").text($(this).attr("data-rating"))
		$(this).append(rating);
	}
	else{
		$(this).attr("data-state", "still")
		var image= $("<img>").attr("src", $(this).attr("data-still"));
		$(this).append(image);
		var rating = $("<p>").text($(this).attr("data-rating"))
		$(this).append(rating);
	}
});


//end
});