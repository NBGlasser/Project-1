# Project-1

![] (placeholder.png)

## Problem / Motivation


When inputting a simple list of ingredients and wanting recipe matches: there is an inability to find a good result format for said recipe based on current design of search engine.

Example: I have potatoes, tomatoes, and chicken, and I am looking for a matching recipe, here is the Google search result:


The results are numerous, confusing and all different formats pulled from different sites
There is one “featured” result that google return. But that one result has curry powder, garlic, onions and many more required ingredients to complete the recipe, maybe I don’t have all those ingredients … 214,000,000 results to go!
How it addresses the problem:

The app is limited to a set number of returns that are manageable and easy to add to dynamically, in the day and age of millennials, video cooking tutorials included in the returns. Additionally, the app automatically looks up video tutorials on Youtube for whichever recipe the user selected. Finally, our app includes a recipe of the day with full Youtube and Edamam support.

## How Everything Works

First our application pushes input ingredients into an array and whenever a new ingredient is added our page dynamically updates. Additionally our app takes into account any dietary restrictions a user inputs. The user is then allowed to choose between a webpage with the recipe written out or a youtube video with instructions on how to make the recipe. At the same time, our app uses firebase to display a dynamically generated recipe of the day that updates every 24 hours and similarly provides a written recipe and youtube video.


## Tools used in WTF

| Tool          | Application   | Result|
| ------------- |:-------------:| -----:|
| HTML | Basic Layout of document | The document has basic content |
| CSS | Styling the document | The webpage looks nice |
| Bootstrap | Ease of stying | The webpage looks nice and it is easier to make it look nice |
| Flexbox | Styling | Made the recipe display look nicer
| JavaScript |  All essential functionality | The webpage works |
| Edamam API | Receives Ajax calls and returns food data | Allows our userbase to access recipes |
| Youtube API |Receives Ajax calls and returns video data | Allows our userbase to access youtube videos |
| Firebase | Stores data specified by us in JavaScript | Allows us to run our recipe of the day |
| Moment.js | Allows for easy conversion of time | Makes it feasible to detect what day it is, letting us update our recipe of the day accordingly |
| New Library | Something | Other thing
