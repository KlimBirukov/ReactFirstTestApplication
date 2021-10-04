import React from 'react';
import Shipment from "./Shipment";
import {TransitionGroup, CSSTransition} from "react-transition-group";
import PropTypes from "prop-types";

class Order extends React.Component {

    static propTypes = {
        deleteFromOrder: PropTypes.func,
        burgers: PropTypes.object,
        order: PropTypes.object,
    };

    renderOrder = (key) => {
        const burger = this.props.burgers[key];
        const count = this.props.order[key];
        const isAvailable = burger && burger.status === 'available';
        const transitionOption = {
            classNames: 'order',
            key,
            timeout: {enter: 500, exit: 500}
        }


        if (!burger) return null;

        if (!isAvailable) {
            return (
                <CSSTransition {...transitionOption}>
                    <li className='unavailable' key={key}>
                        Sorry, {burger ? burger.name : 'burger'} temporarily unavailable
                    </li>
                </CSSTransition>
            )
        }

        return (
            <CSSTransition {...transitionOption}>
                <li key={key}>
                    <span>
                        <TransitionGroup
                            component='span'
                            className='count'>
                            <CSSTransition
                                classNames='count'
                                key={count}
                                timeout={{enter: 500, exit: 500}}>
                                <span>{count}</span>
                            </CSSTransition>
                        </TransitionGroup>
                        pieces {burger.name}
                        <span> {count * burger.price} ₽</span>
                        <button
                            onClick={() => this.props.deleteFromOrder(key)}
                            className='cancelItem'>&times;</button>
                    </span>
                </li>
            </CSSTransition>
        )
    }

    render() {
        const orderId = Object.keys(this.props.order);

        const total = orderId.reduce((prevTotal, key) => {
            const burger = this.props.burgers[key];
            const count = this.props.order[key];

            const isAvailable = burger && burger.status === 'available';
            if (isAvailable) {
                return prevTotal + burger.price * count;
            }
            return prevTotal;

        }, 0)

        return (
            <div className='order-wrap'>
                <h2>You order</h2>
                <TransitionGroup component='ul' className='order'>
                    {orderId.map(this.renderOrder)}
                </TransitionGroup>
                {total > 0 ? (
                    <Shipment total={total}/>
                ) : (
                    <div className='nothingSelected'>
                        Choose a dish and add it to the order </div>
                )}
            </div>
        )
    }
}


export default Order;