<template>
  <transition name="modal-fade">
    <div class="modal-backdrop" v-show="showEditTaskModal">
      <div
        class="modal"
        role="dialog"
        aria-labelledby="editTaskModal"
        aria-describedby="editTaskModalDescription"
      >
        <header class="modal-header" id="editTaskModal">
          <slot name="header">
            {{ task.title }}
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

            <form @submit.prevent="doneEdit">
              <div>
                <label for="title">Title:</label>
                <input id="title" v-model="task.title" type="text" required/>
              </div>
              <div>
                <label for="description">Description:</label>
                <textarea id="description" v-model="task.description" type="text"></textarea>
              </div>
              <div>
                <label for="dueDate">Set due date:</label>
                <input id="dueDate" v-model="task.dueDate" type="text" />
              </div>
              <div>
                <label for="priority">Priority:</label>
                <input id="priority" v-model="task.priority" type="text" />
              </div>
              <div>
                <label for="comments">Comments:</label>
                <textarea id="comments" v-model="task.comments" type="text"></textarea>
              </div>
              <div>
                <button type="submit" id="editTaskSubmitBtn">Edit task</button>
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
  name: "edit-task-modal",
  props: {
    showEditTaskModal: {
      type: Boolean,
      required: true
    },
    task: {
      type: Object,
      required: true
    }
  },
  methods: {
    closeModal() {
      this.$emit("toggleEditTaskModal");
    },
    doneEdit() {
      this.task.editing = false;
      this.$emit("completedEdit", {
        // This will fire off the doneEdit in TaskList.vue
        task: {
          id: this.task.id,
          title: this.task.title,
          description: this.task.description,
          dueDate: this.task.dueDate,
          priority: this.task.priority,
          comments: this.task.comments,
          completed: this.task.completed,
          editing: this.task.editing
        }
      });
      this.closeModal();
    }
  },
};
</script>

<style lang="scss" scoped>

@import '../assets/styles/modal.scss';

</style>