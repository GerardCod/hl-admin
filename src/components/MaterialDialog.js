import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';
import DropdownList from './DropdownList';
import { MaterialContext } from '../contexts/MaterialContext';
import { onError } from '../utils';
import PropTypes from 'prop-types';

const MaterialDialog = function Component({open, handleClose, addLinks}) {
  const {
    state,
    videosRef,
    audiosRef,
    booksRef,
    fetchVideos,
    fetchAudios,
    fetchBooks
  } = useContext(MaterialContext);
  const [links, setLinks] = useState({});

  useEffect(() => {
    fetchVideos({onError});
    const subscription = videosRef.current;

    return () => {
      subscription();
    }
  }, [fetchVideos, videosRef]);

  useEffect(() => {
    fetchAudios({onError});
    const subscription = audiosRef.current;

    return () => {
      subscription();
    }
  }, [fetchAudios, audiosRef]);

  useEffect(() => {
    fetchBooks({onError});
    const subscription = booksRef.current;

    return () => {
      subscription();
    }
  }, [fetchBooks, booksRef]);

  const updateLinks = link => {
    if (links[link.id]) {
      delete links[link.id]
      setLinks({...links});
    } else {
      setLinks({
        ...links,
        [link.id]: link,
      });
    }
  }

  const handleSubmit = () => {
    addLinks(links);
    handleClose();
  }

  return (
    <Fragment>
      <Dialog open={open}>
        <DialogTitle>Elige el/los enlace/s que requieras </DialogTitle>
        <DialogContent>
          <DropdownList title="Videos" onClickItem={updateLinks} items={state.videos} state={links} />
          <DropdownList title="Audios" onClickItem={updateLinks} items={state.audios} state={links} />
          <DropdownList title="Libros" onClickItem={updateLinks} items={state.books} state={links} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>Agregar enlaces</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

MaterialDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  addLinks: PropTypes.func.isRequired,
}

export default MaterialDialog;