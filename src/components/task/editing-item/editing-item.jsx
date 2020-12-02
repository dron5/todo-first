import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import './editing-item.css';

export default class EditingItem extends Component {
    static defaultProps = {
      onEditForm: () => {},
    }

    static propTypes = {
      onEditForm: PropTypes.func,
      label: PropTypes.string.isRequired,
      edit: PropTypes.bool.isRequired,
    }

    state = {
      label: '',
    }

    onChange = (event) => {
      this.setState({
        label: event.target.value,
      });
    }

    onSubmit = (event) => {
      event.preventDefault();
      if (this.state.label) {
        this.props.onEditForm(this.props.id, this.state.label);
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
              autoFocus
              defaultValue={label}
              onChange={this.onChange}
            />
          </form>
        );
      }
      return null;
    }
}
