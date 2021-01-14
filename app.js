//Delgetstei ajillah controller----------------------------------------------
var uiController = (function() {
    //Private function uud bolon object_________

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
        containerDiv: '.container',
        expensePercentageLabel: '.item__percentage',
        dateLabel: '.budget__title--month1'

    };
    var nodeListForeach = function(list, callback){
        for(var i = 0; i < list.length;i++){
            callback(list[i], i);
        }
    };

    var formatMoney = function(too, type){
    too = '' + too;   
        
    var x = too.split("").reverse().join("");
    var y = '';
    var count = 1;

    for(var i=0; i < x.length; i++)
    {
    y = y + x[i];

    if( count%3 === 0 ) y = y + ',';
    count ++;
    }

    var z = y.split("").reverse().join("");

    if(z[0] === ',') z = z.substr(1, z.length - 1);

    if(type === 'inc') z = '+ ' + z;
    else z = '- ' + z;

    return z;
    };
    //Public Service vvd buyu utga butsaadag__________
    return {
        displayDate: function(){
            var unuudur = new Date();

            document.querySelector(DOMstrings.dateLabel).textContent = unuudur.getMonth() + 1 + '-р сарын';
        },
        getInput: function() {
            return {
            type: document.querySelector(DOMstrings.inputType).value,
            description: document.querySelector(DOMstrings.inputDescription).value,
            value: parseInt(document.querySelector(DOMstrings.inputValue).value)
            };
        },

        displayPercentage: function(allPercentages){
            //Zaralagiin Nodelist iig oloh
            var elements = document.querySelectorAll(DOMstrings.expensePercentageLabel);
            //Element bolgonii huwid zarlagiin huwiig massiwaas awch shiwj oruulah
            nodeListForeach(elements, function(el, index){
                el.textContent = allPercentages[index];
            });
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

        tusviigUzuuleh: function(tusuv, type){
            var type;
            if(tusuv.tusuv > 0) type = 'inc';
            else type = 'exp';

            document.querySelector(DOMstrings.tusuvLabel).textContent = formatMoney(tusuv.tusuv, type);
            document.querySelector(DOMstrings.incomeLabel).textContent = formatMoney(tusuv.totalInc, 'inc');
            document.querySelector(DOMstrings.expenseLabel).textContent = formatMoney(tusuv.totalExp, 'exp');
            if(tusuv.huvi !== 0){
                document.querySelector(DOMstrings.percentageLabel).textContent = tusuv.huvi + '%';
            }else{
                document.querySelector(DOMstrings.percentageLabel).textContent = tusuv.huvi;
            }
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
            html = html.replace('$$VALUE$$', formatMoney(item.value, type));
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
    this.percentage = -1;
};
Expense.prototype.calcPercentage = function(totalIncome){
    if(totalIncome > 0)
    this.percentage = Math.round((this.value / totalIncome) * 100);
    else this.percentage = 0;
};
Expense.prototype.getPercentage = function(){
   return this.percentage; 

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
        if(data.totals.inc > 0)
        data.huvi = Math.round((data.totals.exp / data.totals.inc) * 100);
        else data.huvi = 0;
    },
    calculatePercentages: function(){
        data.items.exp.forEach(function(el){
            el.calcPercentage(data.totals.inc);

        });
    },
    getPercentages: function(){
        var allPercentages = data.items.exp.map(function(el){
            return el.getPercentage();
        });
        return allPercentages;
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
    //Tosviig shineer tootsoolood delgetsend vzvvlne.//---------------->>>>
    updateTusuv();
      }
    };
    var updateTusuv = function(){  //<<<<-------------
    //4.Төсвийг тооцоолно
    financeController.tusuvTootsooloh();

    //5.Эцсийн үлдэгдэл
    var tusuv = financeController.tusviigAvah();

    //6.тооцоог дэлгэцэнд гаргана.
    uiController.tusviigUzuuleh(tusuv);

    //7.Elementvvdiin huwiig tootsoolno.
    financeController.calculatePercentages();

    //8.Elementvvdiin huviig hvleej awna.
    var allPercentages = financeController.getPercentages();

    //9.Edgeer huviig delgetsend gargana.
    uiController.displayPercentage(allPercentages);

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
        //Tosviig shineer tootsoolood delgetsend vzvvlne.//---------------->>>>
        updateTusuv();
    }
 });
  };

  return {
      init:function(){
          console.log("Application started...");
          uiController.displayDate();
          uiController.tusviigUzuuleh({
              tusuv: 0,
              huvi: 0,
              totalInc: 0,
              totalExp: 0
          });
          setupEventListeners();
      }
  };
})(uiController, financeController);

appController.init();