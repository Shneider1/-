//Delgetstei ajillah controller
var uiController = (function() {

})();
//Sanhvv deer ajillah controller
var financeController = (function() {

})();
//Programminn holbogch controller
var appController = (function(uiController, financeController) {

document.querySelector(".add__btn").addEventListener("click", function(){
    console.log("Linked!!");
} )
})(uiController, financeController);