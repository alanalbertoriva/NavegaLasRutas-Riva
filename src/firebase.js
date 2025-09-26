// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
 import { getFirestore } from 'firebase/firestore';
 import { collection, getDocs, updateDoc, doc, getDoc } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyARq6gQRMuB33SGBYp0rurs3QFmcaOwlYo",
  authDomain: "winebar-ecommerce.firebaseapp.com",
  projectId: "winebar-ecommerce",
  storageBucket: "winebar-ecommerce.firebasestorage.app",
  messagingSenderId: "86727077827",
  appId: "1:86727077827:web:f18aadb6a2c7699ef69776"
};

const nombreColeccion = 'producto';

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Obtiene y exporta la instancia de Firestore
export const db = getFirestore(app);

export const productosCollection = collection(db, nombreColeccion);

// Ejemplo de función para obtener documentos de la colección
export const fetchProductos = async () => {
  const querySnapshot = await getDocs(productosCollection);
  return querySnapshot.docs.map(doc => ({ id_producto: doc.id, ...doc.data() }));
};

export const updateProducto = async (id, nuevosDatos) => {
    const docRef = doc(db, nombreColeccion, id);
    try {
      await updateDoc(docRef, nuevosDatos);
      console.log('Precio actualizado.');
    } catch (error) {
      console.error('Error al actualizar:', error);
    }
};

export const fetchProductoPorId = async (id) => {
    const docRef = doc(db, nombreColeccion, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return { id_producto: docSnap.id, ...docSnap.data() };
    } else {
        console.log("No se encontro el producto..");
        return null;
    }
};