//数组里是否存在某个值
function inArray(value,arr){
    for(var i in arr){
        if(arr[i] == value)return true;
    }
    return false;
}