const submit = document.querySelector('button');
const form = document.querySelector('input');
const number = Math.ceil(Math.random() * 10);

function findWinner() {
    const number = Math.ceil(Math.random() * 10);
    const guess = form.valueAsNumber;

    console.log(guess);
    if (guess < 1 || guess > 10) {
        alert("Please pick a number between 1 and 10")
    } else if (guess === number) {
        alert("You win!!")
    } else {
        alert(`You lost. Sorry the number was ${number}`);
    }
}
