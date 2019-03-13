$(document).ready(function () {
    var ingredients = [];
    var queryURL;

    function displayWrittenRecipe() {

        console.log(ingredients)
        $("#recipe-views").empty()

        jQuery.ajaxPrefilter(function (options) {
            if (options.crossDomain && jQuery.support.cors) {
                options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
            }
        });

        if (!ingredients) {
            return
        }
        if (diet) {
            queryURL = "https://api.edamam.com/search?q=" + ingredients + "&diet=" + diet + "&excluded=" + excluded + "&to=9&app_id=902698cd&app_key=e93d796dd6d7b7ae6039264345846ad3"
        }
        else {
            queryURL = "https://api.edamam.com/search?q=" + ingredients + "&excluded=" + excluded + "&to=9&app_id=902698cd&app_key=e93d796dd6d7b7ae6039264345846ad3"
        }

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            

            var recipeList = response["hits"]
            console.log(recipeList)
            for (var i = 0; i < recipeList.length; i++) {


                var newDiv = $("<div>").addClass("recipe-container m-2 rounded ")
                var recipeName = $("<h5>")
                recipeName.text(recipeList[i]["recipe"]["label"])
                var recipeImg = $("<img>").addClass("recipe-pic card-img")
                recipeImg.attr("src", recipeList[i]["recipe"]["image"])
                var linkToRecipe = $("<a>").text("Go to Recipe").attr("href", recipeList[i]["recipe"]["url"]).addClass("btn btn-primary recipe-link");
                var youtubeButton = $("<button>").addClass("btn youtube").attr("data", "youtubeBtn").text("Youtube")
                // var calories = $("<p>").text(Math.floor(recipeList[i]["recipe"]["calories"]) + "kcal")
                newDiv.append(recipeName, recipeImg, linkToRecipe, youtubeButton)
                $("#recipe-views").append(newDiv)


            }
            

                window.location.href= "#nextPage"

 
        })
    }

    $(".search").on("click", function (event) {
        event.preventDefault()

        diet = $("#diet").val();
        excluded = $("#excluded").val().trim()

        if ($("#ingredients").val()) {
            ingredients.push($("#ingredients").val().trim())
            displayButton()
        }

        displayWrittenRecipe()
        // .then(function(){
        // //     window.location.href= "#nextPage"
        // // })
            console.log("LOL")
        $("#ingredients").val("")
        $("#excluded").val("")
    })

    function displayButton() {
        $(".ingredient-button-views").empty()
        for (var i = 0; i < ingredients.length; i++) {
            var newDiv = $("<div>")
            var newIngredient = $("<span>").text(ingredients[i])
            var newRemoveButton = $("<button>").text("x").addClass("remove-ingredient").attr("data-name", ingredients[i])
            newDiv.append(newRemoveButton," " ,newIngredient )
            $(".ingredient-button-views").append(newDiv)
        }
    }

    $(document).on("click", ".remove-ingredient", function (event) {
        event.preventDefault()
        ingredients.splice(ingredients.indexOf($(this).attr("data-name")), 1)
        displayButton()
        displayWrittenRecipe()
    })

//============== Youtube Code ==========================

    $(document).on("click", ".youtube", function(event) {
        event.preventDefault()
      
      var foodName = $(this).attr("data-name")
      console.log(foodName)
      var queryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=how+to+cook+" + foodName + "&key=AIzaSyDLkMMIuBWt42J1WLEhQ-_pQx0bb9ZmeKo"
          $.ajax({
          url: queryURL,
          method: "GET"
      })
  
      .then(function(response) {
      var videoId = response.items[0].id.videoId
      console.log(videoId)
        //   $(this).attr("href", "https://www.youtube.com/watch?v=" + videoId);
        window.location.href = "https://www.youtube.com/watch?v=" + videoId
          })
      });





