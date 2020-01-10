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

let itemValue;
export const filterSubValue = (list, key, value) => {  
  /**
   * value 不为空时输出 json 数组
   * */ 
  list.forEach(item => {
    if(item[key] === value) {
      itemValue = item;
    }
    if(item.childrens && item.childrens?.length) {
      filterSubValue(item.childrens, key, value);
    }
  });
  return itemValue
}