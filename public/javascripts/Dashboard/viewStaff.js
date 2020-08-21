// var tableContent = '',
// table = '',

var teamsNRates = [],
    aNewStaff = true,
    aStaff = [],
    theData = [],
    teamInfo = [],
    teamList = [],
    theTeamUpdates = [],
    staffID = '';

var options = [ 'Team', 'Person'];

  function showTheStaffPage(){

    var theSearch = {};
    if(searchChoice === 'Team'){
      theSearch = {Team_Name: {  $regex: searchText, $options: 'i' }};
    } else if(searchChoice === 'Person'){
      theSearch = {Team_Manager: { $regex: searchText, $options: 'i' }};
    }
        // jQuery AJAX call for JSON
        $.getJSON( '/staff/getTeams', function( results, res ) {
        })
          .done(function(results, res) {

          getStaffMembers();

        });

  }

function addHeaders(){
  $.getJSON( '/staff/getTeams', {}, function(results, res) {
  })
    .done(function(results, res) {
      teamList = results;
      $.each(results,function(i,team){
      $('#StaffMembersTable >thead tr').append('<th> '+team.Team_Name+'</th>');
      });

    });
}



function insertStaff(member) {

  staffID = member._id;
  name = member.Full_Name;
  pin = member.Pin;
  teams = member.Teams;
          var table = document.getElementById("StaffMembersTableBody");



          var staffRow = table.insertRow(-1);
                staffRow.id = staffID;
          var teamsCellToggle = staffRow.insertCell(-1);
                teamsCellToggle.className = 'toggle-row UpdateStaff';
                teamsCellToggle.id = staffID;
                teamsCellToggle.innerHTML = '<a  class="UpdateStaff" href="#" id="'+staffID+'"><i class="UpdateStaff fas fa-edit fa-1x"id="'+staffID+'"></i></a>';
          var activeCell = staffRow.insertCell(-1);
            if(member.Active_Staff_Member === true){
                activeCell.innerHTML = '<i class="far fa-check-square"></i>';
              } else {
                activeCell.innerHTML = '<i class="far fa-square"></i>';
              }
          var adminCell = staffRow.insertCell(-1);
            if(member.Super_Admin === true){
                adminCell.innerHTML = '<i class="far fa-check-square"></i>';
              } else {
                adminCell.innerHTML = '<i class="far fa-square"></i>';
              }
          var nameCell = staffRow.insertCell(-1);
                nameCell.innerHTML = name;
          var pinCellToggle = staffRow.insertCell(-1);
                pinCellToggle.innerHTML = '<a class="hidetext" id="'+staffID+'_Pin">'+pin+'</a>';



            $.each(teams,function(i,team){
              var teamsCell = staffRow.insertCell(-1);
                 if(team.pay === 'Hourly'){
                 teamsCell.innerHTML = '<i class="fas fa-money-bill-wave"></i>&ensp; £<b>' + team.rate + '</b>';
                 } else if(team.pay === 'Contracted'){
                   teamsCell.innerHTML = '<i class="fas fa-file-contract"></i>';
                 } else {
                    teamsCell.innerHTML = '<i class="fas fa-times"></i>';
                 }

              if(team.admin === true){
                if(teamsCell.innerHTML === '-'){
                teamsCell.innerHTML = '<i class="fas fa-user-cog"></i>';
                } else {
                  teamsCell.innerHTML = teamsCell.innerHTML + '&ensp;<i class="fas fa-user-cog"></i>';
                }
              }
         });



staffID = '';

}


//DB CALLS=============================


