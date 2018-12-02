import * as React from 'react'
import { Spin, Icon } from 'antd'
import './ContentInput.less'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'
import request from '../services/request';
import { iconUrl } from '../utils/constant'
import { ContentUtils } from 'braft-utils'

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: iconUrl,
})
interface Props {
  text: string,
  noteId: number,
  onInput: any
}
interface State {
  editorState: any,
  spinning: boolean
}
class ContentInput extends React.Component<Props, State>{
  constructor(props: Props) {
    super(props)
    this.state = {
      editorState: BraftEditor.createEditorState(null),
      spinning: false
    }
  }

  componentWillReceiveProps(props: Props) {
    this.setState({
      editorState: BraftEditor.createEditorState(props.text)
    })
  }
  public inputUpload: any
  editorInstance: any
  cleanContent() {
    this.setState({ editorState: BraftEditor.createEditorState(null) })
  }
  imageHandler = () => {
    this.inputUpload.click()
  }
  selectImg(event: any) {
    this.setState({
      spinning: true
    })
    if (event) request.upload(event.target.files[0]).then((data: any) => {
      this.setState({
        spinning: false
      })
      // this.inserImg(data)
    }, () => {
      this.setState({
        spinning: false
      })
    })
  }
  // inserImg = (url: string) => {
  inserImg = () => {
    const { editorState } = this.state
    ContentUtils.insertText(editorState, 'h1')
  }
  // handleChange(value: string) {
  //   this.setState({ text: value })
  // }
  submitContent = () => {
    const htmlContent = this.state.editorState.toHTML()
    console.log(htmlContent)
  }
  handleEditorChange = (editorState) => {
    console.log(editorState)
  }

  controls = [
    'undo', 'redo', 'separator',
    'font-size', 'line-height', 'headings', 'separator',
    'text-color', 'bold', 'italic', 'underline', 'strike-through', 'separator',
    'text-indent', 'separator',
    'list-ul', 'list-ol', 'blockquote', 'code', 'separator',
    'link', 'hr', {
        key: 'my-component',
        type: 'component',
        component: (
          <button type="button" data-title="上传图片" className="control-item button" onClick={this.inserImg}>
            <input type="file" ref={ref => this.inputUpload = ref} onChange={event => this.selectImg(event)} />
            <IconFont type="icon-pic-s"></IconFont>
          </button>
        )
    }, 'separator',
    'clear'
  ]
  render() {
    // let { onInput } = this.props
    let { editorState, spinning } = this.state
    return (
      <div className="content-input">
        <Spin size="large" spinning={spinning}>
          <BraftEditor
            ref={instance => this.editorInstance = instance}
            controls={this.controls}
            value={editorState}
            onChange={this.handleEditorChange}
            onSave={this.submitContent}
          />
        </Spin>
      </div>
    )
  }
}
export default ContentInput