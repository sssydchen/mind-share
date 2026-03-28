import React, { useEffect, useState } from 'react'
import { Button, Drawer, Form, Input, message, Select, TreeSelect } from 'antd'
import {
  CreateQuestionBody,
  QuestionOptMode,
  UpdateQuestionBody,
} from '../types/service.ts'
import { QuestionDifficulty, QuestionEntity } from '../types/types.ts'
import { useForm } from 'antd/es/form/Form'
import { diffObject } from '../../../base/utils'

interface QuestionAddDrawerProps {
  mode: QuestionOptMode
  treeData: any
  isDrawerOpen: boolean
  toggleIsDrawerOpen: () => void
  selectedQuestion: QuestionEntity | undefined
  createQuestion: (body: CreateQuestionBody) => void
  updateQuestion: (question: UpdateQuestionBody) => void
}

const QuestionAddDrawer: React.FC<QuestionAddDrawerProps> = ({
  mode,
  treeData,
  isDrawerOpen,
  toggleIsDrawerOpen,
  selectedQuestion,
  createQuestion,
  updateQuestion,
}) => {
  const [form] = useForm()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (mode === 'update') {
      form.setFieldsValue({
        questionId: selectedQuestion?.questionId,
        title: selectedQuestion?.title,
        difficulty: selectedQuestion?.difficulty,
        examPoint: selectedQuestion?.examPoint,
        categoryId: selectedQuestion?.categoryId,
      })
    } else if (mode === 'create') {
      // TODO
      console.log('create')
    } else {
      console.log('error')
      throw new Error('mode is not valid')
    }
    return () => {
      form.resetFields()
    }
  })

  async function onFinish(values: any) {
    setLoading(true)
    if (mode === 'create') {
      createQuestion(values as CreateQuestionBody)
      message.success('Created successfully')
      toggleIsDrawerOpen()
    } else if (mode === 'update') {
      if (selectedQuestion === undefined) {
        throw new Error('selectedQuestion is undefined')
      }
      const diffResult = diffObject(
        selectedQuestion,
        values,
      ) as UpdateQuestionBody
      updateQuestion({
        ...diffResult,
        questionId: selectedQuestion.questionId,
      })
      message.success('Updated successfully')
      toggleIsDrawerOpen()
    }
    setLoading(false)
  }

  return (
    <Drawer
      open={isDrawerOpen}
      title={mode === 'create' ? 'Create Question' : 'Update Question'}
      onClose={toggleIsDrawerOpen}
      width={450}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        {mode === 'update' && (
          <Form.Item label={'Question ID'} name={'questionId'}>
            <Input disabled></Input>
          </Form.Item>
        )}
        <Form.Item
          label={'Title'}
          name={'title'}
          rules={[
            { required: true, message: 'Enter a title' },
            {
              min: 2,
              max: 255,
              message: 'Title must be between 2 and 255 characters',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label={'Difficulty'} name={'difficulty'} required>
          <Select>
            <Select.Option value={QuestionDifficulty.Easy}>Easy</Select.Option>
            <Select.Option value={QuestionDifficulty.Medium}>
              Medium
            </Select.Option>
            <Select.Option value={QuestionDifficulty.Hard}>Hard</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label={'Topic'}
          name={'examPoint'}
          rules={[
            {
              min: 2,
              max: 255,
              message: 'Topic must be between 2 and 255 characters',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label={'Category'} name={'categoryId'} required>
          <TreeSelect
            style={{ width: '100%' }}
            treeData={treeData}
          ></TreeSelect>
        </Form.Item>
        <Form.Item>
          <Button block htmlType="submit" type="primary" loading={loading}>
            {mode === 'create' ? 'Create Question' : 'Update Question'}
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  )
}

export default QuestionAddDrawer
