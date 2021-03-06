import axios from 'axios';
const base_url='http://localhost:5000';
//const base_url=''
export default function ajax(url = '', data = {}, type = 'GET') {
    url=base_url+url
    if (type === 'GET') {
        // 准备url query参数数据
        let dataStr = '' //数据拼接字符串
        Object.keys(data).forEach(key => {
            dataStr += key + '=' + data[key] + '&'
        })
        if (dataStr !== '') {
            dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'))
            url = url + '?' + dataStr
        }
        // 发送get请求
        return axios.get(url)
    } else {
        // 发送post请求
        return axios.post(url, data)  // data: 包含请求体数据的对象
    }
}