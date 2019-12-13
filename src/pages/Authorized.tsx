import React from 'react';
import Redirect from 'umi/redirect';
import { connect } from 'dva';
import pathToRegexp from 'path-to-regexp';
import Authorized from '@/utils/Authorized';
import { ConnectProps, ConnectState, Route, UserModelState } from '@/models/connect';

interface AuthComponentProps extends ConnectProps {
  user: UserModelState;
}

const getRouteAuthority = (path: string, routeData: Route[]) => {
  let authorities: string[] | string | undefined;
  routeData.forEach(route => {
    // if (route.authority) {
    //   authorities = route.authority;
    // }
    // match prefix
    if (pathToRegexp(`${route.path}(.*)`).test(path)) {
      // exact match
      // if (route.path === path) {
      authorities = route.authority || authorities;
      // }
      // get children authority recursively
      if (route.routes) {
        authorities = getRouteAuthority(path, route.routes) || authorities;
      }
    }
  });
  console.log('当前路由authorities', authorities);
  return authorities;
};
let hasCurrentRoute: boolean = false;
// 是否有当前页面
const isHasCurrentRoute = (path: string, routes: Route[] | []) => {
  // @ts-ignore
  // eslint-disable-next-line consistent-return
  routes.forEach(route => {
    if (path === route.path) {
      hasCurrentRoute = true;
      // return true;
    }
    if (route.children) {
      isHasCurrentRoute(path, route.children);
    }
  });
  // return false;
};

const AuthComponent: React.FC<AuthComponentProps> = ({
     children,
     route = {
       routes: [],
     },
     location = {
       pathname: '',
     },
     user,
   }) => {
  console.log('children', children);
  console.log('route', route);
  console.log('location', location);
  const { currentUser } = user;
  const { routes = [] } = route;
  const isLogin = currentUser && currentUser.name;
  let redirect403Or404;
  isHasCurrentRoute(location.pathname, routes);
  console.log('有当前页面', hasCurrentRoute);
  if (hasCurrentRoute) {
    redirect403Or404 = <Redirect to="/exception/403"/>
  } else {
    redirect403Or404 = <Redirect to="/exception/404"/>
  }
  return (
    <Authorized
      authority={getRouteAuthority(location.pathname, routes) || ''}
      noMatch={isLogin ? redirect403Or404 : <Redirect to="/user/login"/>}
    >
      {children}
    </Authorized>
  );
};

export default connect(({ user }: ConnectState) => ({
  user,
}))(AuthComponent);
