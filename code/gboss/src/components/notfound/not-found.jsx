import React, {Component} from 'react'
import {Button} from 'antd-mobile'

 class NotFound extends Component {
    render () {
        return (
            <div>
                <Button type='primary' onClick={() => this.props.history.replace('/')}>返回到首页</Button>
            </div>
        )
    }
}
export default NotFound