import React from 'react';
import { Button, IconButton } from '@material-ui/core';

import { ExtraItem } from '../ExtraItem';

const ExtrasList = ({
  fields,
  btnContent,
  useIconBtn,
  addBtnClassName,
  canSetTargetSize,
  sizesOptions,
}) => {
  let ButtonComponent = Button;

  if (useIconBtn) {
    ButtonComponent = IconButton;
  }

  return (
    <>
      {fields.map((field, index) => (
        <ExtraItem
          onRemoveClick={() => fields.remove(index)}
          key={index}
          field={field}
          sizesOptions={sizesOptions}
          canSetTargetSize={canSetTargetSize}
        />
      ))}
      <ButtonComponent
        className={addBtnClassName}
        onClick={() => fields.push({})}
        color="primary">
        {btnContent}
      </ButtonComponent>
    </>
  );
};

ExtrasList.defaultProps = {
  btnContent: 'Add extra',
  addBtnClassName: '',
};

export default ExtrasList;
