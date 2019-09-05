function insertValues(theGroup){
  console.log(theGroup)
  $('#theID').val(theGroup._id);
  $('#groupName').val(theGroup.Group.Name);
  $('#groupDate').val(moment(theGroup.Group.Date).format('YYYY-MM-DD'));


  //--------------
  //GROUP LEADER
  //--------------
  if(theGroup.Group.Leader.Agreement == true){
    $('button#groupLeaderAgreement').removeClass('btn-outline-primary').addClass('btn-primary');
  } else {
    $('button#groupLeaderAgreement').addClass('btn-outline-primary').removeClass('btn-primary');
  }

$('#glName').val(theGroup.Group.Leader.Name);
$('#glOrg').val(theGroup.Group.Leader.Org);
$('#glAdd1').val(theGroup.Group.Leader.Address[0]);
$('#glAdd2').val(theGroup.Group.Leader.Address[1]);
$('#glAdd3').val(theGroup.Group.Leader.Address[2]);
$('#glPC').val(theGroup.Group.Leader.Address[3]);

//--------------
//PARTICIPANTS
//--------------
$('#NewParticipantFirstName1').val(theGroup.Participants[0].Name[0]);
$('#NewParticipantLastName1').val(theGroup.Participants[0].Name[1]);
$('#Age1').val(theGroup.Participants[0].Age);
$('#MCID1').val(theGroup.Participants[0].Med_Con);

$('#NewParticipantFirstName2').val(theGroup.Participants[1].Name[0]);
$('#NewParticipantLastName2').val(theGroup.Participants[1].Name[1]);
$('#Age2').val(theGroup.Participants[1].Age);
$('#MCID2').val(theGroup.Participants[1].Med_Con);

$('#NewParticipantFirstName3').val(theGroup.Participants[2].Name[0]);
$('#NewParticipantLastName3').val(theGroup.Participants[2].Name[1]);
$('#Age3').val(theGroup.Participants[2].Age);
$('#MCID3').val(theGroup.Participants[2].Med_Con);

$('#NewParticipantFirstName4').val(theGroup.Participants[3].Name[0]);
$('#NewParticipantLastName4').val(theGroup.Participants[3].Name[1]);
$('#Age4').val(theGroup.Participants[3].Age);
$('#MCID4').val(theGroup.Participants[3].Med_Con);

$('#NewParticipantFirstName5').val(theGroup.Participants[4].Name[0]);
$('#NewParticipantLastName5').val(theGroup.Participants[4].Name[1]);
$('#Age5').val(theGroup.Participants[4].Age);
$('#MCID5').val(theGroup.Participants[4].Med_Con);

$('#NewParticipantFirstName6').val(theGroup.Participants[5].Name[0]);
$('#NewParticipantLastName6').val(theGroup.Participants[5].Name[1]);
$('#Age6').val(theGroup.Participants[5].Age);
$('#MCID6').val(theGroup.Participants[5].Med_Con);

$('#NewParticipantFirstName7').val(theGroup.Participants[6].Name[0]);
$('#NewParticipantLastName7').val(theGroup.Participants[6].Name[1]);
$('#Age7').val(theGroup.Participants[6].Age);
$('#MCID7').val(theGroup.Participants[6].Med_Con);

$('#NewParticipantFirstName8').val(theGroup.Participants[7].Name[0]);
$('#NewParticipantLastName8').val(theGroup.Participants[7].Name[1]);
$('#Age8').val(theGroup.Participants[7].Age);
$('#MCID8').val(theGroup.Participants[7].Med_Con);

$('#NewParticipantFirstName9').val(theGroup.Participants[8].Name[0]);
$('#NewParticipantLastName9').val(theGroup.Participants[8].Name[1]);
$('#Age9').val(theGroup.Participants[8].Age);
$('#MCID9').val(theGroup.Participants[8].Med_Con);


//--------------
//INSTRUCTOR DUTIES
//--------------
    if(theGroup.Instructor.Agreement == true){
      $('button#instructorAgreement').addClass('btn-primary').removeClass('btn-outline-primary');
    } else {
        $('button#instructorAgreement').removeClass('btn-primary').addClass('btn-outline-primary');
    }

    if(theGroup.Instructor.Checked_Details == true){
      $('button#checkedDetailsYes').addClass('active');
      $('button#checkedDetailsNo').removeClass('active');
    } else {
      $('button#checkedDetailsYes').removeClass('active');
      $('button#checkedDetailsNo').addClass('active');
    }

    if(theGroup.Instructor.Takes_Responsibility == true){
       $('button#responsibilityYes').addClass('active');
       $('button#responsibilityNo').removeClass('active');
    } else {
      $('button#responsibilityYes').removeClass('active');
      $('button#responsibilityNo').addClass('active');
    }

    $('#instructorsName').val(theGroup.Instructor.Name);


    //--------------
    //RECEPTIONIST DUTIES
    //--------------
    if(theGroup.Receptionist.Agreement == true){
      $('button#receptionistAgreement').addClass('btn-primary').removeClass('btn-outline-primary');
    } else {
      $('button#receptionistAgreement').removeClass('btn-primary').addClass('btn-outline-primary');
    }

    if(theGroup.Receptionist.Checked_Instructor_Reg_File == true){
           $('button#intructiorRegFormYes').addClass('active');
           $('button#intructiorRegFormNo').removeClass('active');
    } else {
      $('button#intructiorRegFormNo').addClass('active');
      $('button#intructiorRegFormYes').removeClass('active');
    }

    if(theGroup.Receptionist.Checked_Participants_Details == true){
       $('button#fullyCompletedYes').addClass('active');
       $('button#fullyCompletedNo').removeClass('active');
    } else {
      $('button#fullyCompletedNo').addClass('active');
      $('button#fullyCompletedYes').removeClass('active');
    }

    if(theGroup.Receptionist.Checked_Instructor_Details == true){
       $('button#instructorCompletedYes').addClass('active');
       $('button#instructorCompletedNo').removeClass('active');
    } else {
      $('button#instructorCompletedNo').addClass('active');
      $('button#instructorCompletedYes').removeClass('active');
    }

    $('#receptionistName').val(theGroup.Receptionist.Name);
}

