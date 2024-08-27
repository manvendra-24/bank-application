import React from 'react';
import { Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { activateAccount, deactivateAccount } from '../services/AccountService';
import {activateCustomer, deactivateCustomer} from '../services/CustomerService';

import TableButton from './TableButton';

const TableData = ({ data, accountStatus, customerStatus, fetchAccounts, fetchCustomers, accounts, transactions }) => {
    const navigate = useNavigate();
    const headers = Object.keys(data[0]);

    const handleAccounts = (id) => {
        navigate(`/customers/${id}/accounts`);
    };

    const handleTransactions = (id) => {
        navigate(`/accounts/${id}/transactions`);
    };

    const activeAccount = async (id) => {
        try {
            await activateAccount(id);
            fetchAccounts();
        } catch (error) {
            console.error('Error activating the account:', error);
        }
    };

    const deleteAccount = async (id) => {
        try {
            await deactivateAccount(id);
            fetchAccounts();
        } catch (error) {
            console.error('Error deactivating the account:', error);
        }
    };

    const activeCustomer = async (id) => {
      try {
          await activateCustomer(id);
          fetchCustomers();
      } catch (error) {
          console.error('Error activating the customer:', error);
      }
  };

  const deleteCustomer = async (id) => {
      try {
          await deactivateCustomer(id);
          fetchCustomers();
      } catch (error) {
          console.error('Error deactivating the customer:', error);
      }
  };

    return (
        <Table striped bordered>
            <thead>
                <tr>
                    {headers.map((header, index) => (
                        <th key={index}>{header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {headers.map((header, colIndex) => (
                            <td key={colIndex}>
                                {typeof row[header] === 'object' && row[header] !== null
                                    ? JSON.stringify(row[header])
                                    : typeof row[header] === 'boolean'
                                    ? row[header] ? 'YES' : 'NO'
                                    : row[header]
                                }
                            </td>
                        ))}



                        {accounts && (
                            <td>
                                <TableButton onClick={() => handleAccounts(row.id)} variant="primary" text="View Accounts" />
                            </td>
                        )}
                        {transactions && (
                            <td>
                                <TableButton onClick={() => handleTransactions(row.account_number)} variant="primary" text="View Transactions" />
                            </td>
                        )}



                        {accountStatus && (
                            <td>
                                {row.active ? (
                                    <TableButton onClick={() => deleteAccount(row.account_number)} variant="danger" text="Deactivate" />
                                ) : (
                                    <TableButton onClick={() => activeAccount(row.account_number)} variant="primary" text="Activate"/>
                                )}
                            </td>
                        )}

                        {customerStatus && (
                            <td>
                                {row.active ? (
                                    <TableButton onClick={() => deleteCustomer(row.id)} variant="danger" text="Deactivate" />
                                ) : (
                                    <TableButton onClick={() => activeCustomer(row.id)} variant="primary" text="Activate"/>
                                )}
                            </td>
                        )}



                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default TableData;

