import React, { Component } from 'react'
import './ContentList.less'
import request from '../services/request'
import { List, Button, Modal, Input, Row } from 'antd'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import store from '../redux/store'
const Search = Input.Search
interface Props {
  selectedNoteId: number
}
interface State {
  contentList: object[],
  searched: boolean
}
class ContentList extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      contentList: [],
      searched: false
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedNoteId) this.getList(nextProps.selectedNoteId)
  }
  componentDidMount() {
    if (this.props.selectedNoteId) this.getList(this.props.selectedNoteId)
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
  search = (keyword: string) => {
    store.dispatch({
      type: 'SELECT_NOTE'
    })
    this.setState({
      searched: true
    })
    request.queryContentList(keyword).then(data => {
      this.setState({
        contentList: data.list
      })
    })
  }
  render() {
    let { contentList, searched } = this.state
    let noteId = this.props.selectedNoteId
    return (
      <div className="content-list">
        <Row>
          {noteId ? <Link className="add-content" to="/add"><Button size="small" type="primary">新增文章</Button></Link> : null}
          <Search placeholder="input search text" onSearch={value => this.search(value)} enterButton />
        </Row>
        {
          (noteId || searched) ? 
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
            ></List> : 
            <h1>Welcome, 选择一个笔记本或者输入关键字搜索</h1>
        }
      </div>
    )
  }
}
const mapStateToProps = ({ notelist }) => {
  return {
    selectedNoteId: notelist.selectedNoteId
  }
}
export default connect(mapStateToProps)(ContentList)