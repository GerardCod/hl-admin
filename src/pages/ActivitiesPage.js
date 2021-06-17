import React, { Fragment } from 'react';
import Illustration from '../components/Illustration';
import img from '../assets/activities.png';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const ActivitiesPage = () => {
  return (
    <Fragment>
      <header className="flex VideosHeader">
        <h1>Actividades</h1>
        <Link to="/admin/activities/create" className="Button Button--Icon Button--Add Button--Success">
          <FontAwesomeIcon icon={faPlus} />
          <span>Agregar actividad</span>
        </Link>
      </header>
      <Illustration illustration={img} message="No hay actividades en la plataforma" />
    </Fragment>
  );
}

export default ActivitiesPage;