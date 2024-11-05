import {Router} from '@vaadin/router';

export const initRouter = (app) => {
  const router = new Router(app);

  router.setRoutes([
    {
      path: '/',
      component: 'v-layout',
      children: [
        {path: '/', component: 'v-employee-list'},
        {path: '/add', component: 'v-employee-form'},
        {path: '/employees', component: 'v-employee-list'},
        {path: '/edit/:id', component: 'v-employee-form'},
      ],
    },
  ]);
};
