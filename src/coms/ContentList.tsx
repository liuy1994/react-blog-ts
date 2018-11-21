import React, { Component } from 'react'
import './ContentList.less'
import request from '../services/request'
import { List, Button, Modal } from 'antd'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'

interface Props {
  selectedNoteId: number
}
interface State {
  contentList: object[]
}
class ContentList extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      contentList: []
    }
  }
  componentWillReceiveProps(nextProps) {
    this.getList(nextProps.selectedNoteId)
  }
  componentDidMount() {
    this.getList(this.props.selectedNoteId)
  }
  getList(noteId) {
    if (noteId) {
      request.getContentList(noteId).then(data => {
        this.setState({
          contentList: data.list
        })
      })
    }
  }
  showDeleteItem(id) {
    Modal.confirm({
      title: 'Confirm',
      content: '删除这篇文章？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => this.deleteItem(id)
    });
  }
  deleteItem(id) {
    request.deleteContentItem(id).then(() => {
      this.getList(this.props.selectedNoteId)
    })
  }
  render() {
    let { contentList } = this.state
    let noteId = this.props.selectedNoteId
    if(noteId) {
      return (
        <div className="content-list">
          <h3><Link to="/add"><Button size="small" type="primary">新增文章</Button></Link></h3>
          <List
            bordered={true}
            dataSource={contentList}
            renderItem={item => (
              <List.Item key={item.id}>
                <List.Item.Meta
                  title={<Link to={`detail/${item.id}`}>{item.name}</Link>}
                  description={item.brief}
                />
                <Link to={`/edit/${item.id}`}><Button type="primary">编辑</Button></Link>
                <Button type="danger" onClick={this.showDeleteItem.bind(this, item.id)}>删除</Button>
              </List.Item>
            )}
          ></List>
        </div>
      )
    } else {
      return (
        <div>
          <h1>Welcome, 请先选择一个笔记本</h1>
        </div>  
      )
    }
  }
}
const mapStateToProps = ({ notelist }) => {
  return {
    selectedNoteId: notelist.selectedNoteId
  }
}
export default connect(mapStateToProps)(ContentList)