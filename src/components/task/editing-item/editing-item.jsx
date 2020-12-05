import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import './editing-item.css';

export default class EditingItem extends Component {
  constructor(props) {
    super(props);
    this.state = { label: '' };
  }

  // state = {
  //   label: '',
  // }

    onChange = (event) => {
      this.setState({
        label: event.target.value,
      });
    }

    onSubmit = (event) => {
      event.preventDefault();
      const { label } = this.state;
      const { onEditForm, id } = this.props;
      if (label) {
        onEditForm(id, label);
      }
    }

    render() {
      const { edit, label } = this.props;
      if (edit) {
        return (
          <form onSubmit={this.onSubmit}>
            <input
              type="text"
              className="edit"
              defaultValue={label}
              onChange={this.onChange}
            />
          </form>
        );
      }
      return null;
    }
}
EditingItem.defaultProps = {
  onEditForm: () => {},
};

EditingItem.propTypes = {
  onEditForm: PropTypes.func,
  label: PropTypes.string.isRequired,
  edit: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
};
