import React from 'react';
import Header from "./Header";
import Order from "./Order";
import MenuAdmin from "./MenuAdmin";
import sampleBurgers from "../sample-burgers";
import Burger from "./Burger";
import base from "../base";
import PropTypes from "prop-types";

class App extends React.Component {

    static propTypes = {
        match: PropTypes.object,
    };

    state = {
        burgers: {},
        order: {},
    };

    componentDidMount() {
        const {params} = this.props.match;

        const localStorageRef = localStorage.getItem(params.restaurantId);
        if (localStorageRef) {
            this.setState({order: JSON.parse(localStorageRef)});
        }

        this.ref = base.syncState(`${params.restaurantId}/burgers`,
            {
                context: this,
                state: 'burgers',
            });
    }

    componentDidUpdate() {
        const {params} = this.props.match;
        localStorage.setItem(params.restaurantId, JSON.stringify(this.state.order));
    }

    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

    addBurger = (burger) => {
        // в реакте при работе с обьектами придердиваемся иммутабильности,
        //      т.е. когда хотим их изменить, сначала создаем копию,
        //      вносим в неё изменения, а потом вносим копию в state.

        // #1 делаем копию обьекта state
        const burgers = {...this.state.burgers};
        // #2 добовляем новыц бургер с уникальной меткой
        burgers[`burger${Date.now()}`] = burger;
        // #3 перезаписать burgers в  state
        this.setState({burgers});
    };

    updateBurger = (key, updateBurger) => {
        const burgers = {...this.state.burgers};
        burgers[key] = updateBurger;
        this.setState({burgers});
    }

    deleteBurger = (key) => {
        const burgers = {...this.state.burgers};
        burgers[key] = null;
        this.setState({burgers});
    }

    loadSampleBurgers = () => {
        this.setState({burgers: sampleBurgers})
    }

    addToOrder = (key) => {
        const order = {...this.state.order};
        order[key] = order[key] + 1 || 1;
        this.setState({order});
    }

    deleteFromOrder = (key) => {
        const order = {...this.state.order};
        delete order[key];
        this.setState({order});
    }


    render() {
        return (
            <div className='burger-paradise'>
                <div className='menu'>
                    <Header title='Hot Burger'/>
                    <ul className='burgers'>
                        {Object.keys(this.state.burgers).map(key => {
                            return (<Burger
                                    key={key}
                                    index={key}
                                    details={this.state.burgers[key]}
                                    addToOrder={this.addToOrder}
                                />
                            );
                        })}
                    </ul>
                </div>
                <Order
                    deleteFromOrder={this.deleteFromOrder}
                    burgers={this.state.burgers}
                    order={this.state.order}/>
                <MenuAdmin
                    burgers={this.state.burgers}
                    addBurger={this.addBurger}
                    loadSampleBurgers={this.loadSampleBurgers}
                    updateBurger={this.updateBurger}
                    deleteBurger={this.deleteBurger}/>
            </div>
        )
    }
}

export default App;