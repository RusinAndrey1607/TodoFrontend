import type { NextPage } from 'next'
import Head from 'next/head'
import Clock from '../components/Clock'
import Greetings from '../components/Greetings'
import Todo from '../components/Todo'
import { useState, useEffect } from 'react';
import { todoApi } from '../axios/api';



const dayNamesList = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
]
const monthNamesList = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const Home: NextPage = () => {
  const [time, setTime] = useState(new Date())
  const [randomBg, setRandomBg] = useState(Math.floor(Math.random() * 20))

  const dayAndMonth = `${dayNamesList[time.getDay()]} ${monthNamesList[time.getMonth()]}`
  const timeLine = `${time.getHours() >= 10 ? time.getHours() : "0" + time.getHours()}:${time.getMinutes() >= 10 ? time.getMinutes() : "0" + time.getMinutes()}:${time.getSeconds() >= 10 ? time.getSeconds() : "0" + time.getSeconds()}`

  const changeTime = () => {
    setTime(new Date())

  }
  useEffect(() => {
    console.log(randomBg);

    todoApi.getOne(2).then(res => console.log(res))
    const id = setInterval(changeTime, 1000)
    return () => {
      clearInterval(id)
    }
  }, [])
  return (
    <>
      <Head>
        <title>Todo list</title>
        <meta name="referrer" content="origin" />
        <meta name="description" content="This App made using NextJs framework !" />
        <link rel="icon" href="/icon.png" />
      </Head>
      <div className="wrapper">
        <Clock dayAndMonth={dayAndMonth} time={timeLine} />
        <Todo />
        <Greetings hour={time.getHours()} />
        <img src={`images/bg-${randomBg}`} className='bgImage' />
      </div>
    </>
  )
}

export default Home
