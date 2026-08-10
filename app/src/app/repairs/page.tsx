export default function Page() {
  return (
    <>
      

<nav className="hidden md:flex flex-col bg-surface-container-low border-r border-outline-variant fixed left-0 top-0 h-full w-[280px] p-4 z-40">
<div className="flex items-center gap-3 mb-8 px-2">
<div className="w-10 h-10 rounded-lg bg-primary-container flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-on-primary-container icon-fill">inventory</span>
</div>
<div>
<h1 className="text-headline-md font-headline-md font-bold text-primary">Inventory Control</h1>
<p className="text-label-caps font-label-caps text-on-surface-variant">Tech Services Dept</p>
</div>
</div>
<button className="w-full bg-primary text-on-primary hover:bg-primary/90 transition-colors py-2 px-4 rounded-lg font-body-sm text-body-sm font-semibold mb-6 flex items-center justify-center gap-2">
<span className="material-symbols-outlined text-[18px]">add</span>
            New Asset Intake
        </button>
<div className="flex-1 flex flex-col gap-1">

<a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-all" href="#">
<span className="material-symbols-outlined" data-icon="dashboard">dashboard</span>
<span className="text-body-sm font-body-sm font-medium">Dashboard</span>
</a>

<a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-all" href="#">
<span className="material-symbols-outlined" data-icon="inventory_2">inventory_2</span>
<span className="text-body-sm font-body-sm font-medium">Intake &amp; Triage</span>
</a>

<a className="flex items-center gap-3 px-3 py-2.5 bg-secondary-container text-on-secondary-container font-bold rounded-lg scale-[0.99] duration-150 transition-all" href="#">
<span className="material-symbols-outlined icon-fill" data-icon="build">build</span>
<span className="text-body-sm font-body-sm">Repairs</span>
</a>

<a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-all" href="#">
<span className="material-symbols-outlined" data-icon="assignment_ind">assignment_ind</span>
<span className="text-body-sm font-body-sm font-medium">Assignment Engine</span>
</a>
</div>
<div className="mt-auto pt-4 border-t border-outline-variant flex flex-col gap-1">
<a className="flex items-center gap-3 px-3 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors" href="#">
<span className="material-symbols-outlined text-[20px]" data-icon="help">help</span>
<span className="text-label-caps font-label-caps">Support</span>
</a>
<a className="flex items-center gap-3 px-3 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors" href="#">
<span className="material-symbols-outlined text-[20px]" data-icon="person_search">person_search</span>
<span className="text-label-caps font-label-caps">Role Switcher</span>
</a>
</div>
</nav>

<main className="flex-1 md:ml-[280px] h-full overflow-y-auto w-full max-w-[1440px] mx-auto bg-[#F8FAFC]">

<header className="md:hidden flex items-center justify-between p-4 bg-surface border-b border-outline-variant sticky top-0 z-30">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary">inventory</span>
<h1 className="text-title-sm font-title-sm font-bold text-on-surface">Repairs</h1>
</div>
<button className="material-symbols-outlined text-on-surface-variant">menu</button>
</header>
<div className="p-4 md:p-container-padding flex flex-col gap-stack-gap">

<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
<div>
<h2 className="text-display-lg font-display-lg text-on-surface tracking-tight">Repair Tracking</h2>
<p className="text-body-md font-body-md text-on-surface-variant mt-1">Manage active device repairs and donor parts inventory.</p>
</div>
<div className="flex gap-2">
<button className="bg-surface text-on-surface border border-outline-variant hover:bg-surface-container-low px-4 py-2 rounded-lg text-body-sm font-body-sm font-medium transition-shadow hover:shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] flex items-center gap-2">
<span className="material-symbols-outlined text-[18px]">print</span>
                        Print Manifest
                    </button>
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-3 gap-grid-gutter">
<div className="bg-surface border border-outline-variant rounded-lg p-4 flex flex-col justify-between">
<div className="flex justify-between items-start mb-2">
<span className="text-label-caps font-label-caps text-on-surface-variant">Devices in Repair</span>
<span className="material-symbols-outlined text-outline">laptop_mac</span>
</div>
<div className="flex items-baseline gap-2">
<span className="text-display-lg font-display-lg text-on-surface">42</span>
<span className="text-body-sm font-body-sm text-error bg-error-container/30 px-2 rounded-full">+5 today</span>
</div>
</div>
<div className="bg-surface border border-outline-variant rounded-lg p-4 flex flex-col justify-between">
<div className="flex justify-between items-start mb-2">
<span className="text-label-caps font-label-caps text-on-surface-variant">Awaiting Parts</span>
<span className="material-symbols-outlined text-outline">hourglass_empty</span>
</div>
<div className="flex items-baseline gap-2">
<span className="text-display-lg font-display-lg text-on-surface">18</span>
<span className="text-body-sm font-body-sm text-on-surface-variant">12 screens needed</span>
</div>
</div>
<div className="bg-surface border border-outline-variant rounded-lg p-4 flex flex-col justify-between">
<div className="flex justify-between items-start mb-2">
<span className="text-label-caps font-label-caps text-on-surface-variant">Donor Devices Available</span>
<span className="material-symbols-outlined text-outline">recycling</span>
</div>
<div className="flex items-baseline gap-2">
<span className="text-display-lg font-display-lg text-on-surface">104</span>
<span className="text-body-sm font-body-sm text-secondary bg-secondary-container/50 px-2 rounded-full">High stock</span>
</div>
</div>
</div>

<div className="grid grid-cols-1 lg:grid-cols-12 gap-grid-gutter mt-2">

<div className="lg:col-span-8 bg-surface border border-outline-variant rounded-xl overflow-hidden flex flex-col shadow-sm">
<div className="p-4 border-b border-outline-variant flex justify-between items-center bg-[#F8FAFC]">
<h3 className="text-title-sm font-title-sm text-on-surface">Active Repairs</h3>
<div className="relative">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">search</span>
<input className="pl-9 pr-4 py-1.5 border border-outline-variant rounded-lg text-body-sm font-body-sm w-[200px] focus:outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] transition-all bg-surface" placeholder="Search Tag or S/N..." type="text"/>
</div>
</div>
<div className="overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead>
<tr className="bg-[#F8FAFC] border-b border-outline-variant">
<th className="p-table-cell-padding text-label-caps font-label-caps text-secondary font-medium">Asset Tag</th>
<th className="p-table-cell-padding text-label-caps font-label-caps text-secondary font-medium">Model</th>
<th className="p-table-cell-padding text-label-caps font-label-caps text-secondary font-medium">Issue</th>
<th className="p-table-cell-padding text-label-caps font-label-caps text-secondary font-medium">Status</th>
<th className="p-table-cell-padding text-label-caps font-label-caps text-secondary font-medium text-right">Actions</th>
</tr>
</thead>
<tbody className="text-body-sm font-body-sm text-on-surface divide-y divide-[#F1F5F9]">
<tr className="hover:bg-[#F8FAFC] transition-colors group">
<td className="p-table-cell-padding font-mono-data text-mono-data">#AS-9921</td>
<td className="p-table-cell-padding">Chromebook 3100</td>
<td className="p-table-cell-padding text-on-surface-variant">Cracked Screen</td>
<td className="p-table-cell-padding">
<span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#FEF3C7] text-[#92400E]">In Progress</span>
</td>
<td className="p-table-cell-padding text-right">
<button className="text-primary hover:text-[#3B82F6] p-1 rounded transition-colors" title="Update Status">
<span className="material-symbols-outlined text-[20px]">edit_note</span>
</button>
</td>
</tr>
<tr className="hover:bg-[#F8FAFC] transition-colors group">
<td className="p-table-cell-padding font-mono-data text-mono-data">#AS-9844</td>
<td className="p-table-cell-padding">iPad 9th Gen</td>
<td className="p-table-cell-padding text-on-surface-variant">Battery Depleted</td>
<td className="p-table-cell-padding">
<span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#FEE2E2] text-[#991B1B]">Awaiting Parts</span>
</td>
<td className="p-table-cell-padding text-right">
<button className="text-primary hover:text-[#3B82F6] p-1 rounded transition-colors" title="Update Status">
<span className="material-symbols-outlined text-[20px]">edit_note</span>
</button>
</td>
</tr>
<tr className="hover:bg-[#F8FAFC] transition-colors group">
<td className="p-table-cell-padding font-mono-data text-mono-data">#AS-1022</td>
<td className="p-table-cell-padding">ThinkPad T14</td>
<td className="p-table-cell-padding text-on-surface-variant">Missing Keys (A,S,D)</td>
<td className="p-table-cell-padding">
<span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#E0E7FF] text-[#3730A3]">Triage</span>
</td>
<td className="p-table-cell-padding text-right">
<button className="text-primary hover:text-[#3B82F6] p-1 rounded transition-colors" title="Update Status">
<span className="material-symbols-outlined text-[20px]">edit_note</span>
</button>
</td>
</tr>
<tr className="hover:bg-[#F8FAFC] transition-colors group">
<td className="p-table-cell-padding font-mono-data text-mono-data">#AS-8830</td>
<td className="p-table-cell-padding">Chromebook 3100</td>
<td className="p-table-cell-padding text-on-surface-variant">Won't Power On</td>
<td className="p-table-cell-padding">
<span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#FEE2E2] text-[#991B1B]">Awaiting Parts</span>
</td>
<td className="p-table-cell-padding text-right">
<button className="text-primary hover:text-[#3B82F6] p-1 rounded transition-colors" title="Update Status">
<span className="material-symbols-outlined text-[20px]">edit_note</span>
</button>
</td>
</tr>
</tbody>
</table>
</div>
</div>

<div className="lg:col-span-4 flex flex-col gap-grid-gutter">

<div className="bg-surface border border-outline-variant rounded-xl p-5 shadow-sm">
<div className="flex items-center gap-2 mb-4">
<span className="material-symbols-outlined text-primary">build_circle</span>
<h3 className="text-title-sm font-title-sm text-on-surface">Log Repair Action</h3>
</div>
<form className="flex flex-col gap-4">
<div>
<label className="block text-body-sm font-body-sm font-bold text-on-surface mb-1">Target Asset Tag</label>
<input className="w-full px-3 py-2 border border-outline-variant rounded-lg text-body-sm font-body-sm focus:outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] transition-all" placeholder="e.g. #AS-9921" type="text"/>
</div>
<div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg">
<label className="block text-body-sm font-body-sm font-bold text-on-surface mb-1">Link Donor Device (Optional)</label>
<p className="text-[12px] text-on-surface-variant mb-2 leading-tight">If salvaging parts, enter the donor asset tag to track component cannibalization.</p>
<input className="w-full px-3 py-2 border border-outline-variant rounded-lg text-body-sm font-body-sm focus:outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] transition-all bg-surface" placeholder="Donor Asset Tag" type="text"/>
<div className="mt-3">
<label className="block text-body-sm font-body-sm font-bold text-on-surface mb-1">Part Harvested</label>
<select className="w-full px-3 py-2 border border-outline-variant rounded-lg text-body-sm font-body-sm focus:outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] bg-surface">
<option value="">Select Part...</option>
<option value="screen">LCD Screen Panel</option>
<option value="keyboard">Keyboard Assembly</option>
<option value="battery">Battery</option>
<option value="motherboard">Motherboard</option>
</select>
</div>
</div>
<div>
<label className="block text-body-sm font-body-sm font-bold text-on-surface mb-1">Resolution Notes</label>
<textarea className="w-full px-3 py-2 border border-outline-variant rounded-lg text-body-sm font-body-sm focus:outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] transition-all resize-none" placeholder="Brief description of fix..." rows={2}></textarea>
</div>
<div className="flex gap-2 mt-2">
<button className="flex-1 bg-surface text-primary border border-outline-variant hover:bg-[#F8FAFC] py-2 rounded-lg text-body-sm font-body-sm font-semibold transition-colors" type="button">
                                    Mark Unrepairable
                                </button>
<button className="flex-1 bg-[#3B82F6] text-on-primary hover:bg-[#2563EB] py-2 rounded-lg text-body-sm font-body-sm font-semibold transition-colors shadow-sm" type="button">
                                    Complete Repair
                                </button>
</div>
</form>
</div>

<div className="bg-surface border border-outline-variant rounded-xl overflow-hidden shadow-sm flex-1">
<div className="p-4 border-b border-outline-variant bg-[#F8FAFC] flex justify-between items-center">
<h3 className="text-body-md font-body-md font-semibold text-on-surface">Harvested Parts</h3>
<button className="text-label-caps font-label-caps text-[#3B82F6] hover:underline">View All</button>
</div>
<div className="p-2">
<table className="w-full text-left border-collapse">
<tbody className="text-[13px] font-body-sm text-on-surface divide-y divide-[#F1F5F9]">
<tr className="hover:bg-[#F8FAFC]">
<td className="py-2 px-2 flex items-center gap-2">
<span className="material-symbols-outlined text-[16px] text-outline">desktop_windows</span>
                                            CB 3100 Screen
                                        </td>
<td className="py-2 px-2 text-right font-medium">12</td>
</tr>
<tr className="hover:bg-[#F8FAFC]">
<td className="py-2 px-2 flex items-center gap-2">
<span className="material-symbols-outlined text-[16px] text-outline">keyboard</span>
                                            iPad 9th Logic Brd
                                        </td>
<td className="py-2 px-2 text-right font-medium">4</td>
</tr>
<tr className="hover:bg-[#F8FAFC]">
<td className="py-2 px-2 flex items-center gap-2">
<span className="material-symbols-outlined text-[16px] text-outline">battery_charging_full</span>
                                            T14 Battery (Good)
                                        </td>
<td className="py-2 px-2 text-right font-medium text-error">2</td>
</tr>
</tbody>
</table>
</div>
</div>
</div>
</div>
</div>
</main>

    </>
  );
}