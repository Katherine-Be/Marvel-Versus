// TO DO: 
// Character Select - function to select character. once selected, the character goes to the selected box.
//                    their info goes into the array from the fetch request. (this happens three times)
//Function for random CPU choice
// Fight Function - lock in function - CPU chooses their characters. both arrays of comic sales are compared
// higher comic sales are the winner. Display results modal. 
// Play Again - refresh page
var selectedCharacter1El = document.getElementById('#characterBox1');
var characterSelectbtnEl = document.getElementById('#selectbtn')
let choiceCount = 0;
let playerPower = []
var backgroundSFX = new Audio('./assets/game-sounds/player selection screen.mp3');
var kombatFightSFX = new Audio('./assets/game-sounds/faceoff sound-fight.mp3')
var fightMusic = new Audio('assets/game-sounds/fight music.mp3');
var hitSFX = new Audio('./assets/game-sounds/hit sound.wav');
var selectedPlayerSFX = new Audio('./assets/game-sounds/prefaceoff music.wav');
var winSFX = new Audio('./assets/game-sounds/up notification.wav');
var defeatSFX= new Audio('./assets/game-sounds/you-lose-101soundboards.mp3');
var victorySFX = new Audio('./assets/game-sounds/you-win-street-fighter-101soundboards.mp3');
var fightMusicShortSFX = new Audio('./assets/game-sounds/fight music short.mp3');

//youtube player display
function onYouTubeIframeAPIReady() {
  
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: 'K1imOiVCgYM',
    autoplay: 1,
    startSeconds: 14,
    enSeconds: 18,
  });
}

// -------------------------------------------------------------//

function characterSelect () {
  //play background music---------------
  backgroundSFX.play();
    //upon clicking the character pic, the same image is displayed into the selected character box.
    console.log('Button VERY clicked!'); 
    console.log('----------------'); 
hitSFX.play();
    //get fetched picture and name and show them in the selected box. 
    
const apiUrl = 'https://gateway.marvel.com/v1/public/characters'
const hash = '685498cef61d5c0f1571a0d89fb966a0'; //find generator 
const timestamp = '1';
const apiKey = 'd4d97531c1e479bbe6e27b6f4139fa7e'; //my public key
const url = `${apiUrl}?apikey=${apiKey}&ts=${timestamp}&hash=${hash}&name=Gwenpool`;

//https://gateway.marvel.com/v1/public/characters?apikey=d4d97531c1e479bbe6e27b6f4139fa7e&ts=1&hash=685498cef61d5c0f1571a0d89fb966a0&name=Iron Man
//data.data.results[0].name.toLowerCase();


fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    }

  }) .then(response => response.json())
  .then(data => {console.log (data);

    //Hero Img ----------------------------------------------------------
    const thumbnail = data.data.results[0].thumbnail.path+'.jpg';
    console.log(thumbnail);
    var img = document.createElement('img');
    img.src = thumbnail 
    img.setAttribute('id', 'myImage');
    document.getElementById('characterBox1').appendChild(img);

    //Hero Name ----------------------------------------------------------
    const nameofHero = data.data.results[0].name;
    console.log(nameofHero);

    var paragraph = document.getElementById("namePlate");
    var text = document.createTextNode(nameofHero);

    paragraph.appendChild(text);

    //Hero Power ----------------------------------------------------------

    const comicTotal = data.data.results[0].comics.available;
    console.log(comicTotal);

    
    playerPower.push(comicTotal);
    console.log(playerPower);

      let sum = 0; 

      for (let i = 0; i < playerPower.length; i++)
          sum += playerPower[i];

          console.log(sum);

    //Hero Choice Count ----------------------------------------------------------

          choiceCount++; 
          console.log(choiceCount);
          if (choiceCount >= 3) {
            alert('No choices left!') // Change this to replace the oldest choice
            return; 
          }
          else (choiceCount < 3)

  })
  .catch(error => {
    // Handle errors here
    console.error('Error:', error);
  });
    //add character's comic sales to power array. check to see if three characters have been chosen, if not allow more choices
    //if selected character is clicked, clear selection box OR replace oldest character in array with new one. 
    

};

// -------------------------------------------------------------//


function fight () {
    //lock in function - CPU chooses their characters. both arrays of comic sales are compared
    function cpuChoice () {
    //from array of characters. [0-20] choose three random ones and display them in the selected boxes.
    selectedPlayerSFX.play();
    kombatFightSFX.play();
    }
    
}



