import React, { useContext, useEffect } from 'react';
import { AvatarContext } from '../contexts/AvatarContext';
import { onError } from '../utils';
import Loader from './Loader';
import AvatarOption from './AvatarOption';

const AvatarSelector = ({ onChange }) => {
  const { fetchAvatars, state, listenerRef } = useContext(AvatarContext);

  useEffect(() => {
    fetchAvatars({ onError });
    const subscriber = listenerRef.current;

    return () => {
      subscriber();
    }
  }, [fetchAvatars, listenerRef]);

  return (
    <fieldset className="AvatarSelector">
      <legend>Elige un avatar</legend>
      <div className="flex AvatarSelector__Container">
        {
          state.loading ?
            <Loader text="Cargando los avatars" /> :
            (state.avatars && state.avatars.length > 0) ?
              state.avatars.map((avatar) => <AvatarOption {...avatar} onChange={onChange} key={`avatar-${avatar.id}`} />)
            : <div>No hay avatars</div>            
        }
      </div>
    </fieldset>
  );
}

export default AvatarSelector;

