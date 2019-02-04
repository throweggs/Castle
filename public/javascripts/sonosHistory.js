var trackListData = [],
    theHistory = [];


// DOM Ready =============================================================
$(document).ready(function() {
    getHistory();

    // Visitor name link click
      $('button#refreshTable').on('click', function(){
       getHistory();
     });

    // Button selected oulining
      $().button('toggle');

});

// Functions =============================================================
function getHistory(){
    promiseGetHistory.then(function(results) {
        theHistory = results;
        populateTable();
    });
}

// Fill table with data
function populateTable() {
    // Empty content string
    var tableContent = '';

    $('#ListCount').text(theHistory.length);
      // For each item in our JSON, add a table row and cells to the content string
        $.each(theHistory, function(){
            tableContent += '<tr>';
            tableContent += '<td>' + this.time+ '</td>';
            tableContent += '<td>' + this.roomNames + '</td>';
            tableContent += '<td><img src="' + this.artwork + '" alt="' + this.title + '" height="42" width="42"></td>';
            tableContent += '<td>' + this.title + '</td>';
            tableContent += '<td>' + this.artist + '</td>';
            tableContent += '<td>' + this.album + '</td>';
            tableContent += '<td>' + this.skipCount + '</td>';

              tableContent += '</tr>';
        });

        // Inject the whole content string into our existing HTML table
        $('#trackList table tbody').html(tableContent);
    }
