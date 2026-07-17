import React from 'react';
import { FaBoxOpen, FaHeart, FaPlus, FaSignOutAlt, FaStore } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const RoleDashboard = ({ role }) => {
  const { user, logout } = useAuth();
  const isMerchant = role === 'merchant';

  return (
    <div className="min-h-screen bg-stone-50 text-slate-800">
      <header className="border-b border-slate-200 bg-white"><div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8"><div className="flex items-center gap-3"><div className="grid h-10 w-10 place-items-center rounded-xl bg-amber-600 font-black text-white">S2S</div><span className="text-lg font-extrabold">Stock2<span className="text-amber-600">Serve</span></span></div><button onClick={logout} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-red-600"><FaSignOutAlt /> Sign out</button></div></header>
      <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8"><p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-600">{isMerchant ? 'Merchant portal' : 'Consumer portal'}</p><h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Welcome back, {user?.fullName || 'there'}.</h1><p className="mt-2 text-slate-500">{isMerchant ? 'Manage your surplus food and reach nearby customers.' : 'Find great food from local businesses near you.'}</p>
        <div className="mt-8 grid gap-5 md:grid-cols-3"><div className="rounded-2xl bg-slate-900 p-6 text-white md:col-span-2"><div className="flex items-start justify-between"><div><p className="text-sm font-semibold text-amber-300">{isMerchant ? 'Ready to share?' : 'Fresh picks nearby'}</p><h2 className="mt-2 text-2xl font-bold">{isMerchant ? 'Add today’s available items.' : 'Discover local shop offers.'}</h2></div>{isMerchant ? <FaPlus className="text-2xl text-amber-300" /> : <FaHeart className="text-2xl text-amber-300" />}</div><button className="mt-7 rounded-xl bg-amber-400 px-4 py-2.5 text-sm font-bold text-amber-950">{isMerchant ? 'Add an item' : 'Browse offers'}</button></div><div className="rounded-2xl border border-amber-100 bg-amber-50 p-6"><FaBoxOpen className="text-2xl text-amber-600" /><p className="mt-5 text-sm font-semibold text-slate-500">{isMerchant ? 'Active listings' : 'Saved offers'}</p><p className="mt-1 text-3xl font-bold text-slate-900">0</p><p className="mt-2 text-xs leading-5 text-slate-500">Your activity will appear here.</p></div></div>
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6"><div className="flex items-center gap-3"><FaStore className="text-amber-600" /><div><h2 className="font-bold text-slate-900">Your dashboard is ready</h2><p className="mt-1 text-sm text-slate-500">More dashboard tools can be added here as the application grows.</p></div></div></section>
      </main>
    </div>
  );
};

export default RoleDashboard;
