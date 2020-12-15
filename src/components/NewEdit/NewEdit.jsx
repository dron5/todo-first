/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/state-in-constructor */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import './editing-item.css';

export default class EditingItem extends Component {
  state = {
    stateLabel: this.props.label,
  }

    onChange = (event) => {
      this.setState({
        stateLabel: event.target.value,
      });
    }

    onSubmit = (event) => {
      event.preventDefault();
      let { stateLabel } = this.state;
      const { onEditForm, id } = this.props;
      stateLabel = stateLabel.trim();
      if (stateLabel && stateLabel !== ' ') {
        onEditForm(id, stateLabel);
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
 
