import React, { useState, useEffect } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import api from '../Authentication/api';// Certifique-se de que api esteja configurado corretamente
import { useForm } from 'react-hook-form';
import { IoCloseSharp } from 'react-icons/io5';


interface PaymentData {
  createdAtFormatted: string;
  nextBillingInfo?: {
    date: string; // A data será uma string no formato ISO 8601, como '2024-12-06T21:02:47.000Z'
  };
}

interface WorkSchedule {
  day: string;
  id_vet: string;
  startTime: string;
  endTime: string;
  intervalMinutes: number; // Novo campo para intervalo de horários
  nome: string;
  email: string;
  password: string;
  permission: string;
}

const UsuarioTable: React.FC = () => {
  const { formState: { errors }  } = useForm<WorkSchedule>();
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);;
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  console.log(errors)
  
  
  
  
  // const openPaymentModal = () => setShowPaymentModal(true);
  
   const closePaymentModal = () => {
     setShowPaymentModal(false);
    //  setSelectedPaymentType(null);
   };

// Função para formatar a data para o formato "6 de dez. 21:02"
  function formatDate(date: string | number | Date) {
    const d = new Date(date);

    // Obtendo os componentes da data
    const day = d.getDate(); // Dia
    const month = d.toLocaleString('pt-BR', { month: 'short' }); // Mês abreviado
    const year = d.getFullYear(); // Ano
   
    // Construindo a data formatada
    return `${day} de ${month} de ${year}`;
  }

  useEffect(() => {
    const fetchPaymentData = async () => {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem('token');
      const email = localStorage.getItem('userEmail');

      if (!email) {
        setError("Email não encontrado. Por favor, faça login novamente.");
        setLoading(false);
        return;
      }

      try {
        const response = await api.get(`/subscription?email=${encodeURIComponent(email)}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        const { createdAtFormatted, nextBillingInfo } = response.data;

        // Formatar a data da próxima cobrança (nextBillingInfo.date)
        const nextBillingDateFormatted = nextBillingInfo ? formatDate(nextBillingInfo.date) : null;

        setPaymentData({
          createdAtFormatted,
          nextBillingInfo: { ...nextBillingInfo, date: nextBillingDateFormatted },
        });
      } catch (error) {
        console.error('Erro ao buscar dados de pagamento:', error);
        setError('Erro ao buscar dados de pagamento.');
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentData();
  }, []);






  const handleCheckout = async () => {
    const email = localStorage.getItem('userEmail');
    try {
      const response = await api.post('/create-checkout-session', { 
        product: "Stubborn Attachments", 
        price: 20.0,
        email: email // Enviando o e-mail ao backend
      });
      // Redirecionar diretamente para o Stripe Checkout
      window.location.href = response.data.checkoutUrl;  // Aqui o backend vai retornar a URL de checkout
    } catch (error) {
      console.error('Checkout failed:', error);
      
    }
  };

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

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Meu Perfil" />

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Informações da Assinatura */}
          <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-700 mb-4">Status da Assinatura</h2>
            {loading ? (
              <p className="text-gray-500">Carregando...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : paymentData ? (
              <>
                <p className="text-lg font-semibold text-gray-900">Plano Ativo</p>
                <p>Criado em: {(paymentData.createdAtFormatted)}</p>
                <p>Validade: {paymentData.nextBillingInfo ? paymentData.nextBillingInfo.date : 'Sem validade'}</p>
              </>
            ) : (
              <p className="text-gray-500">Nenhum dado disponível.</p>
            )}
          </div>

          {/* Atualização do plano */}
          <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-700 mb-4">Atualize seu plano</h2>
            <div className="border-t border-gray-200 pt-4">
              {/* Card Plano Anual */}

              {/* Card Plano Mensal */}
              <div className="bg-yellow-100 p-4 rounded-lg">
  <h3 className="text-lg font-semibold text-gray-900 mb-2">Plano Mensal</h3>
  <p className="text-gray-600">R$ 20,00 por mês</p>
  <button
    onClick={handleCheckout}
    className="mt-2 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-900 bg-yellow-200 hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
  >
    Escolher Plano
  </button>
</div>
              <div className="bg-blue-100 p-4 mt-5 rounded-lg">
  <h3 className="text-lg font-semibold text-gray-900 mb-2">Plano Anual</h3>
  <p className="text-gray-600">R$ 180,00 por ano</p>
  <button
    onClick={handleCheckoutAnual}
    className="mt-2 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-900 bg-yellow-200 hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
  >
    Escolher Plano
  </button>
</div>

            </div>
          </div>
        </div>


        </div>


      {/* Modal de seleção de pagamento */}
      {showPaymentModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white w-[400px] p-8 rounded-lg shadow-lg">
              <div className="flex justify-between items-center pb-4 border-b">
                <h2 className="text-xl font-bold">Selecione o Método de Pagamento</h2>
                <IoCloseSharp className="text-2xl cursor-pointer" onClick={closePaymentModal} />
              </div>
            </div>
          </div>
        )}
  
    </DefaultLayout>
  );
};

export default UsuarioTable;