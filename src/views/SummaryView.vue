<script>
  import SummaryExplanationCard from '../components/SummaryExplanationCard.vue'
  export default {
    components: {
      SummaryExplanationCard
    },

    data() {
      return {
        questions: [],
        currentIndex: 0,
        userAnswers: JSON.parse(localStorage.getItem('userAnswers')) || [],
        explanationVisible: false,
      };
    },
    computed: {
      currentQuestion() {
        if (this.questions.length > 0) {
          return this.questions[this.currentIndex];
        }
        return {};
      },

      isAnswerCorrect() {
        return this.userAnswers[this.currentIndex];
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
        } catch (error) {
          console.error("Error loading JSON:", error);
        }
      },

      nextSlide() {
        if (this.currentIndex < this.questions.length) {
          this.currentIndex++;
        }
      },

      previousSlide() {
        if (this.currentIndex > 0){
          this.currentIndex = this.currentIndex - 1;
        }
      },

      viewExplanation() {
        this.explanationVisible = true;
      },

      exitExplanation() {
        this.explanationVisible = false;
      }

    },

    mounted() {
      this.fetchQuestions();
    }
  }
</script>

<template>
  <div class="card">
    <div class="top-container">
      <h1 id="slide-title">Results</h1>
    </div>
    <div class="bottom-container">
      <div class="left-container">
        <button class="btn" @click="previousSlide()"><i class="fa-solid fa-arrow-left"></i></button>
      </div>
      <div class="middle-container">
        <div class="feedback-box">
          <h1 v-if="isAnswerCorrect" class="correct">Correct <i class="fa-solid fa-circle-check"></i></h1>
          <h1 v-else class="incorrect"> Wrong <i class="fa-solid fa-circle-xmark"></i></h1>
        </div>
        <div class="image-container">
          <img :src="this.currentQuestion.photo_src" alt="Image">
        </div>
        <button class="rectangular-button" @click="viewExplanation">View Explanation</button>
      </div>
      <div class="right-container">
        <button class="btn" @click="nextSlide()"><i class="fa-solid fa-arrow-right"></i></button>
      </div>
    </div>
    <transition name="rotation">
        <SummaryExplanationCard
            v-if="explanationVisible"
            :questionIndex="currentIndex"
            @exit="exitExplanation"
        />
    </transition>
  </div>
  
</template>

<style scoped>
  .card {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: auto;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    border: 2px solid #000;
    border-radius: 10px;
    background-color: #fff;
    width: 80%;
    height: 80vh;
    overflow: hidden;
    z-index: 60;
  }

  .top-container {
    background: #FFEE8C;
    width: 35%;
    padding: 0 20px;
    border-right: 2px solid #000;
    border-bottom: 2px solid #000;
    z-index: 59;
  }

  .bottom-container {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 100%;
  }

  .left-container {
    display: flex;
    align-items: center;
    padding: 0 50px;
  }

  .right-container {
    display: flex;
    align-items: center;
    padding: 0 50px;
  }

  .middle-container {
    display: flex;
    flex-direction: column;
    align-content: center;
    height: 100%;
  }

  .image-container {
    height: 50%;
  }

  .btn {
    background-color: #FFEE8C;
    color: #000;
    width: 100px;
    height: 100px;
    border: None;
    border-radius: 50%;
    font-size: 64px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .btn:hover {
    background-color: #ffc107;
  }

  .rectangular-button {
    margin: 0 auto;
    background: #FFEE8C;
    color: #000;
    border: 2px solid #000;
    padding: 20px 100px;
    font-family: "Poppins", sans-serif;
    font-size: 32px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.3s ease;
  }

  .rectangular-button:hover,
  .rectangular-button:focus {
    box-shadow: 0 0.5em 0.5em -0.4em var(--hover);
    background: #ffde4d;
  }

  .feedback-box {
    margin: 0 auto;
    padding: 0;
    display: flex;
    justify-items: space-between;
  }

  h1 {
    font-size: 48px;
    color: #000;
  }

  h1.correct {
    font-size: 64px;
    color: #39C670
  }

  h1.incorrect {
    font-size: 64px;
    color: #D14249;
  }

  .fa-circle-check {
    font-size: 64px;
    margin-left: 30px;
    color: #39C670;
  }

  .fa-circle-xmark {
    font-size: 64px;
    margin-left: 30px;
    color: #D14249;
  }

  img {
    max-width: 100%;
    max-height: 100%;
  }
  
  /* Animations */
  .rotation-enter-active,
  .rotation-leave-active {
    transition: all 1s ease-in-out;
  }

  /* Initial state when entering */
  .rotation-enter-from {
    transform: rotate(90deg);
  }

  /* Final state after entering */
  .rotation-enter-to {
    transform: rotate(0deg);
  }

  /* Initial state when leaving */
  .rotation-leave {
    transform: rotate(0deg);
  }

  /* Final state after leaving */
  .rotation-leave-to {
    transform: rotate(90deg);
  }
</style>
