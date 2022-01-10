import React from 'react';

export default class UpdateItem extends React.Component {
  constructor(prop) {
    super(prop);
    this.updateList = this.updateList.bind(this);
    this.state = {
      newToDoList: '',
      priority: '',
      message: '',
      displayEditWindow: '',
    };
    this.updatePriority2 = this.updatePriority2.bind(this);
  }

  updateList(event) {
    event.preventDefault();
    const list = [...this.props.toDoList];
    const { priority } = this.state;
    const newItem2 = this.newItem2.value;
    const { changeList, toDoList, Item } = this.props;

    if (priority !== toDoList.indexOf(Item)) {
      list.splice(toDoList.indexOf(Item), 1);
      list.splice(priority, 0, newItem2);
    }else{
      list.splice(toDoList.indexOf(Item), 1, newItem2);
    }

    if (newItem2 !== '') {
      changeList(list);
    } else {
      this.setState({
        message: 'Cannot add empty item.',
      });
      return false;
    }

    this.newItem2.value = '';
  }

  updatePriority2(event) {
    this.setState({
      priority: event.target.value,
    });
  }

  render() {
    const { message } = this.state;
    const { toDoList, Item } = this.props;
    const index = toDoList.indexOf(Item) + 1;

    return (
      <td colSpan='3' className='gridEditBox'>
        <form className='EditBox' onSubmit={ event => this.updateList(event) }>
          <div id='row-1'>
            <label>Edit List Item # {index}</label>
          </div>
          <div id='row-2'>
            <p className='message'>{message}</p>
            <textarea
              id='text-box-2'
              type='text'
              ref={ input => (this.newItem2 = input) }
              onKeyPress={ (event) => {
                if (event.key === 'Enter') this.updateList(event);
              } }
              defaultValue={ Item }
            />
          </div>
          <div id='row-3'>
            <select
              type='Number'
              defaultValue={ index }
              onChange={ this.updatePriority2 }
            >
              {toDoList.map(item => (
                <option key={ item }>{toDoList.indexOf(item) + 1}</option>
              ))}
            </select>
            <button type='submit' id='save'>
              Save
            </button>
          </div>
        </form>
      </td>
    );
  }
}
