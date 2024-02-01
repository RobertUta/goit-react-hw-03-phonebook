import React, { Component } from 'react';
import styles from './Form.module.css';
import shortid from 'shortid';
import PropTypes from 'prop-types';

export default class Form extends Component {
  state = {
    name: '',
    number: '',
  };
  onInputChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };
  onSubmit = e => {
    e.preventDefault();
    const contact = {
      id: shortid.generate(),
      name: this.state.name,
      number: this.state.number,
    };
    this.props.onSubmit(contact);
    this.reset();
  };
  reset = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    return (
      <form className={styles.form} onSubmit={this.onSubmit}>
        <label>
          Name
          <input
            onChange={this.onInputChange}
            value={this.state.name}
            className={styles.inputNameLabel}
            type="text"
            name="name"
            pattern="^[a-zA-Z]+(([' -][a-zA-Z ])?[a-zA-Z]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>
        <label>
          Phone
          <input
            value={this.state.number}
            className={styles.inputNameLabel}
            onChange={this.onInputChange}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>
        <button type="submit">Add contacts</button>
      </form>
    );
  }
}
Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
