import React, { useEffect } from 'react'
import { CategoryTree, OptMode } from '../types/types.ts'
import { Button, Drawer, Form, Input, message } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { CreateCategoryBody } from '../types/categoryService.ts'

interface CategoryOptDrawerProps {
  category: CategoryTree | undefined
  isDrawerOpen: boolean
  mode: OptMode
  updateCategory: (category: CategoryTree) => void
  createCategory: (category: CreateCategoryBody) => void
  toggleIsDrawerOpen: () => void
}

// 枚举可能的操作类型
enum ModeEnum {
  createParentCategory = 1,
  createSubCategory = 2,
  updateCategory = 3,
}

const CategoryOptDrawer: React.FC<CategoryOptDrawerProps> = ({
  mode,
  category,
  updateCategory,
  createCategory,
  isDrawerOpen,
  toggleIsDrawerOpen,
}) => {
  const [form] = useForm()

  /**
   * 根据 mode 和 category 枚举当前的操作模式
   *
   * 如果 mode 为 'create' && category 为 undefined，则创建父分类
   * 如果 mode 为 'create' && category 不为 undefined，则创建子分类
   * 如果 mode 为 'update'，则编辑分类
   *
   * 其余情况向外抛出错误
   */
  let modeEnum: ModeEnum

  if (mode === 'create' && category === undefined) {
    modeEnum = ModeEnum.createParentCategory
  } else if (mode === 'create' && category !== undefined) {
    modeEnum = ModeEnum.createSubCategory
  } else if (mode === 'update' && category !== undefined) {
    modeEnum = ModeEnum.updateCategory
  } else {
    console.log('Invalid mode/category combination')
    throw new Error('Invalid mode/category combination')
  }

  function onFinish(values: any) {
    if (modeEnum === ModeEnum.createParentCategory) {
      createCategory({
        name: values.name,
        parentCategoryId: 0,
      })
      message.success('Category created')
    } else if (modeEnum === ModeEnum.createSubCategory) {
      createCategory({
        name: values.name,
        parentCategoryId: category!.categoryId,
      })
      message.success('Category created')
    } else if (modeEnum === ModeEnum.updateCategory) {
      if (category === undefined) return
      updateCategory({
        ...category,
        name: values.name,
      })
      message.success('Category updated')
    } else {
      console.log('error')
      throw new Error('error')
    }
    toggleIsDrawerOpen()
  }

  useEffect(() => {
    if (modeEnum === ModeEnum.createParentCategory) {
      // 创建父分类，不需要设置初始值
      return
    } else if (modeEnum === ModeEnum.createSubCategory) {
      // 创建子分类，需要设置父分类信息
      form.setFieldsValue({
        parentCategoryName: category?.name,
      })
    } else if (mode === 'update' && category !== undefined) {
      form.setFieldsValue({
        categoryId: category.categoryId,
        name: category.name,
      })
    } else {
      console.log('error')
    }
    return () => {
      // 清空表单
      form.resetFields()
    }
  })

  return (
    <div>
      <Drawer
        open={isDrawerOpen}
        title={mode === 'create' ? 'Create Category' : 'Edit Category'}
        onClose={toggleIsDrawerOpen}
        width={450}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          {modeEnum === ModeEnum.createSubCategory && (
            <Form.Item
              label="Parent Category"
              name="parentCategoryName"
              rules={[
                { required: true, message: 'Enter a category name' },
                {
                  min: 2,
                  max: 32,
                  message: 'Category name must be between 2 and 32 characters',
                },
              ]}
            >
              <Input disabled></Input>
            </Form.Item>
          )}
          {modeEnum === ModeEnum.updateCategory && (
            <Form.Item label="Category ID" name="categoryId">
              <Input disabled></Input>
            </Form.Item>
          )}
          <Form.Item
            label="Category Name"
            name="name"
            rules={[
              { required: true, message: 'Enter a category name' },
              {
                min: 2,
                max: 32,
                message: 'Category name must be between 2 and 32 characters',
              },
            ]}
          >
            <Input></Input>
          </Form.Item>
          <Form.Item>
            <Button type="primary" block htmlType="submit">
              {mode === 'create' ? 'Create' : 'Update'}
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  )
}

export default CategoryOptDrawer
