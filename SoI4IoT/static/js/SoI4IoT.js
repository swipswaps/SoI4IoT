/***
 Target: Ajax functions
 Version: 0.1
 Date: 2017/01/18
 Mail: guillain@gmail.com
 Copyright 2017 GPL - Guillain
***/

/* USER */
/* saveUser click */
  $(function() {
    $('a#saveUser').bind('click', function() {
        $.ajax({
            url: 'save',
            data: $('form').serialize(),
            type: 'POST',
            success: function(data) {
                $("#result").text(data);
            },
            error: function(error) {
                $("#result").text(error);
            }
        });
    });
  });

/* CUSTOMER */
/* saveCustomer click */
  $(function() {
    $('a#saveCustomer').bind('click', function() {
        $.ajax({
            url: 'save',
            data: $('form').serialize(),
            type: 'POST',
            success: function(data) {
                $("#result").text(data);
            },
            error: function(error) {
                $("#result").text(error);
            }
        });
    });
  });

/* DEVICE */
/* saveDevice click */
  $(function() {
    $('a#saveDevice').bind('click', function() {
        $.ajax({
            url: 'save',
            data: $('form').serialize(),
            type: 'POST',
            success: function(data) {
                $("#result").text(data);
            },
            error: function(error) {
                $("#result").text(error);
            }
        });
    });
  });

/* TRACKING */
/* saveTracking click */
  $(function() {
    $('a#saveTracking').bind('click', function() {
        $.ajax({
            url: 'save',
            data: $('form').serialize(),
            type: 'POST',
            success: function(data) {
                $("#result").text(data);
            },
            error: function(error) {
                $("#result").text(error);
            }
        });
    });
  });

/* exportTracking click */
  $(function() {
    $('a#exportTracking').bind('click', function() {
        $.ajax({
            url: 'export',
            data: $('form').serialize(),
            type: 'POST',
            success: function(data) {
                $("#result").text(data);
            },
            error: function(error) {
                $("#result").text(error);
            }
        });
    });
  });

/* TRACKER */
/* Refresh function */
  function trackerFct(){
    $.ajax({
      url: 'tracker/save',
      data: $('form').serialize(),
      type: 'POST',
      success: function(data) {
        $("#result").text(data);
        sendHTMLgps();
        if( (document.getElementById("timer").value != '0') && (document.getElementById("timer").value != '') ) {
          setTimeout(trackerFct, document.getElementById("timer").value * 1000);
        }
      },
      error: function(error) {
        $("#result").text(error);
      }
    });
  }

/* saveTracker click */
  $(function() {
    $('a#saveTracker').bind('click', function() {
      trackerFct();
    });
  });

/* ADD FEATURES */
/* display additionnal info when onmouse */
function onmouseoveragent(el) {
    var hint = el.querySelector("div.hideme");
    hint.style.display = 'block';

    hint.style.top = Math.max(el.offsetTop - hint.offsetHeight,0) + "px";
    hint.style.left = el.offsetLeft + "px";
};
function onmouseoutagent(el) {
    var hint = el.querySelector("div.hideme");
    hint.style.display = 'none';
};

/* Body load function */
function bodyOnload(){
}

/* Get GPS position */
function sendHTMLgps(){
    var x = document.getElementById("gps");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(recPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}
function recPosition(position) {
    var x = document.getElementById("gps");
    var longitude = position.coords.longitude;
    var latitude = position.coords.latitude;
    var loginurl = document.getElementById("login") + '';
    var sURLVariables = loginurl.split('=');
    var login = sURLVariables[1];
    alert("Position has been recorded for the user " + login + "\n* Lat.: " + latitude + "\n* Long.: " + longitude);

    $.ajax({
            url: 'tracker/recGPS',
            data: { 'login':login, 'latitude':latitude, 'longitude':longitude},
            type: 'POST',
            success: function(data) {
                $("#result").text(data);
            },
            error: function(error) {
                $("#result").text(error);
            }
        });
}


