import { doc, deleteDoc, collection, setDoc } from "firebase/firestore";

// Funciones para editar, eliminar y agregar registros

export function editar(resultMap) {
    const updatedFields = {};
    Object.keys(resultMap).forEach(key => {
        updatedFields[key] = resultMap[key];
    });
}

export function eliminar(bd, ubicacion, id) {
    const documento = doc(bd, ubicacion, id);
    if (confirm("Delete information?") == true) {
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
            setDoc(documento, resultMap)
            .then(() => {
                alert('Updated information')
                location.reload();
            }).catch((error) => {
                console.error(error);
            });
    }catch (error) {
        console.error(error);
    }
}
