const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'Mickey Mouse was originally known as _____?',
        choice1:'Steamboat Willie',
        choice2:'Mockey Mouse',
        choice3:'Tuck Mouse',
        choice4:'Steamboat Billy',
        answer: 1,
        reason: `Sorry, Steamboat Willie is the correct answer and now in the public domain!`,
    },
      {
        question: 'Most John Hughes films take place in what city?',
        choice1:'Houston',
        choice2:'Los Angeles',
        choice3:'Boston',
        choice4:'Chicago',
        answer: 4,
        reason: `Hughes loved Chicago and set every major film of his in this location.`,
      },
      {
        question: 'In Legally Blonde, Elle Woods solves the case because of what classic hairstyle?',
        choice1: 'The Rachel',
        choice2: 'Perm',
        choice3: 'Afro',
        choice4: 'Buzzcut',
        answer: 2,
        reason: `Perm maintance became commonplace because of this famous film climax.`,
      },
      {
        question: 'What actor is considered to be the worst with 10 Razzie wins for acting',
        choice1: 'Madonna',
        choice2: 'Ben Affleck',
        choice3: 'Adam Sandler',
        choice4: 'Sylvestor Stallone',
        answer: 4,
        reason: `Sylvestor Stallone has the most wins and nominations with 20 nominations total. Sandler is second.`,
      },
      {
        question: 'Ridley Scott, Alfred Hitchcock, and Stanley Kubrick have won how many Oscars for Best Directing?',
        choice1: '1',
        choice2: '0',
        choice3: '5',
        choice4: '3',
        answer: 2,
        reason: `Honorary Awards not counting, these greats have never won.`,
      },
      {
        question: 'Which of the following WAS NOT an unscripted moment left in the movie',
        choice1: 'The Hateful Eight, Kurt Russell smashes a priceless guitar',
        choice2: 'Django Unchained, Leonardo Dicaprio cuts his hand',
        choice3: 'Taxi Driver, The "You Talking to Me?" monologue',
        choice4: 'Spider-Man, Tobey Maguire catches all the lunch items on the tray',
        answer: 4,
        reason: `It took Tobey 156 attempts to complete and an entire 16 hour day shoot.`,
      },
      {
        question: 'Which of the following films has 0 Oscar nominations',
        choice1:  'Click',
        choice2:  'Norbit',
        choice3:  'Jackass Presents: Bad Grampa',
        choice4:  'The Big Lebowski',
        answer: 4,
        reason: `The Big Lebowski had 0 noms. The others were each for Best Makeup.`,
      },
      {
        question: "John Wayne said the line 'Pilgrim' in how many films?",
        choice1:  'every film',
        choice2:  '4',
        choice3:  '2',
        choice4:  '8',
        answer: 3,
        reason: `To be fair, he did say it A LOT in both those films.`,
      },
      {
        question: 'What film was the first to show a toilet',
        choice1: 'Psycho',
        choice2: '8 1/2',
        choice3: 'Citizen Kane',
        choice4: 'The Usual Suspects',
        answer: 1,
        reason: `Psycho is the first with paper being shown flushed down the toilet.`,
      },
      {
        question: 'What composer broke the record in 2023 for composing the most consecutive movies in a film series',
        choice1: 'Charlie Clouser',
        choice2: 'John Williams',
        choice3: 'Ennio Morricone',
        choice4: 'Hans Zimmer',
        answer: 1,
        reason: `Charlie Clouser has 10 in the Saw film franchise.`,
      },
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 10

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']
        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
            setTimeout(() => {
                selectedChoice.parentElement.classList.remove(classToApply)
                getNewQuestion()
    
            }, 500)
        } else if (classToApply === 'incorrect') {
            question.innerText = currentQuestion.reason
            setTimeout(() => {
                selectedChoice.parentElement.classList.remove(classToApply)
                getNewQuestion()
    
            }, 3000)
        }

        selectedChoice.parentElement.classList.add(classToApply)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

window.addEventListener("load", function() {
    const clock = document.getElementById("stopwatch");
    let time = -1, intervalId;
    function incrementTime() {
      time++;
      clock.textContent =
        ("0" + Math.trunc(time / 60)).slice(-2) +
        ":" + ("0" + (time % 60)).slice(-2);
    }
    incrementTime();
    intervalId = setInterval(incrementTime, 1000);
  });

startGame()