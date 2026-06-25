/* ═══ CHARTS ═══ */
let _dashSalesChart=null,_dashPayChart=null,_dashTrendChart=null,_plChart=null;

function getChartColors(){
  return{
    accent:'#4f8ef7',green:'#2dd17e',amber:'#f5a623',red:'#f05454',purple:'#a855f7',cyan:'#22d3ee',teal:'#14b8a6',
    accentA:'rgba(79,142,247,.2)',greenA:'rgba(45,209,126,.2)',amberA:'rgba(245,166,35,.2)',redA:'rgba(240,84,84,.2)'
  };
}

const _chartTooltip={
  backgroundColor:'rgba(16,19,26,.92)',
  titleColor:'#e8edf5',
  bodyColor:'#7a8699',
  borderColor:'rgba(255,255,255,.08)',
  borderWidth:1,
  cornerRadius:10,
  padding:12,
  titleFont:{weight:'700'},
  bodyFont:{size:12},
  displayColors:true,
  boxWidth:10,
  boxHeight:10,
  boxPadding:4,
  usePointStyle:true
};

function renderDashCharts(){
  if(typeof Chart==='undefined')return;
  const c=getChartColors();
  const invs=[...DB.invs].reverse().slice(0,30);
  const days=[];
  for(let i=6;i>=0;i--){
    const d=new Date();d.setDate(d.getDate()-i);
    const key=d.toISOString().slice(0,10);
    const dayLabel=d.toLocaleDateString('ar',{weekday:'short'});
    const sales=invs.filter(inv=>inv.date===key).reduce((s,inv)=>s+inv.total,0);
    days.push({key,label:dayLabel,sales});
  }
  const sCtx=G('dash-sales-chart');
  if(sCtx){
    if(_dashSalesChart)_dashSalesChart.destroy();
    _dashSalesChart=new Chart(sCtx,{type:'bar',data:{labels:days.map(d=>d.label),datasets:[{label:'المبيعات',data:days.map(d=>d.sales),backgroundColor:c.accentA,borderColor:c.accent,borderWidth:2,borderRadius:8,borderSkipped:false}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false},tooltip:{..._chartTooltip,callbacks:{label:ctx=>fmt(ctx.parsed.y)+' د.ل'}}},scales:{y:{beginAtZero:true,grid:{color:'rgba(128,128,128,.08)',drawBorder:false},ticks:{callback:v=>fmt(v),font:{size:11}},border:{display:false}},x:{grid:{display:false},ticks:{font:{size:11}}}}}});
  }
  const cashTotal=DB.payments.filter(p=>p.mode==='cash').reduce((s,p)=>s+p.amount,0);
  const checkTotal=DB.payments.filter(p=>p.mode==='check').reduce((s,p)=>s+p.amount,0);
  const transferTotal=DB.payments.filter(p=>p.mode==='transfer').reduce((s,p)=>s+p.amount,0);
  const supTotal=DB.supPayments.reduce((s,p)=>s+p.amount,0);
  const pCtx=G('dash-pay-chart');
  if(pCtx){
    if(_dashPayChart)_dashPayChart.destroy();
    _dashPayChart=new Chart(pCtx,{type:'doughnut',data:{labels:['نقدي وارد','صكوك واردة','تحويلات واردة','مدفوعات للموردين'],datasets:[{data:[cashTotal,checkTotal,transferTotal,supTotal],backgroundColor:[c.green,c.accent,c.cyan,c.red],borderWidth:3,borderColor:c.accent,hoverOffset:8}]},options:{responsive:true,maintainAspectRatio:false,cutout:'68%',plugins:{legend:{position:'bottom',labels:{boxWidth:12,padding:10,font:{size:11},usePointStyle:true,pointStyle:'circle'}},tooltip:{..._chartTooltip,callbacks:{label:ctx=>ctx.label+': '+fmt(ctx.parsed)+' د.ل'}}}}});
  }
  /* Trend Chart — 30-day sales vs purchases */
  const tCtx=G('dash-trend-chart');
  if(tCtx){
    if(_dashTrendChart)_dashTrendChart.destroy();
    const trendDays=[];
    for(let i=29;i>=0;i--){
      const d=new Date();d.setDate(d.getDate()-i);
      const key=d.toISOString().slice(0,10);
      const dayLabel=d.toLocaleDateString('ar',{day:'numeric',month:'short'});
      const sales=invs.filter(inv=>inv.date===key).reduce((s,inv)=>s+inv.total,0);
      const purchases=[...DB.purs].filter(p=>p.date===key).reduce((s,p)=>s+p.total,0);
      trendDays.push({key,label:dayLabel,sales,purchases});
    }
    _dashTrendChart=new Chart(tCtx,{type:'line',data:{labels:trendDays.map(d=>d.label),datasets:[
      {label:'المبيعات',data:trendDays.map(d=>d.sales),borderColor:c.green,backgroundColor:'rgba(45,209,126,.08)',fill:true,tension:.4,pointRadius:0,pointHoverRadius:5,borderWidth:2},
      {label:'المشتريات',data:trendDays.map(d=>d.purchases),borderColor:c.purple,backgroundColor:'rgba(155,114,247,.08)',fill:true,tension:.4,pointRadius:0,pointHoverRadius:5,borderWidth:2}
    ]},options:{responsive:true,maintainAspectRatio:false,interaction:{intersect:false,mode:'index'},plugins:{legend:{position:'bottom',labels:{boxWidth:12,padding:10,font:{size:11},usePointStyle:true,pointStyle:'circle'}},tooltip:{..._chartTooltip,callbacks:{label:ctx=>ctx.dataset.label+': '+fmt(ctx.parsed.y)+' د.ل'}}},scales:{y:{beginAtZero:true,grid:{color:'rgba(128,128,128,.08)',drawBorder:false},ticks:{callback:v=>fmt(v),font:{size:10}},border:{display:false}},x:{grid:{display:false},ticks:{maxTicksLimit:10,font:{size:9}}}}}});
  }
}

