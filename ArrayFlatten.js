//�����չ��/��ƽ
//[1,2,[2,3,[4,5]]]--->[1,2,2,3,4,5]

function flatten(arr) {
    if(!isArray(arr) || !arr.length) {
        return [];
    } else {
        return Array.prototype.concat.apply([], arr.map(function(val) {
            return isArray(val) ? flatten(val) : val;
        }));
    }

    function isArray(arr) {
        return Object.prototype.toString.call(arr).slice(8, -1).toLowerCase() === 'array';
    }
}