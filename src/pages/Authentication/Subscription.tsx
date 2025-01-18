import React from 'react';
import api from './api';

const SubscriptionPage: React.FC = () => {

  const handleCheckoutAnual = async () => {
    const email = localStorage.getItem('userEmail');
    try {
      const response = await api.post('/create-checkout-session/anual', {
        product: "Stubborn Attachments",
        price: 180.0,
        email: email,
      });
      window.location.href = response.data.checkoutUrl;
    } catch (error) {
      console.error('Checkout failed:', error);
    }
  };

  const handleCheckout = async () => {
    const email = localStorage.getItem('userEmail');
    try {
      const response = await api.post('/create-checkout-session', {
        product: "Stubborn Attachments",
        price: 20.0,
        email: email,
      });
      window.location.href = response.data.checkoutUrl;
    } catch (error) {
      console.error('Checkout failed:', error);
    }
  };


  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1a1f36, #10152a)',
        color: '#fff',
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: '400px',
          width: '100%',
          background: '#1f2438',
          padding: '2rem',
          borderRadius: '15px',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)',
        }}
      >
        <h1
          style={{
            fontSize: '1.8rem',
            fontWeight: '700',
            textAlign: 'center',
            color: '#00BFFF',
            marginBottom: '1rem',
          }}
        >
          Assinatura Premium
        </h1>
        <p
          style={{
            fontSize: '1rem',
            color: '#A0AEC0',
            textAlign: 'center',
            marginBottom: '1.5rem',
          }}
        >
          Escolha um plano e aproveite benefícios exclusivos.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Plano Mensal */}
          <div
            style={{
              background: 'linear-gradient(135deg, #2d344b, #1e2438)',
              padding: '1.5rem',
              borderRadius: '12px',
              transition: 'transform 0.2s, box-shadow 0.2s',
              cursor: 'pointer',
              boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.15)',
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.boxShadow =
                '0px 6px 15px rgba(0, 0, 0, 0.25)')
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.boxShadow =
                '0px 2px 5px rgba(0, 0, 0, 0.15)')
            }
            onClick={handleCheckout}
          >
            <h2 style={{ fontSize: '1.2rem', fontWeight: '600', color: '#00BFFF' }}>
              Plano Mensal
            </h2>
            <p style={{ fontSize: '1rem', color: '#A0AEC0', margin: '0.5rem 0' }}>
              Apenas <strong>R$20,00</strong> por mês.
            </p>
          </div>

          {/* Plano Anual */}
          <div
            style={{
              background: 'linear-gradient(135deg, #2d344b, #1e2438)',
              padding: '1.5rem',
              borderRadius: '12px',
              transition: 'transform 0.2s, box-shadow 0.2s',
              cursor: 'pointer',
              boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.15)',
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.boxShadow =
                '0px 6px 15px rgba(0, 0, 0, 0.25)')
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.boxShadow =
                '0px 2px 5px rgba(0, 0, 0, 0.15)')
            }
            onClick={handleCheckoutAnual}
          >
            <h2 style={{ fontSize: '1.2rem', fontWeight: '600', color: '#FFD700' }}>
              Plano Anual
            </h2>
            <p style={{ fontSize: '1rem', color: '#A0AEC0', margin: '0.5rem 0' }}>
              Apenas <strong>R$180,00</strong> por ano
            </p>
            <p
              style={{
                fontSize: '0.9rem',
                color: '#FFD700',
                marginTop: '0.5rem',
                fontWeight: '600',
              }}
            >
              Economize R$60,00!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;
