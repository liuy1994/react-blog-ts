import * as React from 'react'
import './Detail.scss'
import request from '../services/request'
import {Spin, Button} from 'antd'
import {Link} from "react-router-dom"

interface Props {
    match: {
        params: {
            id: number
        }
    }
}

interface State {
    detail: {
        name: string,
        content: string,
        brief: string,
        id: number
    }
}

class Detail extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            detail: {
                name: '',
                brief: '',
                content: '',
                id: null
            }
        }
    }

    componentDidMount() {
        let {id} = this.props.match.params
        this.getDetail(id)
    }

    getDetail(id: number) {
        request.getContentDetail(id).then(res => {
            this.setState({
                detail: res.data
            })
        })
    }

    render() {
        let {detail} = this.state
        return (
            <div className="detail">
                {detail ?
                    <div>
                        <h1>{detail.name}</h1>
                        <h2>{detail.brief}</h2>
                        <div className="item-content" dangerouslySetInnerHTML={{
                            __html: detail.content
                        }}/>
                        <Link to={`/edit/${detail.id}`}><Button type="primary">编辑</Button></Link>
                        <Link to={`/list`}><Button className="back-button">返回</Button></Link>
                    </div> :
                    <Spin tip="Loading..."/>}
            </div>
        )
    }
}

export default Detail
