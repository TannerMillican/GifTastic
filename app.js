$(document).ready(function() {

    var topics = ["Ford", "Chevrolet", "GMC", "Honda", "Kia", "Cadillac"];
    console.log(topics);

    $("#addCarBrands").on("click", function(event) {
        event.preventDefault();

        topics.push($("#carBrands").val().trim());
        console.log(topics);
        $("#carBrands").val("");
        
        var newButton = topics[topics.length - 1];

        newButton = $("<button>");

        newButton.addClass("topic-buttons");

        newButton.attr("data-car", [topics.length - 1]);

        newButton.text(topics.slice([topics.length -1]));

        $("#buttonsGoHere").append(newButton);
    })

    for (var i = 0; i < topics.length; i++) {        
        
        var topicButton = $("<button>");

        topicButton.addClass("topic-buttons");

        topicButton.attr("data-car", topics[i]);

        topicButton.text(topics[i]);

        $("#buttonsGoHere").append(topicButton)
    }

        $(document.body).on("click", ".topic-buttons", function() {

            var car = this.innerText;

            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            car + "&api_key=alScwxLoXiuEIMitayW9E4FC2yoSmgRX&limit=10";

            $.ajax({
                url: queryURL,
                method: "GET"
            })

            .then(function(response) {

                var results = response.data;
                console.log(results);

                for (var i = 0; i < results.length; i++) {
                    if (results[i].rating !== "r" && results[i].rating !== "pg-13") {

                        var gifDiv = $("<div>");

                        var rating = results[i].rating;

                        var p = $("<p>").text("Rating: " + rating);

                        var carImage = $("<img>");

                        carImage.attr("src", results[i].images.fixed_height.url);
                        carImage.attr("data-still", results[i].images.fixed_height_still.url);
                        carImage.attr("data-animate", results[i].images.fixed_height.url);
                        carImage.attr("data-state", "still");

                        gifDiv.append(p);
                        gifDiv.append(carImage);

                        $("#gifsGoHere").prepend(gifDiv);
                    }

                    $("img").on("click", function() {
                        
                        var state = $(this).attr("data-state");

                        if (state === "still") {
                            $(this).attr("src", $(this).attr("data-animate"));
                            $(this).attr("data-state", "animate");
                        } else {
                            $(this).attr("src", $(this).attr("data-still"));
                            $(this).attr("data-state", "still")
                        }
                    })
                }
            })
        })
})