/* ═══════════════════════════════════════════════════════════════
   INVOICE TEMPLATE SETTINGS — إعدادات تخصيص عرض الفاتورة
   ═══════════════════════════════════════════════════════════════ */

function getInvoiceTemplate(){
  const co=currentCompany();
  return {...getInvoiceTemplateDefaults(),...(co&&co.invoiceTemplate||{})};
}

function saveInvoiceTemplate(){
  try{
    const existing=getInvoiceTemplate();
    const tpl={
      accentColor:G('tpl-accent-color')?.value||'#4f8ef7',
      secondaryColor:G('tpl-secondary-color')?.value||'#6c5ce7',
      useGradient:G('tpl-use-gradient')?.checked!==false,
      paperSize:G('tpl-paper-size')?.value||'portrait',
      fontSize:parseInt(G('tpl-font-size')?.value)||12,
      fontFamily:G('tpl-font-family')?.value||'Cairo',
      borderRadius:parseInt(G('tpl-border-radius')?.value)||8,
      logoHeight:parseInt(G('tpl-logo-height')?.value)||55,
      tableHeaderStyle:G('tpl-table-header-style')?.value||'gradient',
      tableRowStyle:G('tpl-table-row-style')?.value||'alternating',
      watermarkText:G('tpl-watermark-text')?.value||'',
      watermarkOpacity:parseInt(G('tpl-watermark-opacity')?.value)||3,
      watermarkRotation:parseInt(G('tpl-watermark-rotation')?.value)||-32,
      qrSize:parseInt(G('tpl-qr-size')?.value)||100,
      showLogo:G('tpl-show-logo')?.checked!==false,
      showCompanyInfo:G('tpl-show-company-info')?.checked!==false,
      showTaxNo:G('tpl-show-tax-no')?.checked!==false,
      showBadge:G('tpl-show-badge')?.checked!==false,
      showInfoGrid:G('tpl-show-info-grid')?.checked!==false,
      showQrCode:G('tpl-show-qr')?.checked!==false,
      showTerms:G('tpl-show-terms')?.checked!==false,
      showStamps:G('tpl-show-stamps')?.checked!==false,
      showWatermark:G('tpl-show-watermark')?.checked!==false,
      showFooter:G('tpl-show-footer')?.checked!==false,
      showNotes:G('tpl-show-notes')?.checked!==false,
      showPaymentDetails:G('tpl-show-payment')?.checked!==false,
      showItemCode:G('tpl-show-item-code')?.checked,
      showItemBarcode:G('tpl-show-item-barcode')?.checked,
      showUnitPrice:G('tpl-show-unit-price')?.checked!==false,
      showDiscountCol:G('tpl-show-discount-col')?.checked!==false,
      showItemImage:G('tpl-show-item-image')?.checked,
      sectionOrder:getSectionOrder(),
      termsText:(G('tpl-terms-text')?.value||'').split('\n').filter(l=>l.trim()),
      customFooterText:G('tpl-footer-text')?.value||'',
      customTitle:G('tpl-custom-title')?.value||'',
      customCss:G('tpl-custom-css')?.value||'',
      savedTemplates:existing.savedTemplates||[],
      activeTemplate:existing.activeTemplate||''
    };
    const co=currentCompany();
    if(co){
      co.invoiceTemplate=tpl;
      saveCompanyData();
      saveState();
    }
    closeModal('m-invoice-tpl');
    toast(t('settings_saved'));
  }catch(e){
    console.error('saveInvoiceTemplate error',e);
    toast('خطأ في الحفظ','error');
  }
}

function resetInvoiceTemplate(){
  const tpl=getInvoiceTemplateDefaults();
  const co=currentCompany();
  if(co){co.invoiceTemplate=tpl;saveCompanyData();saveState();}
  renderInvoiceTemplateModal();
  toast(t('settings_reset'));
}

function previewInvoiceTemplate(){
  const co=currentCompany();
  if(!co)return;
  const invs=DB.invs;
  if(invs.length>0){
    printInvoice('sale',invs[invs.length-1].id);
  } else {
    const purs=DB.purs;
    if(purs.length>0) printInvoice('purchase',purs[purs.length-1].id);
    else toast('لا توجد فواتير للمعاينة','error');
  }
}

function applyPreset(presetId){
  const preset=INVOICE_PRESETS.find(p=>p.id===presetId);
  if(!preset)return;
  if(G('tpl-accent-color'))G('tpl-accent-color').value=preset.accent;
  if(G('tpl-secondary-color'))G('tpl-secondary-color').value=preset.secondary;
  if(G('tpl-use-gradient'))G('tpl-use-gradient').checked=preset.gradient;
}

function getSectionOrder(){
  const el=G('tpl-section-order');
  if(!el)return ['header','infoGrid','table','summary','terms','stamps','footer'];
  return Array.from(el.children).map(c=>c.dataset.section).filter(Boolean);
}

