$(function(){
  if( localStorage.applyMod == 1) {
     on();     
  } else {
     off();    
  }
  $("#enable").click( function(){
     on();
  });  
  $("#disable").click( function(){
     off();
  });
  $("#refresh").click( function(){
     chrome.tabs.reload(null);
  }); 
});

function on() {
   localStorage.applyMod = 1;
   $("#enable").html("IO Helper Enabled &#x2714;");
   $("#disable").html("IO Helper Disabled");   
}
function off() {
   localStorage.applyMod = 0;
   $("#enable").html("IO Helper Enable!");
   $("#disable").html("IO Helper Disabled &#x2714;");   
}
