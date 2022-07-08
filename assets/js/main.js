const search = document.getElementById('search')
const searchButton = document.getElementById('searchButton')
const food = document.getElementById('food')
const drink = document.getElementById('drink')
const saveButton = document.getElementById('save-button')
let url = 'https://cocktails3.p.rapidapi.com/random'
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

saveButton.addEventListener("click", settingsChecker)

searchButton.addEventListener("click", function(e){
	e.preventDefault()
	window.location.assign('assets/html/loader.html') 

	if (FoodOrDrink === true) {
		url = `https://cocktails3.p.rapidapi.com/search/byname/${search.value}`

		getDrinks()

	} else
	url = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?query=${search.value}&type=main course&addRecipeInformation=true&fillIngredients=true`
	getFood()
})
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
	
		}
	)}
		options = {
			method: 'GET',
			headers: {
				'X-RapidAPI-Key': 'c36c798c41msh6e4944725bbf051p1c3342jsn7e587c0ecbdc'
			}
		}
		
		
    })
	.catch(err => console.error(err));
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



