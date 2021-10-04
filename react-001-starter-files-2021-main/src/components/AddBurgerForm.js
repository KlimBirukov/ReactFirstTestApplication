import React from 'react';
import PropTypes from "prop-types";

class AddBurgerForm extends React.Component {

    static propTypes = {
        addBurger: PropTypes.func,
    };

    nameRef = React.createRef();
    priceRef = React.createRef();
    statusRef = React.createRef();
    descRef = React.createRef();
    imageRef = React.createRef();

    createBurger = (event) => {
        event.preventDefault(); //отменяем перезагрузку окна при submit
        const burger = {
            name: this.nameRef.current.value,
            price: parseFloat(this.priceRef.current.value || 0),
            status: this.statusRef.current.value,
            desc: this.descRef.current.value,
            image: this.imageRef.current.value,
        };

        this.props.addBurger(burger);
        event.currentTarget.reset()
    }

    render() {
        return (
            <form className='burger-edit' onSubmit={this.createBurger}>
                <input ref={this.nameRef} name='name' type='text' placeholder='Name' autoComplete='off'/>
                <input ref={this.priceRef} name='prise' type='text' placeholder='Prise' autoComplete='off'/>
                <select ref={this.statusRef} name='status' className='status'>
                    <option value='available'>Available</option>
                    <option value='unavailable'>Remove from the menu</option>
                </select>
                <textarea ref={this.descRef} name='desc' placeholder='Decs'/>
                <input ref={this.imageRef} name='image' type='text' placeholder='Image' autoComplete='off'/>
                <button type='submit'>Add to the menu</button>
            </form>
        )
    }
}

export default AddBurgerForm;