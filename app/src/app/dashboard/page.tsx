export default function Page() {
  return (
    <>
      

<nav className="hidden md:flex flex-col fixed left-0 top-0 h-full w-[280px] p-4 z-40 bg-surface-container-low border-r border-outline-variant">

<div className="flex items-center gap-3 mb-8 px-2">
<div className="w-10 h-10 rounded-lg bg-primary-container flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-on-primary-container" style={{"fontVariationSettings":"'FILL' 1"}}>domain</span>
</div>
<div>
<h1 className="text-headline-md font-headline-md font-bold text-primary truncate">Inventory Control</h1>
<p className="text-body-sm font-body-sm text-on-surface-variant truncate">Tech Services Dept</p>
</div>
</div>

<button className="w-full bg-primary text-on-primary hover:bg-on-surface transition-colors rounded-lg py-3 px-4 mb-6 flex items-center justify-center gap-2 font-body-sm text-body-sm font-semibold">
<span className="material-symbols-outlined text-[20px]">add</span>
            New Asset Intake
        </button>

<div className="flex-1 flex flex-col gap-1">

<a className="flex items-center gap-3 px-3 py-2.5 bg-secondary-container text-on-secondary-container font-bold rounded-lg scale-[0.99] transition-all" href="#">
<span className="material-symbols-outlined text-[20px]" style={{"fontVariationSettings":"'FILL' 1"}}>dashboard</span>
<span className="text-label-caps font-label-caps">Dashboard</span>
</a><a className="flex items-center gap-3 px-3 py-2.5 text-on-surface-variant hover:bg-surface-container-high transition-all rounded-lg" href="#"><span className="material-symbols-outlined text-[20px]">insights</span><span className="text-label-caps font-label-caps">Strategy</span></a>

<a className="flex items-center gap-3 px-3 py-2.5 text-on-surface-variant hover:bg-surface-container-high transition-all rounded-lg" href="#">
<span className="material-symbols-outlined text-[20px]">inventory_2</span>
<span className="text-label-caps font-label-caps">Intake &amp; Triage</span>
</a>
<a className="flex items-center gap-3 px-3 py-2.5 text-on-surface-variant hover:bg-surface-container-high transition-all rounded-lg" href="#">
<span className="material-symbols-outlined text-[20px]">build</span>
<span className="text-label-caps font-label-caps">Repairs</span>
</a>
<a className="flex items-center gap-3 px-3 py-2.5 text-on-surface-variant hover:bg-surface-container-high transition-all rounded-lg" href="#">
<span className="material-symbols-outlined text-[20px]">assignment_ind</span>
<span className="text-label-caps font-label-caps">Assignment Engine</span>
</a>
</div>

<div className="mt-auto border-t border-outline-variant pt-4 flex flex-col gap-1">
<a className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:bg-surface-container-high transition-all rounded-lg" href="#">
<span className="material-symbols-outlined text-[20px]">help</span>
<span className="text-label-caps font-label-caps">Support</span>
</a>
<a className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:bg-surface-container-high transition-all rounded-lg" href="#">
<span className="material-symbols-outlined text-[20px]">person_search</span>
<span className="text-label-caps font-label-caps">Role Switcher</span>
</a>
</div>
</nav>

<main className="flex-1 ml-0 md:ml-[280px] h-full overflow-y-auto bg-surface">
<div className="max-w-[1440px] mx-auto p-container-padding flex flex-col gap-grid-gutter">

<header className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-4 gap-4">
<div>
<h2 className="text-display-lg font-display-lg text-primary">Overview</h2>
<p className="text-body-md font-body-md text-on-surface-variant mt-1">Summer Deployment Cycle 2024</p>
</div>
<div className="flex items-center gap-3">
<button className="bg-surface-container-lowest border border-outline-variant text-on-surface hover:bg-surface-container-low transition-colors rounded-lg py-2 px-4 flex items-center gap-2 font-body-sm text-body-sm">
<span className="material-symbols-outlined text-[18px]">play_arrow</span>
                        Run Assignment Engine
                    </button>
<button className="bg-primary text-on-primary hover:bg-on-surface transition-colors rounded-lg py-2 px-4 flex items-center gap-2 font-body-sm text-body-sm shadow-sm">
<span className="material-symbols-outlined text-[18px]">barcode_scanner</span>
                        Start New Intake
                    </button>
</div>
</header>

<section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-stack-gap">

<div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 flex flex-col justify-between hover:shadow-[0_4px_6px_-1px_rgb(0,0,0,0.1)] transition-shadow">
<div className="flex justify-between items-start mb-4">
<span className="text-label-caps font-label-caps text-on-surface-variant">Total Inventory</span>
<div className="w-8 h-8 rounded-full bg-secondary-container/50 flex items-center justify-center">
<span className="material-symbols-outlined text-[18px] text-on-secondary-container">devices</span>
</div>
</div>
<div>
<span className="text-display-lg font-display-lg text-primary block">14,892</span>
<span className="text-body-sm font-body-sm text-outline flex items-center gap-1 mt-1">
<span className="material-symbols-outlined text-[14px] text-primary">trending_up</span>
                            +340 this week
                        </span>
</div>
</div>

<div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 flex flex-col justify-between hover:shadow-[0_4px_6px_-1px_rgb(0,0,0,0.1)] transition-shadow">
<div className="flex justify-between items-start mb-4">
<span className="text-label-caps font-label-caps text-on-surface-variant">Devices Ready</span>
<div className="w-8 h-8 rounded-full bg-primary-container/20 flex items-center justify-center">
<span className="material-symbols-outlined text-[18px] text-primary">check_circle</span>
</div>
</div>
<div>
<span className="text-display-lg font-display-lg text-primary block">12,045</span>
<div className="w-full bg-surface-variant rounded-full h-1.5 mt-2 overflow-hidden">
<div className="bg-primary h-1.5 rounded-full" style={{"width":"81%"}}></div>
</div>
<span className="text-body-sm font-body-sm text-outline mt-1 block">81% of total fleet</span>
</div>
</div>

<div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 flex flex-col justify-between hover:shadow-[0_4px_6px_-1px_rgb(0,0,0,0.1)] transition-shadow">
<div className="flex justify-between items-start mb-4">
<span className="text-label-caps font-label-caps text-on-surface-variant">Pending Repairs</span>
<div className="w-8 h-8 rounded-full bg-error-container/50 flex items-center justify-center">
<span className="material-symbols-outlined text-[18px] text-on-error-container">build</span>
</div>
</div>
<div>
<span className="text-display-lg font-display-lg text-primary block">412</span>
<span className="text-body-sm font-body-sm text-on-error-container flex items-center gap-1 mt-1 bg-error-container/20 px-2 py-0.5 rounded w-max">
<span className="material-symbols-outlined text-[14px]">warning</span>
                            High volume alert
                        </span>
</div>
</div>

<div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 flex flex-col justify-between hover:shadow-[0_4px_6px_-1px_rgb(0,0,0,0.1)] transition-shadow">
<div className="flex justify-between items-start mb-4">
<span className="text-label-caps font-label-caps text-on-surface-variant">New Shipments</span>
<div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center">
<span className="material-symbols-outlined text-[18px] text-on-surface">local_shipping</span>
</div>
</div>
<div>
<span className="text-display-lg font-display-lg text-primary block">2,400</span>
<span className="text-body-sm font-body-sm text-outline flex items-center gap-1 mt-1">
                            Awaiting unboxing in staging
                        </span>
</div>
</div>
</section>

<div className="grid grid-cols-1 lg:grid-cols-3 gap-grid-gutter mt-2">

<section className="lg:col-span-2 bg-surface-container-lowest border border-outline-variant rounded-xl p-6 flex flex-col h-[400px]">
<div className="flex justify-between items-center mb-6">
<h3 className="text-title-sm font-title-sm text-primary">Summer Turnaround Progress</h3>
<div className="flex items-center gap-2">
<span className="text-label-caps font-label-caps text-on-surface-variant">Daily Processing Volume</span>
<span className="material-symbols-outlined text-[16px] text-outline">info</span>
</div>
</div>

<div className="flex-1 w-full relative bg-surface-bright border-b border-l border-surface-variant flex items-end px-2">

<div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-8">
<div className="w-full border-t border-dashed border-surface-variant h-0"></div>
<div className="w-full border-t border-dashed border-surface-variant h-0"></div>
<div className="w-full border-t border-dashed border-surface-variant h-0"></div>
<div className="w-full border-t border-dashed border-surface-variant h-0"></div>
</div>

<div className="w-full h-[calc(100%-2rem)] flex items-end justify-between px-4 z-10 gap-2">
<div className="w-full bg-surface-variant rounded-t-sm" style={{"height":"20%"}}></div>
<div className="w-full bg-surface-variant rounded-t-sm" style={{"height":"35%"}}></div>
<div className="w-full bg-surface-variant rounded-t-sm" style={{"height":"45%"}}></div>
<div className="w-full bg-secondary rounded-t-sm relative group" style={{"height":"80%"}}>
<div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-on-surface text-surface text-label-caps font-label-caps px-2 py-1 rounded whitespace-nowrap transition-opacity">845 Processed</div>
</div>
<div className="w-full bg-surface-variant rounded-t-sm" style={{"height":"60%"}}></div>
<div className="w-full bg-surface-variant rounded-t-sm" style={{"height":"90%"}}></div>
<div className="w-full bg-surface-variant rounded-t-sm" style={{"height":"75%"}}></div>
</div>

<div className="absolute bottom-0 left-0 w-full flex justify-between px-6 py-2 text-label-caps font-label-caps text-outline">
<span className="">Mon</span><span className="">Tue</span><span className="">Wed</span><span className="">Thu</span><span className="">Fri</span><span className="">Sat</span><span className="">Sun</span>
</div>
</div>
</section>

<section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 flex flex-col h-[400px]">
<div className="flex justify-between items-center mb-6">
<h3 className="text-title-sm font-title-sm text-primary">Recent Activity</h3>
<button className="text-label-caps font-label-caps text-secondary hover:text-primary transition-colors">View All</button>
</div>
<div className="flex-1 overflow-y-auto pr-2 flex flex-col gap-4">

<div className="flex items-start gap-3">
<div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center shrink-0 mt-0.5">
<span className="material-symbols-outlined text-[16px] text-on-surface-variant">person</span>
</div>
<div>
<p className="text-body-sm font-body-sm text-on-surface"><span className="font-semibold">Intern A.</span> logged intake for <span className="font-mono-data text-mono-data bg-surface-variant px-1 rounded">SN: 5XJ92</span></p>
<span className="text-label-caps font-label-caps text-outline mt-1 block">2 mins ago</span>
</div>
</div>

<div className="flex items-start gap-3">
<div className="w-8 h-8 rounded-full bg-secondary-container/50 flex items-center justify-center shrink-0 mt-0.5">
<span className="material-symbols-outlined text-[16px] text-on-secondary-container">build_circle</span>
</div>
<div>
<p className="text-body-sm font-body-sm text-on-surface"><span className="font-semibold">Tech J.</span> completed repair for <span className="font-mono-data text-mono-data bg-surface-variant px-1 rounded">SN: 2KL88</span></p>
<span className="text-label-caps font-label-caps text-outline mt-1 block">15 mins ago</span>
</div>
</div>

<div className="flex items-start gap-3">
<div className="w-8 h-8 rounded-full bg-error-container/30 flex items-center justify-center shrink-0 mt-0.5">
<span className="material-symbols-outlined text-[16px] text-on-error-container">report_problem</span>
</div>
<div>
<p className="text-body-sm font-body-sm text-on-surface"><span className="font-semibold">System</span> flagged missing charger for <span className="font-mono-data text-mono-data bg-surface-variant px-1 rounded">SN: 9MM34</span></p>
<span className="text-label-caps font-label-caps text-outline mt-1 block">1 hour ago</span>
</div>
</div>

<div className="flex items-start gap-3">
<div className="w-8 h-8 rounded-full bg-primary-container/20 flex items-center justify-center shrink-0 mt-0.5">
<span className="material-symbols-outlined text-[16px] text-primary">assignment_turned_in</span>
</div>
<div>
<p className="text-body-sm font-body-sm text-on-surface"><span className="font-semibold">Auto-Engine</span> assigned 30 devices to <span className="font-semibold">Room 104</span></p>
<span className="text-label-caps font-label-caps text-outline mt-1 block">3 hours ago</span>
</div>
</div>
</div>
</section>
</div>
</div>
</main>



    </>
  );
}