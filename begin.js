let a= document.getElementById("btn");
a.addEventListener("click",(evt)=>{
	evt.preventDefault();
	setTimeout(()=>{
     window.location.href=`create.html`;
 },1000);
}
	)