import React, { useState } from 'react'
import {
  Button,
  message,
  Popconfirm,
  Table,
  TableColumnsType,
  Tag,
  Tooltip,
} from 'antd'
import { QuestionListEntity, QuestionListOptType } from '../types/types.ts'
import { useQuestionLists } from '../hooks/useQuestionLists.ts'
import { AddThree, DeleteOne, EditTwo, ViewList } from '@icon-park/react'
import QuestionListOptDrawer from './QuestionListOptDrawer.tsx'
import { useNavigate } from 'react-router-dom'
import { QUESTION_LIST_MANAGE } from '../../../apps/admin/router/config.ts'

const QuestionListTable: React.FC = () => {
  const {
    questionLists,
    createQuestionListHandle,
    updateQuestionListHandle,
    deleteQuestionListHandle,
    loading,
  } = useQuestionLists()

  /**
   * control drawer open status
   */
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const toggleIsDrawerOpen = () => {
    setIsDrawerOpen(!isDrawerOpen)
  }

  /**
   * selected question list id
   */
  const [selectedQuestionList, setSelectedQuestionList] =
    useState<QuestionListEntity>()

  /**
   * open drawer mode (create or update)
   */
  const [mode, setMode] = useState<QuestionListOptType>('create')

  /**
   * create question list button click handle
   */
  const createButtonClickHandle = () => {
    setMode('create')
    setIsDrawerOpen(true)
  }

  /**
   * edit question list button click handle
   */
  const editButtonClickHandle = (questionList: QuestionListEntity) => {
    setMode('update')
    setSelectedQuestionList(questionList)
    setIsDrawerOpen(true)
  }

  const navigate = useNavigate()

  /**
   * table columns
   */
  const columns: TableColumnsType<QuestionListEntity> = [
    {
      title: 'Study ListsID',
      dataIndex: 'questionListId',
      key: 'questionListId',
      width: '20%',
    },
    {
      title: 'Study Lists',
      dataIndex: 'name',
      key: 'name',
      width: '20%',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type) => {
        switch (type) {
          case 1:
            return <Tag color="success">Standard Study List</Tag>
          case 2:
            return <Tag color="red">Exclusive Study List</Tag>
        }
      },
      width: '20%',
    },
    {
      title: 'Actions',
      key: 'opt',
      render: (_, questionList) => {
        return (
          <div className="flex items-center gap-3">
            <Tooltip title={'Edit'}>
              <EditTwo
                theme="multi-color"
                size="18"
                fill={['#333', '#8dbaf1', '#ffffff', '#e64155']}
                className="cursor-pointer"
                onClick={() => editButtonClickHandle(questionList)}
              />
            </Tooltip>
            <Popconfirm
              title={'Delete this study list?'}
              onConfirm={async () => {
                await deleteQuestionListHandle(questionList.questionListId)
                message.success('Deleted')
              }}
            >
              <Tooltip title={'Delete'}>
                <DeleteOne
                  theme="multi-color"
                  size="18"
                  fill={['#333', '#8dbaf1', '#ffffff', '#e64155']}
                  className="cursor-pointer"
                />
              </Tooltip>
            </Popconfirm>
            <Tooltip title={'View details'}>
              <ViewList
                theme="multi-color"
                size="18"
                fill={['#333', '#8dbaf1', '#ffffff', '#e64155']}
                className="cursor-pointer"
                onClick={() => {
                  navigate(
                    `${QUESTION_LIST_MANAGE}/${questionList.questionListId}`,
                  )
                }}
              />
            </Tooltip>
          </div>
        )
      },
      width: '40%',
    },
  ]

  return (
    <div className="rounded bg-white p-4">
      <div className="mb-3 flex justify-end">
        <Button
          type="primary"
          icon={<AddThree />}
          onClick={createButtonClickHandle}
        >
          Create Study List
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={questionLists}
        loading={loading}
        pagination={false}
        rowKey="questionListId"
      ></Table>
      <QuestionListOptDrawer
        mode={mode}
        isDrawerOpen={isDrawerOpen}
        toggleIsDrawerOpen={toggleIsDrawerOpen}
        updateQuestionListHandle={updateQuestionListHandle}
        createQuestionListHandle={createQuestionListHandle}
        selectedQuestionList={selectedQuestionList}
      ></QuestionListOptDrawer>
    </div>
  )
}

export default QuestionListTable
