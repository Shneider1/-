//Delgetstei ajillah controller
var uiController = (function() {

})();
//Sanhvv deer ajillah controller
var financeController = (function() {

})();
//Programminn holbogch controller
var appController = (function(uiController, financeController) {

 document.querySelector(".add__btn").addEventListener("click", function(){
  //1.Оруулах өгөгдлийг дэлгэцнээс олж авнав
  //2.Олж аөсан өгөгдлүүдээ санхүүгийн контроллерт датмжуулж тэнд хадгална.
  //3.Олж авсан өгөгдлүүдээ веб дээрээ тохирох хэсэгт нь гаргана
  //4.Төсвийг тооцоолно
  //5.Эцсийн үлдэгдэл тооцоог дэлгэцэнд гаргана.
 });
 document.addEventListener("keypress", function(event){
     console.log('tovch daraglaa');


 });
 
})(uiController, financeController);