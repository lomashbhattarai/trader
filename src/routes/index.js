import Home from '../components/Home'
import Brokers from '../components/brokers'
import Watchlist from '../components/watchlist'
import SinglePage from '../components/singlePage'

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
        path: '/:id/singlePage', 
        name:'singlePage',
        component: SinglePage 
    },
  ]

export default routes;