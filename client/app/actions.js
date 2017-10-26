import config from './config';

function assembleUrl(path, params, method) {
  path = path || '';
  params = params || {};
  method = method ? method.toLowerCase() : 'get';
  Object.keys(params).forEach(function(key) {
    let _path = path.replace(`:${key}`, params[key]);
    if (_path === path) {
      if (method === 'get') {
        if (_path.indexOf('?') === -1) {
          _path = `${_path}?${key}=${params[key]}`;
        } else {
          _path = `${_path}&${key}=${params[key]}`;
        }
        delete params[key];
      }
    } else {
      delete params[key];
    }
    path = _path;
  });
  return path;
}

export const REQUEST_POSTS = 'REQUEST_POSTS';

export function requestPosts() {
  return {
    type: REQUEST_POSTS
  };
};

export const RECEIVE_POSTS = 'RECEIVE_POSTS';

export function receivePosts(posts) {
  return {
    type: RECEIVE_POSTS,
    posts
  };
};

export function fetchPosts(query) {
  let path = assembleUrl(config.posts, query);
  return function(dispatch) {
    dispatch(requestPosts());
    return fetch(path).then(res => res.json()).then(posts => {
      dispatch(receivePosts(posts));
    });
  };
};

export const REQUEST_PROFILES = 'REQUEST_PROFILES';

export function requestProfiles() {
  return {
    type: REQUEST_PROFILES
  };
};

export const RECEIVE_PROFILES = 'RECEIVE_PROFILES';

export function receiveProfiles(profiles) {
  return {
    type: RECEIVE_PROFILES,
    profiles
  };
};

export function fetchProfiles() {
  return function(dispatch) {
    dispatch(requestProfiles());
    return fetch(config.profiles).then(res => res.json()).then(profiles => {
      dispatch(receiveProfiles(profiles));
    });
  };
};