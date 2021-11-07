import  { db } from "../config";

const deleteDocument = (collection, id) => {
  const query = db.collection(collection);
  query.doc(id).delete();
};
export default deleteDocument;
