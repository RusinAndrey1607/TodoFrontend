import React, { FormEvent, FormEventHandler, useEffect, useState } from 'react'
import styles from '../styles/todo.module.css'
import { todoApi } from '../axios/api';

export type todoType = {
    id: number
    title: string
    status: boolean
}

const Todo = () => {
    const [value, setValue] = useState("")
    const [todos, setTodos] = useState<todoType[]>([] as todoType[])
    const [editValue, setEditValue] = useState('')

    const handleEditMode = (id: number) => {
        //@ts-ignore
        setTodos(todos.map(n => n.id === id ? { ...n, editMode: !n.editMode } : { ...n, editMode: false }))

    }
    const handleUpdate = async (e: FormEvent, id: number) => {
        e.preventDefault()
        // @ts-ignore
        if (editValue) {
            const newTodo = { title: editValue, status: false }
            todoApi.update(id, newTodo).then(res => {
                setTodos(todos.map(n => n.id === id ? { ...n, title: editValue, status: false, editMode: false } : n))
                setEditValue("")
            })
        }
        handleEditMode(id)

    }
    const submitHandler = (e: FormEvent) => {
        e.preventDefault()
        if(value){
            const newTodo = { title: value, status: false }
            todoApi.create(newTodo).then(res => {
                setTodos([...todos, res.data.todo])
                setValue("")
            })
        }
        
    }

    const handleDelete = (id: number) => {
        todoApi.delete(id).then(() => {
            setTodos(todos.filter(item => item.id !== id))
        })
    }

    const handleDone = (id: number, item: todoType) => {
        todoApi.update(id, { ...item, status: !item.status }).then(res => {
            setTodos(todos.map(n => n.id === id ? { ...n, status: !n.status } : n))
        })
    }

    useEffect(() => {
        todoApi.getAll().then((res) => {
            setTodos(res.data.todos.map((item: todoType) => ({ ...item, editMode: false })))
            console.log(res.data.todos);
        })
    }, [])


    return (
        <div className={styles.todoWrapper}>
            <form className={styles.todoForm} onSubmit={submitHandler}>
                <input value={value} onChange={(e) => setValue(e.currentTarget.value)} className={styles.todoInput} type="text" placeholder="Task for day !" />
            </form>

            <ul className={styles.todoList}>
                {todos.map(item => {
                    // @ts-ignore
                    return !item.editMode ? (

                        <li onDoubleClick={() => handleEditMode(item.id)} key={item.id} className={`${styles.todoList__item} ${item.status ? styles.done : ""}`}>
                            <button className={styles.doneBtn} onClick={() => handleDone(item.id, item)}>
                                ✔️
                            </button>
                            <span>
                                {item.title}
                            </span>
                            <button className={styles.delBtn} onClick={() => handleDelete(item.id)}>
                                ❌
                            </button>
                        </li>) : (
                        <form onSubmit={(e) => handleUpdate(e, item.id)}>
                            <input onBlur={() => handleEditMode(item.id)} value={editValue} onChange={(e) => setEditValue(e.currentTarget.value)} className={styles.todoInput} />
                        </form>
                    )
                })}
            </ul>
        </div>)
}

export default Todo