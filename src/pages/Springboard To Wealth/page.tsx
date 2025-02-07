
import React, { useState, useEffect } from 'react';
import './style.css';
import Header from '@/layout/DefaultLayout';
const TableDisplay: React.FC = () => {
  const [purchasePrice, setPurchasePrice] = useState("");
  const [costPerSqFt, setCostPerSqFt] = useState("");
  const [sqFootage, setSqFootage] = useState("");
  const [finishedValue, setFinishedValue] = useState("");
  const [salesPropertyPercent, setSalesPropertyPercent] = useState("");
  const [expectedCarry, setExpectedCarry] = useState("");
  const [UtilitiesInsurance, setUtilitiesInsurance] = useState("");
  const [HardmoneyDown] = useState("");
  const [Hardmoneyfees, setHardmoneyfees] = useState("");
  // const [HardMoneyPoints, ] = useState("");
  const [Reserve, setReserve] = useState("");
  const [InterestRate, setInterestRate] = useState("");
  const [LoanDown, setLoanDown] = useState("");
  const [Points, setPoints] = useState("");
  const [Equity, setEquity] = useState("");
  const [LoanTerm, setLoanTerm] = useState("");
  const [InterestRate2, setInterestRate2] = useState("");
  const [TaxAnual, setTaxAnual] = useState("");
  const [Insurance, setInsurance] = useState("");
  const [HOA, setHOA] = useState("");
  const [MonthlyRent, setMonthlyRent] = useState("");
  const [PropertyManagement1, setPropertyManagement1] = useState("");
  const [selectedDescription, setSelectedDescription] = useState<string | null>(null);

  const [results, setResults] = useState({
    totalBudget: 0,
    projectCosts: 0,
    salesPropertyCosts: 0,
    potentialProfit: 0,
    potentialProfitPercent: 0,
    landCostPercent: 0,
    combinedCostPercent: 0,
    utilitesInsuranceCalc: 0,
    hardMoneyPaymentCalc: 0,
    CarryCostSubtotal: 0,
    HardMoneyPrincipalCalc: 0,
    HardmoneyDownCalc: 0,
    HardMoneyPointsCalc: 0,
    HardMoneyFeesCalc: 0,
    TotalDownCalc: 0,
    ReserveCalc: 0,
    CashOnHandCalc: 0,
    LoanAmountCalc: 0,
    AppraisedValueCalc: 0,
    EquityAmountCalc: 0,
    MonthlyPrincipal: 0,
    MonthlyPayment: 0,
    PropertyManagentCalc: 0,
    MortageCalc: 0,
    CashFlowCalc: 0,
  });

  const formatNumber = (value: string): string => {
    const numericValue = value.replace(/\D/g, "");
    return new Intl.NumberFormat("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(Number(numericValue) / 100);
  };

  const calculate = () => {
    const parseValue = (value: string) => parseFloat(value.replace(/\./g, "").replace(",", ".")) || 0;
  
    const purchasePriceNum = parseValue(purchasePrice);
    const costPerSqFtNum = parseValue(costPerSqFt);
    const sqFootageNum = parseValue(sqFootage);
    const finishedValueNum = parseValue(finishedValue);
    const salesPropertyPercentNum = parseValue(salesPropertyPercent);
    const expectedCarryNum = parseValue(expectedCarry);
    const UtilitiesInsuranceNum = parseValue(UtilitiesInsurance);
    // const HardmoneyDownNum = parseValue(HardmoneyDown);
    // const HardMoneyPointsNum = parseValue(HardMoneyPoints);
    // const HardmoneyfeesNum = parseValue(Hardmoneyfees);
    const ReserveNum = parseValue(Reserve);
    const InterestRateNum = parseValue(InterestRate);
    const InterestRateNum2 = parseValue(InterestRate2);
    const LoanDownNum = parseValue(LoanDown);
    const PointsNum = parseValue(Points);
    const EquityNum = parseValue(Equity);
    const LoanTermNum = parseValue(LoanTerm);
    // const InterestRate2Num = parseValue(InterestRate2);
    const TaxAnualNum = parseValue(TaxAnual);
    const InsuranceNum = parseValue(Insurance);
    const HOANum = parseValue(HOA);
    const MonthlyRentNum = parseValue(MonthlyRent);
    const PropertyManagement1Num = parseValue(PropertyManagement1);
  
    const totalBudget = sqFootageNum * costPerSqFtNum;
    const projectCosts = totalBudget + purchasePriceNum;
    const salesPropertyCosts = finishedValueNum * (salesPropertyPercentNum / 100);
    const potentialProfit = finishedValueNum - salesPropertyCosts - projectCosts;
    const potentialProfitPercent = (potentialProfit / finishedValueNum) * 100;
    
    const landCostPercent = (purchasePriceNum / finishedValueNum) * 100;
    
    const combinedCostPercent = (projectCosts / finishedValueNum) * 100;
  
    const utilitesInsuranceCalc = expectedCarryNum * UtilitiesInsuranceNum;
    
    const HardMoneyPrincipalCalc = projectCosts - (projectCosts * (LoanDownNum / 100));
    
    const hardMoneyPaymentCalc = ((HardMoneyPrincipalCalc * (InterestRateNum / 100)) / 12);
    
    const CarryCostSubtotal = (hardMoneyPaymentCalc * expectedCarryNum) + utilitesInsuranceCalc;
    
    const HardmoneyDownCalc = projectCosts * (LoanDownNum / 100);
  
    const HardMoneyPointsCalc = (PointsNum / 100) * (projectCosts - HardmoneyDownCalc);
    
    const HardMoneyFeesCalc = HardMoneyPrincipalCalc * 0.01;
    
    const TotalDownCalc = HardmoneyDownCalc + HardMoneyPointsCalc + HardMoneyFeesCalc;
    
    const ReserveCalc = (ReserveNum / 100) * totalBudget;
    
    const CashOnHandCalc = (hardMoneyPaymentCalc * expectedCarryNum) + HardmoneyDownCalc + HardMoneyPointsCalc + HardMoneyFeesCalc + ReserveCalc + utilitesInsuranceCalc;
  
    const LoanAmountCalc = finishedValueNum - ((EquityNum / 100) * finishedValueNum);
  
    const AppraisedValueCalc = finishedValueNum;

  
    const EquityAmountCalc = ((EquityNum / 100) * (AppraisedValueCalc));
  
    const EquityPercent = (EquityNum/100)
    
    const MonthlyPrincipal = (finishedValueNum - (finishedValueNum * EquityPercent)) * (((InterestRateNum2) / 100) / 12) / (1 - Math.pow(1 + (InterestRateNum2 / (100 * 12)), -(LoanTermNum * 12)));

    const MonthlyPayment = MonthlyPrincipal + (TaxAnualNum / 12) + (InsuranceNum / 12) + HOANum;
  
    const PropertyManagentCalc = MonthlyRentNum * (PropertyManagement1Num / 100);
    
    const MortageCalc = MonthlyPayment;
  
    const CashFlowCalc = MonthlyRentNum - PropertyManagentCalc - MortageCalc;
    
    
    setResults({
      totalBudget,
      projectCosts,
      salesPropertyCosts,
      potentialProfit,
      potentialProfitPercent,
      landCostPercent,
      combinedCostPercent,
      utilitesInsuranceCalc,
      hardMoneyPaymentCalc,
      CarryCostSubtotal,
      HardMoneyPrincipalCalc,
      HardmoneyDownCalc,
      HardMoneyPointsCalc,
      HardMoneyFeesCalc,
      TotalDownCalc,
      ReserveCalc,
      CashOnHandCalc,
      LoanAmountCalc,
      AppraisedValueCalc,
      EquityAmountCalc,
      MonthlyPrincipal,
      MonthlyPayment,
      PropertyManagentCalc,
      MortageCalc,
      CashFlowCalc,
    });
  };

  const descriptions = {
    purchasePrice: "Price of the land including all commissions. The amount the buyer needs to write a check for.",
    costPerSqFt: "Use an all in # here - Flips 40 to 150 in Seattle, New Construction 200-250. See Scope tab for more info.",
    sqFootage: "Total building Sq footage.",
    finishedValue: "What will it sell for based on comps today.",
    totalBudget: "Construction Costs × Total Sq Footage. This should typically represent 40 to 50% of the ARV for new construction.",
    projectCosts: "Land costs plus total construction costs. For new construction, it should be 65 to 75% of the ARV, and up to 80% for flips.",
    landCostPercent: "The percentage of the land cost relative to the finished project value (ARV).",
    combinedCostPercent: "The total costs, including land and construction, as a percentage of the finished value of the project.",
    salesPropertyCosts: "Includes agent fees (6%) and closing costs (2%). Typically, 8% of the total finished value.",
    potentialProfit: "Potential profit in dollars and percentage without carry costs (e.g., financing costs). Builders usually aim for 15% or more profit."
  };
  

  function Tooltip({ message }: { message: string }) {
    return (
      <div className="absolute -top-10 left-0 w-64 p-2 bg-gray text-black text-sm rounded shadow-lg z-10">
        {message}
      </div>
    );
  }

  useEffect(() => {
    calculate();
  }, [purchasePrice, costPerSqFt, sqFootage, finishedValue, salesPropertyPercent, expectedCarry, UtilitiesInsurance, HardmoneyDown, InterestRate, LoanDown, Points, Reserve]);

  return (
    <Header>
    <div className="p-6">

        <div className="flex flex-wrap">
        <div className="w-full md:w-1/2 lg:w-1/2 px-3 mb-6">
        <div className="p-6 shadow-lg rounded-lg py-11">
  <h2 className="text-xl font-semibold text-gray-800 mb-4">SPRINGBOARD TO WEALTH DEAL ANALYSIS CALCULATOR</h2>
  <table className="w-full border-collapse font-helvetica" >
    <thead>
      <tr>
        <th className="text-left py-3 px-4 bg-gray-100 font-bold border-b border-gray-200 ">Field</th>
        <th className="text-left py-3 px-4 bg-gray-100 font-bold border-b border-gray-200 ">Input</th>
      </tr>
    </thead>
    <tbody>
      {/* Campo 1 */}
      <tr className="relative">
        <td className="py-5 px-4 border-b border-gray-200 flex items-center">
          <div className="flex flex-col">
            <span
              className="ml-2 text-black  flex items-center cursor-pointer"
              onClick={() =>
                setSelectedDescription(
                  selectedDescription === descriptions.purchasePrice ? null : descriptions.purchasePrice
                )
              }
            >
              Purchase Price
            </span>
            <span className="ml-2 text-xs text-gray-500 mt-1 font-semibold">Click to view description</span>
          </div>
          {selectedDescription === descriptions.purchasePrice && (
            <Tooltip message={descriptions.purchasePrice} />
          )}
        </td>
        <td className="py-1 px-4 border-b border-gray-200">
          <input
            type="text"
            value={purchasePrice}
            onChange={(e) => setPurchasePrice(formatNumber(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="$"
          />
        </td>
      </tr>

      {/* Campo 2 */}
      <tr className="relative">
        <td className="py-5 px-4 border-b border-gray-200 flex items-center">
          <div className="flex flex-col">
            <span
              className="ml-2 text-black  flex items-center cursor-pointer"
              onClick={() =>
                setSelectedDescription(
                  selectedDescription === descriptions.costPerSqFt ? null : descriptions.costPerSqFt
                )
              }
            >
              Construction costs per sq ft
            </span>
            <span className="ml-2 text-xs text-gray-500 mt-1 font-semibold">Click to view description</span>
          </div>
          {selectedDescription === descriptions.costPerSqFt && (
            <Tooltip message={descriptions.costPerSqFt} />
          )}
        </td>
        <td className="py-1 px-4 border-b border-gray-200">
          <input
            type="text"
            value={costPerSqFt}
            onChange={(e) => setCostPerSqFt(formatNumber(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="$"
          />
        </td>
      </tr>

      {/* Campo 3 */}
      <tr className="relative">
        <td className="py-5 px-4 border-b border-gray-200 flex items-center">
          <div className="flex flex-col">
            <span
              className="ml-2 text-black  flex items-center cursor-pointer"
              onClick={() =>
                setSelectedDescription(
                  selectedDescription === descriptions.sqFootage ? null : descriptions.sqFootage
                )
              }
            >
              Total building Sq footage (ft)
            </span>
            <span className="ml-2 text-xs text-gray-500 mt-1 font-semibold">Click to view description</span>
          </div>
          {selectedDescription === descriptions.sqFootage && (
            <Tooltip message={descriptions.sqFootage} />
          )}
        </td>
        <td className="py-1 px-4 border-b border-gray-200">
          <input
            type="text"
            value={sqFootage}
            onChange={(e) => setSqFootage(formatNumber(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="ft"
          />
        </td>
      </tr>

      {/* Campo 4 */}
      <tr className="relative">
        <td className="py-5 px-4 border-b border-gray-200 flex items-center">
          <div className="flex flex-col">
            <span
              className="ml-2 text-black  flex items-center cursor-pointer"
              onClick={() =>
                setSelectedDescription(
                  selectedDescription === descriptions.finishedValue ? null : descriptions.finishedValue
                )
              }
            >
              Finished Value of Project
            </span>
            <span className="ml-2 text-xs text-gray-500 mt-1 font-semibold">Click to view description</span>
          </div>
          {selectedDescription === descriptions.finishedValue && (
            <Tooltip message={descriptions.finishedValue} />
          )}
        </td>
        <td className="py-1 px-4 border-b border-gray-200">
          <input
            type="text"
            value={finishedValue}
            onChange={(e) => setFinishedValue(formatNumber(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="$"
          />
        </td>
      </tr>
    </tbody>
  </table>
</div>


</div>

    
          <div className="w-full md:w-1/2 lg:w-1/2 px-3 mb-6">
<div className="p-6 shadow-lg rounded-lg">
  <h2 className="text-xl font-semibold text-gray-800 mb-4 uppercase">Results</h2>

  <table className="w-full border-collapse font-helvetica">
    <tbody>
      {/* Total Construction Budget */}
      <tr className="relative">
        <td className="py-5 px-4 border-b border-gray-200 flex items-center">
          <div className="flex flex-col">
            <span
              className="cursor-pointer text-black font-semibold flex items-center"
              onClick={() =>
                setSelectedDescription(
                  selectedDescription === descriptions.totalBudget
                    ? null
                    : descriptions.totalBudget
                )
              }
            >
              Total Construction Budget
            </span>
            <span className="ml-2 text-xs text-gray-500 mt-1 font-semibold">Click to view description</span>
          </div>
          {selectedDescription === descriptions.totalBudget && (
            <Tooltip message={descriptions.totalBudget} />
          )}
        </td>
        <td className="py-3 px-4 border-b border-gray-200 font-bold text-gray-700">
          ${results.totalBudget.toFixed(2)}
        </td>
      </tr>

      {/* Project Costs */}
      <tr className="relative">
        <td className="py-3 px-4 border-b border-gray-200 flex items-center">
          <div className="flex flex-col">
            <span
              className="cursor-pointer text-black font-semibold flex items-center"
              onClick={() =>
                setSelectedDescription(
                  selectedDescription === descriptions.projectCosts
                    ? null
                    : descriptions.projectCosts
                )
              }
            >
              Project Costs
            </span>
            <span className="ml-2 text-xs text-gray-500 mt-1 font-semibold">Click to view description</span>
          </div>
          {selectedDescription === descriptions.projectCosts && (
            <Tooltip message={descriptions.projectCosts} />
          )}
        </td>
        <td className="py-3 px-4 border-b border-gray-200 font-bold text-gray-700">
          ${results.projectCosts.toFixed(2)}
        </td>
      </tr>

      {/* Land Cost as a % of Finished Value */}
      <tr className="relative">
        <td className="py-3 px-4 border-b border-gray-200 flex items-center">
          <div className="flex flex-col">
            <span
              className="cursor-pointer text-black font-semibold flex items-center"
              onClick={() =>
                setSelectedDescription(
                  selectedDescription === descriptions.landCostPercent
                    ? null
                    : descriptions.landCostPercent
                )
              }
            >
              Land Cost as a % of Finished Value
            </span>
            <span className="ml-2 text-xs text-gray-500 mt-1 font-semibold">Click to view description</span>
          </div>
          {selectedDescription === descriptions.landCostPercent && (
            <Tooltip message="The percentage of the land cost relative to the finished project value (ARV)." />
          )}
        </td>
        <td className="py-3 px-4 border-b border-gray-200 font-bold text-gray-700">
          {results.landCostPercent.toFixed(2)}%
        </td>
      </tr>

      {/* Combined Cost as a % of Finished Value */}
      <tr className="relative">
        <td className="py-3 px-4 border-b border-gray-200 flex items-center">
          <div className="flex flex-col">
            <span
              className="cursor-pointer text-black font-semibold flex items-center"
              onClick={() =>
                setSelectedDescription(
                  selectedDescription === descriptions.combinedCostPercent
                    ? null
                    : descriptions.combinedCostPercent
                )
              }
            >
              Combined Cost as a % of Finished Value
            </span>
            <span className="ml-2 text-xs text-gray-500 mt-1 font-semibold">Click to view description</span>
          </div>
          {selectedDescription === descriptions.combinedCostPercent && (
            <Tooltip message="The total costs, including land and construction, as a percentage of the finished value of the project." />
          )}
        </td>
        <td className="py-3 px-4 border-b border-gray-200 font-bold text-gray-700">
          {results.combinedCostPercent.toFixed(2)}%
        </td>
      </tr>

      {/* Sales and Property Costs */}
      <tr className="relative">
        <td className="py-3 px-4 border-b border-gray-200 flex items-center">
          <div className="flex flex-col">
            <span
              className="cursor-pointer text-black font-semibold flex items-center"
              onClick={() =>
                setSelectedDescription(
                  selectedDescription === descriptions.salesPropertyCosts
                    ? null
                    : descriptions.salesPropertyCosts
                )
              }
            >
              Sales and Property Costs
            </span>
            <span className="ml-2 text-xs text-gray-500 mt-1 font-semibold">Click to view description</span>
          </div>
          {selectedDescription === descriptions.salesPropertyCosts && (
            <Tooltip message="Includes agent fees (6%) and closing costs (2%). Typically, 8% of the total finished value." />
          )}
        </td>
        <td className="py-1 px-4 items-center border-b border-gray-200">
          <span className="font-bold text-gray-700 mr-2">
            ${results.salesPropertyCosts.toFixed(2)}
          </span>
          <input
            type="text"
            value={salesPropertyPercent}
            onChange={(e) => setSalesPropertyPercent(formatNumber(e.target.value))}
            className="px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-15"
            placeholder="%"
          />
        </td>
      </tr>

      {/* Potential Profit */}
      <tr className="relative">
        <td className="py-3 px-4 border-b border-gray-200 flex items-center">
          <div className="flex flex-col">
            <span
              className="cursor-pointer text-black font-semibold flex items-center"
              onClick={() =>
                setSelectedDescription(
                  selectedDescription === descriptions.potentialProfit
                    ? null
                    : descriptions.potentialProfit
                )
              }
            >
              Potential Profit
            </span>
            <span className="ml-2 text-xs text-gray-500 mt-1 font-semibold">Click to view description</span>
          </div>
          {selectedDescription === descriptions.potentialProfit && (
            <Tooltip message="Potential profit in dollars and percentage without carry costs (e.g., financing costs). Builders usually aim for 15% or more profit." />
          )}
        </td>
        <td className="py-3 px-4 items-center border-b border-gray-200">
          <span className="font-bold text-gray-700 mr-2">
            ${results.potentialProfit.toFixed(2)}
          </span>
          <span
            className={`px-3 py-2 rounded-md text-white ${
              results.potentialProfitPercent < 15 || isNaN(results.potentialProfitPercent)
                ? 'bg-red-500'
                : 'bg-[#44C63A]'
            }`}
          >
            {(isNaN(results.potentialProfitPercent) ? 0 : results.potentialProfitPercent).toFixed(2)}%
          </span>
        </td>
      </tr>
    </tbody>
  </table>
</div>

          </div>

    
          <div className="w-full md:w-full lg:w-1/2 px-3 mb-6 ">
        <div className="p-6 shadow-lg rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 uppercase">Carry Costs</h2>
              <table className="w-full border-collapse font-helvetica">
                <thead>
                  <tr>
                    <th className="text-left py-3 px-4 bg-gray-100 font-bold border-b border-gray-200">Description</th>
                    <th className="text-left py-3 px-4 bg-gray-100 font-bold border-b border-gray-200">Value ($)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-3 px-4 border-b border-gray-200">Expected Carry (months)</td>
                    <td className="py-3 px-4 border-b border-gray-200">
                      <input type="text" value={expectedCarry} onChange={(e) => setExpectedCarry(formatNumber(e.target.value))} className="w-30 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="months" />
                    </td>
                    
                  </tr>
                  <tr>
                    <td className="py-3 px-4 border-b border-gray-200">Utilities/Insurance/Fees (monthly)</td>
                    <td className="py-3 px-4 border-b border-gray-200 font-bold text-gray-700">${results.utilitesInsuranceCalc.toFixed(2)} <input type="text" value={UtilitiesInsurance} onChange={(e) => setUtilitiesInsurance(formatNumber(e.target.value))} className="w-30 ml-2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="$" /></td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 border-b border-gray-200">Hard money payment</td>
                      
                
                    <td className="py-3 px-4 border-b border-gray-200 font-bold text-gray-700">${results.hardMoneyPaymentCalc.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 border-b border-gray-200 font-bold">Carry Cost Subtotal</td>
                    <td className="py-3 px-4 border-b border-gray-200 font-bold text-gray-700">${results.CarryCostSubtotal.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 border-b border-gray-200">Hard money principal</td>
                      
                 
                    <td className="py-3 px-4 border-b border-gray-200 font-bold text-gray-700">${results.HardMoneyPrincipalCalc.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 border-b border-gray-200">Hard money down $</td>
                      
                
                    <td className="py-3 px-4 border-b border-gray-200 font-bold text-gray-700">${results.HardmoneyDownCalc.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 border-b border-gray-200">Hard money points</td>
                      
                
                    <td className="py-3 px-4 border-b border-gray-200 font-bold text-gray-700">${results.HardMoneyPointsCalc.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 border-b border-gray-200">Hard money fees</td>
               
                    <td className="py-3 px-4 border-b border-gray-200 font-bold text-gray-700">${results.HardMoneyFeesCalc.toFixed(2)}           <input
                        type="text"
                        value={`${Hardmoneyfees}%`}
                        onChange={(e) => {
                          const value = e.target.value.replace('%', '').trim(); // Remove '%' antes de atualizar
                          if (!isNaN(parseFloat(value)) && value !== '') {
                            setHardmoneyfees(formatNumber(value)); // Atualiza o estado como número
                          }
                        }}
                       className="w-30 ml-2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="%"
                      /></td>
                    
           
                 
                  
                  </tr>
                  <tr>
                    <td className="py-3 px-4 border-b border-gray-200">Total Down</td>
                    
                    <td className="py-3 px-4 border-b border-gray-200 font-bold text-gray-700">${results.TotalDownCalc.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 border-b border-gray-200">Reserve</td>
               <td className="py-3 px-4 border-b border-gray-200 font-bold text-gray-700">${results.ReserveCalc.toFixed(2)}      <input
                        type="text"
                        value={`${Reserve}%`}
                        onChange={(e) => {
                          const value = e.target.value.replace('%', '').trim(); // Remove '%' antes de atualizar
                          if (!isNaN(parseFloat(value)) && value !== '') {
                            setReserve(formatNumber(value)); // Atualiza como número
                          }
                        }}
                        className="w-30 ml-2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="%"
                      /></td>
                
                   
                  </tr>
                  <tr>
                    <td className="py-3 px-4 border-b border-gray-200 font-bold">Cash On Hand</td>
                      
                    
                    <td className="py-3 px-4 border-b border-gray-200 font-bold text-gray-700">${results.CashOnHandCalc.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
    
          <div className="w-full md:w-1/2 lg:w-1/2 px-3 mb-6">
            <div className="p-6 shadow-lg rounded-lg">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 uppercase">Takedown/Hard Money</h2>
              <table className="w-full border-collapse font-helvetica">
                <thead>
                  <tr>
                    <th className="text-left py-3 px-4 bg-gray-100 font-bold border-b border-gray-200">Description</th>
                    <th className="text-left py-3 px-4 bg-gray-100 font-bold border-b border-gray-200">Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-3 px-4 border-b border-gray-200">Interest Rate (%)</td>
                    <input type="text" value={InterestRate} onChange={(e) => setInterestRate(formatNumber(e.target.value))} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="$" />
                  </tr>
                  <tr>
                    <td className="py-3 px-4 border-b border-gray-200">Loan Amount</td>
                    <td className="py-3 px-4 border-b border-gray-200 font-bold text-gray-700">${results.LoanAmountCalc.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 border-b border-gray-200">Loan Down (%)</td>
                    <input type="text" value={LoanDown} onChange={(e) => setLoanDown(formatNumber(e.target.value))} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="$" />
                  </tr>
                  <tr>
                    <td className="py-3 px-4 border-b border-gray-200">Points</td>
                    <input type="text" value={Points} onChange={(e) => setPoints(formatNumber(e.target.value))} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="$" />
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="p-6 shadow-lg rounded-lg">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 uppercase">TAKEOUT/REFINANCE Mortgage Calculator</h2>
              <table className="w-full border-collapse font-helvetica">
                <thead>
                  <tr>
                    <th className="text-left py-3 px-4 bg-gray-100 font-bold border-b border-gray-200">Description</th>
                    <th className="text-left py-3 px-4 bg-gray-100 font-bold border-b border-gray-200">Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-3 px-4 border-b border-gray-200">Appraised Value/ARV</td>
                    <td className="py-3 px-4 border-b border-gray-200 font-bold text-gray-700">${results.AppraisedValueCalc.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 border-b border-gray-200">Equity %</td>
                    <input type="text" value={Equity} onChange={(e) => setEquity(formatNumber(e.target.value))} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="$" />
                  </tr>
                  <tr>
                    <td className="py-3 px-4 border-b border-gray-200">Equity Amount/Down</td>
                    <td className="py-3 px-4 border-b border-gray-200 font-bold text-gray-700">${results.EquityAmountCalc.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 border-b border-gray-200">Loan Amount</td>
                    <td className="py-3 px-4 border-b border-gray-200 font-bold text-gray-700">${results.LoanAmountCalc.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 border-b border-gray-200">Loan TERM (Years)</td>
                    <input type="text" value={LoanTerm} onChange={(e) => setLoanTerm(formatNumber(e.target.value))} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="$" />
                  </tr>
                  <tr>
                    <td className="py-3 px-4 border-b border-gray-200">INTEREST RATE (%)</td>
                    <input type="text" value={InterestRate2} onChange={(e) => setInterestRate2(formatNumber(e.target.value))} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="$" />
                  </tr>
                  <tr>
                    <td className="py-3 px-4 border-b border-gray-200">Monthly Principal + Interest</td>
                    <td className="py-3 px-4 border-b border-gray-200 font-bold text-gray-700">
                      ${isNaN(results.MonthlyPrincipal) ? 0 : results.MonthlyPrincipal.toFixed(2)}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 border-b border-gray-200">TAX (Annual)</td>
                    <input type="text" value={TaxAnual} onChange={(e) => setTaxAnual(formatNumber(e.target.value))} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="$" />
                  </tr>
                  <tr>
                    <td className="py-3 px-4 border-b border-gray-200">INSURANCE (Annual)</td>
                    <input type="text" value={Insurance} onChange={(e) => setInsurance(formatNumber(e.target.value))} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="$" />
                  </tr>
                  <tr>
                    <td className="py-3 px-4 border-b border-gray-200">HOA (Monthly)</td>
                    <input type="text" value={HOA} onChange={(e) => setHOA(formatNumber(e.target.value))} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="$" />
                  </tr>
                  <tr>
                    <td className="py-3 px-4 border-b border-gray-200">Monthly Payment (PITI)</td>
                    <td className="py-3 px-4 border-b border-gray-200 font-bold text-gray-700">
                      ${isNaN(results.MonthlyPayment) ? 0 : results.MonthlyPayment.toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-6 shadow-lg rounded-lg">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">BRRRR CASH FLOW</h2>
              <table className="w-full border-collapse font-helvetica">
                <thead>
                  <tr>
                    <th className="text-left py-3 px-4 bg-gray-100 font-bold border-b border-gray-200">Description</th>
                    <th className="text-left py-3 px-4 bg-gray-100 font-bold border-b border-gray-200">Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-3 px-4 border-b border-gray-200">Monthly Rent</td>
                    <input type="text" value={MonthlyRent} onChange={(e) => setMonthlyRent(formatNumber(e.target.value))} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="$" />
                  </tr>
                  <tr>
                    <td className="py-3 px-4 border-b border-gray-200">Property management % (usually 8-10%)</td>
                    <input type="text" value={PropertyManagement1} onChange={(e) => setPropertyManagement1(formatNumber(e.target.value))} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="$" />
                  </tr>
                  <tr>
                    <td className="py-3 px-4 border-b border-gray-200">Property Management Fees</td>
                    <td className="py-3 px-4 border-b border-gray-200 font-bold text-gray-700">${results.PropertyManagentCalc.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 border-b border-gray-200">Mortgage Payment</td>
                    <td className="py-3 px-4 border-b border-gray-200 font-bold text-gray-700">${results.MortageCalc.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 border-b border-gray-200">CASH FLOW</td>
                    <td className="py-3 px-4 border-b border-gray-200 font-bold text-gray-700">${results.CashFlowCalc.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      </Header>
  );
};

export default TableDisplay;