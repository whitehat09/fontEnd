import { db } from "../config";

const updateDocument = (collection, id, data) => {
  const query = db.collection(collection);
  query.doc(id).update(data);
};
export default updateDocument;
