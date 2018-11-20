import axios from '../utils/axios'
import md5 from 'md5'
import upload from './upload'


export interface SignForm {
  userName: string,
  password: string
}
export interface ContentItem { 
  name:string,
  content: string,
  brief: string,
  publish?: boolean,
  id:any,
  noteId: any
}

export default {
  getNoteList() {
    return axios.post('note/list')
  },
  addNoteItem(name: string) {
    return axios.post('note/add', { name })
  },
  deleteNoteItem(id: number) {
    return axios.post('note/delete', { id })
  },
  getNoteDetail() {
    return axios.post('note/detail')
  },

  getContentList(noteId: number) {
    return axios.post('content/list', { noteId})
  },
  getContentDetail(id: number) {
    return axios.post('content/detail', { id })
  },
  saveContentItem({ name, content, brief, publish, id, noteId }: ContentItem){
    return axios.post('content/save', { name, content, brief, publish, id, noteId})
  },
  deleteContentItem(id: number) {
    return axios.post('content/delete', {id})
  },

  checkName(userName: string) {
    return axios.post('user/checkExit', { userName })
  },
  signup({ userName, password }: SignForm){
    password = md5(password)
    return axios.post('user/signup', { userName, password })
  },
  
  login({ userName, password }: SignForm) {
    password = md5(password)
    return axios.post('user/login', { userName, password })
  },
  logout() {
    return axios.post('user/logout')
  },

  upload(file: any) {
    return upload(file)
  }
}