
fetchApi()


const display = document.querySelector("#drinks-display");
var drinkname2 = localStorage.getItem("searchResult")


const drinkimageURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + drinkname2


function getDrinksImage() {
	fetch(drinkimageURL)
	.then(response => response.json())
    .then((result) => DisplayResults(result))
    display.innerHTML = "";

      
    } 
    
    function DisplayResults(result) {
        const drinkNames = result.drinks;
        if (result.drinks == null) {
          // alert("bummer");
          display.innerHTML = "";
          return;
        }
        drinkNames.forEach((element) => {
          let { thumbnail, div, drink, instructions } = declareVar();
          //thumbnail from API
        //   thumbnail.classList = "drink-thumbnail card-img-top";
          thumbnail.src = element.strDrinkThumb;
          div.appendChild(thumbnail);
      
          //drink title
          drink.innerText = element.strDrink;
          div.appendChild(drink);
      
          //drink instructions in p element
          instructions.innerText = element.strInstructions;
          div.appendChild(instructions);
          display.appendChild(div);
        });
      
      
        function declareVar() {
          let drink = document.createElement("h3");
          let thumbnail = document.createElement("img");
          let div = document.createElement("div");
          let instructions = document.createElement("p");
          return { thumbnail, div, drink, instructions };
        }
      }   

     
    
       if (localStorage.searchQuery === 'food') {
 
		
		//  block of code to be executed if the condition is true
	  } if(localStorage.searchQuery === 'drink') {

		getDrinksImage()
		//  block of code to be executed if the condition is false
	  }
     