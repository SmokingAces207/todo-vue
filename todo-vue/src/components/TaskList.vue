<template>
  <div>
    <div id="titlePanel">
      <!-- <img src="./assets/logo.png" class="logo"> -->
      <span id="headerTitle">PawaTask</span>
      <button id="toggle-new-task-modal" @click="toggleNewTaskModal">Add A New Task</button>
    </div>

    <!-- <input
      type="text"
      class="task-input"
      placeholder="Please enter a task..."
      v-model="newTask"
      @keyup.enter="addTask"
    /> -->

    <transition-group
      name="fade"
      enter-active-class="animated fadeInUp"
      leave-active-class="animated fadeOutDown"
    >
      <task-item
        v-for="(task, index) in taskListFiltered"
        :key="task.id"
        :task="task"
        :index="index"
        :checkAll="!tasksRemaining"
        @removedTask="removeTask"
        @completedEdit="completedEdit"
      ></task-item>
    </transition-group>

    <div class="extra-container">
      <div>
        <label>
          <input type="checkbox" :checked="!tasksRemaining" @change="checkAllTasks" /> Check All
        </label>
      </div>
      <div>{{ remaining }} items left</div>
    </div>

    <div class="extra-container">
      <div>
        <button :class="{ active: filter === 'all' }" @click="filter = 'all'">All</button>
        <button :class="{ active: filter === 'active'}" @click="filter = 'active'">Active</button>
        <button :class="{ active: filter === 'completed'}" @click="filter = 'completed'">Completed</button>
      </div>

      <div>
        <transition name="fade">
          <button v-if="showClearCompletedButton" @click="clearCompleted">Clear Completed</button>
        </transition>
      </div>

      <!-- use the modal component, pass in the prop -->
      <new-task-modal
        :showNewTaskModal="showNewTaskModal"
        @toggleNewTaskModal="toggleNewTaskModal"
        @addTask="addTask"
      ></new-task-modal>
    </div>
  </div>
</template>

<script>
import TaskItem from "./TaskItem";
import NewTaskModal from "./NewTaskModal";
import api from "../Api";

export default {
  name: "task-list",
  components: {
    TaskItem,
    NewTaskModal,
  },
  data() {
    return {
      newTask: "",
      beforeEditCache: "",
      filter: "all",
      taskList: [],
      error: "",
      showNewTaskModal: false,
    };
  },
  mounted() {
    api
      .getAll()
      .then((response) => {
        this.$log.debug("Data loaded: ", response.data);
        this.taskList = response.data;
      })
      .catch((error) => {
        this.$log.debug(error);
        this.error = "Failed to load todos";
      })
      .finally(() => (this.loading = false));
  },
  computed: {
    remaining() {
      return this.taskList.filter((task) => !task.completed).length;
    },
    tasksRemaining() {
      return this.remaining !== 0;
    },
    taskListFiltered() {
      if (this.filter === "all") {
        return this.taskList;
      } else if (this.filter === "completed") {
        return this.taskList.filter((task) => task.completed);
      }
      // Display Active Only
      return this.taskList.filter((task) => !task.completed);
    },
    showClearCompletedButton() {
      // True if at least one task has been completed
      return this.taskList.filter((todo) => todo.completed).length > 0;
    },
  },
  methods: {
    toggleNewTaskModal() {
      this.showNewTaskModal = !this.showNewTaskModal;
    },
    addTask(data) {
      // Check for blank task titles - we don't want to save them
      if (data.task.title.trim().length === 0) {
        return;
      }

      // Create new task item -> Contacts backend webserver, then adds to front end TaskList
      api
        .createNew(data.task.title, 
          data.task.description, 
          data.task.dueDate, 
          data.task.priority, 
          data.task.comments, 
          false,
          false)
        .then((response) => {
          this.$log.debug("New task created:", response);
          this.taskList.push({
            id: response.data.id,
            title: response.data.title,
            description: response.data.description,
            dueDate: response.data.dueDate,
            priority: response.data.priority,
            comments: response.data.comments,
            completed: false,
            editing: false,
          });
        })
        .catch((error) => {
          this.$log.debug(error);
          this.error = "Failed to add task";
        });

      // Reset Values
      //this.newTask = "";
    },
    removeTask(data) {
      // Make API call and remove task from backend server
      api
        .removeForId(data.task.id)
        .then(() => {
          this.$log.debug("Task removed:", data.task);
          console.log(this.taskList);
          console.log(this.taskList.indexOf(data.task));
          this.taskList.splice(data.index, 1);
        })
        .catch((error) => {
          this.$log.debug(error);
          this.error = "Failed to remove task";
        });
    },
    checkAllTasks() {
      this.taskList.forEach((task) => (task.completed = event.target.checked));
    },
    clearCompleted() {
      this.taskList = this.taskList.filter((task) => !task.completed);
    },
    completedEdit(data) {
      console.log(data);
      // Data obj defined in TaskItem
      // Update task item in TaskList with data from TaskItem.vue
      // Make API call and update Task obj on the backend server
       api
        .updateForId(
          data.task.id,
          data.task.title.trim(),
          data.task.description,
          data.task.dueDate,
          data.task.priority,
          data.task.comments,
          data.task.completed,
          false
        )
        .then((response) => {
          this.$log.info("Task updated", response.data);
        })
        .catch((error) => {
          this.$log.debug(error);
          this.error = "Faled to update task";
        });
    },
  },
};
</script>

