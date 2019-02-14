import * as React from 'react'
import request, { AxiosResponse } from '../services/request'
import { Link } from 'react-router-dom'
import { Button, Input, Row, Modal, List } from 'antd'
import './List.scss'
const Search = Input.Search
interface State {
    contentList: object[],
    searched: boolean
}
class ContentList extends React.Component<any, State> {
    constructor(props: any) {
        super(props)
        this.state = {
            contentList: [],
            searched: false
        }
    }
    componentDidMount() {
        this.getList()
    }
    getList = () => {
        request.getContentList().then((data: AxiosResponse) => {
            this.setState({
                contentList: data.data.list
            })
        })
    }
    showDeleteItem = (id: number) : void => {
        Modal.confirm({
            title: 'Confirm',
            content: '删除这篇文章？',
            okText: '确认',
            cancelText: '取消',
            onOk: () => this.deleteItem(id)
        });
    }

    deleteItem = (id: number): void => {
        request.deleteContentItem(id).then(() => {
            this.getList()
        })
    }
    search = (keyword: string) => {
        this.setState({
            searched: true
        })
        request.queryContentList(keyword).then((res: AxiosResponse) => {
            this.setState({
                contentList: res.data.list
            })
        })
    }
    render() {
        let { contentList, searched } = this.state
        return (
            <div className="content-list">
                <Row>
                    <Link className="add-content" to="/add"><Button size="small" type="primary">新增文章</Button></Link>
                    <Search placeholder="input search text" onSearch={value => this.search(value)} enterButton />
                </Row>
                <List
                    bordered={true}
                    dataSource={contentList}
                    renderItem={(item: {name: string;brief:string;id: number}) => (
                        <List.Item key={item.id}>
                            <List.Item.Meta
                                title={<Link to={`/detail/${item.id}`}>{item.name}</Link>}
                                description={item.brief}
                            />
                            <Link to={`/edit/${item.id}`}><Button type="primary">编辑</Button></Link>
                            <Button type="danger" onClick={() => this.showDeleteItem(item.id)}>删除</Button>
                        </List.Item>
                    )}
                />
                {/*{searched ?*/}
                    {/*<List*/}
                        {/*bordered={true}*/}
                        {/*dataSource={contentList}*/}
                        {/*renderItem={(item: {name: string;brief:string;id: number}) => (*/}
                            {/*<List.Item key={item.id}>*/}
                                {/*<List.Item.Meta*/}
                                    {/*title={item.name}*/}
                                    {/*description={item.brief}*/}
                                {/*/>*/}
                                {/*<Button type="primary">编辑</Button>*/}
                                {/*<Button type="danger" onClick={() => this.showDeleteItem(item.id)}>删除</Button>*/}
                            {/*</List.Item>*/}
                        {/*)}*/}
                    {/*/> :*/}
                    {/*<h1>Welcome, 选择一个笔记本或者输入关键字搜索</h1>}*/}
            </div>
        )
    }
}
export default ContentList
