import React, { Fragment } from 'react';
import { ListItem, ListItemIcon, Checkbox, ListItemText } from '@material-ui/core';
import PropTypes from 'prop-types';

const LinkItem = function Component({item, checked, onChange}) {
  
  const handleClick = function onClick() {
    onChange(item);
  }

  return (
    <Fragment>
      <ListItem dense button onClick={handleClick}>
        <ListItemIcon>
          <Checkbox 
            edge="start"
            checked={checked}
            disableRipple
          />
        </ListItemIcon>
        <ListItemText primary={item.title} />
      </ListItem>
    </Fragment>
  );
}

LinkItem.propTypes = {
  item: PropTypes.object.isRequired,
  checkeed: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default LinkItem;