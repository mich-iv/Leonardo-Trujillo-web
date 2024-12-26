import { doc, deleteDoc, collection, setDoc } from "firebase/firestore";

//
export function eliminar(bd, ubicacion, id) {
    const documento = doc(bd, ubicacion, id);
    if (confirm("¿Eliminar registro?") == true) {
        deleteDoc(documento)
        .then(() => {
            location.reload();
        })
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