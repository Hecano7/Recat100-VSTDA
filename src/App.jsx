import React from "react";
import UpdateItem from "./UpdateItem";

export default class App extends React.Component {
  // your Javascript goes here
  constructor(props) {
    super(props);
    this.UpdateList = this.UpdateList.bind(this);
    this.state = {
      ToDoList: [],
      message: "",
      Priority: 1,
      DisplayEditWindow:false,
      Item: ""
    };
  }

  addItem(event) {
    event.preventDefault();
    const { ToDoList } = this.state;
    const { Priority } = this.state;
    const newItem = this.newItem.value;
    const isOnTheList = ToDoList.includes(newItem);
    console.log(this.state.Priority);

    if (isOnTheList == true) {
      this.setState({
        message: "This item is already on the list."
      });
      return false;
    }

    if (newItem == "") {
      this.setState({
        message: "Cannot add empty item."
      });
      return false;
    }

    const position = ToDoList.splice(Priority - 1, 0, newItem);

    if (newItem !== "") {
      this.setState({
        message: ""
      });
    } else {
      newItem !== "" &&
        this.setState({
          ToDoList: position,
          message: ""
        });
    }
    console.log(position);
    console.log(ToDoList);
    this.newItem.value = "";
  }

  updatePriority(event) {
    this.setState({ Priority: event.target.value });
  }

  clearList(event) {
    this.setState({
      ToDoList: [],
      message: "No list items yet, you should add some."
    });
  }

  removeItem(item) {
    const ToDoList = this.state.ToDoList.filter(ToDoList => {
      return ToDoList !== item;
    });
    console.log(ToDoList);
    this.setState({
      ToDoList: [...ToDoList]
    });

    if (ToDoList.length === 0) {
      this.setState({
        message: "No items in the list."
      });
    }
  }

  DisplayEditWindow(item) {
    this.setState({
      DisplayEditWindow: !this.state.DisplayEditWindow,
      Item: item
    });

    console.log("Item: ",this.state.Item);

    if (this.state.DisplayEditWindow) {
      this.setState({
        EditWindow: <UpdateItem ToDoList={this.state.ToDoList} Item={this.state.Item} ChangeList={this.UpdateList}/>,
      });
    } else {
      this.setState({
        EditWindow: ""
      });
    }
  }
  
  UpdateList(x,y) {
    console.log("newlist",x);
    console.log("toggle",y);
    this.setState({
      ToDoList: x,
      EditWindow:""
    });
  }

  render() {
    const { ToDoList, message } = this.state;
    return (
      <div className="grid">
        <div>
          <div className="List-Box">
        <form onSubmit={event => this.addItem(event)}>
          <textarea
            type="text"
            ref={input => (this.newItem = input)}
            onKeyPress={event => {
              if (event.key === "Enter") this.addItem(event);
            }}
            placeholder="To Do Description"
          />
          <br/>
          <div className="inlign">
            <select
              className="floatLeft"
              type="Number"
              defaultValue="1"
              ref={input => (this.prior = input)}
              onChange={this.updatePriority.bind(this)}
              min="1"
              max={ToDoList.length + 1}
            >
              {this.state.ToDoList.map(item => (
                <option>{ToDoList.indexOf(item) + 1}</option>
              ))}
              <option>{ToDoList.length + 1}</option>
            </select>
            <p>Set it's priority on list.</p>
          </div>
          <br/>
          <div className="inlign">
            <button type="submit">Add</button>
            <h3> Enter key</h3>
          </div>
        </form>
        </div>
        <br/>
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
              <th></th>
              <th className="message">{message}</th>
              <th></th>
            </tr>
            {this.state.ToDoList.map(item => (
              <tr key={item}>
                <td>{ToDoList.indexOf(item) + 1}</td>
                <td>{item}</td>
                <td className="tf">
                  <button
                    type="button"
                    onClick={event => this.DisplayEditWindow(item)}
                  >
                    ^
                  </button>
                  <button
                    onClick={event => this.removeItem(item)}
                    type="button"
                  >
                    X
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={event => this.clearList(event)} type="button">
          Clear List
        </button>
        </div>
        <div >
        {this.state.EditWindow}
        </div>
        <div>
        </div>
        <div className="Features">
         <h3>Feautures</h3>
         <ul className="Unordered">
         <li>You have to hit the edit button twice just for the first time lol</li>
         <li>By hitting the enter key you submit the form</li>
         <li>You cannot add the same item twice</li>
         <li>The priority index expands in a list format</li>
         <li>Built with css grid</li>
         </ul>
        </div>
      </div>
    );
  }
}
