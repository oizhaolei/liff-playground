import React, { FC, useState, useEffect } from 'react'
import {
  ImageUploader,
  Space,
  Toast,
  Dialog,
  Avatar,
  AutoCenter,
} from 'antd-mobile'
import { Button, Cascader, TextArea, Form, Input } from 'antd-mobile'
import liff from '@line/liff'

import { DemoBlock, DemoDescription } from '../demos'
import { ImageUploadItem } from 'antd-mobile/es/components/image-uploader'

import { demoSrc, mockUpload } from './utils'
import { products } from './data'

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
interface Profile {
  userIdi?: string
  displayName?: string
  pictureUrl?: string
}

export default () => {
  const [profile, setProfile] = useState<Profile>({})
  const [visible, setVisible] = useState(false)
  const [value, setValue] = useState<string[]>([])

  const onFinish = (values: any) => {
    Dialog.alert({
      content: <pre>{JSON.stringify(values, null, 2)}</pre>,
    })
  }

  useEffect(() => {
    try {
      liff.getProfile().then(setProfile)
    } catch (e) {
      console.error(e)
    }
  }, [])
  return (
    <>
      <DemoBlock title="ご障害についてご入力をお願いします">
        <AutoCenter>
          <Avatar
            src={
              profile.pictureUrl ||
              'https://obs.line-scdn.net/0hUijqFRYACkZXCB8T-8J1EQBVASRkahRNdTweITlaCAIxaihrLD1HQ3NgV3cmagYQKzwwQC5dIXYxQxJ0YxIgdS9jMhU5RDtRLBIjITR0Jh07WSts/f256x256'
            }
          />
        </AutoCenter>

        <Form
          name="form"
          initialValues={{
            displayName: profile.displayName,
          }}
          onFinish={onFinish}
          footer={
            <Button block type="submit" color="primary" size="large">
              OK
            </Button>
          }
        >
          <Form.Item name="displayName" label="お名前">
            <Input placeholder="お名前をご入力ください" />
          </Form.Item>
          <Form.Item name="product" label="製品">
            <Button
              onClick={() => {
                setVisible(true)
              }}
            >
              ご使用の機器...
            </Button>
            <Cascader
              options={products}
              visible={visible}
              cancelText="キャンセル"
              confirmText="OK"
              placeholder="選択"
              onClose={() => {
                setVisible(false)
              }}
              value={value}
              onConfirm={setValue}
            >
              {(items) => {
                if (items.every((item) => item === null)) {
                  return '未選択'
                } else {
                  return items.map((item) => item?.label ?? '未選択').join('-')
                }
              }}
            </Cascader>
          </Form.Item>
          <Form.Item
            name="content"
            label="ご症状内容"
            help="ご症状内容をご入力ください"
            rules={[{ required: true }]}
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
