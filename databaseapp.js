
$(document).ready(function(){
    
 // Initialize Firebase

var config = {
    apiKey: "AIzaSyBR6USQgTHwdgs0TPjwy2-XI6U8Tgt02VI",
    authDomain: "project-1-1f815.firebaseapp.com",
    databaseURL: "https://project-1-1f815.firebaseio.com",
    projectId: "project-1-1f815",
    storageBucket: "project-1-1f815.appspot.com",
    messagingSenderId: "10187316508"
  };
  firebase.initializeApp(config);
  
  var database = firebase.database();

var queryURL; 

var lastChange;

var counter;

database.ref().once("value", function (snapshot){

    if (!snapshot.hasChild("counter")){

        databaseUpdate ()

    } else{ 


        database.ref().once("value", function (snapshot){

            lastChange = snapshot.val().timeToStore;
        });

        var difference = moment().subtract(moment(lastChange), "minutes");

        if (difference > 1440) {

            databaseUpdate()

            console.log("It's been more than 24 hours");

        }

        else {

            // function pull whatever is in Firebase Function ()

        }

    }


    //Update the recipe of the day 

    function databaseUpdate () {

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


            database.ref().once("value", function (snapshot){

                if (!snapshot.hasChild("counter")){

                    database.ref().set({counter: 0});

                } else {

                    counter = childSnapshot.val().counter;

                }
            });

            if (counter < nutrientsArrOfObj.length) {
                queryURL = "https://api.edamam.com/search?q=&nutrients%5B" + nutrientsArrOfObj[counter]["nameCode"] + "%5D=" + nutrientsArrOfObj[counter]["suggestedIntakeCode"] + "&app_id=902698cd&app_key=e93d796dd6d7b7ae6039264345846ad3"
                counter ++;
                } else {
                counter = 0
                queryURL = "https://api.edamam.com/search?q=&nutrients%5B" + nutrientsArrOfObj[counter]["nameCode"] + "%5D=" + nutrientsArrOfObj[counter]["suggestedIntakeCode"] + "&app_id=902698cd&app_key=e93d796dd6d7b7ae6039264345846ad3"
                counter ++;
                }

            $.ajax({
            
    
                url:queryURL,
                method: "GET"
                
            }).then(function(response){
    
                randomNumber = Math.floor(Math.random() * recipeList.length);
    
                recipeName.text(recipeList[randomNumber]["recipe"]["label"]);
                recipeImg.attr("src",recipeList[randomNumber]["recipe"]["image"]);
                var linkToRecipe = $("<a>").text("Go to Recipe").attr("href" ,recipeList[randomNumber]["recipe"]["url"]).addClass("btn btn-primary");
                var calories = $("<p>").text(Math.floor(recipeList[randomNumber]["recipe"]["calories"]) + "kcal");
                
                            var foodName = recipeName
                            console.log(foodName)
                            var queryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=how+to+cook+" + foodName + "&key=AIzaSyDLkMMIuBWt42J1WLEhQ-_pQx0bb9ZmeKo"
                                $.ajax({
                                url: queryURL,
                                method: "GET"
                            })
                            .then(function(response) {
                            var videoId = response.items[0].id.videoId        
                                })
    
               database.ref().set({
                   
                recipeName: recipeName, 
                calories: calories,
                recipeImg: recipeImg,
                linkToRecipe: linkToRecipe,
                videoId: videoId
    
                });
            
            });

        //Add Timestamp

                var timeToStore = moment().startOf("day")

                console.log(timeToStore)

                database.ref().set({timeToStore: timeToStore});
               
        }

        });
        
    })