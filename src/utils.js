import swal from "sweetalert";

export const collectIdAndData = (doc) => {
  const data = doc.data();
  return {id: doc.id, ...data};
}

//onceClosure returns a function that is executed once.
export const onceClosure = () => {
  let mustRun = true; 
  return (callback) => {
    if (mustRun) {
      if (typeof callback === 'function') {
        callback();
        mustRun = false;
      }
    }
  }
}

export const onSuccess = (text = 'Éxito en la respuesta', title = 'Bien hecho') => swal({title, text, icon: 'success' });
export const onError = (text = 'Error en la operación', title = 'Lo siento') => swal({title, text, icon: 'error'}); 

export const roles = [
  {
    name: 'Estudiante',
    slugName: 'E'
  },
  {
    name: 'Tutor',
    slugName: 'T'
  },
  {
    name: 'Docente',
    slugName: 'D'
  }
];