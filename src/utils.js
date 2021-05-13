export const collectIdAndData = (doc) => {
  const data = doc.data();
  return {id: doc.id, ...data};
}