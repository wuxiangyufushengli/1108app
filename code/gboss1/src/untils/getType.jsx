export function getType(type,avater) {
    var path=type==='boss'?'/boss':'genius';
    if(!avater){
        path+='info'
    }
   return path
}