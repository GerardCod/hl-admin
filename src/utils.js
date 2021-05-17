
export const collectIdAndData = (doc) => {
  const data = doc.data();
  return {id: doc.id, ...data};
}

//onceClosure returns a function that is executed once.
export const onceClosure = () => {
  let mustRun = true; 
  return (callback) => {
    if (mustRun) {
      if (typeof callback === 'function') {
        callback();
        mustRun = false;
      }
    }
  }
}