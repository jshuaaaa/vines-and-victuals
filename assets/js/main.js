const search = document.getElementById('search')
const searchButton = document.getElementById('searchButton')
const food = document.getElementById('food')
const drink = document.getElementById('drink')
const saveButton = document.getElementById('save-button')
let url = 'https://cocktails3.p.rapidapi.com/random'
let searchResult
var page = 'assets/html/results.html' 
var path = window.location.pathname
options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'c36c798c41msh6e4944725bbf051p1c3342jsn7e587c0ecbdc'
	}
}
// If true calls Drink API
// If false calls Food API

let FoodOrDrink = true



function settingsChecker(e) {
	e.preventDefault()
	if(food.checked) {
		console.log('e')
		FoodOrDrink = false
		options = {
			method: 'GET',
			headers: {
				'X-RapidAPI-Key': 'c36c798c41msh6e4944725bbf051p1c3342jsn7e587c0ecbdc',
			}
		}
	}

	if(drink.checked) {
		console.log('d')
		FoodOrDrink = true;
		options = {
			method: 'GET',
			headers: {
				'X-RapidAPI-Key': 'c36c798c41msh6e4944725bbf051p1c3342jsn7e587c0ecbdc'
			}
		}
	}
}



$('#save-button').on("click", settingsChecker)

$('#searchButton').on("click", move)

function move(e) {
	e.preventDefault()
	localStorage.searchResult = search.value

	if (food.checked) {
		FoodOrDrink = false
		window.location.assign('assets/html/loader.html') 
		
		//  block of code to be executed if the condition is true
	  } if(drink.checked) {

		window.location.assign('assets/html/loader2.html') 
		//  block of code to be executed if the condition is false
	  }

	
	

}

	function fetchApi(){
	
		if (FoodOrDrink === true) {
			url = `https://cocktails3.p.rapidapi.com/search/byname/${localStorage.searchResult}`
	
			getDrinks()
	
		} else
		url = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?query=${localStorage.searchResult}&type=main course&addRecipeInformation=true&fillIngredients=true`
		getFood()
	
	
}


//Function getDrinks
function getDrinks() {
	fetch(url, options)
	.then(response => response.json())
	.then(function(response){
		console.log(response)
		let ingredient;
		var i = 0
		let arrayStatusForFood = true
		loopArray()

		function loopArray() {
		ingredient = response.body[0][0].ingredients[i]
		newUrl = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?includeIngredients=${ingredient}&type=main course&addRecipeInformation=true`
		if(arrayStatusForFood === true) {
			getFoodByIngredients(newUrl, options)
		}
		
		if(arrayStatusForFood === false && path.match(page)) {
			console.log(response.body[0].length)
			
				for(var z = 0; z < response.body[0].length; z++) {
				$('<a>', {
					href: './single.html?drink=' + response.body[0][z].name + '=' + z,
					id: z + 'a'
				}).appendTo('#api-content')
				$('<div>', {
					id: z
				}).appendTo('#' + z + 'a')
				$('<h2>',{
					id: response.body[0][z].name
				}).appendTo('#' + z).text(response.body[0][z].name)
				
				$('<div>', {
					id: 'ingredientList' + z
				}).appendTo("#"+z)

				console.log(response.body[0][0].ingredients.length)

				for(var index = 0; index < response.body[0][z].ingredients.length; index++) {
					$('<p>').appendTo('#ingredientList'+z).text(response.body[0][z].ingredients[index])
			}
			

		}

			

			
	}
//function getFoodByIngredients
	function getFoodByIngredients(newUrl,options) {
		fetch(newUrl, options)
		.then(response => response.json())
		.then(function(response) {
			
			
			if(response.results.length === 0) {
				i++
				console.log('h')
				arrayStatusForFood = true
				loopArray(i)
				
			} else
			console.log(response)
			arrayStatusForFood = false
			loopArray()
	
		}
	)}
		options = {
			method: 'GET',
			headers: {
				'X-RapidAPI-Key': 'c36c798c41msh6e4944725bbf051p1c3342jsn7e587c0ecbdc'
			}
		}
		
		
    }
})
	.catch(err => console.error(err))
}
//Function getFood
function getFood() {
	fetch(url, options)
	.then(response => response.json())
	.then(function(response){
		console.log(url)
		console.log(response)
		let ingredient;
		var i = 0
		let arrayStatusForDrink = true
		loopArrayD()
		
	
		function loopArrayD() {
		
		ingredient = response.results[0].extendedIngredients[i].name
		newUrl = `https://cocktails3.p.rapidapi.com/search/byingredient/${ingredient}`
		if(arrayStatusForDrink === true) {
			getDrinksByIngredients(newUrl, options)
		}
		
		if(arrayStatusForDrink === false) {
			for(var z = 0; z <response.body[0].length; z++) {
				$('<h2>').appendTo('#api-content')
				console.log(z)
			}
		}
		
	}

	function getDrinksByIngredients(newUrl,options) {
		fetch(newUrl, options)
		.then(response => response.json())
		.then(function(response) {
			
			console.log(response.success)
			if(response.body[0].length === 0) {
				i++
				console.log('h')
				arrayStatusForDrink = true
				loopArrayD(i)
				
			} else
			console.log(response)
			arrayStatusForDrink = false
	
		}
	)}
		options = {
			method: 'GET',
			headers: {
				'X-RapidAPI-Key': 'c36c798c41msh6e4944725bbf051p1c3342jsn7e587c0ecbdc'
			}
		}
		
		
    })
	.catch(err => console.error(err))

}



