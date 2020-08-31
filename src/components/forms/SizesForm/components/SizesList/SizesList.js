import React from 'react';
import { Button } from '@material-ui/core';
import { SizeItem } from '../SizeItem';

const SizesList = ({ fields }) => (
  <>
    {fields.map((field, index) => (
      <SizeItem
        onRemoveClick={() => fields.remove(index)}
        key={index}
        field={field}
      />
    ))}
    <Button onClick={() => fields.push({})} color="primary">
      Add Size
    </Button>
  </>
);

export default SizesList;
