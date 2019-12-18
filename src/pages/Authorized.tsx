import React from 'react';
import Redirect from 'umi/redirect';
import pathToRegexp from 'path-to-regexp';
import Authorized from '@/utils/Authorized';
import { ConnectProps, Route } from '@/models/connect';
import { CURRENT } from '@/components/Authorized/renderAuthorize';

// interface AuthComponentProps extends ConnectProps {
//   user: UserModelState;
// }

const getRouteAuthority = (path: string, routeData: Route[]) => {
  let authorities: string[] | string | undefined;
  routeData.forEach(route => {
    // 没有权限的子菜单会覆盖有权限的菜单？
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
  return authorities;
};

const AuthComponent: React.FC<ConnectProps> = ({
       children,
       route = {
         routes: [],
       },
       location = {
         pathname: '',
       },
     }) => {
  const { routes = [] } = route;
  console.log('CURRENT', CURRENT);
  // const isLogin = currentUser && currentUser.name;
  const routeAuthority = getRouteAuthority(location.pathname, routes) || '';
  console.log('routeAuthority', routeAuthority);
  return (
    <Authorized
      authority={getRouteAuthority(location.pathname, routes) || ''}
      // noMatch={isLogin ? <Redirect to="/exception/403"/> : <Redirect to="/user/login"/>}
      noMatch={CURRENT ? <Redirect to="/exception/403"/> : <Redirect to="/user/login"/>}
    >
      {children}
    </Authorized>
  );
};

export default AuthComponent;
//
// export default connect(({ user }: ConnectState) => ({
//   user,
// }))(AuthComponent);
