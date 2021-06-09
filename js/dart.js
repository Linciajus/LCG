var r = 200;
var z = 0;
var h = 0;
var a = 0;
var m = 0;
var c = 0;
var interval;
var numbers = [];
var enabled = false;
var numberOfIterations = 0;
var counter = 0;
var numeberOfRows = 30;

$(document).ready(function() {
    $('#a').val(777);
    $('#c').val(101);
    $('#m').val(32771);
    $('#z').val(new Date().getTime() / 1000);
    $('#iter').val(100000);
    $('#result').append('<br><span >Formulė:</span><br>');
    $('#result').append('<span id = "formula"><b>z' + 'n'.sub() + ' = (a * z'+ 'n-1'.sub() + ' + c) % m</b></span>');
    $('#seed').hide();
    if (numbers.length == 0) {
        $('#drawHisto').prop('disabled', true);
    }
})

$("a").click(function(){
    var url = this.name;
    console.log(url)
    $('#content').load( url, " #content", function( response, status, xhr ) {
        if ( status == "error" ) {
          var msg = "Sorry but there was an error: ";
          $( "#error" ).html( msg + xhr.status + " " + xhr.statusText );
        }
      });
})
class Dart {
    constructor(x, y) {
        if (counter <= numeberOfRows) {
            $("#tableSeq").append("<tr><td>" + counter + "</td><td>" + x + "</td><td>" + y + "</td><tr>");
            counter++;
        }
        this.x = x / (m - 1) * 2 - 1;
        this.y = y / (m - 1) * 2 - 1;

        this.isInCircle = 1 > this.x * this.x + this.y * this.y;
    }
}

$('#generateBtn').click(function() {
    numbers = [];
    disableFields(true);
    counter = 1;
    $("#sequence").html("");
    $('#sequence').append("<table id = tableSeq class = table-bordered><tr><thead><th colspan = 3>Skaičių seka</th></tr><tr><th>Iteracijos</th><th>Skaičius X</th><th>Skaičius Y</th></tr></thead></table>");
    throwDarts();
})

$("#reset").click(function() {
    clearCanvas();
    numbers = [];
    disableFields(false);
    $('#drawHisto').prop('disabled', true);

})

$('#manual').click(function() {;
    if ($('#manual').prop("checked") == false) {
        $("#seed").hide();
    } else {
        $("#seed").show();
        $('#z').val(1);
    }
})

$('#drawHisto').click(function() {
    if ($('.canvasjs-chart-container').is(':hidden')) {
        $('.canvasjs-chart-container').css('display', 'block');
    } else {
        $('.canvasjs-chart-container').css('display', 'none');
    }
})

function throwDarts(time = 1) {
    $('#alliter').html("");
    var target = new Target();
    var canvas = new TargetCanvas('canvas');
    target.setValues();
    canvas.drawArc(0, 0, r, 0, Math.PI * 2);
    canvas.ctx.stroke();
    var check = $('input[name="radioBtn_group"]:checked').attr("id");
    var speed = check.match(/\d/g);
    speed = speed.join("");
    let throwDart = () => {
        for (let i = 0; i < interval * speed; i++) {
            let dart = target.throwDart();
            numbers.push(dart.x);
            numbers.push(dart.y);
            let color = dart.isInCircle ? canvas.getRandomColor() : "blue";
            canvas.drawPixel(dart.x, dart.y, color);
            if (stop(target.iterations) == true) {
                continue;
            } else
                break;
        }
        document.getElementById('pi-digits').innerHTML = target.getPiHighlighted();
        document.getElementById('total').innerHTML = target.iterations;
        document.getElementById('in-circle').innerHTML = target.inCircle;
        document.getElementById('pi-error').innerHTML = target.getPiError();

    }
    interval = setInterval(throwDart, time);
}

function disableFields(isEnabled) {
    $('#a').attr('readonly', isEnabled);
    $('#c').prop('readonly', isEnabled);
    $('#m').prop('readonly', isEnabled);
    $('#z').prop('readonly', isEnabled);
    $('#iter').prop('readonly', isEnabled);
    $('#manual').prop('disabled', isEnabled);
    $('#generateBtn').prop('disabled', isEnabled);
    $("#drawHisto").prop('disabled', isEnabled);
}

function clearCanvas() {
    var chart = $(".canvasjs-chart-container");
    if (chart != 'undefined') {
        chart.html("");
    }
    clearInterval(interval);
    let ctx;
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext('2d');
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    $('#pi-digits').html("");
    $('#total').html("");
    $('#in-circle').html("");
    $('#pi-error').html("");
    $('#alliter').html("");
    $("#sequence").html("");
}

function stop(iterations) {
    if (iterations >= numberOfIterations) {
        clearInterval(interval);
        disableFields(false);
        let graph = new Graphs();
        graph.collectData(numbers);
        $('.canvasjs-chart-container').css('display', 'block');
        return false;
    }
    return true;
}