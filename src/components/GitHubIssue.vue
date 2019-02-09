<template>
  <b-container>
    <b-row>
      <b-col md="12">
        <img src="/loading.svg" alt="Loading..." v-if="loader.getIssue">
        <div v-if="!loader.getIssue">
          <h1>Issue #{{issue.number}}</h1>
          <h2>{{issue.title}}</h2>
          <div>{{issue.body}}</div>
          <b-button variant="primary" href="javascript:history.go(-1)">Back</b-button>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from "axios";

axios.defaults.headers.common.Accept = "application/vnd.github.v3+json";

export default {
  name: "GitHubIssues",

  created() {
    this.getIssue();
  },

  data() {
    return {
      issue: {},
      loader: {
        getIssue: false
      }
    };
  },

  methods: {
    async getIssue() {
      try {
        this.loader.getIssue = true;
        const { username, repository, issue } = this.$route.params;
        const url = `https://api.github.com/repos/${username}/${repository}/issues/${issue}`;
        const result = await axios.get(url);
        this.issue = result.data;
      } catch {
        this.issue = {};
      } finally {
        this.loader.getIssue = false;
      }
    }
  }
};
</script>
