routes = [
    {
        path: '/',
        url: './index.html',
    },
    {
        path: '/add-tree/',
        componentUrl: './pages/add-tree.html',
    },
    {
        path: '/view-tree/',
        componentUrl: './pages/view-tree.html',
    },

    // Default route (404 page). MUST BE THE LAST
    {
        path: '(.*)',
        url: './pages/404.html',
    },
];
