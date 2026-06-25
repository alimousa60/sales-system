/* ═══ BARCODE SCANNER ═══ */
let _html5QrCode=null;
let _scannerRunning=false;

function startBarcodeScanner(){
  openModal('m-barcode-scanner');
  const resultEl=G('barcode-result');
  const statusEl=G('scanner-status');
  if(resultEl)resultEl.style.display='none';
  if(statusEl)statusEl.textContent='وجّه الكاميرا نحو الباركود';
  initScanner();
}

function initScanner(){
  if(typeof Html5Qrcode==='undefined'){
    loadScript('https://unpkg.com/html5-qrcode@2.3.8/html5-qrcode.min.js').then(()=>setupScanner());
  }else{
    setupScanner();
  }
}

function setupScanner(){
  try{
    _html5QrCode=new Html5Qrcode('barcode-reader');
    _scannerRunning=true;
    _html5QrCode.start(
      {facingMode:'environment'},
      {fps:10,qrbox:{width:250,height:150},aspectRatio:1.5},
      onScanSuccess,
      ()=>{}
    ).catch(err=>{
      const statusEl=G('scanner-status');
      if(statusEl)statusEl.textContent='خطأ في تشغيل الكاميرا: '+err;
    });
  }catch(e){
    const statusEl=G('scanner-status');
    if(statusEl)statusEl.textContent='خطأ: '+e.message;
  }
}

function onScanSuccess(decodedText){
  if(!_scannerRunning)return;
  _scannerRunning=false;
  try{_html5QrCode.pause();}catch(e){}
  const resultEl=G('barcode-result');
  const valueEl=G('barcode-value');
  const statusEl=G('scanner-status');
  if(resultEl)resultEl.style.display='block';
  if(valueEl)valueEl.textContent=decodedText;
  if(statusEl)statusEl.textContent='تم المسح بنجاح!';
  try{if(navigator.vibrate)navigator.vibrate(100);}catch(e){}
  const item=DB.items.find(x=>x.barcode===decodedText);
  if(item){
    showPage('inventory');
    setTimeout(()=>{
      const searchEl=G('inv-search');
      if(searchEl){searchEl.value=item.name;filterItems(item.name);}
      toast('تم العثور على: '+item.name,'success',{icon:'ti-barcode'});
    },300);
  }else{
    showPage('inventory');
    setTimeout(()=>{
      const searchEl=G('inv-search');
      if(searchEl){searchEl.value=decodedText;filterItems(decodedText);}
      toast('لم يتم العثور على صنف بالباركود: '+decodedText,'info');
    },300);
  }
  setTimeout(()=>stopBarcodeScanner(),800);
}

function stopBarcodeScanner(){
  _scannerRunning=false;
  if(_html5QrCode){
    try{_html5QrCode.stop().then(()=>{_html5QrCode.clear();});}catch(e){try{_html5QrCode.clear();}catch(e2){}}
    _html5QrCode=null;
  }
  closeModal('m-barcode-scanner');
  const readerEl=G('barcode-reader');
  if(readerEl)readerEl.innerHTML='';
}

function loadScript(src){
  return new Promise((resolve,reject)=>{
    if(document.querySelector(`script[src="${src}"]`)){resolve();return;}
    const s=document.createElement('script');
    s.src=src;s.onload=resolve;s.onerror=reject;
    document.head.appendChild(s);
  });
}
