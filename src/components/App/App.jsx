import { Container } from './App.styled';
import Section from '../Section';
import Form from '../Contacts';
import Loader from '../Loader';
import Filter from '../Filter';
import ListForm from '../ContactsList';
import { fetchContacts } from '../../redux/operations';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsLoading } from '../../redux/selectors';

export function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <Container>
      <Section title="Phonebook">
        <Form />
      </Section>
      <Section title="Contacts">
        {isLoading && <Loader />}
        <Filter />
        <ListForm />
      </Section>
    </Container>
  );
}
