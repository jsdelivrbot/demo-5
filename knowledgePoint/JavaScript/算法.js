// // 1. 检查是不是回文
// function checkPalindrom(str){
//     return str==str.split("").reverse().join("");
// }


// // 2. 去掉一组整形数的重复的值
// function unique(arr){
//     if (!arguments.length) {
//         return ;
//     }
//
//     var data=[]; //返回的数据
//     var hashTable = {};  //记录某一数据是否存在
//     for (let i = 0; i < arr.length; i++) {
//         // 条件：对象里记录的是false
//         // 执行：记录此数据为true && 保存一条到新数组；
//         if (!hashTable[arr[i]]) {
//             hashTable[arr[i]] = true;
//             data.push(arr[i]);
//         }
//     }
//     return data;
// }


// // 3. 统计一串字符串出现次数最多的字母
// function maxNumChar(str){
//     // 定义记录数据的对象
//     var data = {};
//
//     // 得到数据对象
//     for (var i = 0; i < str.length; i++) {
//         if (!data[str[i]]) {
//             data[str[i]] = 1;
//         }
//         data[str[i]]++;
//     }
//
//     let maxChar = "",maxValue = 1;
//     // 从对象中找到最大的元素
//     for(var k in data){
//         if (data[k]>maxValue) {
//             maxValue = data[k];
//             maxChar = k;
//         }
//     }
//     return maxChar;
// }

// // 4.1冒泡排序
// function bubbleSort(arr){
//     for(let i=0;i<arr.length;i++){
//         for(let j=i+1;j<arr.length;j++){
//             if (arr[i]>arr[j]) {
//                 let tem = arr[i];
//                 arr[i] = arr[j];
//                 arr[j] = tem;
//             }
//         }
//     }
//     return arr;
// }

// 4.2 快速排序（分治法）
function quickSort(arr){
    if (arr.length<=1) {
        return arr;
    }

    还缺2句
    let pivot = arr[4];
    let left = right = [];
    for(var i=0;i<arr.length;i++){
        if (arr[i]<pivot) {
            left.push(arr[i]);
        }else {
            right.push(arr[i]);
        }
    }
    return quickSort(left).concat([pivot],quickSort(right));
}

// // 5.不用借助临时变量，交换两个数
// function swap(a,b){
//     b = b-a;
//     a = a+b;
//     b = a-b;
//     return [a,b];
// }

// // 6.生成斐波那契数组
// function getFibonacci(n){
//     var fibarr = [];
//     for(var i=0;i<n;i++){
//         if (i<=1) {
//             fibarr.push(i);
//         }else {
//             fibarr.push(fibarr[i-1]+fibarr[i-2]);
//         }
//     }
//     return fibarr;
// }

// // 7. 找出正数组的最大差值
// function getMaxProfit(arr){
//     var min = max = arr[0],dur = 0;
//     for(let i=0;i<arr.length;i++){
//         min = Math.min(min,arr[i]);
//         max = Math.max(max,arr[i]);
//         dur = max - min;
//     }
//     return dur;
// }

// 8. 随机生成指定长度的字符串
function randomString(n){
    let str = "abcdefghigklmnopqrstuvwxyz0123456789";
    let outStr="",key;
    for(let i=0;i<n;i++){
        key = Math.floor(Math.random()*36);
        outStr = outStr.concat(str[key]);
    }
    return outStr;
}


document.querySelector(".box").innerHTML = randomString(12);
