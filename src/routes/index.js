import Home from '../components/Home'
import Brokers from '../components/brokers'
import Watchlist from '../components/watchlist'
import SinglePage from '../components/singlePage'
import Portfolio from '../components/portfolio'

const routes = [
    {   
        path: '/',
        alias:'/home',
        name:'home', 
        component: Home 
    },
    { 
        path: '/brokers', 
        name:'brokers',
        component: Brokers 
    },
    { 
        path: '/watchlist', 
        name:'watchlist',
        component: Watchlist 
    },
    { 
        path: '/:symbol/singlePage', 
        name:'singlePage',
        component: SinglePage 
    },
    { 
        path: '/portfolio', 
        name:'portfolio',
        component: Portfolio 
    },
  ]

export default routes;