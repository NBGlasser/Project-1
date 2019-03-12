$(document).ready(function () {

  $("#submit").on("click", function(event) {//delete
      event.preventDefault()
      var foodName = $("#ingredients").val()//delete
      //var foodName = $(this).val()--->undelete
      console.log(foodName)
      var queryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=how+to+cook+" + foodName + "&key=AIzaSyDLkMMIuBWt42J1WLEhQ-_pQx0bb9ZmeKo"
          $.ajax({
          url: queryURL,
          method: "GET"
      })
  
      .then(function(response) {
      var videoId = response.items[0].id.videoId
      console.log(videoId)
          $("#video").attr("src", "https://www.youtube.com/embed/" + videoId);
          document.getElementById("video").style.display = "inherit";

          })
      });//delete
  

  



});