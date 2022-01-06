import React from "react";

export default class UpdateItem extends React.Component {
  constructor(prop) {
    super(prop);
    this.updateList = this.updateList.bind(this);
    this.state = {
      newToDoList: "",
      priority: "",
      message: "",
      displayEditWindow: "",
    };
  }
  updateList(event) {
    event.preventDefault();
    const { toDoList } = this.props;
    // const { newToDoList } = this.state;
    // const { priority } = this.state;
    const newItem2 = this.newItem2.value;
    const { changeList } = this.props;

    this.setState({
      newToDoList: toDoList,
    });

    if (newItem2 === "") {
      this.setState({
        message: "Cannot add empty item.",
      });
      return false;
    }

    // const position = toDoList.splice(Priority - 1, 1, newItem2);
    const displayEditWindow = !this.state.displayEditWindow;

    if (newItem2 !== "") {
      // eslint-disable-next-line no-unused-expressions
      newItem2 !== "" &&
        // eslint-disable-next-line new-cap
        changeList(toDoList, displayEditWindow);
    }
    this.newItem2.value = "";
  }

  updatePriority2(event) {
    this.setState({ Priority: event.target.value });
  }

  render() {
    const { message } = this.state;
    const { toDoList, Item } = this.props;
    const index = toDoList.indexOf(Item) + 1;
    return (
      <div className="gridEditBox">
        <form className="EditBox" onSubmit={(event) => this.updateList(event)}>
          <div id="row-1">
            <label>Edit List Item # {index}</label>
          </div>
          <div id="row-2">
            <p className="message">{message}</p>
            <textarea
              id="text-box-2"
              type="text"
              ref={(input) => (this.newItem2 = input)}
              onKeyPress={(event) => {
                if (event.key === "Enter") this.updateList(event);
              }}
            >
              {Item}
            </textarea>
          </div>
          <div id="row-3">
            <select
              type="Number"
              defaultValue={index}
              onChange={this.updatePriority2}
            >
              {toDoList.map((item) => (
                <option>{toDoList.indexOf(item) + 1}</option>
              ))}
              <option>{toDoList.length + 1}</option>
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
