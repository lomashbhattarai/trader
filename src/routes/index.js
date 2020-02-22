import Home from '../components/Home'
import Brokers from '../components/brokers'
import Watchlist from '../components/watchlist'

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
  ]

export default routes;