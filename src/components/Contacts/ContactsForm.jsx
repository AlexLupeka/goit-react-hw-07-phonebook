import { useState } from 'react';
import { selectContacts } from '../../redux/selectors';
import { useSelector, useDispatch } from 'react-redux';
import { addContact } from '../../redux/operations';
import {
  ContactForm,
  ContactLabel,
  ContactInput,
  ContactButton,
} from './ContactsForm.styled';

export default function Form() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();

  const changeName = e => {
    setName(e.target.value);
  };

  const handleChange = e => {
    setPhone(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (contacts.find(item => item.name.toLowerCase() === name.toLowerCase())) {
      alert(`${name} is already in contacts`);
      return;
    }
    if (
      contacts.find(item => item.phone.toLowerCase() === phone.toLowerCase())
    ) {
      alert(`${phone} is already in contacts`);
      return;
    }
    dispatch(
      addContact({
        name,
        phone,
      })
    );
    setName('');
    setPhone('');
  };

  return (
    <ContactForm onSubmit={handleSubmit}>
      <ContactLabel>
        Name
        <ContactInput
          type="text"
          name="name"
          onChange={changeName}
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          placeholder="🙍‍♂️"
        />
      </ContactLabel>
      <ContactLabel>
        Number
        <ContactInput
          type="tel"
          name="phone"
          onChange={handleChange}
          value={phone}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          placeholder="☎️"
        />
      </ContactLabel>
      <ContactButton type="submit">Add contact</ContactButton>
    </ContactForm>
  );
}
