import React from "react";

export default class UpdateItem extends React.Component {
  constructor(prop) {
    super(prop);
    this.UpdateList = this.UpdateList.bind(this);
    this.state = {
      newToDoList: "",
      Priority: "",
      message: "",
      DisplayEditWindow: ""
    };
  } 
    
  UpdateList(event) {
    event.preventDefault();
    const { ToDoList } = this.props;
    const { newToDoList } = this.state;
    const { Priority } = this.state;

    const newItem2 = this.newItem2.value;
    const { ChangeList } = this.props;
 
    this.setState({
      newToDoList: ToDoList
    });
    
    if (newItem2 == "") {
      this.setState({
        message: "Cannot add empty item."
      });
      return false;
    }
    console.log(this.state.Priority);
    const position = ToDoList.splice(Priority - 1, 1, newItem2);
    const DisplayEditWindow= !this.state.DisplayEditWindow;
    
    if (newItem2 !== "") {
      newItem2 !== "" &&
      
      console.log("propList:",this.props.ToDoList);
      console.log("stateList:", newToDoList);
      ChangeList(ToDoList,DisplayEditWindow);
    }
    this.newItem2.value = "";
  }
  
  
  updatePriority2(event) {
    this.setState({ Priority: event.target.value });
  }

  render() {
    const { message } = this.state;
    const { ToDoList, Item } = this.props;
    console.log("propList:",this.props.ToDoList);
    const index = ToDoList.indexOf(Item) + 1;
    return (
      <div className="gridEditBox">
        <form className="EditBox" onSubmit={event => this.UpdateList(event)}>
          <div id="row-1">
            <label>Edit List Item # {index }</label>
          </div>
          <div id="row-2">
            <p className="message">{message}</p>
            <textarea
              id="text-box-2"
              type="text"
              ref={input => (this.newItem2 = input)}
              onKeyPress={event => {
                if (event.key === "Enter") this.UpdateList(event);
              }}
            >
              {Item}
            </textarea>
          </div>
          <div id="row-3">
            <select
              type="Number"
              defaultValue={index}
              onChange={this.updatePriority2.bind(this)}
            >
              {ToDoList.map(item => (
                <option>{ToDoList.indexOf(item) + 1}</option>
              ))}
              <option>{ToDoList.length + 1}</option>
            </select>
            <button type="submit" id="save">
              Save
            </button>
          </div>
        </form>
      </div>
    );
  }
}
