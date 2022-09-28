import React, { FC, useState, useEffect } from 'react'
import { ImageUploader, Space, Toast, Dialog } from 'antd-mobile'
import { Button, TextArea, Form, Input } from 'antd-mobile'
import liff from '@line/liff'

import { DemoBlock, DemoDescription } from '../demos'
import { ImageUploadItem } from 'antd-mobile/es/components/image-uploader'

import { demoSrc, mockUpload } from './utils'

const maxCount = 9

// {
//     "userId": "U67441163b614ab53b3f884d7cd4b698e",
//     "displayName": "のなめ",
//     "pictureUrl": "https://profile.line-scdn.net/0hOYzHUg7eEHZXMTvWpKBuCSdhExx0QElkcgNcFmc5HhNvAVciKQcPEjc4TRJoA1RzLl4MQzYwHRZbImcQSWfsQlABTkFuB1IkclZZkQ"
// }
// limit
const LimitImageUploader: FC = () => {
  const [fileList, setFileList] = useState<ImageUploadItem[]>([
    {
      url: demoSrc,
    },
  ])
  function beforeUpload(file: File) {
    if (file.size > 5 * 1024 * 1024) {
      Toast.show('Images size should less than 5M')
      return null
    }
    return file
  }

  return (
    <ImageUploader
      value={fileList}
      onChange={setFileList}
      upload={mockUpload}
      multiple
      maxCount={maxCount}
      showUpload={fileList.length < maxCount}
      beforeUpload={beforeUpload}
      onCountExceed={() => {
        Toast.show(`アップロードは最大 ${maxCount} 枚までにしてください`)
      }}
      onDelete={() => {
        return Dialog.confirm({
          content: 'Confirm to delete?',
        })
      }}
    />
  )
}

export default () => {
  const onFinish = (values: any) => {
    Dialog.alert({
      content: <pre>{JSON.stringify(values, null, 2)}</pre>,
    })
  }

  useEffect(() => {
    liff.getProfile().then(console.log)
  }, [])
  return (
    <>
      <DemoBlock title="ご障害についてご入力をお願いします">
        <Form
          name="form"
          onFinish={onFinish}
          footer={
            <Button block type="submit" color="primary" size="large">
              OK
            </Button>
          }
        >
          <Form.Item name="name" label="お名前" rules={[{ required: true }]}>
            <Input placeholder="お名前をご入力ください" />
          </Form.Item>
          <Form.Item name="address" label="ご住所">
            <Input placeholder="ご住所をご入力ください" />
          </Form.Item>
          <Form.Item
            name="content"
            label="ご症状内容"
            help="ご症状内容をご入力ください"
          >
            <TextArea
              defaultValue={''}
              placeholder="ご症状内容をご入力ください"
              showCount
              autoSize={{ minRows: 3, maxRows: 7 }}
              maxLength={300}
            />
          </Form.Item>

          <Form.Item
            name="images"
            label="写真"
            help="写真のご送付をお願いします"
          >
            <Space direction="vertical">
              <LimitImageUploader />
              <DemoDescription
                content={`写真は最大${maxCount}枚をアップロードできます`}
              />
            </Space>
          </Form.Item>
        </Form>
      </DemoBlock>
    </>
  )
}