//Post request to add Staff Member
function addStaff() {

  var selectedTeam = [];
  var payVal = '';
  var payRate = '';
$.each(teamInfo, function(i, team){
    payVal = $('input[name=inlineRadioOptions_'+team._id+']:checked').val();

    if(payVal === 'Hourly'){
        payRate = $('#rates_'+team._id).val();

          if(payRate!==''){
            payRate = payRate.split('£');
            payRate = payRate[1];
            } else {
            alert('You have selected the hourly option, but not an hourly rate.');
            payrate = '';
          }
        }


  selectedTeam[i] = {
    team: team._id,
    pay: payVal,
    rate: payRate,
    admin: $('#admin_'+team._id).prop('checked')
                  };

});


    var staffMember = {
      Created: {
         Created: moment(),
         Created_Date: moment().format('L'),
         Created_Time : moment().format('LT'),
                },
      Full_Name: $('input#firstNameInput').val() + ' ' + $('input#lastNameInput').val(),
      Name: {
          First: $('input#firstNameInput').val(),
          Last : $('input#lastNameInput').val()
            },
      Pin: $('input#pinInput').val(),
      Present: false,
      Super_Admin : $('input[id=superAdmin]').prop('checked'),
      Active_Staff_Member : $('input[id=activeStaff]').prop('checked'),
      Teams : selectedTeam,
      Access_Rights : [
        {Name :  'Feedback', Permission : $('input[id=Feedback]').prop('checked')},
        {Name :  'Visitors', Permission : $('input[id=Visitors]').prop('checked')},
        {Name :  'NCC', Permission : $('input[id=NCC]').prop('checked')},
        {Name :  'Groups', Permission : $('input[id=Groups]').prop('checked')},
        {Name :  'WBS', Permission : $('input[id=WBS]').prop('checked')},
        {Name :  'TheSession', Permission : $('input[id=TheSession]').prop('checked')},
        {Name :  'TW', Permission :  $('input[id=TW]').prop('checked')},
        {Name :  'Gardeners', Permission : $('input[id=Gardeners]').prop('checked')},
        {Name :  'PersonalTrainer', Permission : $('input[id=PersonalTrainer]').prop('checked')},
        {Name :  'Lockers', Permission : $('input[id=Lockers]').prop('checked')},
      ]
    };

  var myJSON = '';


if(aNewStaff === true){
  console.log('new staff');
    $.ajax({
      type: "Post",
      url: "staff/addStaff",
      contentType: 'application/json',
      data: JSON.stringify(staffMember),
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

} else {

  staffMember.FindMe = $('h1#modalStaffID').val();
  console.log(staffMember.FindMe);
    $.ajax({
        type: 'put',
        data: JSON.stringify(staffMember),
        url: 'staff/updateAStaff',
        dataType: 'JSON',
        contentType: 'application/json',
    }).done(function( response, results ) {
      console.log(results);

        // Check for successful (blank) response
        if (results === 'success') {
          staffID = '';
          window.location.reload(true);
            resetPage();
        }
        else {
            // If something goes wrong, alert the error message that our service returned
            alert('Error: ' + response.msg);

        }

    });

  }

staffID = '';
window.location.reload();
  resetPage();
}


//Get request for session
function getAStaff(staffID){

  $.getJSON( '/staff/getAStaff', {_id: staffID }, function(results, res) {
    })
    .done(function(results, res) {
          var theResults = JSON.stringify(results);
            if (theResults === '[]') {

          } else {

          }

      aStaff = results;
      });


  }

function clearModal(){

    $(this).removeData('bs.modal');
    console.log(this);
    console.log('cleared');
    resetPage();
};

//Get Staff Members Files
function getStaffMembers() {
$("#StaffMembersTableBody").empty();
    // jQuery AJAX call for JSON
    $.getJSON( '/staff/getStaff', function( data ) {
theData = data;

    $.each(data, function(i, member){


        insertStaff(member);

    });
  });
}


$('body').on('hidden.bs.modal', '.modal', function () {
        $(this).removeData('bs.modal');
        console.log('cleared');
        resetPage();
        window.location.reload();
      });



//DOM watch==============================

//DOM ready
$(document).ready(function() {


  showTheStaffPage();
  addHeaders();
});

//DOM mouse over
$(document).mouseover(function() {

  //Show Pin
  if(event.target.className === 'hidetext'){
      var theID = event.target.id;
      document.getElementById(theID).classList.remove("hidetext");
      document.getElementById(theID).classList.add("showtext");
  }

});

//DOM mouse out
$(document).mouseout(function() {
  //Hide Pin
  if(event.target.className === 'showtext'){
      var theID = event.target.id;
      document.getElementById(theID).classList.remove("showtext");
      document.getElementById(theID).classList.add("hidetext");
  }




});

//DOM click
$(document).on('click',function() {
//Show teams


      if ($(event.target).hasClass('UpdateStaff') === true){
        aNewStaff = false;
        staffID = event.target.id;
        console.log(staffID);

        var staffMemeber = [];
        var theTeams = '';
        var staffsTeams = [];

        $.getJSON( '/staff/getAStaff', {_id: staffID }, function(results, res) {
          $('#addStaffModal').modal('show');
          $('#addStaffModal').on('shown.bs.modal', function () {
            $('#firstNameInput').trigger('focus');
          });
          })
          .done(function(getAStaffresults, res) {

                staffMember = getAStaffresults;
                staffsTeams = staffMember[0].Teams;
                $('#modalStaffID').val(staffID);
                $('#addStaffModalLongTitle').text('Update Staff');
                $('#firstNameInput').val(staffMember[0].Name.First);
                $('#lastNameInput').val(staffMember[0].Name.Last);
                $('#pinInput').val(staffMember[0].Pin);
                document.getElementById("superAdmin").checked = staffMember[0].admin;


                $.each(staffMember[0].Access_Rights, function(i,area){
                  var accessName = area.Name;
                  document.getElementById(accessName).checked = area.Permission;
                });


            $.getJSON( '/staff/getTeams', {}, function(results, res) {
              teamInfo = results;

              })
              .done(function(teamInfo, res) {
                    teamInfo = teamInfo;
                    $.each(teamInfo,function(i, team){
                        var checkNIT = '',
                            checkHourly = '',
                            checkContracted = '',
                            checkAdmin = '',
                            hourlyRate = '';
                        var theRate = '',
                            isSelected = '';
                        var showMe = 'style="display:none;"';

                      $.each(staffMember[0].Teams,function(ii, staffTeam){

                        if(team._id === staffTeam.team){
                        theRate = staffTeam.rate;
                          if(staffTeam.pay === 'Not In Team'){
                             checkNIT = 'checked';
                          } else if(staffTeam.pay === 'Hourly'){
                             checkHourly = 'checked';
                             showMe = 'style="display:show;"';
                          } else if(staffTeam.pay === 'Contracted'){
                             checkContracted = 'checked';
                          }
                          if(staffTeam.admin === true){
                            checkAdmin = 'checked';
                          }

                        }
                      });

                          theTeams +=   '<span><h5>'+team.Team_Name+':  &ensp; ('+team.Team_Manager+')</h5></span>';
                          theTeams += '<div class="input-group">';
                          theTeams +=   '<div class="custom-control custom-radio custom-control-inline">';
                          theTeams +=   '  <input type="radio" class="custom-control-input" id="pay1_'+team._id+'" name="inlineRadioOptions_'+team._id+'" value="Not In Team" '+checkNIT+'>';
                          theTeams +=   '  <label class="custom-control-label" for="pay1_'+team._id+'">Not In Team</label>';
                          theTeams +=   '</div>';

                          theTeams +=   '<div class="custom-control custom-radio custom-control-inline">';
                          theTeams +=   '  <input type="radio" class="hourly custom-control-input" id="pay2_'+team._id+'" name="inlineRadioOptions_'+team._id+'" value="Hourly" '+checkHourly+'>';
                          theTeams +=   '  <label class="custom-control-label" for="pay2_'+team._id+'">Hourly</label>';
                          theTeams +=   '</div>';

                          theTeams +=   '<div class="custom-control custom-radio custom-control-inline">';
                          theTeams +=   '  <input type="radio" class="custom-control-input" id="pay3_'+team._id+'" name="inlineRadioOptions_'+team._id+'" value="Contracted" '+checkContracted+'>';
                          theTeams +=   '  <label class="custom-control-label" for="pay3_'+team._id+'">Contracted &ensp; &ensp;</label>';
                          theTeams +=   '</div>';

                          theTeams +=   '<div class="custom-control custom-checkbox">';
                          theTeams +=   '  <input type="checkbox" class="custom-control-input" name="admin_'+team._id+'" id="admin_'+team._id+'" value="Admin" '+checkAdmin+'>';
                          theTeams +=   '  <label class="custom-control-label" for="admin_'+team._id+'"> Team Admin</label>';
                          theTeams +=   '</div>';
                          theTeams +=   '</div>';

                          theTeams +=   '<select class="custom-select custom-control-inline" id="rates_'+team._id+'" required required ' +showMe+'>';
                          theTeams +=   '  <option disabled selected>Choose Hourly Rate</option>';

                                        $.each(team.Team_Rates, function(i,rate){



                                          if(rate === theRate){

                                                isSelected = 'selected';

                                          } else {


                                          isSelected = '';
                                          }
                                          if(rate === 'Not In Team' || rate === 'NA'){
                                          } else {
                                          rate = '£' + rate;
                                          }
                                            theTeams += '<option '+ isSelected+'>'+rate+'</option>';
                                        });
                          theTeams +=   '</select>';
                          theTeams +=   '<hr>';

                        });

                    $('#TeamList').html(theTeams);


              });



            });

  }


    //Update Staff Member
    if ($(event.target).hasClass('updateRate') === true){

      var theID = event.target.id.split("_");

      var staffID = theID[0];
      var staffid = '#'+theID[0];
      var theTeam = theID[1];
      var theTeamID = theID[2];

      var optSel =  $(staffid+'_'+theTeam+' option:selected').val();


      updateAStaff(staffID,optSel,theTeam,theTeamID);


    }

    if (event.target.id === 'staffModal'){
  if ($(event.target).hasClass('newStaff') === true){
    aNewStaff = true;
  };


          $.getJSON( '/staff/getTeams', {}, function(results, res) {


            })
            .done(function(results, res) {
                theTeams = '';
                teamInfo = results;
                  $.each(results,function(i, team){


                    theTeams +=   '<span><h5>'+results[i].Team_Name+':  &ensp; ('+results[i].Team_Manager+')</h5></span>';
                    theTeams += '<div class="input-group">';
                    theTeams +=   '<div class="custom-control custom-radio custom-control-inline">';
                    theTeams +=   '  <input type="radio" class="custom-control-input" id="pay1_'+results[i]._id+'" name="inlineRadioOptions_'+results[i]._id+'" value="Not In Team" checked>';
                    theTeams +=   '  <label class="custom-control-label" for="pay1_'+results[i]._id+'">Not In Team</label>';
                    theTeams +=   '</div>';

                    theTeams +=   '<div class="custom-control custom-radio custom-control-inline">';
                    theTeams +=   '  <input type="radio" class="hourly custom-control-input" id="pay2_'+results[i]._id+'" name="inlineRadioOptions_'+results[i]._id+'" value="Hourly">';
                    theTeams +=   '  <label class="custom-control-label" for="pay2_'+results[i]._id+'">Hourly</label>';
                    theTeams +=   '</div>';

                    theTeams +=   '<div class="custom-control custom-radio custom-control-inline">';
                    theTeams +=   '  <input type="radio" class="custom-control-input" id="pay3_'+results[i]._id+'" name="inlineRadioOptions_'+results[i]._id+'" value="Contracted">';
                    theTeams +=   '  <label class="custom-control-label" for="pay3_'+results[i]._id+'">Contracted &ensp; &ensp;</label>';
                    theTeams +=   '</div>';

                    theTeams +=   '<div class="custom-control custom-checkbox">';
                    theTeams +=   '  <input type="checkbox" class="adminBox custom-control-input" name="admin_'+results[i]._id+'" id="admin_'+results[i]._id+'" value="Admin">';
                    theTeams +=   '  <label class="custom-control-label" for="admin_'+results[i]._id+'"> Team Admin</label>';
                    theTeams +=   '</div>';
                    theTeams +=   '</div>';

                    theTeams +=   '<select class="custom-select custom-control-inline" id="rates_'+results[i]._id+'" required style="display:none;">';
                    theTeams +=   '  <option disabled selected>Choose Hourly Rate</option>';
                                            $.each(team.Team_Rates, function(i,rate){
                                                theTeams += '<option>'+rate+'</option>';
                                            });
                    theTeams +=   '</select>';
                    theTeams +=   '<hr>';




                  });

                  $('#TeamList').html(theTeams);

                  $.each(staffsTeams, function(i, team){
                      document.getElementById('rates_'+team.team).selectedIndex = team.rate;
                  });


            });


    }

    //Update Staff Member
    if ($(event.target).hasClass('custom-control-input') === true){
        var theID = event.target.id;
        var theTeam = theID.split('_');
        var payType = $('#pay2_'+theTeam[1]).prop('checked');
      if (payType){
        $('#rates_'+theTeam[1]).show();
    } else {
        $('#rates_'+theTeam[1]).hide();
       }

    }

});
