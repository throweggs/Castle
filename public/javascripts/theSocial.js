var startLocation = '',
    facilitatorName = '',
    facilitatorNameList = {},
    participantsArray = [],
    createdTime = '',
    createdDate = '',
    numParticipants = 0,
    foundSession = false,
    theID = '',
    iPadIn = '',
    sessionVersion = '',
    sessionType = '';

var theSearch = {Facilitator: { $regex: '', $options: 'i' }},
    searchChoice = 'Facilitator';

// FIll in options for the Facilitator Modals
  var topRopingAreas = ' <a class="list-group-item list-group-item-action" id="Auto Belays" data-toggle="list" href="#list-AutoBelays" role="tab" aria-controls="AutoBelays">Auto Belays</a>';
      topRopingAreas += ' <a class="list-group-item list-group-item-action" id="Stacks" data-toggle="list" href="#list-Stacks" role="tab" aria-controls="Stacks">Stacks</a>';
      topRopingAreas += ' <a class="list-group-item list-group-item-action " id="Quarry" data-toggle="list" href="#list-Quarry" role="tab" aria-controls="Quarry">Quarry</a>';
      topRopingAreas += ' <a class="list-group-item list-group-item-action" id="TallWalls" data-toggle="list" href="#list-TallWalls" role="tab" aria-controls="TallWalls">Upstairs Slabs & Tall Walls</a>';

  var boulderingAreas = ' <a class="list-group-item list-group-item-action" id="Catacombs" data-toggle="list" href="#list-Catacombs" role="tab" aria-controls="Catacombs">Catacombs</a>';
      boulderingAreas += ' <a class="list-group-item list-group-item-action" id="Competition Wall" data-toggle="list" href="#list-CompetitionWall" role="tab" aria-controls="CompetitionWall">Competition Wall</a>';
      boulderingAreas += ' <a class="list-group-item list-group-item-action" id="Loft" data-toggle="list" href="#list-Loft" role="tab" aria-controls="Loft">Loft</a>';
      boulderingAreas += ' <a class="list-group-item list-group-item-action" id="Panels" data-toggle="list" href="#list-Panels" role="tab" aria-controls="Panels">Panels</a>';
      boulderingAreas += ' <a class="list-group-item list-group-item-action" id="Pen" data-toggle="list" href="#list-Pen" role="tab" aria-controls="Pen">Pen</a>';
      boulderingAreas += ' <a class="list-group-item list-group-item-action" id="Mez" data-toggle="list" href="#list-Mez" role="tab" aria-controls="Mez">Mez</a>';
      boulderingAreas += ' <a class="list-group-item list-group-item-action" id="Traverse Boulders" data-toggle="list" href="#list-TraverseBoulders" role="tab" aria-controls="TraverseBoulders">Traverse Boulders</a>';
      boulderingAreas += ' <a class="list-group-item list-group-item-action" id="Outdoor Boulders" data-toggle="list" href="#list-OutdoorBoulders" role="tab" aria-controls="OutdoorBoulders">Outdoor Boulders</a>';


//ADDS The Social info to the page
  function showSession(){
    if(facilitatorName === ''){
      $('#facilitatorModal').modal('show');
    }
        var sessionDetails = " <h1>The Social Facilitator: <strong>" + facilitatorName +"</strong></h1>";
            sessionDetails += ' <h3>Your '+ sessionVersion +' '+ sessionType +' session, will be starting in the ' + startLocation + '.</h3>';
            sessionDetails += ' <ul>';


        $( "#showSession" ).html( sessionDetails );
        $('#FacilitatorWarning').hide();
        $('#participants').show();

      }

      function findFacilitator(){
         var theData = [];
         optons = {};
        $.getJSON( '/users/theSessionlist', function( data ) {

          })
            .done(function( data ) {

              $.each(data,function(li,litem){
              var found = false;
                $.each(theData,function(fi,fitem){
                  if(litem.Facilitator === fitem)
                  found = true;
                  });
                  if(found === false){
                    theData.push(litem.Facilitator);
                  }
              });

    facilitatorNameList.data = theData;
    options.data = theData;

    return theData;
      });

    }

    var options = {
      data: findFacilitator(),
      placeholder: "Facilitator Name",
      list: {
      showAnimation: {
        type: "fade", //normal|slide|fade
        time: 400,
        callback: function() {}
      },

      hideAnimation: {
        type: "slide", //normal|slide|fade
        time: 400,
        callback: function() {}
      },
      match: {
    			enabled: true
    		}
    }
    };


