import React, {Fragment, useState} from 'react';
import { v4 as uuidv4 } from 'uuid';


const Formulario = ({crearCita}) => { //<---- props

    //crear State de citas
    const [cita, actualizarCita] = useState({
        mascota:'',
        propietario:'',
        fecha:'',
        hora:'',
        sintomas:''
    });
    // State error obligacion de rellenar todos los campos 
    const[error, actualizarError] = useState(false);


    //funcion que se ejecuta cada vez que el usuario escribe en un input
    const actualizarState = e =>{ //<--- la e de evento que es el onChange
        
        // console.log(e.target.value);//<--- para obtener el valor de lo que escribe el usuario
        actualizarCita({
            ...cita, //<-----res operate "los puntos ..." para crear una copia del state asi no se sobrescribe con los campos diferenes
            [e.target.name]: e.target.value//<--con [e.target.name] accedemos a la propiedad del obj
                                            //<--- con : e.target.value vemos el valor de lo que escribe el usuario
        })
    }

    //Extraer los valores 
    //distrocturing
    const { mascota, propietario, fecha, hora, sintomas } = cita; //<--- le ponemos con el value en cada campo del form

    //cuando el usuario presione agregar cita o enviar formulario
    const submitCita = e =>{
        e.preventDefault();

        // Validar
        if(mascota.trim() === '' || propietario.trim() === '' ||  fecha.trim() === '' || 
            hora.trim() === '' || sintomas.trim() === ''){ //<-- .trim quita espacios ambos sentidos 
            actualizarError(true)
            return;
        }
        
        //Eliminar el mensaje previo de error
        actualizarError(false);

        //asignar un ID
        cita.id = uuidv4();
     
        //crear la cita 
        crearCita(cita);

        //reiniciar el form
        actualizarCita({
            mascota:'',
            propietario:'',
            fecha:'',
            hora:'',
            sintomas:''
        });
    };

    return ( 
       <Fragment>
           <h2>Crear Cita</h2>
            
         
            {error ? <p className="alerta-error">Todos los campos son obligatorios</p>  
            : null }

           <form
           onSubmit={submitCita}//<--- sera una funcion para enviar los datos 
           >
               <label>Nombre Mascota</label>
               <input 
                        type="text"
                        name="mascota"
                        className="u-full-widht"
                        placeholder="Nombre Mascota"
                        onChange={actualizarState} //<---declaramos la fucion en el input que se actualiza cada vez que escribe el usuario
                        //onChange es el evento para react
                        value={mascota} //<---- para extraer la info del usuario
               />
    
                <label>Nombre Dueño</label>
                    <input 
                        type="text"
                        name="propietario"
                        className="u-full-widht"
                        placeholder="Nombre Dueño de la mascota"
                        onChange={actualizarState}
                        value={propietario}
                    />

                <label>Fecha</label>
                    <input 
                        type="date"
                        name="fecha"
                        className="u-full-widht"
                        onChange={actualizarState}
                        value={fecha}
                    />
                
                <label>Hora</label>
                    <input 
                        type="time"
                        name="hora"
                        className="u-full-widht"
                        onChange={actualizarState}
                        value={hora}
                    />

                <label>Sintomas</label>
                    <textarea
                    className="u-full-width"
                    name="sintomas"
                    onChange={actualizarState}
                    value={sintomas}
                    ></textarea>

                    <button
                    type="submit"
                    className="u-full-width button-primary"
                    onChange={actualizarState}
                    >Agregar Cita</button>
            </form>
       </Fragment>
     );
}
 
export default Formulario;