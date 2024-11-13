import { Spin } from 'antd'

const FullLoadingView = () => {
  return (
    <Spin spinning={true}>
      <div className="h-screen w-screen" />
    </Spin>
  )
}

export default FullLoadingView
