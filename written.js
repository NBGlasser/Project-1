$(document).ready(function(){
    var ingredients;
    
    
    function displayWrittenRecipe() {
        var queryURL = "https://api.edamam.com/search?q=" + ingredients +"&diet=" + diet +"&app_id=902698cd&app_key=e93d796dd6d7b7ae6039264345846ad3"
        
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
                newDiv.append(recipeName, recipeImg)
                $(".recipe-views").append(newDiv)
            }
        })
    }

    $(".submit").on("click", function(event){
        event.preventDefault()
        ingredients= $("#ingredients").val().trim()
        diet = $("#diet").val();
        console.log(ingredients)
        displayWrittenRecipe()
        
    })
})