let a= document.getElementById("btn");
a.addEventListener("click",(evt)=>{
	evt.preventDefault();
	setTimeout(()=>{
     window.location.href=`Create.html`;
 },1000);
}
	)