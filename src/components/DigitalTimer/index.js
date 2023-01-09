// Write your code here
import {Component} from 'react'
import './index.css'

const START_URL = 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
const PAUSE_URL = 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
const RESET_URL = 'https://assets.ccbp.in/frontend/react-js/reset-icon-img.png'

const initialState = {
  isTimerActive: false,
  elapsedTimeInSeconds: 0,
  timerLimitInMinutes: 25,
}

class DigitalTimer extends Component {
  constructor(props) {
    super(props)
    this.state = initialState
  }
  
  clearInterval() {
    clearInterval(this.timerID)
  }
  
  runTimer = () => {
    const {elapsedTimeInSeconds, timerLimitInMinutes} = this.state
    const isTimerCompleted = timerLimitInMinutes * 60 === elapsedTimeInSeconds

    if (isTimerCompleted) {
      clearInterval(this.timerID)
      this.setState({isTimerActive: false})
    } else {
      this.setState(prevState => ({
        elapsedTimeInSeconds: prevState.elapsedTimeInSeconds + 1,
      }))
    }
  }

  onActivateTimer = () => {
    const {
      isTimerActive,
      elapsedTimeInSeconds,
      timerLimitInMinutes,
    } = this.state
    const isTimerCompleted = timerLimitInMinutes * 60 === elapsedTimeInSeconds

    if (isTimerCompleted) {
      this.setState({elapsedTimeInSeconds: 0})
    }
    if (isTimerActive) {
      clearInterval(this.timerID)
      console.log(isTimerActive)
    } else {
      this.timerID = setInterval(this.runTimer, 1000)
    }
    this.setState(prevState => ({isTimerActive: !prevState.isTimerActive}))
  }

  onResetTimer = () => {
    clearInterval(this.timerID)
    this.setState(initialState)
  }

  onDecreaseTimerLimit = () => {
    this.setState(prevState => {
      const {timerLimitInMinutes} = prevState
      if (timerLimitInMinutes > 1) {
        return {timerLimitInMinutes: timerLimitInMinutes - 1}
      }
      return {timerLimitInMinutes: 0}
    })
  }

  onIncreaseTimerLimit = () => {
    this.setState(prevState => ({
      timerLimitInMinutes: prevState.timerLimitInMinutes + 1,
    }))
  }

  formatDigitalTimer = () => {
    const {elapsedTimeInSeconds, timerLimitInMinutes} = this.state

    const totalRemainingSeconds =
      timerLimitInMinutes * 60 - elapsedTimeInSeconds
    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)

    const formattedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const formattedSeconds = seconds > 9 ? seconds : `0${seconds}`
    return `${formattedMinutes}:${formattedSeconds}`
  }

  render() {
    const {
      isTimerActive,
      elapsedTimeInSeconds,
      timerLimitInMinutes,
    } = this.state

    const controlIconUrl = isTimerActive ? PAUSE_URL : START_URL
    const controlIconAlt = isTimerActive ? 'pause icon' : 'play icon'
    const controlTitle = isTimerActive ? 'Pause' : 'Start'
    const timerState = isTimerActive ? 'Running' : 'Paused'

    const areButtonsDisabled = elapsedTimeInSeconds !== 0

    return (
      <div className="app-container">
        <h1 className="app-title">Digital Timer</h1>
        <div className="timer-container">
          <div className="timer-display-container">
            <div className="elapsed-time-container">
              <h1 className="elapsed-time-text">{this.formatDigitalTimer()}</h1>
              <p className="elapsed-time-state">{timerState}</p>
            </div>
          </div>
          <div className="timer-controls-container">
            <div className="timer-operation-controls">
              <button
                onClick={this.onActivateTimer}
                type="button"
                className="timer-operation-control-button"
              >
                <img
                  src={controlIconUrl}
                  alt={controlIconAlt}
                  className="timer-operation-control-icon"
                />
                {controlTitle}
              </button>
              <button
                onClick={this.onResetTimer}
                type="button"
                className="timer-operation-control-button"
              >
                <img
                  src={RESET_URL}
                  alt="reset icon"
                  className="timer-operation-control-icon"
                />
                Reset
              </button>
            </div>
            <p className="timer-limit-label">Set Timer Limit</p>
            <div className="timer-limit-controls">
              <button
                onClick={this.onDecreaseTimerLimit}
                disabled={areButtonsDisabled}
                type="button"
                className="timer-limit-control-button"
              >
                -
              </button>
              <p className="timer-limit-value">{timerLimitInMinutes}</p>
              <button
                onClick={this.onIncreaseTimerLimit}
                disabled={areButtonsDisabled}
                type="button"
                className="timer-limit-control-button"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
