import Vue from 'vue';
import Router from 'vue-router';
import GitHubIssues from '@/components/GitHubIssues.vue';
import GitHubIssue from '@/components/GitHubIssue.vue';

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
    {
      path: '/:username/:repository/:issue',
      name: 'GitHubIssue',
      component: GitHubIssue,
    },
  ],
});
