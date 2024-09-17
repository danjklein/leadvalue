import React, { useState, useEffect } from 'react';
import { Slider } from '@/components/ui/slider';

const LeadCalculator = () => {
  const [averageTicket, setAverageTicket] = useState(250);
  const [leadsPerMonth, setLeadsPerMonth] = useState(100);
  const [profitMargin, setProfitMargin] = useState(0.5);
  const [closeRate, setCloseRate] = useState(0.3);

  const [calculations, setCalculations] = useState({
    profitAfterExpenses: 0,
    totalNewCustomers: 0,
    actualLeadValue: 0,
    netMarginValueOfLead: 0,
    totalMonthlyRevenue: 0,
    totalMonthlyProfit: 0,
    chargePerLeadLow: 0,
    chargePerLeadModerate: 0,
    chargePerLeadHigh: 0,
    businessOwnerProfitLow: 0,
    businessOwnerProfitModerate: 0,
    businessOwnerProfitHigh: 0,
    monthlyBillToClientLow: 0,
    monthlyBillToClientModerate: 0,
    monthlyBillToClientHigh: 0,
  });

  useEffect(() => {
    const profitAfterExpenses = averageTicket * profitMargin;
    const totalNewCustomers = Math.round(leadsPerMonth * closeRate);
    const actualLeadValue = (averageTicket * profitMargin * closeRate) * 2;
    const netMarginValueOfLead = profitMargin * actualLeadValue;
    const totalMonthlyRevenue = averageTicket * totalNewCustomers;
    const totalMonthlyProfit = totalMonthlyRevenue * profitMargin;

    const chargePerLeadLow = netMarginValueOfLead * 0.25;
    const chargePerLeadModerate = netMarginValueOfLead * 0.325;
    const chargePerLeadHigh = netMarginValueOfLead * 0.4;

    const businessOwnerProfitLow = totalMonthlyProfit - (chargePerLeadLow * leadsPerMonth);
    const businessOwnerProfitModerate = totalMonthlyProfit - (chargePerLeadModerate * leadsPerMonth);
    const businessOwnerProfitHigh = totalMonthlyProfit - (chargePerLeadHigh * leadsPerMonth);

    const monthlyBillToClientLow = chargePerLeadLow * leadsPerMonth;
    const monthlyBillToClientModerate = chargePerLeadModerate * leadsPerMonth;
    const monthlyBillToClientHigh = chargePerLeadHigh * leadsPerMonth;

    setCalculations({
      profitAfterExpenses,
      totalNewCustomers,
      actualLeadValue,
      netMarginValueOfLead,
      totalMonthlyRevenue,
      totalMonthlyProfit,
      chargePerLeadLow,
      chargePerLeadModerate,
      chargePerLeadHigh,
      businessOwnerProfitLow,
      businessOwnerProfitModerate,
      businessOwnerProfitHigh,
      monthlyBillToClientLow,
      monthlyBillToClientModerate,
      monthlyBillToClientHigh,
    });
  }, [averageTicket, leadsPerMonth, profitMargin, closeRate]);

  const formatCurrency = (value) => `$ ${value.toFixed(2)}`;
  const formatPercentage = (value) => `${(value * 100).toFixed(0)}%`;

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Average Ticket of Product or Service?</label>
          <input
            type="number"
            value={averageTicket}
            onChange={(e) => setAverageTicket(Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Number of Leads Each Month?</label>
          <input
            type="number"
            value={leadsPerMonth}
            onChange={(e) => setLeadsPerMonth(Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
      </div>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">Profit Margin (before advertising)</label>
        <Slider
          value={[profitMargin]}
          onValueChange={(value) => setProfitMargin(value[0])}
          max={1}
          step={0.01}
        />
        <span className="text-sm text-gray-500">{formatPercentage(profitMargin)}</span>
      </div>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">Close Rate</label>
        <Slider
          value={[closeRate]}
          onValueChange={(value) => setCloseRate(value[0])}
          max={1}
          step={0.01}
        />
        <span className="text-sm text-gray-500">{formatPercentage(closeRate)}</span>
      </div>

      <div className="bg-blue-500 text-white p-4 rounded-lg grid grid-cols-3 gap-4">
        <div>
          <h3 className="text-lg font-semibold">Profit After Expenses</h3>
          <p className="text-3xl font-bold">{formatCurrency(calculations.profitAfterExpenses)}</p>
          <p className="text-sm">Net Margin Value of Lead</p>
          <p className="text-xl font-semibold">{formatCurrency(calculations.netMarginValueOfLead)}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Total New Customers</h3>
          <p className="text-3xl font-bold">{calculations.totalNewCustomers}</p>
          <p className="text-sm">Total Monthly Revenue</p>
          <p className="text-xl font-semibold">{formatCurrency(calculations.totalMonthlyRevenue)}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Actual Lead Value</h3>
          <p className="text-3xl font-bold">{formatCurrency(calculations.actualLeadValue)}</p>
          <p className="text-sm">Total Monthly Profit</p>
          <p className="text-xl font-semibold">{formatCurrency(calculations.totalMonthlyProfit)}</p>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">What Should You Charge Per Lead?</h3>
        <div className="bg-blue-500 text-white p-4 rounded-lg grid grid-cols-3 gap-4">
          <div>
            <p className="text-sm">Low</p>
            <p className="text-2xl font-bold">{formatCurrency(calculations.chargePerLeadLow)}</p>
          </div>
          <div>
            <p className="text-sm">Moderate</p>
            <p className="text-2xl font-bold">{formatCurrency(calculations.chargePerLeadModerate)}</p>
          </div>
          <div>
            <p className="text-sm">High</p>
            <p className="text-2xl font-bold">{formatCurrency(calculations.chargePerLeadHigh)}</p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">What Would the Monthly Profit be for the Business Owner?</h3>
        <div className="bg-blue-500 text-white p-4 rounded-lg grid grid-cols-3 gap-4">
          <div>
            <p className="text-sm">Low</p>
            <p className="text-2xl font-bold">{formatCurrency(calculations.businessOwnerProfitLow)}</p>
          </div>
          <div>
            <p className="text-sm">Moderate</p>
            <p className="text-2xl font-bold">{formatCurrency(calculations.businessOwnerProfitModerate)}</p>
          </div>
          <div>
            <p className="text-sm">High</p>
            <p className="text-2xl font-bold">{formatCurrency(calculations.businessOwnerProfitHigh)}</p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Monthly Bill to Client:</h3>
        <div className="bg-blue-500 text-white p-4 rounded-lg grid grid-cols-3 gap-4">
          <div>
            <p className="text-sm">Low</p>
            <p className="text-2xl font-bold">{formatCurrency(calculations.monthlyBillToClientLow)}</p>
          </div>
          <div>
            <p className="text-sm">Moderate</p>
            <p className="text-2xl font-bold">{formatCurrency(calculations.monthlyBillToClientModerate)}</p>
          </div>
          <div>
            <p className="text-sm">High</p>
            <p className="text-2xl font-bold">{formatCurrency(calculations.monthlyBillToClientHigh)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadCalculator;