function participantLeft(arrayNum){
 $('#leavingModal').modal('show');

      $('#leavingModal').on('click',function(e){
        var reason = e.target.id
        $('#leavingSubmit').show();
        if(reason === 'otherReason'){
          $('#otherReasonDiag').show();
          $('#leadingDiag').hide();
          $('#leavingDiag').hide();
        } else if (reason === 'leading'){
          $('#otherReasonDiag').hide();
          $('#leadingDiag').show();
          $('#leavingDiag').hide();
        } else if (reason === 'leaving'){
          $('#otherReasonDiag').hide();
          $('#leadingDiag').hide();
          $('#leavingDiag').show();
        }
      $('.diags').addClass('btn-outline-primary').removeClass('btn-primary');
      $('#'+reason).addClass('btn-primary').removeClass('btn-outline-primary');

      $('#leavingSubmit').on('click',function(e){
            participantsArray[arrayNum].Left_Session = [true, moment().format(),reason];
          $('#participantTable tbody').html('')
          updateParticipantLeft()

        });

      });


}

  //List all the stored Participants, and creates a new entry field
  function ShowParticipants(){

            $.each(participantsArray, function( index, value ) {
              var participant = value.First_Name + ' ' + value.Last_Name;
           var pName = toTitleCase(firstNameLastInital(participant));
              var i = index + 1;
              var remained = '';
              if(value.Left_Session[0] === true){
                remained = 'Left The Social at '+ moment(value.Left_Session[1]).format('LT');
              } else if (value.Left_Session[0] === false){
                remained = '<button type="button" onclick="participantLeft('+index+');" class="btn btn-outline-danger btn-sm">Leaving Session</button>';
              } else {
                remained = '<button type="button" onclick="participantLeft('+index+');" class="btn btn-outline-danger btn-sm">Leaving Session</button>';
              }
          var table = document.getElementById("participantTableBody");

          var participantRow = table.insertRow(0);
                participantRow.id = i
                participantRow.className = 'participantRow';
          var partindex = participantRow.insertCell(-1);
                partindex.id = i;
                partindex.className = 'partIndex'
                partindex.innerHTML = i;
          var partName = participantRow.insertCell(-1);
                partName.id = i +'_partName'
                partName.className = 'partName'
                partName.innerHTML = pName;
          var partReason = participantRow.insertCell(-1);
                partReason.id = i + '_partReason';
                partReason.className = 'partReason'
                partReason.innerHTML = value.Reason;
          var partFT = participantRow.insertCell(-1);
                partFT.id = i + '_keyDel';
                partFT.className = 'keyDel'
                partFT.innerHTML = value.First_Time;
          var partLeft = participantRow.insertCell(-1);
                partLeft.id = i + '_partLeft';
                partLeft.className = 'partLeft'
                partLeft.innerHTML = remained;

            });
          i = numParticipants+1;

          }


          $(document).on('keyup blur change', function(e){
            var data = e.target.id;
            if($('#'+data).hasClass('is-invalid')==true){
              if($('#'+data).val().length > 1){
                $('#'+data).removeClass('is-invalid');
                $('#'+data).addClass('is-valid');
              }
            }
          });

            function submitLine(e){
              var theCount = 0;
              event.preventDefault();

                  if($('#NewParticipantFirstName').val().length > 1){
                    theCount = theCount + 1;
                     $('#NewParticipantFirstName').addClass('is-valid');
                     $('#NewParticipantFirstName').removeClass('is-invalid');
                  } else {
                       $('#NewParticipantFirstName').addClass('is-invalid');
                       $('#NewParticipantFirstName').removeClass('is-valid');
                    }
                  if($('#NewParticipantLastName').val().length > 1){
                    theCount = theCount + 1;
                    $('#NewParticipantLastName').addClass('is-valid');
                    $('#NewParticipantLastName').removeClass('is-invalid');
                  } else {
                    $('#NewParticipantLastName').addClass('is-invalid');
                    $('#NewParticipantLastName').removeClass('is-valid');
                  }

                  $('#NewParticipantEmail').addClass('is-valid');

                  if($('#NewReason option:selected').val().length > 1){
                    theCount = theCount + 1;
                    $('#NewReason').addClass('is-valid');
                    $('#NewReason').removeClass('is-invalid');
                  } else {
                    $('#NewReason').addClass('is-invalid');
                    $('#NewReason').removeClass('is-valid');
                  }
                  if($('#NewFirstTime option:selected').val().length > 1){
                    theCount = theCount + 1;
                    $('#NewFirstTime').addClass('is-valid');
                    $('#NewFirstTime').removeClass('is-invalid');
                  } else {
                    $('#NewFirstTime').addClass('is-invalid');
                    $('#NewFirstTime').removeClass('is-valid');
                  }
                  if(theCount === 4){
                  var update = {
                   FindDate: {Created_Date: moment().format('LL')},
                    Details : { $push: { Participants : {
                    First_Name : toTitleCase($('#NewParticipantFirstName').val()),
                    Last_Name :  toTitleCase($('#NewParticipantLastName').val()),
                    Name: [
                      {First : toTitleCase($('#NewParticipantFirstName').val())},
                      {Last :  toTitleCase($('#NewParticipantLastName').val())},
                    ],
                    Email_Address : $('#NewParticipantEmail').val(),
                    Reason: $('#NewReason option:selected').val(),
                    Arrival_Time : moment().format(),
                    First_Time : $('#NewFirstTime option:selected').val(),
                    Left_Session : [false,0],
                    iPad : getKioskId() }}},
                  };

                  updateParticipants(update);
                }


              // } else if (formCheck < 4){
              //   alert('Please fill in all the fields');
              // }

            }

