// Get all span elements (the number selectors)
const spans = document.querySelectorAll('.c span');

let currentIndex = spans.length - 1; // Start with the last span
let lenofspans= currentIndex 
let points={
    bad:0,
    good:0,
}
const audio1 = new Audio("./sounds/move.mp3");

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

        audio1.play();
        
        
        if (currentIndex < spans.length - 1) {
            currentIndex++;
        }
    } else if (e.key === 'ArrowLeft') {
       // const audio2 = new Audio("./sounds/move.mp3");
                audio1.play();
        // audioPlayer.play();
        if (currentIndex > 0 && currentSpan.textContent != '\u2002') {
            currentIndex--;
        }
    } else if (e.key === 'ArrowUp') {
        // Cycle through numbers from 0 to 9
   //     let currentNumber = parseInt(currentSpan.textContent)  //
   const audio4 = new Audio("./sounds/up.mp3");
   audio4.play();
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
        const audio = new Audio("./sounds/down.mp3");
        audio.play();
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
    }




    else if (e.key === 'Enter' && spans[lenofspans].textContent.trim() !== "") {
        const spanss = document.querySelectorAll('.c span');

        const number = parseInt(
            Array.from(spanss)
                .map(span => span.textContent.trim())
                .map(text => /^\d$/.test(text) ? text : '0') // replace empty/invalid with '0'
                .join('')
        );

        console.log(number); // e.g. 1234
        console.log(ans)
        console.log("-----------")
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
        const audio5 = new Audio("./sounds/correct.mp3");
        audio5.play();
      
        points.good++
       
    }
    else {
        // add wrongs
        changecolor('red')
        // document.getElementById('./sounds/huh').play();
        const audio6 = new Audio("./sounds/huh.mp3");
        document.getElementById("ans").textContent=ans;
        audio6.play();
        points.bad++
    }
}