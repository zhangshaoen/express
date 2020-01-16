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


export const filterSubValue = (list, key, value, result) => {  
  if (list.find(o => o[key] === value)) {
    return  list.find(o => o[key] === value);
  }else {
    for(let i = 0; i < list.length; i++) {
      if (list[i].hasOwnProperty('childrens') && list[i].childrens) {
        let result = filterSubValue(list[i].childrens, key, value);
        return result
      }
    }
  }
}