import React, { Fragment } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import background from '../assets/background.png';
import kidOne from '../assets/1.png';
import kidTwo from '../assets/2.png';
import teacher from '../assets/3.png';

const HomePage = function Component() {
  return (
    <Fragment>
      <Navbar />
      <figure className="Hero">
        <img src={background} alt="home_background" />
        <article className="Hero__Content"></article>
        <article className="Hero__Message flex flex--column f-justify--center">
          <p>Bienvenido</p>
          <p>a HL</p>
        </article>
      </figure>
      <main className="Home__Content">
        <section className="Home__Section flex flex--column f-align--center">
          <article className="flex flex--column Home__Paragraph">
            <h3 className="Home__Title">¿Qué es Homegrown Learning - Aprendizaje de cosecha propia?</h3>
            <p className="Home__Text">Esta es tu plataforma para aprender de una forma diferente.</p>
            <p className="Home__Text">Está dirigida a ti alumno de segundo grado de primaria, siéntete como si estuvieras en un aula, no olvides que puedes contactarme para cualquier duda que se te presente, mi información de contacto esta en la parte inferior de esta página.</p>
          </article>
          <figure className="Home__Img">
            <img src={kidOne} alt="kid_one" />
          </figure>
          <article>
            <p className="Home__Text">Recuerda que tenemos que ser constantes en la práctica de la comprensión lectora, para poder ser grandes profesionales.</p>
            <p className="Home__Text">¡Tú puedes!  No olvides que aquí esta prohibido decir no puedo.</p>
            <p className="Home__Text">Para concluir te invito a aprovechar todo el material de lectura que se encuentra en el apartado de “material de clase” en donde encontrarás desde diferentes lecturas, como videos y audiost interesantes, diviértete</p>
          </article>
          <p className="Home__Text">LIE. Katia Rodriguez</p>
        </section>
        <section className="Home__Section flex flex--column f-align--center">
          <figure className="Home__Img">
            <img src={teacher} alt="teacher_illustration" />
          </figure>
          <article>
            <h3 className="Home__Title">Objetivo</h3>
            <p className="Home__Text">Reafirmar y estimular en el alumno la comprensión lectora por medio de la implementación de la plataforma E-Learning Homegrown Learning-aprendizaje de cosecha propia, haciendo uso de las Tecnologías de la Información y la Comunicación.</p>
          </article>
        </section>
        <section className="Home__Section flex flex--column f-align--center">
          <article>
            <h3 className="Home__Title">Propósito</h3>
            <p className="Home__Text">Consolidar la comprensión lectora vigente en alumnos de 6 a 8 años a través de una plataforma E-Learning que integre la comprensión lectora con la adquisición de conocimientos en el trato de diversos temas, la cual está diseñada para el uso didáctico y como herramienta tecnológica para un Modelo Educativo Híbrido de niños de 6 a 8 años.</p>
          </article>
          <figure className="Home__Img">
            <img src={kidTwo} alt="kid_two" />
          </figure>
        </section>
      </main>
      <Footer />
    </Fragment>
  );
}

export default HomePage;