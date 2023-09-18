import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Form } from './ContactForm.styled';

export default class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  onChangeInput = e => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value.trim(),
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { name, number } = this.state;
    if (name === '' && number === '') {
      console.log('Please write correct name and number ');
      return;
    } else if (name === '') {
      console.log('Please enter your name ');
      return;
    } else if (number === '') {
      console.log('Please enter your number phone');
      return;
    } else {
      //submit data in App
      this.props.onSubmit(this.state);
      //reset form
      this.reset();
    }
  };

  reset = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    const nameId = nanoid();
    const numId = nanoid();
    return (
      <Form onSubmit={this.handleSubmit}>
        <label htmlFor={nameId}>Name</label>
        <input
          type="text"
          name="name"
          placeholder="Rosie Simpson"
          value={this.state.name}
          id={nameId}
          onChange={this.onChangeInput}
        />
        <label htmlFor={numId}>Number</label>
        <input
          type="tel"
          name="number"
          placeholder="066-459-12-56"
          value={this.state.number}
          id={numId}
          onChange={this.onChangeInput}
        />

        <button type="submit">Add contact</button>
      </Form>
    );
  }
}
