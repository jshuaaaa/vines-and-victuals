const ingredientList = document.getElementById('ingredient-list')




var queryString = document.location.search;
var drinkName = queryString.split('=')[1];
drinkName = decodeURI(drinkName)
console.log(queryString)

if (drinkName) {
    $('#title').text(drinkName)

  } else {

    document.location.replace('./index.html');
  }


var url5 = `https://cocktails3.p.rapidapi.com/search/byname/${localStorage.searchResult}`
var url6 = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?includeIngredients=${localStorage.searchResult}&type=main course&addRecipeInformation=true`

function getApiSingleForDrink() {
	fetch(url5, options)
	.then(response => response.json())
	.then(function(response){
        var drinkId = queryString.split('=')[2];
        
        for(var index = 0; index < response.body[0][drinkId].ingredients[drinkId].length; index++) {
            console.log('runing')
            $('<p>').appendTo('#ingredient-list').text(response.body[0][drinkId].ingredients[index])
        }
       
        let ingredient;
		var i = 0
		let arrayStatusForFood = true
		loopArrayForDrink()

        function loopArrayForDrink() {
            ingredient = response.body[0][drinkId].ingredients[i]
            newUrl = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?includeIngredients=${ingredient}&type=main course&addRecipeInformation=true`
            if(arrayStatusForFood === true) {
                getFoodByIngredient(newUrl, options)
            } 

   
            function getFoodByIngredient(newUrl,options) {
                fetch(newUrl, options)
                .then(response => response.json())
                .then(function(response) {
                    
                    
                    if(response.results.length === 0) {
                        i++
                        console.log('h')
                        arrayStatusForFood = true
                        loopArrayForDrink(i)
                        
                    } else
                    console.log(response)
                    arrayStatusForFood = false
                    for(var w = 0; w < response.results.length; w++) {
                        $('<div>', {
                            id: "food" + w
                        }).appendTo('#related-food')
                        $('<h1>').appendTo('#food'+w).text(response.results[w].title)
                        $('<img>',{
                            href: '',
                            src: response.results[w].image,

                        }).appendTo('#food'+w)
                    }
        
                    loopArrayForDrink()
            
                }
            )}


        }
        })
    }


getApiSingleForDrink()