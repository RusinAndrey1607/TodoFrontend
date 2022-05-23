import React from 'react'
import styles from '../styles/clock.module.css'


type Props = {
    time?: string
    dayAndMonth?: string
}

const Clock: React.FC<Props> = ({ time, dayAndMonth }) => {
    return (
        <>
            <h1  className={styles.clock}>
                {time}
            </h1>
            <h2  className={styles.dayMonth}>
                {dayAndMonth}
            </h2>
        </>
    )
}

export default Clock