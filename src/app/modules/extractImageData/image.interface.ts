export interface IImageData {
  name: string;
  organization: string;
  address: string;
  mobile: string;
}

export interface IImageExtractionResponse {
  success: boolean;
  data: IImageData;
  message: string;
}

export interface IImageRequest {
  imageBase64: string;
}
