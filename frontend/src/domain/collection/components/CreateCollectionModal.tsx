import React, { useState } from 'react'
import { Button, Form, Input, Modal } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { CreateCollectionBody } from '../types/types.ts'

interface CreateCollectionModalProps {
  isModalOpen: boolean
  toggleIsModalOpen: () => void
  createCollection: (
    body: CreateCollectionBody,
    noteId?: number, // 笔记 ID，点击某个笔记弹窗时，该笔记的 ID
  ) => Promise<void> // 创建收藏夹处理函数
  selectedNoteId?: number
}

const CreateCollectionModal: React.FC<CreateCollectionModalProps> = ({
  isModalOpen,
  toggleIsModalOpen,
  createCollection,
  selectedNoteId,
}) => {
  const [form] = Form.useForm()

  const [loading, setLoading] = useState(false)

  const onFinishHandle = async (values: CreateCollectionBody) => {
    setLoading(true)
    await createCollection(values, selectedNoteId)
    setLoading(false)
    form.resetFields()
    toggleIsModalOpen()
  }

  return (
    <Modal open={isModalOpen} onCancel={toggleIsModalOpen} footer={null}>
      <div className="mb-4 text-center text-lg font-medium">
        Create a New Collection
      </div>
      <Form form={form} autoComplete={'off'} onFinish={onFinishHandle}>
        <Form.Item
          name={'name'}
          rules={[
            { required: true, message: 'Enter a collection name' },
            { min: 2, message: 'Use at least 2 characters' },
            { max: 32, message: 'Use 32 characters or fewer' },
            {
              pattern: new RegExp('^[\\u4e00-\\u9fa5a-zA-Z0-9_+\\-]+$'),
              message:
                'Only letters, numbers, underscores, hyphens, and Chinese characters are allowed',
            },
          ]}
        >
          <Input placeholder={'Enter a collection name'} />
        </Form.Item>
        <Form.Item
          name={'description'}
          rules={[
            { max: 128, message: 'Use 128 characters or fewer' },
            {
              pattern: new RegExp('^[\\u4e00-\\u9fa5a-zA-Z0-9_+\\-]+$'),
              message:
                'Only letters, numbers, underscores, hyphens, and Chinese characters are allowed',
            },
          ]}
        >
          <TextArea placeholder={'Enter a collection description'} rows={4} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Create
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CreateCollectionModal
