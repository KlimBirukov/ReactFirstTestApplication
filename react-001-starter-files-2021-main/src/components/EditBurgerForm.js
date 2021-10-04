import React from "react";
import PropTypes from "prop-types";

class EditBurgerForm extends React.Component {

    static propTypes = {
        burger: PropTypes.shape({
            image: PropTypes.string,
            name: PropTypes.string,
            price: PropTypes.number,
            desc: PropTypes.string,
            status: PropTypes.string,
        }),
        index: PropTypes.string,
        updateBurger: PropTypes.func,
        deleteBurger: PropTypes.func,
    };

    handleChange = event => {
        const updatedBurger = {
            ...this.props.burger,
            [event.currentTarget.name]: event.currentTarget.name === 'price'
                ? parseFloat(event.currentTarget.value) || 0
                : event.currentTarget.value,
        };
        this.props.updateBurger(this.props.index, updatedBurger)
    }

    render() {
        const {image, name, price, desc, status} = this.props.burger

        return (
            <div className='burger-edit'>
                <input onChange={this.handleChange}
                       name='name'
                       type='text'
                       value={name}/>
                <input
                    onChange={this.handleChange}
                    name='price'
                    type='text'
                    value={price}/>
                <select
                    onChange={this.handleChange}
                    name='status'
                    className='status'
                    value={status}>
                    <option value='available'>Available</option>
                    <option value='unavailable'>Unavailable</option>
                </select>
                <textarea
                    onChange={this.handleChange}
                    name='desc'
                    value={desc}/>
                <input
                    onChange={this.handleChange}
                    name='image'
                    type='text'
                    value={image}/>
                <button
                    onClick={() => this.props.deleteBurger(this.props.index)}>
                    Delete from menu
                </button>
            </div>
        );
    }
}

export default EditBurgerForm