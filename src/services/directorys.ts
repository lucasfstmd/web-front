import axiosInstance from './axios'
import { IResponseDirectory } from '../store/directory/types'
import { AxiosResponse } from 'axios'

class DirectorysServices {

    constructor(private apiVersion: string = 'v1') {
    }

    public getDirectory(currentDirectory: string): Promise<IResponseDirectory> {
        return new Promise<IResponseDirectory>((resolve, reject) => {
            const result: IResponseDirectory = {
                folders: [],
                files: [],
            };

            Promise.all([
                axiosInstance.get(`${this.apiVersion}/directory/${currentDirectory}`)
                    .then((res: AxiosResponse) => {
                        result.folders.push(...res.data)
                    }),
                axiosInstance.get(`v1/files/find/${currentDirectory}`)
                    .then((res: AxiosResponse) => {
                        result.files.push(...res.data)
                    })
            ]).then(() => {
                resolve(result)
            }).catch((err: any) => {
                reject(err)
            })
        })
    }

    public saveNewFolder(fileName: string, currentDirectory: string): Promise<any> {
        return axiosInstance.post(
            `${this.apiVersion}/directory/create/folder/${currentDirectory}/${fileName}`
        ).then((res: AxiosResponse) => res.data)
    }

    public uploadFiles(files: any, currentDirectory: string): Promise<any> {
        const formData = new FormData()
        let i = 0
        for (const file of files) {
            formData.append(`file-${i}`, file)
            i++
        }

        return axiosInstance.post(
            `${this.apiVersion}/files/upload/${currentDirectory}`,
            formData,
            {
                headers: {
                    "Content-type": "multipart/form-data",
                }
            }
        ).then((res: AxiosResponse) => res.data)
    }

    public deleteFile(file_id: string): Promise<any> {
        return axiosInstance.delete(
            `${this.apiVersion}/files/${file_id}`
        ).then((res: AxiosResponse) => res.data)
    }

    public deleteFoder(directory_id: string): Promise<any> {
        return axiosInstance.delete(
            `${this.apiVersion}/directory/${directory_id}`
        ).then((res: AxiosResponse) => res.data)
    }
}

const directoryService = new DirectorysServices()

export default directoryService
