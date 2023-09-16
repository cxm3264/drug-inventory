(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0cfeff"],{"669b":function(t,e,i){"use strict";i.r(e);var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"page-container"},[i("ul",{staticClass:"drug-list"},t._l(t.drugList,(function(e){return i("li",{key:e.id,staticClass:"drug-item",class:[e.disabled?"drug-item--disabled":""],style:{paddingBottom:"simple"===t.listMode?"10px":"0px"},on:{click:function(i){return t.clickEditItem(e)}}},[i("div",{staticClass:"drug-dosage"},[t._v("每天"+t._s(e.dosage)+"片")]),i("div",{staticClass:"drug-remind",class:[e.remainingDays<=7?"danger":"success"]},[i("i",{staticClass:"el-icon-warning"}),t._v(" 剩余可用天数: "+t._s(e.remainingDays)+"天 ")]),i("div",{staticClass:"drug-info"},[i("div",{staticClass:"drug-name"},[t._v(" "+t._s(e.name)+" "),e.mg?i("el-tag",{attrs:{type:"primary",effect:"plain"}},[t._v(" "+t._s(e.mg)+"mg ")]):t._e()],1),i("div",{directives:[{name:"show",rawName:"v-show",value:"detail"===t.listMode,expression:"listMode === 'detail'"}]},[i("div",{staticClass:"drug-inventory"},[t._v(" 规格: "+t._s(e.size)+"片/盒 ")]),i("div",{staticClass:"drug-inventory"},[t._v(" 余量: "+t._s(e.inventory)+"片 ")]),i("div",{},[t._v(" 月用量: "+t._s(t.replenishmentProposal(e))+" ")]),i("div",{staticClass:"memo"},[t._v(" 创建日期: "+t._s(e.cratedTime)+" ")]),i("div",{staticClass:"memo"},[t._v(" 更新日期: "+t._s(e.modifyTime||"-")+" ")])])]),i("div",{directives:[{name:"show",rawName:"v-show",value:"detail"===t.listMode,expression:"listMode === 'detail'"}],staticClass:"button-container"},[i("div",{staticClass:"left",on:{click:function(i){return i.stopPropagation(),t.clickEditItem(e)}}},[i("svg-icon",{attrs:{"icon-class":"edit"}}),t._v("编辑 ")],1),i("div",{staticClass:"right",on:{click:function(i){return i.stopPropagation(),t.clickRemoveItem(e)}}},[i("svg-icon",{attrs:{"icon-class":"remove"}}),t._v("删除 ")],1)])])})),0),i("div",{staticClass:"add-button",on:{click:t.clickAddItem}},[i("i",{staticClass:"el-icon-plus"})]),i("div",{staticClass:"toggle-list",on:{click:t.clickToggleListMode}},[i("svg-icon",{attrs:{"icon-class":t.listMode}})],1),i("div",{staticClass:"update-button",on:{click:t.clickUpdateItems}},[i("svg-icon",{attrs:{"icon-class":"update"}})],1),i("edit-dialog",{attrs:{visible:t.isShowEditDialog,item:t.currentEditItem},on:{"update:visible":function(e){t.isShowEditDialog=e},"update:item":function(e){t.currentEditItem=e}}})],1)},a=[],o=i("5530"),l=(i("b680"),i("b0c0"),i("d81d"),i("d3b7"),i("0644")),n=i.n(l),c=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-dialog",{attrs:{"custom-class":"drug-dialog",title:t.title,visible:t.localVisible,"close-on-click-modal":!1,width:"80vw","append-to-body":""},on:{"update:visible":function(e){t.localVisible=e}}},[i("el-form",{ref:"form",attrs:{"label-position":"top",model:t.localItem,"label-width":"80px"}},[i("el-form-item",{attrs:{required:"",label:"药品名称"}},[i("el-input",{attrs:{placeholder:""},model:{value:t.localItem.name,callback:function(e){t.$set(t.localItem,"name",e)},expression:"localItem.name"}})],1),i("el-form-item",{attrs:{label:"mg"}},[i("el-input-number",{attrs:{min:0,"controls-position":"right"},model:{value:t.localItem.mg,callback:function(e){t.$set(t.localItem,"mg",e)},expression:"localItem.mg"}})],1),i("el-form-item",{attrs:{required:"",label:"规格(片/盒)"}},[i("el-input-number",{attrs:{min:0,"controls-position":"right"},model:{value:t.localItem.size,callback:function(e){t.$set(t.localItem,"size",e)},expression:"localItem.size"}})],1),i("el-form-item",{attrs:{required:"",label:"用量(片/天)"}},[i("el-input-number",{attrs:{min:0,"controls-position":"right"},model:{value:t.localItem.dosage,callback:function(e){t.$set(t.localItem,"dosage",e)},expression:"localItem.dosage"}})],1),i("el-form-item",{attrs:{required:"",label:"余量"}},[i("el-input-number",{attrs:{min:0,"controls-position":"right"},model:{value:t.localItem.inventory,callback:function(e){t.$set(t.localItem,"inventory",e)},expression:"localItem.inventory"}})],1),i("el-form-item",{attrs:{required:"",label:"状态"}},[i("el-radio-group",{model:{value:t.localItem.disabled,callback:function(e){t.$set(t.localItem,"disabled",e)},expression:"localItem.disabled"}},[i("el-radio",{attrs:{label:!1}},[t._v("启用")]),i("el-radio",{attrs:{label:!0}},[t._v("禁用")])],1)],1)],1),i("span",{attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(e){t.localVisible=!1}}},[t._v("取 消")]),i("el-button",{attrs:{type:"primary"},on:{click:t.clickSave}},[t._v("确 定")])],1)],1)},r=[],d=i("ed08"),u=i("801b"),m={name:"EditDialog",props:{visible:{type:Boolean,required:!0},item:{type:Object,required:!0}},data:function(){return{drug:u["a"].getInstance()}},computed:{localVisible:{get:function(){return this.visible},set:function(t){this.$emit("update:visible",t)}},localItem:{get:function(){return this.item},set:function(t){this.$emit("update:item",t)}},isEdit:function(){return this.item.id},title:function(){return this.isEdit?"编辑":"新增"}},methods:{validateForm:function(){var t=this.localItem,e=t.name,i=t.size,s=t.dosage;return e?i?s?{status:"success"}:{status:"error",message:"请填写用量"}:{status:"error",message:"请填写药品规格"}:{status:"error",message:"请填写药品名称"}},clickSave:function(){var t=this.validateForm(),e=t.status,i=t.message;"success"===e?(this.isEdit?this.updateItem():this.addItem(),this.$notify.success(this.isEdit?"更新成功":"添加成功"),this.localVisible=!1):this.$notify.error(i)},addItem:function(){this.drug.addDrugItem(Object(o["a"])({id:Object(d["b"])(),cratedTime:Object(d["a"])(),modifyTime:void 0},this.localItem))},updateItem:function(){this.drug.updateDrugItem(Object(o["a"])({modifyTime:Object(d["a"])()},this.localItem))}}},g=m,v=i("2877"),f=Object(v["a"])(g,c,r,!1,null,"2e819008",null),p=f.exports,b={name:"DrugList",components:{editDialog:p},data:function(){return{listMode:"simple",drug:u["a"].getInstance(),isShowEditDialog:!1,currentEditItem:{},warningDay:7}},computed:{drugList:function(){return this.drug.list},replenishmentProposal:function(){return function(t){var e=t.dosage,i=t.size;return"".concat((30*e/i).toFixed(1),"盒/月")}}},methods:{clickAddItem:function(){this.currentEditItem={name:"",size:void 0,dosage:void 0,inventory:void 0,mg:void 0,disabled:!1},this.isShowEditDialog=!0},clickEditItem:function(t){console.log("cloneDeep(item)",n()(t)),this.currentEditItem=n()(t),this.isShowEditDialog=!0},clickRemoveItem:function(t){var e=this;this.$confirm("确认删除 ".concat(t.name,"?"),"提示",{confirmButtonText:"删除",cancelButtonText:"取消",type:"warning"}).then((function(){e.drug.removeDrugItem(t.id),e.$notify.success("删除成功")})).catch((function(){}))},clickToggleListMode:function(){this.listMode="simple"===this.listMode?"detail":"simple"},clickUpdateItems:function(){var t=this;this.$confirm("是否更新所有药品, 库存将减少一周的量?","提示",{confirmButtonText:"更新",cancelButtonText:"取消",type:"warning"}).then((function(){var e=[],i=t.drugList.map((function(t){if(t.disabled)return t;var i=t.dosage,s=t.inventory-7*i;return s<0&&e.push(t.name),Object(o["a"])(Object(o["a"])({},t),{},{inventory:s,modifyTime:Object(d["a"])()})}));t.drug.setList(i),t.$notify.success("更新成功"),e.forEach((function(e){setTimeout((function(){t.$notify.warning("药品[".concat(e,"] 库存不足"))}),0)}))})).catch((function(){}))}}},h=b,I=Object(v["a"])(h,s,a,!1,null,"13d222f7",null);e["default"]=I.exports}}]);