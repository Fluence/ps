import { useState, useEffect } from 'react';

import { BigNumber } from 'bignumber.js';

import { apiEndpoint, smartContractAddressAgg, 
  smartContractAddress, farmTokenAddresses, farmTokenAddresses2, 
  smartContractAddress2, farm2TokenAddresses, farm2TokenAddresses2, 
  smartContractAddress3, farm3TokenAddresses, farm3TokenAddresses2, 
  smartContractAddress4, farm4TokenAddresses, farm4TokenAddresses2, 
  smartContractAddress5, farm5TokenAddresses, farm5TokenAddresses2, 
  smartContractAddress6, farm6TokenAddresses, farm6TokenAddresses2,
  smartContractAddress7, farm7TokenAddresses, farm7TokenAddresses2,
  smartContractAddress8, farm8TokenAddresses, farm8TokenAddresses2,
  smartContractAddress9, farm9TokenAddresses, farm9TokenAddresses2,
  smartContractAddress10, farm10TokenAddresses, farm10TokenAddresses2,
  tokenDecimals, tokenDecimalsId } from './data/addresses.js';

const tokenNames = Object.keys(farmTokenAddresses);
const tokenAddresses = Object.values(farmTokenAddresses);
const tokenAddresses2 = Object.values(farm2TokenAddresses);
const tokenAddresses3 = Object.values(farm3TokenAddresses);
const tokenAddresses4 = Object.values(farm4TokenAddresses);
const tokenAddresses5 = Object.values(farm5TokenAddresses);
const tokenAddresses6 = Object.values(farm6TokenAddresses);
const tokenAddresses7 = Object.values(farm7TokenAddresses);
const tokenAddresses8 = Object.values(farm8TokenAddresses);
const tokenAddresses9 = Object.values(farm9TokenAddresses);
const tokenAddresses10 = Object.values(farm10TokenAddresses);