function clearModal(){
  var theForm = {
                  FindMe : '',
                  Group : {

                          Name : '',
                          Date : 'YYYY-MM-DD',
                          Leader : {
                                    Agreement :false,
                                    Name : '',
                                    Org : '',
                                    Address : [],
                                 },
                        },
                Participants : [
                                {
                                Name : [ ],
                                Age : '',
                                Med_Con : '',
                                },
                                {
                                Name : [],
                                Age : '',
                                Med_Con :'',
                                },
                                {
                                Name : [],
                                Age : '',
                                Med_Con : '',
                                },
                                {
                                Name : [],
                                Age : '',
                                Med_Con : '',
                                },
                                {
                                Name : [],
                                Age : '',
                                Med_Con : '',
                                },
                                {
                                Name : [],
                                Age : '',
                                Med_Con : '',
                                },
                                {
                                Name : [],
                                Age : '',
                                Med_Con : '',
                                },
                                {
                                Name : [],
                                Age : '',
                                Med_Con : '',
                                },
                                {
                                Name : [],
                                Age : '',
                                Med_Con : '',
                              }
                            ],
            Instructor : {
                          Agreement :false,
                          Checked_Details :'',
                          Takes_Responsibility :'',
                          Name :'',
                        },
          Receptionist : {
                        Agreement :false,
                        Checked_Instructor_Reg_File : '',
                        Checked_Participants_Details : '',
                        Checked_Instructor_Details : '',
                        Name : '',
                      },
                  }
  insertValues(theForm);
}

