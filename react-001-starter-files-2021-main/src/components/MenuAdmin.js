import React from 'react';
import AddBurgerForm from "./AddBurgerForm";
import EditBurgerForm from "./EditBurgerForm";
import PropTypes from "prop-types";

class MenuAdmin extends React.Component {

    static propTypes = {
        burgers: PropTypes.object,
        deleteBurger: PropTypes.func,
        updateBurger: PropTypes.func,
        addBurger: PropTypes.func,
        loadSampleBurgers: PropTypes.func,
    };

    render() {
        return (
            <div className='menu-admin'>
                <h2>Menu management</h2>
                {Object.keys(this.props.burgers).map(key =>
                    <EditBurgerForm
                        key={key}
                        index={key}
                        burger={this.props.burgers[key]}
                        updateBurger={this.props.updateBurger}
                        deleteBurger={this.props.deleteBurger}/>
                )}
                <AddBurgerForm addBurger={this.props.addBurger}/>
                <button onClick={this.props.loadSampleBurgers}>Show all burgers</button>
            </div>
        )
    }
}

export default MenuAdmin;