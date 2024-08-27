import { Routes, Route } from 'react-router-dom';
import './App.css';

import Login from './components/auth-pages/Login';
import Register from './components/auth-pages/NewUser';
import Unauthorized from './components/auth-pages/UnauthorizedAccess';
import Profile from './components/auth-pages/Profile';

import AdminDashboard from './components/admin-pages/AdminDashboard';
import CustomersTable from './components/admin-pages/CustomerTable';
import AccountsTable from './components/admin-pages/AccountTable';
import BanksCard from './components/admin-pages/BankCards';
import AccountsCard from './components/admin-pages/AccountCards';
import TransactionsTable from './components/admin-pages/TransactionTable';
import NewAccount from './components/admin-pages/NewAccount';

import CustomerDashboard from './components/customer-pages/CustomerDashboard';
import MyAccounts from './components/customer-pages/MyAccounts';
import MyTransactions from './components/customer-pages/MyTransactions';
import NewTransaction from './components/customer-pages/NewTransaction';


function App() {
  return (
          <Routes>
            <Route exact path='/login' element={<Login />}></Route>
            <Route exact path='/new-customer' element={<Register role={"customer"}/>}></Route>
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/profile" element={<Profile />}></Route>
            
      
            <Route path="/customer-dashboard" element={<CustomerDashboard />} />
            <Route exact path='/myaccounts' element={<MyAccounts />}></Route>
            <Route exact path="/myaccounts/:id/transactions" element ={<MyTransactions />}></Route>
            <Route exact path="/new-transaction" element ={<NewTransaction />}></Route>


            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route exact path='/customers' element={<CustomersTable />}></Route>
            <Route exact path='/accounts' element={<AccountsTable all={"true"}/>}></Route>
            <Route exact path='/transactions' element={<TransactionsTable />}></Route>
            <Route exact path='/banks' element={<BanksCard />}></Route>
            <Route exact path='/banks/:bank_id/accounts' element={<AccountsTable/>}></Route>
            <Route exact path="/customers/:id/accounts" element={<AccountsCard />}></Route>
            <Route exact path="/accounts/:id/transactions" element={<TransactionsTable />}></Route>
            <Route exact path="/new-account" element={<NewAccount />}></Route>
            <Route exact path='/new-admin' element={<Register role={"admin"}/>}></Route>


            <Route exact path='' element={<Login />}></Route>
          </Routes>
  );
}

export default App;
