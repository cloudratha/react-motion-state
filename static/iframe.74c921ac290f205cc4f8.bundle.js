(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{553:function(e){e.exports={a:"0.0.1"}},554:function(e,t,n){n(169),n(555),e.exports=n(556)},556:function(e,t,n){"use strict";n.r(t),function(e){var t=n(47),a=n(552),i=n(553);n(570);Object(t.addDecorator)(Object(a.withOptions)({showDownPanel:!1,name:"react-motion-state v".concat(i.a),url:"https://github.com/cloudratha/react-motion-state",sidebarAnimations:!0,showAddonPanel:!0})),Object(t.configure)(function(){n(575),n(589),n(590),n(591)},e)}.call(this,n(99)(e))},570:function(e,t,n){var a=n(571);"string"==typeof a&&(a=[[e.i,a,""]]);var i={hmr:!0,transform:void 0,insertInto:void 0};n(573)(a,i);a.locals&&(e.exports=a.locals)},571:function(e,t,n){(e.exports=n(572)(!1)).push([e.i,"html,\nbody,\n#root {\n  margin: 0;\n  padding: 0;\n  height: 100%;\n}\n\n.Emoji {\n  position: absolute;\n  top: 45%;\n  left: 0;\n  font-size: 32px;\n  width: 60px;\n  height: 60px;\n  border: 2px solid black;\n  border-radius: 50%;\n}\n\n.Emoji__eye {\n  font-size: 64px;\n  margin-left: 10px;\n  line-height: 0;\n}\n\n.Emoji__mouth {\n  -webkit-transform: rotate(90deg);\n          transform: rotate(90deg);\n  margin-top: 5px;\n  width: 64px;\n  text-align: center;\n  line-height: 0;\n}\n\n.Reveal {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n}\n\n.Reveal__item {\n  position: relative;\n  width: 300px;\n  height: 100px;\n  border: 2px solid gray;\n  margin-bottom: 20px;\n  overflow: hidden;\n}\n\n.Reveal__item > div {\n  position: absolute;\n  top: 10%;\n  left: 0;\n  opacity: 0;\n  width: 100%;\n  text-align: center;\n}\n\n.Directional {\n  display: flex;\n  flex: 0 0 100%;\n  min-height: 100%;\n  justify-content: center;\n  align-items: center;\n}\n\n.Directional__button {\n  border: none;\n  outline: 0;\n  position: absolute;\n  min-width: 80px;\n  min-height: 40px;\n  color: white;\n  background: purple;\n  text-align: center;\n  padding: 10px;\n  vertical-align: middle;\n  transition: background-color 0.3s;\n}\n\n.Conditional {\n  position: absolute;\n  padding: 20px;\n  background: gray;\n  color: white;\n  text-align: center;\n  overflow: hidden;\n}",""])},575:function(e,t,n){"use strict";n.r(t),function(e){var t=n(0),a=n.n(t),i=n(47),o=n(15),r=n(23),l=n(69);Object(i.storiesOf)("MotionState",e).addDecorator(r.withKnobs).add("Emoji",function(){return a.a.createElement(l.c,{defaultStyle:{left:0,top:0},style:{left:Object(o.spring)(Object(r.number)("Left",50)),top:Object(o.spring)(Object(r.number)("Top",50))}},function(e,t){return a.a.createElement("div",{className:"Emoji",style:{left:"".concat(e.left,"%"),top:"".concat(e.top,"%")}},a.a.createElement("span",{className:"Emoji__eye"},"."),a.a.createElement("span",{className:"Emoji__eye"},"."),a.a.createElement("div",{className:"Emoji__mouth"},t?")":"("))})})}.call(this,n(99)(e))},589:function(e,t,n){"use strict";n.r(t),function(e){var t=n(0),a=n.n(t),i=n(47),o=n(23),r=n(15),l=n(69);Object(i.storiesOf)("TransitionMotionState",e).addDecorator(o.withKnobs).add("Reveal",function(){var e=Object(o.object)("WillEnter",{x:0}),t=Object(o.object)("WillLeave",{x:Object(r.spring)(0)});return a.a.createElement(l.d,{defaultStyle:Object(o.object)("DefaultStyle",[{key:"one",style:{x:0}},{key:"two",style:{x:0}}]),styles:Object(o.object)("Styles",[{key:"one",data:{text:"Item 1"},style:{x:Object(r.spring)(50)}},{key:"two",data:{text:"Item 2"},style:{x:Object(r.spring)(50)}}]),willEnter:function(){return e},willLeave:function(){return t}},function(e){return a.a.createElement("ul",{className:"Reveal"},e.map(function(e){return a.a.createElement("li",{key:e.key,className:"Reveal__item",style:{transform:"translateX(".concat(e.style.x,"vw)")}},e.data.transition)}))})})}.call(this,n(99)(e))},590:function(e,t,n){"use strict";n.r(t),function(e){var t=n(0),a=n.n(t),i=n(47),o=n(15),r=n(23),l=n(69);Object(i.storiesOf)("DirectionalMotionState",e).addDecorator(r.withKnobs).add("Button State",function(){var e=Object(r.select)("Direction",{open:"open",close:"close"},"close");return a.a.createElement("div",{className:"Directional"},a.a.createElement(l.b,{states:{close:{width:Object(o.spring)(5),height:Object(o.spring)(5),borderRadius:Object(o.spring)(50)},open:{width:Object(o.spring)(100),height:Object(o.spring)(100),borderRadius:Object(o.spring)(0)}},direction:e},function(t,n){return a.a.createElement("button",{className:"Directional__button",style:{width:"".concat(t.width,"%"),height:"".concat(t.height,"%"),borderRadius:t.borderRadius,backgroundColor:n?"green":"purple"}},n&&"open"===e&&"entering",n&&"close"===e&&"exiting",!n&&"open"===e&&"entered",!n&&"close"===e&&"exited")}))})}.call(this,n(99)(e))},591:function(e,t,n){"use strict";n.r(t),function(e){var t=n(0),a=n.n(t),i=n(47),o=n(15),r=n(23),l=n(69);Object(i.storiesOf)("ConditionalMotionState",e).addDecorator(r.withKnobs).add("Toast",function(){var e=Object(r.boolean)("In",!0);return a.a.createElement(l.a,{in:e,defaultStyle:{bottom:0,left:50,width:50,x:-50},onEnter:{width:Object(o.spring)(300),bottom:Object(o.spring)(50),left:Object(o.spring)(50),x:Object(o.spring)(-50)},onExit:{left:Object(o.spring)(0),width:Object(o.spring)(50),bottom:Object(o.spring)(50),x:Object(o.spring)(0)},unmountOnExit:Object(r.boolean)("UnmountOnExit",!1)},function(t,n){return a.a.createElement("div",{className:"Conditional",style:{bottom:"".concat(t.bottom,"%"),left:"".concat(t.left,"%"),width:t.width,transform:"translateX(".concat(t.x,"%)")}},n&&e&&"entering",n&&!e&&"exiting",!n&&e&&"entered",!n&&!e&&"exited")})})}.call(this,n(99)(e))},69:function(e,t,n){"use strict";var a=n(4),i=n.n(a),o=n(6),r=n.n(o),l=n(10),s=n.n(l),u=n(11),c=n.n(u),d=n(12),p=n.n(d),m=n(7),f=n.n(m),y=n(0),h=n.n(y),b=n(1),v=n.n(b),O=n(15),S={defaultStyle:v.a.objectOf(v.a.number),style:v.a.objectOf(v.a.oneOfType([v.a.number,v.a.object])).isRequired,children:v.a.func.isRequired,onRest:v.a.func},g=function(e){function t(e){var n;return i()(this,t),(n=s()(this,c()(t).call(this,e))).state={animating:!1},n.hasRested=!0,n.interpolateChild=n.interpolateChild.bind(f()(f()(n))),n.onRest=n.onRest.bind(f()(f()(n))),n}return p()(t,e),r()(t,[{key:"interpolateChild",value:function(e){return this.hasRested||this.state.animating?this.hasRested=!1:this.setState({animating:!0}),this.props.children(e,this.state.animating)}},{key:"onRest",value:function(){this.hasRested=!0,this.state.animating&&this.setState({animating:!1}),this.props.onRest&&this.props.onRest()}},{key:"render",value:function(){return h.a.createElement(O.Motion,{defaultStyle:this.props.defaultStyle,style:this.props.style,onRest:this.onRest},this.interpolateChild)}}]),t}(h.a.Component);g.propTypes=S,g.defaultProps={defaultStyle:null,onRest:null};var j=g;g.__docgenInfo={description:"",methods:[{name:"interpolateChild",docblock:null,modifiers:[],params:[{name:"style",type:null}],returns:null},{name:"onRest",docblock:null,modifiers:[],params:[],returns:null}],displayName:"MotionState",props:{defaultStyle:{defaultValue:{value:"null",computed:!1},type:{name:"objectOf",value:{name:"number"}},required:!1,description:""},onRest:{defaultValue:{value:"null",computed:!1},type:{name:"func"},required:!1,description:""},style:{type:{name:"objectOf",value:{name:"union",value:[{name:"number"},{name:"object"}]}},required:!0,description:""},children:{type:{name:"func"},required:!0,description:""}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/MotionState.js"]={name:"MotionState",docgenInfo:g.__docgenInfo,path:"src/MotionState.js"});var E=n(14),R=n.n(E),w=n(9),x=n.n(w),k=n(96),_=n.n(k),q={defaultStyles:v.a.arrayOf(v.a.shape({key:v.a.string.isRequired,data:v.a.any,style:v.a.objectOf(v.a.number).isRequired})),styles:v.a.oneOfType([v.a.func,v.a.arrayOf(v.a.shape({key:v.a.string.isRequired,data:v.a.any,style:v.a.objectOf(v.a.oneOfType([v.a.number,v.a.object])).isRequired}))]).isRequired,children:v.a.func.isRequired,willEnter:v.a.func,willLeave:v.a.func,didLeave:v.a.func},T=function(e){function t(e){var n;i()(this,t),n=s()(this,c()(t).call(this,e)),x()(f()(f()(n)),"willEnter",function(e){var t=n.props.willEnter?"enter":"enter-done";return n.setState(x()({},e.key,t)),n.props.willEnter?n.props.willEnter(e):e.style}),x()(f()(f()(n)),"willLeave",function(e){var t=n.props.willLeave?"exit":"exit-done";return n.state[e.key]!==t&&n.setState(x()({},e.key,t)),n.props.willLeave?n.props.willLeave(e):e.style}),x()(f()(f()(n)),"getState",function(e){return n.styleRafs[e.key]&&_.a.cancel(n.styleRafs[e.key]),n.state[e.key]&&-1===n.state[e.key].indexOf("done")&&n.checkAnimationDone(e.key),n.state[e.key]}),x()(f()(f()(n)),"interpolateStyles",function(e){var t=e.map(function(e){return R()({},e,{data:R()({},e.data,{transition:n.getState(e)})})});return n.props.children(t)});var a="function"==typeof n.props.styles?n.props.styles(n.props.defaultStyles):n.props.styles;return n.state=a.reduce(function(e,t){return e[t.key]="initial",e},{}),n.styleRafs={},n}return p()(t,e),r()(t,[{key:"componentWillUnmount",value:function(){var e=this;Object.keys(this.styleRafs).forEach(function(t){return _.a.cancel(e.styleRafs[t])})}},{key:"checkAnimationDone",value:function(e){var t=this,n=1<arguments.length&&void 0!==arguments[1]?arguments[1]:0;this.styleRafs[e]=_()(function(){2<=n?t.setState(x()({},e,"".concat(t.state[e],"-done"))):t.checkAnimationDone(e,n+1)})}},{key:"render",value:function(){return h.a.createElement(O.TransitionMotion,{defaultStyles:this.props.defaultStyles,styles:this.props.styles,willEnter:this.willEnter,willLeave:this.willLeave,didLeave:this.props.didLeave},this.interpolateStyles)}}]),t}(h.a.Component);T.propTypes=q,T.defaultProps={defaultStyles:null,willEnter:function(){},willLeave:function(){},didLeave:function(){}};var C=T;T.__docgenInfo={description:"",methods:[{name:"checkAnimationDone",docblock:null,modifiers:[],params:[{name:"key",type:null},{name:"count",type:null}],returns:null},{name:"willEnter",docblock:null,modifiers:[],params:[{name:"config",type:null}],returns:null},{name:"willLeave",docblock:null,modifiers:[],params:[{name:"config",type:null}],returns:null},{name:"getState",docblock:null,modifiers:[],params:[{name:"config",type:null}],returns:null},{name:"interpolateStyles",docblock:null,modifiers:[],params:[{name:"styles",type:null}],returns:null}],displayName:"TransitionMotionState",props:{defaultStyles:{defaultValue:{value:"null",computed:!1},type:{name:"arrayOf",value:{name:"shape",value:{key:{name:"string",required:!0},data:{name:"any",required:!1},style:{name:"objectOf",value:{name:"number"},required:!0}}}},required:!1,description:""},willEnter:{defaultValue:{value:"() => { }",computed:!1},type:{name:"func"},required:!1,description:""},willLeave:{defaultValue:{value:"() => { }",computed:!1},type:{name:"func"},required:!1,description:""},didLeave:{defaultValue:{value:"() => { }",computed:!1},type:{name:"func"},required:!1,description:""},styles:{type:{name:"union",value:[{name:"func"},{name:"arrayOf",value:{name:"shape",value:{key:{name:"string",required:!0},data:{name:"any",required:!1},style:{name:"objectOf",value:{name:"union",value:[{name:"number"},{name:"object"}]},required:!0}}}}]},required:!0,description:""},children:{type:{name:"func"},required:!0,description:""}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/TransitionMotionState.js"]={name:"TransitionMotionState",docgenInfo:T.__docgenInfo,path:"src/TransitionMotionState.js"});var L={defaultStyle:v.a.objectOf(v.a.number),states:v.a.objectOf(v.a.objectOf(v.a.oneOfType([v.a.number,v.a.object]))).isRequired,children:v.a.func.isRequired,onRest:v.a.func},D=function(e){function t(e){var n;return i()(this,t),n=s()(this,c()(t).call(this,e)),x()(f()(f()(n)),"getStyle",function(){return n.props.states[n.state.direction]}),n.state={direction:n.props.direction},n}return p()(t,e),r()(t,[{key:"componentDidUpdate",value:function(){this.state.direction!==this.props.direction&&this.setState({direction:this.props.direction})}},{key:"render",value:function(){return h.a.createElement(j,{defaultStyle:this.props.defaultStyle,style:this.getStyle(),onRest:this.props.onRest},this.props.children)}}]),t}(h.a.Component);D.propTypes=L,D.defaultProps={defaultStyle:null,onRest:null};var A=D;D.__docgenInfo={description:"",methods:[{name:"getStyle",docblock:null,modifiers:[],params:[],returns:null}],displayName:"DirectionalStateMotion",props:{defaultStyle:{defaultValue:{value:"null",computed:!1},type:{name:"objectOf",value:{name:"number"}},required:!1,description:""},onRest:{defaultValue:{value:"null",computed:!1},type:{name:"func"},required:!1,description:""},states:{type:{name:"objectOf",value:{name:"objectOf",value:{name:"union",value:[{name:"number"},{name:"object"}]}}},required:!0,description:""},children:{type:{name:"func"},required:!0,description:""}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/DirectionalMotionState.js"]={name:"DirectionalStateMotion",docgenInfo:D.__docgenInfo,path:"src/DirectionalMotionState.js"});var M={in:v.a.bool,unmountOnExit:v.a.bool,defaultStyle:v.a.objectOf(v.a.number),onEnter:v.a.objectOf(v.a.oneOfType([v.a.number,v.a.object])).isRequired,onExit:v.a.objectOf(v.a.oneOfType([v.a.number,v.a.object])).isRequired,children:v.a.func.isRequired,onRest:v.a.func},I=function(e){function t(e){var n;return i()(this,t),n=s()(this,c()(t).call(this,e)),x()(f()(f()(n)),"maybeUnmount",function(){!n.state.in&&n.props.unmountOnExit&&n.setState({mount:!1})}),n.state={in:n.props.in,mount:n.props.in},n}return p()(t,e),r()(t,[{key:"componentDidUpdate",value:function(e){this.props.in!==e.in&&(this.setState({in:this.props.in}),this.props.in&&!this.state.mount&&this.setState({mount:!0}))}},{key:"render",value:function(){return h.a.createElement(h.a.Fragment,null,this.state.mount&&h.a.createElement(A,{defaultStyle:this.props.defaultStyle,states:{in:this.props.onEnter,out:this.props.onExit},direction:this.state.in?"in":"out",onRest:this.maybeUnmount},this.props.children))}}]),t}(h.a.Component);I.propTypes=M,I.defaultProps={in:!1,unmountOnExit:!1,defaultStyle:null,onRest:null};var N=I;I.__docgenInfo={description:"",methods:[{name:"maybeUnmount",docblock:null,modifiers:[],params:[],returns:null}],displayName:"ConditionalMotionState",props:{in:{defaultValue:{value:"false",computed:!1},type:{name:"bool"},required:!1,description:""},unmountOnExit:{defaultValue:{value:"false",computed:!1},type:{name:"bool"},required:!1,description:""},defaultStyle:{defaultValue:{value:"null",computed:!1},type:{name:"objectOf",value:{name:"number"}},required:!1,description:""},onRest:{defaultValue:{value:"null",computed:!1},type:{name:"func"},required:!1,description:""},onEnter:{type:{name:"objectOf",value:{name:"union",value:[{name:"number"},{name:"object"}]}},required:!0,description:""},onExit:{type:{name:"objectOf",value:{name:"union",value:[{name:"number"},{name:"object"}]}},required:!0,description:""},children:{type:{name:"func"},required:!0,description:""}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/ConditionalMotionState.js"]={name:"ConditionalMotionState",docgenInfo:I.__docgenInfo,path:"src/ConditionalMotionState.js"}),n.d(t,"c",function(){return j}),n.d(t,"d",function(){return C}),n.d(t,"b",function(){return A}),n.d(t,"a",function(){return N})}},[[554,3,2]]]);
//# sourceMappingURL=iframe.74c921ac290f205cc4f8.bundle.js.map