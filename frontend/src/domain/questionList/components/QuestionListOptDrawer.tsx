import React, { useEffect, useState } from 'react'
import { Button, Drawer, Form, Input, message, Select } from 'antd'
import {
  CreateOrUpDateQuestionListBody,
  QuestionListEntity,
  QuestionListOptType,
} from '../types/types.ts'
import { useForm } from 'antd/es/form/Form'
import TextArea from 'antd/es/input/TextArea'
import { diffObject } from '../../../base/utils'

interface QuestionListOptDrawerProps {
  mode: QuestionListOptType
  isDrawerOpen: boolean
  toggleIsDrawerOpen: () => void
  updateQuestionListHandle: (
    questionListId: number,
    body: CreateOrUpDateQuestionListBody,
  ) => void
  createQuestionListHandle: (body: CreateOrUpDateQuestionListBody) => void
  selectedQuestionList: QuestionListEntity | undefined
}

const QuestionListOptDrawer: React.FC<QuestionListOptDrawerProps> = ({
  mode,
  isDrawerOpen,
  toggleIsDrawerOpen,
  createQuestionListHandle,
  updateQuestionListHandle,
  selectedQuestionList,
}) => {
  const [form] = useForm()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    form.setFieldsValue({
      name: selectedQuestionList?.name,
      description: selectedQuestionList?.description,
      type: selectedQuestionList?.type,
    })
  })

  /**
   * 提交表单
   * @param values
   */
  const onFinishHandle = async (values: any) => {
    setLoading(true)
    try {
      if (mode === 'create') {
        // 创建操作
        createQuestionListHandle({
          name: values.name,
          description: values.description,
          type: Number(values.type),
        })
        message.success('Study list created')
      } else {
        // 更新操作
        if (selectedQuestionList === undefined) {
          message.error('No study list selected')
          return
        }
        const diff = diffObject(selectedQuestionList, values)
        if (Object.keys(diff).length === 0) {
          message.warning('No changes made')
          return
        }
        // @ts-expect-error tes expect error
        updateQuestionListHandle(selectedQuestionList.questionListId, {
          ...diff,
        })
        message.success('Study list updated')
      }
      toggleIsDrawerOpen()
      form.resetFields()
    } catch (e: any) {
      message.error(e.message())
    } finally {
      setLoading(false)
    }
  }

  return (
    <Drawer
      open={isDrawerOpen}
      title={mode === 'create' ? 'Create Study List' : 'Edit Study List'}
      onClose={toggleIsDrawerOpen}
      width={450}
    >
      <Form
        form={form}
        autoComplete="off"
        layout="vertical"
        onFinish={onFinishHandle}
      >
        <Form.Item
          label="Study List Name"
          name="name"
          rules={[
            { required: true, message: 'Enter a study list name' },
            {
              min: 2,
              max: 32,
              message: 'Study list name must be between 2 and 32 characters',
            },
          ]}
        >
          <Input placeholder="Enter a study list name" />
        </Form.Item>
        <Form.Item
          label="Study List Description"
          name="description"
          rules={[
            {
              min: 2,
              max: 128,
              message: 'Description must be between 2 and 128 characters',
            },
          ]}
        >
          <TextArea placeholder="Enter a study list description"></TextArea>
        </Form.Item>
        <Form.Item
          label="Study List Type"
          name="type"
          rules={[{ required: true, message: 'Select a study list type' }]}
        >
          <Select>
            <Select.Option value="1">Standard Study List</Select.Option>
            <Select.Option value="2">Exclusive Study List</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary" loading={loading} block>
            {mode === 'create' ? 'Create' : 'Update'}
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  )
}

export default QuestionListOptDrawer