function renderSectionOrder(){
  const tpl=getInvoiceTemplate();
  const order=tpl.sectionOrder||['header','infoGrid','table','summary','terms','stamps','footer'];
  const labels={header:'الرأس',infoGrid:'معلومات الفاتورة',table:'جدول المنتجات',summary:'الملخص',terms:'الشروط والأحكام',stamps:'الختم والتوقيع',footer:'التذييل'};
  const el=G('tpl-section-order');
  if(!el)return;
  el.innerHTML=order.map(s=>`<div data-section="${s}" draggable="true" style="padding:6px 10px;background:var(--bg-elevated);border:1px solid var(--border);border-radius:6px;cursor:grab;display:flex;align-items:center;gap:8px;font-size:12px"><i class="ti ti-grip-vertical" style="color:var(--text-muted)"></i>${labels[s]||s}</div>`).join('');
  let dragEl=null;
  el.querySelectorAll('[draggable]').forEach(item=>{
    item.addEventListener('dragstart',e=>{dragEl=item;item.style.opacity='0.4'});
    item.addEventListener('dragend',e=>{item.style.opacity='1';dragEl=null});
    item.addEventListener('dragover',e=>{e.preventDefault();item.style.borderTop='2px solid var(--accent)'});
    item.addEventListener('dragleave',e=>{item.style.borderTop=''});
    item.addEventListener('drop',e=>{
      e.preventDefault();item.style.borderTop='';
      if(dragEl&&dragEl!==item){const parent=item.parentNode;parent.insertBefore(dragEl,item)}
    });
  });
}

