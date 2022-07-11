//
var storedRecipe = JSON.parse(localStorage.storedRecipe)


for( var i=0 ; i < storedRecipe.length ; i++){
    $('<a>', {
        href:"./single.html" + storedRecipe[i].url
    } ).appendTo("#stored") 
}  