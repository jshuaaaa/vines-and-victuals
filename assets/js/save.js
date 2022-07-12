// JS file for localstorage DATA
var storedRecipe = JSON.parse(localStorage.storedRecipe)
var stored = document.getElementById('stored')

//Function used to display storage
function displayStorage () {
    stored.innerHTML = ""
for( var i=0 ; i < storedRecipe.length ; i++){
    $('<a>', {
        href:"./single.html" + storedRecipe[i].url,
        id: i
    } ).appendTo("#stored")
    
    $('<h2>', {
    }).text(storedRecipe[i].name).appendTo('#'+i)

    $('<img>', {
        src: storedRecipe[i].img
    }).appendTo('#'+i)
    
    $('<button>', {
        id: 'button' + i

    }).appendTo('#' + i).text("Remove")

}  
}
//Event listener for a delete button to remove something from your storage
stored.addEventListener("click", function(event) {
    var element = event.target;

    if (element.matches("button") === true) {
        event.stopPropagation()
        event.preventDefault()
      var index = element.parentElement.getAttribute("id");
      storedRecipe.splice(index, 1);
      localStorage.storedRecipe = JSON.stringify(storedRecipe)
      displayStorage()
      
    }
  });

  displayStorage()