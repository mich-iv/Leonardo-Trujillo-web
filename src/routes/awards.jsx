import React, { useEffect, useState } from 'react'
import '../estilos/Paginas.css';
import { Employees } from "../bd/datos.json";
import { useLoaderData } from 'react-router-dom';

export default function Route(){
    return(
        <div>
            <div>
                    <h1 className='titulos'>
                        Awards
                    </h1>

                    

                    {/* {Employees.map((data, key) => {
                        return <h2 key={key}>{data.preferredFullName}</h2>;
                    })
                    } */}
                    <div  className='texto'>
                        <p>Nombre: {Employees[0].preferredFullName}</p>
                        <p>Correo: {Employees[0].emailAddress}</p>
                        <p>Telefono: {Employees[0].phoneNumber}</p>
                        <p>Texto: {Employees[0].texto}</p>

                        <br/>

                        <p>Nombre: {Employees[1].preferredFullName}</p>
                        <p>Correo: {Employees[1].emailAddress}</p>
                        <p>Telefono: {Employees[1].phoneNumber}</p>
                        <p>Texto: {Employees[1].texto}</p>
                    </div>
                    
            </div>
        </div>
    )
}