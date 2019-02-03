<template>
  <b-container fluid>
    <b-row>
      <b-col offset-md="2" md="8">
        <h1>Vue.js + GitHub Issues</h1>
        <hr>
        <p>List issues from a Github repository using Vue.</p>
        <b-form inline @submit="onSubmit" @reset="onReset">
          <label for="username" class="sr-only">Username</label>
          <b-input id="username" class="mb-2 mr-sm-2 mb-sm-0" type="text" v-model="form.username" required placeholder="Username" />
          <label for="repository" class="sr-only">Resository</label>
          <b-input id="repository" class="mb-2 mr-sm-2 mb-sm-0" type="text" v-model="form.repository" required placeholder="Repository" />
          <b-button class="mb-2 mr-sm-2 mb-sm-0" type="submit" variant="success">Search</b-button>
          <b-button class="mb-2 mr-sm-2 mb-sm-0" type="reset" variant="danger">Reset</b-button>
        </b-form>
        <hr>
        <b-table bordered :items="issues">
        </b-table>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "",
        repository: ""
      },
      issues: [{ number: 123, title: "Test" }, { number: 456, title: "Test 2" }]
    };
  },

  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      console.log(this.form.username);
      console.log(this.form.repository);
    },
    onReset(evt) {
      evt.preventDefault();
      this.form.username = "";
      this.form.repository = "";
    }
  }
};
</script>
