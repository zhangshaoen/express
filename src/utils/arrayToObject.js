// 简单数组转对象
export const simpleArrayToObject = array => {
  let object = {};
  array.forEach((item, index) => {
    object[index] = item
  });
  return object
}