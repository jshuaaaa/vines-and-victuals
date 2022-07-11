//
var storedRecipe = JSON.parse(localStorage.storedRecipe)
console.log(storedRecipe);
console.log(localStorage.storedRecipe);

for( var i=0 ; i < storedRecipe.length ; i++){
    $('<a>', {
        href:"./single.html/" + storedRecipe[i].url
    } ).appendTo("#stored") 
}  