// ----------------------------------------- DOM READY ----------------------------------------- //
  $( document ).ready(function() {
      findFacilitator();
      $("#dataProtection").modal('show');

      //Database call to get details of session if already entered.
      getSession();
      ShowParticipants();


      $('input#facilitatorName').on('click keyup keydown blur change',function(){
          if($('input#facilitatorName').val().length > 1){
            $('input#facilitatorName').val(toTitleCase($('input#facilitatorName').val()));
          }
      });
      //adds The Social information in to the options of the modal, so it makes sence when editing details.
      $('#openFacilitatorModal').on('click',function(){

        var text = document.getElementById('facilitatorName');
        text.value = facilitatorName;

        if($('input#facilitatorName').val().length > 1){
          $('label#sessDetails').show();
          $('#sessChoice').show();
          $('label#startOptions').show();
          $('#startOptions').show();
        }


        if(sessionType === 'bouldering'){
            document.getElementById("BSess").classList.add("active");
            document.getElementById("TSess").classList.remove("active");
        } else if(sessionType === 'top roping'){
            document.getElementById("BSess").classList.remove("active");
            document.getElementById("TSess").classList.add("active");
        } else {
          document.getElementById("BSess").classList.remove("active")
          document.getElementById("TSess").classList.remove("active");
        }
        if(startLocation===''){

        } else if(startLocation!==''){
        document.getElementById(startLocation).classList.add("active");
        }
      });

      $('#startOptions').html(boulderingAreas);

      $('input#facilitatorName').keyup(function(){
        if($('input#facilitatorName').val().length > 1){
          $('label#sessDetails').show();
          $('#sessChoice').show();
        } else if($('input#facilitatorName').val().length <= 1){
            $('label#sessDetails').hide();
            $('#sessChoice').hide();
            $('label#startOptions').hide();
            $('#startOptions').hide();
          }
      });


      $('#RegularSession').on('change',function(){
        if ($('input#RegularSession').is(":checked")){
          sessionVersion = "regular"
        }
        });
      $('#WeekendSession').on('change',function(){
        if ($('input#WeekendSession').is(":checked")){
          sessionVersion = "weekend"
        }
      });
      $('#LGBTSession').on('change',function(){
        if ($('input#LGBTSession').is(":checked")){
          sessionVersion = "LGBQT+"
        }
      });
      $('#WomenOnlySession').on('change',function(){
        if ($('input#WomenOnlySession').is(":checked")){
          sessionVersion = "Women's Only"
        }
      });


      //Sets Bouldering Options
      $('input#BoulderingSession').on('change',function(){
        if ($('input#BoulderingSession').is(":checked")){

          $('#startOptions').show();
          sessionType = $('input#BoulderingSession').val();

          $('#startOptions').html(boulderingAreas);

        }
      });

      //Sets Top Rope Options
      $('input#TopRopeSession').on('change',function(){
        if ($('input#TopRopeSession').is(":checked")){
          $('#startOptions').show();
          sessionType = $('input#TopRopeSession').val();

          $('#startOptions').html(topRopingAreas);
        }
      });

      //Allows submit once option has be selected
      $('#startOptions').click(function(){
          $('button#facilitatorSubmit').prop('disabled', false);
      });

      $("#facilitatorSubmit").on('click',function(e){

          var item = document.getElementsByClassName("list-group-item active");
          startLocation = (item[0].id);
          facilitatorName = $('input#facilitatorName').val();
          facilitatorName = facilitatorName.replace(/[^a-zA-Z ]/g, "")
          facilitatorName = facilitatorName.trim()
          sessionVersion = sessionVersion
          sessionType = sessionType;



        //displays session information
          showSession();


          if(foundSession === false){
          addSession();
        } else if (foundSession === true){
          updateSession();
        }
      });

      $('button#addMe').click(function(){
        submitLine();
      });
      $("#facilitatorName").on('click',function(){

      });


    $("#facilitatorName").easyAutocomplete(options);


  });


  //----------- DATABASE CALLS ------------//

