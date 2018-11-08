//找出字符串中出现最多的字母
function getMaxNumberOfChar(str) {
    return (str + '').split('').reduce(function(pre, cur, index, arr) {
        cur in pre ? pre[cur]++ : (pre[cur] = 1);
        pre[cur] > pre.value && (pre.char = cur, pre.value = pre[cur]);
        return pre;
    }, {value: 0});
}