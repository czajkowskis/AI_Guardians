
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ReadyView from '../views/ReadyView.vue'
import PresentationView from '../views/PresentationView.vue';
import QuizView from '../views/QuizView.vue'
import ResultsView from '../views/ResultsView.vue'
import SummaryView from '../views/SummaryView.vue'

const router = createRouter({
  history: createWebHistory(),
	routes: [
		{path: '/', name: 'Home', component: HomeView},
		{path: '/slides', name: 'Presentation', component: PresentationView},
		{path: '/ready', name: "Ready", component: ReadyView},
		{path: '/quiz', name: 'Quiz', component: QuizView},
		{path: '/results', name: 'Results', component: ResultsView},
		{path: '/summary', name: 'Summary', component: SummaryView},
	]
});

export default router;
