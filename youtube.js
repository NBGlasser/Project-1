// query results
$(document).ready(function () {
    $(".youtube").on("click", function(event) {
  
      
      var foodName = $(this).val()
      console.log(foodName)
      var queryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=how+to+cook+" + foodName + "&key=AIzaSyDLkMMIuBWt42J1WLEhQ-_pQx0bb9ZmeKo"
          $.ajax({
          url: queryURL,
          method: "GET"
      })
  
      .then(function(response) {
      var videoId = response.items[0].id.videoId
      console.log(videoId)
          $(".youtube").attr("href", "https://www.youtube.com/watch?v=" + videoId);

          })
      });
    });

  





// recipe of the day
$(document).ready(function () {

    
        var foodName = recipeOfDayName
        console.log(foodName)
        var queryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=how+to+cook+" + foodName + "&key=AIzaSyDLkMMIuBWt42J1WLEhQ-_pQx0bb9ZmeKo"
            $.ajax({
            url: queryURL,
            method: "GET"
        })
    
        .then(function(response) {
        var videoId = response.items[0].id.videoId
        console.log(videoId)
            $("#video").attr("src", "https://www.youtube.com/watch?v=" + videoId);
            document.getElementById("video").style.display = "inherit";
  
            })
        });
    
  
    
  
  
  
