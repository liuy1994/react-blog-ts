import * as React from 'react'

export interface Props {
  name: string,
  level?: number
}

function Hello({ name, level = 3 }: Props) {
  if (level <= 0) {
    throw new Error('You has no access!')
  }
  return (
    <div className="hello">
      <div className="greeting">
        Hello {name + getMarks(level)}
      </div>
    </div>
  )
}
export default Hello

function getMarks(level: number) {
  return Array(level + 1).join('!')
}