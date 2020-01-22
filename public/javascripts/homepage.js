var showLoading = '<center>';
    showLoading += '<i class="fa fa-cog fa-spin" style="font-size:200px; color: Grey"></i>';
    showLoading += '</center>';


function buttonClicked(link) {
  console.log('click');
  var a = new Audio('/click.wav');
  a.play();
  $('#formList').html(showLoading);
  setTimeout(
    function()
    {
      location.href = link;
    }, 1000);


}

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
        // output += '<div class="love-ya col-12 forms"><h1>Please select which form you require</h1></div>';
        output += '<div id="welcomeForm" class=" forms"></div>';

    $.each(results, function( index, value ) {
        var i = index;
        var theLink = "'/"+results[i].formLink+"'"
        output += '<a onclick="buttonClicked('+theLink +')" id="welcomeFormRow" onclick="playAudio()" class="col-10 btn-homepage button btn '+ results[i].colour +' btn-lg">'+ results[i].formName +'</a>';
      });
  output +='</center>';
      $('#formList').html(output);
  }

  $(function(){ // this will be called when the DOM is ready



      $( document ).ready(function() {

    getList();
      });


  });
  //
  // $(document).ready(function() {
  //   console.log('load click');
  //         var obj = document.createElement("audio");
  //         obj.src="/click.wav";
  //         obj.volume=1;
  //         obj.autoPlay=true;
  //         obj.preLoad=true;
  //
  //         $(document).on("click", function () {
  //           console.log('play click');
  //             obj.play();
  //         });
  //     });
