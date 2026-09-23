import React from 'react'

// DEFECT: React.FC<any> — no prop typing
const OrderList: React.FC<any> = ({ orders, onSelect }) => {
  return (
    <div>
      <h2>Orders</h2>
      {orders.map((order: any) => (
        // DEFECT: div with onClick — not keyboard accessible, should be <button>
        <div
          key={order.id}
          onClick={() => onSelect(order.id)}
          style={{ cursor: 'pointer', padding: '8px', border: '1px solid #ccc' }}
        >
          <span>{order.id}</span>
          {/* DEFECT: dangerouslySetInnerHTML without sanitization — XSS risk */}
          <span dangerouslySetInnerHTML={{ __html: order.description }} />
        </div>
      ))}
    </div>
  )
}

export default OrderList
