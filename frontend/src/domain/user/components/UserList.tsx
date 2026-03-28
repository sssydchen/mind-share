import React, { useState } from 'react'
import { Button, Input, Pagination, Select, Table, Tag } from 'antd'
import { Admin, Banned } from '../types/types.ts'
import { UserListQueryParams } from '../types/serviceTypes.ts'
import { useUserList } from '../hooks/useUserList.ts'

const UserList: React.FC = () => {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const [filters, setFilters] = useState<UserListQueryParams>({
    page,
    pageSize,
  })

  const { userList, pagination, loading } = useUserList(filters)

  // 表格列配置
  const columns = [
    {
      title: 'User ID',
      dataIndex: 'userId',
      key: 'userId',
    },
    {
      title: 'Account',
      dataIndex: 'account',
      key: 'account',
    },
    {
      title: 'User Name',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Admin',
      dataIndex: 'isAdmin',
      key: 'isAdmin',
      render: (isAdmin: Admin) => (
        <Tag color={isAdmin === Admin.ADMIN ? 'green' : 'red'}>
          {isAdmin === Admin.ADMIN ? 'Yes' : 'No'}
        </Tag>
      ),
    },
    {
      title: 'Banned',
      dataIndex: 'isBanned',
      key: 'isBanned',
      render: (isBanned: Banned) => (
        <Tag color={isBanned === Banned.BANNED ? 'red' : 'green'}>
          {isBanned === Banned.BANNED ? 'Banned' : 'Active'}
        </Tag>
      ),
    },
  ]

  return (
    <div className="rounded-lg bg-white p-4">
      {/* 筛选区域 */}
      <div className="mb-4 grid grid-cols-2 gap-4 md:grid-cols-4">
        <Input
          placeholder="User ID"
          value={filters.userId}
          onChange={(e) => setFilters({ ...filters, userId: e.target.value })}
        />
        <Input
          placeholder="Account"
          value={filters.account}
          onChange={(e) => setFilters({ ...filters, account: e.target.value })}
        />
        <Input
          placeholder="User Name"
          value={filters.username}
          onChange={(e) => setFilters({ ...filters, username: e.target.value })}
        />
        <Select
          placeholder="Admin status"
          allowClear
          onChange={(value) => setFilters({ ...filters, isAdmin: value })}
          className="w-full"
        >
          <Select.Option value={Admin.ADMIN}>Yes</Select.Option>
          <Select.Option value={Admin.NOT_ADMIN}>No</Select.Option>
        </Select>
        <Select
          placeholder="Ban status"
          allowClear
          onChange={(value) => setFilters({ ...filters, isBanned: value })}
          className="w-full"
        >
          <Select.Option value={Banned.UNBANNED}>Active</Select.Option>
          <Select.Option value={Banned.BANNED}>Banned</Select.Option>
        </Select>
      </div>
      <div className="mb-4">
        <Button
          type="primary"
          onClick={() => {
            setPage(1) // 重置分页
          }}
        >
          Filter
        </Button>
        <Button
          onClick={() => {
            setFilters({
              page: page,
              pageSize: pageSize,
            })
            setPage(1) // 重置分页
          }}
          className="ml-2"
        >
          Reset
        </Button>
      </div>

      {/* 表格 */}
      <Table
        columns={columns}
        dataSource={userList}
        rowKey="userId"
        pagination={false}
        className="mb-4"
        loading={loading}
      />

      {/* 分页 */}
      <Pagination
        current={page}
        pageSize={pageSize}
        total={pagination?.total}
        onChange={(page, pageSize) => {
          setPage(page)
          setPageSize(pageSize)
          setFilters({
            ...filters,
            page: page,
            pageSize: pageSize,
          })
        }}
      />
    </div>
  )
}

export default UserList
