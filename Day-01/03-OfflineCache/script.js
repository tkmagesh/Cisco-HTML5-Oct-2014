
        window.addEventListener("DOMContentLoaded",init);
        function init(){
            document.getElementById("btnAddTask")
                .addEventListener("click", onBtnAddTaskClick);
            document.getElementById("btnRemoveCompleted")
                .addEventListener("click", onBtnRemoveClick);

            loadTasksFromStorage();
        }
        function loadTasksFromStorage(){
            var storage = window.localStorage;
            for(var i=0;i<storage.length;i++){
                var key = storage.key(i);
                var task = JSON.parse(storage.getItem(key));
                addTaskToList(key,task);
            }
        }

        function onBtnAddTaskClick(){
            var taskName = document.getElementById("txtTask").value;
            /*Storage*/
            var task = {
                name : taskName,
                isCompleted : false
            };
            var key = new Date().getTime().toString();
            window.localStorage.setItem(key,JSON.stringify(task));
            addTaskToList(key,task);
        }
        function addTaskToList(key,task){
            var taskItem = document.createElement("li");
            taskItem.innerHTML = task.name;
            taskItem.setAttribute("task-id",key);
            if (task.isCompleted){
                taskItem.classList.add("completed");
            }
            taskItem.addEventListener("click",onTaskItemClick);
            document.getElementById("olTaskList")
                .appendChild(taskItem);
        }

        function onTaskItemClick(){
            this.classList.toggle("completed");
            var key = this.getAttribute("task-id");
            var task = JSON.parse(window.localStorage.getItem(key))
            task.isCompleted = !task.isCompleted;
            window.localStorage.setItem(key,JSON.stringify(task));
        }

        function onBtnRemoveClick(){
            var taskList = document.getElementById("olTaskList");
            for(var i = taskList.children.length-1;i>=0;i--){
                var taskItem = taskList.children[i];
                if (taskItem.classList.contains("completed")){
                    var key = taskItem.getAttribute("task-id");
                    /*Removing from Storage*/
                    localStorage.removeItem(key);
                    taskItem.remove();
                }
            }
        }
        /*
        window.localStorage
            => key/value collection (both key and value should be string)
            -setItem(key,value)
            -getItem(key) => value
            -removeItem(key)
            -key(index) => key
            -clear()
            -length => no of items in the store
        */
