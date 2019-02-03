<template>
  <b-container>
    <b-row>
      <b-col md="12">
        <h1>Vue.js + GitHub Issues</h1>
        <hr>
        <p class="lead">List issues from a Github repository using Vue.</p>
        <b-form inline @submit="onSubmit" @reset="onReset">
          <label for="username" class="sr-only">Username</label>
          <b-input id="username" class="mb-2 mr-sm-2 mb-sm-0" type="text" v-model="form.username" required placeholder="Username" />
          <label for="repository" class="sr-only">Resository</label>
          <b-input id="repository" class="mb-2 mr-sm-2 mb-sm-0" type="text" v-model="form.repository" required placeholder="Repository" />
          <b-button class="mb-2 mr-sm-2 mb-sm-0" type="submit" variant="success">Search</b-button>
          <b-button class="mb-2 mr-sm-2 mb-sm-0" type="reset" variant="danger">Reset</b-button>
        </b-form>
        <hr>
        <img src="/loading.svg" alt="Loading..." v-if="loader.getIssues">
        <b-table bordered :items="issues" v-if="!loader.getIssues && issues.length > 0">
        </b-table>
        <b-alert variant="warning" :show="!loader.getIssues && error.status === 'error'" v-text="error.message"></b-alert>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from "axios";

export default {
  name: "GitHubIssues",

  data() {
    return {
      form: {
        username: "",
        repository: ""
      },
      issues: [],
      error: {
        status: "",
        message: ""
      },
      loader: {
        getIssues: false
      }
    };
  },

  methods: {
    async onSubmit(evt) {
      evt.preventDefault();
      try {
        this.loader.getIssues = true;
        const url = `https://api.github.com/repos/${this.form.username}/${
          this.form.repository
        }/issues`;
        const result = await axios.get(url);
        this.issues = result.data.map(issue => ({
          number: issue.number,
          title: issue.title
        }));
      } catch {
        this.error.status = "error";
        this.error.message = "Not found";
        this.issues = [];
      } finally {
        this.loader.getIssues = false;
      }
    },

    onReset(evt) {
      evt.preventDefault();
      this.form.username = "";
      this.form.repository = "";
      this.issues = [];
      this.error.status = "";
      this.error.message = "";
    }
  }
};
</script>
