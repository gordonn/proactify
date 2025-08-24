const body = document.body;
const workDurationInput = document.getElementById("work-duration");
const restDurationInput = document.getElementById("rest-duration");
const timerTime = document.getElementById("timer-time");
const circleProgress = document.querySelector(".circle-progress");

let workDuration = parseInt(workDurationInput.value) * 60;
let restDuration = parseInt(restDurationInput.value) * 60;
let remainingTime = workDuration;
let isPaused = true;
let isWorking = true;
let intervalId;

const completedSessionsElement = document.getElementById("completed-sessions");
let completedSessions = 0;
completedSessionsElement.textContent = completedSessions;

// Start Button
const startBtn = document.getElementById("start-btn");
startBtn.addEventListener("click", () => {
  isPaused = false;

  body.classList.add("timer-running");

  if (isWorking) {
    body.classList.remove("timer-paused");
  } else {
    body.classList.add("rest-mode");
    body.classList.remove("timer-paused");
  }

  if (!intervalId) {
    intervalId = setInterval(updateTimer, 1000);
  }
});

// Pause Button
const pauseBtn = document.getElementById("pause-btn");
pauseBtn.addEventListener("click", () => {
  isPaused = true;
  body.classList.remove("timer-running");
  body.classList.add("timer-paused");
});

// Settings
const btnToggleSettings = document.getElementById("toggle-settings");
const btnCloseSettings = document.getElementById("close-settings");

function setBodySettings() {
  body.classList.contains("settings-active")
    ? body.classList.remove("settings-active")
    : body.classList.add("settings-active");
}

function toggleSettings() {
  if (event.type === "click") {
    setBodySettings();
  } else if (event.type === "keydown" && event.keyCode === 27) {
    body.classList.remove("settings-active");
  }
}

btnToggleSettings.addEventListener("click", toggleSettings);
btnCloseSettings.addEventListener("click", toggleSettings);
document.addEventListener("keydown", toggleSettings);

// Work / rest settings:
workDurationInput.addEventListener("change", () => {
  workDuration = parseInt(workDurationInput.value) * 60;
  if (isWorking) {
    remainingTime = workDuration;
    updateProgress();
  }
});

restDurationInput.addEventListener("change", () => {
  restDuration = parseInt(restDurationInput.value) * 60;
  if (isWorking) {
    remainingTime = workDuration;
    updateProgress();
  }
});

// Update timer
function updateTimer() {
  if (!isPaused) {
    remainingTime--;
    if (remainingTime <= 0) {
      isWorking = !isWorking;
      remainingTime = isWorking ? workDuration : restDuration;

      if (!isWorking) {
        body.classList.add("rest-mode");
        body.classList.remove("timer-running");

        completedSessions++;
        completedSessionsElement.textContent = completedSessions;
      } else {
        body.classList.remove("rest-mode");
        body.classList.remove("timer-running");
      }

      isPaused = false;
      body.classList.remove("timer-work-active");
    }

    updateProgress();
  }
}

// Update progress
function updateProgress() {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;

  const totalDuration = isWorking ? workDuration : restDuration;
  const dashOffset = (circumference * remainingTime) / totalDuration;

  circleProgress.style.strokeDashoffset = dashOffset;
  timerTime.textContent = formatTime(remainingTime);
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
}

updateProgress();
