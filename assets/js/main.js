const search = document.getElementById('search')
const searchButton = document.getElementById('searchButton')

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'c36c798c41msh6e4944725bbf051p1c3342jsn7e587c0ecbdc',
		'X-RapidAPI-Host': 'cocktails3.p.rapidapi.com'
	}
};

searchButton.addEventListener("click", getDrinks)

function getDrinks() {
fetch('https://cocktails3.p.rapidapi.com/random', options)
	.then(response => response.json())
	.then(function(response){
        console.log(response)
        console.log(response.body[0].name)
    })
	.catch(err => console.error(err));
}