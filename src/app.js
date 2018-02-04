import React, { Component } from 'react';



export default class App extends Component {
    constructor(){
        super();
        this.state = {
            todoList : [
                "Need to bring umbrella",
                "review code of reg-6678",
                "say bye to my old gf",
                "say Ilu to new gf"
            ]
        }
        this.removeItem = this.removeItem.bind(this);
    }

    removeItem(evt){
        console.log(evt.target.dataset.id);
        var newState = this.state.todoList.filter((item, index) => {

                if(index !== evt.target.dataset.id *1 ) return item;
    });
        this.setState({
            todoList : newState
        });

    }


    render() {
        const getTodoList = this.state.todoList.map((item, index) => {

                return (<li key={index} >
            {item}
            <button data-id={index} onClick={this.removeItem}>delete</button>
        </li>);
    })

        return (
            <div className="App">
            <h1>Here is my todo list</h1>
        <ul>
        {getTodoList}
        </ul>
        </div>
    );
    }
}