function exportInvoiceTemplate(){
  const tpl=getInvoiceTemplate();
  const json=JSON.stringify(tpl,null,2);
  const blob=new Blob([json],{type:'application/json'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');
  a.href=url;a.download='invoice-template-'+Date.now()+'.json';
  a.click();URL.revokeObjectURL(url);
  toast('تم التصدير بنجاح');
}

function importInvoiceTemplate(e){
  const file=e.target.files[0];if(!file)return;
  const reader=new FileReader();
  reader.onload=function(ev){
    try{
      const tpl=JSON.parse(ev.target.result);
      const co=currentCompany();
      if(co){co.invoiceTemplate={...getInvoiceTemplateDefaults(),...tpl};saveCompanyData();saveState();}
      renderInvoiceTemplateModal();
      toast('تم الاستيراد بنجاح');
    }catch(err){toast('خطأ في الملف','error')}
  };
  reader.readAsText(file);
  e.target.value='';
}

function saveAsTemplate(){
  const name=G('tpl-template-name')?.value?.trim();
  if(!name){toast('أدخل اسم القالب','error');return}
  const tpl=getInvoiceTemplate();
  const templates=tpl.savedTemplates||[];
  const existing=templates.findIndex(t=>t.name===name);
  const snapshot={...tpl};delete snapshot.savedTemplates;delete snapshot.activeTemplate;
  if(existing>=0) templates[existing]={name,data:snapshot};
  else templates.push({name,data:snapshot});
  const co=currentCompany();
  if(co){co.invoiceTemplate.savedTemplates=templates;co.invoiceTemplate.activeTemplate=name;saveCompanyData();saveState();}
  renderTemplateList();
  toast('تم حفظ القالب: '+name);
}

function loadTemplate(name){
  const tpl=getInvoiceTemplate();
  const templates=tpl.savedTemplates||[];
  const found=templates.find(t=>t.name===name);
  if(!found)return;
  const co=currentCompany();
  if(co){co.invoiceTemplate={...getInvoiceTemplateDefaults(),...found.data,savedTemplates:templates,activeTemplate:name};saveCompanyData();saveState();}
  renderInvoiceTemplateModal();
  toast('تم تحميل القالب: '+name);
}

function deleteTemplate(name){
  const tpl=getInvoiceTemplate();
  const templates=(tpl.savedTemplates||[]).filter(t=>t.name!==name);
  const co=currentCompany();
  if(co){co.invoiceTemplate.savedTemplates=templates;if(co.invoiceTemplate.activeTemplate===name)co.invoiceTemplate.activeTemplate='';saveCompanyData();saveState();}
  renderTemplateList();
}

function renderTemplateList(){
  const tpl=getInvoiceTemplate();
  const templates=tpl.savedTemplates||[];
  const el=G('tpl-template-list');
  if(!el)return;
  if(!templates.length){el.innerHTML='<div style="font-size:11px;color:var(--text-muted)">لا توجد قوالب محفوظة</div>';return}
  el.innerHTML=templates.map(t=>`<div style="display:flex;align-items:center;justify-content:space-between;padding:6px 10px;background:var(--bg-elevated);border:1px solid var(--border);border-radius:6px;font-size:12px">
    <span style="display:flex;align-items:center;gap:6px;cursor:pointer" onclick="loadTemplate('${escapeHtml(t.name)}')"><i class="ti ti-file-text" style="color:var(--accent)"></i>${escapeHtml(t.name)}${tpl.activeTemplate===t.name?' <span style="color:var(--accent);font-size:10px">(نشط)</span>':''}</span>
    <button class="btn btn-icon" style="width:24px;height:24px" onclick="deleteTemplate('${escapeHtml(t.name)}')"><i class="ti ti-trash" style="font-size:12px;color:var(--red)"></i></button>
  </div>`).join('');
}

function renderInvoiceTemplateModal(){
  const tpl=getInvoiceTemplate();
  const g=(id)=>G(id);
  if(g('tpl-accent-color'))g('tpl-accent-color').value=tpl.accentColor;
  if(g('tpl-secondary-color'))g('tpl-secondary-color').value=tpl.secondaryColor;
  if(g('tpl-use-gradient'))g('tpl-use-gradient').checked=tpl.useGradient;
  if(g('tpl-paper-size'))g('tpl-paper-size').value=tpl.paperSize;
  if(g('tpl-font-size'))g('tpl-font-size').value=tpl.fontSize;
  if(g('tpl-border-radius'))g('tpl-border-radius').value=tpl.borderRadius;
  if(g('tpl-logo-height'))g('tpl-logo-height').value=tpl.logoHeight;
  if(g('tpl-table-header-style'))g('tpl-table-header-style').value=tpl.tableHeaderStyle;
  if(g('tpl-table-row-style'))g('tpl-table-row-style').value=tpl.tableRowStyle;
  if(g('tpl-watermark-text'))g('tpl-watermark-text').value=tpl.watermarkText||'';
  if(g('tpl-watermark-opacity'))g('tpl-watermark-opacity').value=tpl.watermarkOpacity??3;
  if(g('tpl-watermark-rotation'))g('tpl-watermark-rotation').value=tpl.watermarkRotation??-32;
  if(g('tpl-qr-size'))g('tpl-qr-size').value=tpl.qrSize||100;
  if(g('tpl-show-logo'))g('tpl-show-logo').checked=tpl.showLogo;
  if(g('tpl-show-company-info'))g('tpl-show-company-info').checked=tpl.showCompanyInfo;
  if(g('tpl-show-tax-no'))g('tpl-show-tax-no').checked=tpl.showTaxNo;
  if(g('tpl-show-badge'))g('tpl-show-badge').checked=tpl.showBadge;
  if(g('tpl-show-info-grid'))g('tpl-show-info-grid').checked=tpl.showInfoGrid;
  if(g('tpl-show-qr'))g('tpl-show-qr').checked=tpl.showQrCode;
  if(g('tpl-show-terms'))g('tpl-show-terms').checked=tpl.showTerms;
  if(g('tpl-show-stamps'))g('tpl-show-stamps').checked=tpl.showStamps;
  if(g('tpl-show-watermark'))g('tpl-show-watermark').checked=tpl.showWatermark;
  if(g('tpl-show-footer'))g('tpl-show-footer').checked=tpl.showFooter;
  if(g('tpl-show-notes'))g('tpl-show-notes').checked=tpl.showNotes;
  if(g('tpl-show-payment'))g('tpl-show-payment').checked=tpl.showPaymentDetails;
  if(g('tpl-show-item-code'))g('tpl-show-item-code').checked=tpl.showItemCode;
  if(g('tpl-show-item-barcode'))g('tpl-show-item-barcode').checked=tpl.showItemBarcode;
  if(g('tpl-show-unit-price'))g('tpl-show-unit-price').checked=tpl.showUnitPrice;
  if(g('tpl-show-discount-col'))g('tpl-show-discount-col').checked=tpl.showDiscountCol;
  if(g('tpl-show-item-image'))g('tpl-show-item-image').checked=tpl.showItemImage;
  if(g('tpl-terms-text'))g('tpl-terms-text').value=(tpl.termsText||[]).join('\n');
  if(g('tpl-footer-text'))g('tpl-footer-text').value=tpl.customFooterText||'';
  if(g('tpl-custom-title'))g('tpl-custom-title').value=tpl.customTitle||'';
  if(g('tpl-custom-css'))g('tpl-custom-css').value=tpl.customCss||'';
  renderFontFamilySelect(tpl.fontFamily);
  renderPresets(tpl);
  renderSectionOrder();
  renderTemplateList();
}

function renderFontFamilySelect(selected){
  const el=G('tpl-font-family');if(!el)return;
  el.innerHTML=INVOICE_FONTS.map(f=>`<option value="${f.id}"${f.id===selected?' selected':''}>${f.name}</option>`).join('');
}

function renderPresets(tpl){
  const el=G('tpl-presets');if(!el)return;
  el.innerHTML=INVOICE_PRESETS.map(p=>`<button class="btn btn-sm" onclick="applyPreset('${p.id}')" style="display:flex;align-items:center;gap:6px;border:2px solid ${(tpl.accentColor===p.accent)?p.accent:'var(--border)'};padding:4px 12px;border-radius:8px;cursor:pointer;background:var(--bg-elevated);font-size:12px"><span style="width:14px;height:14px;border-radius:50%;background:${p.gradient?'linear-gradient(135deg,'+p.accent+','+p.secondary+')':p.accent};display:inline-block"></span>${p.name}</button>`).join('');
}

function openInvoiceTemplateModal(){
  renderInvoiceTemplateModal();
  openModal('m-invoice-tpl');
}
