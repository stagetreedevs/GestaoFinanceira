import { db } from "./firebase";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  onSnapshot,
} from "firebase/firestore";

class DataService {
  add = (newClient: any, ref: string) => {
    return addDoc(collection(db, ref), newClient);
  };

  update = (updatedItem: any, ref: string, id: string) => {
    const Doc = doc(db, ref, id);
    return updateDoc(Doc, updatedItem);
  };

  delete = (id: string, ref: string) => {
    const Doc = doc(db, ref, id);
    return deleteDoc(Doc);
  };

  getAll = (ref: string) => {
    return getDocs(collection(db, ref));
  };

  getData = (id: string, ref: string) => {
    const Doc = doc(db, ref, id);
    return getDoc(Doc);
  };

  UpClient = (ref: string, doc: any, ids:any) => {
    const Doc = collection(db, ref);
    let a: any
    const snapshot = query(Doc);
    const obs = (subs: any) => {
      const unsubs = onSnapshot(
        snapshot,
        (querySnapshot) => {
          ids.map((id:any) => {
            if (id)
            querySnapshot.docs.forEach((document) => {
              
              if (document.data().nome === doc.nome) {
                  console.log(id)
                  updateDoc(document.ref, doc);
                }
              })
            });
        },
        (error: Error) => {
          subs.error(error);
        }
      );
    
    };
    return obs;
  };
  delClient = (ref: string, doc: any, ids:any) => {
    const Doc = collection(db, ref);
    let a: any
    const snapshot = query(Doc);
    const obs = (subs: any) => {
      const unsubs = onSnapshot(
        snapshot,
        (querySnapshot) => {
          ids.map((id:any) => {
            if (id)
            querySnapshot.docs.forEach((document) => {
              
              if (document.data().nome === doc.nome) {
                  console.log(id)
                  deleteDoc(document.ref);
                }
              })
            });
        },
        (error: Error) => {
          subs.error(error);
        }
      );
    
    };
    return obs;
  };
}
export default new DataService();
