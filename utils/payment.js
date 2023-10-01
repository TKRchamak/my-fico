const moment = require("moment");
function formFuturePaymentDeadlines(
  first_payment_deadline,
  payment_amount,
  number_of_installments
) {
  let payments = [];
  let payment_deadline = first_payment_deadline;
  payments.push({
    payable: payment_amount,
    paid: true,
    paymentDeadline: payment_deadline,
    paymentDate: payment_deadline,
    defaults: 0,
  });
  for (let i = 0; i < number_of_installments - 1; i++) {
    payment_deadline = moment(payment_deadline).add(1, "month").format();
    payments.push({
      payable: payment_amount,
      paid: false,
      paymentDeadline: payment_deadline,
      paymentDate: "",
      defaults: 0,
    });
  }
  return payments;
}

function updatePaymentArray(payment_id, payment_date, order_body) {
  const newPaymentArray = order_body.payments.map((payment) => {
    if (payment._id == payment_id) {
      payment.paid = true;
      payment.paymentDate = payment_date;
      return payment;
    }
    return payment;
  });

  order_body.payments = newPaymentArray;
  return order_body;
}

function paymentStatusVerification(order_id) {}

module.exports = { formFuturePaymentDeadlines, updatePaymentArray };
