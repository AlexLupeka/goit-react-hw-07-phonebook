import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/operations';
import {
  ContactList,
  ContactItem,
  ContactName,
  ContactButton,
  ContactNumber,
} from './ContactsList.styled';
import { selectVisibleContacts } from '../../redux/selectors';

export default function ListForm() {
  const dispatch = useDispatch();

  const visibleContacts = useSelector(selectVisibleContacts);
  // const showContacts = visibleContacts();

  return (
    <ContactList>
      {visibleContacts.map(({ id, name, phone }) => (
        <ContactItem key={name}>
          <ContactName>
            {name}: <ContactNumber>{phone}</ContactNumber>
          </ContactName>
          <ContactButton
            type="button"
            onClick={() => dispatch(deleteContact(id))}
          >
            Delete
          </ContactButton>
        </ContactItem>
      ))}
    </ContactList>
  );
}

ListForm.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
    })
  ),
};
