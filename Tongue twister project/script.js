
  // Import the required modules
  //const random = require("random");
  //const SpeechRecognition = require("web-speech-api");
  const SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;

  //btn and the fn
  const secCon = document.getElementById("mainPg");
  const frnt = document.getElementById("front");
  const btn = document.getElementById("nextpg");
  btn.onclick = function () {
    if (secCon.style.display == "none") {
      secCon.style.display = "block";
      frnt.style.display = "none";
      //console.log("yes!");
      //console.log(secCon.style.display);
    } else {
      console.log("no!");
      //console.log(secCon.style.display);
    }
  };

  // Define a list of tongue twisters
  const tongueTwisters = [
    "How much wood would a woodchuck chuck, if a woodchuck could chuck wood",
    "I saw Susie sitting in a shoeshine shop.",
    "She sells seashells by the seashore.",
    "Peter Piper picked a peck of pickled peppers.",
    "Fred fed Ted bread and Ted fed Fred bread",
    "Red lorry, yellow lorry.",
    "Unique New York.",
    "Big black bug bit a big black bear",
    "Toy boat, toy boat, toy boat.",
    "Birdie birdie in the sky laid a turdie in my eye. If cows could fly I’d have a cow pie in my eye", 
    "Can you can a canned can into an un-canned can like a canner can can a canned can into an un-canned can?",
    "How can a clam cram in a clean cream can?",
    "The great Greek grape growers grow great Greek grapes",
    "Six sick hicks nick six slick bricks with picks and sticks.",
    "I slit the sheet, the sheet I slit, and on the slitted sheet I sit.",
    "Round the rough and rugged rock the ragged rascal rudely ran",
    "Lesser leather never weathered wetter weather better",
    "Give papa a cup of proper coffee in a copper coffe cup.",
    "The two Tibble twins tied tiny twine to twelve teachers’ tipping trek tents.",
    "Upper roller lower roller",
  
  ];

  // program to get a random item from an array
  function getRandomItem(arr) {
    // get random index value
    const randomIndex = Math.floor(Math.random() * arr.length);
    const item = arr[randomIndex];
    return item;
  }

  // Choose a random tongue twister from the list
  const twister = getRandomItem(tongueTwisters);
  document.getElementById("display").innerHTML = twister;
  console.log(twister);

  // Display the tongue twister and ask the user to repeat it
  console.log("Repeat after me:");
  console.log(twister);

  // Initialize the recognizer
  const recognition = new SpeechRecognition();

  // Function to convert text to speech
  function SpeakText(command) {
    // Initialize the speech synthesis object
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(command);
    synth.speak(utterance);
  }

  recognition.onstart = function() {

  };

  recognition.onspeechend = function() { 
    // when user is done speaking{
    recognition.stop();
  }

  // Listen for the user's input
  recognition.onresult = (event) => {
    const result = event.results[0][0].transcript;
    const text = result.toLowerCase().replace(/\s+/g, "");

    console.log(`Did you say ${text}`);
  

    // Compare the user's input to the tongue twister
    const twisterText = twister
      .replace(/[,\.]/g, "")
      .toLowerCase()
      .replace(/\s+/g, "");
    if (text === twisterText) {
      SpeakText("Congratulations! You've won!");
      document.querySelector('.image').innerHTML = "<img src='./win.JPG' class='res_img' >";
      document.querySelector('.result').innerHTML = "<p id='output'>Congratulations! You've won!</p>";
    } else {
      SpeakText("You lost!");
      SpeakText("The correct pronunciation is:");
      SpeakText(twister);
      document.querySelector('.image').innerHTML = "<img src='./lose.JPG' class='res_img' >";
      document.querySelector('.result').innerHTML = `<p id='output'>You lost! The correct pronounciation is : ${twister}</p>`;
    }
  };

  // Start the recognition process
  recognition.start();
