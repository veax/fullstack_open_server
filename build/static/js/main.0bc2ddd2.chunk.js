(this.webpackJsonppart1=this.webpackJsonppart1||[]).push([[0],{16:function(e,n,t){e.exports=t(39)},38:function(e,n,t){},39:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),c=t(15),u=t.n(c),o=t(4),i=t(5),l=t(3),m=t(2),d=t.n(m),f="/api/persons",s=function(){return d.a.get(f).then((function(e){return e.data}))},b=function(e){return d.a.post(f,e).then((function(e){return e.data}))},h=function(e,n){return d.a.put("".concat(f,"/").concat(e),n).then((function(e){return e.data}))},p=function(e){return d.a.delete("".concat(f,"/").concat(e))},v=function(e){var n=e.handleSearch;return r.a.createElement("div",null,"filter shown with ",r.a.createElement("input",{type:"text",onChange:n}))},E=function(e){var n=e.addPerson,t=e.handlePersonInput,a=e.person;return r.a.createElement("form",{onSubmit:n},r.a.createElement("div",null,"name: ",r.a.createElement("input",{onChange:t,name:"name",value:a.name})),r.a.createElement("div",null,"number:"," ",r.a.createElement("input",{type:"number",name:"number",value:a.number,onChange:t})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add")))},w=function(e){var n=e.filteredPersons,t=e.handleDeletion;return r.a.createElement(r.a.Fragment,null,n.map((function(e){return r.a.createElement("div",{key:e.name},r.a.createElement("p",null,e.name," ",e.number),r.a.createElement("button",{onClick:function(){return t(e)}},"delete"))})))},g=function(e){var n=e.message;return null===n?null:r.a.createElement("div",{className:"".concat(n.type," notification")},n.text)},j=function(){var e=Object(a.useState)([]),n=Object(l.a)(e,2),t=n[0],c=n[1],u=Object(a.useState)({name:"",number:""}),m=Object(l.a)(u,2),d=m[0],f=m[1],j=Object(a.useState)(""),O=Object(l.a)(j,2),y=O[0],P=O[1],k=Object(a.useState)(null),S=Object(l.a)(k,2),C=S[0],x=S[1],I=function(){setTimeout((function(){x(null)}),5e3)},D=function(e){var n={text:"Added ".concat(e),type:"success"};x(n),I()},A=function(e){var n={text:"Information of ".concat(e," has already been removed from server"),type:"error"};x(n),I()};Object(a.useEffect)((function(){s().then((function(e){c(e)}))}),[]);var J=t.filter((function(e){return e.name.toLowerCase().includes(y)}));return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(g,{message:C}),r.a.createElement(v,{handleSearch:function(e){P(e.target.value.toLowerCase())}}),r.a.createElement("h4",null,"Add a new:"),r.a.createElement(E,{addPerson:function(e){e.preventDefault();var n=t.find((function(e){return e.name===d.name}));if(n)n.number!=d.number&&window.confirm("".concat(d.name," is already added to phonebook, replace the old number with a new one ?"))?h(n.id,d).then((function(e){c(t.map((function(n){return n.id!==e.id?n:e}))),f({name:"",number:""}),D(e.name)})).catch((function(e){A(n.name),c(t.filter((function(e){return e.id!==n.id})))})):alert("".concat(d.name," is already in a phonebook"));else{var a={name:d.name,number:d.number};b(a).then((function(e){c(t.concat(e)),console.log("person added"),f({name:"",number:""}),D(e.name)}))}},handlePersonInput:function(e){f(Object(i.a)(Object(i.a)({},d),{},Object(o.a)({},e.target.name,e.target.value)))},person:d}),r.a.createElement("h2",null,"Phones"),r.a.createElement(w,{filteredPersons:J,handleDeletion:function(e){window.confirm("delete ".concat(e.name," ?"))&&p(e.id).then((function(n){return c(t.filter((function(n){return n.id!==e.id})))})).catch((function(n){A(e.name),c(t.filter((function(n){return n.id!==e.id})))}))}}))};t(38);u.a.render(r.a.createElement(j,null),document.getElementById("root"))}},[[16,1,2]]]);
//# sourceMappingURL=main.0bc2ddd2.chunk.js.map