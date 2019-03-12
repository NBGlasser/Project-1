$(document).ready(function(){
    var ingredients=[];
    var queryURL;
    
    function displayWrittenRecipe() {
        
        console.log(ingredients)
        $(".recipe-views").empty()
        
        jQuery.ajaxPrefilter(function (options) {
            if (options.crossDomain && jQuery.support.cors) {
              options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
            }
          });
        
        if(!ingredients){
            return
        }
        if(diet){
            queryURL = "https://api.edamam.com/search?q=" + ingredients +"&diet=" + diet +"&excluded=" + excluded +"&to=9&app_id=902698cd&app_key=e93d796dd6d7b7ae6039264345846ad3"
        }
        else{
            queryURL = "https://api.edamam.com/search?q=" + ingredients +"&excluded=" + excluded +"&to=9&app_id=902698cd&app_key=e93d796dd6d7b7ae6039264345846ad3"
        }

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
                var recipeImg = $("<img>")
                recipeImg.attr("src",recipeList[i]["recipe"]["image"])
                var linkToRecipe = $("<a>").text("Go to Recipe").attr("href" ,recipeList[i]["recipe"]["url"]).addClass("btn btn-primary");
                var youtubeButton = $("<button>").addClass("btn youtube mb-2").attr("data", "youtubeBtn").text("Youtube")
                var calories = $("<p>").text(Math.floor(recipeList[i]["recipe"]["calories"]) + "kcal")
                newDiv.append(recipeName, calories, recipeImg, linkToRecipe, youtubeButton)
                $(".recipe-views").append(newDiv)

            }
        })
    }

    $(".submit").on("click", function(event){
        event.preventDefault()
        
        diet = $("#diet").val();
        excluded = $("#excluded").val().trim()
        
        if ($("#ingredients").val()){
            ingredients.push($("#ingredients").val().trim())
            displayButton()
        }
        
        displayWrittenRecipe()
        $("#ingredients").val("")
        $("#excluded").val("") 
    })

    function displayButton(){
        $(".ingredient-button-views").empty()
        for(var i =0; i<ingredients.length; i++){
            var newDiv = $("<div>")
            var newIngredient = $("<span>").text(ingredients[i])
            var newRemoveButton = $("<button>").text("x").addClass("remove-ingredient").attr("data-name", ingredients[i])
            newDiv.append(newIngredient , newRemoveButton)
            $(".ingredient-button-views").append(newDiv)
            }
    }

    $(document).on("click", ".remove-ingredient", function(event){
        event.preventDefault()
        ingredients.splice(ingredients.indexOf($(this).attr("data-name")),1)
        displayButton()
        displayWrittenRecipe()
    } )
})