import React, { ChangeEvent, ChangeEventHandler, FormEvent, FormEventHandler, useEffect, useState } from 'react'
import styles from '../styles/greetings.module.css'

type Props = {
    hour: number
}

const Greetings: React.FC<Props> = ({ hour }) => {
    const [name, setName] = useState("")
    const [editMode, setEditMode] = useState(false)

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value)
        !editMode && setEditMode(true)

    }

    const handleDoubleCLick = () => {
        setEditMode(true)
        setName("")
    }
    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        window.localStorage.setItem("name", name)
        setEditMode(false)
    }

    const greetingsPhrase = hour < 9 && hour > 4 ? "Good morning" : hour < 16 ? "Good day" : hour < 21 ? "Good evening" : "Good night"

    useEffect(() =>{
        //@ts-ignore
        setName(window.localStorage.getItem("name"))
    },[])
    return name && !editMode ? (
        <>
            <h3 className={styles.greetings} onDoubleClick={handleDoubleCLick}>
                {greetingsPhrase}, {name}
            </h3>
        </>)
        : (
            <form className={styles.form} onSubmit={submitHandler}>
                <input value={name} onChange={changeHandler} className={styles.inputName} type="text" placeholder="What's your name ?" />
            </form>
        )

}

export default Greetings