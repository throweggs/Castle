// moment.locale('en-GB'); ?

var checksOut = false;
var darkMode = true;
function toTitleCase(str) {
    return str.replace(/(?:^|\s)\w/g, function(match) {
        return match.toUpperCase();
    });
}

(function (global) {

    if(typeof (global) === "undefined") {
        throw new Error("window is undefined");
    }

    var _hash = "!";
    var noBackPlease = function () {
        global.location.href += "#";

        // making sure we have the fruit available for juice (^__^)
        global.setTimeout(function () {
            global.location.href += "!";
        }, 50);
    };

    global.onhashchange = function () {
        if (global.location.hash !== _hash) {
            global.location.hash = _hash;
        }
    };

    global.onload = function () {
        noBackPlease();

        // disables backspace on page except on input fields and textarea..
        document.body.onkeydown = function (e) {
            var elm = e.target.nodeName.toLowerCase();
            if (e.which === 8 && (elm !== 'input' && elm  !== 'textarea')) {
                e.preventDefault();
            }
            // stopping event bubbling up the DOM tree..
            e.stopPropagation();
        };
    };

})(window);


// function toTitleCase(str) {
//         return str.replace(
//             /\w\S*/g,
//             function(txt) {
//                 return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
//             }
//         );
//     }


function switchStyle(){

         if(darkMode===true){
          document.getElementById("pagestyle").setAttribute("href", "/stylesheets/bootstrapLight.min.css");
          document.getElementById("customstyle").setAttribute("href", "/stylesheets/lightStyle.css");
          darkMode = false;


        } else if(darkMode===false){
          document.getElementById("pagestyle").setAttribute("href", "/stylesheets/bootstrap.min.css");
          document.getElementById("customstyle").setAttribute("href", "/stylesheets/darkStyle.css");
          darkMode = true;

        }
      }


function resetPage() {
    location.reload();

}
//create Exportable table
jQuery.fn.tableToCSV = function() {

    var clean_text = function(text){
        text = text.replace(/"/g, '""');
        return '"'+text+'"';
    };

	$(this).each(function(){
			var table = $(this);
			var caption = $(this).find('caption').text();
			var title = [];
			var rows = [];

			$(this).find('tr').each(function(){
				var data = [];
				$(this).find('th').each(function(){
                    var text = clean_text($(this).text());
					title.push(text);
					});
				$(this).find('td').each(function(){
                    var text = clean_text($(this).text());
					data.push(text);
					});
				data = data.join(",");
				rows.push(data);
				});
			title = title.join(",");
			rows = rows.join("\n");

			var csv = title + rows;
			var uri = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
			var download_link = document.createElement('a');
			download_link.href = uri;
			var ts = new Date().getTime();
			if(caption===""){
				download_link.download = ts+".csv";
			} else {
				download_link.download = caption+"-"+ts+".csv";
			}
			document.body.appendChild(download_link);
			download_link.click();
			document.body.removeChild(download_link);
	});

};

function toTitleCase(str) {
    return str.replace(
        /\w\S*/g,
        function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}

function firstNameLastInital(str) {
  var theName = str;
  var lastName = '';
  theName = theName.split(" ");

  if (theName.length >= 2){
     lastName = theName.slice(-1)[0];
      lastName = lastName.charAt(0) + ',';
  } if (theName.length < 2) {
     lastName = '';
  }
  return theName[0] + ' ' + lastName;
}

//Gets the information from the instructor for WWA and theSession, to create the session
function createSession(){
  output='form#addFacilitator.container-fluid.SessionDetails(name="addFacilitator", method="post", onlcick="addFacilitator()")';
  output+='  .input-group';
  output+='    span#Facilitator.col-2.input-group-addon Facilitator';
  output+='    input#FacilitatorsName.form-control.col-4(type="text", placeholder="Name", aria-label="Facilitator Name", aria-describedby="sizing-addon2")';

  output+='    select#SessionClimbingType.custom-select';
  output+='      option(selected="", value="Choose") Session Type...';
  output+='      option(value="Bouldering") Top-Roping';
  output+='      option(value="Bouldering") Bouldering';

  output+='    #SessionStartChoices  ';
      //Choose Dynamically picked from SessionClimbingType

  output+='    button#submit.btn.btn-primary(type="submit" value="Start Session") Start Sessions';
  $('#successAlert').jade(output);
}

//An Alert for when part of the form is incorrectly filled out
function failAlert(theText, alertType, removeMe){
  console.log(theText,alertType, removeMe);
  if (removeMe === false){
        output = '<div class="alert '+ alertType +' alert-dismissable">';
        output += '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>';
        output += theText;
        output += '</div>';
    $('#failAlert').html(output);
  } else if (removeMe === true){
        output = "";
    $('#failAlert').html(output);
  }
}

//An Alert for when the form is correctly filled out
function successAlert(theText, alertType, removeMe){
  $('#SuccessModal').modal('show');
  $('#TheText').html(theText);
}

// var dt = moment();
// var DateOnly = moment().format("ddd MMM Do YYYY");
// var TimeOnly = moment().format("h:mm:ss a");


$(function(){ // this will be called when the DOM is ready

    $( document ).ready(function() {
      $('#DateTime').html(moment().format("MMM Do YYYY"));
    });

    $('#GoHome').click(function(){
      $('#AreYouSure').modal('show');
    });

    kp_Vars_DidInject();

});


//sets the Date

var dt = new Date();
var curDate = dt.toString();
var DateOnly = curDate.split(" ", 4);
var output = "";
  $.each(DateOnly, function( index, value ) {
    output += value + " ";
  });
  DateOnly = $.trim(output);


//Set the Time
var DateRemoved = curDate.replace(DateOnly, '');
var TimeOnly = DateRemoved.split(" ", 2);
var output = "";
  $.each(TimeOnly, function( index, value ) {
    output += value + " ";
  });
  TimeOnly = $.trim(output);



  //Get Kisk Pro // IDEA: function kp_Vars_DidInject() {
  function kp_Vars_DidInject() {
    updatePage();
  }

  function updatePage() {

    document.getElementById("kioskIdValue").innerHTML = "<i>" + getKioskId() + "</i>";
  }

  function getKioskId() {

    try {
      return window.kioskpro_id.toString();
    }
    catch(error) {
      return "Non Kiosk iPad";
    }
  }

  window.addEventListener('load', function() {
  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.getElementsByClassName('needs-validation');
  // Loop over them and prevent submission
  var validation = Array.prototype.filter.call(forms, function(form) {
  form.addEventListener('submit', function(event) {
  if (form.checkValidity() === false) {
      console.log(event);
  event.preventDefault();
  event.stopPropagation();
  }
  if (form.checkValidity() === true) {
  checksOut = true;
  if(event.target.id !== 'newStaff'){
  event.preventDefault();
  event.stopPropagation();
}
  }

  form.classList.add('was-validated');
  }, false);
  });
  }, false);
