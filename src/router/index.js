const router = [
  {
    title: '控制台',
    path: '/index',
    icon: 'DashboardOutlined',
  },
  {
    title: '用户管理',
    path: '/index/user',
    icon: 'UserOutlined',
    child: [
      { title: '用户列表', path: '/index/user/list', icon: '' },
      { title: '添加用户', path: '/index/user/add', icon: '' },
    ],
  },
  {
    title: '部门管理',
    icon: 'TeamOutlined',
    path: '/index/department',
    child: [
      { path: '/index/department/list', title: '部门列表', icon: '' },
      { path: '/index/department/add', title: '添加部门', icon: '' },
    ],
  },
];

export default router;
