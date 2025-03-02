let exercises = {};
let selectedLevel = new URLSearchParams(window.location.search).get("level");

fetch("exercises.json")
    .then(response => response.json())
    .then(data => {
        exercises = data;
        if (selectedLevel && exercises[selectedLevel]) {
            document.getElementById("level-title").innerText = selectedLevel;
            loadExercise();
        } else {
            document.body.innerHTML = "<h2>Invalid level selected</h2>";
        }
    });

function loadExercise() {
    let randomIndex = Math.floor(Math.random() * exercises[selectedLevel].length);
    let exercise = exercises[selectedLevel][randomIndex];

    document.getElementById("exercise-text").innerText = exercise.question;
    document.getElementById("exercise-text").dataset.answer = exercise.answer.toLowerCase();
}

function checkAnswer() {
    let userAnswer = document.getElementById("user-answer").value.trim().toLowerCase();
    let correctAnswer = document.getElementById("exercise-text").dataset.answer;

    if (userAnswer === correctAnswer) {
        document.getElementById("feedback").innerText = "✅ Correct!";
    } else {
        document.getElementById("feedback").innerText = "❌ Try again.";
    }

    setTimeout(loadExercise, 2000);
}

