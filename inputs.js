// Get all span elements (the number selectors)
 // Array of song URLs
 const songUrls = [
    './sounds/main_theme.mp3',
    './sounds/beach.mp3',
    './sounds/ffz.mp3',
    './sounds/kh2.mp3',
    // add more songs as needed
  ];

  // let queue = [];
  // let currentSongIndex = 0;
  let currentSongIndex = 0;
  let currentSound = null;
  let isPaused = false;

  function shuffleSong(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function playSong(index) {
    if (currentSound) {
      currentSound.unload(); // clean up previous sound
    }

    currentSongIndex = index;

    currentSound = new Howl({
      src: [queue[currentSongIndex]],
      // html5: true,
      onend: () => {
        playNext();
      }
    });

    currentSound.play();
    isPaused = false;
    // updateMediaSession();
  }

  function playNext() {
    currentSongIndex++;
    if (currentSongIndex >= queue.length) {
      queue = shuffleSong([...songUrls]);
      currentSongIndex = 0;
    }
    playSong(currentSongIndex);
  }

  function playPrevious() {
    currentSongIndex--;
    if (currentSongIndex < 0) {
      currentSongIndex = queue.length - 1;
    }
    playSong(currentSongIndex);
  }

  function togglePlayPause() {
    if (!currentSound) return;
    if (isPaused) {
      currentSound.play();
    } else {
      currentSound.pause();
    }
    isPaused = !isPaused;
  }

  // function updateMediaSession() {
  //   if ('mediaSession' in navigator) {
  //     navigator.mediaSession.metadata = new MediaMetadata({
  //       title: `Track ${currentSongIndex + 1}`,
  //       artist: 'Unknown Artist',
  //       album: 'Random Playlist',
  //       artwork: [
  //         { src: 'cover.jpg', sizes: '512x512', type: 'image/jpeg' } // Optional
  //       ]
  //     });

  //     navigator.mediaSession.setActionHandler('play', togglePlayPause);
  //     navigator.mediaSession.setActionHandler('pause', togglePlayPause);
  //     navigator.mediaSession.setActionHandler('previoustrack', playPrevious);
  //     navigator.mediaSession.setActionHandler('nexttrack', playNext);
  //   }
  // }

  // Start the playlist
  queue = shuffleSong([...songUrls]);
  playSong(0);













function increaseProgress() {
    // if (progress >= 100) return;
    

    const newProgress = document.getElementById('curLevel').textContent;
    animate('#prog > div',{
    //   targets: 
    width: newProgress*100/levels + '%',
    //   to: newProgress*100/levels,
      ease: 'linear',
      duration: 500
    });

  }

// import { anime } from 'node_modules/animejs/lib/anime.cjs';
// import { anime } from 'node_modules/animejs/lib/anime.min.cjs';


// var animateProgress = anime({
//     targets: '#prog',
//     value:  1,
//     easing: 'linear',
//     autoplay: false
//   });
//   const progress = () => {
//     animateProgress.play();
//   };
  
const xMax = 16;

const shake = animate('.c',{
    // targets: 
    // easing: 'easeInOutSine',
    ease: 'outElastic',
    duration: 400,
    translateX: [
      {
        to: xMax * -1,
      },
      {
        to: xMax,
      },
      {
        to: xMax/-2,
      },
      {
        to: xMax/2,
      },
      {
        to: 0,
      }
    ],
    // autoplay: false,
  });

// const shake = animate('.c',{

//   easing: 'easeInOutSine',
//   duration: 400,
//   translateX: [
//     {
//       value: xMax * -1,
//     },
//     {
//       value: xMax,
//     },
//     // {
//     //   value: xMax/-2,
//     // },
//     // {
//     //   value: xMax/2,
//     // },
//     // {
//     //   value: 0,
//     // }
//   ],
//   autoplay: false,
// });
const send = () => {
    
  shake.restart();
};

var sfx= {
    LeftRight : new Howl({
        src:"./sounds/move.mp3",
    }),
    UpDown : new Howl({
        src:"./sounds/down.mp3",
    }),
    Correct : new Howl({
        src:"./sounds/correct.mp3",
    }),
    Bad : new Howl({
        src:"./sounds/huh.mp3",
    }),

    
}

//  window.addEventListener('load', () => {
//     const event = new KeyboardEvent('keydown', {
//       key: 'Enter',      // or any key you want, like 'ArrowRight'
//       code: 'Enter',
//       keyCode: 13,
//       which: 13,
//       bubbles: true,
//     });

//     document.dispatchEvent(event);
//   });
const spans = document.querySelectorAll('.c span');

let currentIndex = spans.length - 1; // Start with the last span
let lenofspans= currentIndex 
let bad=0
let good=0

// const move = new Audio("./sounds/move.mp3");


waitfornextlevel = false;
// Handle key events
document.addEventListener('keydown', function (e) {
    
    if (waitfornextlevel) {
        arr.shift();
        /////////////////////////
        
        // operator(opr)
        // ////
        currentIndex=lenofspans;
        spans[currentIndex].focus();
        init();
        changecolor('white')
        waitfornextlevel = false;
        if (document.getElementById('curLevel').textContent >= levels){
            // localStorage.setItem("points", JSON.stringify(points));
            //            localStorage.setItem("username", "Alice");
            // window.location.href = 'result.html';
            window.location.href = `test.html?bad=${bad}&good=${good}`;
             return
        };

        document.getElementById('curLevel').textContent++
        // document.getElementById('curLevel').textContent++
        //
        // return
    }
    const currentSpan = spans[currentIndex];
    let currentNumber = parseInt(currentSpan.textContent)  //
    
    if (e.key === 'ArrowRight') {
        // Move to the next span to the right
        // document.getElementById('pop').play();
        // move.load();
        
        
        sfx.LeftRight.play()
        if (currentIndex < spans.length - 1) {
         //   move.cloneNode().play();
            currentIndex++;
        }
    } else if (e.key === 'ArrowLeft') {
       // const audio2 = new Audio("./sounds/move.mp3");
    //    move.load();
    // audioPlayer.play();
    if (currentIndex > 0 && currentSpan.textContent != '\u2002') {
            sfx.LeftRight.play()
            // move.cloneNode().play();
            currentIndex--;
        }
    } else if (e.key === 'ArrowUp') {
        // Cycle through numbers from 0 to 9
   //     let currentNumber = parseInt(currentSpan.textContent)  //
   sfx.UpDown.play()
//    up.cloneNode().play();
        if (!isNaN(currentNumber)) {
            // if (e.key === 'ArrowUp') {
                currentNumber = (currentNumber + 1) % 10;
            // } else if (e.key === 'ArrowDown') {
                // currentNumber = (currentNumber - 1 + 10) % 10; // Wrap around
            // }
        }
        else {
            currentNumber = 0;
        }
        // Ensure the content is a valid number
        currentSpan.textContent = currentNumber.toString(); // Converts number to string
    }
    else if ( e.key === 'ArrowDown') {
        // down.load();
        // down.cloneNode().play(); //veryy costly
        // Cycle through numbers from 0 to 9
     //   let currentNumber = parseInt(currentSpan.textContent)  //
     sfx.UpDown.play()
        if (!isNaN(currentNumber)) {
            // if (e.key === 'ArrowUp') {
                // currentNumber = (currentNumber + 1) % 10;
            // } else if (e.key === 'ArrowDown') {
                currentNumber = (currentNumber - 1 + 10) % 10; // Wrap around
            // }
        }
        else {
            currentNumber = 9;
        }
        // Ensure the content is a valid number
        currentSpan.textContent = currentNumber.toString(); // Converts number to string
    }else if (e.key === 'Enter' && spans[lenofspans].textContent.trim() != "") {
        const spanss = document.querySelectorAll('.c span');

        const number = parseInt(
            Array.from(spanss)
                .map(span => span.textContent.trim())
                .map(text => /^\d$/.test(text) ? text : '0') // replace empty/invalid with '0'
                .join('')
        );

        nextLevel(number)
    } else if (e.key === 'MediaTrackNext') {
      playNext()
    } else if (e.key === 'MediaTrackPrevious') {
      playPrevious() 
    } else if (e.key === 'c') {
      const spanss = document.querySelectorAll('.c span');
      nextLevel(ans)
  }

    // Focus the current span after moving
    spans[currentIndex].focus();

});

function changecolor(color){
    const spans = document.querySelectorAll('.c span');
    spans.forEach(span => {
        span.style.color = color;
    });
}


function nextLevel(user_ans) {
    waitfornextlevel = true;
    increaseProgress();
    if (ans == user_ans) {
        // add +
        changecolor('#7cfc00')
        // document.getElementById('./sounds/correct').play();
        sfx.Correct.play()
      
        good++
       
    }
    else {
        // add wrongs
        changecolor('red')
        // document.getElementById('./sounds/huh').play();
     
        document.getElementById("ans").textContent=ans;
        send();
        sfx.Bad.play()

        bad++
    }
}