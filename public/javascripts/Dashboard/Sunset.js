var theDateToday = moment(),
    times = SunCalc.getTimes(theDateToday, 51.565840, -0.093650);
var theDateTomorrow = moment(theDateToday).add(1,'days'),
    timesTomorrow = SunCalc.getTimes(theDateTomorrow, 51.565840, -0.093650);
var secondsRemain = '';

var theSunsetCountDown = setInterval(sunsetCountDown,1000);
var theSunriseCountDown = setInterval(sunriseCountDown,1000);
var watchMidnight = setInterval(midnight,1000);

function midnight(){
if(moment().format('LTS') === moment().startOf('day').format('LTS')) {
  getDates();
  console.log('MIDNIGHT');
  console.log(theDateToday);
}

}

function getDates(){
  theDateToday = moment();
  times = SunCalc.getTimes(theDateToday, 51.565840, -0.093650);
  theDateTomorrow = moment(theDateToday).add(1,'days');
  timesTomorrow = SunCalc.getTimes(theDateTomorrow, 51.565840, -0.093650);
}

function getTimeNOW(){
  //Cal Current Time in seconds from midnight
    var timeNOW = moment(),
        timeMidnight = timeNOW.clone().startOf('day'),
        timeSecFromMidnight = timeNOW.clone().diff(timeMidnight, 'seconds');
        return [timeSecFromMidnight, timeMidnight]
}


function sunriseCountDown(){
  // get Time from midnight and start of today;
  var timeNowRTN = getTimeNOW(),
      timeSecFromMidnight = timeNowRTN[0],
      timeMidnight = timeNowRTN[1];


//Cal seconds until Today's Sunrise
  var sunriseToday = moment(times.sunrise),
      sunriseSecFromMidnight = sunriseToday.diff(timeMidnight, 'seconds'),
//Cal difference between current time and today's sunrise
      secondsRemain = sunriseSecFromMidnight - timeSecFromMidnight;
      $('#srCountdownToday').text( secondsRemain + ' seconds');

//SUNRISE - TURN OFF FLOODLIGHTS
  if(secondsRemain === 0){
    sunstate('rise');
  } else if (secondsRemain < 0){
      $('#srCountdownToday').text('Risen');
  }

//Cal seconds until Tomorrow's Sunrise
  var sunriseTomorrow = moment(timesTomorrow.sunrise),
      sunriseTomorrowSecFromMidnight = (sunriseTomorrow.diff(timeMidnight, 'seconds')),
      sunriseTomorrowSecFromMidnight = sunriseTomorrowSecFromMidnight + 84600,
//Cal difference between current time and tomorrow's sunrise
      tomSecondsRemain = sunriseTomorrowSecFromMidnight - timeSecFromMidnight;
      $('#srCountdownTomorrow').text( tomSecondsRemain + ' seconds');

}



function sunsetCountDown(){
  // get Time from midnight and start of today;
  var timeNowRTN = getTimeNOW(),
      timeSecFromMidnight = timeNowRTN[0],
      timeMidnight = timeNowRTN[1];


//Cal seconds until Today's Sunset
  var sunsetToday = moment(times.sunset),
      sunsetSecFromMidnight = sunsetToday.diff(timeMidnight, 'seconds'),
//Cal difference between current time and today's sunset
      secondsRemain = sunsetSecFromMidnight - timeSecFromMidnight;
      $('#ssCountdownToday').text( secondsRemain + ' seconds');

//SUNSET - TURN ON FLOODLIGHTS
  if(secondsRemain === 0){
      sunstate('set');
  } else if (secondsRemain < 0){
      $('#ssCountdownToday').text('Set');
  }


//Cal seconds until Tomorrow's Sunset
  var sunsetTomorrow = moment(timesTomorrow.sunset),
      sunsetTomorrowSecFromMidnight = (sunsetTomorrow.diff(timeMidnight, 'seconds')),
      sunsetTomorrowSecFromMidnight = sunsetTomorrowSecFromMidnight + 84600,
//Cal difference between current time and tomorrow's sunset
      tomSecondsRemain = sunsetTomorrowSecFromMidnight - timeSecFromMidnight;
      $('#ssCountdownTomorrow').text( tomSecondsRemain + ' seconds');

}


function sunState(state){

  const xhr = new XMLHttpRequest();
  const url = 'https://192.168.104.101/enu/trigger/Sun'+state;

xhr.open('POST', url);
xhr.onreadystatechange = 'someHandler';
xhr.send();

}



function lights(state){


  const xhr = new XMLHttpRequest();
  const url = 'https://192.168.104.101/api/switch/ctrl?switch=3&action='+state;

xhr.open('POST', url);
xhr.onreadystatechange = 'someHandler';
xhr.send();

}

$(document).ready(function() {
  getDates();

  $('#Today').text(moment(theDateToday).format('L'));
  $('#Tomorrow').text(moment(theDateTomorrow).format('L'));

  $('#sunrise').text( moment(times.sunrise).format('LTS'));
  $('#sunset').text( moment(times.sunset).format('LTS'));

  $('#sunriseTomorrow').text( moment(timesTomorrow.sunrise).format('LTS'));
  $('#sunsetTomorrow').text( moment(timesTomorrow.sunset).format('LTS'));




})
