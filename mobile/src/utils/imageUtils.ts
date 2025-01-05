import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import { AppError } from './AppError'

type ImageInfo = {
  size: number
}

async function pickImage() {
  const result = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
    aspect: [4, 4],
    mediaTypes: 'images',
    quality: 1
  })

  if (result.canceled) {
    return ''
  }

  const imageUri = result.assets[0].uri

  if (imageUri) {
    const imageInfo = (await FileSystem.getInfoAsync(imageUri)) as ImageInfo

    if (imageInfo.size / 1024 / 1024 > 10) {
      throw new AppError('Essa imagem é muito grande. Escolha uma de até 10MB')
    }
  }

  return imageUri
}

export const ImageUtils = {
  pickImage
}
