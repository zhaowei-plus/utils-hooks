import { useState } from 'react'

const { http } = _MICRO_APP_CONFIG

/**
 * useList hook，用于Table、有搜索栏的Table数据搜索
 *
 * @param {string} url 请求地址
 * @param {object} initialParams 初始化参数，初始化时需要有搜索参数，并且在后续搜索中可以被修改的参数
 * @param {object} staticParams 静态参数，每次搜索都固定不变的参数
 * */
export default (url, initialParams = {}, staticParams = {}) => {
  const [params, setParams] = useState(initialParams)
  const [dataSource, setDataSource] = useState([])

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
    showQuickJumper: true,
    showTotal: total => `共${total}条`
  })

  /**
   * 查询列表信息：
   *  1 刷新时，分页器不变，搜索参数不变
   *  2 查询时，分页器清零，搜索参数改变
   * */
  const onFetch = (_pagination = pagination, _params = params) => {
    const { current: currentPage, pageSize } = _pagination

    const data = {
      pageIndex: currentPage,
      pageNo: currentPage,
      pageSize,
      ..._params,
      ...staticParams
    }

    /**
     * 向后端发送请求列表数据的方法根据项目实际自定义实现，主要
     * 是针对不同项目请求方式的不同做兼容处理
     * */
    // fetch('http://yapi.demo.qunar.com/mock/6576/yapi/expansion/list', {
    //   body: JSON.stringify(data),
    //   method: 'POST'
    // }).then(function(response) {
    //   return response.json();
    // }).then((res) => {
    //   console.log('res:', res)
    //   const { rows = [], total } = res.data || {}
    //
    //   setDataSource(rows)
    //   setParams(_params)
    //   setPagination({
    //     ..._pagination,
    //     total,
    //     current: currentPage
    //   })
    // })

    http.get(url, {
      pageIndex: currentPage,
      pageNo: currentPage,
      pageSize,
      ..._params,
      ...staticParams
    }).then((res) => {
      console.log('res:', res)
      const { rows = [], total } = res.data || {}

      setDataSource(rows)
      setParams(_params)
      setPagination({
        ..._pagination,
        total,
        current: currentPage
      })
    })
  }

  /**
   * 参数查询列表信息
   * */
  const onSearch = (_params) => {
    onFetch({ ...pagination,  current: 1}, _params)
  }

  /**
   * 分页查询列表信息
   * */
  const onChange = (_pagination) => {
    onFetch(_pagination)
  }

  return {
    params,
    onSearch,
    onFetch,

    table: {
      pagination,
      dataSource,
      onChange,
    },
  }
}
