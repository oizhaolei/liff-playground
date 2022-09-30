import { ImageUploadItem } from 'antd-mobile/es/components/image-uploader'
import axios, { AxiosResponse } from 'axios'
import { UploadFromData } from '.'

export async function doUpload(file: File): Promise<ImageUploadItem> {
  const formData = new FormData()
  formData.append('file', file)
  const res: AxiosResponse<ImageUploadItem> = await axios.post(
    `https://line.spa-flow.com/api/upload`,
    formData
  )
  console.log('doUpload', res.data)
  return {
    url: `https://line.spa-flow.com/files/${res.data.key}`,
  }
}
export async function doSubmit(values: UploadFromData) {
  console.log('doSubmit:', values)
  const res: AxiosResponse<UploadFromData> = await axios.post(
    `https://line.spa-flow.com/api/malfunction`,
    values
  )
  console.log(res.data)
}
