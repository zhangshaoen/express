/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
// 寻找 JSON 数组所有父级某一指定属性值
const init = (item, key) => {
  for (let i = 0; i < item.length; i++) {
    item[i][`parent-${key}`] = [];
    item[i][`parent-${key}`].push(item[i][key]);
    if (item[i].childrens?.length) {
      let oChild = item[i].childrens;
      init(oChild, key);
    }
  } 
  return item;
}

export const addProperty = (item, key) => {  
  for (let i = 0; i < item.length; i++) {
    let parent = item[i][`parent-${key}`];
    if (item[i].childrens?.length) {
      let oChild = item[i].childrens;      
      for (let j = 0; j < oChild.length; j++) {
        if(oChild[j][`parent-${key}`]?.length) {
          oChild[j][`parent-${key}`] = parent.concat(oChild[j][`parent-${key}`]);
        }        
      }
      addProperty(oChild, key);
    }
  }
  return item;
}

export const getProperty = (list, key) => {
  let initList = init(list, key);
  return addProperty(initList, key);

}





