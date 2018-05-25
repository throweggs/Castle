function getList(){
  $.getJSON( '/homepage/forms', function(results, res) {
    })
      .done(function(results, res) {
        var theResults = JSON.stringify(results);
          if (theResults === '[]') {
                FoundSession = false;
        } else {
          createList(results);
        }
    });
}
function createList(results){
    var output = '<center>';
        output += '<div class=" col-12 forms">Please select which form you require:</div>';
        output += '<div id="welcomeForm" class=" forms"></div>';

    $.each(results, function( index, value ) {
        var i = index;
        output += '<a href="/'+ results[i].formLink +'" id="welcomeFormRow" class="col-10 button btn btn-primary btn-lg">'+ results[i].formName +'</a>';
    });
  output +='</center>';
      $('#formList').html(output);
  }

  $(function(){
    getList();
  });
