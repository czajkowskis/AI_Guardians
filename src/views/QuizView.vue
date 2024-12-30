<script> 
  export default {
    data() {
      return {
        questions: [],
        results: [],
        feedback: "",
        fetched: false,
        currentIndex: 0
      };
    },
    computed: {
      currentQuestion() {
        if (this.questions.length > 0) {
          return this.questions[this.currentIndex];
        }
        return {};
      },

      finished() {
        return this.currentIndex >= this.questions.length-1;
      }
    },
    methods: {
      async fetchQuestions() {
        try {
          const response = await fetch("data/quiz.json");
          const data = await response.json();
          this.questions = data.questions;
          this.fetched = true;
        } catch (error) {
          console.error("Error loading JSON:", error);
        }
      },

      nextQuestion() {
        if (this.currentIndex < this.questions.length) {
          this.currentIndex++;
        }
      },
      
      selectAnswer(answer) {
        const isCorrect = this.currentQuestion.answer === answer;
        this.results.push({
          category: this.currentQuestion.category,
          image: this.currentQuestion.photo,
          userAnswer: answer,
          correctAnswer: this.currentQuestion.answer,
          result: isCorrect ? 1 : 0
        });

        if (isCorrect){
          this.feedback = "Correct!"
        }

        else{
          this.feedback = "Wrong!"
        }
      // Add shake class for animation
      const feedback_box = document.getElementById("feedback-box")
      feedback_box.classList.add('shake');

      // Remove the shake class after animation ends
      setTimeout(() => {
        feedback_box.classList.remove('shake');
      }, 500);

      setTimeout(() => {
        this.currentIndex++;
      }, 1000);

      }
     },

    mounted() {
      this.fetchQuestions();
    }
  }
</script>

<template>
 <div class="card">
    <div class="image-container">
      <img v-if="fetched" :src="this.currentQuestion.photo_src" alt="Test Image">
    </div>
    <div class="btn-container">
      <button class="btn btn-false" @click="selectAnswer(false)"><i class="fa-solid fa-xmark"></i>Generated</button>
      <button class="btn btn-true" @click="selectAnswer(true)"><i class="fa-solid fa-check"></i>Real</button>
    </div>
    <p id="feedback-box">{{this.feedback}}</p>
  </div>
</template>

<style scoped>
  body {
    background: #FAF9F6;
  }

  .card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: auto;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    border: 2px solid #000;
    border-radius: 10px;
    padding: 50px;
    background-color: #fff;
    width: 80%;
    height: 80vh;
  }

  .image-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 60%;
    border: 2px solid #ddd;
    border-radius: 10px;
    overflow: hidden;
  }

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }

  .btn-container {
    margin: auto;
    position: relative;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 50%;
  }

  .btn {
    min-width: 200px;
    padding: 20px;
    margin: 40px;
    font-family: "Poppins", sans-serif;
    font-size: 32px;
    border: none;
    transition: all 0.3s ease;
  }

  .btn i {
    margin-right: 20px;
  }

  .btn-false {
    color: #ffffff;
    background: #D14249;
  }

  .btn-false:hover {
    background: #DB7176;
    cursor: pointer;
  }

  .btn-true {
    color: #ffffff;
    background: #39C670;
  }

  .btn-true:hover {
    background: #63DF9A;
    cursor: pointer;
  }

  #feedback-box {
    font-family: "Poppins", sans-serif;
    font-size: 24px;
    color: #000;
    margin-top: 20px;
    font-weight: bold;
    display: inline-block;
  }

  /* Shake animation */
  @keyframes shake {
    0%, 100% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(-5px);
    }
    50% {
      transform: translateX(5px);
    }
    75% {
      transform: translateX(-5px);
    }
  }

  .shake {
    animation: shake 0.5s ease;
  }
</style>
