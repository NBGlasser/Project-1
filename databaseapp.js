

var lastChange = childSnapshot.val().timeToStore;

var difference = moment().subtract(moment(lastChange), "minutes");

if (difference > 1440) {

    function databaseUpdate ()

    console.log("It's been more than 24 hours");

}

else {

    function noUpdate ()

    database.once

    And other stuff

}



    function databaseUpdate () {

        var timeToStore = moment().startOf("day")

        console.log(timeToStore)

        database.ref().set(timeToStore);

        //Add randomisation etc.

    }






