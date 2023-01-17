import { gql } from '@apollo/client';


export const SEND_FORM = gql`
  mutation sendform($form: Form!) {
    sendform(form: $form) {
      success
      errors
    }
  }
`;
