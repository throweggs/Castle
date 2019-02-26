var startLocation = '',
    facilitatorName = '',
    participantsArray = [],
    createdTime = '',
    createdDate = '',
    numParticipants = 0,
    foundSession = false,
    theID = '',
    iPadIn = '',
    sessionType = 'bouldering';


// FIll in options for the Facilitator Modals
  var topRopingAreas = ' <a class="list-group-item  list-group-item-action" id="Auto Belays" data-toggle="list" href="#list-AutoBelays" role="tab" aria-controls="AutoBelays">Auto Belays</a>';
      topRopingAreas += ' <a class="list-group-item list-group-item-action" id="Stacks" data-toggle="list" href="#list-Stacks" role="tab" aria-controls="Stacks">Stacks</a>';
      topRopingAreas += ' <a class="list-group-item list-group-item-action" id="Quarry" data-toggle="list" href="#list-Quarry" role="tab" aria-controls="Quarry">Quarry</a>';
      topRopingAreas += ' <a class="list-group-item list-group-item-action" id="TallWalls" data-toggle="list" href="#list-TallWalls" role="tab" aria-controls="TallWalls">Upstairs Slabs & Tall Walls</a>';

  var boulderingAreas = ' <a class="list-group-item  list-group-item-action" id="Catacombs" data-toggle="list" href="#list-Catacombs" role="tab" aria-controls="Catacombs">Catacombs</a>';
      boulderingAreas += ' <a class="list-group-item list-group-item-action" id="Competition Wall" data-toggle="list" href="#list-CompetitionWall" role="tab" aria-controls="CompetitionWall">Competition Wall</a>';
      boulderingAreas += ' <a class="list-group-item list-group-item-action" id="Loft" data-toggle="list" href="#list-Loft" role="tab" aria-controls="Loft">Loft</a>';
      boulderingAreas += ' <a class="list-group-item list-group-item-action" id="Panels" data-toggle="list" href="#list-Panels" role="tab" aria-controls="Panels">Panels</a>';
      boulderingAreas += ' <a class="list-group-item list-group-item-action" id="Pen" data-toggle="list" href="#list-Pen" role="tab" aria-controls="Pen">Pen</a>';
      boulderingAreas += ' <a class="list-group-item list-group-item-action" id="Mez" data-toggle="list" href="#list-Mez" role="tab" aria-controls="Mez">Mez</a>';
      boulderingAreas += ' <a class="list-group-item list-group-item-action" id="Traverse Boulders" data-toggle="list" href="#list-TraverseBoulders" role="tab" aria-controls="TraverseBoulders">Traverse Boulders</a>';
      boulderingAreas += ' <a class="list-group-item list-group-item-action" id="Outdoor Boulders" data-toggle="list" href="#list-OutdoorBoulders" role="tab" aria-controls="OutdoorBoulders">Outdoor Boulders</a>';


//ADDS the session info to the page
  function showSession(){
        var sessionDetails = " <h1>The Session Facilitator: <strong>" + facilitatorName +"</strong></h1>";
            sessionDetails += ' <h3>Your '+ sessionType +' session, will be starting in the ' + startLocation + '.</h3>';
            sessionDetails += ' <ul>';


        $( "#showSession" ).html( sessionDetails );


      }

  //List all the stored Participants, and creates a new entry field
  function ShowParticipants(){

            $.each(participantsArray, function( index, value ) {
              var participant = value.First_Name + ' ' + value.Last_Name;
           var PName = toTitleCase(firstNameLastInital(participant));
              var i = index + 1;

          $('#participantTable tr:last').after('<tr><th scope="row">'+i+'</th><td>'+PName+'</td><td>'+value.Reason+'</td><td>'+value.First_Time+'</td></tr>');


            });
          i = numParticipants+1;

          }


  function submitLine(){
    event.preventDefault();
    var update = {
     FindDate: {Created_Date: moment().format('MMMM Do YYYY')},
      Details : { $push: { Participants : {
      First_Name : $('#NewParticipantFirstName').val(),
      Last_Name :  $('#NewParticipantLastName').val(),
      Reason: $('#NewReason option:selected').val(),
      Arrival_Time : moment().format('HH MM SS'),
      First_Time : $('#NewFirstTime option:selected').val(),
      iPad : getKioskId() }}},
    };

    updateParticipants(update);

      document.location.href="/";

    // } else if (formCheck < 4){
    //   alert('Please fill in all the fields');
    // }

  }

// ----------------------------------------- DOM READY ----------------------------------------- //
  $( document ).ready(function() {
      //$("#dataProtection").modal('show');

      //Database call to get details of session if already entered.
      getSession();
      ShowParticipants();

      //adds the session information in to the options of the modal, so it makes sence when editing details.
      $('#openFacilitatorModal').on('click',function(){

        var text = document.getElementById('facilitatorName');
        text.value = facilitatorName;

        if($('input#facilitatorName').val().length > 2){
          $('label#sessDetails').show();
          $('#sessChoice').show();
          $('#startOptions').show();
        }


        if(sessionType === 'bouldering'){
            document.getElementById("BSess").classList.add("active");
            document.getElementById("TSess").classList.remove("active");
        } else if(sessionType === 'top roping'){
            document.getElementById("BSess").classList.remove("active");
            document.getElementById("TSess").classList.add("active");
        }
        if(startLocation===''){

        } else if(startLocation!==''){
        document.getElementById(startLocation).classList.add("active");
        }
      });

      $('#startOptions').html(boulderingAreas);

      $('input#facilitatorName').keyup(function(){
        if($('input#facilitatorName').val().length > 2){
          $('label#sessDetails').show();
          $('#sessChoice').show();
        } else if($('input#facilitatorName').val()<2){
            $('label#sessDetails').hide();
            $('#sessChoice').hide();
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
        console.log('hit');
          var item = document.getElementsByClassName("list-group-item active");
          startLocation = (item[0].id);
          facilitatorName = $('#facilitatorName').val();
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



  });


  //----------- DATABASE CALLS ------------//

  //Post request to create the session
  function addSession() {
      createdDate = moment().format('MMMM Do YYYY');
      createdTime = moment().format('HH:MM:SS');

      var newSession = {
          'Created_Date': moment().format('MMMM Do YYYY'),
          'Created_Time' : moment().format('HH:MM:SS'),
          'Facilitator': facilitatorName,
          'Session_Type': sessionType,
          'Start_Location': startLocation,
          'Participants': participantsArray,
          'iPadin' : getKioskId(),
      };
      console.log(newSession);
    var myJSON = JSON.stringify(newSession);


        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: myJSON,
            url: 'theSession/addSession',
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
    $.getJSON( '/theSession/getSession', {Created_Date: moment().format('MMMM Do YYYY')}, function(results, res) {
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
      console.log('UPDATE: ' + moment().format('MMMM Do YYYY'));


      $.ajax({
        type: "put",
        url: "theSession/updateParticipant",
        contentType: 'application/json',
        data: JSON.stringify(update)
      });
    }
    
  //Put request to update to Participants, on  pre made sesion
  function updateSession(){
      console.log('UPDATE: ' + moment().format('MMMM Do YYYY'));
      var updates = {
          FindDate: {Created_Date: moment().format('MMMM Do YYYY')},
          Details : { $set:  {
          Facilitator: facilitatorName,
          Session_Type: sessionType,
          Start_Location: startLocation,
          iPadIn : iPadIn }},
      };
console.log(updates);
      $.ajax({
        type: "put",
        url: "theSession/updateSession",
        contentType: 'application/json',
        data: JSON.stringify(updates)
      });
    }
