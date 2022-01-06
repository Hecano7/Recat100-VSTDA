/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import UpdateItem from './UpdateItem';

export default class App extends React.Component {
  // your Javascript goes here
  constructor(props) {
    super(props);
    this.updateList = this.updateList.bind(this);
    this.state = {
      toDoList: [],
      message: '',
      Priority: 1,
      displayEditWindow: false,
      Item: '',
    };
  }

  addItem(event) {
    event.preventDefault();
    const { toDoList } = this.state;
    const { Priority } = this.state;
    const newItem = this.newItem.value;
    const isOnTheList = toDoList.includes(newItem);

    if (isOnTheList === true) {
      this.setState({
        message: 'This item is already on the list.',
      });
      return false;
    }

    if (newItem === '') {
      this.setState({
        message: 'Cannot add empty item.',
      });
      return false;
    }

    const position = toDoList.splice(Priority - 1, 0, newItem);

    if (newItem !== '') {
      this.setState({
        toDoList: position,
        message: ''
      });
    }

    this.newItem.value = '';
    console.log(toDoList);
    // const divided = toDoList.length / 3;
    // const red = toDoList.slice(0, divided);
    // const green = toDoList.slice(divided + 1, divided * 2);
    // const yellow = toDoList.slice(divided * 2 + 1, divided * 3);
  }

  updatePriority(event) {
    this.setState({ Priority: event.target.value });
  }

  clearList() {
    this.setState({
      toDoList: [],
      message: 'No list items yet, you should add some.',
    });
  }

  removeItem(item) {
    const toDoList = this.state.toDoList.filter(list => list !== item);

    this.setState({
      toDoList: [...toDoList],
    });

    if (toDoList.length === 0) {
      this.setState({
        message: 'No items in the list.',
      });
    }
  }

  displayEditWindow(item) {
    this.setState({
      displayEditWindow: !this.state.displayEditWindow,
      Item: item,
    });

    if (this.state.displayEditWindow) {
      this.setState({
        // eslint-disable-next-line max-len
        EditWindow: (
          <UpdateItem
            toDoList={ this.state.toDoList }
            Item={ this.state.Item }
            changeList={ this.updateList }
          />
        ),
      });
    } else {
      this.setState({
        EditWindow: '',
      });
    }
  }

  updateList(x) {
    this.setState({
      toDoList: x,
      EditWindow: '',
    });
  }

  render() {
    const { toDoList, message } = this.state;
    const divided = toDoList.length / 3;
    const red = toDoList.slice(0, divided);
    const green = toDoList.slice(divided, divided * 2);
    const yellow = toDoList.slice(divided * 2, divided * 3);
    console.log('toDoList', toDoList);
    return (
      <div className='grid'>
        <div>
          <div className='List-Box'>
            <form onSubmit={ event => this.addItem(event) }>
              <textarea
                type='text'
                ref={ input => (this.newItem = input) }
                onKeyPress={ (event) => {
                  if (event.key === 'Enter') this.addItem(event);
                } }
                placeholder='To Do Description'
              />
              <br />
              <div className='inlign'>
                <select
                  className='floatLeft'
                  type='Number'
                  defaultValue='1'
                  ref={ input => (this.prior = input) }
                  onChange={ this.updatePriority }
                  min='1'
                  max={ toDoList.length + 1 }
                >
                  {toDoList.map(item => (
                    <option>{toDoList.indexOf(item) + 1}</option>
                  ))}
                  <option>{toDoList.length + 1}</option>
                </select>
                <p> Set it's priority on the list. </p>
              </div>
              <br />
              <div className='inlign'>
                <button type='submit'>Add</button>
                <h3> Enter key</h3>
              </div>
            </form>
          </div>
          <br />
          <h3>To Do List</h3>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Description</th>
                <th>Edit/Delete</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th />
                <th className='message'>{message}</th>
                <th />
              </tr>
              {red.map(item => (
                <tr key={ item } className='red'>
                  <td>{toDoList.indexOf(item) + 1}</td>
                  <td>{item}</td>
                  <td className='tf'>
                    <button
                      type='button'
                      onClick={ this.displayEditWindow(item) }
                    >
                      ^
                    </button>
                    <button onClick={ this.removeItem(item) } type='button'>
                      X
                    </button>
                  </td>
                </tr>
              ))}
              {green.map(item => (
                <tr key={ item } className='green'>
                  <td>{toDoList.indexOf(item) + 1}</td>
                  <td>{item}</td>
                  <td className='tf'>
                    <button
                      type='button'
                      onClick={ this.displayEditWindow(item) }
                    >
                      ^
                    </button>
                    <button onClick={ this.removeItem(item) } type='button'>
                      X
                    </button>
                  </td>
                </tr>
              ))}
              {yellow.map(item => (
                <tr key={ item } className='yellow'>
                  <td>{toDoList.indexOf(item) + 1}</td>
                  <td>{item}</td>
                  <td className='tf'>
                    <button
                      type='button'
                      onClick={ this.displayEditWindow(item) }
                    >
                      ^
                    </button>
                    <button onClick={ this.removeItem(item) } type='button'>
                      X
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={ event => this.clearList(event) } type='button'>
            Clear List
          </button>
        </div>
        <div>{this.state.EditWindow}</div>
        <div />
        <div className='Features'>
          <h3>Feautures</h3>
          <ul className='Unordered'>
            <li>You have to hit the edit button twice just for the first time lol</li>
            <li>By hitting the enter key you submit the form</li>
            <li>You cannot add the same item twice</li>
            <li>The priority index expands in a list format</li>
            <li>Built using css grid</li>
          </ul>
        </div>
      </div>
    );
  }
}
