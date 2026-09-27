/*
  ===========================================================================
  APP LOGIC
  ===========================================================================
  This file reads the `questionnaire` object from questions.js and handles:
    - switching between the landing / quiz / thank-you screens
    - showing one question at a time
    - tracking which answer is currently selected
    - moving to the correct next question based on that answer (branching)
    - storing every answer given, ready to be sent to a backend later

  You shouldn't need to edit this file to change your questions — see
  questions.js for that. You WOULD come back here if you wanted to change
  *how the app behaves* (e.g. what happens when it finishes).
  ===========================================================================
*/

// ---------------------------------------------------------------------
// Grab references to the bits of HTML we need to change
// ---------------------------------------------------------------------
const screenLanding = document.getElementById("screen-landing");
const screenQuiz = document.getElementById("screen-quiz");
const screenEnd = document.getElementById("screen-end");

const btnBegin = document.getElementById("btn-begin");
const btnNext = document.getElementById("btn-next");

const questionNumberEl = document.getElementById("question-number");
const questionTextEl = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const progressFill = document.getElementById("progress-fill");

// ---------------------------------------------------------------------
// App state — everything the app currently "knows"
// ---------------------------------------------------------------------
const state = {
  currentQuestionId: questionnaire.start, // which question we're on
  selectedOptionIndex: null,              // index of the option they've clicked (not confirmed yet)
  answers: [],                            // every confirmed answer, in order
};

// Roughly how many questions a typical path through the questionnaire has.
// Since branching means the exact total isn't fixed, this is just used to
// make the progress bar feel meaningful rather than being 100% precise.
const TYPICAL_PATH_LENGTH = 4;

// Your Google Apps Script Web app URL — answers get POSTed here.
const SHEET_URL = "https://script.google.com/macros/s/AKfycbzB5wtVAyMp9xnyIDD_6H0cLuwhidmLLgT28d19IEtBlijHJGKq89LLEVGe8HsP6INitQ/exec";

// ---------------------------------------------------------------------
// Screen switching
// ---------------------------------------------------------------------
function showScreen(screen) {
  screenLanding.hidden = screen !== screenLanding;
  screenQuiz.hidden = screen !== screenQuiz;
  screenEnd.hidden = screen !== screenEnd;
}

// ---------------------------------------------------------------------
// Rendering a question onto the quiz screen
// ---------------------------------------------------------------------
function renderQuestion(questionId) {
  const question = questionnaire.questions[questionId];

  // Reset selection state for the new question
  state.currentQuestionId = questionId;
  state.selectedOptionIndex = null;
  btnNext.disabled = true;

  // Update the step label, e.g. "Step 2"
  questionNumberEl.textContent = `Step ${state.answers.length + 1}`;

  // Update the question text
  questionTextEl.textContent = question.text;

  // Update the progress bar
  const progress = Math.min(
    (state.answers.length / TYPICAL_PATH_LENGTH) * 100,
    100
  );
  progressFill.style.width = `${progress}%`;

  // Build an option card for every possible answer
  optionsContainer.innerHTML = ""; // clear previous question's options

  question.options.forEach((option, index) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "option-card";
    card.textContent = option.text;
    card.addEventListener("click", () => selectOption(index));
    optionsContainer.appendChild(card);
  });
}

// ---------------------------------------------------------------------
// Handling an option being selected
// ---------------------------------------------------------------------
function selectOption(index) {
  state.selectedOptionIndex = index;

  // Visually mark the chosen card, un-mark the rest
  const cards = optionsContainer.querySelectorAll(".option-card");
  cards.forEach((card, i) => {
    card.classList.toggle("option-card--selected", i === index);
  });

  // Now that something is picked, Next becomes clickable
  btnNext.disabled = false;
}

// ---------------------------------------------------------------------
// Moving to the next question (or the end screen)
// ---------------------------------------------------------------------
function goToNext() {
  const question = questionnaire.questions[state.currentQuestionId];
  const chosenOption = question.options[state.selectedOptionIndex];

  // Save this answer. This is the shape you'd eventually send to a
  // backend — one object per question, in the order they were answered.
  state.answers.push({
    questionId: state.currentQuestionId,
    question: question.text,
    answer: chosenOption.text,
  });

  if (chosenOption.next === "end") {
    finishQuestionnaire();
  } else {
    renderQuestion(chosenOption.next);
  }
}

// ---------------------------------------------------------------------
// Finishing up
// ---------------------------------------------------------------------
function finishQuestionnaire() {
  progressFill.style.width = "100%";
  showScreen(screenEnd);

  console.log("Questionnaire complete. Answers:", state.answers);
  sendAnswersToSheet(state.answers);
}

// ---------------------------------------------------------------------
// Sending the answers to the Google Sheet backend
// ---------------------------------------------------------------------
function sendAnswersToSheet(answers) {
  // Note on "Content-Type": "text/plain" below — this isn't a mistake.
  // Sending it as JSON would make the browser do a CORS "preflight"
  // check first, which Apps Script web apps don't handle, and the
  // request would fail. text/plain sidesteps that; Apps Script still
  // reads the text and parses it as JSON on its end just fine.
  fetch(SHEET_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain" },
    body: JSON.stringify(answers),
  }).catch((error) => {
    // We can't reliably read the response back from Apps Script, so we
    // don't try to check "did it succeed" here — just catch outright
    // network failures (e.g. no internet) so they don't go unnoticed.
    console.error("Couldn't reach the Sheet:", error);
  });
}

// ---------------------------------------------------------------------
// Wiring up the buttons
// ---------------------------------------------------------------------
btnBegin.addEventListener("click", () => {
  showScreen(screenQuiz);
  renderQuestion(questionnaire.start);
});

btnNext.addEventListener("click", goToNext);
