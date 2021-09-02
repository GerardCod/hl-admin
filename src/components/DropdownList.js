import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import PropTypes from 'prop-types';
import LinkItem from './LinkItem';
import Loader from '../components/Loader';
import { ExpandMore } from '@material-ui/icons';

const DropdownList = function Component({ title, items, onClickItem, state }) {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMore />}
      >
        <h4>{title}</h4>
      </AccordionSummary>
      <AccordionDetails>
        <div className="flex flex--column">
          {
            (items && items.length > 0) ?
              <div>
                {
                  items.map(item => <LinkItem key={`material-id: ${item.id}`} item={item} onChange={onClickItem} checked={state[item.id]} />)
                }
              </div> :
              (items && items.length === 0) ?
              <span>No hay materiales de este tipo en la plataforma</span> :
              <Loader text="Cargando materiales" />
          }
        </div>
      </AccordionDetails>
    </Accordion>
  );
}

DropdownList.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
}

export default DropdownList;