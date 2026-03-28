import React, { useState } from 'react'
import { CategoryTree, OptMode } from '../types/types.ts'
import { Button, Popconfirm, Table, Tooltip } from 'antd'
import { TableColumnsType, Tag } from 'antd'
import { isParentCategory } from '../utils'
import { AddSubset, AddThree, DeleteOne, EditTwo } from '@icon-park/react'
import CategoryOptDrawer from './CategoryOptDrawer.tsx'
import { useCategory } from '../hooks/useCategory.ts'

const CategoryList: React.FC = () => {
  /**
   * 选中的 Category
   */
  const [selectedCategory, setSelectedCategory] = useState<CategoryTree>()

  /**
   * 抽屉是否打开
   */
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const toggleIsDrawerOpen = () => {
    setIsDrawerOpen(!isDrawerOpen)
  }

  /**
   * 抽屉打开的模式
   */
  const [mode, setMode] = useState<OptMode>('create')

  /**
   * 获取分类及其附属操作函数
   */
  const {
    categoryTree,
    updateCategory,
    createCategory,
    deleteCategory,
    loading,
  } = useCategory()

  /**
   * CategoryList 的表格列定义
   */
  const columns: TableColumnsType<CategoryTree> = [
    {
      title: 'Category ID',
      dataIndex: 'categoryId',
      width: '5%',
      key: 'categoryId',
    },
    {
      title: 'Category Name',
      dataIndex: 'name',
      width: '10%',
      key: 'name',
    },
    {
      title: 'Category Type',
      dataIndex: 'parentCategoryId',
      width: '15%',
      key: 'parentCategoryId',
      render: (_, category) => (
        <>
          {isParentCategory(category) ? (
            <Tag color="red">Parent</Tag>
          ) : (
            <Tag color="green">Child</Tag>
          )}
        </>
      ),
    },
    {
      title: 'Actions',
      width: '10%',
      render: (_, category) => {
        return (
          <div className="flex gap-3">
            <Tooltip title={'Edit'}>
              <EditTwo
                theme="multi-color"
                size="18"
                fill={['#333', '#8dbaf1', '#ffffff', '#e64155']}
                className="cursor-pointer"
                onClick={() => {
                  setSelectedCategory(category)
                  setMode('update')
                  setIsDrawerOpen(true)
                }}
              />
            </Tooltip>
            <Popconfirm
              title={'Delete this category?'}
              onConfirm={async () => {
                await deleteCategory(category)
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
            {/* 只有一级分类（父分类）才能添加子分类 */}
            {isParentCategory(category) && (
              <Tooltip title={'Add Child Category'}>
                <AddSubset
                  theme="multi-color"
                  size="18"
                  fill={['#333', '#8dbaf1', '#ffffff', '#e64155']}
                  className="cursor-pointer"
                  onClick={() => {
                    setMode('create')
                    setSelectedCategory(category)
                    setIsDrawerOpen(true)
                  }}
                />
              </Tooltip>
            )}
          </div>
        )
      },
    },
  ]

  return (
    <div className="p-4">
      <div className="mb-3 flex justify-end">
        <Button
          type="primary"
          icon={<AddThree />}
          onClick={() => {
            setMode('create')
            setIsDrawerOpen(true)
            setSelectedCategory(undefined)
          }}
        >
          Create Category
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={categoryTree}
        pagination={false}
        loading={loading}
      />
      <CategoryOptDrawer
        category={selectedCategory}
        mode={mode}
        isDrawerOpen={isDrawerOpen}
        updateCategory={updateCategory}
        createCategory={createCategory}
        toggleIsDrawerOpen={toggleIsDrawerOpen}
      />
    </div>
  )
}

export default CategoryList