function updateParticipantLeft(){
  var updates = {
      FindDate: {Created_Date: moment().format('LL')},
      Details : {
                $set:  {

                  Participants: participantsArray,
                  iPadIn : getKioskId()
                        }
                  },
              };

  $.ajax({
    type: "put",
    url: "theSocial/updateSocial",
    contentType: 'application/json',
    data: JSON.stringify(updates)
  }).done(function( response, results ) {
      // Check for successful (blank) response
      if (results === 'success') {
        resetPage();
          // Clear the form inputs
          // $('#addSocial input').val('');

          // // Update the table
          // populateTable();

      }
      else {

          // If something goes wrong, alert the error message that our service returned
          alert( response.msg);


      }
  });
}

  //Post request to create The Social
  function addSession() {



      createdDate = moment().format('LL');
      createdTime = moment().format('LTS');

      var newSession = {
          Created_Date: moment().format('LL'),
          Created_Time: moment().format('LTS'),
          created: moment().format(),
          Facilitator: toTitleCase(facilitatorName),
          Session_Type: sessionType,
          Session_Version: sessionVersion,
          Start_Location: startLocation,
          Participants: participantsArray,
          iPadIn : getKioskId(),
      };

    var myJSON = JSON.stringify(newSession);


        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: myJSON,
            url: 'theSocial/addSocial',
            dataType: 'JSON',
            contentType: 'application/json',
        }).done(function( response, results ) {
            // Check for successful (blank) response
            if (response.msg === '') {

                // Clear the form inputs
                // $('#addSession input').val('');

                // // Update the table
                // populateTable();

            }
            else {

                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.msg);

            }
        });

        foundSession = true;
    }

  //Get request for session
  function getSession(){
    // var DateOnly = moment().format('MMMM Do YYYY');
    $.getJSON( '/theSocial/getSocial', {Created_Date: moment().format('LL')}, function(results, res) {
      })
      .done(function(results, res) {
            var theResults = JSON.stringify(results);
              if (theResults === '[]') {
                    foundSession = false;
            } else {
                    facilitatorName = results[0].Facilitator;
                    createdTime = results[0].Created_Time;
                    theID = results[0]._id;
                    sessionType =  results[0].Session_Type;
                    sessionVersion = results[0].Session_Version;
                    startLocation = results[0].Start_Location;
                    foundSession = true;
                    participantsArray = results[0].Participants;
                    iPadIn = results[0].iPadIn;
                    showSession();
                    ShowParticipants();
                    // updateWWA();

            }
        });
    }

    //Put request to update to Participants, on  pre made sesion
  function updateParticipants(update){

      $.ajax({
        type: "put",
        url: "theSocial/updateParticipant",
        contentType: 'application/json',
        data: JSON.stringify(update)
      }).done(function( response, results ) {
          // Check for successful (blank) response
          if (results === 'success') {
            resetPage();
              // Clear the form inputs
              // $('#addSession input').val('');

              // // Update the table
              // populateTable();

          }
          else {

              // If something goes wrong, alert the error message that our service returned
              alert( response.msg);


          }
      });
    }

  //Put request to update to Participants, on  pre made sesion
  function updateSession(){

      var updates = {
          FindDate: {Created_Date: moment().format('LL')},
          Details : { $set:  {
          Facilitator: toTitleCase(facilitatorName),
          Session_Type: sessionType,
          Session_Version: sessionVersion,
          Start_Location: startLocation,
          iPadIn : iPadIn }},
      };

      $.ajax({
        type: "put",
        url: "theSocial/updateSocial",
        contentType: 'application/json',
        data: JSON.stringify(updates)
      }).done(function( response, results ) {
          // Check for successful (blank) response
          if (results === 'success') {
            resetPage();
              // Clear the form inputs
              // $('#addSession input').val('');

              // // Update the table
              // populateTable();

          }
          else {

              // If something goes wrong, alert the error message that our service returned
              alert( response.msg);


          }
      });
    }
