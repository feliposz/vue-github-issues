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

        <b-table bordered :fields="fields" :items="issues" v-if="showIssues">
          <template #cell(number)="data">
            <router-link :to="{ name: 'GitHubIssue', params: { username: form.username, repository: form.repository, issue: data.value } }">{{ data.value }}</router-link>
          </template>
          <template #cell(title)="data">
            {{data.value}}
          </template>
        </b-table>

        <b-alert variant="warning" :show="noIssues">No issues found</b-alert>

        <b-alert variant="danger" :show="showError">{{ response.message }}</b-alert>

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
    this.loadLocalData();
  },

  data() {
    return {
      form: {
        username: "",
        repository: ""
      },
      fields: ["number", "title"],
      issues: [],
      response: {
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
      await this.getIssues();
      this.saveLocalData();
    },

    onReset(evt) {
      evt.preventDefault();
      this.resetForm();
      this.clearLocalData();
    },

    resetForm() {
      this.form.username = "";
      this.form.repository = "";
      this.issues = [];
      this.resetResponse();
    },

    resetResponse() {
      this.response.status = "";
      this.response.message = "";
    },

    async getIssues() {
      try {
        this.loader.getIssues = true;
        const { username, repository } = this.form;
        const url = `https://api.github.com/repos/${username}/${repository}/issues`;
        const result = await axios.get(url);
        this.resetResponse();
        this.issues = result.data;
      } catch {
        this.response.status = "error";
        this.response.message = "Repository not found";
        this.issues = [];
      } finally {
        this.loader.getIssues = false;
      }
    },

    saveLocalData() {
      localStorage.setItem(
        "vue-github-issues-data",
        JSON.stringify({
          username: this.form.username,
          repository: this.form.repository
        })
      );
    },

    loadLocalData() {
      const localData = JSON.parse(
        localStorage.getItem("vue-github-issues-data")
      );
      if (localData && localData.username && localData.repository) {
        this.form.username = localData.username;
        this.form.repository = localData.repository;
        this.getIssues();
      }
    },

    clearLocalData() {
      localStorage.removeItem("vue-github-issues-data");
    }
  },

  computed: {
    showIssues() {
      return this.response.status !== "error" && !this.loader.getIssues && this.issues.length > 0;
    },

    noIssues() {
      return this.response.status !== "error" && !this.loader.getIssues && this.issues.length === 0;
    },

    showError() {
      return this.response.status === "error";
    }
  }
};
</script>
