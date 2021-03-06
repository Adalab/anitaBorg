"use strict";
var number = document.querySelector('.number-question');
var question = document.querySelector('.question-text');
var answerOne = document.getElementById('answer1');
var answerTwo = document.getElementById('answer2');
var answerThree = document.getElementById('answer3');
var answerFour = document.getElementById('answer4');
var btnStart = document.querySelector('.btn-quiz');
var btnNext = document.querySelector(".btn-next");
var textQuiz = document.querySelector('.text-quiz');
var scorePage = document.querySelector('.score-page');
var fbButton = document.querySelector('.fb-button');
var totalScore = document.querySelector('.score');
var index = 0;
var info;
var random;
var result = 0;
var request = new XMLHttpRequest();

function printTestQuestion() {

  if (index < 10) {
    if (index > 0 && random === parseInt(document.querySelector('.radio-format:checked').value)) {
      result = result + 1;
    } else {
      result = result + 0;
    }
    random = Math.floor(Math.random() * (4 - 0)) + 0;
    var positionAnswer = [];
    for (var i = 0; i < 3; i++) {
      positionAnswer.push(info.incorrectList[index][i]);
    }
    positionAnswer.splice(random, 0, info.correctList[index]);
    number.innerHTML = 'Pregunta ' + (index + 1) + '/10';
    question.innerHTML = info.questionList[index];
    answerOne.innerHTML = positionAnswer[0];
    answerTwo.innerHTML = positionAnswer[1];
    answerThree.innerHTML = positionAnswer[2];
    answerFour.innerHTML = positionAnswer[3];
    index = index + 1;
    ["option1", "option2", "option3", "option4"].forEach(function(id) {
      document.getElementById(id).checked = false;
    });
    return false;
  } else {
    if (index > 0 && random === parseInt(document.querySelector('.radio-format:checked').value)) {
      result = result + 1;
    } else {
      result = result + 0;
    }
    scorePage.classList.remove('hidden');
    fbButton.classList.remove('hidden');
    textQuiz.classList.add('hidden');
    btnNext.classList.add('hidden');
    totalScore.innerHTML = result;
    document.getElementById("result-facebook").setAttribute("content", "Mi resultado ha sido: " + result + "/10");
  }
}

function getTestInfo() {
  request.open('GET', 'https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple', true);
  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      var data = JSON.parse(request.responseText);
      info = {
        questionList: [],
        correctList: [],
        incorrectList: []
      };
      for (var i = 0; i < 10; i++) {
        info.questionList.push(data.results[i].question);
        info.correctList.push(data.results[i].correct_answer);
        info.incorrectList.push(data.results[i].incorrect_answers);
      }
      printTestQuestion(info, index);
      btnNext.addEventListener("click", printTestQuestion);
    } else {
      console.log('Error del servidor, puede que el archivo no exista o que se haya producido un error interno en el servidor');
    }
  };
  request.onerror = function() {
    console.log('Error al tratar de conectarse con el servidor');
  };

  request.send();
}

function initTest() {
  getTestInfo();
  result = 0;
  index = 0;
}

btnStart.addEventListener('click', initTest);

fbButton.onclick = function() {
  FB.ui({
    method: 'share',
    mobile_iframe: true,
    quote: "¡He sacado un " + result + " en el test tecnológico de Anita Borg. ¿Te atreves a superarme?",
    href: 'https://adalab.github.io/anitaBorg/quiz.html',
  }, function(response) {});
};
