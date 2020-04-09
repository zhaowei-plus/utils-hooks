import React, {useState, Fragment, useEffect} from 'react'

import useTable from './use-table'
import Search from "../Search"

export default (url, initialParams = {}, staticParams = {}) => {
  const [ initialValues, setInitialValues ] = useState(initialParams)
  const { table, XmTable } = useTable(url, initialParams, staticParams)

  const SearchTable = (props) => {
    const { schema, columns = [], onSearch, ...rest } = props

    const handleSearch = (params = initialParams) => {
      setInitialValues(params)
      table.onSearch(typeof onSearch === 'function' ? onSearch(params) : params)
    }

    return (
      <Fragment>
        <div className="app-page__card">
          <Search
            schema={schema}
            onSearch={handleSearch}
            initialValues={initialValues}
          />
        </div>

        <div className="app-page__card">
          <XmTable
            columns={columns}
            {...rest}
          />
        </div>
      </Fragment>
    )
  }

  useEffect(() => {
    table.onSearch(initialParams)
  }, [])

  return {
    table,
    SearchTable,
  }
}
