import React from 'react'
import { QuestionDifficulty } from '../types/types.ts'
import { Tag } from 'antd'

interface DifficultyTagProps {
  difficulty?: QuestionDifficulty
}

/**
 * 根据题目难度返回对应的标签
 */
const DifficultyTag: React.FC<DifficultyTagProps> = ({ difficulty }) => {
  switch (difficulty) {
    case QuestionDifficulty.Easy:
      return <Tag color="success">Easy</Tag>
    case QuestionDifficulty.Medium:
      return <Tag color="warning">Medium</Tag>
    case QuestionDifficulty.Hard:
      return <Tag color="red">Hard</Tag>
    default:
      return <Tag color="default">Difficulty</Tag>
  }
}

export default DifficultyTag