function getData(theForm){
  var theForm = {
                  FindMe :  $('#theID').val(),
                  Group : {

                          Name : $('#groupName').val(),
                          Date : moment($('#groupDate').val()),
                          Leader : {
                                    Agreement :$('button#groupLeaderAgreement').hasClass('btn-primary'),
                                    Name : $('#glName').val(),
                                    Org : $('#glOrg').val(),
                                    Address : [
                                               $('#glAdd1').val(),
                                               $('#glAdd2').val(),
                                               $('#glAdd3').val(),
                                               $('#glPC').val()
                                             ],
                                 },
                        },
                Participants : [
                                {
                                Name : [  $('#NewParticipantFirstName1').val(), $('#NewParticipantLastName1').val()],
                                Age : $('#Age1').val(),
                                Med_Con : $('#MCID1').val()
                                },
                                {
                                Name : [$('#NewParticipantFirstName2').val(),  $('#NewParticipantLastName2').val()],
                                Age : $('#Age2').val(),
                                Med_Con : $('#MCID2').val()
                                },
                                {
                                Name : [$('#NewParticipantFirstName3').val(), $('#NewParticipantLastName3').val()],
                                Age : $('#Age3').val(),
                                Med_Con : $('#MCID3').val()
                                },
                                {
                                Name : [$('#NewParticipantFirstName4').val(), $('#NewParticipantLastName4').val()],
                                Age : $('#Age4').val(),
                                Med_Con : $('#MCID4').val()
                                },
                                {
                                Name : [$('#NewParticipantFirstName5').val(), $('#NewParticipantLastName5').val()],
                                Age : $('#Age5').val(),
                                Med_Con : $('#MCID5').val()
                                },
                                {
                                Name : [$('#NewParticipantFirstName6').val(), $('#NewParticipantLastName6').val()],
                                Age : $('#Age6').val(),
                                Med_Con : $('#MCID6').val()
                                },
                                {
                                Name : [$('#NewParticipantFirstName7').val(), $('#NewParticipantLastName7').val()],
                                Age : $('#Age7').val(),
                                Med_Con : $('#MCID7').val()
                                },
                                {
                                Name : [$('#NewParticipantFirstName8').val(), $('#NewParticipantLastName8').val()],
                                Age : $('#Age8').val(),
                                Med_Con : $('#MCID8').val()
                                },
                                {
                                Name : [$('#NewParticipantFirstName9').val(), $('#NewParticipantLastName9').val()],
                                Age : $('#Age9').val(),
                                Med_Con : $('#MCID9').val()
                              }
                            ],
            Instructor : {
                          Agreement : $('button#instructorAgreement').hasClass('btn-primary'),
                          Checked_Details : $('button#checkedDetailsYes').hasClass('active'),
                          Takes_Responsibility : $('button#responsibilityYes').hasClass('active'),
                          Name : $('#instructorsName').val()
                        },
          Receptionist : {
                        Agreement : $('button#receptionistAgreement').hasClass('btn-primary'),
                        Checked_Instructor_Reg_File : $('button#intructiorRegFormYes').hasClass('active'),
                        Checked_Participants_Details : $('button#fullyCompletedYes').hasClass('active'),
                        Checked_Instructor_Details : $('button#instructorCompletedYes').hasClass('active'),
                        Name : $('#receptionistName').val()
                      },
                  }
  return theForm;
}

function viewGroup(theID){
  console.log(theID);
  //Get request for session
  var getID = theID.split("_")[0];
  var theField = theID.split("_")[1];

    $.getJSON( '/groups/getAGroup', {_id: getID }, function(results, res) {
      })
      .done(function(results, res) {
        var theGroup = results[0];
                  console.log(results);
                  insertValues(theGroup);
        $('#createGroupModal').modal('show');



    });
}

function getGroups(){
              $.getJSON( '/groups/getGroups', function( data ) {
                })
                  .done(function( groups ) {

                  groups.forEach(function(group){

                    addGroupRow(group);
                });

            });
  }

