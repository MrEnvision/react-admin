// 建立上下文件关系
const files = require.context('./../views/', true, /\.js$/); // 第一个参数：目录; 第二参数：是否查找子级目录; 第三参数：指定查找到文件
const Components = [];
files.keys().map((key) => {
  if (key.includes('./home/') || key.includes('./login/')) {
    return false;
  }
  // path
  const path = `/index${key.split('.')[1].toLowerCase()}`;
  // component
  const component = files(key).default;
  // 写入对象
  Components.push({
    path,
    component,
  });
  return true;
});

export default Components;
