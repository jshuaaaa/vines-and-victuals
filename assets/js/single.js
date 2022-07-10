const ingredientList = document.getElementById('ingredient-list')
options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'c36c798c41msh6e4944725bbf051p1c3342jsn7e587c0ecbdc'
	}
}
var title




var queryString = document.location.search;
console.log(queryString)
var drinkName = queryString.split('=')[2];
var FoodIdSearch = queryString.split('=')[3]
console.log(drinkName)
  if( queryString.split('=')[1] === 'drink') {
    var url5 = `https://cocktails3.p.rapidapi.com/search/byname/${drinkName}`
    getApiSingleForDrink()
  } else 
    var url6 = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${FoodIdSearch}/information`
    getApiSingleForFood()
    
  
    
    
    

function getApiSingleForDrink() {
	fetch(url5, options)
	.then(response => response.json())
	.then(function(response){
        console.log(response)

        title = response.body[0][0].name
        console.log(title)
        $('#title').text(response.body[0][0].name)
        
        for(var index = 0; index < response.body[0][0].ingredients[0].length; index++) {
            console.log('runing')
            $('<p>').appendTo('#ingredient-list').text(response.body[0][0].ingredients[index])
        }
       
        let ingredient;
		var i = 0
		let arrayStatusForFood = true
		loopArrayForDrink()

        function loopArrayForDrink() {
            ingredient = response.body[0][0].ingredients[i]
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
                        $('<a>', {
                            id: 'link' + w,
                            href:'./single.html?=food=' + response.results[w].title + '=' + response.results[w].id,
                        }).appendTo('#food'+w)
                        $('<img>',{
                            href: '',
                            src: response.results[w].image,

                        }).appendTo('#link'+w)
                    }
        
                    loopArrayForDrink()
            
                }
            )}


        }
        })
        .catch($('#title').text("Sorry we cant get this data right now!"))
    }

function getApiSingleForFood() {
    fetch(url6, options)
	.then(response => response.json())
	.then(function(response){
        
        var FoodId = queryString.split('=')[3]; 
        let ingredient;
		var i = 0
        arrayStatusForDrink = true

        console.log(response)
       title = response.title
        $('#title').text(response.title)
        for(var x= 0; x < response.extendedIngredients.length; x++) {
            $('<li>').appendTo('#ingredient-list').text(response.extendedIngredients[x].name)
        }
        
        for(var index = 0; index < response.analyzedInstructions[0].steps.length; index++) {
            $('<li>').appendTo('#instructions').text(response.analyzedInstructions[0].steps[index].step)
        }

        loopArrayForDrinks()

        function loopArrayForDrinks() {
		
            ingredient = response.extendedIngredients[i].name
            newUrl = `https://cocktails3.p.rapidapi.com/search/byingredient/${ingredient}`
            if(arrayStatusForDrink === true) {
                getDrinksByIngredients(newUrl, options)
            } 
            
          
          
        }

        function getDrinksByIngredients(newUrl,options) {
            fetch(newUrl, options)
            .then(response => response.json())
            .then(function(response) {
              
                console.log(response)
                if(response.body[0].length === 0) {
                    i++
                    loopArrayForDrinks(i)
                    
                } else
                for(var w = 0; w < response.body[0].length; w++) {
                $('<div>', {
                    id: "drink" + w
                }).appendTo('#related-food')
                $('<a>', {
                    id: 'link' + w,
                    href: './single.html?=drink=' + response.body[0][w].name + '=' + w
                }).appendTo('#drink' + w)
                $('<h1>').appendTo('#link'+w).text(response.body[0][w].name)
                
                arrayStatusForDrink = false
            }
                
                    
        
            }
        )}

    })
    .catch($('#title').text("Sorry we cant get this data right now!"))
}

var saveResult = document.getElementById('save-result')
function storeData(e) {
    e.preventDefault()
    var savedData = {
        url: queryString,
        name: title
    }

    let storedRecipe = localStorage.getItem("storedRecipe") || '[]';
    
        
    storedRecipe = JSON.parse(storedRecipe)
    storedRecipe.push(savedData)
    localStorage.setItem("storedRecipe", JSON.stringify(storedRecipe))
    

    saveResult.setAttribute('style', 'display:none;')
   
    
    
}

saveResult.addEventListener('click', storeData)
    
    
    

