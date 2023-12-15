(function($, $Object, $Function, $Array) {'use strict'; return (function() {
  const handler = {
    get: (target, property, receiver) => {
      if (typeof target[property] === 'function' &&
          (property === 'request' || property === 'isConnected' ||
           property === 'enable' || property === 'sendAsync' ||
           property === 'send')) {
        return new Proxy(target[property], {
          apply: (targetFunc, thisArg, args) => {
            return targetFunc.call(target, ...args);
          }
        });
      }
      return target[property];
    }
  };
  return handler;
})()
;})