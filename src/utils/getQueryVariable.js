// 普通获取 URL 参数
export const  getQueryVariable = (that, variable) => {
  let pathname = that.props.history.location.pathname;
  let query = that.props.history.location.search.substring(1);
  let vars = query.split("&");
  for (let i=0; i<vars.length; i++) {
    let pair = vars[i].split("=");
    if(pair[0] === variable){
      return {
        pathname,
        [variable]: pair[1]
      }
    }
  }
  return(false);
}

// 简洁获取 URL 参数
export const conciseGetQueryVariable = (that, variable) => {
  let q={};
  that.props.history.location.search.replace(/([^?&=]+)=([^&]+)/g,(_,k,v)=>q[k]=v);
  return q[variable];
}