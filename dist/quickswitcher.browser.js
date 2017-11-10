var QuickSwitcher=function(){"use strict";var defaultRun=function(str){return window.location.assign(window.location.href.replace(window.location.pathname,str))};function sortedOptions(options,value,defaultOption){var rgx=new RegExp(value,"ig");var sortedOpts=options.filter(function(opt){return rgx.test(opt.value)||rgx.test(opt.title)});if(sortedOpts.length>0)return sortedOpts;else return[defaultOption(value)]}function data(){return{isOpen:false,value:"",options:[],defaultOption:null,run:defaultRun,placeholder:"",active:null,selected:0}}function optionIsActive(index,selected){if(index===selected){return true}else return false}var methods={open:function(){if(!this.get("isOpen")){this.set({isOpen:true});document.getElementById("qs-inp").focus()}},close:function(){this.set({isOpen:false,value:"",selected:0})},run:function(opt){this.get("run").call(null,opt.value);this.close()},switchCurrentActive:function(evt){var selected=this.get("selected");var opts=this.get("sortedOptions");if(evt.key==="Enter"){if(opts&&opts[0])this.run(opts[selected]);else this.close()}else{this.set({selected:0})}},changeSelected:function(evt){var selected=this.get("selected");var opts=this.get("sortedOptions");if(evt.key==="ArrowDown"){if(selected<opts.length-1)this.set({selected:selected+1})}else if(evt.key==="ArrowUp"){if(selected>0)this.set({selected:selected-1})}else if(evt.key==="Backspace"){this.set({selected:0})}}};function oncreate(){var _this=this;if(window.key){window.key("⌘+k, ctrl+k",function(){_this.open();return false});window.onkeyup=function(e){if(e.keyCode===27){_this.close();return false}}}else{window.onkeyup=function(e){if(e.ctrlKey&&e.keyCode===75){_this.open();return false}else if(e.keyCode===27){_this.close();return false}}}}function encapsulateStyles(node){setAttribute(node,"svelte-2731589865","")}function add_css(){var style=createElement("style");style.id="svelte-2731589865-style";style.textContent="[svelte-2731589865]#qs-modal,[svelte-2731589865] #qs-modal{position:fixed;left:0;top:0;height:100%;width:100%;z-index:101}[svelte-2731589865]#qs-bg,[svelte-2731589865] #qs-bg{position:absolute;left:0px;top:0px;height:100%;width:100%;background-color:rgba(0,0,0,.7);filter:blur(5px);z-index:100}[svelte-2731589865]#qs-content-wrap,[svelte-2731589865] #qs-content-wrap{z-index:102;position:absolute;top:0px;left:0px;width:100%;height:100%;padding-top:30vh}[svelte-2731589865]#qs-content,[svelte-2731589865] #qs-content{max-width:500px;box-shadow:0 1px 10px rgba(0,0,0,.5);background:#FFF;border-radius:8px;padding:.75rem 1rem;margin:0 auto;font-family:Slack-Lato,appleLogo,sans-serif}[svelte-2731589865]#qs-jumper-help,[svelte-2731589865] #qs-jumper-help{color:#A0A0A2;font-size:.8rem;margin-bottom:8px}[svelte-2731589865]#qs-inp,[svelte-2731589865] #qs-inp{width:100%;font-size:2rem;font-family:Slack-Lato,appleLogo,sans-serif;font-weight:700;padding:1rem;border:1px solid #A0A0A2!important;border-radius:6px;box-shadow:none!important;color:#2C2D30;margin-bottom:1rem}[svelte-2731589865]#qs-options,[svelte-2731589865] #qs-options{margin-top:10px;padding-left:0px;padding-right:0px}[svelte-2731589865]#qs-options li,[svelte-2731589865] #qs-options li{text-decoration:none;outline:0;background:0 0;display:block;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;font-size:16px;line-height:30px;border-radius:6px;font-weight:700;margin:0;padding:0 .5rem 0 .75rem;position:relative;border:1px solid #fff;color:#000}[svelte-2731589865]#qs-options li.active,[svelte-2731589865] #qs-options li.active{border-color:steelblue;background-color:steelblue;color:#fff}[svelte-2731589865]#qs-options li:hover,[svelte-2731589865] #qs-options li:hover{border-color:steelblue}[svelte-2731589865]#qs-options li:hover,[svelte-2731589865] #qs-options li:hover{cursor:pointer}@media(max-width:768px){[svelte-2731589865]#qs-content-wrap,[svelte-2731589865] #qs-content-wrap{padding-top:0px}[svelte-2731589865]#qs-content,[svelte-2731589865] #qs-content{border-radius:0px}}";appendNode(style,document.head)}function create_main_fragment(state,component){var if_block_anchor;var if_block=state.isOpen&&create_if_block(state,component);return{c:function create(){if(if_block)if_block.c();if_block_anchor=createComment()},m:function mount(target,anchor){if(if_block)if_block.m(target,anchor);insertNode(if_block_anchor,target,anchor)},p:function update(changed,state){if(state.isOpen){if(if_block){if_block.p(changed,state)}else{if_block=create_if_block(state,component);if_block.c();if_block.m(if_block_anchor.parentNode,if_block_anchor)}}else if(if_block){if_block.u();if_block.d();if_block=null}},u:function unmount(){if(if_block)if_block.u();detachNode(if_block_anchor)},d:function destroy(){if(if_block)if_block.d()}}}function create_each_block(state,sortedOptions_1,option,index,component){var li,li_class_value,text_value=option.title,text;return{c:function create(){li=createElement("li");text=createText(text_value);this.h()},h:function hydrate(){li.className=li_class_value=optionIsActive(index,state.selected)?"active":"";addListener(li,"click",click_handler);li._svelte={component:component,sortedOptions_1:sortedOptions_1,index:index}},m:function mount(target,anchor){insertNode(li,target,anchor);appendNode(text,li)},p:function update(changed,state,sortedOptions_1,option,index){if(changed.selected&&li_class_value!==(li_class_value=optionIsActive(index,state.selected)?"active":"")){li.className=li_class_value}li._svelte.sortedOptions_1=sortedOptions_1;li._svelte.index=index;if(changed.sortedOptions&&text_value!==(text_value=option.title)){text.data=text_value}},u:function unmount(){detachNode(li)},d:function destroy(){removeListener(li,"click",click_handler)}}}function create_if_block(state,component){var div,div_1,text,div_2,div_3,div_4,text_9,input,input_updating=false,text_10,ul;function click_handler(event){component.close()}function input_input_handler(){input_updating=true;component.set({value:input.value});input_updating=false}function keypress_handler(event){component.switchCurrentActive(event)}function keydown_handler(event){component.changeSelected(event)}var sortedOptions_1=state.sortedOptions;var each_blocks=[];for(var i=0;i<sortedOptions_1.length;i+=1){each_blocks[i]=create_each_block(state,sortedOptions_1,sortedOptions_1[i],i,component)}return{c:function create(){div=createElement("div");div_1=createElement("div");text=createText("\n    ");div_2=createElement("div");div_3=createElement("div");div_4=createElement("div");div_4.innerHTML="<strong>up</strong>/<strong>down</strong> to navigate; <strong>enter</strong> to select; <strong>esc</strong> to dismiss";text_9=createText("\n      ");input=createElement("input");text_10=createText("\n      ");ul=createElement("ul");for(var i=0;i<each_blocks.length;i+=1){each_blocks[i].c()}this.h()},h:function hydrate(){encapsulateStyles(div);div.id="qs-modal";div_1.id="qs-bg";div_2.id="qs-content-wrap";addListener(div_2,"click",click_handler);div_3.id="qs-content";div_4.id="qs-jumper-help";setAttribute(div_4,"aria-hidden","true");input.type="text";input.autofocus="";input.id="qs-inp";input.placeholder=state.placeholder;addListener(input,"input",input_input_handler);addListener(input,"keypress",keypress_handler);addListener(input,"keydown",keydown_handler);ul.id="qs-options"},m:function mount(target,anchor){insertNode(div,target,anchor);appendNode(div_1,div);appendNode(text,div);appendNode(div_2,div);appendNode(div_3,div_2);appendNode(div_4,div_3);appendNode(text_9,div_3);appendNode(input,div_3);input.value=state.value;appendNode(text_10,div_3);appendNode(ul,div_3);for(var i=0;i<each_blocks.length;i+=1){each_blocks[i].m(ul,null)}},p:function update(changed,state){if(changed.placeholder){input.placeholder=state.placeholder}if(!input_updating){input.value=state.value}var sortedOptions_1=state.sortedOptions;if(changed.sortedOptions||changed.selected){for(var i=0;i<sortedOptions_1.length;i+=1){if(each_blocks[i]){each_blocks[i].p(changed,state,sortedOptions_1,sortedOptions_1[i],i)}else{each_blocks[i]=create_each_block(state,sortedOptions_1,sortedOptions_1[i],i,component);each_blocks[i].c();each_blocks[i].m(ul,null)}}for(;i<each_blocks.length;i+=1){each_blocks[i].u();each_blocks[i].d()}each_blocks.length=sortedOptions_1.length}},u:function unmount(){detachNode(div);for(var i=0;i<each_blocks.length;i+=1){each_blocks[i].u()}},d:function destroy(){removeListener(div_2,"click",click_handler);removeListener(input,"input",input_input_handler);removeListener(input,"keypress",keypress_handler);removeListener(input,"keydown",keydown_handler);destroyEach(each_blocks)}}}function click_handler(event){var component=this._svelte.component;var sortedOptions_1=this._svelte.sortedOptions_1,index=this._svelte.index,option=sortedOptions_1[index];component.run(option)}function QuickSwitcher(options){init(this,options);this._state=assign(data(),options.data);this._recompute({options:1,value:1,defaultOption:1},this._state);if(!document.getElementById("svelte-2731589865-style"))add_css();var _oncreate=oncreate.bind(this);if(!options._root){this._oncreate=[_oncreate]}else{this._root._oncreate.push(_oncreate)}this._fragment=create_main_fragment(this._state,this);if(options.target){this._fragment.c();this._fragment.m(options.target,options.anchor||null);callAll(this._oncreate)}}assign(QuickSwitcher.prototype,methods,{destroy:destroy,get:get,fire:fire,observe:observe,on:on,set:set,teardown:destroy,_set:_set,_mount:_mount,_unmount:_unmount});QuickSwitcher.prototype._recompute=function _recompute(changed,state){if(changed.options||changed.value||changed.defaultOption){if(differs(state.sortedOptions,state.sortedOptions=sortedOptions(state.options,state.value,state.defaultOption)))changed.sortedOptions=true}};function setAttribute(node,attribute,value){node.setAttribute(attribute,value)}function createElement(name){return document.createElement(name)}function appendNode(node,target){target.appendChild(node)}function createComment(){return document.createComment("")}function insertNode(node,target,anchor){target.insertBefore(node,anchor)}function detachNode(node){node.parentNode.removeChild(node)}function createText(data){return document.createTextNode(data)}function addListener(node,event,handler){node.addEventListener(event,handler,false)}function removeListener(node,event,handler){node.removeEventListener(event,handler,false)}function destroyEach(iterations){for(var i=0;i<iterations.length;i+=1){if(iterations[i])iterations[i].d()}}function init(component,options){component.options=options;component._observers={pre:blankObject(),post:blankObject()};component._handlers=blankObject();component._root=options._root||component;component._bind=options._bind}function assign(target){var k,source,i=1,len=arguments.length;for(;i<len;i++){source=arguments[i];for(k in source)target[k]=source[k]}return target}function callAll(fns){while(fns&&fns.length)fns.pop()()}function destroy(detach){this.destroy=noop;this.fire("destroy");this.set=this.get=noop;if(detach!==false)this._fragment.u();this._fragment.d();this._fragment=this._state=null}function get(key){return key?this._state[key]:this._state}function fire(eventName,data){var handlers=eventName in this._handlers&&this._handlers[eventName].slice();if(!handlers)return;for(var i=0;i<handlers.length;i+=1){handlers[i].call(this,data)}}function observe(key,callback,options){var group=options&&options.defer?this._observers.post:this._observers.pre;(group[key]||(group[key]=[])).push(callback);if(!options||options.init!==false){callback.__calling=true;callback.call(this,this._state[key]);callback.__calling=false}return{cancel:function(){var index=group[key].indexOf(callback);if(~index)group[key].splice(index,1)}}}function on(eventName,handler){if(eventName==="teardown")return this.on("destroy",handler);var handlers=this._handlers[eventName]||(this._handlers[eventName]=[]);handlers.push(handler);return{cancel:function(){var index=handlers.indexOf(handler);if(~index)handlers.splice(index,1)}}}function set(newState){this._set(assign({},newState));if(this._root._lock)return;this._root._lock=true;callAll(this._root._beforecreate);callAll(this._root._oncreate);callAll(this._root._aftercreate);this._root._lock=false}function _set(newState){var oldState=this._state,changed={},dirty=false;for(var key in newState){if(differs(newState[key],oldState[key]))changed[key]=dirty=true}if(!dirty)return;this._state=assign({},oldState,newState);this._recompute(changed,this._state);if(this._bind)this._bind(changed,this._state);dispatchObservers(this,this._observers.pre,changed,this._state,oldState);this._fragment.p(changed,this._state);dispatchObservers(this,this._observers.post,changed,this._state,oldState)}function _mount(target,anchor){this._fragment.m(target,anchor)}function _unmount(){this._fragment.u()}function differs(a,b){return a!==b||(a&&typeof a==="object"||typeof a==="function")}function blankObject(){return Object.create(null)}function noop(){}function dispatchObservers(component,group,changed,newState,oldState){for(var key in group){if(!changed[key])continue;var newValue=newState[key];var oldValue=oldState[key];var callbacks=group[key];if(!callbacks)continue;for(var i=0;i<callbacks.length;i+=1){var callback=callbacks[i];if(callback.__calling)continue;callback.__calling=true;callback.call(component,newValue,oldValue);callback.__calling=false}}}return QuickSwitcher}();
