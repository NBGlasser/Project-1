
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

  database.ref().once("value", function (snapshot){

    var lastChange = childSnapshot.val().timeToStore;
  });


    var difference = moment().subtract(moment(lastChange), "minutes");

        if (difference > 1440) {

            function databaseUpdate ()

            console.log("It's been more than 24 hours");

        }

        else {

            function noUpdate ()

            // database.once

            // And other stuff

        }



    function databaseUpdate () {

       //Update the recipe of the day 

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

                }
                

            });
                

          
           

            if (counter < nutrientsArrOfObj.length){
            queryURL = "https://api.edamam.com/search?q=&nutrients%5B" + nutrientsArrOfObj[counter]["nameCode"] + "%5D=" + nutrientsArrOfObj[counter]["suggestedIntakeCode"] + "&app_id=902698cd&app_key=e93d796dd6d7b7ae6039264345846ad3"
            counter ++;
            } else {
            counter = 0
            queryURL = "https://api.edamam.com/search?q=&nutrients%5B" + nutrientsArrOfObj[counter]["nameCode"] + "%5D=" + nutrientsArrOfObj[counter]["suggestedIntakeCode"] + "&app_id=902698cd&app_key=e93d796dd6d7b7ae6039264345846ad3"
            counter ++;
            }

            database.ref().set(counter);
        
        //Add randomisation (And add the result method return)
        function random() {
            randomNumber = Math.floor(Math.random() * 5);
          }
       

        //Add Timestamp

                var timeToStore = moment().startOf("day")

                console.log(timeToStore)

                database.ref().set({timeToStore: timeToStore});
               

            };






        }) 