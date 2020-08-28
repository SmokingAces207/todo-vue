<template>
  <transition name="modal-fade">
    <div class="modal-backdrop" v-show="showNewTaskModal">
      <div
        class="modal"
        role="dialog"
        aria-labelledby="newTaskModal"
        aria-describedby="newTaskModalDescription"
      >
        <header class="modal-header" id="newTaskModal">
          <slot name="header">
            New Task
            <button
              type="button"
              class="btn-close"
              @click.prevent="closeModal"
              aria-label="Close modal"
            >x</button>
          </slot>
        </header>
        <section class="modal-body" id="modalBody">
          <slot name="body">

            <form @submit.prevent="addNewTask">
              <div>
                <label for="title">Title:</label>
                <input id="title" v-model="title" type="text" required/>
              </div>
              <div>
                <label for="description">Description:</label>
                <textarea id="description" v-model="description" type="text"></textarea>
              </div>
              <div>
                <label for="dueDate">Set due date:</label>
                <input id="dueDate" v-model="dueDate" type="text" />
              </div>
              <div>
                <label for="priority">Priority:</label>
                <input id="priority" v-model="priority" type="text" />
              </div>
              <div>
                <label for="comments">Comments:</label>
                <textarea id="comments" v-model="comments" type="text"></textarea>
              </div>
              <div>
                <button type="submit" id="newTaskSubmitBtn">Add a new task</button>
              </div>
            </form>

          </slot>
        </section>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "new-task-modal",
  props: {
    showNewTaskModal: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      id: null,
      title: "",
      description: "",
      dueDate: "",
      priority: "",
      comments: "",
      completed: false,
      editing: false
    };
  },
  methods: {
    clearModal() {
      this.title = "";
      this.description = "";
      this.dueDate = "";
      this.priority = "";
      this.comments = "";
      this.completed = false;
      this.editing = false;
    },
    closeModal() {
      this.$emit("toggleNewTaskModal");
      // Clear old modal data
      this.clearModal();
    },
    addNewTask() {
      this.$emit("addTask", {
        task: {
          title: this.title,
          description: this.description,
          dueDate: this.dueDate,
          priority: this.priority,
          comments: this.comments,
        },
      });
      this.$emit("toggleNewTaskModal");
      // Clear old modal data
      this.clearModal();
    }
  },
};
</script>

<style lang="scss" scoped>

@import '../assets/styles/modal.scss';

</style>