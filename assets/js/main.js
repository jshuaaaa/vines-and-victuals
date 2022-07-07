const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'c36c798c41msh6e4944725bbf051p1c3342jsn7e587c0ecbdc',
		'X-RapidAPI-Host': 'cocktails3.p.rapidapi.com'
	}
};

fetch('https://cocktails3.p.rapidapi.com/random', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));