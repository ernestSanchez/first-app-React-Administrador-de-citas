import React, {Fragment, useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import Cita from './components/Cita';

function App() {
  

  //Citas en local storage <--- mini base de datos del navegador 
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if(!citasIniciales) {
    citasIniciales = [];
  }

  //Array de citas
  const [citas, guardarCitas] = useState([]);

  // Use effect para realizar operaciones cuando el State cambia
  useEffect( () => {
    let citasIniciales = JSON.parse(localStorage.getItem('citas'));
    
    if(citasIniciales){
      localStorage.setItem('citas',JSON.stringify(citas))
    }else{
      localStorage.setItem('citas'.JSON.stringify([]));
    }
  }, [citas] );//<---- le pasamos un array vacio para que solo se ejecute una vez se conoce como dependencias 
          // ejemplo le ponemos citas y cada vez que el State de citas cambien se volvera a ejecutar el useEffect

  //funcion que tome las citas actuales y agregue la nueva 
  const crearCita = cita => {
      guardarCitas([ ...citas, cita]);
  }
  
  //funcion que elimina una cita por id
  const eliminarCita = id => {
    const nuevasCitas = citas.filter(cita => cita.id !== id ); //<--- .filter reitera sobre todas las citas como .map o foreach
    guardarCitas(nuevasCitas);
  }

  //mensaje condicional 
  const titulo = citas.length === 0 ? 'No hay citas' : 'Administra tus Citas';

  // console.log(citas.length);

  return (
<Fragment>
  <h1>Administrador de Pacientes</h1>

    <div className="container">
      <div className="row">
          <div className="one-half column">
              <Formulario 
              crearCita={crearCita}
              />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            {citas.map(cita =>(
              <Cita 
              key={cita.id}
              cita={cita}
              eliminarCita={eliminarCita}
              />
            ))}
          </div>    
      </div>
    </div>
</Fragment>
  );
}

export default App;
