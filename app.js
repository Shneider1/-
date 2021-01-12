//Delgetstei ajillah controller
var uiController = (function() {

})();
//Sanhvv deer ajillah controller
var financeController = (function() {

})();
//Programminn holbogch controller
var appController = (function(uiController, financeController) {
    var ctrlAddItem = function(){
  //1.Оруулах өгөгдлийг дэлгэцнээс олж авна
  console.log("Delgest ogogdol awh heseg");
  //2.Олж аөсан өгөгдлүүдээ санхүүгийн контроллерт датмжуулж тэнд хадгална.
  //3.Олж авсан өгөгдлүүдээ веб дээрээ тохирох хэсэгт нь гаргана
  //4.Төсвийг тооцоолно
  //5.Эцсийн үлдэгдэл тооцоог дэлгэцэнд гаргана.
    };
 document.querySelector(".add__btn").addEventListener("click", function(){
  ctrlAddItem();
 });
 document.addEventListener("keypress", function(event){
     if(event.keyCode == 13 || event.which == 13)
     {
         ctrlAddItem();
     }
 });
 
})(uiController, financeController);