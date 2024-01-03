import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";


export type FilterValuesType = 'all' | 'completed' | 'active'
type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

    function removeTask(id: string, todolistId: string) {
        let tasks = tasksObj[todolistId];
        let filteredTasks = tasks.filter(t => t.id !== id)
        tasksObj[todolistId] = filteredTasks;
        setTasks({...tasksObj});
    }



    function changeFilter(value: FilterValuesType, todolistId: string) {
        let todolist = todolists.find(tl=>tl.id===todolistId);
        if (todolist) {
            todolist.filter = value;
            setTodolist([...todolists]);
        }
    }


    function addTask(title: string, todolistId: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        let tasks = tasksObj[todolistId];
        let newTasks = [newTask, ...tasks];
        tasksObj[todolistId] = newTasks
        setTasks({...tasksObj});
    }

    const changeStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        let tasks = tasksObj[todolistId];
        let task = tasks.find(t=> t.id === taskId);
        if (task) {
            task.isDone = isDone;
            setTasks({...tasksObj});
        }

    }

    let toDoListId1 = v1();
    let toDoListId2 = v1();


    let [todolists, setTodolist] = useState<Array<TodoListType>>([
        {id: toDoListId1, title: 'What to learn', filter: 'active'},
        {id: toDoListId2, title: 'What to buy', filter: 'completed'}
    ]);

    let [tasksObj, setTasks] = useState ({
        [toDoListId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: false},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false},],
        [toDoListId2]: [
            {id: v1(), title: 'BOOK', isDone: false},
            {id: v1(), title: 'PEN', isDone: true},]
    })
    let removeTodolist = (todolistId: string) => {
        let filteredTodolist = todolists.filter(tl=> tl.id !== todolistId)
        setTodolist(filteredTodolist)
        delete tasksObj[todolistId];
        setTasks({...tasksObj});
    }


    return (
        <div className="App">
            {
                todolists.map((tl) => {
                    let tasksForTodolist = tasksObj[tl.id];
                    if (tl.filter === 'completed') {
                        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true);
                    }
                    if (tl.filter === 'active') {
                        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false);
                    }
                    return (
                        <Todolist
                            key={tl.id}
                            id={tl.id}
                            title={tl.title}
                            tasks={tasksForTodolist}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeTaskStatus={changeStatus}
                            filter={tl.filter}
                            removeTodolist={removeTodolist}
                        />
                    )
                })}

        </div>
    );
}

export default App;
