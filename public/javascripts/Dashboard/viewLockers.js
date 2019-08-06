var allowed = false;
var searchStart = moment().startOf('month').format('l'),
    searchEnd = moment().endOf('month').format('l');
console.log( searchStart);
console.log( searchEnd);
var theSearch =  {created: { $gt: moment(searchStart).format(), $lt: moment(searchEnd).add('24','hours').format() }};
    searchChoice = 'default';
var options = ['', 'Locker', 'Key', 'Name'];
var keyCode = '';
var theKeys = [];



$(document).ready(function() {

  $('#PinModal').modal("show");
  $('#lockersLink').addClass('active');
  $('.form.active').removeClass('active');
   getKeys();
   getLockers();

  var select = document.getElementById('searchOptions');

  $.each(options,function(i, option){
      var opt = document.createElement('option');
      opt.value = option;
      opt.innerHTML = option;
      select.appendChild(opt);
  });


  if (pinAccepted === true){
    populateLockerTable();
    allowed = true;
  }
});

//Get request for session
function getAKey(key){

  $.getJSON( '/lockers/getAKey', {_id: key }, function(results, res) {
    })
    .done(function(results, res) {

          var theResults = JSON.stringify(results);
            if (theResults === '[]') {

          } else {

          }

      aKey = results;
      });


  }

function insertKey(key) {
  keyID = key._id;
  theKeys.push([key.Key.Code,key._id]);
  code = key.Key.Code;
  number = key.Key.Number;
  copies = key.Copies;
          var table = document.getElementById("KeysTableBody");



          var keyRow = table.insertRow(-1);
                keyRow.id = keyID;
          var keyCode = keyRow.insertCell(-1);
                keyCode.innerHTML = code;
          var keyCopies = keyRow.insertCell(-1);
                keyCopies.innerHTML = copies;

keyID = '';

}

function insertLocker(locker) {
  var aKey = '',
      theKey = '',
      lockerID = locker._id,
      theLocker = locker.Locker;
      theOwner = locker.Owner;

              var table = document.getElementById("LockersTableBody");
              var lockerRow = table.insertRow(-1);
                    lockerRow.id = lockerID;
              var lockerNumber = lockerRow.insertCell(-1);
              var lockerKey = lockerRow.insertCell(-1);
              var lockerOwner = lockerRow.insertCell(-1);
                      lockerOwner.innerHTML = theOwner;
              var lockerKeys = lockerRow.insertCell(-1);
  $.getJSON( '/lockers/getAKey', {_id: locker.Key }, function(results, res) {
    })
    .done(function(results, res) {

      aKey = results[0];
      theKey = aKey.Key.Code;
      lockerNumber.innerHTML = theLocker;
      lockerKey.innerHTML = theKey;
      lockerKeys.innerHTML = aKey.Copies;

      keyID = '';
      });


}


function getKeys() {

    // jQuery AJAX call for JSON
    $.getJSON( '/lockers/getKeys', function( data ) {

    $.each(data, function(i, key){

        insertKey(key);

    });
  });
}

function getLockers() {

    // jQuery AJAX call for JSON
    $.getJSON( '/lockers/getLockers', function( data ) {

    $.each(data, function(i, locker){

        insertLocker(locker);

    });
  });
}

function addKey() {
  var info = {
    Created: {
       Created: moment(),
       Created_Date : moment().format('L'),
       Created_Time : moment().format('LT'),
              },
    Key: {
      Code: keyCode,
      Batch : $('input#keyBatchInput').val(),
      Number : $('input#keyNumberInput').val()
              },
    Copies: $('input#copiesInput').val()
  }

  $.ajax({
    type: "Post",
    url: "lockers/addKey",
    contentType: 'application/json',
    data: JSON.stringify(info),
  }).done(function( response, results ) {
    console.log(results);

      // Check for successful (blank) response
      if (results === 'success') {
          console.log('success');
        window.location.reload();
          resetPage();
        console.log('reset');
      }
      else {
          // If something goes wrong, alert the error message that our service returned
          alert('Error: ' + response.msg);
          window.location.reload();
            resetPage();
      }

  });

};

function addLocker() {
  var info = {
    Created: {
       Created: moment(),
       Created_Date : moment().format('L'),
       Created_Time : moment().format('LT'),
              },

    Locker: $('input#lockerNumberInput').val(),
    Key: $('input#keyID').val(),
    Owner: $('input#ownerInput').val()
  }

  $.ajax({
    type: "Post",
    url: "lockers/addLocker",
    contentType: 'application/json',
    data: JSON.stringify(info),
  }).done(function( response, results ) {
    console.log(results);

      // Check for successful (blank) response
      if (results === 'success') {
          console.log('success');
        window.location.reload();
          resetPage();
        console.log('reset');
      }
      else {
          // If something goes wrong, alert the error message that our service returned
          alert('Error: ' + response.msg);
          window.location.reload();
            resetPage();
      }

  });

};

$(document).on('hidden.bs.modal', function(e) {

if(e.target.id==='PinModal'){
  if (pinAccepted === true){
    allowed = true;
    populateLockerTable();
    $('table#lockers').show();
    $('table#keys').show();
    $('#loading').hide();
  }
}
});

function populateLockerTable(){};




// Set up search dates
$('#reportrange').on('apply.daterangepicker', function(ev, picker) {
  //do something, like clearing an input

  searchStart = picker.startDate.format('L');
  searchEnd = picker.endDate.format('L');
  populateLockerTable();


});




$(document).on('keyup',function (e){

  if(e.target.id === 'searchText'){
    searchText = e.target.value;
    populateVisitorTable();
  }

  if(e.target.id === 'keyBatchInput'){
    if($("#keyBatchInput").val() === '29220'){
      $("#keyBatchInput").val('29220-');
    } else {
       var string  = $("#keyBatchInput").val();
       string = string.toUpperCase();
        $("#keyBatchInput").val(string);
    }
    $('#fullCodeInput').text('Details ' + $("#keyBatchInput").val() + $("#keyNumberInput").val());
  }

  if(e.target.id === 'keyNumberInput'){
    var keyNumber = 0;
    if( $("#keyNumberInput").val().length < 2){
      keyNumber = '00' + $("#keyNumberInput").val();
    } else if ( $("#keyNumberInput").val().length < 3){
      keyNumber = '0' + $("#keyNumberInput").val();
    } else if ( $("#keyNumberInput").val().length > 2){
      keyNumber = $("#keyNumberInput").val();
    }
    keyCode =  $("#keyBatchInput").val() + keyNumber;
    $('#fullCodeInput').text('Details ' + keyCode);
  }

if(e.target.id === 'keyInput'){
  $('submit#newLocker').hide();
  var found = false;
  var string  = $("input#keyInput").val();
  string = string.toUpperCase();
   $("input#keyInput").val(string);

  theKeys.forEach(function(key){
    var k = key[0];
    var i = key[1];
    if(k === $('input#keyInput').val()){
      found = i;
    }
  })
  if(found === false){
    $('input#keyID').val('');
    $('submit#newLocker').hide();
  } else {
    $('input#keyID').val(found);
    $('submit#newLocker').show();
  }

}


});
