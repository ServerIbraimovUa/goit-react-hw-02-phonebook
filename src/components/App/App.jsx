import { nanoid } from 'nanoid';

import { Component } from 'react';
import ContactForm from 'components/ContactForm/ContactForm';
import ContactList from 'components/ContactList/ContactList';
import { Container } from './App.styled';
import Filter from 'components/Filter/Filter';

export default class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  formSubmitHandler = ({ name, number }) => {
    const newState = {
      id: nanoid(),
      name,
      number,
    };

    this.setState({
      contacts: [newState, ...this.state.contacts],
    });
  };
  onSearchContact = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getFilterContacts = () => {
    const { filter, contacts } = this.state;
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(({ id }) => id !== contactId),
    }));
  };

  render() {
    const { filter } = this.state;
    const filterContacts = this.getFilterContacts;
    return (
      <Container>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.formSubmitHandler} />
        <h2>Contacts</h2>
        {this.state.contacts.length === 0 ? (
          <h3>Empty</h3>
        ) : (
          <>
            <Filter onChange={this.onSearchContact} filter={filter} />
            <ContactList
              contacts={filterContacts()}
              onDelete={this.deleteContact}
            />
          </>
        )}
      </Container>
    );
  }
}
