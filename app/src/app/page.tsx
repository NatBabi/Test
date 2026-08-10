export default function Page() {
  return (
    <>
      

<nav className="bg-surface-container-low fixed left-0 top-0 h-full flex flex-col p-4 z-40 w-[280px] border-r border-outline-variant hidden md:flex">
<div className="mb-8 flex items-center gap-4">
<div className="w-10 h-10 rounded bg-primary flex items-center justify-center text-on-primary">
<span className="material-symbols-outlined icon-fill">domain</span>
</div>
<div>
<h2 className="text-headline-md font-headline-md font-bold text-primary">Inventory Control</h2>
<p className="text-body-sm font-body-sm text-on-surface-variant">Tech Services Dept</p>
</div>
</div>
<button className="mb-8 w-full bg-primary text-on-primary py-3 px-4 rounded-lg font-label-caps text-label-caps flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]">
<span className="material-symbols-outlined text-[18px]">add</span> New Asset Intake
        </button>
<div className="flex-1 space-y-2">

<a className="bg-secondary-container text-on-secondary-container font-bold rounded-lg flex items-center gap-3 px-4 py-3 scale-[0.99] duration-150" href="#">
<span className="material-symbols-outlined icon-fill">dashboard</span>
<span className="text-label-caps font-label-caps">Dashboard</span>
</a>
<a className="text-on-surface-variant hover:bg-surface-container-high transition-all rounded-lg flex items-center gap-3 px-4 py-3" href="#">
<span className="material-symbols-outlined">inventory_2</span>
<span className="text-label-caps font-label-caps">Intake &amp; Triage</span>
</a>
<a className="text-on-surface-variant hover:bg-surface-container-high transition-all rounded-lg flex items-center gap-3 px-4 py-3" href="#">
<span className="material-symbols-outlined">build</span>
<span className="text-label-caps font-label-caps">Repairs</span>
</a>
<a className="text-on-surface-variant hover:bg-surface-container-high transition-all rounded-lg flex items-center gap-3 px-4 py-3" href="#">
<span className="material-symbols-outlined">assignment_ind</span>
<span className="text-label-caps font-label-caps">Assignment Engine</span>
</a>
</div>
<div className="mt-auto border-t border-outline-variant pt-4 space-y-2">
<a className="text-on-surface-variant hover:bg-surface-container-high transition-all rounded-lg flex items-center gap-3 px-4 py-2" href="#">
<span className="material-symbols-outlined">help</span>
<span className="text-label-caps font-label-caps">Support</span>
</a>
<a className="text-on-surface-variant hover:bg-surface-container-high transition-all rounded-lg flex items-center gap-3 px-4 py-2" href="#">
<span className="material-symbols-outlined">person_search</span>
<span className="text-label-caps font-label-caps">Role Switcher</span>
</a>
</div>
</nav>

<div className="flex-1 flex flex-col min-h-screen md:ml-[280px]">

<header className="bg-surface flex justify-between items-center w-full px-container-padding h-16 border-b border-outline-variant z-30 sticky top-0">
<div className="flex items-center gap-4">
<button className="md:hidden text-on-surface">
<span className="material-symbols-outlined">menu</span>
</button>
<h1 className="text-title-sm font-title-sm font-bold text-on-surface">EduAsset Manager</h1>
</div>
<div className="flex items-center gap-6">
<div className="relative hidden sm:block">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">search</span>
<input className="pl-10 pr-4 py-2 bg-surface-container-lowest border border-outline-variant rounded-lg text-body-sm font-body-sm focus:border-primary focus:ring-2 focus:ring-primary-fixed focus:outline-none w-64 transition-all" placeholder="Search assets, POs..." type="text"/>
</div>
<div className="flex items-center gap-2">
<button className="p-2 text-on-surface-variant hover:bg-surface-container-low transition-colors rounded-full">
<span className="material-symbols-outlined">notifications</span>
</button>
<button className="p-2 text-on-surface-variant hover:bg-surface-container-low transition-colors rounded-full">
<span className="material-symbols-outlined">settings</span>
</button>
<img alt="User profile" className="w-8 h-8 rounded-full border border-outline-variant ml-2 object-cover" data-alt="A professional headshot of a corporate IT director, wearing business casual attire, well-lit in a modern office environment, maintaining a clean and minimalistic visual style." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBeib9EICE1V8gcSO6n0sNH0OJtRHmC4k6I3IULesv0x8JfmOyar31kf4s5f313qmfI7NuIVMUuqONmxuIOOaS6PWVygaaMfgpyElcALcwkFaUy993NHNTwukAt50p7vDlFtoGUfeR2p1eUFWIxi-SyLbuAWMqKbEmVqcQyt7GJEHh_yZsTs98Fhp5VX61jskJvKsBu-nFnebXDQA-rn_SSitkxRUHm7dFUnUPrBU4n_oWYti51M8PG"/>
</div>
</div>
</header>

<main className="flex-1 p-4 md:p-container-padding max-w-[1440px] mx-auto w-full space-y-grid-gutter">
<div className="mb-6">
<h2 className="text-display-lg font-display-lg text-on-surface mb-2">Director's Command Center</h2>
<p className="text-body-md font-body-md text-on-surface-variant">Strategic overview of fleet health, procurement, and departmental operations.</p>
</div>

<section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-grid-gutter">

<div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-6 shadow-sm hover:shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] transition-shadow">
<div className="flex justify-between items-start mb-4">
<h3 className="text-label-caps font-label-caps text-on-surface-variant uppercase">Total Fleet Value</h3>
<div className="p-2 bg-primary-fixed rounded-lg text-primary">
<span className="material-symbols-outlined">account_balance</span>
</div>
</div>
<div className="text-display-lg font-display-lg text-on-surface mb-1">$14.2M</div>
<div className="flex items-center gap-1 text-body-sm font-body-sm text-[green]">
<span className="material-symbols-outlined text-[16px]">trending_up</span>
<span>+2.4% vs Last Qtr</span>
</div>
</div>

<div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-6 shadow-sm hover:shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] transition-shadow">
<div className="flex justify-between items-start mb-4">
<h3 className="text-label-caps font-label-caps text-on-surface-variant uppercase">Replacement Forecast (3Y)</h3>
<div className="p-2 bg-tertiary-fixed rounded-lg text-tertiary-container">
<span className="material-symbols-outlined">request_quote</span>
</div>
</div>
<div className="text-display-lg font-display-lg text-on-surface mb-1">$3.8M</div>
<div className="flex items-center gap-1 text-body-sm font-body-sm text-error">
<span className="material-symbols-outlined text-[16px]">warning</span>
<span>Spike anticipated 2026</span>
</div>
</div>

