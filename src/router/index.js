
import { createRouter, createWebHistory } from 'vue-router';
import PresentationView from '../views/PresentationView.vue';
import QuizView from '../views/QuizView.vue'
const router = createRouter({
  history: createWebHistory(),
	routes: [
		{path: '/', name: 'Presentation', component: PresentationView},
		{path: '/quiz', name: 'Quiz', component: QuizView}
	]
});

export default router;
