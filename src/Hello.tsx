import * as React from 'react'
import './Hello.css'

export interface Props {
  name: string,
  level?: number
}

interface State {
  currentLevel: number
}

class Hello extends React.Component<Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = {currentLevel: props.level || 3}
  }
  onIncrement = () => this.updateLevel(this.state.currentLevel + 1)
  onDecrement = () => this.updateLevel(this.state.currentLevel - 1)
  updateLevel(currentLevel: number) {
    this.setState({
      currentLevel
    })
  }
  render () {
    const { name } = this.props
    const { currentLevel: level } = this.state
    if (level <= 0) {
      throw new Error('You could be a little more enthusiastic. :D');
    }
    return (
      <div className="hello">
        <div className="greeting">
          Hello {name + getMarks(level)}
        </div>
        <button onClick={this.onDecrement}>---</button>
        <button onClick={this.onIncrement}>+++</button>
      </div>
    )
  }
}
export default Hello

function getMarks(level: number) {
  return Array(level + 1).join('!')
}