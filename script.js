const totalTasks = 10;
let tasks = [];
let incorrectTasks = [];
let currentTaskIndex = 0;

function loadStatistics() {
  const stats = {
    totalTasks: parseInt(localStorage.getItem("totalTasks")) || 0,
    correctAnswers: parseInt(localStorage.getItem("correctAnswers")) || 0,
    incorrectAnswers: parseInt(localStorage.getItem("incorrectAnswers")) || 0,
  };
  return stats;
}

function saveStatistics(stats) {
  localStorage.setItem("totalTasks", stats.totalTasks);
  localStorage.setItem("correctAnswers", stats.correctAnswers);
  localStorage.setItem("incorrectAnswers", stats.incorrectAnswers);
}

function updateStatisticsDisplay(stats) {
  document.getElementById(
    "totalTasks"
  ).textContent = `Всего задач: ${stats.totalTasks}`;
  document.getElementById(
    "correctAnswers"
  ).textContent = `Правильных: ${stats.correctAnswers}`;
  document.getElementById(
    "incorrectAnswers"
  ).textContent = `Неправильных: ${stats.incorrectAnswers}`;
}

function initializeTasks() {
  tasks = [];
  for (let i = 0; i < totalTasks; i++) {
    tasks.push(generateTask());
  }
}

function generateTask() {
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  const task = { num1, num2, answer: num1 * num2 };
  return task;
}

function displayTask(task) {
  document.getElementById(
    "task"
  ).textContent = `${task.num1} x ${task.num2} = ?`;
  document.getElementById("answer").value = "";
}

function checkAnswer() {
  const userAnswer = parseInt(document.getElementById("answer").value);
  const task = tasks[currentTaskIndex];
  const stats = loadStatistics();

  stats.totalTasks++;

  if (userAnswer === task.answer) {
    stats.correctAnswers++;
    nextTask();
  } else {
    stats.incorrectAnswers++;
    document.getElementById(
      "feedback"
    ).textContent = `Неправильно! Правильный ответ: ${task.answer}`;
    incorrectTasks.push(task);

    document.getElementById("checkBtn").style.display = "none";

    document.getElementById("nextTaskButton").style.display = "block";
  }

  saveStatistics(stats);
  updateStatisticsDisplay(stats);


}

function nextTask() {
  document.getElementById("feedback").textContent = "";
  document.getElementById("nextTaskButton").style.display = "none";

  document.getElementById("checkBtn").style.display = "block";

  currentTaskIndex++;

  if (currentTaskIndex < tasks.length) {
    displayTask(tasks[currentTaskIndex]);
  } else if (incorrectTasks.length > 0) {
    tasks = [...incorrectTasks];
    incorrectTasks = [];
    currentTaskIndex = 0;
    displayTask(tasks[currentTaskIndex]);
  } else {
    const stats = loadStatistics();
    document.getElementById(
      "task-container"
    ).innerHTML = `<p>Тренировка завершена! Правильных ответов: ${stats.correctAnswers}/${stats.totalTasks}</p>`;
    document.getElementById("restartButton").style.display = "block";
  }
}

// Перезапуск тренировки
function restartTraining() {
  location.reload();
}

function handleKeyDown(event) {
  if (event.keyCode === 13) {
    checkAnswer();
  }
}

// Инициализация
const initialStats = loadStatistics();
updateStatisticsDisplay(initialStats);
initializeTasks();
displayTask(tasks[currentTaskIndex]);

document.getElementById("answer").addEventListener("keydown", handleKeyDown);
