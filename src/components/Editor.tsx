import * as React from 'react'
import {Spin, Icon} from 'antd'
import 'braft-editor/dist/index.css'
import request from '../services/request'
import {iconUrl} from '../utils/constant'
const {ContentUtils} = require('braft-utils')
const IconFont = Icon.createFromIconfontCN({
    scriptUrl: iconUrl,
})
let BraftEditor = require('braft-editor')
BraftEditor = BraftEditor.default
import './Editor.scss'
interface Props {
    text: string,
    onInput: any
}

interface State {
    editorState: any,
    spinning: boolean
}

class Editor extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            editorState: BraftEditor.createEditorState(null),
            spinning: false
        }
    }
    componentWillReceiveProps (nextProps: Props) {
        if (nextProps.text !== this.props.text) {
            this.setState({
                editorState: BraftEditor.createEditorState(nextProps.text)
            })
        }
    }

    public inputUpload: any

    cleanContent() {
        this.setState({editorState: BraftEditor.createEditorState(null)})
    }

    imageHandler = () => {
        this.inputUpload.click()
    }

    selectImg(event: any) {
        this.setState({
            spinning: true
        })
        if (event) request.upload(event.target.files[0]).then((data: string) => {
            this.insertImg(data)
        }).finally(() => {
            this.setState({
                spinning: false
            })
        })
    }

    insertImg = (url: string) => {
        this.setState({
            editorState: ContentUtils.insertMedias(this.state.editorState, [{
                type: 'IMAGE',
                url: url
            }])
        })
    }

    submitContent = () => {
        const htmlContent = this.state.editorState.toHTML()
        console.log(htmlContent)
    }
    handleEditorChange = (editorState: any) => {
        this.setState({ editorState })
        this.props.onInput(editorState.toHTML())
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
                <button type="button" data-title="上传图片" className="control-item button" onClick={() => this.inputUpload.click()}>
                    <input type="file" ref={ref => this.inputUpload = ref} onChange={event => this.selectImg(event)} />
                    <IconFont type="icon-pic-s" />
                </button>
            )
        }, 'separator',
        'clear'
    ]

    render() {
        let {editorState, spinning} = this.state
        return <div className="content-input">
            <Spin size="large" spinning={spinning}>
                <BraftEditor
                    controls={this.controls}
                    value={editorState}
                    onChange={this.handleEditorChange}
                    onSave={this.submitContent}
                />
            </Spin>
        </div>
    }
}
export default Editor
