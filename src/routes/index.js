

const routes = [
    {   
        path: '/home',
        name:'home', 
        component: () => import('../components/Home') 
    },
    { 
        path: '/brokers', 
        name:'brokers',
        component: () => import('../components/brokers') 
    },
    { 
        path: '/watchlist', 
        name:'watchlist',
        component: () => import('../components/watchlist') 
    },
  ]

export default routes;