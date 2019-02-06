var startLocation = '',
    facilitatorName = '',
    participantsArray = [],
    createdTime = '',
    numParticipants = 0,
    foundSession = false,
    theID = '',
    sessionType = 'bouldering';


// FIll in options for the Facilitator Modals
  var topRopingAreas = ' <a class="list-group-item  list-group-item-action" id="Auto Belays" data-toggle="list" href="#list-AutoBelays" role="tab" aria-controls="AutoBelays">Auto Belays</a>';
      topRopingAreas += ' <a class="list-group-item list-group-item-action" id="Stacks" data-toggle="list" href="#list-Stacks" role="tab" aria-controls="Stacks">Stacks</a>';
      topRopingAreas += ' <a class="list-group-item list-group-item-action" id="Quarry" data-toggle="list" href="#list-Quarry" role="tab" aria-controls="Quarry">Quarry</a>';
      topRopingAreas += ' <a class="list-group-item list-group-item-action" id="TallWalls" data-toggle="list" href="#list-TallWalls" role="tab" aria-controls="TallWalls">Tall Walls</a>';

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
        var sessionDetails = " <h1>Women's Bouldering Social Facilitator: <strong>" + facilitatorName +"</strong></h1>";
            sessionDetails += ' <h3>Your '+ sessionType +' session, will be starting in the ' + startLocation + '.</h3>';
            sessionDetails += ' <ul>';
        var showTnCs        = '   <li><strong>Participants of The Session must be registered roped climbers</strong> and therefore confident putting on a harness correctly, tying in with the correct knot and belaying competently.</li>';
            showTnCs       += "   <li>Women's Bouldering Social and the wednesday mixed bouldering Session may be attended by those registered as bouldering only. <br> If you’re not sure about which session you can join, please ask a receptionist who will be happy to help you. <strong>The Session is not suitable for novice climbers.</strong></li>";
            showTnCs       += '   <li><strong>IMPORTANT INFORMATION: <u>This is not a teaching session</u>, <u>nor is it supervised</u>. Participants are still responsible for their own safety.  It is up to each participant to decide for themselves who they wish to climb with.</strong></li>';


        $( "#showSession" ).html( sessionDetails );
        $( "#showTnCs" ).html( showTnCs );

      }



  //List all the stored Participants, and creates a new entry field
  function ShowParticipants(){
        var output = '<hr>';
        $.each(participantsArray, function( index, value ) {
          var participant = value.First_Name + ' ' + value.Last_Name;
       var newName = toTitleCase(firstNameLastInital(participant));
       console.log(newName);
          var PName = newName;
          var Reason = value.Reason;
          var FirstTime = value.First_Time;
          var i = index + 1;
              numParticipants = numParticipants + 1;
          var selectMe0 = '',
              selectMe1 = '',
              selectMe2 = '',
              selectMe3 = '';
          var selectMe00 = '',
              selectMe01 = '',
              selectMe02 = '';

          if (Reason === "") {
            selectMe0 = 'selected=""';
            selectMe1 = '';
            selectMe2 = '';
            selectMe3 = '';
            selectMe4 = '';
          } else if (Reason === "Climbing Partner") {
            selectMe0 = '';
            selectMe1 = 'selected=""';
            selectMe2 = '';
            selectMe3 = '';
            selectMe4 = '';
          } else if (Reason === "New") {
            selectMe0 = '';
            selectMe1 = '';
            selectMe2 = 'selected=""';
            selectMe3 = '';
            selectMe4 = '';
          } else if (Reason === "Staff Input") {
            selectMe0 = '';
            selectMe1 = '';
            selectMe2 = '';
            selectMe3 = 'selected=""';
            selectMe4 = '';
          } else if (Reason === "Staff Input") {
            selectMe0 = '';
            selectMe1 = '';
            selectMe2 = '';
            selectMe3 = '';
            selectMe4 = 'selected=""';
          }
          if (FirstTime === "Yes") {
            selectMe01 = 'selected=""';
            selectMe02 = '';
          } else if (FirstTime === "No") {
            selectMe01 = '';
            selectMe02 = 'selected=""';
          }

          output += ' <div class="input-group">';
          output += '  <div class="input-group-prepend">';
          output += '   <label id="ParticipantRow'+i+'" class="input-group-text" for=ParticipantRow'+i+'"">Participant '+i+'</label>';
          output += '  </div>';
          output += '   <input disabled id="ParticipantFirstName'+i+'" type="text" placeholder="'+PName+'" aria-label="Participant First Name" aria-describedby="sizing-addon2" class="row'+i+ ' form-control col-4"/>';
          output += ' <select disabled id="Reason'+i+'" class="row'+i+ ' custom-select">';
          output += "     <option "+ selectMe0 +" value=''>I'm joining the session...</option>";
          output += '     <option '+ selectMe1 +' value="Climbing Partner">I have no climbing partner today</option>';
          output += '     <option '+ selectMe2 +' value="New">I am new to the Castle</option>';
          output += '     <option '+ selectMe3 +' value="Staff Input">for staff input</option>';
          output += '     <option '+ selectMe4 +' value="Other">Other Reasons</option>';
          output += '  </select>';
          output += ' <select disabled id="FirstTime'+i+'" class="row'+i+ ' custom-select">';
          output += '     <option '+ selectMe00 +' value="">First Time?</option>';
          output += '     <option '+ selectMe01 +'  value="Yes">Yes</option>';
          output += '     <option '+ selectMe02 +'  value="No">No</option>';
          output += ' </select>';
          output += ' </div>';
          output += '</div>';


        });
        i = numParticipants+1;

var activeLine = output;

    activeLine += '<hr>';
    activeLine += ' <div class="input-group">';
    activeLine += '  <div class="input-group-prepend">';
    activeLine += '   <label id="ParticipantRow'+i+'" class="input-group-text" for=ParticipantRow'+i+'"">Participant '+i+'</label>';
    activeLine += '  </div>';

    activeLine += '   <input id="ParticipantFirstName'+i+'" type="text" class="form-control" placeholder="First Name" aria-label="Participant First Name" aria-describedby="sizing-addon2" class="row'+i+ ' form-control col-4"/>';

    activeLine += '   <input id="ParticipantLastName'+i+'" type="text" placeholder="Last Name" aria-label="Participant Last Name" aria-describedby="sizing-addon2" class="row'+i+ ' form-control col-4"/>';

    activeLine += ' <select  id="Reason'+i+'" class="row'+i+ ' custom-select">';
    activeLine += "     <option value=''>I'm joining the session...</option>";
    activeLine += '     <option value="Climbing Partner">as I have no climbing partner today</option>';
    activeLine += '     <option value="New">as I am new to the Castle</option>';
    activeLine += '     <option value="Staff Input">for staff input</option>';
    activeLine += '     <option value="Other">Other Reasons</option>';
    activeLine += '  </select>';
    activeLine += ' <select  id="FirstTime'+i+'" class="row'+i+ ' custom-select">';
    activeLine += '     <option value="">First Time?</option>';
    activeLine += '     <option value="Yes">Yes</option>';
    activeLine += '     <option value="No">No</option>';
    activeLine += ' </select>';
    activeLine += ' </div>';
    activeLine += '</div>';
    activeLine += '<br>';
    activeLine += '<a href="/", id="submit" onclick="submitLine();" name="submit" class="btn btn-success" role="button">submit</a>';


          $('#ShowParticipants').html(activeLine);
  }


  function submitLine(){
    console.log('hit');
    participantsArray[i-1]=({
      "First_Name" : $('#ParticipantFirstName'+i).val(),
      "Last_Name" :  $('#ParticipantLastName'+i).val(),
      "Reason": $('#Reason'+i+' option:selected').val(),
      "Arrival_Time": moment().format('HH MM SS'),
      "First_Time": $('#FirstTime'+i+' option:selected').val()
    });

      updateSession();
      location.reload();

  }