//=====================

    var config = {
        apiKey: "AIzaSyCQwHI33aLIXjZFR0yDaSjeMMiGgPf8EUY",
        authDomain: "tobi-s-toy.firebaseapp.com",
        databaseURL: "https://tobi-s-toy.firebaseio.com",
        projectId: "tobi-s-toy",
        storageBucket: "tobi-s-toy.appspot.com",
        messagingSenderId: "102493427088"
    };
    firebase.initializeApp(config);

    var database = firebase.database();    
    
    var queryURL;

    var lastChange;

    var counter;

    database.ref().once("value", function (snapshot) {
        

        console.log(snapshot.val())
        counter = snapshot.val().counter
        console.log(snapshot.val().counter)
        console.log(snapshot.val().lastChange)


        var difference = moment().diff(moment(snapshot.val().lastChange, "MM-DD-YYYY HH:mm:ss"), "minutes");
        console.log(difference)
        if (difference > 1440) {
            lastChange = moment().startOf("day").format("MM-DD-YYYY HH:mm:ss")
            console.log("Last Change: ", lastChange)
            database.ref().update({
                counter: counter + 1,
                lastChange: lastChange
            })
            databaseUpdate()
            console.log("It's been more than 24 hours");

        }
        else {
            var recipeNameDiv = $("<div>").text(snapshot.val()["daily-recipe"].recipeName);
            var recipeImgDiv = $("<img>").attr("src", snapshot.val()["daily-recipe"].recipeImg);
            $(".recipe-of-day").append(recipeNameDiv, recipeImgDiv);
            $("#video").attr("src", "https://www.youtube.com/embed/" + snapshot.val()["daily-recipe"].videoId);
                document.getElementById("video").style.display = "inherit";
        }

        function databaseUpdate() {

            var nutrientsArrOfObj = [
                {
                    name: "Vitamin B3",
                    nameCode: "NIA",
                    suggestedIntake: "18mg",
                    suggestedIntakeCode: "18%2B"
                },
                {
                    name: "Vitamin B6",
                    nameCode: "VITB6A",
                    suggestedIntake: "2mg",
                    suggestedIntakeCode: "2%2B"
                },
                {
                    name: "Vitamin C",
                    nameCode: "VITC",
                    suggestedIntake: "120mg",
                    suggestedIntakeCode: "120%2B"
                },
                {
                    name: "Vitamin E",
                    nameCode: "TOCPHA",
                    suggestedIntake: "19mg",
                    suggestedIntakeCode: "19%2B"
                },
                {
                    name: "Potassium",
                    nameCode: "K",
                    suggestedIntake: "3400mg",
                    suggestedIntakeCode: "3400%2B"
                },
                {
                    name: "Magnesium",
                    nameCode: "MG",
                    suggestedIntake: "400mg",
                    suggestedIntakeCode: "400%2B"
                }
            ]


            var nutrientDay = nutrientsArrOfObj[snapshot.val().counter].nameCode;

            if (snapshot.val().counter < nutrientsArrOfObj.length) {
                queryURL = "https://api.edamam.com/search?q=&nutrients%5B" + nutrientDay + "%5D=" + nutrientsArrOfObj[snapshot.val().counter]["suggestedIntakeCode"] + "&app_id=902698cd&app_key=e93d796dd6d7b7ae6039264345846ad3";
            } else {
                counter = 0;
                queryURL = "https://api.edamam.com/search?q=&nutrients%5B" + nutrientDay + "%5D=" + nutrientsArrOfObj[snapshot.val().counter]["suggestedIntakeCode"] + "&app_id=902698cd&app_key=e93d796dd6d7b7ae6039264345846ad3";
            }

            $.ajax({

                url: queryURL,
                method: "GET"

            }).then(function (response) {

                console.log(response);

                var randomNumber = Math.floor(Math.random() * response.hits.length);
                console.log(randomNumber)
                var recipeName = response.hits[randomNumber]["recipe"]["label"];
                var recipeNameDiv = $("<div>").text(recipeName)
                console.log(recipeName)
                var recipeImg = response.hits[randomNumber]["recipe"]["image"]
                console.log(recipeImg)
                var recipeImgDiv = $("<img>").attr("src", recipeImg)
                var linkToRecipe = response.hits[randomNumber]["recipe"]["url"];
                console.log(linkToRecipe)
                var calories = response.hits[randomNumber]["recipe"]["calories"] + "kcal";
                console.log(calories)
                // var nutrient; 
                // nutrient.text(recipeList[randomNumber]["recipe"]["totalNutrients"]["nutrientDay"]["quantity"]);
                $(".recipe-of-day").append(recipeNameDiv, recipeImgDiv)
                var foodName = recipeName
                console.log(foodName)
                var youtubeQueryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=how+to+cook+" + foodName + "&key=AIzaSyDLkMMIuBWt42J1WLEhQ-_pQx0bb9ZmeKo"
                $.ajax({
                    url: youtubeQueryURL,
                    method: "GET"
                })
                    .then(function (response) {
                        var videoId = response.items[0].id.videoId
                        console.log(response)
                        database.ref("/daily-recipe").set({

                            recipeName: recipeName,
                            calories: calories,
                            recipeImg: recipeImg,
                            linkToRecipe: linkToRecipe,
                            videoId: videoId,
                            // counter: counter

                    })
                    $("#video").attr("src", "https://www.youtube.com/embed/" + videoId);
                document.getElementById("video").style.display = "inherit";
                

                });

                console.log("submitted to database")

            });

            
        }

    });

})