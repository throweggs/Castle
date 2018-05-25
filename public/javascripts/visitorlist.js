// Visitorlist data array for filling in info box
var visitorListData = [];

// DOM Ready =============================================================
$(document).ready(function() {

    // Populate the user table on initial page load
    populateTable();

    // Visitor name link click
    $('#visitorList table tbody').on('mouseover', 'td a.linkShowVisitor', showVisitorInfo);
    $('#visitorList table tbody').on('click', 'td a.linkShowVisitor', showVisitorInfo);

});



// Functions =============================================================

// Fill table with data
function populateTable() {

  console.log("Populate Tab");

    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON( '/users/visitorlist', function( data ) {

      // Stick our visitor data array into a visitorlist variable in the visitorlist object
      visitorListData = data;

$('#ListCount').text(visitorListData.length);

        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td><a href="#" class="linkShowVisitor" rel="' + this._id + '">' + this.createdDate + '</a></td>';
            tableContent += '<td><a href="#" class="linkShowVisitor" rel="' + this._id + '">' + this.fullName + '</a></td>';
            tableContent += '<td><a href="#" class="linkShowVisitor" rel="' + this._id + '">' + this.reasonForVisit + '</a></td>';
            // tableContent += '<td><a href="#" class="linkdeletevisitor " rel="' + this._id + '">delete</a></td>';
            tableContent += '</tr>';
        });

        // Inject the whole content string into our existing HTML table
        $('#visitorList table tbody').html(tableContent);
    });
  }

// Show Visitor Info
function showVisitorInfo(event) {



    // Prevent Link from Firing
    event.preventDefault();

    // Retrieve fullname from link rel attribute
    var thisFullName = $(this).attr('rel');

    // Get Index of object based on id value
    var arrayPosition = visitorListData.map(function(arrayItem) { return arrayItem._id; }).indexOf(thisFullName);

    // Get our User Object
   var thisVisitorObject = visitorListData[arrayPosition];

   //Populate Info Box
   $('#visitorInfoName').text(thisVisitorObject.fullName);
   $('#visitorInfoContactNumber').text(thisVisitorObject.contactNumber);
   $('#visitorInfoCompanyName').text(thisVisitorObject.companyName);
   $('#visitorInfoSupervisingChild').text(thisVisitorObject.supervisingChild);
   $('#visitorInfoKid1').text(thisVisitorObject.ChildNames.Kid1);
   $('#visitorInfoKid2').text(thisVisitorObject.ChildNames.Kid2);
   $('#visitorInfoKid3').text(thisVisitorObject.ChildNames.Kid3);
   $('#visitorInfoReasonForVisit').text(thisVisitorObject.reasonForVisit);
   $('#visitorInfoOtherReason').text(thisVisitorObject.otherReason);
   $('#visitorInfoDisclaimer').text(thisVisitorObject.disclaimer);

console.log(thisVisitorObject.fullName);
}
