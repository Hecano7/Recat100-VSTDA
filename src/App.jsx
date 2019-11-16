import React from 'react';


export default class App extends React.Component {
  // your Javascript goes here
  constructor() {
    super();
    this.state = 
    {
      ToDoList: ["milk","bread"],
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
      this.prior.value = "0";
      this.setState({
        message:'This item is already on the list.'
      });
      return false;
    }
    
    const position= ToDoList.splice(Priority,0, newItem);
      
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
    this.prior.value = "0";
}

updatePriority(event){
  this.setState({Priority:event.target.value})
}

clearList(event){
  this.setState({
    ToDoList: [],
    message:"No list items, you should add some."
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
    <div>
      <input type="text" ref={input => this.newItem = input} placeholder="Item Description" />
      <br/>
      <input type="Number" defaultValue="0" ref={input => this.prior = input} onChange={this.updatePriority.bind(this)} min="1" max={ToDoList.length+1} placeholder="Priority Value"/>
      <br/>
      <button onClick={event => this.addItem(event)} >Add</button>
      <br/>
      {
        (message !== '' || ToDoList.length === 0) && <p>{message}</p>
      } 
      {ToDoList.length > 0 &&
      <table>
        <caption>To Do List</caption>
      <thead>
        <tr>
          <th>#</th>
          <th>Item</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
      {this.state.ToDoList.map(item => (
        <tr key={item}>
          <th>{ToDoList.indexOf(item)+1}</th>
          <td>{item}</td>
          <td><button onClick={(event) => this.removeItem(item)}>X</button></td>
        </tr>
        ))}
       </tbody>
       <tfoot>
         <tr>
           <td>
             <button onClick={event => this.clearList(event)}>Clear List</button>
           </td>
         </tr>
       </tfoot>
      </table>}
      <br/> 
    </div> 
    );
  }
}


