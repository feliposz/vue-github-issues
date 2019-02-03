import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import GitHubIssues from '@/components/GitHubIssues.vue';

describe('GitHubIssues.vue', () => {
  it('renders properly', () => {
    const msg = 'Vue.js + GitHub';
    const wrapper = shallowMount(GitHubIssues);
    expect(wrapper.text()).to.include(msg);
  });
});
