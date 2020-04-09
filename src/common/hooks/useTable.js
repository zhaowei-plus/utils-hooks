import React from 'react'
import { Table} from 'antd'

import useList from './use-list'

export default (url, initialParams = {}, staticParams = {}) => {
  const list = useList(url, initialParams, staticParams)

  const XmTable = (props) => {
    const { rowKey = 'id', columns = [], ...rest } = props

    return  (
      <Table
        rowKey={rowKey}
        columns={columns}
        {...list.table}
        {...rest}
      />
    )
  }

  return {
    table: list,
    XmTable
  }
}
