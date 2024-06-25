// paymentStore.js
import { makeAutoObservable } from 'mobx';

class PaymentStore {
    orderId = '';
    orderName = '';
    customerName = '';
    customerEmail = '';

    constructor() {
        makeAutoObservable(this);
    }

    setPaymentInfo(orderId, orderName, customerName, customerEmail) {
        this.orderId = orderId;
        this.orderName = orderName;
        this.customerName = customerName;
        this.customerEmail = customerEmail;
    }
}

const paymentStore = new PaymentStore();
export default paymentStore;
