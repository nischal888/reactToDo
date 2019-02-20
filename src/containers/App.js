import React, { Component } from 'react';
import './App.css';
import Itemscomponents from '../components/Itemscomponents'

class App extends Component {
  state = {
    buyitems: [],
    buyitemsEditValueHolder: [],
    inputValues: '',
    message: ''

  }


  componentWillMount() {
    console.log('componentWillMount');
    let items = JSON.parse(localStorage.getItem('buyitems'));
    if (items) {
      let itemsHolder = [];
      items.forEach(function (item, index) {
        itemsHolder[index] = item.value;
      });
      localStorage.getItem('buyitems') && this.setState({
        buyitems: items,
        buyitemsEditValueHolder: itemsHolder
      })
    }

  }

  addItems = (event) => {
    event.preventDefault();
    let newItems = this.state.inputValues;
    let items = this.state.buyitems;
    let filterItems = items.filter(function (item) {
      return item.value === newItems;
    });
    console.log(filterItems);


    if (newItems !== '' && filterItems.length === 0) {
      this.setState({
        buyitems: [...this.state.buyitems, {
          value: newItems,
          isEditStatus: false
        }],
        inputValues: '',
        message: ''
      })
    } else {
      if (filterItems.length) {
        this.setState({
          message: "This item is already on the list"
        })
      }
    }
  }

  addChangeHnadler = (event) => {
    this.setState({
      inputValues: event.target.value
    })

  }
  deleteItem = (item) => {

    const newItems = this.state.buyitems.filter(items => {
      return items !== item;
    })
    this.setState({
      buyitems: [...newItems]
    })
    if (newItems.length === 0) {
      this.setState({
        message: 'There is no item on the list'
      })
    }

  }

  clearAll = () => {
    this.setState({
      buyitems: [],
      message: 'There is no item on the list'
    })
  }

  editItems = (index) => {
    console.log('editing index: ' + index);
    let items = this.state.buyitems;
    if (items[index]) {
      if (items[index].editstatus) {
        items[index].editstatus = false;
        this.setState({
          message: ''
        });
      } else {
        items[index].editstatus = true;
        this.onEditInputChange(index, items[index].value);
      }
      this.setState({
        buyitems: items
      });
    }
  }



  onEditInputChange = (index, value) => {
    console.log('updating index: ' + index);
    let buyitemsEditValueHolders = this.state.buyitemsEditValueHolder;
    buyitemsEditValueHolders[index] = value;
    this.setState({
      buyitemsEditValueHolder: buyitemsEditValueHolders
    });
  }

  updateItemHandeler = (index) => {
    console.log('updating index: ' + index);
    let items = this.state.buyitems;
    let buyitemsEditValueHolders = this.state.buyitemsEditValueHolder;


    if (items[index] && buyitemsEditValueHolders[index]) {
      if (items[index].editstatus) {
        let filterItems = items.filter(item => {
          return item.value === buyitemsEditValueHolders[index]
        })
        if (filterItems.length === 0) {
          items[index].value = buyitemsEditValueHolders[index];
          items[index].editstatus = false;
          this.setState({
            buyitems: items,
            message: ''
          });
        } else {
          if (filterItems.length) {
            this.setState({
              message: "This item is already on the list"
            })
          }
        }
      }
    }
  }

  componentWillUpdate(nextProps, nextState) {
    console.log('componentWillUpdate');
    localStorage.setItem('buyitems', JSON.stringify(nextState.buyitems));
  }



  render() {
    return (
      <div className="App">
        <Itemscomponents
          items={this.state.buyitems}
          submit={this.addItems}
          change={this.addChangeHnadler}
          inputValue={this.state.inputValues}
          message={this.state.message}
          click={this.deleteItem}
          clearall={this.clearAll}
          editstatus={this.state.isEditStatus}
          edititems={this.editItems}
          onEditInputChangeHandeler={this.onEditInputChange}
          itemsHolder={this.state.buyitemsEditValueHolder}
          updateItem={this.updateItemHandeler}
        />

      </div>

    );
  }
}

export default App;