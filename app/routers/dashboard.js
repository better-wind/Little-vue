module.exports = [
  [
    'GET',
    ['/dashboard', '/homepage'],
    'dashboard.DashboardController',
    [
      'setTitle',
      'getIndexHtml'
    ]
  ]
]
