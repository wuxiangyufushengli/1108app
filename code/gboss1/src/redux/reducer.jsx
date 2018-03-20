import {SUCESS,ERROR} from './action-type';
import {combineReducers} from 'redux';
import {getType} from '../untils/getType'
var inituser={
    name:'',
    pwd:'',
    redirectTo:'',
    msg:''
}
function user(state=inituser,action) {
    switch (action.type){
        case SUCESS:
            var user=action.data;
            return {...action.data,redirectTo:getType(user.type,user.avatar)};
        case ERROR:
            return {...state,msg:action.data}
        default:
            return state;
    }

}
export default combineReducers({
    user
})