import * as React from 'react'
import request from '../services/request'
// import './NoteList.less'
import { Form, Input, Modal, List, Icon } from 'antd'
import store from '../redux/store'
import { connect } from 'react-redux'

interface State {
  notelist: object[],
  visible: boolean,
  name: string
}

const FormItem = Form.Item
const ListItem = List.Item
class NoteList extends React.Component<any, State> {
  constructor(props: any) {
    super(props)
    this.state = {
      notelist: [],
      visible: false,
      name: ''
    }
  }
  getNoteList() {
    request.getNoteList().then((data: {list: object[]}) => {
      this.setState({
        notelist: data.list
      })
    })
  }
  showAddNoteModal() {
    this.setState({
      visible: true
    })
  }
  addItem(name: string) {
    request.addNoteItem(name).then(() => {
      this.getNoteList()
      this.setState({
        visible: false
      })
    })
  }
  confirmAdd = () => {
    this.props.form.validateFields((err: any, values:{name: string}) => {
      if (!err) {
        this.addItem(values.name)
      }
    })
  }
  cancelAdd = () => {
    this.setState({
      visible: false
    })
  }
  inputName = () => {
    setTimeout(() => {
      console.log(this.state)
    }, 3000)
  }
  deleteItem = (id) => {
    request.deleteNoteItem(id).then(() => {
      this.getNoteList()
    })
  }
  confirmDetele = (id) => {
    Modal.confirm({
      title: '提示',
      content: '确认删除?',
      onOk:() => this.deleteItem(id)
    })
  }
  selectNote = (id:number) => {
    store.dispatch({
      type: 'SELECT_NOTE',
      id
    })
    if (!/list/.test(window.location.hash)){
      window.location.href = '/#/list'
    }
  }
  componentDidMount() {
    this.getNoteList()
  }
  render() {
    const { getFieldDecorator } = this.props.form
    const { notelist, name, visible } = this.state
    return (
      <div className="note-list">
        <h3>
          <span>笔记本列表</span>
          <Icon type="plus-circle" theme="outlined" onClick={this.showAddNoteModal.bind(this)}/>
        </h3>
        <List
          size="small"
          bordered
          dataSource={notelist}
          renderItem={(item: { id: number, name: string }) => (
            <ListItem>
              <span onClick={this.selectNote.bind(this, item.id)}>{item.name}</span>
              <Icon onClick={this.confirmDetele.bind(this, item.id)} type="delete" theme="outlined" />
            </ListItem>
          )}
        />
        <Modal visible={visible} title="新增笔记本" onOk={this.confirmAdd} onCancel={this.cancelAdd}>
          <Form>
            <FormItem label="名称">
              {getFieldDecorator('name', {
                initialValue: name,
                rules: [{ required: true, message: 'Please input your note name!', }],
              })(<Input placeholder="请输入笔记本名称"></Input> )}
            </FormItem>
          </Form>
        </Modal>
      </div> 
    )
  }
}
interface StateProps {
  notelist: {
    selectedNoteId: number
  }
}
const WrappedNoteList = Form.create()(NoteList)
const mapStateToProps = (state: StateProps) => {
  return {
    selectedNoteId: state.notelist.selectedNoteId
  }
}
export default connect(mapStateToProps)(WrappedNoteList)