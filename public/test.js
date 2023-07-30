let userAnswers = [];

    function displayQuestions(questions) {
      const questionsContainer = document.getElementById('questions-container');

      questions.forEach((question, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.innerHTML = `
          <p>${index + 1}. ${question.caption}</p>
          <input type="radio" name="question${index}" value="true" onclick="handleAnswer(true, ${index})">Yes
          <input type="radio" name="question${index}" value="false" onclick="handleAnswer(false, ${index})">No
        `;
        questionsContainer.appendChild(questionDiv);
      });
    }

    function handleAnswer(answer, index) {
      userAnswers[index] = answer;
    }

    function handSubmit() {
      fetch('http://localhost:5508/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ answers: userAnswers })
      })
      .then(response => response.json())
      .then(data => {
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = `Number of Correct Answers: ${data.score}`;
      })
      .catch(error => {
        console.error('Error submitting answers:', error);
      });
    }

    function startTest() {
      document.getElementById('start-button').style.display = 'none';
      document.getElementById('test-container').style.display = 'block';

      fetch('http://localhost:5508/api/questions')
        .then(response => response.json())
        .then(questions => {
          displayQuestions(questions);
        })
        .catch(error => {
          console.error('Error fetching questions:', error);
        });
    }

    document.getElementById('start-button').addEventListener('click', startTest);
    document.getElementById('submit-button').addEventListener('click', handleSubmit);