function addGroup(theForm){
//Post request to create the session

                  var myJSON = JSON.stringify(theForm);


                    // Use AJAX to post the object to our adduser service
                    $.ajax({
                        type: 'POST',
                        data: myJSON,
                        url: 'groups/addGroup',
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

function addGroupRow(group){
  var theID = "'"+group._id+"_id'";
var viewGroup = '"viewGroup('+theID+');"';
var onClick = 'onClick='+viewGroup;

var participants = group.Participants,
    participantsCount = 0;
    participants.forEach(function(participant){
        if(participant.Name[0].length>1){
          participantsCount++;
        }
    });

                var table = document.getElementById("groupTableBody");
                var groupRow = table.insertRow(-1);
                      groupRow.id =  group._id + '_groupRow';
                      groupRow.className = 'groupRow'
                var groupDate = groupRow.insertCell(-1);
                      groupDate.innerHTML = moment(group.Group.Date).format('L');
                var groupName = groupRow.insertCell(-1);
                      groupName.innerHTML = group.Group.Name;
                var groupLeader = groupRow.insertCell(-1);
                      groupLeader.innerHTML = group.Group.Leader.Name;
                var groupInstructor = groupRow.insertCell(-1);
                      groupInstructor.innerHTML = group.Instructor.Name;
                var groupParticipants = groupRow.insertCell(-1);
                      groupParticipants.innerHTML = participantsCount;
                var viewGroupButton = groupRow.insertCell(-1);
                      viewGroupButton.innerHTML = '<button id="viewGroup" type="button" class="btn btn-sm btn-outline-primary view" '+onClick+'>View</button>'
}

function updateAGroup(group){
  var theForm = getData(theForm);


  console.log(theForm.FindMe);
    $.ajax({
        type: 'put',
        data: JSON.stringify(theForm),
        url: 'groups/updateAGroup',
        dataType: 'JSON',
        contentType: 'application/json',
    }).done(function( response, results ) {
      console.log(results);

        // Check for successful (blank) response
        if (results === 'success') {
            $('tbody#groupTableBody').html('');
            getGroups();
            $('#createGroupModal').modal('hide');
        }
        else {
            // If something goes wrong, alert the error message that our service returned
            alert('Error: ' + response.msg);

        }

    });
}

function duplicateGroup(){
    var theForm = getData(theForm);
      $('#createGroupModal').modal('hide');
      $('button#groupSubmit').show();
      $('button#duplicateGroupForm').hide();
      $('button#updateGroupForm').hide();
      setTimeout(
            function()
              {
                $('#createGroupModal').modal('show');
                insertValues(theForm);
                $('input#groupDate').val(moment().format('YYYY-MM-DD'));
              }, 2000);




  }

$( document ).click(function(e){
  if(e.target.id == 'viewGroup'){
  $('button#groupSubmit').hide();
  $('button#duplicateGroupForm').show();
  $('button#updateGroupForm').show();
} else if(e.target.id == 'createGroup'){
  $('input#groupDate').val(moment().format('YYYY-MM-DD'));
  $('button#groupSubmit').show();
  $('button#duplicateGroupForm').hide();
  $('button#updateGroupForm').hide();
}
});

$( document ).ready(function() {
  // $("#dataProtection").modal('show');
  getGroups();

//On new group submit gather and store information
  $('button#groupSubmit').click(function(){
    var theForm = getData(theForm);
    addGroup(theForm);
  });


  $('.btn-group').on('click', '.btn', function() {
    $(this).addClass('active').siblings().removeClass('active');
  });
  $('.btn-agree').on('click', function() {
    $(this).addClass('btn-primary').removeClass('btn-outline-primary');
  });

  $('button#save').click(function(){
    addGroup(theForm);
  });

  $('#createGroupModal').on('hidden.bs.modal', function (e) {
    clearModal();
  });

});
