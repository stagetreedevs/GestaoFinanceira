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
  add = (newClient: any) => {
    return addDoc(collection(db, "clientes"), newClient);
  };

  update = (id: string, updatedBook: any) => {
    const Doc = doc(db, "clientes", id);
    return updateDoc(Doc, updatedBook);
  };

  delete= (id: string) => {
    const Doc = doc(db, "clientes", id);
    return deleteDoc(Doc);
  };

  getAll = () => {
    return getDocs(collection(db, "clientes"));
  };

  getData= (id: string) => {
    const Doc = doc(db, "clientes", id);
    return getDoc(Doc);
  };
}

export default new DataService();