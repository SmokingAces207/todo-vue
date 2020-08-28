<template>
  <div id="app" class="container">
    <task-list></task-list>
  </div>
</template>

<script>
import TaskList from './components/TaskList';

export default {
  name: 'App',
  components: {
    TaskList,
  },
};
</script>

<style lang="scss">

@import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css");
@import './assets/styles/main.scss';

</style>
