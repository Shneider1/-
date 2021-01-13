//Delgetstei ajillah controller----------------------------------------------
var uiController = (function() {
    var DOMstrings = {
        inputType : ".add__type",
        inputDescription: ".add__description",
        inputValue : ".add__value",
        addBtn : ".add__btn",
        incomeList: '.income__list',
        expenseList: '.expenses__list',
        tusuvLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expenseLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        containerDiv: '.container'

    };

    return {
        getInput: function() {
            return {
            type: document.querySelector(DOMstrings.inputType).value,
            description: document.querySelector(DOMstrings.inputDescription).value,
            value: parseInt(document.querySelector(DOMstrings.inputValue).value)
            };
        },

        getDOMstrings: function(){
            return DOMstrings;
        },
        //Tailbar,Dvn 2 iig tsewerldeg
        clearFields: function(){
            var fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);
            //Convert List to Array
            var fieldsArr = Array.prototype.slice.call(fields);
            //Array bvriin utgiig hoosloh
            fieldsArr.forEach(function(el, index, array){
                el.value = '';
            });
            //tailbar bolon dvn deer bichej duussnii daraaa cursoriig tailbar luu shiljvvlj bna.
            fieldsArr[0].focus();
            // for(i = 0; i < fieldsArr.length; i++ ){
            //     fieldsArr[i].value = '';
            // }
        }, 

        tusviigUzuuleh: function(tusuv){
            document.querySelector(DOMstrings.tusuvLabel).textContent = tusuv.tusuv;
            document.querySelector(DOMstrings.incomeLabel).textContent = tusuv.totalInc;
            document.querySelector(DOMstrings.expenseLabel).textContent = tusuv.totalExp;
            document.querySelector(DOMstrings.percentageLabel).textContent = tusuv.huvi;
        },
        deleteListItem: function(id){
            var el = document.getElementById(id);
            el.parentNode.removeChild(el);

        },

        addListtItem: function(item, type){
            //Orlogo zarlagagiin aguulsan html -iig beltgene.
            var html,list;
            if(type === 'inc'){
                list = DOMstrings.incomeList;
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">$$Description$$</div><div class="right clearfix"><div class="item__value">$$VALUE$$</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }else{
                list = DOMstrings.expenseList;
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">$$Description$$</div><div class="right clearfix"><div class="item__value">$$VALUE$$</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            //Ter HTML dotor orlogo zarlagagiin REPLACE ashiglaj oorchilj orgno.
            html = html.replace('%id%', item.id);
            html = html.replace('$$Description$$', item.description);
            html = html.replace('$$VALUE$$', item.value);
            //Beltgesen HTML ee DOM ruu hiij ogno.
            document.querySelector(list).insertAdjacentHTML('beforeend', html);
        }
    };
})();
//Sanhvv deer ajillah controller-----------------------------------------------
var financeController = (function() {
//Орлого-ийн байгуулагч функц---------------------------
var Income = function(id, description, value){
    this.id = id;
    this.description = description;
    this.value = value;
};
//Эарлага-ийн байгуулагч функц---------------------------
var Expense = function(id, description, value){
    this.id = id;
    this.description = description;
    this.value = value;
};
//Orlogo zarlaga tootsooloh mon totals ruu bvh nemegdehvvne hiih
var calculateTotal = function(type){
    var sum = 0;
    data.items[type].forEach(function(el){
        sum = sum + el.value;
    });

    data.totals[type] = sum;
};
//Бүх нэгдсэн датанууд----------
var data = {
    items: {
        inc: [],
        exp: []
    },
    totals: {
        inc: 0,
        exp: 0
    },
    tusuv: 0,

    huvi: 0
 };
return {
    tusuvTootsooloh: function(){
        //Niit orlogiin niilberiig tootsoolno
        calculateTotal('inc');

        //Niit zarlagiin niilberiig tootsoolno
        calculateTotal('exp');

        //Toswiig shineer tootsoolno
        data.tusuv = data.totals.inc - data.totals.exp;

        //Orlogo zaralagiin huwiig tootsoolno
        data.huvi = Math.round((data.totals.exp / data.totals.inc) * 100);
    },
    tusviigAvah: function(){
        return {
            tusuv: data.tusuv,
            huvi: data.huvi,
            totalInc: data.totals.inc,
            totalExp: data.totals.exp,
        }
    },
    //Orlogo,zarlaga aas click hiihed ustgah function.
    deleteItem: function(type, id){
            //data.items[type]--('inc' or 'exp') - aas hamaaraad ter dotroh (data.items) iin bvh id nuudig ni return eer butsaaj [ids] ogj baina.
            var ids = data.items[type].map(function(el){
                return el.id;
            });
            //ids aas - garnaas oruulsan id aaas hamaarj ter id nii hvddvgeer index iine ids-aas olj index d ogj baina.
            var index = ids.indexOf(id);
            //index buyu id ni -1 ees yalgaatai bwal ter id gaa data.items[type] aas delete hiij bna.
            if(index !== -1){
                data.items[type].splice(index, 1);
            }
    },
    addItem: function(type, desc, val){
        var item, id;
        if(data.items[type].length === 0 ) id = 1;
        else{
            id = data.items[type][data.items[type].length - 1].id + 1;
        }
        if(type === 'inc'){
            item = new Income(id, desc, val);
        }
        else{
            item = new Expense(id, desc, val)
        }
        data.items[type].push(item);

        return item;
    },
    // ireedvid ustgana 
    seeData: function(){
        return data;
    }

};
})();
//Programminn holbogch controller-----------------------------------------------------
var appController = (function(uiController, financeController) {
    var ctrlAddItem = function(){
  //1.Оруулах өгөгдлийг дэлгэцнээс олж авна
  var input = uiController.getInput();
  if(input.description !== '' && input.value !== ''){
    //2.Олж аөсан өгөгдлүүдээ санхүүгийн контроллерт датмжуулж тэнд хадгална.
    var item = financeController.addItem(input.type, input.description, input.value);

    //3.Олж авсан өгөгдлүүдээ веб дээрээ тохирох хэсэгт нь гаргана
    uiController.addListtItem(item, input.type);

    //Tailbar bolon dvngiin hesegch bichsen utgiig usgah func duudaj bna.
    uiController.clearFields();

    //4.Төсвийг тооцоолно
    financeController.tusuvTootsooloh();

    //5.Эцсийн үлдэгдэл
    var tusuv = financeController.tusviigAvah();

    //6.тооцоог дэлгэцэнд гаргана.
    uiController.tusviigUzuuleh(tusuv);
    console.log(tusuv);

      }
    };

  var setupEventListeners = function(){
    var DOM = uiController.getDOMstrings();
    document.querySelector(DOM.addBtn).addEventListener("click", function(){
        ctrlAddItem();
       });

    document.addEventListener("keypress", function(event){
           if(event.keyCode == 13 || event.which == 13)
           {
               ctrlAddItem();
           }
       });
       //Ustgah listener
    document.querySelector(DOM.containerDiv).addEventListener('click', function(event){
        var id = event.target.parentNode.parentNode.parentNode.parentNode.id;
        if(id ){
        var arr = id.split('-');
        var type = arr[0];
        var itemId = parseInt(arr[1]);

        //1.Sanhvvgiin modulias type, id ashiglaad ustgana.
        financeController.deleteItem(type, itemId);
        //2.Delgets deerees ene elementiig ustgana.
        uiController.deleteListItem(id);
        //3.Uldegdel tootsoog shinechilj haruulna.



        }
    });
  };

  return {
      init:function(){
          console.log("Application started...");
          setupEventListeners();
      }
  };
})(uiController, financeController);

appController.init();