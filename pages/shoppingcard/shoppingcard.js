// pages/shoppingcard.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    alllist:{
      type:Array,
      value:""
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    allSelect:true,
    saveHidden: true
  },


  /**
  * 页面加载完成执行
  */
  lifetimes:{
    ready(){
      this.setGoodsList(this.getSaveHide(),this.totalPrice(),this.allSelect(),this.data.alllist);
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {

  saveTap: function() {
      var list = this.data.alllist;
      for (var i = 0; i < list.length; i++) {
        var curItem = list[i];
        curItem.active = true;
      }
      this.setGoodsList(!this.getSaveHide(), this.totalPrice(), this.allSelect(), list);
  },
  deleteSelected: function() {
    var list = this.data.alllist;

    list = list.filter(function(curGoods) {
      return !curGoods.active;
    });
    this.setGoodsList(this.getSaveHide(), this.totalPrice(), this.allSelect(),  list);
  },

  editTap: function() {
      var list = this.data.alllist;
      for (var i = 0; i < list.length; i++) {
        var curItem = list[i];
        curItem.active = false;
      }
      this.setGoodsList(!this.getSaveHide(), this.totalPrice(), this.allSelect(), list);
  },

  getSaveHide: function() {
    var saveHidden = this.data.saveHidden;
    return saveHidden;
  },

  totalPrice: function() {
      var list = this.data.alllist;
      var total = 0;
      for (var i = 0; i < list.length; i++) {
        var curItem = list[i];
        if (curItem.active) {
          total += parseFloat(curItem.price) * curItem.number;
        }
      }
      total = parseFloat(total.toFixed(2)); //js浮点计算bug，取两位小数精度
      return total;
  },

  allSelect: function() {
    var list = this.data.alllist;
    var allSelect = false;
    for (var i = 0; i < list.length; i++) {
      var curItem = list[i];
      if (curItem.active) {
        allSelect = true;
      } else {
        allSelect = false;
        break;
      }
    }
    return allSelect;
  },

  bindAllSelect: function() {
    var currentAllSelect = this.data.allSelect;
    var list = this.data.alllist;
    if (currentAllSelect) {
      for (var i = 0; i < list.length; i++) {
        var curItem = list[i];
        curItem.active = false;
      }
    } else {
      for (var i = 0; i < list.length; i++) {
        var curItem = list[i];
        curItem.active = true;
      }
    }
    this.setGoodsList(this.getSaveHide(), this.totalPrice(), !currentAllSelect,list);
  },

  selectTap: function(e) {
    var index = e.currentTarget.dataset.index;
    var list = this.data.alllist;
    if (index !== "" && index != null) {
      list[parseInt(index)].active = !list[parseInt(index)].active;
      this.setGoodsList(this.getSaveHide(),this.totalPrice(),this.allSelect(),list);
    }
  },

 

  setGoodsList(saveHidden,total,allSelect,list){
      this.setData({
        saveHidden: saveHidden,
        totalPrice:total,
        allSelect:allSelect,
        alllist:list
      })
  },

  jianBtnTap: function(e) {
    var index = e.currentTarget.dataset.index;
    var list = this.data.alllist;
    if (index !== "" && index != null) {
      if (list[parseInt(index)].number > 1) {
        list[parseInt(index)].number--;
        this.setGoodsList( this.getSaveHide(),this.totalPrice(), this.allSelect(),  list);
      }
    }
  },

  jiaBtnTap: function(e) {
    var that = this
    var index = e.currentTarget.dataset.index;
    var list = that.data.alllist;
    if (index !== "" && index != null) {
        list[parseInt(index)].number++;
        this.setGoodsList(this.getSaveHide(), this.totalPrice(), this.allSelect(),  list);   
    }
  },
  }
})
