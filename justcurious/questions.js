/*
  ===========================================================================
  QUESTIONS DATA
  ===========================================================================
  This is the ONLY file you should need to touch to add, remove, or edit
  questions. script.js just reads whatever is in here — it doesn't know or
  care what the questions actually say.

  HOW IT WORKS
  ---------------------------------------------------------------------------
  - `questions` is an object where every key is a unique question ID
    (e.g. "q1", "q2_book"). You make these IDs up — call them whatever
    helps you keep track of your branches.

  - Each question has:
      text:    the question shown to the person
      options: an array of possible answers, where each option has:
                 text: the label shown on the button/card
                 next: the ID of the question to show after this is picked,
                       OR the special string "end" to go to the thank-you
                       screen.

  - "start" tells the app which question ID to show first.

  HOW BRANCHING WORKS (conditional questions)
  ---------------------------------------------------------------------------
  Because each option has its own `next`, different answers to the same
  question can lead to completely different next questions. That's it —
  that's the whole branching system. Example below: q1's three answers
  each point to a different q2 variant.
  ===========================================================================
*/

const questionnaire = {
  start: "q1",

  questions: {

    q1: {
      text: "let's start of strong on...",
      options: [
        { text: "trending topics online", next: "q2_tto" },
        { text: "morality", next: "q2" },
        { text: "hot takes", next: "q11" },

      ],
    },

    // Branch A — shown only if they picked "book" on q1
    q2_tto: {
      text: "do you believe the term 'being too woke' is possible",
      options: [
        { text: "yes", next: "q3_tto"},
        { text: "no", next: "q3_tto"},
        { text: "it does exist but shouldn't be recognized becuase it does less harm", next: "q3_tto"},
      ],
    },
    q3_tto: {
      text: "misandary is just a word but can't exist realistically",
      options: [
        { text: "yes", next: "q4_tto"},
        { text: "no", next: "q4_tto"},
        { text: "it does exist but shouldn't be recognized becuase it does less harm", next: "q4_tto"},
      ],
    },
    q4_tto: {
      text: "dismantling patriarchy isn't the same as abloishing gender roles",
      options: [
        { text: "if yes...", next: "q4_tto1"},
        { text: "if no...", next: "q4_tto2"},
      ],
    },
    q4_tto1: {
      text: "yes dismantling patriarchy isn't the same as abloishing gender roles i.e",
      options: [
        { text: "marriage proposals should be done by the guy not the lady", next: "q5"},
        { text: "or it can be done by either", next: "q5"},
      ],
    },
    q4_tto2: {
      text: "no dismantling patriarchy is the same as abloishing gender roles i.e",
      options: [
        { text: "marriage proposals can be done by both genders", next: "q5"},
        { text: "or it shouldn't be done by either", next: "q5"},
      ],
    },
    q5: {
      text: "do you agree with nans take that men aren't allowed to call themselves feminists?",
      options: [
        { text: "yes- there's more to feminism than sharing the title 'feminist' ", next: "q6"},
        { text: "no- it's an unnecessary segregation", next: "q6"},
      ],
    },
    q6: {
      text: "your partner not wanting to be posted on  social media by you is...",
      options: [
        { text: "suspicious", next: "q7"},
        { text: "just a preference", next: "q7"},
      ],
    },
    q7: {
      text: "the term 'red flag', 'green flag', 'bareminium' are...",
      options: [
        { text: "social media standards and shouldn't be upheld in reality", next: "q8"},
        { text: "standards created on social media to set criterias to be met in relationships", next: "q8"},
      ],
    },
    q8: {
      text: "do you agree with nans take that men aren't allowed to call themselves feminists?",
      options: [
        { text: "yes- there's more to feminism than sharing the title 'feminist' ", next: "q_10"},
        { text: "no- it's an unnecessary segregation", next: "q_10"},
      ],
    },



    q2: {
      text: "poor people should have no kids",
      options: [
        { text: "true- it's cruel to bring childern into poverty", next: "q2_4" },
        { text: "no- it's unfair to deprive people of childern", next: "q2_4" },
      ],
    },
    
     q2_4: {
      text: "would you rather...",
      options: [
        { text: "abolish the discrimination and stigmatization of homosexuals in nigeria leading to the normalization ", next: "q2_5" },
        { text: "uphold the discrimation and stigmatization to prevent normalization", next: "q2_5" },
        
      ],
    },
    q2_5: {
      text: "would you rather...",
      options: [
        { text: "have your tiktok draft leaked ", next: "q2_6" },
        { text: "have your private videos on tiktok leaked", next: "q2_6" },
        
      ],
    },
    q2_6: {
      text: "would you rather...",
      options: [
        { text: "become a teen parent", next: "q_10" },
        { text: "never have kids all your life", next: "q_10" },
        
      ],
    },
    

    q11: {
      text: "not every man wanting a traditional relationship is misogynistic",
      options: [
        { text: "agree", next: "q12" },
        { text: "disagree", next: "q12" },
        
      ],
    },
    q12: {
      text: "Open relationships shouldn't exist",
      options: [
        { text: "agree", next: "q13" },
        { text: "disagree", next: "q13" },
        
      ],
    },
    q13: {
      text: "Abortion is murder",
      options: [
        { text: "DISAGREE", next: "q14" },
        { text: "disagree", next: "q14" },
        
      ],
    },
    q14: {
      text: "spliting bills during dates",
      options: [
        { text: "agree", next: "q15" },
        { text: "disagree", next: "q15" },
        
      ],
    },
    q15: {
      text: "you don't need a reason to cut people off, vice versa",
      options: [
        { text: "agree", next: "q16" },
        { text: "disagree", next: "q16" },
        
      ],
    },
    q16: {
      text: "women can choose not to be feminist",
      options: [
        { text: "DISAGREE", next: "q17" },
        { text: "disagree", next: "q17" },
        
      ],
    },
    q17: {
      text: "if they wanted to, they would",
      options: [
        { text: "agree", next: "q18" },
        { text: "disagree", next: "q18" },
        
      ],
    },
    q18: {
      text: "it is selfish to birth a child if you know they'll inevitably suffer i.e down syndrome, autism",
      options: [
        { text: "agree", next: "q_10" },
        { text: "disagree", next: "q_10" },
        
      ],
    },







    q_10: {
      text: "let's move on to...",
      options: [
        { text: "trending topics online", next: "q2_tto" },
        { text: "morality", next: "q2" },
        { text: "hot takes", next: "q11" },
        { text: "Finish", next: "end" },
        
      ],
    },

  },
};