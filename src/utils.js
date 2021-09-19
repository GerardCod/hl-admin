import swal from "sweetalert";
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));


export const collectIdAndData = (doc) => {
  const data = doc.data();
  return {id: doc.id, ...data};
}

export const addLinkToDocumentData = (doc, type = 'videos') => {
  const data = collectIdAndData(doc);
  data.link = `/platform/${type}/${data.id}`;
  return data;
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
  },
  {
    name: 'Administrador',
    slugName: 'A'
  }
];

export const userRoles = [
  {
    name: 'Estudiante',
    slugName: 'E'
  },
  {
    name: 'Docente',
    slugName: 'D'
  },
  {
    name: 'Administrador',
    slugName: 'A'
  }
];

export const assessmentTypes = [
  {
    name: 'Elige un tipo de evaluación',
    value: '',
  },
  {
    name: 'Enlace',
    value: 'enlace'
  },
  {
    name: 'Quiz',
    value: 'quiz'
  },
]

export const createComment = (comment, user) => {
  const today = new Date();
  comment = comment.trim();
  return {
    user: {
      name: user.name,
      avatar: user.avatar,
      email: user.email,
    },
    comment,
    postDate: today.toLocaleDateString('es-MX'),
    postTime: today.toLocaleTimeString('es-MX')
  }
}

export const questionInitialState = {
  question: '',
  answers: [
    {
      id: Date.now(),
      answer: '',
    }
  ],
  correctAnswer: null,
}

export const assessmentInitialState = {
  title: '',
  instructions: '',
  type: '',
  link: '',
  questions: [
    {
      id: Date.now(),
      question: '',
      answers: [
        {
          id: Date.now(),
          answer: '',
        }
      ],
      correctAnswer: null 
    },
  ],
}

export const addPostDateAndTime = function addingDateTime(data) {
  const today = new Date();
  data.postDate = today.toLocaleDateString('es-MX');
  data.postTime = today.toLocaleTimeString('es-MX');
  return data;
}