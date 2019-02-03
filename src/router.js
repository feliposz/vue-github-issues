import Vue from 'vue';
import Router from 'vue-router';
import GitHubIssues from '@/components/GitHubIssues.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'GitHubIssues',
      component: GitHubIssues,
    },
  ],
});
