import React from 'react'
import {
  SchemaForm,
  FormButtonGroup,
  Submit,
  Reset
} from '@formily/antd'

import {
  formatPlaceholder,
  clearObject
} from '../Utils'

import './index.less'

export default (props) => {
  const {schema, onSearch, ...rest} = props

  const onSubmit = (params) => {
    onSearch(clearObject(params))
  }

  return (
    <SchemaForm
      schema={{
        type: 'object',
        properties: formatPlaceholder(schema)
      }}
      onSubmit={onSubmit}
      onReset={onSubmit}
      className="search"
      {...rest}
    >
      <FormButtonGroup className="search__actions">
        <Submit>查询</Submit>
        <Reset>重置</Reset>
      </FormButtonGroup>
    </SchemaForm>
  )
}