function helperForInAndOutAmount(amount, asset) {
  const digit = tokenDecimals[asset];
  let value = amount;
  if(amount.length <= digit) {
    for (let i = 1; i <= digit - amount.length; i++) {
      value = '0' + value;
    }
    return value = '0.' + value;
  } else {
    return value / 10**digit;
  }
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default function useData() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState({contractBalance: [], transactions: []});

  useEffect(() => {
    async function fetchData() {
      try {

        // fetch farm balances

        async function fetchFarmBalances() {
          await delay(500);
          return Promise.all([
            fetch(`${apiEndpoint}/assets/balance/${smartContractAddress}`).then(r => r.json()),
            fetch(`${apiEndpoint}/assets/balance/${smartContractAddress2}`).then(r => r.json()),
            fetch(`${apiEndpoint}/assets/balance/${smartContractAddress3}`).then(r => r.json()),
            //get list of puzzle holders
            fetch(`${apiEndpoint}/addresses/balance/${smartContractAddress3}`).then(r => r.json()),
            //get balance of parent puzzle pool
            fetch(`${apiEndpoint}/assets/balance/${smartContractAddress4}`).then(r => r.json()),
            //get balance of race pool
            fetch(`${apiEndpoint}/assets/balance/${smartContractAddress5}`).then(r => r.json()),
            //get balance of Egg pool
            fetch(`${apiEndpoint}/assets/balance/${smartContractAddress6}`).then(r => r.json()),
            //get balance of Winter pool
            fetch(`${apiEndpoint}/assets/balance/${smartContractAddress7}`).then(r => r.json()),
            //get balance of WWW pool
            fetch(`${apiEndpoint}/assets/balance/${smartContractAddress8}`).then(r => r.json()),
            //get balance of MunaBNB pool
            fetch(`${apiEndpoint}/assets/balance/${smartContractAddress9}`).then(r => r.json()),
            //get balance of Ducklization pool
            fetch(`${apiEndpoint}/assets/balance/${smartContractAddress10}`).then(r => r.json()),
          ]);
        }

        const [allAssetsInContract, allAssetsInContract2, allAssetsInContract3, 
          wavesInContract3, allAssetsInContract4, allAssetsInContract5,
          allAssetsInContract6, allAssetsInContract7, allAssetsInContract8, allAssetsInContract9, allAssetsInContract10] = await fetchFarmBalances();

        const farmOneBalances = [];

        allAssetsInContract.balances.forEach(asset => {
          if(tokenAddresses.includes(asset.assetId)) {
            return farmOneBalances.push({ name: farmTokenAddresses2[asset.assetId], balance: asset.balance / 10**tokenDecimalsId[asset.assetId] });
          }
        });

        

        const farmTwoBalances = [];

        allAssetsInContract2.balances.forEach(asset => {
          if(tokenAddresses2.includes(asset.assetId)) {
            return farmTwoBalances.push({ name: farm2TokenAddresses2[asset.assetId], balance: asset.balance / 10**tokenDecimalsId[asset.assetId] });
          }
        });

        

        const farmThreeBalances = [];

        allAssetsInContract3.balances.forEach(asset => {
          if(tokenAddresses3.includes(asset.assetId)) {
            return farmThreeBalances.push({ name: farm3TokenAddresses2[asset.assetId], balance: asset.balance / 10**tokenDecimalsId[asset.assetId] });
          }
        });
        farmThreeBalances.push({name: 'waves', balance: wavesInContract3.balance / 10 ** 8});

        

        const farmFourBalances = [];

        allAssetsInContract4.balances.forEach(asset => {
          if(tokenAddresses4.includes(asset.assetId)) {
            return farmFourBalances.push({ name: farm4TokenAddresses2[asset.assetId], balance: asset.balance / 10**tokenDecimalsId[asset.assetId] });
          }
        });

        const farmFiveBalances = [];

        allAssetsInContract5.balances.forEach(asset => {
          if(tokenAddresses5.includes(asset.assetId)) {
            return farmFiveBalances.push({ name: farm5TokenAddresses2[asset.assetId], balance: asset.balance / 10**tokenDecimalsId[asset.assetId] });
          }
        });

        const farmSixBalances = [];

        allAssetsInContract6.balances.forEach(asset => {
          if(tokenAddresses6.includes(asset.assetId)) {
            return farmSixBalances.push({ name: farm6TokenAddresses2[asset.assetId], balance: asset.balance / 10**tokenDecimalsId[asset.assetId] });
          }
        });

        const farmSevenBalances = [];

        allAssetsInContract7.balances.forEach(asset => {
          if(tokenAddresses7.includes(asset.assetId)) {
            return farmSevenBalances.push({ name: farm7TokenAddresses2[asset.assetId], balance: asset.balance / 10**tokenDecimalsId[asset.assetId] });
          }
        });

        const farmEightBalances = [];

        allAssetsInContract8.balances.forEach(asset => {
          if(tokenAddresses8.includes(asset.assetId)) {
            return farmEightBalances.push({ name: farm8TokenAddresses2[asset.assetId], balance: asset.balance / 10**tokenDecimalsId[asset.assetId] });
          }
        });

        const farmNineBalances = [];

        allAssetsInContract9.balances.forEach(asset => {
          if(tokenAddresses9.includes(asset.assetId)) {
            return farmNineBalances.push({ name: farm9TokenAddresses2[asset.assetId], balance: asset.balance / 10**tokenDecimalsId[asset.assetId] });
          }
        });

        const farmTenBalances = [];

        allAssetsInContract10.balances.forEach(asset => {
          if(tokenAddresses10.includes(asset.assetId)) {
            return farmTenBalances.push({ name: farm10TokenAddresses2[asset.assetId], balance: asset.balance / 10**tokenDecimalsId[asset.assetId] });
          }
        });


        

        let contractBalance = {};
        [...farmOneBalances, 
          ...farmTwoBalances,
           ...farmThreeBalances,
            ...farmFourBalances,
             ...farmFiveBalances,
              ...farmSixBalances,
               ...farmSevenBalances,
                ...farmEightBalances,
                  ...farmNineBalances,
                    ...farmTenBalances].forEach(asset => {
          if(contractBalance[asset.name] == undefined) {
            contractBalance[asset.name] = asset.balance;
          } else {
            contractBalance[asset.name] = (BigNumber(contractBalance[asset.name]).plus(asset.balance)).toString();
            
          }
        });
        contractBalance = Object.entries(contractBalance).map(([name, balance]) => {
          return { name, balance }
        });


        
        //fetch(`${apiEndpoint}/assets/balance/${smartContractAddress}`).then(r => r.json()),
        //const transactions = await fetch(`${apiEndpoint}/transactions/address/${smartContractAddress}/limit/50`).then(r => r.json());
        //curl -X 'GET' \
        //'https://nodes.wavesnodes.com/transactions/address/3PNK5ypnPJioLmLUzfK6ezpaePHLxZd6QLj/limit/250?after=2WxGZc25m2pcX1eC8qzSjoaxTeH2avsNEbwVgcBHHKJb' \
        //-H 'accept: application/json'


        const transactions = await fetch('https://data.puzzlepedia.cc/puzzleswap-txs').then(r => r.json());
        const liquidityAddings = await fetch('https://data.puzzlepedia.cc/puzzleswap-lp').then(r => r.json());
        const volumeNumbers = await fetch('https://data.puzzlepedia.cc/puzzleswap-volumes').then(r => r.json());
        

        //const aggregatorTx = await fetch('https://data.puzzlepedia.cc/agg-tx2.json').then(r => r.json())

        await new Promise(r => setTimeout(r, 1000));
        //
        
        setData({...data, contractBalance: contractBalance, transactions, liquidityAddings, volumeNumbers});
        setLoading(false);
        setError(false);

      } catch{
        
        setError(true);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return [error, loading, data];
}