const search = document.getElementById('search')
const searchButton = document.getElementById('searchButton')
const food = document.getElementById('food')
const drink = document.getElementById('drink')
const saveButton = document.getElementById('save-button')
const iconButton = document.getElementById('icon')
const hideclass = document.querySelector('.hideclass')
const closebutton = document.getElementById('closebutton')
let url = 'https://cocktails3.p.rapidapi.com/random'
let searchResult
var page = 'assets/html/results.html' 
var path = window.location.pathname
let arrayStatusForFood = true
let arrayStatusForDrink = true
var options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'c36c798c41msh6e4944725bbf051p1c3342jsn7e587c0ecbdc'
	}
}
//Defines Variables


if (localStorage.searchQuery === undefined) {
	localStorage.searchQuery = 'food'
}

if(localStorage.searchQuery === 'food') {
	search.setAttribute('placeholder', 'Enter a food (i.e., sandwich, steak, peppers,tacos)')
} else search.setAttribute('placeholder', 'Enter a drink (i.e., vodka, gin, whiskey)')

// Checks for searchQuery and makes placeholder based on what user is searching for




// Function used to change search criteria
function settingsChecker(e) {
	e.preventDefault()
	if(food.checked) {
		console.log('e')
		localStorage.searchQuery = 'food'
		search.setAttribute('placeholder', 'Enter a food (i.e., sandwich, steak, peppers,tacos)')
		options = {
			method: 'GET',
			headers: {
				'X-RapidAPI-Key': 'c36c798c41msh6e4944725bbf051p1c3342jsn7e587c0ecbdc',
			}
		}
	}

	if(drink.checked) {
		console.log('d')
		localStorage.searchQuery = 'drink'
		search.setAttribute('placeholder', 'Enter a drink (i.e., vodka, gin, whiskey)')
		options = {
			method: 'GET',
			headers: {
				'X-RapidAPI-Key': 'c36c798c41msh6e4944725bbf051p1c3342jsn7e587c0ecbdc'
			}
		}
	}

	if (localStorage.searchQuery === 'drink') {
		search.setAttribute('placeholder', 'Enter a drink (i.e., vodka, gin, whiskey')
	}
	
}



$('#save-button').on("click", settingsChecker)

$('#searchButton').on("click", move)
//Moves user to results page
function move(e) {
	e.preventDefault()
	localStorage.searchResult = search.value

	if (localStorage.searchQuery === 'food') {

		window.location.assign('assets/html/loader.html') 
		
		//  block of code to be executed if the condition is true
	  } if(localStorage.searchQuery === 'drink') {

		window.location.assign('assets/html/loader2.html') 
		//  block of code to be executed if the condition is false
	  }

	
	

}
// Function called in results.js to call the Api Fetch
	function fetchApi(){
	
		if (localStorage.searchQuery === 'drink') {
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
		//Displaying data on page
		for(var z = 0; z < response.body[0].length; z++) {
			$('<a>', {
				href: './single.html?=drink=' + response.body[0][z].name + '=' + z,
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
				$('<li>').appendTo('#ingredientList'+z).text(response.body[0][z].ingredients[index])
			}

		loopArray()
			// LoopArray and get FoodByIngeredients is an algorithm used to traverse each array allowing the api's to talk to eachother and find mutual ingredients and list the products on the screen in single.js
		function loopArray() {
		ingredient = response.body[0][0].ingredients[i]
		newUrl = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?includeIngredients=${ingredient}&type=main course&addRecipeInformation=true`
		if(arrayStatusForFood == true) {
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
			arrayStatusForFood = false
			loopArray(i)
			
			
	
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

}
//The same thing as get drinks but for the food side
function getFood() {
	fetch(url, options)
	.then(response => response.json())
	.then(function(response){
		console.log(url)
		console.log(response)
		let ingredient;
		var i = 0

		loopArrayD()

		for(var z = 0; z < response.results.length; z++) {
			console.log(arrayStatusForDrink)
			
			$('<a>', {
				href: './single.html?=food=' + response.results[z].title + '=' + response.results[z].id,

				id: z + 'a'
			}).appendTo('#api-content')
			$('<div>', {
				id: z
			}).appendTo('#' + z + 'a')
			$('<h2>',{
				id: response.results[z].title
			}).appendTo('#' + z).text(response.results[z].title )
			
			$('<div>', {
				id: 'ingredientList' + z
			}).appendTo("#"+z)
			
			console.log(response.results[z].extendedIngredients.length)
			for(var index = 0; index < response.results[z].extendedIngredients.length; index++) {
				$('<li>').appendTo('#ingredientList'+z).text(response.results[z].extendedIngredients[index].original)
			}
			

	

	}
		
	
		function loopArrayD() {
		
		ingredient = response.results[0].extendedIngredients[i].name
		newUrl = `https://cocktails3.p.rapidapi.com/search/byingredient/${ingredient}`
		if(arrayStatusForDrink === true) {
			getDrinksByIngredients(newUrl, options)
		}
		
		console.log(response.results.length)

		

		
	}

	function getDrinksByIngredients(newUrl,options) {
		fetch(newUrl, options)
		.then(response => response.json())
		.then(function(response) {
			
			console.log(response.body[0].length)
			if(response.body[0].length === 0) {
				i++
				console.log('h')
				loopArrayD(i)
				
			} else if(response.body[0].length > 0)
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


}



iconButton.addEventListener("click", opendevs)

function opendevs() {
	hideclass.classList.remove("hideclass")

}

closebutton.addEventListener("click", closedevs)

function closedevs() {
	hideclass.classList.add("hideclass")

}
