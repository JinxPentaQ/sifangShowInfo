import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const routes = [
  {
    path: '/',
    redirect: '/render'
  },
  {
    name: 'bank',
    component: () => import('./view/bank'),
    meta: {
      title: '银行卡付款'
    }
  },
  {
    name: 'qrali',
    component: () => import('./view/qrali'),
    meta: {
      title: '扫码支付'
    }
  },
  {
    name: 'qrwechat',
    component: () => import('./view/qrwechat'),
    meta: {
      title: '扫码支付'
    }
  },
  {
    name: 'wechat',
    component: () => import('./view/wechat'),
    meta: {
      title: '微信转手机号码支付'
    }
  },
  {
    name: 'render',
    component: () => import('./view/render'),
    meta: {
      title: '跳转...'
    }
  },
  {
    name: 'end',
    component: () => import('./view/end'),
    meta: {
      title: '结束'
    }
  },
  {
    name: 'btc',
    component: () => import('./view/btc'),
    meta: {
      title: 'btc'
    }
  },
  {
    name: 'usdt',
    component: () => import('./view/usdt'),
    meta: {
      title: 'usdt'
    }
  },
  {
    name: 'register',
    component: () => import('./view/register'),
    meta: {
      title: '注册'
    }
  },
  {
    name: 'index',
    component: () => import('./view/index'),
    meta: {
      title: '注册'
    }
  },
  {
    name: 'welcome',
    component: () => import('./view/banner'),
    meta: {
      title: 'welcome'
    }
  },
];

// add route path
routes.forEach(route => {
  route.path = route.path || '/' + (route.name || '');
  // route.path = "/render"
});

const router = new Router({ routes });

router.beforeEach((to, from, next) => {
  const title = to.meta && to.meta.title;
  if (title) {
    document.title = title;
  }
  next();
});

export {
  router
};
