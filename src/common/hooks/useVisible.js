import { useState, useCallback } from 'react'
/**
 * 自定义 hook：用于弹出框的打开与关闭控制
 *
 * @param {boolean} initVisible 初始化modal的显示状态
 */
export default (initVisible = false) => {
  const [params, setParams] = useState()
  const [visible, setVisible] = useState(initVisible)

  const open = useCallback((_params) => {
    setParams(_params)
    setVisible(true)
  }, [])

  const close = useCallback(() => {
    setParams()
    setVisible(false)
  }, [])

  return {
    params,
    visible,
    open,
    close,
  }
}
