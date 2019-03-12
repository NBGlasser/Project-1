$(document).ready(function(){
    var ingredients;
    var queryURL;
    
    

    function displayWrittenRecipe() {
        jQuery.ajaxPrefilter(function (options) {
            if (options.crossDomain && jQuery.support.cors) {
              options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
            }
          });
        
        $(".recipe-views").empty()

        $.ajax({
            url:queryURL,
            method: "GET"
        }).then(function(response){
            var recipeList = response["hits"]
            console.log(recipeList)
            for (var i = 0; i < recipeList.length; i ++){
                var newDiv = $("<div>")
                var recipeName = $("<p>")
                recipeName.text(recipeList[i]["recipe"]["label"])
                console.log(recipeList[i]["recipe"]["label"])
                var recipeImg = $("<img>")
                recipeImg.attr("src",recipeList[i]["recipe"]["image"])
                var linkToRecipe = $("<a>").text("Go to Recipe").attr("href" ,recipeList[i]["recipe"]["url"]).addClass("btn btn-primary");
                var calories = $("<p>").text(Math.floor(recipeList[i]["recipe"]["calories"]) + "kcal")
                newDiv.append(recipeName, calories, recipeImg, linkToRecipe)
                $(".recipe-views").append(newDiv)
            }
        })
    }

    $(".submit").on("click", function(event){
        
        event.preventDefault()
        ingredients= $("#ingredients").val().trim()
        diet = $("#diet").val();
        excluded = $("#excluded").val().trim()
        console.log(ingredients)
        if(!ingredients){
            return
        }
        if(diet){
            queryURL = "https://api.edamam.com/search?q=" + ingredients +"&diet=" + diet +"&excluded=" + excluded +"&app_id=902698cd&app_key=e93d796dd6d7b7ae6039264345846ad3"
        }
        else{
            queryURL = "https://api.edamam.com/search?q=" + ingredients +"&excluded=" + excluded +"&app_id=902698cd&app_key=e93d796dd6d7b7ae6039264345846ad3"
        }
        displayWrittenRecipe()
        
    })
})