function renderPLChart(){
  if(typeof Chart==='undefined')return;
  const c=getChartColors();
  const soldItems={};
  DB.invs.forEach(inv=>(inv.lines||[]).forEach(l=>{
    if(!soldItems[l.name])soldItems[l.name]={qty:0,revenue:0,cost:0};
    soldItems[l.name].qty+=l.qty;
    soldItems[l.name].revenue+=l.total||l.qty*l.price;
    soldItems[l.name].cost+=l.qty*(l.buyPrice||0);
  }));
  const items=Object.entries(soldItems).map(([name,d])=>({name,...d,profit:d.revenue-d.cost})).filter(x=>x.revenue>0).sort((a,b)=>b.profit-a.profit).slice(0,6);
  const ctx=G('pl-chart');
  if(!ctx)return;
  if(_plChart)_plChart.destroy();
  _plChart=new Chart(ctx,{type:'bar',data:{labels:items.map(i=>i.name),datasets:[{label:'الإيراد',data:items.map(i=>i.revenue),backgroundColor:c.greenA,borderColor:c.green,borderWidth:2,borderRadius:8,borderSkipped:false},{label:'التكلفة',data:items.map(i=>i.cost),backgroundColor:c.redA,borderColor:c.red,borderWidth:2,borderRadius:8,borderSkipped:false},{label:'الربح',data:items.map(i=>i.profit),backgroundColor:c.accentA,borderColor:c.accent,borderWidth:2,borderRadius:8,borderSkipped:false}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'bottom',labels:{boxWidth:12,padding:10,font:{size:11},usePointStyle:true,pointStyle:'circle'}},tooltip:{..._chartTooltip,callbacks:{label:ctx=>ctx.dataset.label+': '+fmt(ctx.parsed.y)+' د.ل'}}},scales:{y:{beginAtZero:true,grid:{color:'rgba(128,128,128,.08)',drawBorder:false},ticks:{callback:v=>fmt(v),font:{size:11}},border:{display:false}},x:{grid:{display:false},ticks:{font:{size:11}}}}}});
}
