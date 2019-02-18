import axios from '../utils/axios'
import * as md5 from 'md5'
import upload from './upload'
export {AxiosResponse} from 'axios'
export interface userForm {
    userName: string;
    password: string
}
export interface ContentItem {
    name:string,
    content: string,
    brief: string,
    publish?: boolean,
    id:any
}
export interface UserInfo {
    name: string,
    email: string,
    mobile: string,
    wechat: string
}
export  default {
    getNoteList() {
        return axios.post('note/list')
    },

    addNoteItem(name: string) {
        return axios.post('note/add', { name })
    },
    deleteNoteItem(id: number) {
        return axios.post('note/delete', { id })
    },

    queryContentList(keyword: string) {
        return axios.post('content/query', { keyword })
    },
    getContentList() {
        return axios.post('content/list')
    },
    getContentDetail(id: number) {
        return axios.post('content/detail', { id })
    },
    saveContentItem({ name, content, brief, publish, id }: ContentItem){
        content = content.replace(/\"/g, '\\\"')
        return axios.post('content/save', { name, content, brief, publish, id})
    },
    deleteContentItem(id: number) {
        return axios.post('content/delete', {id})
    },

    checkName(userName: string) {
        return axios.post('user/checkExit', { userName })
    },
    signup({ userName, password }: userForm){
        return axios.post('user/signup', { userName, password: md5(password) })
    },

    login({userName, password}: userForm) {
        return axios.post('user/login', {userName, password: md5(password)})
    },
    logout() {
        return axios.post('user/logout')
    },
    updateUserInfo(params: UserInfo) {
        return axios.post('user/update', params)
    },
    getUserInfo() {
        return axios.post('user/info')
    },
    upload(file: any) {
        return upload(file)
    }
}
