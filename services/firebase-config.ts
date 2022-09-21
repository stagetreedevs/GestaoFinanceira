import { db } from "./firebase"
import {
collection,
getDocs,
getDoc,
addDoc,
updateDoc,
deleteDoc,
doc,
} from "firebase/firestore";

class DataService {
  add = (newClient: any, ref:string) => {
    return addDoc(collection(db, ref), newClient);
  };

  update = (updatedItem: any, ref:string, id: string) => {
    const Doc = doc(db, ref, id);
    return updateDoc(Doc, updatedItem);
  };

  delete= (id: string, ref:string) => {
    const Doc = doc(db, ref, id);
    return deleteDoc(Doc);
  };

  getAll = (ref:string) => {
    return getDocs(collection(db, ref));
  };

  getData= (id: string, ref:string) => {
    const Doc = doc(db, ref, id);
    return getDoc(Doc);
  };
}

export default new DataService();