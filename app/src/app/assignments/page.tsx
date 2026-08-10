export default function Page() {
  return (
    <>
      

<nav className="bg-surface-container-low dark:bg-surface-container-lowest text-primary dark:text-inverse-primary font-label-caps text-label-caps docked left-0 h-full w-[280px] border-r border-outline-variant dark:border-outline flat no shadows fixed left-0 top-0 h-full flex flex-col p-4 z-40">

<div className="mb-8 flex items-center gap-3">
<img alt="Organization logo" className="w-10 h-10 rounded-full object-cover bg-surface-container-highest" data-alt="A clean, minimalist abstract logo design representing inventory and technology, utilizing crisp geometric shapes in shades of blue and stark white, fitting for a modern educational IT administration system." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCeiwELOg2Mj6hNMEs7Kv2iwdgsjQZENdlzdgEgMdY5zBghsb2G4VCetVVE-Lh9xeFa5gBUUZiJ4g6zLlJcfb4htXxwfekgEd8s12eJYj5rNoySzdzsXqHPtHrtF2Nj0titc49x8gCs9p0DsQQaTQpwCaGDV0EXBPrWn_GNIWvbykpR7DmGgJMlG8D2-X6-xNKOV6Zc4Odu_uPVOjJeUBnQ0Jw-jNrddhXc0RzBNjL9KjlHJLpfppV"/>
<div>
<h1 className="text-headline-md font-headline-md font-bold text-primary dark:text-inverse-primary">Inventory Control</h1>
<p className="text-body-sm font-body-sm text-on-surface-variant">Tech Services Dept</p>
</div>
</div>

<button className="mb-8 w-full bg-primary text-on-primary py-2 px-4 rounded-lg text-label-caps font-label-caps hover:bg-surface-tint transition-colors flex items-center justify-center gap-2 shadow-sm hover:shadow-md">
<span className="material-symbols-outlined text-[18px]">add</span>
            New Asset Intake
        </button>

<div className="flex flex-col gap-2 flex-grow">
<a className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant dark:text-outline-variant hover:bg-surface-container-high transition-all" href="#">
<span className="material-symbols-outlined">dashboard</span>
<span>Dashboard</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant dark:text-outline-variant hover:bg-surface-container-high transition-all" href="#">
<span className="material-symbols-outlined">inventory_2</span>
<span>Intake &amp; Triage</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant dark:text-outline-variant hover:bg-surface-container-high transition-all" href="#">
<span className="material-symbols-outlined">build</span>
<span>Repairs</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 bg-secondary-container dark:bg-primary-container text-on-secondary-container dark:text-on-primary-container font-bold rounded-lg scale-[0.99] duration-150 transition-all" href="#">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>assignment_ind</span>
<span>Assignment Engine</span>
</a>
</div>

<div className="mt-auto border-t border-outline-variant pt-4 flex flex-col gap-2">
<a className="flex items-center gap-3 px-4 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-all" href="#">
<span className="material-symbols-outlined text-[18px]">help</span>
<span>Support</span>
</a>
<a className="flex items-center gap-3 px-4 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-all" href="#">
<span className="material-symbols-outlined text-[18px]">person_search</span>
<span>Role Switcher</span>
</a>
</div>
</nav>

<main className="ml-[280px] flex-grow p-container-padding overflow-y-auto w-full max-w-[1440px] mx-auto bg-background">

<header className="mb-stack-gap pb-4 border-b border-outline-variant flex justify-between items-end">
<div>
<h2 className="text-display-lg font-display-lg text-on-surface">Automated Assignment Engine</h2>
<p className="text-body-md font-body-md text-on-surface-variant mt-1">Configure allocation rules and batch assign devices to student rosters.</p>
</div>
<div className="flex gap-4">
<button className="bg-surface text-on-background border border-outline-variant px-4 py-2 rounded-lg font-label-caps text-label-caps hover:shadow-md transition-shadow flex items-center gap-2">
<span className="material-symbols-outlined">qr_code_scanner</span>
                    Asset Tag Generator
                </button>
</div>
</header>
<div className="grid grid-cols-1 xl:grid-cols-12 gap-grid-gutter">

<div className="xl:col-span-4 flex flex-col gap-stack-gap">

<section className="bg-surface border border-outline-variant rounded-xl p-6 shadow-sm">
<div className="flex items-center justify-between mb-4">
<h3 className="text-title-sm font-title-sm text-on-surface flex items-center gap-2">
<span className="material-symbols-outlined text-secondary">rule_folder</span>
                            Allocation Rules
                        </h3>
<button className="text-secondary hover:text-primary transition-colors">
<span className="material-symbols-outlined">edit</span>
</button>
</div>
<div className="space-y-4">
<div className="p-4 border border-outline-variant rounded-lg bg-surface-container-lowest">
<label className="block text-label-caps font-label-caps text-on-surface-variant mb-1 uppercase">Rule 1: Priority Freshman</label>
<p className="text-body-md font-body-md text-on-surface font-medium">Grade 9 gets <span className="text-primary font-bold">New Chromebooks</span></p>
<p className="text-body-sm font-body-sm text-on-surface-variant mt-1">Model: CB-314-2H • Qty Available: 450</p>
</div>
<div className="p-4 border border-outline-variant rounded-lg bg-surface-container-lowest">
<label className="block text-label-caps font-label-caps text-on-surface-variant mb-1 uppercase">Rule 2: Returning Students</label>
<p className="text-body-md font-body-md text-on-surface font-medium">Grades 10-12 get <span className="text-secondary font-bold">Returning Inventory</span></p>
<p className="text-body-sm font-body-sm text-on-surface-variant mt-1">Model: Mixed (CB-311, CB-314) • Qty Available: 1,200</p>
</div>
<button className="w-full border border-dashed border-outline-variant text-on-surface-variant py-2 rounded-lg font-label-caps text-label-caps hover:bg-surface-container-low transition-colors flex justify-center items-center gap-2">
<span className="material-symbols-outlined text-[18px]">add_circle</span>
                            Add Rule
                        </button>
</div>
</section>

<section className="bg-surface border border-primary rounded-xl p-6 shadow-md relative overflow-hidden">
<div className="absolute top-0 right-0 p-4 opacity-10">
<span className="material-symbols-outlined text-[100px]">memory</span>
</div>
<h3 className="text-title-sm font-title-sm text-on-surface mb-2 relative z-10">Engine Status</h3>
<p className="text-body-sm font-body-sm text-on-surface-variant mb-6 relative z-10">Ready to process 1,450 student records against current inventory.</p>
<div className="mb-6">
<div className="flex justify-between text-label-caps font-label-caps text-on-surface-variant mb-1">
<span>Processing Allocation...</span>
<span id="progress-text">0%</span>
</div>
<div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
<div className="h-full bg-primary progress-bar-fill w-0" id="progress-bar"></div>
</div>
</div>
<button className="w-full bg-primary text-on-primary py-3 rounded-lg font-headline-md text-title-sm hover:opacity-90 transition-opacity shadow-sm flex justify-center items-center gap-2 relative z-10" id="run-engine-btn">
<span className="material-symbols-outlined">play_circle</span>
                        Run Engine
                    </button>
</section>
</div>

<div className="xl:col-span-8">
<section className="bg-surface border border-outline-variant rounded-xl shadow-sm h-full flex flex-col">
<div className="p-6 border-b border-outline-variant flex justify-between items-center bg-surface-container-lowest rounded-t-xl">
<div>
<h3 className="text-title-sm font-title-sm text-on-surface">Proposed Assignments Preview</h3>
<p className="text-body-sm font-body-sm text-on-surface-variant">Review allocations before committing to database.</p>
</div>
<div className="flex gap-2">
<span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-label-caps font-label-caps border border-secondary/20">
                                Draft Mode
                            </span>
</div>
</div>
<div className="overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead>
<tr className="bg-background border-b border-outline-variant">
<th className="p-table-cell-padding text-label-caps font-label-caps text-secondary font-semibold uppercase tracking-wider">Student ID</th>
<th className="p-table-cell-padding text-label-caps font-label-caps text-secondary font-semibold uppercase tracking-wider">Name</th>
<th className="p-table-cell-padding text-label-caps font-label-caps text-secondary font-semibold uppercase tracking-wider">Grade</th>
<th className="p-table-cell-padding text-label-caps font-label-caps text-secondary font-semibold uppercase tracking-wider">Proposed Asset</th>
<th className="p-table-cell-padding text-label-caps font-label-caps text-secondary font-semibold uppercase tracking-wider">Model Rule</th>
</tr>
</thead>
<tbody className="text-body-sm font-body-sm text-on-surface">
<tr className="border-b border-surface-container-highest hover:bg-background transition-colors">
<td className="p-table-cell-padding font-mono-data text-mono-data text-on-surface-variant">#STU-9021</td>
<td className="p-table-cell-padding font-medium">Alice Johnson</td>
<td className="p-table-cell-padding">09</td>
<td className="p-table-cell-padding">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-[16px] text-primary">laptop_mac</span>
<span className="font-mono-data text-mono-data">NEW-CB-001</span>
</div>
</td>
<td className="p-table-cell-padding">
<span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-[10px] font-label-caps font-bold">Rule 1</span>
</td>
</tr>
<tr className="border-b border-surface-container-highest hover:bg-background transition-colors">
<td className="p-table-cell-padding font-mono-data text-mono-data text-on-surface-variant">#STU-8834</td>
<td className="p-table-cell-padding font-medium">Brian Smith</td>
<td className="p-table-cell-padding">09</td>
<td className="p-table-cell-padding">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-[16px] text-primary">laptop_mac</span>
<span className="font-mono-data text-mono-data">NEW-CB-002</span>
</div>
</td>
<td className="p-table-cell-padding">
<span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-[10px] font-label-caps font-bold">Rule 1</span>
</td>
</tr>
<tr className="border-b border-surface-container-highest hover:bg-background transition-colors">
<td className="p-table-cell-padding font-mono-data text-mono-data text-on-surface-variant">#STU-7112</td>
<td className="p-table-cell-padding font-medium">Carlos Davis</td>
<td className="p-table-cell-padding">11</td>
<td className="p-table-cell-padding">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-[16px] text-secondary">computer</span>
<span className="font-mono-data text-mono-data">RET-CB-542</span>
</div>
</td>
<td className="p-table-cell-padding">
<span className="bg-surface-tint/10 text-surface-tint px-2 py-1 rounded-full text-[10px] font-label-caps font-bold">Rule 2</span>
</td>
</tr>
<tr className="border-b border-surface-container-highest hover:bg-background transition-colors">
<td className="p-table-cell-padding font-mono-data text-mono-data text-on-surface-variant">#STU-7115</td>
<td className="p-table-cell-padding font-medium">Diana Evans</td>
<td className="p-table-cell-padding">12</td>
<td className="p-table-cell-padding">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-[16px] text-secondary">computer</span>
<span className="font-mono-data text-mono-data">RET-CB-543</span>
</div>
</td>
<td className="p-table-cell-padding">
<span className="bg-surface-tint/10 text-surface-tint px-2 py-1 rounded-full text-[10px] font-label-caps font-bold">Rule 2</span>
</td>
</tr>
</tbody>
</table>
</div>
<div className="p-4 mt-auto border-t border-outline-variant bg-surface-container-lowest rounded-b-xl flex justify-between items-center">
<span className="text-body-sm font-body-sm text-on-surface-variant">Showing 4 of 1,450 projected assignments</span>
<div className="flex gap-2">
<button className="px-3 py-1 text-on-surface-variant hover:text-primary transition-colors text-body-sm font-body-sm flex items-center gap-1">
<span className="material-symbols-outlined text-[16px]">chevron_left</span> Prev
                            </button>
<button className="px-3 py-1 text-on-surface-variant hover:text-primary transition-colors text-body-sm font-body-sm flex items-center gap-1">
                                Next <span className="material-symbols-outlined text-[16px]">chevron_right</span>
</button>
</div>
</div>
</section>
</div>
</div>
</main>


    </>
  );
}