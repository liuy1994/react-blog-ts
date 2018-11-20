import * as React from 'react'
import * as ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { Spin } from 'antd'
// import './ContentInput.less'
import request from '../services/request';
import {File} from '../services/upload';
interface Props {
  content: string,
  noteId: number,
  onInput: any
}
interface State {
  text: string,
  spinning: boolean
}
class ContentInput extends React.Component<Props, State>{
  constructor(props: Props) {
    super(props)
    this.state = {
      text: '',
      spinning: false
    }
  }
  componentWillReceiveProps(props: Props) {
    this.setState({
      text: props.content
    })
  }
  modules = {
    toolbar: {
      container: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image'],
        ['clean']
      ],
      handlers: {
        'image': this.imageHandler.bind(this),
        'clean': this.cleanContent.bind(this)
      }
    }
  }
  cleanContent() {
    this.setState({ text: '' })
  }
  imageHandler() {
    // this.inputUpload.click()
  }
  selectImg(event: { target: { files: File[]}}) {
    this.setState({
      spinning: true
    })
    request.upload(event.target.files[0]).then((data: any) => {
      this.setState({
        spinning: false
      })
      this.inserImg(data)
    })
  }
  inserImg(url: string){
    // const range = this.quillRef.getEditor().getSelection()
    // this.quillRef.getEditor().insertEmbed(range.index, 'image', url)
    // this.quillRef.getEditor().setSelection(range.index + 1)
  }
  handleChange(value: string) {
    this.setState({ text: value })
  }
  componentDidMount() {
    console.log(this.refs)
  }
  render() {
    let { onInput } = this.props
    let { text, spinning } = this.state
    return (
      <div className="content-input">
        {/* <input type="file" ref={ref => this.inputUpload = ref} onChange={event => this.selectImg(event)}/> */}
        <Spin size="large" spinning={spinning}>
          <ReactQuill
            // ref={ref => this.quillRef = ref}
            theme="snow"
            modules={this.modules}
            value={text}
            height="300"
            placeholder='Compose an epic...'
            onChange={onInput}>
          </ReactQuill>
        </Spin>
      </div>
    )
  }
}
export default ContentInput