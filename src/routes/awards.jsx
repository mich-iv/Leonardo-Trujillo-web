import '../estilos/Paginas.css';
import datos from '../bd/datos.json';
import { Employees } from "../bd/datos.json";

export default function Route(){
    
    return(
        <div>
            <div className='cuerpo'>
                    <h1 >
                        Awards
                    </h1>
                    {/* {Employees.map((data, key) => {
                        return <h2 key={key}>{data.preferredFullName}</h2>;
                    })
                    } */}
                    <h2>Nombre: {Employees[0].preferredFullName}</h2>
                    <h2>Correo: {Employees[0].emailAddress}</h2>
                    <h2>Telefono: {Employees[0].phoneNumber}</h2>
                    <h2>Texto: {Employees[0].texto}</h2>

                    <br/>

                    <h2>Nombre: {Employees[1].preferredFullName}</h2>
                    <h2>Correo: {Employees[1].emailAddress}</h2>
                    <h2>Telefono: {Employees[1].phoneNumber}</h2>
                    <h2>Texto: {Employees[1].texto}</h2>
            </div>
        </div>
    )
}