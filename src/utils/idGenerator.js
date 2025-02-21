export const idGenerator = (function () {
  let counter = 0; 
  return {
    generateId: (prefix) => `${prefix}-${++counter}` 
    };
})();