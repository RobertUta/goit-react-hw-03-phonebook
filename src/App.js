import styles from './App.module.css';
import React, { Component } from 'react'
import Form from './components/Form/Form'
import shortid from 'shortid';
import ContactList from './components/ContactsList/ContactList'
import Filter from './components/Filter/Filter'

export default class App extends Component {
    state = {
      contacts: [
    {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
    {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
    {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
  ],
      filter: '',
    }
  
  componentDidMount() {
    const parsedContacts = JSON.parse(localStorage.getItem('contacts'))
    if (parsedContacts) {
      this.setState({contacts : parsedContacts})
    }
  }
  
  componentDidUpdate(prevProps,prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
    }
  }
  
  formId = () => {
    shortid.generate()
  }
   deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };
  formSubmitHandler = data => {
    this.state.contacts.forEach(element => {
      if (element.name.toLowerCase() === data.name.toLowerCase()) {
        data.name = 'repeat'
        return alert('contact is already in the directory')
      }
    })
    if (data.name === 'repeat') {
      return
    }
      this.setState(({ contacts }) => ({
      contacts: [data, ...contacts],
      }));
  }
   changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };
    getVisibleContact = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };
  render() {
    return (
      <div className={styles.container}>
        <Form onSubmit={this.formSubmitHandler} />
        <Filter value={this.state.filter} onChange={this.changeFilter}  />
        <ContactList contacts={this.getVisibleContact()} onDeleteContact={this.deleteContact}  />
      </div>
    )
  }
}


