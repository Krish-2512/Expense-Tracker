import React from "react";

// import {Tooltip ,Legend,ArcElement,Chart as ChartJS } from "chart.js"
import { listTransactionApi } from "../../services/transactions/transactionServices";
import { useQuery } from "@tanstack/react-query";
import { Chart, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Doughnut} from 'react-chartjs-2';
Chart.register(ArcElement, Tooltip, Legend, Title);


const TransactionChart = () => {
const {data:transactions, isError,isFetched,error,refetch} = useQuery({
    queryFn:listTransactionApi,
    queryKey:['list-transaction']
      })
console.log(transactions)                                                                         //it process each element in the transactions array and process the output
const totals = transactions?.reduce((accumulator,transaction)=>{                                  //accumulator: an object that accumulates the totals.
        if(transaction?.type==='income') {accumulator.income+=transaction?.amount;}               //  transaction: the current transaction being processed.
        else  {accumulator.expense+=transaction?.amount;}
        return accumulator;
        
      },{income:0,expense:0})
        
console.log(totals)

//!data structure for the chart
const data = {
  labels: ["Income", "Expense"],
  datasets: [
    {
      label: "Transactions",
      data: [totals?.income, totals?.expense],
      backgroundColor: ["#36A2EB", "#FF6384"],
      borderColor: ["#36A2EB", "#FF6384"],
      borderWidth: 1,
      hoverOffset: 4,
    },
  ],
};

const options = {
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom",
      labels: {
        padding: 25,
        boxWidth: 12,
        font: {
          size: 14,
        },
      },
    },
    title: {
      display: true,
      text: "Income vs Expense",
      font: {
        size: 18,
        weight: "bold",
      },
      padding: {
        top: 10,
        bottom: 30,
      },
    },
  },
  cutout: "70%",
};

      
  return (
    <div className="my-8 p-6 bg-white rounded-lg shadow-xl border border-gray-200">
      <h1 className="text-2xl font-bold text-center mb-6">
       Your Transaction Overview
      </h1>
      <div style={{ height: "350px" }}><Doughnut data={data} options={options}   /></div>
    </div>
  );
};

export default TransactionChart;