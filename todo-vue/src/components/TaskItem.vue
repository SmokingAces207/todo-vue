<template>
  <div class="task-item">
    <div class="task-item-left">

      <input class="task-item-checkbox" type="checkbox" v-model="task.completed" @change="doneEdit" />

      <div
        v-if="!task.editing"
        @dblclick="editTask"
        class="task-item-label"
        style="width:350px;"
        :class="{ completed : task.completed }"
      >{{ task.title }}</div>

      <input
        v-else
        class="task-item-edit"
        type="text"
        style="width:350px;"
        v-model="task.title"
        v-focus
        @blur="doneEdit"
        @keyup.enter="doneEdit"
        @keyup.esc="cancelEdit"
      />
    </div>

    <span class="display-date" style="width:20%;"><i class="fa fa-calendar"></i>&nbsp; {{ task.dueDate }}</span>

    <edit-task-modal 
      :showEditTaskModal="showEditTaskModal" 
      :task="task"
      @toggleEditTaskModal="toggleEditTaskModal"
      @completedEdit="completedEdit"
    ></edit-task-modal>

    <button id="toggle-edit-task-modal" @click="toggleEditTaskModal" class="btn-logo" style="width:5%;"><i class="fa fa-edit"></i></button>
    <button id="toggle-edit-task-modal" @click="removeTask" class="btn-logo remove-item" style="width:5%;">&times;</button></button>
  </div>
</template>

<script>
import EditTaskModal from "./EditTaskModal";

export default {
  name: "task-item",
   components: {
    EditTaskModal,
  },
  props: {
    task: {
      type: Object,
      required: true,
    },
    checkAll: {
      type: Boolean,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    }
  },
  data() {
    return {
      beforeEditCache: "",
      showEditTaskModal: false
    };
  },
  watch: {
    checkAll() {
      // Listen for when checkAll in TaskList.vue is changed
      // Check task items if checkAll in task list is checked
      this.task.completed = this.checkAll ? true : this.task.completed;
    },
  },
  directives: {
    focus: {
      // Focus after double click fix
      inserted: function (el) {
        el.focus();
      },
    },
  },
  methods: {
    toggleEditTaskModal() {
      this.showEditTaskModal = !this.showEditTaskModal;
    },
    removeTask() {
      // This will fire off the removeTask in TaskList.vue
      this.$emit("removedTask", {
        index: this.index,
        task: {
          id: this.task.id,
          title: this.task.title,
          description: this.task.description,
          dueDate: this.task.dueDate,
          priority: this.task.priority,
          comments: this.task.comments,
          completed: this.task.completed,
          editing: this.task.editing
        },
      });
    },
    editTask() { // Inline edit of task title
      this.beforeEditCache = this.title;
      this.task.editing = true;
    },
    doneEdit() { // Inline edit of task title
      // Check for blank task titles - we don't want to save them
      if (this.task.title.trim() === "") {
        this.task.title = this.beforeEditCache;
      }
      this.task.editing = false;
      this.$emit("completedEdit", {
        // This will fire off the completedEdit in TaskList.vue
        task: {
          id: this.task.id,
          title: this.task.title,
          description: this.task.description,
          dueDate: this.task.dueDate,
          priority: this.task.priority,
          comments: this.task.comments,
          completed: this.task.completed,
          editing: this.task.editing
        },
      });
    },
    completedEdit(data) {
      this.$emit("completedEdit", {
        task: data.task
      });
    },
    // Cancel edit and reset label
    cancelEdit() {
      this.task.title = this.beforeEditCache;
      this.task.editing = false;
    },
  },
};
</script>
