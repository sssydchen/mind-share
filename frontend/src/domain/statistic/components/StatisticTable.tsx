import React, { useState } from 'react'
import { StatisticEntity } from '../types/types.ts'
import { Pagination, Table, TableProps } from 'antd'
import { useStatistic } from '../hooks/useStatistic.ts'

const columns: TableProps<StatisticEntity>['columns'] = [
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Logins',
    dataIndex: 'loginCount',
    key: 'loginCount',
  },
  {
    title: 'Sign Ups Today',
    dataIndex: 'registerCount',
    key: 'registerCount',
  },
  {
    title: 'Total Sign Ups',
    dataIndex: 'totalRegisterCount',
    key: 'totalRegisterCount',
  },
  {
    title: 'Notes Today',
    dataIndex: 'noteCount',
    key: 'noteCount',
  },
  {
    title: 'Note Authors Today',
    dataIndex: 'submitNoteCount',
    key: 'submitNoteCount',
  },
  {
    title: 'Total Notes',
    dataIndex: 'totalNoteCount',
    key: 'totalNoteCount',
  },
]

const StatisticTable: React.FC = () => {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const { loading, statistic, pagination } = useStatistic(page, pageSize)

  return (
    <div>
      <Table
        loading={loading}
        dataSource={statistic}
        pagination={false}
        columns={columns}
      ></Table>
      <div className="mt-4 flex justify-center">
        <Pagination
          current={page}
          pageSize={pageSize}
          total={pagination?.total}
          onChange={(page, pageSize) => {
            setPage(page)
            setPageSize(pageSize)
          }}
        ></Pagination>
      </div>
    </div>
  )
}

export default StatisticTable
