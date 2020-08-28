# todo-vue

Project Notes:

This application consists of two microservices, one for the front end VueJS and one for the backend Java Spring boot.
The frontend (todo-vue) application runs on port 8080 of your localhost.
The backend (TaskManager) application runs on port 8081 of your localhost.

Maven command to main run application from root:
mvn spring-boot:run

To run front end applicaition. cd into todo-view folder, then run :
npm run dev

For this project I used NPM to manage my front end libraries.
VueJS is the front end framework of choice for this project. It is a lightweight framework, which is perfect for a small application like this.
I have decided to make use of SCSS, this gives me the option to nest selectors, which creates more powerful Style Sheets.
I also used the Animate CSS library to add some smooth animations to the project.

I've decided to use the Lombok library to avoid lots of extra boilerplate code, such as getters and setters. 
This helps the Entity files stay clean and easy to read.


## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
