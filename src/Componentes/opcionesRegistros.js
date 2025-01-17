import { doc, deleteDoc, collection, setDoc, updateDoc } from "firebase/firestore";
import { useLocation } from 'react-router-dom';

// Funciones para editar, eliminar y agregar registros

export function editar(bd, ubicacion, id, resultMap) {
    console.log("entró?");
    
    const documento = doc(bd, ubicacion, id);

    const updatedFields = {};
    Object.keys(resultMap).forEach(key => {
        updatedFields[key] = resultMap[key];
    });

    // updateDoc(documento, updatedFields)
    // .then(() => {
    //     alert('Información actualizada');
    //     // location.reload();
    // })
    // .catch((error) => {
    //     console.error(error);
    // });
}

export function eliminar(bd, ubicacion, id) {
    const documento = doc(bd, ubicacion, id);
    if (confirm("¿Eliminar registro?") == true) {
        deleteDoc(documento)
        .then(() => {
            location.reload();
        })
        .catch((error) => {
            console.error(error);
        });
    }
}

export function agregar(resultMap, bd, ubicacion){
    try{
        /*
        - aquí el truco está en "bd, UBICACION", donde
        ubicación es la ruta que le da el nombre de 
        la colección, para así no generar un .jsx para
        cada sección.
        - Además, el id lo obtenemos de la base para actualizar el mismo registro
        */
        const documento = doc(collection(bd, ubicacion));
            setDoc(documento, resultMap
            ).then(() => {
                alert('Información actualizada')
                // navigate(-1);
            }).catch((error) => {
                console.error(error);
            });
    }catch (error) {
        console.error(error);
    }
}
