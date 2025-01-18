import React, { useState } from 'react';

export const CarryCostCalculator: React.FC = () => {
  // State variables for each input field
  const [purchasePrice, setPurchasePrice] = useState('');
  const [constructionCostPerSqFt, setConstructionCostPerSqFt] = useState('');
  const [totalSqFt, setTotalSqFt] = useState('');
  const [totalConstructionBudget, setTotalConstructionBudget] = useState('');
  const [projectCosts, setProjectCosts] = useState('');
  const [finishedValue, setFinishedValue] = useState('');
  const [expectedCarryMonths, setExpectedCarryMonths] = useState('');
  const [monthlyUtilities, setMonthlyUtilities] = useState('');
  const [hardMoneyPayment, setHardMoneyPayment] = useState('');
  const [carryCostSubtotal, setCarryCostSubtotal] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanAmount, setLoanAmount] = useState('');
  const [loanDownPercent, setLoanDownPercent] = useState('');
  const [points, setPoints] = useState('');
  const [reservePercent, setReservePercent] = useState('20');
  const [cashOnHand, setCashOnHand] = useState('');
  const [appraisedValue, setAppraisedValue] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [takeoutInterestRate, setTakeoutInterestRate] = useState('');
  const [carryingPeriod, setCarryingPeriod] = useState('');
  const [ltvRatio, setLtvRatio] = useState('');
  
  // Helper function to parse and format numbers
  const formatNumber = (value: string): string => {
    const numericValue = value.replace(/\D/g, '');
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(Number(numericValue) / 100);
  };

  function calculateTotalLoanAmount() {
    // Exemplo de cálculo considerando o preço de compra e os custos do projeto
    const totalLoanAmount = parseFloat(purchasePrice) + parseFloat(projectCosts);
    return totalLoanAmount || 0;
  }
  
  // Função para calcular os custos totais de manutenção
  function calculateTotalCarryCosts() {
    // Exemplo de cálculo considerando custos mensais de utilidades e pagamento de empréstimo
    const totalCarryCosts = (parseFloat(monthlyUtilities) + calculateHardMoneyPayment()) * 12; // Supondo 12 meses
    return totalCarryCosts || 0;
  }
  
  // Função para calcular o custo total do projeto
  function calculateTotalProjectCost() {
    // Exemplo de cálculo considerando custo total de construção e outros custos do projeto
    const totalProjectCost = calculateTotalConstructionBudget() + parseFloat(projectCosts);
    return totalProjectCost || 0;
  }
  
  // Função para calcular o lucro estimado
  function calculateEstimatedProfit() {
    // Exemplo de cálculo considerando valor final e custo total do projeto
    const estimatedProfit = parseFloat(finishedValue) - calculateTotalProjectCost();
    return estimatedProfit || 0;
  }
  
  // Função para calcular a margem de lucro
  function calculateProfitMargin() {
    // Exemplo de cálculo de margem de lucro
    const profitMargin = (calculateEstimatedProfit() / parseFloat(finishedValue)) * 100;
    return profitMargin || 0;
  }

  // Calculation functions based on the provided formulas
  const calculateUtilitiesFees = (): number => {
    const months = parseFloat(expectedCarryMonths.replace(',', '.')) || 0;
    const utilities = parseFloat(monthlyUtilities.replace(',', '.')) || 0;
    return months * utilities;
  };

  const calculateHardMoneyPayment = (): number => {
    const principal = parseFloat(loanAmount.replace(',', '.')) || 0;
    const rate = parseFloat(interestRate.replace(',', '.')) || 0;
    return (principal * (rate / 100)) / 12;
  };

  const calculateReserve = (): number => {
    const reserve = parseFloat(reservePercent.replace(',', '.')) || 0;
    const carryCosts = calculateUtilitiesFees();
    const hardMoneyCosts =
      calculateHardMoneyPayment() * (parseFloat(expectedCarryMonths.replace(',', '.')) || 0);
    return (reserve / 100) * (carryCosts + hardMoneyCosts);
  };

  const calculateCashFlow = (): number => {
    const monthlyRent = 4300; // Placeholder value
    const managementFees = 0.1 * monthlyRent; // 10% management fee
    const mortgagePayment = 4288.09; // Placeholder value
    return monthlyRent - managementFees - mortgagePayment;
  };

  const calculateTotalConstructionBudget = (): number => {
    const costPerSqFt = parseFloat(constructionCostPerSqFt.replace(',', '.')) || 0;
    const totalSqFtVal = parseFloat(totalSqFt.replace(',', '.')) || 0;
    return costPerSqFt * totalSqFtVal;
  };

  const calculateLoanDownPayment = (): number => {
    const price = parseFloat(purchasePrice.replace(',', '.')) || 0;
    const downPercent = parseFloat(loanDownPercent.replace(',', '.')) || 0;
    return price * (downPercent / 100);
  };

  const calculatePointsCost = (): number => {
    const loan = parseFloat(loanAmount.replace(',', '.')) || 0;
    const pointsVal = parseFloat(points.replace(',', '.')) || 0;
    return loan * (pointsVal / 100);
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded-xl shadow-md max-w-6xl">
      <h1 className="text-center text-2xl font-semibold text-gray-800 mb-4">
        Carry Cost Calculator
      </h1>

      {/* Carry Costs Table */}
      <div className="mt-4">
        <h2 className="text-lg font-semibold text-gray-800">Carry Costs</h2>
        <table className="w-full border-collapse mt-2">
          <tbody>
            <tr>
              <td className="py-2 px-4 border-b">Expected Carry Costs</td>
              <td className="py-2 px-4 border-b font-bold">
                ${calculateUtilitiesFees().toFixed(2)}
              </td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b">Utilities/Insurance/Fees (monthly)</td>
              <td className="py-2 px-4 border-b">
                <input
                  type="text"
                  value={monthlyUtilities}
                  onChange={(e) => setMonthlyUtilities(formatNumber(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b">Hard Money Payment (Monthly)</td>
              <td className="py-2 px-4 border-b font-bold">
                ${calculateHardMoneyPayment().toFixed(2)}
              </td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b">Reserve</td>
              <td className="py-2 px-4 border-b font-bold">
                ${calculateReserve().toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Additional Tables for Input and Calculations */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-800">Input Values</h2>
        <table className="w-full border-collapse mt-2">
          <tbody>
            <tr>
              <td className="py-2 px-4 border-b">Purchase Price</td>
              <td className="py-2 px-4 border-b">
                <input
                  type="text"
                  value={purchasePrice}
                  onChange={(e) => setPurchasePrice(formatNumber(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b">Construction Cost per Sq Ft</td>
              <td className="py-2 px-4 border-b">
                <input
                  type="text"
                  value={constructionCostPerSqFt}
                  onChange={(e) => setConstructionCostPerSqFt(formatNumber(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b">Total Sq Ft</td>
              <td className="py-2 px-4 border-b">
                <input
                  type="text"
                  value={totalSqFt}
                  onChange={(e) => setTotalSqFt(formatNumber(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b">Total Construction Budget</td>
              <td className="py-2 px-4 border-b font-bold">
                ${calculateTotalConstructionBudget().toFixed(2)}
              </td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b">Project Costs</td>
              <td className="py-2 px-4 border-b">
                <input
                  type="text"
                  value={projectCosts}
                  onChange={(e) => setProjectCosts(formatNumber(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b">Finished Value</td>
              <td className="py-2 px-4 border-b">
                <input
                  type="text"
                  value={finishedValue}
                  onChange={(e) => setFinishedValue(formatNumber(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b">Interest Rate (%)</td>
              <td className="py-2 px-4 border-b">
                <input
                  type="text"
                  value={interestRate}
                  onChange={(e) => setInterestRate(formatNumber(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </td>
            </tr>
           
            <tr>
              <td className="py-2 px-4 border-b">Loan Term (months)</td>
              <td className="py-2 px-4 border-b">
                <input
                  type="text"
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(formatNumber(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b">Carrying Period (months)</td>
              <td className="py-2 px-4 border-b">
                <input
                  type="text"
                  value={carryingPeriod}
                  onChange={(e) => setCarryingPeriod(formatNumber(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b">LTV Ratio (%)</td>
              <td className="py-2 px-4 border-b">
                <input
                  type="text"
                  value={ltvRatio}
                  onChange={(e) => setLtvRatio(formatNumber(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Results Section */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-800">Results</h2>
        <table className="w-full border-collapse mt-2">
          <tbody>
            <tr>
              <td className="py-2 px-4 border-b">Total Loan Amount</td>
              <td className="py-2 px-4 border-b font-bold">
                ${calculateTotalLoanAmount().toFixed(2)}
              </td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b">Total Carry Costs</td>
              <td className="py-2 px-4 border-b font-bold">
                ${calculateTotalCarryCosts().toFixed(2)}
              </td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b">Total Project Cost</td>
              <td className="py-2 px-4 border-b font-bold">
                ${calculateTotalProjectCost().toFixed(2)}
              </td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b">Estimated Profit</td>
              <td className="py-2 px-4 border-b font-bold">
                ${calculateEstimatedProfit().toFixed(2)}
              </td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b">Profit Margin (%)</td>
              <td className="py-2 px-4 border-b font-bold">
                {calculateProfitMargin().toFixed(2)}%
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
