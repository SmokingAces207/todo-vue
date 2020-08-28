import axios from 'axios';

const SERVER_URL = 'http://localhost:8081';

const instance = axios.create({
    baseURL: SERVER_URL,
    timeout: 1000
});

export default {
    // Create
    createNew: (title, description, dueDate, priority, comments, completed, editing) => instance.post('tasks', {
        id: null,
        title: title,
        description: description,
        dueDate: dueDate,
        priority: priority,
        comments: comments,
        completed: completed,
        editing: editing
    }),
    // Read
    getAll: () => instance.get('tasks', {
        transformResponse: [function (data) {
            return data ? JSON.parse(data)._embedded.tasks : data;
        }]
    }),
    // Update
    updateForId: (id, title, description, dueDate, priority, comments, completed, editing) => instance.put('tasks/' + id, {
        id: id,
        title: title,
        description: description,
        dueDate: dueDate,
        priority: priority,
        comments: comments,
        completed: completed,
        editing: editing
    }),
    // Delete
    removeForId: (id) => instance.delete('tasks/' + id)
}