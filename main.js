var session = 60;
var breaks = 60;
var sessionMax = 60;
var breakMax = 60;
var timer;
var sessionActive = true;
var formatted = function(time){
  hours = Math.floor(time/3600);
  minutes = Math.floor((time - hours*3600)/60);
  seconds = time - (hours*3600 + minutes*60);
  return (hours < 10 ? "0" : "") + hours + ":" + (minutes < 10 ? "0" : "") + minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
};
var pushFormat = function(counter, time){
  $(counter).text(formatted(time));
};
var resetTimes = function(){
  session = sessionMax;
  breaks = breakMax;
  $("#sessionClock").removeClass('activeClock');
  $("#breakClock").removeClass('activeClock');
  sessionActive = true;
  pushFormat("#sessionCounter", session);
  pushFormat("#breakCounter", breaks);
};
var setTime = function(buttonID){
  switch(buttonID){
    case "sessionPlus":
      session = Math.floor(session/60)*60;
      session += 60;
      pushFormat("#sessionCounter", session);
      break;
    case "sessionMinus":
      session = Math.floor(session/60)*60;
      session -= 60;
      if(session < 60){
        session = 60;
      }
      pushFormat("#sessionCounter", session);
      break;
    case "breakPlus":
      breaks = Math.floor(breaks/60)*60;
      breaks += 60;
      pushFormat("#breakCounter", breaks);
      break;
    case "breakMinus":
      breaks = Math.floor(breaks/60)*60;
      breaks -= 60;
      if(breaks < 60){
        breaks = 60;
      }
      pushFormat("#breakCounter", breaks);
      break;
    default:
      break;
  }
  sessionMax = session;
  breakMax = breaks;
};
var startStopReset = function(buttonID){
  if(buttonID == "start"){
    $(".startStop > h3").text("STOP");
    $(".startStop").attr('id', 'stop');
    $(".resetBtn").attr('id', 'resetGrey');
    $(".setButton").addClass('grey');
    countdown();
  } else {
    $(".startStop > h3").text("START");
    $(".startStop").attr('id', 'start');
    $(".resetBtn").attr('id', 'reset');
    $(".setButton").removeClass('grey');
    clearInterval(timer);
  }
};
var countdown = function(){
  timer = setInterval(function(){
      if(sessionActive == true){
        if(!$("#sessionClock").hasClass('activeClock')){
          $("#breakClock").removeClass('activeClock');
          $("#sessionClock").addClass('activeClock');
        }
        session--;
        pushFormat("#sessionCounter", session);
        if(session === 0){
          session = sessionMax;
          pushFormat("#sessionCounter", session);
          sessionActive = !sessionActive;
        }
      } else {
        $("#sessionClock").removeClass('activeClock');
        $("#breakClock").addClass('activeClock');
        breaks--;
        pushFormat("#breakCounter", breaks);
        if(breaks === 0){
          breaks = breakMax;
          pushFormat("#breakCounter", breaks);
          sessionActive = !sessionActive;
        }
      }
    }, 1000);
};
$(document).ready(function(){
  pushFormat("#sessionCounter", session);
  pushFormat("#breakCounter", breaks);
  $(".button").click(function(){
    var id = $(this).attr('id');
    if(id == "start" || id == "stop"){
      startStopReset(id);
    } else if (id != "start" && id != "stop" && id != "reset"){
      if($(".startStop").attr('id') != "stop")
      setTime(id);
    } else {
      resetTimes();
    }
  });
});