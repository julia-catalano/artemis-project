import React, {useEffect, useState} from 'react';
import axios from 'axios'
import Score from './Score'
import PlantCycles from './life-cycle-of-plants.jpg'
import Status from './Status'

import './App.css';

function App() {

  const [questionList, setQuestionList] = useState([{incorrect_answers:[]}])
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0)
  const [radioCheck, setRadioCheck] = useState(false)
  const [currentLifeCycleIdx, setCurrentLifeCycleIdx] = useState(0)
  const [currentCategoryIdx, setCurrentCategoryIdx] = useState(0)
  const [threshold, setThreshold] = useState(30)
  const [score, setScore] = useState({'water': 20, 'sun': 20, 'nutrients': 20})
  // const [won, setWon] = useState(false)
  // const [lost, setLost] = useState(false)
  const [status, setStatus] = useState('')

  const lifeCycles = ['seed', 'young plant', 'mature plant', 'flower', 'fruit']
  const categories = ['water', 'sun', 'nutrients']


  //grab the trivia questions from opentdb
  useEffect(() => {
    async function loadApp() {
      const questions = await axios.get('https://opentdb.com/api.php?amount=30&category=17&difficulty=easy&type=multiple')
      console.log('this is the response', questions.data)
      setQuestionList([...questions.data.results])
    }
    loadApp()
  }, [])

  const selectAnAnswer = (evt) => {
    let answer = evt.target.value
    let category = categories[currentCategoryIdx]

    //assign the correct number of points to the correct category score
    if (answer === 'correct') {
      console.log('correct')
      setScore({...score, [category]: score[category] + 10})
    } else {
      console.log('incorrect')
      setScore({...score, [category]: score[category] - 5})
    }

    //then, shift to the next category, shift to the next question, and uncheck the radio selection
    changeCategory()
    setCurrentQuestionIdx(currentQuestionIdx + 1)
    setRadioCheck(false)
    checkLevel()
  }

  const changeCategory = () => {
    //cycles through the three categories in the categories array
    currentCategoryIdx === 2 ? setCurrentCategoryIdx(0) : setCurrentCategoryIdx(currentCategoryIdx + 1)
  }

  const checkLevel = () => {
    //if the plant is bearing fruit, congratulate the user!
    if (currentLifeCycleIdx === 3) {
      setStatus('won')
    }
    //if they've met the next threshold for all three scores, grow the plant
    if (score.water >= threshold && score.sun >= threshold && score.nutrients >= threshold) {
      setCurrentLifeCycleIdx(currentLifeCycleIdx + 1)
      setThreshold(threshold + 10)
    }

    //otherwise, check on their progress - if they've lost, let them know
    else {
      for (const prop in score) {
        if (score[prop] < 10) {
          setStatus('lost')
        }
      }
    }

  }



return (
    <div className="App">

    <h2 className="title">Welcome to the trivial pursuit of fruit!</h2>

    <h3>Rules: Your goal is to get your plant seed through the life cycles until it bears fruit! You have three resources to manage. Each question you're offered will be tied to a resource, and your answers will impact that resource's score (+10 points for correct, -5 for incorrect.) If each resource meets its next goal threshold (10 point increments) for reaching the next stage, your plant will reach the next stage! You won't step back stages (since plants don't really do that) BUT if any resource reaches under 10 points, your plant dies. Womp womp.</h3>

    <Score score={score} lifecycle={lifeCycles[currentLifeCycleIdx]} threshold={threshold} category={categories[currentCategoryIdx]}/>

    {status !== '' ? <Status status={status}/> : (

    <div>
      {questionList[currentQuestionIdx].question}
      <div>
        <input type="radio" className="correct" value="correct" checked={radioCheck} onChange={selectAnAnswer}/> {questionList[currentQuestionIdx].correct_answer}
        <div>
          {questionList[currentQuestionIdx].incorrect_answers.map(answer => {
            return (
            <div>
              <input type="radio" value="incorrect" checked={radioCheck} onChange={selectAnAnswer}/>
              <label>{answer}</label>
            </div>
          )
        })}
        </div>
      </div>
    </div> )}
    <img src={PlantCycles} alt="plant lifecycles" height={300} width={350}margin={30}></img>
  </div>
  );
}

export default App;
