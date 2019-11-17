import React from 'react';
import EditWindow from './EditWindow'

export default class App extends React.Component {
  // your Javascript goes here
  constructor() {
    super();
    this.state = 
    {
      ToDoList: [],
      message:'',
      Priority:''
    };
  }
  
  addItem(event){
    event.preventDefault();
    const {ToDoList} = this.state;
    const {Priority} = this.state;
    const newItem = this.newItem.value;
    const isOnTheList= ToDoList.includes(newItem);
    console.log(isOnTheList);
    
    if (isOnTheList == true){
      this.prior.value = "1";
      this.setState({
        message:'This item is already on the list.'
      });
      return false;
    }
    
    if (newItem == '' ){
      this.setState({
        message:'Cannot add empty item.'
      });
      return false;
    }
    
    const position= ToDoList.splice(Priority-1,0, newItem);

    if (newItem !== '' ){
      this.setState({
        message:''
      })
    }else{
    newItem !== '' &&
    this.setState({
      ToDoList:position,
      message:''
    })
  }
    console.log(position);
    console.log(ToDoList);
    this.newItem.value = "";
}

updatePriority(event){
  this.setState({Priority:event.target.value})
}

clearList(event){
  this.setState({
    ToDoList: [],
    message:"No list items yet, you should add some."
  })
}

removeItem(item){
  const newToDoList = this.state.ToDoList.filter(ToDoList =>{
    return ToDoList !== item;
  })
console.log(newToDoList);
  this.setState({
    ToDoList: [...newToDoList]
  })

  if(newToDoList.length === 0){
    this.setState({
      message:'No items in the list.'
    })
  }
}
  render() {
    const {ToDoList,message,Priority} = this.state;
    return(
    <div className="top-left">
      <form onSubmit={event => this.addItem(event)}>
      <textarea type="text" ref={input => this.newItem = input} onKeyPress={event => {
  if (event.key === 'Enter') this.addItem(event);
}} placeholder="To Do Description" />
      <br/>
      <div className="inlign">
      <select className="floatLeft" type="Number" defaultValue="1" ref={input => this.prior = input} onChange={this.updatePriority.bind(this)} min="1" max={ToDoList.length+1}>
      {this.state.ToDoList.map(item => (
          <option>{ToDoList.indexOf(item)+1}</option>
          ))}
          <option>{ToDoList.length+1}</option>
      </select><p>Set it's priority on list.</p>
      </div>
      <br/>
      <div className="inlign">
      <button type="submit">Add</button><caption> Enter key</caption>
      </div>
      </form>
      <br/>
        <h4>To Do List</h4>
      <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Description</th>
          <th>Delete</th>
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
          <td>{ToDoList.indexOf(item)+1}</td>
          <td>{item}</td>
          <td className="tf"><button onClick={(event) => this.removeItem(item)} type="button">X</button></td>
        </tr>
        ))}
       </tbody>
      </table>
      <button onClick={event => this.clearList(event)} type="button">Clear List</button>
      <br/> 
    </div> 
    );
  }
}