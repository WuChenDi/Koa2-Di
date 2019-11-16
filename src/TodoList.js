import React, { Component, Fragment } from "react";
import TodoItem from "./TodoItem";
import "./index.css";

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      list: ["vue", "react", "angular"]
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleBtnClick = this.handleBtnClick.bind(this);
    this.handleItemDelete = this.handleItemDelete.bind(this);
  }

  render() {
    return (
      <Fragment>
        <div>
          <label htmlFor="insertArea">输入内容</label>
          <input
            id="insertArea"
            className="input"
            type="text"
            value={this.state.inputValue}
            onChange={this.handleInputChange}
          />
          <button onClick={this.handleBtnClick}>提交</button>
        </div>
        <ul>{this.getTodoItem()}</ul>
      </Fragment>
    );
  }

  getTodoItem() {
    return this.state.list.map((item, index) => {
      return (
        <div key={index}>
          <TodoItem
            content={item}
            index={index}
            deleteItem={this.handleItemDelete} // this指向父级
          />
          {/*<li
          key={index}
          onClick={this.handleItemDelete.bind(this, index)}
          dangerouslySetInnerHTML={{ __html: item }}
        >
        </li>*/}
        </div>
      );
    });
  }

  handleInputChange(e) {
    // this.setState({
    //   inputValue: e.target.value
    // });
    const value = e.target.value;
    this.setState(() => ({
      inputValue: value
    }));
  }

  handleBtnClick() {
    if (this.state.inputValue.trim() === "") {
      alert("请输入内容");
      return;
    }

    // this.setState({
    //   list: [...this.state.list, this.state.inputValue],
    //   inputValue: ""
    // });
    this.setState(prevState => ({
      list: [...prevState.list, prevState.inputValue],
      inputValue: ""
    }));
  }

  handleItemDelete(index) {
    // immutable
    // state 不允许我们做任何的改变
    // const list = [...this.state.list];
    // list.splice(index, 1);
    // this.setState({
    //   list
    // });
    this.setState(prevState => {
      const list = [...prevState.list];
      list.splice(index, 1);
      return { list };
    });
  }
}

export default TodoList;