// ----------------------------------------- DOM READY ----------------------------------------- //
  $( document ).ready(function() {
      $("#dataProtection").modal('show');
      //Women's Social is only ever Bouldering so hiding to choice.
      $('.form-group#sessionType').hide();
      //Database call to get details of session if already entered.
      getSession();
      ShowParticipants();

      //adds the session information in to the options of the modal, so it makes sence when editing details.
      $('#openFacilitatorModal').on('click',function(){

        var text = document.getElementById('facilitatorName');
        text.value = facilitatorName;
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

      //Input Check
      $('input#facilitatorName').change(function(){
        var value = document.getElementById('facilitatorName').value;
         if (value.length > 2) {
          $('input#BoulderingSession').prop('disabled', false);
          $('input#TopRopeSession').prop('disabled', false);
        } else if (value.length <= 2) {
         $('input#BoulderingSession').prop('disabled', true);
         $('input#TopRopeSession').prop('disabled', true);
       }
      });


      //Sets Bouldering Options
      $('input#BoulderingSession').on('change',function(){
        if ($('input#BoulderingSession').is(":checked")){
          sessionType = $('input#BoulderingSession').val();

          $('#startOptions').html(boulderingAreas);

        }
      });

      //Sets Top Rope Options
      $('input#TopRopeSession').on('change',function(){
        if ($('input#TopRopeSession').is(":checked")){
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


  });


  //----------- DATABASE CALLS ------------//

  //Post request to create the session
  function addSession() {

      createdDate = DateOnly;

      var newSession = {
          'Created_Date': moment().format('MMMM Do YYYY'),
          'Created_Time' : moment().format('HH MM SS'),
          'Facilitator': facilitatorName,
          'Session_Type': sessionType,
          'Start_Location': startLocation,
          'Participants': participantsArray,
      };
      console.log(newSession);
    var myJSON = JSON.stringify(newSession);


        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: myJSON,
            url: 'wbs/addSession',
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
    $.getJSON( '/wbs/getSession', {Created_Date: moment().format('MMMM Do YYYY')}, function(results, res) {
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

                    showSession();
                    ShowParticipants();
                    // updateWWA();

            }
        });
    }



  //Put request to update to Participants, on  pre made sesion
  function updateSession(){
      console.log('UPDATE: ' + moment().format('MMMM Do YYYY'));
      var updates = {
          'FindDate': {Created_Date: moment().format('MMMM Do YYYY')},
          'Created_Date': moment().format('MMMM Do YYYY'),
          'Created_Time' : createdTime,
          'Facilitator': facilitatorName,
          'Session_Type': sessionType,
          'Start_Location': startLocation,
          'Participants': participantsArray
      };

      $.ajax({
        type: "put",
        url: "wbs/updateSession",
        contentType: 'application/json',
        data: JSON.stringify(updates)
      });
    }
