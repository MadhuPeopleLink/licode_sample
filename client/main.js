import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

var localStream, room;

Template.videoPage.events({
  'click #testConnection'(event, instance) {
  	console.log("clicked ont testConnection");
  	Meteor.call("createToken", "Video-1", "presenter", function (err, res) {
  		if (! err) {
  			console.log("token generated is ", res);
  			startConference(res);
  		}
  	});
  }
});


var config = {
	audio: true,
	video: true,
	data: true,
	videoSize: [ 640, 480, 640, 480 ]
};

function startConference(token) {
  room = Erizo.Room({token: token});
  localStream = Erizo.Stream(config);  

  localStream.addEventListener("access-accepted", function () {
    var subscribeToStreams = function (streams) {
      for (var index in streams) {
        var stream = streams[index];
        if (localStream.getID() !== stream.getID()) {
          room.subscribe(stream);
          stream.addEventListener("bandwidth-alert", function (evt){
              console.log("Bandwidth Alert", evt.msg, evt.bandwidth);
          });
        }
      }
    };

    room.addEventListener("room-connected", function (roomEvent) {

      room.publish(localStream, {maxVideoBW: 300}); 
      subscribeToStreams(roomEvent.streams);
    });

    room.addEventListener("stream-subscribed", function(streamEvent) {
      var stream = streamEvent.stream;
      var div = document.createElement('div');
      div.setAttribute("style", "width: 320px; height: 240px;");
      div.setAttribute("id", "test" + stream.getID());

      document.body.appendChild(div);
      stream.show("test" + stream.getID());
    });

    room.addEventListener("stream-added", function (streamEvent) {
      var streams = [];
      streams.push(streamEvent.stream);
      subscribeToStreams(streams);
      document.getElementById("recordButton").disabled = false;
    });

    room.addEventListener("stream-removed", function (streamEvent) {
      // Remove stream from DOM
      var stream = streamEvent.stream;
      if (stream.elementID !== undefined) {
        var element = document.getElementById(stream.elementID);
        document.body.removeChild(element);
      }
    });
    
    room.addEventListener("stream-failed", function (streamEvent){
        console.log("Stream Failed, act accordingly");
    });

    room.connect();

    localStream.show("my_local_video");

  });
  localStream.init();
};



// window.onload = function () {
  // recording = false;
  // var screen = getParameterByName("screen");

  // If we want screen sharing we have to put our Chrome extension id. The default one only works in our Lynckia test servers.
  // If we are not using chrome, the creation of the stream will fail regardless.
  // if (screen){
  //   config.extensionId = "okeephmleflklcdebijnponpabbmmgeo";
  // }
//   localStream = Erizo.Stream(config);

//   createToken("user", "presenter", function (response) {
//     var token = response;
//     console.log(token);

//   });
// };

Template.videoPage.helpers({
  counter() {
    return Template.instance().counter.get();
  }
});