const purchaseSummary = ({ cart, calculateTotalPrice }) => {
    return (
      <div style={{
        border: '1px solid #ddd',
        borderRadius: '10px',
        padding: '20px',
        margin: '20px auto',
        textAlign: 'left',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        background: '#eaf7e2', // Light green background color
        maxWidth: '500px',
      }}>
        <h2 style={{ color: '#333', marginBottom: '15px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>Purchase Summary</h2>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {cart.map(item => (
            <li key={item.id} style={{ marginBottom: '10px', fontSize: '16px', lineHeight: '1.6' }}>
              <span style={{ fontWeight: 'bold' }}>{item.name}</span> - AU${item.discountedprice}
            </li>
          ))}
        </ul>
        <hr style={{ margin: '15px 0' }} />
        <h3 style={{ color: '#333', fontSize: '18px', marginTop: '10px' }}>Total Amount: AU${calculateTotalPrice()}</h3>
      </div>
    );
  };
  
  export default purchaseSummary;