export default function Page() {
  return (
    <>
      

<nav className="bg-surface-container-low dark:bg-surface-container-lowest docked left-0 h-full w-[280px] border-r border-outline-variant dark:border-outline flat no shadows fixed top-0 flex flex-col p-4 z-40 hidden md:flex">

<div className="flex items-center gap-3 mb-8 px-2">
<img alt="Organization logo" className="w-10 h-10 rounded object-cover" data-alt="A clean, minimalist abstract logo design for an educational technology service department. It features precise geometric shapes in deep blues and stark whites. The aesthetic is modern, professional, and corporate, emphasizing organization and control. It communicates structure and reliability, perfect for an IT inventory management system. Soft, neutral lighting enhances the crisp vector-style appearance." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKb4fo1i3PlonHKWSJMCwgG_kdcs9WFV9wepYXbMs1zF2ZACeai1zI70XBHD2sEhwPvev2TWMWv-AYKZN16piIAz_xBdyRFBdt_x4cogDrz4EfR0gzN_h2RLqvxZ601oLyiVSaRsCbHkshjvtK-5GElAArW6nAEVcXGCleUl2das5tIJmz02TRxTdVBt48ydWIjxhakMqZpvygVOFyWkmlVvmcTOFKTeuA07NTqdLBY1K-uBLIl_uT"/>
<div>
<h1 className="text-headline-md font-headline-md font-bold text-primary dark:text-inverse-primary">Inventory Control</h1>
<p className="text-label-caps font-label-caps text-on-surface-variant">Tech Services Dept</p>
</div>
</div>

<ul className="flex-1 space-y-2">
<li>
<a className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant dark:text-outline-variant hover:bg-surface-container-high dark:hover:bg-surface-variant transition-all hover:bg-surface-container-high text-label-caps font-label-caps" href="#">
<span className="material-symbols-outlined" data-icon="dashboard">dashboard</span>
<span>Dashboard</span>
</a>
</li>
<li>
<a className="flex items-center gap-3 px-4 py-3 rounded-lg bg-secondary-container dark:bg-primary-container text-on-secondary-container dark:text-on-primary-container font-bold scale-[0.99] duration-150 text-label-caps font-label-caps" href="#">
<span className="material-symbols-outlined" data-icon="inventory_2" style={{"fontVariationSettings":"'FILL' 1"}}>inventory_2</span>
<span>Intake &amp; Triage</span>
</a>
</li>
<li>
<a className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant dark:text-outline-variant hover:bg-surface-container-high dark:hover:bg-surface-variant transition-all hover:bg-surface-container-high text-label-caps font-label-caps" href="#">
<span className="material-symbols-outlined" data-icon="build">build</span>
<span>Repairs</span>
</a>
</li>
<li>
<a className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant dark:text-outline-variant hover:bg-surface-container-high dark:hover:bg-surface-variant transition-all hover:bg-surface-container-high text-label-caps font-label-caps" href="#">
<span className="material-symbols-outlined" data-icon="assignment_ind">assignment_ind</span>
<span>Assignment Engine</span>
</a>
</li>
</ul>

<div className="mt-4 mb-8">
<button className="w-full bg-[#3B82F6] text-white rounded-lg py-2 px-4 flex items-center justify-center gap-2 text-body-sm font-body-sm font-bold shadow-sm hover:opacity-90 transition-opacity">
<span className="material-symbols-outlined text-sm">add</span>
                New Asset Intake
            </button>
</div>

<ul className="space-y-2 border-t border-outline-variant pt-4 mt-auto">
<li>
<a className="flex items-center gap-3 px-4 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-all text-label-caps font-label-caps" href="#">
<span className="material-symbols-outlined" data-icon="help">help</span>
<span>Support</span>
</a>
</li>
<li>
<a className="flex items-center gap-3 px-4 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-all text-label-caps font-label-caps" href="#">
<span className="material-symbols-outlined" data-icon="person_search">person_search</span>
<span>Role Switcher</span>
</a>
</li>
</ul>
</nav>

<main className="flex-1 md:ml-[280px] h-full overflow-y-auto bg-surface-container-lowest flex flex-col items-center">

<div className="w-full max-w-[1440px] px-container-padding py-8 flex flex-col gap-grid-gutter">

<header className="flex justify-between items-end pb-4 border-b border-surface-variant">
<div>
<h2 className="text-display-lg font-display-lg text-primary">Device Triage Station</h2>
<p className="text-body-md font-body-md text-on-surface-variant mt-1">Scan or enter serial number to begin intake process.</p>
</div>
</header>

<div className="grid grid-cols-1 lg:grid-cols-12 gap-grid-gutter">

<div className="lg:col-span-8 flex flex-col gap-stack-gap">

<section className="bg-surface border border-outline-variant rounded-xl p-6 shadow-sm">
<label className="block text-body-sm font-body-sm font-bold text-on-surface mb-2" htmlFor="serial-search">Serial Number Search</label>
<div className="relative">
<span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">barcode_scanner</span>
<input className="w-full pl-12 pr-4 py-3 rounded-lg border border-outline-variant focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20 transition-all text-body-md font-body-md font-mono-data bg-white" id="serial-search" placeholder="Scan barcode or type S/N..." type="text"/>
<button className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#3B82F6] text-white px-4 py-1.5 rounded-md text-body-sm font-body-sm font-bold hover:opacity-90">Search</button>
</div>
</section>

<section className="grid grid-cols-1 md:grid-cols-2 gap-stack-gap">

<div className="bg-white border border-outline-variant rounded-xl p-5 shadow-sm relative overflow-hidden">
<div className="absolute top-0 right-0 p-4 opacity-10">
<span className="material-symbols-outlined text-[64px]">laptop_chromebook</span>
</div>
<h3 className="text-title-sm font-title-sm text-primary mb-4 border-b border-surface-variant pb-2">Device Profile</h3>
<div className="space-y-3">
<div>
<span className="text-label-caps font-label-caps text-on-surface-variant">Model</span>
<p className="text-body-md font-body-md font-bold">Dell Chromebook 3100</p>
</div>
<div>
<span className="text-label-caps font-label-caps text-on-surface-variant">Serial Number</span>
<p className="text-mono-data font-mono-data text-on-surface">5CD918274X</p>
</div>
<div>
<span className="text-label-caps font-label-caps text-on-surface-variant">Purchase Date</span>
<p className="text-body-md font-body-md text-on-surface">Aug 12, 2021 (Warranty Active)</p>
</div>
</div>
</div>

<div className="bg-white border border-outline-variant rounded-xl p-5 shadow-sm">
<h3 className="text-title-sm font-title-sm text-primary mb-4 border-b border-surface-variant pb-2">Assignment History</h3>
<div className="space-y-4">
<div className="flex items-start gap-3">
<div className="bg-surface-container-low p-2 rounded-full mt-1">
<span className="material-symbols-outlined text-sm text-on-surface-variant">person</span>
</div>
<div>
<p className="text-body-sm font-body-sm font-bold text-on-surface">Sarah Jenkins (Grade 10)</p>
<p className="text-label-caps font-label-caps text-on-surface-variant">Returned: Today, 09:41 AM</p>
</div>
</div>
<div className="flex items-start gap-3 opacity-60">
<div className="bg-surface-container-low p-2 rounded-full mt-1">
<span className="material-symbols-outlined text-sm text-on-surface-variant">person</span>
</div>
<div>
<p className="text-body-sm font-body-sm text-on-surface">Michael Chang (Grade 9)</p>
<p className="text-label-caps font-label-caps text-on-surface-variant">Returned: Jun 05, 2022</p>
</div>
</div>
</div>
</div>
</section>

<section className="bg-white border border-outline-variant rounded-xl p-6 shadow-sm">
<h3 className="text-title-sm font-title-sm text-primary mb-5">Condition Assessment</h3>
<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">

<label className="cursor-pointer">
<input checked="" className="peer sr-only" name="condition" type="radio"/>
<div className="border border-outline-variant rounded-lg p-4 text-center hover:bg-surface-container-low transition-colors peer-checked:border-[#3B82F6] peer-checked:bg-secondary-fixed peer-checked:text-[#0b1c30]">
<span className="material-symbols-outlined mb-2 block">check_circle</span>
<span className="text-body-sm font-body-sm font-bold block">Healthy</span>
</div>
</label>
<label className="cursor-pointer">
<input className="peer sr-only" name="condition" type="radio"/>
<div className="border border-outline-variant rounded-lg p-4 text-center hover:bg-surface-container-low transition-colors peer-checked:border-[#eab308] peer-checked:bg-[#fef08a] peer-checked:text-[#713f12]">
<span className="material-symbols-outlined mb-2 block">build_circle</span>
<span className="text-body-sm font-body-sm font-bold block">Minor Damage</span>
</div>
</label>
<label className="cursor-pointer">
<input className="peer sr-only" name="condition" type="radio"/>
<div className="border border-outline-variant rounded-lg p-4 text-center hover:bg-surface-container-low transition-colors peer-checked:border-[#ba1a1a] peer-checked:bg-error-container peer-checked:text-[#93000a]">
<span className="material-symbols-outlined mb-2 block">error</span>
<span className="text-body-sm font-body-sm font-bold block">Major Damage</span>
</div>
</label>
<label className="cursor-pointer">
<input className="peer sr-only" name="condition" type="radio"/>
<div className="border border-outline-variant rounded-lg p-4 text-center hover:bg-surface-container-low transition-colors peer-checked:border-[#8b5cf6] peer-checked:bg-[#ede9fe] peer-checked:text-[#4c1d95]">
<span className="material-symbols-outlined mb-2 block">mop</span>
<span className="text-body-sm font-body-sm font-bold block">Needs Powerwash</span>
</div>
</label>
</div>
<div className="mb-6">
<label className="block text-body-sm font-body-sm font-bold text-on-surface mb-2" htmlFor="notes">Triage Notes (Optional)</label>
<textarea className="w-full p-3 rounded-lg border border-outline-variant focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20 transition-all text-body-md font-body-md resize-none" id="notes" placeholder="Enter details regarding damage or specific issues..." rows="3"></textarea>
</div>
<div className="flex justify-end gap-3">
<button className="px-5 py-2 text-primary font-body-sm text-body-sm hover:bg-surface-container-low rounded-lg transition-colors">Clear</button>
<button className="px-5 py-2 bg-[#3B82F6] text-white font-body-sm text-body-sm font-bold rounded-lg shadow-sm hover:opacity-90 transition-opacity">Submit Triage</button>
</div>
</section>
</div>

<div className="lg:col-span-4 flex flex-col gap-stack-gap">

<section className="bg-surface-container-low border border-outline-variant rounded-xl p-5 shadow-sm">
<h3 className="text-title-sm font-title-sm text-primary mb-6">Current Pipeline</h3>
<div className="relative">

<div className="absolute left-4 top-4 bottom-4 w-px bg-outline-variant"></div>

<ul className="space-y-6 relative z-10">
<li className="flex items-start gap-4">
<div className="w-8 h-8 rounded-full bg-[#3B82F6] text-white flex items-center justify-center ring-4 ring-surface-container-low shrink-0">
<span className="material-symbols-outlined text-[18px]">inventory_2</span>
</div>
<div className="pt-1">
<p className="text-body-sm font-body-sm font-bold text-primary">Triage</p>
<p className="text-label-caps font-label-caps text-on-surface-variant">Current Stage</p>
</div>
</li>
<li className="flex items-start gap-4">
<div className="w-8 h-8 rounded-full bg-surface-variant border border-outline-variant text-outline flex items-center justify-center ring-4 ring-surface-container-low shrink-0">
<span className="material-symbols-outlined text-[18px]">build</span>
</div>
<div className="pt-1">
<p className="text-body-sm font-body-sm text-on-surface-variant">Repair</p>
</div>
</li>
<li className="flex items-start gap-4">
<div className="w-8 h-8 rounded-full bg-surface-variant border border-outline-variant text-outline flex items-center justify-center ring-4 ring-surface-container-low shrink-0">
<span className="material-symbols-outlined text-[18px]">cleaning_services</span>
</div>
<div className="pt-1">
<p className="text-body-sm font-body-sm text-on-surface-variant">Clean</p>
</div>
</li>
<li className="flex items-start gap-4">
<div className="w-8 h-8 rounded-full bg-surface-variant border border-outline-variant text-outline flex items-center justify-center ring-4 ring-surface-container-low shrink-0">
<span className="material-symbols-outlined text-[18px]">done_all</span>
</div>
<div className="pt-1">
<p className="text-body-sm font-body-sm text-on-surface-variant">Ready</p>
</div>
</li>
</ul>
</div>
</section>

<section className="bg-white border border-outline-variant rounded-xl p-6 shadow-sm flex flex-col justify-center items-center text-center">
<div className="w-12 h-12 bg-secondary-fixed text-on-secondary-fixed rounded-full flex items-center justify-center mb-4">
<span className="material-symbols-outlined">upload_file</span>
</div>
<h3 className="text-title-sm font-title-sm text-primary mb-2">Batch CSV Import</h3>
<p className="text-body-sm font-body-sm text-on-surface-variant mb-6">Upload a CSV file for bulk yearly inventory intake.</p>
<div className="w-full border-2 border-dashed border-outline-variant rounded-lg p-6 hover:bg-surface-container-low transition-colors cursor-pointer group">
<span className="material-symbols-outlined text-outline-variant group-hover:text-[#3B82F6] transition-colors text-[32px] mb-2">cloud_upload</span>
<p className="text-body-sm font-body-sm font-bold text-on-surface">Drag &amp; Drop file here</p>
<p className="text-label-caps font-label-caps text-on-surface-variant mt-1">or click to browse</p>
</div>
</section>
</div>
</div>
</div>
</main>

    </>
  );
}