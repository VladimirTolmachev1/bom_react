import React from 'react';

import { OrderItemForm } from '../../../../components/forms';
import { BaseModal } from '../../BaseModal';

const BaseDishOrderModal = ({
  initialValues,
  open,
  onFormSubmit,
  onClose,
  submitBtnText,
  ...baseModalProps
}) => (
  <BaseModal
    open={open}
    dialogProps={{
      maxWidth: 'sm',
    }}
    secondaryBtnText="close"
    onSubmit={onFormSubmit}
    onClose={onClose}
    onSecondaryAction={onClose}
    submitBtnText={submitBtnText}
    closeWithACross={false}
    {...baseModalProps}>
    <OrderItemForm initialValues={initialValues} />
  </BaseModal>
);

export default BaseDishOrderModal;
