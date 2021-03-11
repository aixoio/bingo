var random = Array.from(document.getElementsByClassName("random"));
var help = Array.from(document.getElementsByClassName("help"));
var td = [];
document.getElementsByClassName("help")[1].id = "bingo-help";
var gotNumbers = [];
var max = 75;
var minToWin = 4;
var bingoSpots = {
  b: [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15
  ],
  i: [
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28,
    29,
    30
  ],
  n: [
    31,
    32,
    33,
    34,
    35,
    36,
    37,
    38,
    39,
    40,
    41,
    42,
    43,
    44,
    45
  ],
  g: [
    46,
    47,
    48,
    49,
    50,
    51,
    52,
    53,
    54,
    55,
    56,
    57,
    58,
    59,
    60
  ],
  o: [
    61,
    62,
    63,
    64,
    65,
    66,
    67,
    68,
    69,
    70,
    71,
    72,
    73,
    74,
    75
  ]
};
for (let i = 0; i < max; i++) {
  td.push(document.getElementById("td" + (i + 1)));
}
random[4].innerHTML = "Total Random Numbers Out Of " + max + ": " + gotNumbers.length + "<br>" + "Numbers To End: " + max;
random[2].hidden = true;
random[0].onclick = function () {
  randomNumber();
};
help[3].onclick = function () {
  var numbersValue = document.getElementsByClassName("help")[1].value.split(", ");
  if (numbersValue.length >= minToWin) {
    help[2].innerHTML = "";
    help[2].hidden = true;
    var good = [];
    var trues = 0;
    for (let i = 0; i < minToWin; i++) {
      if (gotNumbers.includes(JSON.parse((numbersValue[i]))) && !good.includes(JSON.parse((numbersValue[i])))) {
        trues += 1;
      }
      good.push(JSON.parse((numbersValue[i])));
    }
    if (trues >= minToWin) {
      help[2].innerHTML = "Good Bingo";
      help[2].hidden = false;
    } else {
      help[2].innerHTML = "Bad Bingo";
      help[2].hidden = false;
    }
    return;
  } else {
    help[2].innerHTML = "Error";
    help[2].hidden = false;
    return;
  }
};
hideClass("help");
function randomNumber() {
  random[2].hidden = true;
  var looping;
  looping = true;
  do {
    var number = Math.ceil(Math.random() * max);
    if (gotNumbers.includes(number) && gotNumbers.length > 0) {
      looping = true;
      continue;
    } else if (!gotNumbers.includes(number) && gotNumbers.length > 0 || gotNumbers.length == 0) {
      gotNumbers.push(number);
      looping = false;
      break;
    }
  } while (looping);
  if (gotNumbers.length > 1) {
    td[(gotNumbers[(lastItem(gotNumbers) - 1)] - 1)].classList.remove("numOn");
    td[(gotNumbers[(lastItem(gotNumbers) - 1)] - 1)].classList.add("numDone");
  }
  if (document.getElementById("auto-say").checked == true) {
    if (bingoSpots.b.includes(gotNumbers[lastItem(gotNumbers)]) == true) {
      say("B " + gotNumbers[lastItem(gotNumbers)]);
    } else if (bingoSpots.i.includes(gotNumbers[lastItem(gotNumbers)]) == true) {
      say("I " + gotNumbers[lastItem(gotNumbers)]);
    } else if (bingoSpots.n.includes(gotNumbers[lastItem(gotNumbers)]) == true) {
      say("N " + gotNumbers[lastItem(gotNumbers)]);
    } else if (bingoSpots.g.includes(gotNumbers[lastItem(gotNumbers)]) == true) {
      say("G " + gotNumbers[lastItem(gotNumbers)]);
    } else if (bingoSpots.o.includes(gotNumbers[lastItem(gotNumbers)]) == true) {
      say("O " + gotNumbers[lastItem(gotNumbers)]);
    }
  }
  td[(gotNumbers[lastItem(gotNumbers)] - 1)].classList.add("numOn");
  if (gotNumbers.length >= minToWin) {
    showClass("help");
  }
  if (gotNumbers.length >= max) {
    random[0].hidden = true;
    random[2].hidden = false;
    random[4].innerHTML = "Total Random Numbers Out Of " + max + ": " + gotNumbers.length + "<br>" + "Numbers To End: " + (max - gotNumbers.length);
    random[2].innerHTML = "Error Max Amount Of Numbers";
    return;
  } else {
    random[2].hidden = false;
    random[3].hidden = false;
    random[3].innerHTML = gotNumbers[lastItem(gotNumbers)];
    random[4].innerHTML = "Total Random Numbers Out Of " + max + ": " + gotNumbers.length + "<br>" + "Numbers To End: " + (max - gotNumbers.length);
    return;
  }
}
function lastItem(array) {
  return (array.length - 1);
}
function showClass(className) {
  var elms = Array.from(document.getElementsByClassName(className));
  for (let i = 0; i < elms.length; i++) {
    elms[i].hidden = false;
  }
}
function hideClass(className) {
  var elms = Array.from(document.getElementsByClassName(className));
  for (let i = 0; i < elms.length; i++) {
    elms[i].hidden = true;
  }
}
function say(m) {
  var msg = new SpeechSynthesisUtterance();
  var voices = window.speechSynthesis.getVoices();
  msg.voice = voices[10];
  msg.voiceURI = "native";
  msg.volume = 15;
  msg.rate = 1;
  msg.pitch = 0.8;
  msg.text = m;
  msg.lang = "en-US";
  speechSynthesis.speak(msg);
}
