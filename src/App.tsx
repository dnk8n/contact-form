import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import client from './apolloConfig'
import { SEND_FORM } from './queries'


const App: React.FC = () => {
  const [formData, setFormData] = useState({ msg: '', addr: '' });
  const [sendform, { data }] = useMutation(SEND_FORM, {client});
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await sendform({ variables: { form: formData } });
      if (response.data.sendform.success) {
        alert('Form submitted successfully!');
      } else {
        alert('There was an error submitting the form: ' + response.data.sendform.errors);
      }
    } catch (error) {
      console.error(error);
      alert('There was an error submitting the form');
    }
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Message:
        <input type="text" name="msg" value={formData.msg} onChange={handleChange} />
      </label>
      <label>
        Email Address:
        <input type="email" name="addr" value={formData.addr} onChange={handleChange} />
      </label>
      <button type="submit">Send</button>
    </form>
  );
};

export default App;
