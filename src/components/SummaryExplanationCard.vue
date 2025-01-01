<script>
export default {
  props: {
    questionIndex: {
      type: Number,
      required: true,
    },
  },
  methods: {
    exit() {
      this.$emit("exit");
    },
  },
};
</script>

<template>
  <div class="explanation-card">
    <h1>Explanation goes here</h1>
    <button @click="exit">Go back</button>
  </div>
</template>

<style scoped>
.explanation-card {
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 50px;
  background-color: #fff;
  width: 100%;
  height: 100%;
  transform-origin: bottom right;
  z-index: 61;
}

button {
  max-width: 50%;
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

button:hover,
button:focus {
  box-shadow: 0 0.5em 0.5em -0.4em var(--hover);
  background: #ffde4d;
}

h1 {
  font-size: 100px;
  color: #000;
}

</style>
