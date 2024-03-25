// ------------------- Base Variables of Game ------------------- 

let choiceCount = 0;
let playerPower = []
let cpuPower = 0;
var backgroundSFX = new Audio('./assets/SFX/player selection screen.mp3');
var kombatFightSFX = new Audio('./assets/SFX/faceoff sound-fight.mp3')
var fightMusic = new Audio('assets/SFX/fight music.mp3');
var hitSFX = new Audio('./assets/SFX/hit sound.wav');
var selectedPlayerSFX = new Audio('./assets/SFX/prefaceoff music.wav');
var winSFX = new Audio('./assets/SFX/up notification.wav');
var defeatSFX= new Audio('./assets/SFX/you-lose-101soundboards.mp3');
var victorySFX = new Audio('./assets/SFX/you-win-street-fighter-101soundboards.mp3');
var fightMusicShortSFX = new Audio('./assets/SFX/fight music short.mp3');
var tieSFX = new Audio('./assets/SFX/tie-101soundboards.mp3')

// ------------------- YouTube Player Display & Modal ------------------- 

function initialModal(){modalDisplay('L0zB330s3DQ','You arrive on Cygnus X-1 and are greeted by The Collector:\n\n"AH!  YOU HAVE ARRIVED!\nA great deal of effort has gone into \
this game. I hope that you at least try to enjoy it. Make an enthusiastic effort, else you all may suffer a fool’s demise. \
\n\nA TEAM OF 3 WILL CLAIM VICTORY! \nAnd become objects of my collection, permitted to live as you will, but you must \
return to me when summoned.\nAfter all... WHAT IS A COLLECTOR WITHOUT HIS HOARD."',0,36).then(() =>  {
  backgroundSFX.volume = 0.2;
  backgroundSFX.play();
 })};

 function modalDisplay(videoId, title, start, end, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      Swal.fire({
        title: title,
        html: '<div id="player"></div>',
        didOpen: () => {
          new YT.Player('player', {
            height: '360',
            width: '639',
            videoId: videoId,
            playerVars: {
              'autoplay': 1,
              'start': start,
              'end': end,
              'controls': 0,
              'showinfo': 0,
              'rel': 0,
              'ecver': 2
            },
            events: {}
          });
        },
        didClose: () => {
          resolve();
        }
      });
    }, delay);
  });
}

// ------------------- Play Background Music ------------------- 
  //backgroundSFX.play();  Was originally in characterSelect function, needs to be moved since that function is not used.


// ------------------- Main API Fetch Request & Array -------------------   

  // Stores characters in an array

fetchMultipleCharacters([
  "Iron Man",
  "Doctor Strange",
  "Wolverine",
  "Hulk",
  "Spider-Man (Peter Parker)",
  "Jean Grey",
  "Black Panther",
  "Groot",
  "Rocket Raccoon",
  "Gamora",
  "Drax",
  "Star-Lord (Peter Quill)",
]);

  // Fetches Marvel API data

function fetchMultipleCharacters(characters) {
  allCharacters =[];
  characters.forEach((character, index) => {
      fetch(`https://gateway.marvel.com/v1/public/characters?apikey=d4d97531c1e479bbe6e27b6f4139fa7e&ts=1&hash=685498cef61d5c0f1571a0d89fb966a0&name=${encodeURIComponent(character)}`)
          .then(res => res.json())
          .then(data => {
              const hero = data.data.results[0]; 
              // Will be used to add nameplates on later update
              const nameofHero = data.data.results[0].name;
              const image = hero.thumbnail.path + "." + hero.thumbnail.extension;
              const comicTotal = hero.comics.available;
              const id = hero.id

  // Puts all chosen character's data in array
              allCharacters.push({
              characterName: character,
              imageUrl: image,
              comicTotal: comicTotal,
              id: id
          });

  // Checks if all characters have been fetched
              if (allCharacters.length === characters.length) {

  // Stores allCharacters array in local storage
              localStorage.setItem('allCharacters', JSON.stringify(allCharacters));
              }

  // Places images in character selection slots
              if (index < 6) {
                  document.querySelector(`#Good${index + 1} figure`).style.backgroundImage = `url(${image})`;
              } else {
                  document.querySelector(`#Evil${index - 5} figure`).style.backgroundImage = `url(${image})`;
              }
          });
  })};

// ------------------- Retrieves Character Data from Local Storage -------------------  

function characterSelect(boxNumber) {

  const allCharacters = JSON.parse(localStorage.getItem('allCharacters'));
  const character = allCharacters && allCharacters.length ? allCharacters.filter(c => c.id == boxNumber)[0] : null;

  if (!character) return Swal.fire("This hero has been eliminated. Please select a different hero.");
  
  const box = document.querySelector('#playerTeam .character:empty');

  if (!box) return Swal.fire("Max number of characters chosen. Ready to Fight!");

  // Get character for the specified boxNumber
  populateCharElm(box, character)
};

// ------------------- Populates Character Elements with Images -------------------  

function populateCharElm(box, character) {

  // Create and append image to character box
  var img = document.createElement('img');

  img.src = character.imageUrl;

  // Store character name as a data attribute
  img.setAttribute('data-character-name', character.characterName); 

  box.appendChild(img);

  box.setAttribute('data-character', character.id);

  box.character = character;
  
  hitSFX.play();
}

// ------------------- Calculates Winner based on Comic Power ------------------- 

function fight() {

  const allCharacters = JSON.parse(localStorage.getItem('allCharacters'));

  //Retrieves all character values inside the #playerTeam html element and stores them as a variable in js
  let playerTeamChars = document.querySelectorAll('#playerTeam .character'); 
  let computerTeamChars = document.querySelectorAll('#computerTeam .character');

  let playerPower = 0;
  let computerPower = 0;

  // loop to find the power of each player team character
  for (let i = 0; i < playerTeamChars.length; i++)
  {
    let playerCharElm = playerTeamChars[i];

  //once the loop repeats 3 times (the length of the player team indicated in the conditions), the loop moves on.
    if (!playerCharElm.character) 
    {
      continue;
    }

  //adds the teams'stats and stores new value in the variable, playerPower
    playerPower += playerCharElm.character.comicTotal; 
  }

  // loop to find the power of each computer team character
  for (let i = 0; i < computerTeamChars.length; i++)
  {
    let computerCharElm = computerTeamChars[i];

    //randomizes computer selection from array "allCharacters"
    computerCharElm.character = allCharacters[Math.floor(Math.random()*allCharacters.length)]; 

    if (!computerCharElm.character)
    {
      continue;
    }

    computerPower += computerCharElm.character.comicTotal;
    
    //populates CPU team images
    populateCharElm(computerCharElm, computerCharElm.character);
  }
  
// ------------------- Display Result Modal ------------------- 

  if (playerPower > computerPower) {
  console.log("Code to display YOU WIN modal [ALL modals should have button to refresh page after player clicks them")


  modalDisplay('rrGMENN1iaY',"You Win. Refresh your browser to play again!",44,53,2000)
winSFX.volume =0.2;
winSFX.play();
  }
  else if (playerPower < computerPower) {
    console.log("Code to display YOU LOSE modal")
    modalDisplay('JVy-6GChSrA',"You Lose! Refresh your browser to try again!",23,32,2000)
    defeatSFX.volume = 0.2;
   defeatSFX.play();

  }

  else if (playerPower == computerPower) {
  console.log("OPTIONAL tie modal here")

  modalDisplay('rrGMENN1iaY',"You Tied. Refresh your browser to play again!",43,53,2000)
tieSFX.volume = 0.2;
  tieSFX.play();
}};
