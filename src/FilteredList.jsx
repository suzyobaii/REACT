import React, { Component } from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap'; // Updated import
import List from './List';

class FilteredList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: "",
      type: "All" // Added state variable for type
    };
  }

  // Sets the state whenever the user types on the search bar
  onSearch = (event) => {
    this.setState({ search: event.target.value.trim().toLowerCase() });
  }

  // Set the state of "type" depending on selection
  onFilter = (type) => {
    this.setState({ type: type });
  }

  // Now filters by name and type
  filterItem = (item) => {
    const matchesSearch = item.name.toLowerCase().includes(this.state.search);
    const matchesType = this.state.type === "All" || item.type === this.state.type;
    return matchesSearch && matchesType;
  }

  render() {
    return (
      <div className="filter-list">
        <h2>Produce Search</h2>
        <DropdownButton id="dropdown-basic-button" title={`Type: ${this.state.type}`}>
          <Dropdown.Item onClick={() => this.onFilter("All")}>All</Dropdown.Item>
          <Dropdown.Item onClick={() => this.onFilter("Fruit")}>Fruit</Dropdown.Item>
          <Dropdown.Item onClick={() => this.onFilter("Vegetable")}>Vegetable</Dropdown.Item>
        </DropdownButton>

        <input type="text" placeholder="Search" onChange={this.onSearch} />
        <List items={this.props.items.filter(this.filterItem)} />
      </div>
    );
  }
}

export default FilteredList;

