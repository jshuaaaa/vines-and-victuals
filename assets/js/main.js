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



function settingsChecker(e) {
	e.preventDefault()
	if(food.checked) {
		console.log('e')
		url = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random?tags=vegetarian%2Cdessert&number=1'
		options = {
			method: 'GET',
			headers: {
				'X-RapidAPI-Key': 'c36c798c41msh6e4944725bbf051p1c3342jsn7e587c0ecbdc',
			}
		}
	}

	if(drink.checked) {
		console.log('d')
		url = 'https://cocktails3.p.rapidapi.com/random'
		options = {
			method: 'GET',
			headers: {
				'X-RapidAPI-Key': 'c36c798c41msh6e4944725bbf051p1c3342jsn7e587c0ecbdc'
			}
		}
	}
}

saveButton.addEventListener("click", settingsChecker)

searchButton.addEventListener("click", function(){
	if (url === 'https://cocktails3.p.rapidapi.com/random') {
		getDrinks()

	} else
	getFood()
})

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
		
		ingredient = response.body[0].ingredients[i]
		newUrl = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?includeIngredients=${ingredient}&type=main course`
		if(arrayStatusForFood === true) {
			getFoodByIngredients(newUrl, options)
		}
		
	}

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

function getFood() {
	fetch(url, options)
	.then(response => response.json())
	.then(function(response){
		console.log(response)
		let ingredient;
		var i = 0
		let arrayStatusForDrink = true
		loopArrayD()
	
		function loopArrayD() {
		
		ingredient = response.recipes[0].extendedIngredients[i].name
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
			if(response.success === false) {
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