<div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-6 shadow-sm hover:shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] transition-shadow">
<div className="flex justify-between items-start mb-4">
<h3 className="text-label-caps font-label-caps text-on-surface-variant uppercase">Dept Throughput</h3>
<div className="p-2 bg-secondary-fixed rounded-lg text-on-secondary-container">
<span className="material-symbols-outlined">speed</span>
</div>
</div>
<div className="text-display-lg font-display-lg text-on-surface mb-1">42 <span className="text-title-sm text-on-surface-variant">units/hr</span></div>
<div className="flex items-center gap-1 text-body-sm font-body-sm text-on-surface-variant">
<span className="material-symbols-outlined text-[16px]">check_circle</span>
<span>Optimal efficiency</span>
</div>
</div>

<div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-6 shadow-sm hover:shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] transition-shadow">
<div className="flex justify-between items-start mb-4">
<h3 className="text-label-caps font-label-caps text-on-surface-variant uppercase">Warranty Coverage</h3>
<div className="p-2 bg-[#E0F2FE] rounded-lg text-[#0369A1]">
<span className="material-symbols-outlined">verified_user</span>
</div>
</div>
<div className="text-display-lg font-display-lg text-on-surface mb-1">86%</div>
<div className="w-full bg-surface-container mt-2 h-2 rounded-full overflow-hidden">
<div className="bg-primary h-full w-[86%] rounded-full"></div>
</div>
<div className="mt-2 text-body-sm font-body-sm text-on-surface-variant">14% exposed risk</div>
</div>
</section>
</main>
</div>

    </>
  );
}