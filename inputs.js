// Get all span elements (the number selectors)
const spans = document.querySelectorAll('.c span');

let currentIndex = spans.length - 1; // Start with the last span
let lenofspans= currentIndex 
let points={
    bad:0,
    good:0,
}
const move = new Audio("./sounds/move.mp3");
const up = new Audio("./sounds/up.mp3");
const down = new Audio("./sounds/down.mp3");
const correct = new Audio("./sounds/correct.mp3");
const huh = new Audio("./sounds/huh.mp3");

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
        if (document.getElementById('level-number').textContent-- ==1){
            localStorage.setItem("points", JSON.stringify(points));
            //            localStorage.setItem("username", "Alice");
            window.location.href = 'result.html';
            // return
        };
        return
    }
    const currentSpan = spans[currentIndex];
    let currentNumber = parseInt(currentSpan.textContent)  //
    
    if (e.key === 'ArrowRight') {
        // Move to the next span to the right
        // document.getElementById('pop').play();
        // move.load();
        
        
        
        if (currentIndex < spans.length - 1) {
         //   move.cloneNode().play();
            currentIndex++;
        }
    } else if (e.key === 'ArrowLeft') {
       // const audio2 = new Audio("./sounds/move.mp3");
    //    move.load();
       
        // audioPlayer.play();
        if (currentIndex > 0 && currentSpan.textContent != '\u2002') {
            // move.cloneNode().play();
            currentIndex--;
        }
    } else if (e.key === 'ArrowUp') {
        // Cycle through numbers from 0 to 9
   //     let currentNumber = parseInt(currentSpan.textContent)  //

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
    }else if (e.key === 'Enter' && spans[lenofspans].textContent.trim() != "\u2002") {
        const spanss = document.querySelectorAll('.c span');

        const number = parseInt(
            Array.from(spanss)
                .map(span => span.textContent.trim())
                .map(text => /^\d$/.test(text) ? text : '0') // replace empty/invalid with '0'
                .join('')
        );

        nextLevel(number)
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
    if (ans == user_ans) {
        // add +
        changecolor('green')
        // document.getElementById('./sounds/correct').play();
        correct.play();
      
        points.good++
       
    }
    else {
        // add wrongs
        changecolor('red')
        // document.getElementById('./sounds/huh').play();
     
        document.getElementById("ans").textContent=ans;
        huh.play();
        points.bad++
    }
}