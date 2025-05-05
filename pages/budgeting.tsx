// pages/budgeting.tsx
import { useState } from 'react';
import Layout from '../components/Layout';
import MyPieChart from '../components/charts/PieChart';

interface IncomeSource {
  id: string;
  name: string;
  amount: number;
}
interface Category {
  id: string;
  name: string;
  planned: number;
  spent: number;
}

export default function Budgeting() {
  const [month, setMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}`;
  });

  const [incomeSources, setIncomeSources] = useState<IncomeSource[]>([]);
  const totalExpectedIncome = incomeSources.reduce((s, i) => s + i.amount, 0);

  const [categories, setCategories] = useState<Category[]>([
    { id: '1', name: 'Auto & transport', planned: 300, spent: 250 },
    { id: '2', name: 'Household', planned: 300, spent: 250 },
    { id: '3', name: 'Dining', planned: 300, spent: 250 },
  ]);
  const totalSpent = categories.reduce((s, c) => s + c.spent, 0);
  const totalRemaining = totalExpectedIncome - totalSpent;

  return (
    <Layout active="Budgeting">
      {/* Month row */}
      <div className="mb-6">
        <div className="inline-flex items-center bg-white rounded-md shadow p-4">
          <label htmlFor="budget-month" className="mr-2 font-medium">
            Month:
          </label>
          <input
            id="budget-month"
            type="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="border rounded px-2 py-1"
            title="Select budgeting month"
          />
        </div>
      </div>

      {/* Income & Summary row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Income Sources */}
        <div className="bg-white rounded-md shadow p-6 overflow-hidden">
          <h3 className="text-lg font-semibold mb-2">Income Sources</h3>
          <form
            className="flex items-center space-x-2 mb-4"
            onSubmit={(e) => {
              e.preventDefault();
              const f = e.target as any;
              const name = f.srcName.value.trim();
              const amt = parseFloat(f.srcAmt.value) || 0;
              if (name) {
                setIncomeSources((s) => [...s, { id: Date.now().toString(), name, amount: amt }]);
                f.reset();
              }
            }}
          >
            <label htmlFor="srcName" className="sr-only">
              Source name
            </label>
            <input
              id="srcName"
              name="srcName"
              type="text"
              placeholder="Source name"
              title="Enter income source name"
              className="flex-grow border rounded px-2 py-1 min-w-[100px]"
              required
            />
            <label htmlFor="srcAmt" className="sr-only">
              Amount
            </label>
            <input
              id="srcAmt"
              name="srcAmt"
              type="number"
              step="0.01"
              placeholder="Amount"
              title="Enter income amount"
              className="w-24 border rounded px-2 py-1 text-right"
              required
            />
            <button
              type="submit"
              className="bg-green-600 text-white px-4 rounded flex-shrink-0"
              title="Add income source"
            >
              Add
            </button>
          </form>
          <ul className="space-y-2 max-h-40 overflow-auto">
            {incomeSources.length > 0 ? (
              incomeSources.map((i) => (
                <li key={i.id} className="flex justify-between">
                  <span>{i.name}</span>
                  <div className="flex items-center space-x-2">
                    <span>${i.amount.toFixed(2)}</span>
                    <button
                      onClick={() => setIncomeSources((s) => s.filter((x) => x.id !== i.id))}
                      className="text-red-500 text-xs hover:underline"
                      title={`Remove ${i.name}`}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <li className="text-gray-400 text-sm">No income sources added</li>
            )}
          </ul>
        </div>

        {/* Summary */}
        <div className="bg-white rounded-md shadow p-6 overflow-hidden">
          <h3 className="text-lg font-semibold mb-2">Summary</h3>
          <p>Expected Income: ${totalExpectedIncome.toLocaleString()}</p>
          <p>Total Spent: ${totalSpent.toLocaleString()}</p>
          <p>
            Remaining:{' '}
            <span className={totalRemaining < 0 ? 'text-red-600' : 'text-green-600'}>
              ${totalRemaining.toLocaleString()}
            </span>
          </p>
          <div className="h-40 mt-4">
            <MyPieChart
              data={[
                { name: 'Spent', value: totalSpent },
                { name: 'Remaining', value: Math.max(totalRemaining, 0) },
              ]}
            />
          </div>
        </div>
      </div>

      {/* Your Budget full-width */}
      <div className="bg-white rounded-md shadow p-6 overflow-hidden">
        <h2 className="text-xl font-semibold mb-4">Your Budget</h2>
        <form
          className="flex items-center space-x-2 mb-4 flex-wrap"
          onSubmit={(e) => {
            e.preventDefault();
            const f = e.target as any;
            const name = f.categoryName.value.trim();
            const p = parseFloat(f.categoryPlanned.value) || 0;
            if (name) {
              setCategories((c) => [
                ...c,
                { id: Date.now().toString(), name, planned: p, spent: 0 },
              ]);
              f.reset();
            }
          }}
        >
          <label htmlFor="categoryName" className="sr-only">
            New category
          </label>
          <input
            id="categoryName"
            name="categoryName"
            type="text"
            placeholder="New category"
            title="Enter new category name"
            className="flex-grow min-w-[200px] border rounded px-2 py-1"
            required
          />
          <label htmlFor="categoryPlanned" className="sr-only">
            Planned amount
          </label>
          <input
            id="categoryPlanned"
            name="categoryPlanned"
            type="number"
            step="0.01"
            placeholder="Planned $"
            title="Enter planned amount"
            className="w-24 border rounded px-2 py-1 text-right"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 rounded flex-shrink-0"
            title="Add budget category"
          >
            Add
          </button>
        </form>
        <table className="w-full">
          <thead>
            <tr>
              <th></th>
              <th className="text-left">Category</th>
              <th className="text-right">Planned ($)</th>
              <th className="text-right">Spent ($)</th>
              <th className="text-right">Remaining</th>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 ? (
              categories.map((cat) => {
                const rem = cat.planned - cat.spent;
                return (
                  <tr key={cat.id} className={rem < 0 ? 'bg-red-50' : ''}>
                    <td className="text-center">
                      <button
                        onClick={() => setCategories((c) => c.filter((x) => x.id !== cat.id))}
                        className="text-red-500 hover:underline text-xs"
                        title={`Remove ${cat.name}`}
                      >
                        Remove
                      </button>
                    </td>
                    <td className="py-2">{cat.name}</td>
                    <td className="text-right">
                      <label htmlFor={`planned-${cat.id}`} className="sr-only">
                        Planned for {cat.name}
                      </label>
                      <input
                        id={`planned-${cat.id}`}
                        type="number"
                        value={cat.planned}
                        placeholder="0"
                        title={`Enter planned amount for ${cat.name}`}
                        className="w-24 text-right border rounded px-1"
                        onChange={(e) => {
                          const v = parseFloat(e.target.value) || 0;
                          setCategories((c) =>
                            c.map((x) => (x.id === cat.id ? { ...x, planned: v } : x))
                          );
                        }}
                      />
                    </td>
                    <td className="text-right">{cat.spent.toFixed(2)}</td>
                    <td className={`text-right ${rem < 0 ? 'text-red-600' : 'text-green-600'}`}>
                      {rem.toFixed(2)}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={5} className="text-center text-gray-400 py-4">
                  No categories defined
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
