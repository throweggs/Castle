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
        output += '<div class="love-ya col-12 forms"><h1>Please select which form you require:</h1></div>';
        output += '<div id="welcomeForm" class=" forms"></div>';

    $.each(results, function( index, value ) {
        var i = index;
        output += '<p><a href="/'+ results[i].formLink +'" id="welcomeFormRow" class="col-10 button btn '+ results[i].colour +' btn-lg">'+ results[i].formName +'</a></p>';
    });
  output +='</center>';
      $('#formList').html(output);
  }

  $(function(){ // this will be called when the DOM is ready

      $( document ).ready(function() {
    getList();
      });


  });
