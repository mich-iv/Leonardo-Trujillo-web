import React from 'react';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { bd } from '../../firebase.jsx'; // Asegúrate de importar correctamente tu configuración de Firebase

const OpcionesRegistros = ({ id, ubicacion, datos, setDatos }) => {

  const handleEdit = () => {
    const data = datos.find(d => d.id === id);
    if (data) {
      // Aquí puedes establecer los valores en los campos de entrada para editar
      document.getElementById("id").value = id;
      document.getElementById("nombreAlumno").value = data.nombreAlumno;
      document.getElementById("gradoAlumno").value = data.gradoAlumno;
      document.getElementById("fechaInicioAlumno").value = data.fechaInicioAlumno;
      document.getElementById("fechaGraduacionAlumno").value = data.fechaGraduacionAlumno;
      document.getElementById("tituloTesisAlumno").value = data.tituloTesisAlumno;
      document.getElementById("programaAlumno").value = data.programaAlumno;
      document.getElementById("institucionAlumno").value = data.institucionAlumno;
      document.getElementById("banderaOpcion").value = "editar";
    }
  };

  const handleDelete = async () => {
    //confirmacion de eliminacion
    if (confirm("Delete information?")) {
      try {
        const documento = doc(bd, ubicacion, id);
        await deleteDoc(documento);
        alert('Registro eliminado');
        // Actualizar el estado de los datos después de eliminar
        setDatos(prevDatos => prevDatos.filter(d => d.id !== id));
      } catch (error) {
        console.error("Error al eliminar el registro:", error);
      }
    }
  };

  return (
    <div>
      <button className="botonEditar" onClick={handleEdit}>Editar</button>
      <button className="botonEliminar" onClick={handleDelete}>Eliminar</button>
    </div>
  );
};

export default OpcionesRegistros;