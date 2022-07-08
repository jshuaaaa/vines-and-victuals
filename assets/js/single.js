fetchApi()
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

function getApiSingle() {
	fetch(url5, options)
	.then(response => response.json())
	.then(function(response){
        var drinkId = queryString.split('=')[2];
        console.log(response)
        for(var index = 0; index < response.body[0][drinkId].ingredients[drinkId].length; index++) {
            console.log('runing')
            $('<p>').appendTo('#ingredient-list').text(response.body[0][drinkId].ingredients[index])
        }
       
    })
}

function getRelatedApi() {
    fetch(url6, options)
	.then(response => response.json())
	.then(function(response){
        

        for(var i = 0; i < response.results.length; i++) {
            $('<div>', {
                id: "food" + i
            }).appendTo('#related-food')
            $('<h1>').appendTo('#food'+i).text(response.results[i].title)
            $('<img>',{
                src: response.results[i].image
            }).appendTo('#food'+i)

        }
    })
}





getApiSingle()
getRelatedApi()
