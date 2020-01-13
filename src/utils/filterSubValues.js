// 寻找 JSON 数组子级属性值
let values = [];
export const filterSubValues = (list, reg, regText, label, value) => {
  /**
   * value 不为空时输出 json 数组
   * */ 
  list.forEach(item => {
    if(new RegExp(reg).test(item[regText])) {
      if(value) {
        values.push({
          key: item[label],
          value: item[value]
        });
      }else {
        values.push(item[label]);
      }
    }
    if(item.childrens && item.childrens?.length) {
      filterSubValues(item.childrens, reg, regText, label, value);
    }
  });
  return values
}

let result = null;
export const filterSubValue = (list, key, value) => {  
  if (list.find(o => o[key] === value)) {
    result = list.find(o => o[key] === value);
    return result
  }else {
    list.forEach(o => {
      if (o.hasOwnProperty('childrens') && o.childrens) {
        filterSubValue(o.childrens, key, value)
      }
    })
  }
}