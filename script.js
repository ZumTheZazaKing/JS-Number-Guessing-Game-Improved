document.addEventListener('DOMContentLoaded', () => {

    //Important variables
    let difficulty;
    let maxNumber;
    let minNumber = 1;
    let randomNumber;
    let lives = 10;


    //DOM Element Selection
    const intro = document.querySelector('.intro');
    const ingame = document.querySelector('.ingame');
    const end = document.querySelector('.end');
    const gameMessage = ingame.querySelector('.header');
    const rangeText = ingame.querySelector('.rangeText');
    const beforeRange = ingame.querySelector('.beforeRange');
    const spaceRange = ingame.querySelector('.spaceRange');
    const afterRange = ingame.querySelector('.afterRange');
    const livesText = ingame.querySelector('.lives');
    const endMessage = end.querySelector('.header');
    const numberReveal = end.querySelector('.desc');

    livesText.innerHTML = "Lives: " + lives;

    const buttons = document.querySelectorAll('.button');

    buttons.forEach(button => button.addEventListener('click', () => {

        switch(button.innerHTML){

            case 'Easy':

                difficulty = 'easy';

                break;

            case 'Normal':

                difficulty = 'normal';

                break;

            case 'Hard':

                difficulty = 'hard';

                break;


            case 'Very Hard':

                difficulty = 'very hard';

                break;


            case 'Insane':

                difficulty = 'insane';

                break;
        }





        if(difficulty == 'easy'){
            maxNumber = 50;

        } else if(difficulty == 'normal'){
            maxNumber = 100;

        } else if(difficulty == 'hard'){
            maxNumber = 1000;

        } else if(difficulty == 'very hard'){
            maxNumber = 10000;

        } else if(difficulty == 'insane'){
            maxNumber = 100000;

        }



        randomNumber = Math.floor(Math.random()*maxNumber);



        intro.classList.add('hide');

        ingame.classList.remove('hide');

        rangeText.innerHTML = 'Current Range: 1-' + maxNumber;


    }));



    const userGuess = ingame.querySelector('.userGuess');

    userGuess.addEventListener('blur', () => {

        rangeText.classList.add('blink');


        if(userGuess.value < randomNumber && userGuess.value >= minNumber){

            gameMessage.innerHTML = 'Your Guess is Lower';

            minNumber = userGuess.value;

            beforeRange.style.flex = minNumber + '%';

            spaceRange.style.flex = maxNumber - minNumber + '%';

            rangeText.innerHTML = "Current Range: " + minNumber + "-" + maxNumber;

            lives--;

            livesText.innerHTML = "Lives: " + lives;


        } else if (userGuess.value > randomNumber && userGuess.value <= maxNumber){

            gameMessage.innerHTML = 'Your Guess is Greater';

            afterRange.style.flex = (userGuess.value/maxNumber)*100 + '%'

            spaceRange.style.flex = maxNumber - minNumber + '%';

            maxNumber = userGuess.value;

            rangeText.innerHTML = "Current Range: " + minNumber + "-" + maxNumber;

            lives--;

            livesText.innerHTML = "Lives: " + lives;
            

        } else if (userGuess.value == randomNumber){

            ingame.classList.add('hide');

            end.classList.remove('hide');

            endMessage.innerHTML = "Congratulations!<br>You guessed the number!";

            numberReveal.innerHTML = "The number was "+ randomNumber;

        } else if (userGuess.value > maxNumber || userGuess.value < minNumber){

            gameMessage.innerHTML = 'Your Guess Is Not In Bounds';

            lives--;

            livesText.innerHTML = "Lives: " + lives;

        }

    })


    setInterval(() => {

        if(lives == 0){

            ingame.classList.add('hide');

            end.classList.remove('hide');

            endMessage.innerHTML = "GAME OVER<br>You failed";

            numberReveal.innerHTML = "The number was "+ randomNumber;

        }

    },100);



    const againButton = document.querySelector('.again');

    againButton.addEventListener('click', () => {

        window.location.reload();

    })

})