import { FC, useState, useEffect, Dispatch, SetStateAction } from 'react'
import { ImageUploader, Space, Toast, AutoCenter } from 'antd-mobile'
import { ImageUploadItem } from 'antd-mobile/es/components/image-uploader'
import { Button, TextArea, Form, Input } from 'antd-mobile'
import liff from '@line/liff'

import { DemoBlock, DemoDescription } from '../demos'
import styles from './index.module.css'

import { doUpload, doSubmit } from './utils'

const maxCount = 9
const maxSize = 9
export interface UploadFromData {
  content: string
  displayName?: string
  images: string[]
  product: string
}

// {
//     "userId": "U67441163b614ab53b3f884d7cd4b698e",
//     "displayName": "のなめ",
//     "pictureUrl": "https://profile.line-scdn.net/0hOYzHUg7eEHZXMTvWpKBuCSdhExx0QElkcgNcFmc5HhNvAVciKQcPEjc4TRJoA1RzLl4MQzYwHRZbImcQSWfsQlABTkFuB1IkclZZkQ"
// }
// limit
interface Props {
  imageList: ImageUploadItem[]
  setImageList: Dispatch<SetStateAction<ImageUploadItem[]>>
}
const LimitImageUploader: FC<Props> = ({ imageList, setImageList }) => {
  function beforeUpload(file: File) {
    if (file.size > maxSize * 1024 * 1024) {
      Toast.show(`Images size should less than ${maxSize}M`)
      return null
    }
    return file
  }

  return (
    <ImageUploader
      value={imageList}
      onChange={setImageList}
      upload={doUpload}
      multiple
      maxCount={maxCount}
      showUpload={imageList.length < maxCount}
      beforeUpload={beforeUpload}
      onCountExceed={() => {
        Toast.show(`アップロードは最大 ${maxCount} 枚までにしてください`)
      }}
    />
  )
}
interface Profile {
  userIdi?: string
  displayName?: string
  pictureUrl?: string
}

export default function UploaderPage() {
  const [profile, setProfile] = useState<Profile>({})
  const [imageList, setImageList] = useState<ImageUploadItem[]>([])
  const [form] = Form.useForm()

  const onFinish = async (values: any) => {
    Toast.show({
      icon: 'loading',
      content: 'Loading…',
      duration: 1000,
    })
    const data = {
      ...values,
      images: imageList.map((v) => v.url),
    }
    await doSubmit(data)
    Toast.show({
      icon: 'success',
      content: 'データをアップロードしました。',
      afterClose: async () => {
        await liff.sendMessages([
          {
            type: 'text',
            text: '故障情報を入力しました。',
            // 名前：${data.displayName}
            // 機器：${data.product}
            // 詳細：${data.content}
            // ,
            // },
            // {
            //   type: 'image',
            //   originalContentUrl: imageList[0].url,
            //   previewImageUrl: imageList[0].thumbnailUrl || '',
          },
        ])
        liff.closeWindow()
      },
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
          <img
            src={
              profile.pictureUrl ||
              'https://obs.line-scdn.net/0hUijqFRYACkZXCB8T-8J1EQBVASRkahRNdTweITlaCAIxaihrLD1HQ3NgV3cmagYQKzwwQC5dIXYxQxJ0YxIgdS9jMhU5RDtRLBIjITR0Jh07WSts/f256x256'
            }
            className={styles.logo}
          />
        </AutoCenter>

        <Form
          name="form"
          form={form}
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
            <Input placeholder="製品名をご入力ください" />
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
              <LimitImageUploader
                imageList={imageList}
                setImageList={setImageList}
              />
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
