
  //KEY INFORMATION GOES HERE


firebase.initializeApp(config);

var dataRef = firebase.database();
  var timeUntil = moment();

  $("#submitbutton").on("click", function(e){
    event.preventDefault();

    var name = "";
    var destination = "";
    var time = "";
    var frequency = 0;


name = $("#name").val();
destination = $("#destination").val();
time = $("#time").val();
frequency = $("#frequency").val();



$("#name-display").text(name);
$("#destination-display").text(destination);
$("#time-display").text(time);
$("#frequency-display").text(frequency);


dataRef.ref().push({
    name: name,
    destination: destination,
   time: time,
    frequency: frequency,

});

});
dataRef.ref().on("child_added", function (childSnapshot){

  var timeConvert = childSnapshot.val().time;
  var nameLabel = childSnapshot.val().name;
  var destinationLabel = childSnapshot.val().destination;
  var frequencyLabel = childSnapshot.val().frequency;

var convertedTime = moment(timeConvert, "HH:mm").subtract(1, "years");

  var currentTime = moment();

  var diffTime = moment().diff(moment(convertedTime), "minutes");
  
  var tRemainder = diffTime % frequencyLabel;

  var tMinutesTillService = frequencyLabel- tRemainder;
  
  var nextArrival = moment().add(tMinutesTillService, "minutes");

         $("#rowNew").append("<tr>"+
     "<td>"+ nameLabel +" </td>" +
     "<td> " + destinationLabel + " </td>" 
     + "<td> " + frequencyLabel + " </td>"
      + "<td> " + timeConvert + "</td>"
      +" <td>"+ moment(nextArrival).format("HH:mm")+ "</td>"
      + "<td>" + tMinutesTillService +"</td>" +"</tr>");
});
