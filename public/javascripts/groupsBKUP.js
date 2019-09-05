  $( document ).ready(function() {
    // $("#dataProtection").modal('show');
    $('.btn-group').on('click', '.btn', function() {
      $(this).addClass('active').siblings().removeClass('active');
    });
    $('.btn-agree').on('click', function() {
      console.log('agree');
      $(this).addClass('btn-primary').removeClass('btn-outline-primary');
    });

    $('button#save').click(function(){
      var theForm = {
                      FindMe :  $('#groupID').val(),
                      Group : {
                              Agreement :$('button#groupLeaderAgreement').hasClass('btn-primary'),
                              Name : $('#groupName').text(),
                              Date : $('#groupDate').text(),
                              Leader : {
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

    console.log(theForm);
    });

  });
