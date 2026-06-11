function nLL(){
  oM('+ Novo Lead de Locação',
    '<div class="fg2">'+
      '<div class="fg"><label>Nome</label><input id="nl2-n" placeholder="Nome do interessado"></div>'+
      '<div class="fg"><label>Telefone</label><input id="nl2-tel" placeholder="(64)9 9000-0000"></div>'+
    '</div>'+
    '<div class="fg3">'+
      '<div class="fg"><label>Tipo de Imóvel</label><select id="nl2-t">'+
        ['Casa','Apartamento','Kitnet','Sala Comercial','Chalé','Lote','Chácara'].map(function(t){return '<option>'+t+'</option>';}).join('')+
      '</select></div>'+
      '<div class="fg"><label>Bairro Desejado</label><input id="nl2-b" placeholder="Ex: Centro, Mansões..."></div>'+
      '<div class="fg"><label>Quartos</label><select id="nl2-q"><option>1</option><option>2</option><option>3</option><option>4+</option></select></div>'+
    '</div>'+
    '<div class="fg2">'+
      '<div class="fg"><label>Faixa de Aluguel</label><input id="nl2-f" placeholder="Ex: R$ 800–1.200"></div>'+
      '<div class="fg"><label>Data</label><input type="date" id="nl2-d" value="'+new Date().toISOString().slice(0,10)+'"></div>'+
    '</div>'+
    '<div class="fg2">'+
      '<div class="fg"><label>Corretor Responsável</label><select id="nl2-c">'+corrSel()+'</select></div>'+
      '<div class="fg"><label>Status</label><select id="nl2-s"><option>Novo</option><option>Em contato</option><option>Visita agendada</option><option>Proposta</option><option>Fechado</option><option>Descartado</option></select></div>'+
    '</div>'+
    '<div class="fg2">'+
      '<div class="fg"><label>Aceita Pet?</label><select id="nl2-pet"><option value="0">Não</option><option value="1">Sim</option></select></div>'+
      '<div class="fg"><label>Observação</label><input id="nl2-o" placeholder="Observações adicionais..."></div>'+
    '</div>',
    function(){
      var nome=document.getElementById('nl2-n').value.trim();
      if(!nome){alert('Informe o nome do lead.');return;}
      llD.unshift({
        id:llD.length+1,
        dt:document.getElementById('nl2-d').value,
        nome:nome,
        tel:document.getElementById('nl2-tel').value||'-',
        tipo:document.getElementById('nl2-t').value,
        faixa:document.getElementById('nl2-f').value||'-',
        bairro:document.getElementById('nl2-b').value||'-',
        quartos:document.getElementById('nl2-q').value,
        pet:document.getElementById('nl2-pet').value==='1',
        cor:document.getElementById('nl2-c').value,
        st:document.getElementById('nl2-s').value,
        obs:document.getElementById('nl2-o').value
      });
      cM(); salvarTudo(); pLL();
    }, 'Salvar Lead');
}

function eLL(i){
  var l=llD[i];
  oM('Editar Lead Locação — '+l.nome,
    '<div class="fg2">'+
      '<div class="fg"><label>Nome</label><input id="el2-n" value="'+l.nome+'"></div>'+
      '<div class="fg"><label>Telefone</label><input id="el2-tel" value="'+l.tel+'"></div>'+
    '</div>'+
    '<div class="fg3">'+
      '<div class="fg"><label>Tipo</label><select id="el2-t">'+
        ['Casa','Apartamento','Kitnet','Sala Comercial','Chalé','Lote','Chácara'].map(function(t){return '<option'+(t===l.tipo?' selected':'')+'>'+t+'</option>';}).join('')+
      '</select></div>'+
      '<div class="fg"><label>Bairro</label><input id="el2-b" value="'+(l.bairro||'')+'"></div>'+
      '<div class="fg"><label>Quartos</label><select id="el2-q">'+
        ['1','2','3','4+'].map(function(q){return '<option'+(q===l.quartos?' selected':'')+'>'+q+'</option>';}).join('')+
      '</select></div>'+
    '</div>'+
    '<div class="fg2">'+
      '<div class="fg"><label>Faixa de Aluguel</label><input id="el2-f" value="'+(l.faixa||'')+'"></div>'+
      '<div class="fg"><label>Pet</label><select id="el2-pet"><option value="0"'+(l.pet?'':' selected')+'>Não</option><option value="1"'+(l.pet?' selected':'')+'>Sim</option></select></div>'+
    '</div>'+
    '<div class="fg2">'+
      '<div class="fg"><label>Corretor</label><select id="el2-c">'+corrSel(l.cor)+'</select></div>'+
      '<div class="fg"><label>Status</label><select id="el2-s">'+
        ['Novo','Em contato','Visita agendada','Proposta','Fechado','Descartado'].map(function(s){return '<option'+(s===l.st?' selected':'')+'>'+s+'</option>';}).join('')+
      '</select></div>'+
    '</div>'+
    '<div class="fg"><label>Observação</label><textarea id="el2-o">'+(l.obs||'')+'</textarea></div>',
    function(){
      llD[i].nome=document.getElementById('el2-n').value||l.nome;
      llD[i].tel=document.getElementById('el2-tel').value;
      llD[i].tipo=document.getElementById('el2-t').value;
      llD[i].bairro=document.getElementById('el2-b').value;
      llD[i].quartos=document.getElementById('el2-q').value;
      llD[i].faixa=document.getElementById('el2-f').value;
      llD[i].pet=document.getElementById('el2-pet').value==='1';
      llD[i].cor=document.getElementById('el2-c').value;
      llD[i].st=document.getElementById('el2-s').value;
      llD[i].obs=document.getElementById('el2-o').value;
      cM(); salvarTudo(); pLL();
    }, 'Salvar');
}

function delLL(i){
  excluirComSenha(
    'Lead Locação — '+llD[i].nome,
    'Remover lead de locação de <b>'+llD[i].nome+'</b> ('+llD[i].tipo+' / '+llD[i].faixa+')',
    function(){ llD.splice(i,1); salvarTudo(); pLL(); }
  );
}

// ===== VISTORIAS (com upload de laudo, contrato e fotos) =====
function pLV(){
  document.getElementById('pa').innerHTML='<button class="btn btn-red" onclick="nVistoria()">+ Nova Vistoria</button>';
  var r=''; vsD.forEach(function(v,i){
    r+='<tr>'+
    '<td style="font-weight:700">'+v.id+'</td>'+
    '<td><span class="badge '+(v.tipo==='Entrada'?'bg':'br')+'">'+v.tipo+'</span></td>'+
    '<td style="font-weight:600">'+v.prop+'</td>'+
    '<td>'+v.inq+'</td>'+
    '<td>'+v.dt+' '+v.hr+'</td>'+
    '<td>'+v.vis+'</td>'+
    '<td><span class="badge bg">'+v.res+'</span></td>'+
    '<td>'+sBadge(v.ass==='Sim'?'Recebido':'Nao recebido')+'</td>'+
    '<td><span class="badge '+(v.cont==='Nao'?'bg':'br')+'">'+v.cont+'</span></td>'+
    '<td style="display:flex;gap:3px">'+
    '<span class="badge bgr">'+((v.fotos||[]).length)+' fotos</span>'+
    '<span class="badge bb">'+((v.laudos||[]).length)+' laudos</span>'+
    '<span class="badge bt">'+((v.contratos||[]).length)+' cts</span>'+
    '</td>'+
    '<td style="display:flex;gap:3px">'+
    '<button class="btn btn-sm" onclick="vVst('+i+')">Ver</button>'+
    '<button class="btn btn-sm btn-blue" onclick="eVst('+i+')">Editar</button>'+
    '</td></tr>';
  });
  document.getElementById('pc').innerHTML=
    '<div class="card"><div class="chd"><h3>Arquivo de Laudos de Vistoria</h3></div>'+
    '<div class="tw"><table><thead><tr>'+
    '<th>Num</th><th>Tipo</th><th>Proprietário</th><th>Inquilino</th><th>Data/Hora</th><th>Vistoriador</th>'+
    '<th>Resultado</th><th>Assinado</th><th>Contestado</th><th>Arquivos</th><th>Ações</th>'+
    '</tr></thead><tbody>'+r+'</tbody></table></div></div>';
}

function vVst(i){
  var v=vsD[i]; var ck=v.checklist||{};
  function secH(nome,obj){
    if(!obj) return '';
    var h='<div style="margin-bottom:8px"><div class="sec-title">'+nome+'</div>'+
    '<table style="width:100%;font-size:11px"><tbody>';
    for(var k in obj){
      if(k==='obs') continue;
      var badge=obj[k]==='Otimo'||obj[k]==='Boa'||obj[k]==='Nao'?'bg':obj[k]==='Bom'?'bg':obj[k]==='Regular'?'by':'br';
      h+='<tr><td style="width:100px;color:var(--lm);padding:3px 0">'+k+'</td><td><span class="badge '+badge+'">'+obj[k]+'</span></td></tr>';
    }
    if(obj.obs&&obj.obs!=='-') h+='<tr><td style="color:var(--lm)">Obs</td><td style="color:var(--warn)">'+obj.obs+'</td></tr>';
    h+='</tbody></table></div>';
    return h;
  }
  var fotsH=(v.fotos&&v.fotos.length)?v.fotos.map(function(f){return '<img src="'+f+'" class="foto-thumb" onclick="window.open(this.src)">';}).join(''):'<span style="font-size:11px;color:var(--lm)">Sem fotos</span>';
  var laudosH=(v.laudos&&v.laudos.length)?v.laudos.map(function(l){return '<div style="display:flex;align-items:center;gap:6px;padding:4px 0"><span style="font-size:12px">'+l.nome+'</span><a href="'+l.url+'" target="_blank" class="btn btn-xs">Abrir</a></div>';}).join(''):'<span style="font-size:11px;color:var(--lm)">Sem laudos anexados</span>';
  var ctH=(v.contratos&&v.contratos.length)?v.contratos.map(function(l){return '<div style="display:flex;align-items:center;gap:6px;padding:4px 0"><span style="font-size:12px">'+l.nome+'</span><a href="'+l.url+'" target="_blank" class="btn btn-xs">Abrir</a></div>';}).join(''):'<span style="font-size:11px;color:var(--lm)">Sem contratos anexados</span>';
  oM('Laudo Num '+v.id+' - '+v.tipo,
    '<div class="fg2" style="margin-bottom:12px">'+
    '<div><div style="font-size:10px;color:var(--lm);font-weight:700">PROPRIETARIO</div><div style="font-size:13px;font-weight:700">'+v.prop+'</div></div>'+
    '<div><div style="font-size:10px;color:var(--lm);font-weight:700">INQUILINO</div><div style="font-size:13px;font-weight:700">'+v.inq+'</div></div>'+
    '<div><div style="font-size:10px;color:var(--lm);font-weight:700">ENDERECO</div><div style="font-size:12px">'+v.end+'</div></div>'+
    '<div><div style="font-size:10px;color:var(--lm);font-weight:700">DATA/HORA</div><div style="font-size:12px">'+v.dt+' as '+v.hr+'</div></div>'+
    '<div><div style="font-size:10px;color:var(--lm);font-weight:700">VISTORIADOR</div><div style="font-size:12px">'+v.vis+'</div></div>'+
    '<div><div style="font-size:10px;color:var(--lm);font-weight:700">RESULTADO</div><span class="badge bg">'+v.res+'</span></div>'+
    '</div>'+
    secH('Sala',ck.sala)+secH('Cozinha',ck.cozinha)+secH('Quarto 1',ck.quarto1)+secH('Quarto 2',ck.quarto2)+secH('Quarto 3',ck.quarto3)+secH('Banheiro',ck.banheiro)+secH('Servico',ck.servico)+secH('Quintal',ck.quintal)+secH('Eletrica',ck.eletrica)+secH('Hidraulica',ck.hidraulica)+
    '<div style="background:#f9fafb;padding:10px;border-radius:8px;font-size:12px;margin:10px 0"><b>Obs finais:</b> '+v.obs+'</div>'+
    '<div style="margin-top:8px;display:flex;gap:10px">'+sBadge(v.ass==='Sim'?'Recebido':'Nao recebido')+' &nbsp; <span class="badge '+(v.cont==='Nao'?'bg':'br')+'">Contestado: '+v.cont+'</span></div>'+
    '<div class="sec-title" style="margin-top:12px">Fotos da Vistoria</div>'+
    '<div class="foto-area">'+fotsH+'</div>'+
    '<div class="sec-title">Laudos Anexados</div>'+
    '<div style="padding:8px">'+laudosH+'</div>'+
    '<div class="sec-title">Contratos Anexados</div>'+
    '<div style="padding:8px">'+ctH+'</div>',
    null,'Fechar',true);
  document.getElementById('mok').style.display='none';
  setTimeout(function(){document.getElementById('mok').style.display='';},200);
}

function eVst(i){
  var v=vsD[i]; var ck=v.checklist||{};
  var opts='<option>Otimo</option><option>Bom</option><option>Regular</option><option>Ruim</option><option>N/A</option><option>Nao</option><option>Boa</option>';
  function secEdit(key,nome,fields){
    var h='<div class="sec-title">'+nome+'</div><div class="fg3">';
    fields.forEach(function(f){
      h+='<div class="fg"><label>'+f+'</label><select id="ck-'+key+'-'+f+'">'+opts+'</select></div>';
    });
    h+='</div><div class="fg"><label>Obs '+nome+'</label><input id="ck-'+key+'-obs" value="'+((ck[key]&&ck[key].obs)||'')+'"></div>';
    return h;
  }
  var fotsP=(v.fotos&&v.fotos.length)?v.fotos.map(function(f){return '<img src="'+f+'" class="foto-thumb">';}).join(''):'';
  var laudosP=(v.laudos&&v.laudos.length)?v.laudos.map(function(l,li){return '<div style="display:flex;align-items:center;gap:6px;margin-bottom:4px"><span style="font-size:11px;flex:1">'+l.nome+'</span><button class="btn btn-xs btn-gray" onclick="vsD['+i+'].laudos.splice('+li+',1);eVst('+i+')">Del</button></div>';}).join(''):'';
  var ctP=(v.contratos&&v.contratos.length)?v.contratos.map(function(l,li){return '<div style="display:flex;align-items:center;gap:6px;margin-bottom:4px"><span style="font-size:11px;flex:1">'+l.nome+'</span><button class="btn btn-xs btn-gray" onclick="vsD['+i+'].contratos.splice('+li+',1);eVst('+i+')">Del</button></div>';}).join(''):'';
  oM('Editar Vistoria - '+v.id,
    '<div class="fg3"><div class="fg"><label>Num Laudo</label><input id="ev2-n" value="'+v.id+'"></div><div class="fg"><label>Tipo</label><select id="ev2-t"><option>Entrada</option><option>Saida</option></select></div><div class="fg"><label>Resultado geral</label><select id="ev2-r"><option>Bom a excelente</option><option>Bom</option><option>Regular</option><option>Ruim</option></select></div></div>'+
    '<div class="fg2"><div class="fg"><label>Proprietario</label><input id="ev2-p" value="'+v.prop+'"></div><div class="fg"><label>Inquilino</label><input id="ev2-i" value="'+v.inq+'"></div></div>'+
    '<div class="fg"><label>Endereco completo</label><input id="ev2-e" value="'+v.end+'"></div>'+
    '<div class="fg3"><div class="fg"><label>Data</label><input type="date" id="ev2-d" value="'+v.dt+'"></div><div class="fg"><label>Hora</label><input type="time" id="ev2-h" value="'+v.hr+'"></div><div class="fg"><label>Vistoriador</label><select id="ev2-v">'+corrSel(v.vis)+'</select></div></div>'+
    secEdit('sala','Sala',['piso','paredes','teto','portas','janelas','tomadas'])+
    secEdit('cozinha','Cozinha',['piso','paredes','pia','torneira','janela'])+
    secEdit('quarto1','Quarto 1',['piso','paredes','teto','porta','janela'])+
    secEdit('quarto2','Quarto 2',['piso','paredes','teto','porta','janela'])+
    secEdit('quarto3','Quarto 3',['piso','paredes','teto','porta','janela'])+
    secEdit('banheiro','Banheiro',['piso','azulejos','vaso','pia','chuveiro','box'])+
    secEdit('servico','Area de Servico',['piso','tanque','eletrica'])+
    secEdit('quintal','Quintal',['piso','paredes','portao'])+
    secEdit('eletrica','Eletrica',['tomadas','disjuntor','fiacao'])+
    secEdit('hidraulica','Hidraulica',['vazamentos','ralos','pressao'])+
    '<div class="fg"><label>Observacoes finais</label><textarea id="ev2-obs">'+v.obs+'</textarea></div>'+
    '<div class="fg2"><div class="fg"><label>Assinado pelas partes?</label><select id="ev2-a"><option>Sim</option><option>Nao</option></select></div><div class="fg"><label>Houve contestacao?</label><select id="ev2-c"><option>Nao</option><option>Sim</option></select></div></div>'+
    // FOTOS
    '<div class="sec-title">Fotos da Vistoria</div>'+
    '<div style="background:#f9fafb;border-radius:8px;padding:12px;margin-bottom:10px">'+
    '<input type="file" id="ev2-fotos" accept="image/*,video/*" multiple style="display:none">'+
    '<label for="ev2-fotos" class="upload-lbl">Selecionar Fotos/Videos</label>'+
    '<div class="foto-area" id="ev2-prev" style="margin-top:8px">'+fotsP+'</div>'+
    '</div>'+
    // LAUDOS
    '<div class="sec-title">Laudos (PDF)</div>'+
    '<div style="background:#f9fafb;border-radius:8px;padding:12px;margin-bottom:10px">'+
    (laudosP||'<div style="font-size:11px;color:var(--lm);margin-bottom:8px">Nenhum laudo anexado</div>')+
    '<input type="file" id="ev2-laudos" accept=".pdf,.doc,.docx,image/*" multiple style="display:none">'+
    '<label for="ev2-laudos" class="upload-lbl">Anexar Laudos/Documentos</label>'+
    '</div>'+
    // CONTRATOS
    '<div class="sec-title">Contratos (PDF)</div>'+
    '<div style="background:#f9fafb;border-radius:8px;padding:12px">'+
    (ctP||'<div style="font-size:11px;color:var(--lm);margin-bottom:8px">Nenhum contrato anexado</div>')+
    '<input type="file" id="ev2-cts" accept=".pdf,.doc,.docx,image/*" multiple style="display:none">'+
    '<label for="ev2-cts" class="upload-lbl">Anexar Contratos</label>'+
    '</div>',
    function(){
      vsD[i].id=document.getElementById('ev2-n').value;
      vsD[i].tipo=document.getElementById('ev2-t').value;
      vsD[i].res=document.getElementById('ev2-r').value;
      vsD[i].prop=document.getElementById('ev2-p').value;
      vsD[i].inq=document.getElementById('ev2-i').value;
      vsD[i].end=document.getElementById('ev2-e').value;
      vsD[i].dt=document.getElementById('ev2-d').value;
      vsD[i].hr=document.getElementById('ev2-h').value;
      vsD[i].vis=document.getElementById('ev2-v').value;
      vsD[i].obs=document.getElementById('ev2-obs').value;
      vsD[i].ass=document.getElementById('ev2-a').value;
      vsD[i].cont=document.getElementById('ev2-c').value;
      var comodos=['sala','cozinha','quarto1','quarto2','quarto3','banheiro','servico','quintal','eletrica','hidraulica'];
      comodos.forEach(function(key){
        if(!vsD[i].checklist) vsD[i].checklist={};
        if(!vsD[i].checklist[key]) vsD[i].checklist[key]={};
        document.querySelectorAll('[id^="ck-'+key+'-"]').forEach(function(el){
          vsD[i].checklist[key][el.id.replace('ck-'+key+'-','')]=el.value;
        });
      });
      cM(); pLV();
    }, null, true);
  setTimeout(function(){
    document.getElementById('ev2-t').value=v.tipo;
    document.getElementById('ev2-r').value=v.res;
    document.getElementById('ev2-a').value=v.ass;
    document.getElementById('ev2-c').value=v.cont;
    var comodos=['sala','cozinha','quarto1','quarto2','quarto3','banheiro','servico','quintal','eletrica','hidraulica'];
    comodos.forEach(function(key){
      if(!v.checklist||!v.checklist[key]) return;
      for(var f in v.checklist[key]){
        var el=document.getElementById('ck-'+key+'-'+f);
        if(el) el.value=v.checklist[key][f];
      }
    });
    // Upload fotos
    var inp=document.getElementById('ev2-fotos');
    if(inp) inp.onchange=function(){
      var prev=document.getElementById('ev2-prev');
      if(!vsD[i].fotos) vsD[i].fotos=[];
      Array.from(inp.files).forEach(function(file){
        var rd=new FileReader();
        rd.onload=function(e){
          if(file.type.startsWith('image/')){
            var img=document.createElement('img'); img.src=e.target.result; img.className='foto-thumb';
            img.onclick=function(){window.open(this.src);};
            prev.appendChild(img); vsD[i].fotos.push(e.target.result);
          }
        };
        rd.readAsDataURL(file);
      });
    };
    // Upload laudos
    var inpL=document.getElementById('ev2-laudos');
    if(inpL) inpL.onchange=function(){
      if(!vsD[i].laudos) vsD[i].laudos=[];
      Array.from(inpL.files).forEach(function(file){
        var rd=new FileReader();
        rd.onload=function(e){ vsD[i].laudos.push({nome:file.name,url:e.target.result}); };
        rd.readAsDataURL(file);
      });
      alert(inpL.files.length+' laudo(s) carregado(s). Clique em Salvar.');
    };
    // Upload contratos
    var inpC=document.getElementById('ev2-cts');
    if(inpC) inpC.onchange=function(){
      if(!vsD[i].contratos) vsD[i].contratos=[];
      Array.from(inpC.files).forEach(function(file){
        var rd=new FileReader();
        rd.onload=function(e){ vsD[i].contratos.push({nome:file.name,url:e.target.result}); };
        rd.readAsDataURL(file);
      });
      alert(inpC.files.length+' contrato(s) carregado(s). Clique em Salvar.');
    };
  },80);
}
function nVistoria(){
  vsD.unshift({id:String(vsD.length+1).padStart(2,'0')+'/26',tipo:'Entrada',prop:'',inq:'',end:'',dt:'',hr:'',vis:'Tatiana Basile',res:'Bom',ass:'Nao',cont:'Nao',obs:'',checklist:{},fotos:[],laudos:[],contratos:[]});
  eVst(0);
}

// ===== IMOVEIS VENDA =====
// ===== IA MARKETING — ANTHROPIC API =====
var CLAUDE_MODEL = 'claude-haiku-4-5-20251001';

async function callClaude(prompt, system, maxTokens){
  maxTokens = maxTokens || 1000;
  // Use Supabase Edge Function as CORS proxy for Anthropic API
  var PROXY_URL = 'https://pokgfnlywtgubpuswmni.supabase.co/functions/v1/claude-proxy';
  try{
    var resp = await fetch(PROXY_URL, {
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'Authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBva2dmbmx5d3RndWJwdXN3bW5pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk1OTYwNzgsImV4cCI6MjA5NTE3MjA3OH0.wK2qG14wMA7FVnVT0NKEbbLZyAIZkSahsChRivgd-Ko'
      },
      body: JSON.stringify({
        model: CLAUDE_MODEL,
        max_tokens: maxTokens,
        system: system||'Você é um especialista em marketing imobiliário brasileiro, especializado em RE/MAX.',
        messages:[{role:'user',content:prompt}]
      })
    });
    if(!resp.ok){
      // Fallback: try direct with no-cors workaround via allorigins
      throw new Error('Proxy indisponível ('+resp.status+')');
    }
    var data = await resp.json();
    if(data.content && data.content[0]) return data.content[0].text;
    if(data.error) throw new Error(data.error.message||'Erro na API');
    throw new Error('Resposta inválida da API');
  } catch(e){
    throw new Error('Erro IA: '+e.message+'. Verifique se o proxy Supabase está configurado.');
  }
}

// ===== 1. DESCRIÇÃO DO IMÓVEL COM IA =====
async function gerarDescricaoIA(i){
  var iv = ivD[i];
  var el = document.getElementById('ei-s');
  var btn = event.target;
  
  btn.disabled = true;
  btn.textContent = '⏳ Gerando descrição...';
  btn.style.background = '#94a3b8';

  var prompt = 'Gere uma descrição profissional de venda para o seguinte imóvel:\n\n' +
    'Tipo: ' + iv.tipo + '\n' +
    'Endereço: ' + iv.end + '\n' +
    'Cidade: Caldas Novas - Goiás\n' +
    'Valor: ' + (iv.valor ? fmt(iv.valor) : 'A consultar') + '\n' +
    (iv.quartos ? 'Quartos: ' + iv.quartos + '\n' : '') +
    (iv.banheiros ? 'Banheiros: ' + iv.banheiros + '\n' : '') +
    (iv.vagas ? 'Vagas de garagem: ' + iv.vagas + '\n' : '') +
    (iv.area ? 'Área: ' + iv.area + 'm²\n' : '') +
    (iv.gestao ? 'Gestão exclusiva RE/MAX\n' : '') +
    (iv.sit ? 'Informações adicionais: ' + iv.sit + '\n' : '') +
    '\nEscreva uma descrição comercial envolvente de 3-4 parágrafos, destacando os diferenciais do imóvel e de Caldas Novas como cidade turística e de lazer. Tom: profissional, caloroso e persuasivo. Não use bullet points. Termine com uma chamada para ação para agendar visita.';

  var system = 'Você é um especialista em marketing imobiliário da RE/MAX Space, imobiliária premium em Caldas Novas - GO, cidade turística famosa pelas águas quentes. Escreva descrições profissionais, envolventes e persuasivas em português brasileiro. Use linguagem culta mas acessível.';

  try{
    var descricao = await callClaude(prompt, system, 600);
    if(el){ 
      el.value = descricao;
      ivD[i].sit = descricao;
    }
    btn.textContent = '✅ Descrição gerada!';
    btn.style.background = '#059669';
    setTimeout(function(){ 
      btn.textContent = '🤖 Gerar Descrição com IA'; 
      btn.style.background = 'linear-gradient(135deg,#6366f1,#8b5cf6)';
      btn.disabled = false;
    }, 3000);
  } catch(e){
    btn.textContent = '❌ Erro — Tentar novamente';
    btn.style.background = '#dc2626';
    btn.disabled = false;
    alert('Erro ao gerar descrição: ' + e.message);
  }
}

// ===== 2. POST PERSONALIZADO COM IA POR CORRETOR =====
async function gerarLegendaIA(i){
  var iv = ivD[i];
  var corretorNome = iv.corretor || (U ? U.nome : 'Corretor');
  var cor2 = corCad.find(function(c){ return c.nome===corretorNome; }) || {};

  // Personalidade por corretor
  var personalidades = {
    'T. Basile': 'especialista com mais de 10 anos em Caldas Novas, advogada, diretora da RE/MAX Space, tom profissional e seguro, focada em segurança jurídica e exclusividade',
    'Tatiana Basile': 'especialista com mais de 10 anos em Caldas Novas, advogada, diretora da RE/MAX Space, tom profissional e seguro, focada em segurança jurídica e exclusividade',
    'Meirielli': 'gerente e corretora em ascensão, tom acolhedor e próximo, foco em atendimento humanizado e facilitar o sonho da casa própria',
    'Lucas Basile': 'corretor jovem, marketing digital, linguagem moderna e dinâmica, usa mais emojis, foco em alcance digital e novidades do mercado',
    'T. Moraes': 'corretora experiente, tom equilibrado, profissional e atencioso',
    'Sergio Justino': 'corretor, tom direto e objetivo, foco nos números e na oportunidade de investimento',
    'Talyta': 'corretora, tom jovem e entusiasmado, foca na experiência do cliente',
    'Carlos': 'corretor, tom experiente e confiável, foca nos diferenciais do imóvel',
    'Dubem': 'corretor, tom amigável e descontraído, foca na praticidade'
  };

  var personalidade = personalidades[corretorNome] || 'corretor profissional, tom equilibrado';
  var tipo = iv.tipo || 'Imóvel';
  var preco = iv.valor ? fmt(iv.valor) : 'consulte';

  // Show modal with loading
  oM('🤖 Gerando Post com IA — ' + corretorNome,
    '<div id="ia-post-content" style="min-height:200px;display:flex;align-items:center;justify-content:center">'+
      '<div style="text-align:center"><div style="font-size:32px;margin-bottom:12px">✨</div>'+
      '<div style="font-size:14px;font-weight:700;color:var(--navy)">Gerando legenda personalizada...</div>'+
      '<div style="font-size:12px;color:var(--lm);margin-top:6px">Adaptando para o estilo de ' + corretorNome + '</div></div>'+
    '</div>',
    null, null, true
  );

  var prompt = 'Crie uma legenda para post de Instagram sobre este imóvel:\n\n' +
    'Tipo: ' + tipo + '\n' +
    'Endereço: ' + iv.end + ', Caldas Novas - GO\n' +
    'Preço: ' + preco + '\n' +
    (iv.quartos ? 'Quartos: ' + iv.quartos + '\n' : '') +
    (iv.banheiros ? 'Banheiros: ' + iv.banheiros + '\n' : '') +
    (iv.vagas ? 'Vagas: ' + iv.vagas + '\n' : '') +
    (iv.area ? 'Área: ' + iv.area + 'm²\n' : '') +
    (iv.gestao ? 'Gestão exclusiva RE/MAX\n' : '') +
    (iv.sit ? 'Descrição: ' + iv.sit.slice(0,200) + '\n' : '') +
    '\nCorretor: ' + corretorNome + ' — perfil: ' + personalidade +
    '\n\nCrie uma legenda de Instagram com:\n1. Frase de abertura impactante\n2. Descrição do imóvel com emojis\n3. Chamada para ação com o número: ' + (cor2.tel||'(64)9 9000-0000') +
    '\n4. 15-20 hashtags relevantes\n\nAdapte o tom ao perfil do corretor descrito. Limite de 2000 caracteres.';

  var system = 'Você é um especialista em marketing digital imobiliário. Crie legendas envolventes para Instagram focadas no mercado imobiliário de Caldas Novas - GO, cidade turística com águas quentes. Use emojis estrategicamente. Adapte o tom ao perfil de cada corretor.';

  try{
    var legenda = await callClaude(prompt, system, 800);
    var el = document.getElementById('ia-post-content');
    if(el){
      el.innerHTML = 
        '<div style="width:100%">'+
          '<div style="font-size:11px;font-weight:700;color:var(--lm);margin-bottom:8px;text-transform:uppercase">Legenda gerada por IA para ' + corretorNome + '</div>'+
          '<textarea id="ia-leg-txt" style="width:100%;height:200px;font-size:12px;line-height:1.6;border:1px solid var(--lb);border-radius:8px;padding:12px;resize:vertical">' + legenda + '</textarea>'+
          '<div style="display:flex;gap:8px;margin-top:10px">'+
            '<button class="btn btn-primary" onclick="var t=document.getElementById(\'ia-leg-txt\');navigator.clipboard.writeText(t.value).then(function(){alert(\'Legenda copiada!\');})">📋 Copiar</button>'+
            '<button class="btn btn-sm" style="background:#E1306C;color:#fff;border-color:#E1306C" onclick="gerarLegendaIA('+i+')">🔄 Gerar outra versão</button>'+
          '</div>'+
        '</div>';
    }
  } catch(e){
    var el2 = document.getElementById('ia-post-content');
    if(el2) el2.innerHTML = '<div style="color:#dc2626;text-align:center;padding:20px">Erro: ' + e.message + '<br><br><button class="btn btn-sm btn-primary" onclick="gerarLegendaIA('+i+')">Tentar novamente</button></div>';
  }
}

// ===== 3. RESPOSTA SUGERIDA PARA LEADS =====
async function sugerirRespostaIA(i){
  var l = ldD[i];
  var corretorNome = l.cor || (U ? U.nome : 'Corretor');
  var cor3 = corCad.find(function(c){ return c.nome===corretorNome; }) || {};

  var personalidades3 = {
    'T. Basile': 'diretora e advogada, tom profissional e seguro, menciona expertise jurídica',
    'Tatiana Basile': 'diretora e advogada, tom profissional e seguro, menciona expertise jurídica',
    'Meirielli': 'gerente, tom acolhedor e próximo, linguagem pessoal',
    'Lucas Basile': 'corretor jovem, linguagem moderna e descontraída',
    'T. Moraes': 'corretora experiente, tom equilibrado e profissional',
    'Sergio Justino': 'corretor, tom direto e objetivo'
  };
  var personalidade3 = personalidades3[corretorNome] || 'corretor profissional e atencioso';

  var score = iaScore(l);
  var temperatura = score >= 60 ? 'QUENTE (alta probabilidade)' : score >= 35 ? 'MORNO (em desenvolvimento)' : 'FRIO (precisa de aquecimento)';

  oM('🤖 Resposta Sugerida por IA — ' + l.nome,
    '<div id="ia-resp-content" style="min-height:200px;display:flex;align-items:center;justify-content:center">'+
      '<div style="text-align:center"><div style="font-size:32px;margin-bottom:12px">🧠</div>'+
      '<div style="font-size:14px;font-weight:700;color:var(--navy)">Analisando o perfil do lead...</div>'+
      '<div style="font-size:12px;color:var(--lm);margin-top:6px">Score IA: ' + score + 'pts — ' + temperatura + '</div></div>'+
    '</div>',
    null, null, true
  );

  var prompt = 'Analise este lead imobiliário e sugira a melhor resposta de WhatsApp:\n\n' +
    'DADOS DO LEAD:\n' +
    'Nome: ' + l.nome + '\n' +
    'Canal de origem: ' + (l.orig||'') + ' (' + (l.orig_cat||'') + ')\n' +
    'Tipo de imóvel desejado: ' + (l.tipo||'') + '\n' +
    'Faixa de preço: ' + (l.faixa||'não informada') + '\n' +
    'Bairro/região desejada: ' + (l.bairro||'não informado') + '\n' +
    'Renda: ' + (l.renda ? 'R$ '+l.renda : 'não informada') + '\n' +
    'Intenção: ' + (l.intencao||'Comprar') + '\n' +
    'Status atual: ' + l.st + '\n' +
    'Score IA: ' + score + '/100 (' + temperatura + ')\n' +
    'Observações: ' + (l.obs||'nenhuma') + '\n' +
    (l.orig_cat==='Referenciamento' ? 'IMPORTANTE: Lead veio por referenciamento de ' + (l.ref_remax||'outra unidade RE/MAX') + '\n' : '') +
    '\nCorretor responsável: ' + corretorNome + ' — perfil: ' + personalidade3 +
    '\n\nSugira:\n1. Mensagem de primeiro contato pelo WhatsApp (se status "Novo")\n2. Mensagem de follow-up (se status "Em contato" ou "Visita agendada")\n3. Dicas estratégicas específicas para este lead\n\nAdapte ao tom do corretor. Seja prático e direto.';

  var system = 'Você é um coach de vendas imobiliárias especializado em técnicas de CRM e conversão de leads. Seu objetivo é maximizar a taxa de conversão sugerindo abordagens personalizadas baseadas no perfil de cada lead. Foco em Caldas Novas - GO, mercado imobiliário turístico.';

  try{
    var resposta = await callClaude(prompt, system, 1000);
    var el3 = document.getElementById('ia-resp-content');
    if(el3){
      // Format the response into sections
      var scoreColor = score>=60?'#059669':score>=35?'#d97706':'#dc2626';
      var scoreBg = score>=60?'#dcfce7':score>=35?'#fef9c3':'#fee2e2';
      el3.innerHTML =
        '<div style="width:100%">'+
          '<div style="background:'+scoreBg+';border-radius:8px;padding:10px 14px;margin-bottom:12px;display:flex;justify-content:space-between;align-items:center">'+
            '<div><div style="font-size:12px;font-weight:700;color:'+scoreColor+'">'+temperatura+'</div>'+
            '<div style="font-size:11px;color:var(--lm)">Lead: '+l.nome+' · '+l.tipo+' · '+l.faixa+'</div></div>'+
            '<div style="font-size:24px;font-weight:800;color:'+scoreColor+'">'+score+'</div>'+
          '</div>'+
          '<div style="font-size:11px;font-weight:700;color:var(--lm);margin-bottom:8px;text-transform:uppercase">Estratégia sugerida pela IA</div>'+
          '<div id="ia-resp-txt" style="background:#f9fafb;border:1px solid var(--lb);border-radius:8px;padding:14px;font-size:12px;line-height:1.8;white-space:pre-wrap;max-height:300px;overflow-y:auto">'+resposta+'</div>'+
          '<div style="display:flex;gap:8px;margin-top:10px">'+
            '<button class="btn btn-primary" onclick="navigator.clipboard.writeText(document.getElementById(\'ia-resp-txt\').textContent).then(function(){alert(\'Copiado!\');})">📋 Copiar</button>'+
            '<button class="btn btn-sm" style="background:#7c3aed;color:#fff;border-color:#7c3aed" onclick="sugerirRespostaIA('+i+')">🔄 Nova sugestão</button>'+
          '</div>'+
        '</div>';
    }
  } catch(e2){
    var el4 = document.getElementById('ia-resp-content');
    if(el4) el4.innerHTML = '<div style="color:#dc2626;text-align:center;padding:20px">Erro: ' + e2.message + '</div>';
  }
}

// ===== BOTÃO IA NO GERADOR DE POST (adiciona ao gerarPost) =====

// ===== FICHA DO IMÓVEL — PDF IMPRIMÍVEL =====
function fichaImovel(i){
  var iv = ivD[i];
  var cor2 = corCad.find(function(c){ return c.nome===iv.corretor; }) || {nome:iv.corretor||'RE/MAX Space',creci:'',tel:'(64)9 9000-0000',cargo:'Corretor',ini:'R'};
  var tipo = iv.tipo||'Imóvel';
  var preco = iv.valor ? fmt(iv.valor) : 'Consulte';
  var dets = [];
  if(iv.quartos) dets.push({l:'Quartos',v:iv.quartos,i:'🛏'});
  if(iv.banheiros) dets.push({l:'Banheiros',v:iv.banheiros,i:'🚿'});
  if(iv.vagas) dets.push({l:'Vagas',v:iv.vagas,i:'🚗'});
  if(iv.area) dets.push({l:'Área',v:iv.area+'m²',i:'📐'});
  var detsHtml = dets.map(function(d){
    return '<div style="text-align:center;background:#f8fafc;border-radius:10px;padding:14px 8px;border:1px solid #e2e8f0">'+
      '<div style="font-size:22px;margin-bottom:4px">'+d.i+'</div>'+
      '<div style="font-size:20px;font-weight:800;color:#0f1a35">'+d.v+'</div>'+
      '<div style="font-size:10px;color:#64748b;font-weight:600">'+d.l+'</div>'+
    '</div>';
  }).join('');
  var qr = 'https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=' + encodeURIComponent('https://wa.me/556499000000?text=Interesse+no+imóvel+'+encodeURIComponent(tipo+' '+iv.end));
  var w = window.open('','_blank');
  w.document.write('<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8">'+
    '<title>Ficha do Imóvel — '+tipo+' | '+iv.end+'</title>'+
    '<style>*{box-sizing:border-box;margin:0;padding:0}'+
    'body{font-family:Arial,sans-serif;background:#fff;color:#1e293b;max-width:800px;margin:0 auto;padding:0}'+
    '.header{background:#0f1a35;padding:20px 28px;display:flex;justify-content:space-between;align-items:center}'+
    '.logo{color:#fff;font-size:24px;font-weight:900}.logo em{color:#D42028;font-style:normal}'+
    '.tag{background:#D42028;color:#fff;font-size:12px;font-weight:700;padding:5px 14px;border-radius:20px}'+
    '.foto-area{background:linear-gradient(135deg,#0f1a35,#003DA5);height:280px;display:flex;align-items:center;justify-content:center}'+
    '.foto-area img{width:100%;height:280px;object-fit:cover}'+
    '.foto-placeholder{color:rgba(255,255,255,.3);font-size:48px;text-align:center}'+
    '.preco-bar{background:#D42028;padding:14px 28px;display:flex;justify-content:space-between;align-items:center}'+
    '.preco{font-size:28px;font-weight:900;color:#fff}'+
    '.tipo{font-size:14px;color:rgba(255,255,255,.8);font-weight:600}'+
    '.content{padding:24px 28px}'+
    '.endereco{font-size:16px;color:#64748b;margin-bottom:20px;display:flex;align-items:center;gap:8px}'+
    '.dets{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:20px}'+
    '.desc{background:#f8fafc;border-radius:10px;padding:16px;margin-bottom:20px;font-size:13px;line-height:1.7;color:#475569}'+
    '.footer{background:#0f1a35;padding:16px 28px;display:flex;justify-content:space-between;align-items:center}'+
    '.cor-info{display:flex;align-items:center;gap:12px}'+
    '.cor-av{width:48px;height:48px;border-radius:50%;background:#D42028;display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:900;color:#fff;flex-shrink:0}'+
    '.cor-nome{font-size:14px;font-weight:700;color:#fff}'+
    '.cor-sub{font-size:11px;color:rgba(255,255,255,.6)}'+
    '.qr-block{text-align:center}'+
    '.qr-label{font-size:10px;color:rgba(255,255,255,.6);margin-top:4px}'+
    '.checklists{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:20px}'+
    '.checklist{background:#fff;border:1px solid #e2e8f0;border-radius:10px;padding:14px}'+
    '.ck-title{font-size:11px;font-weight:700;color:#0f1a35;text-transform:uppercase;margin-bottom:8px}'+
    '.ck-item{font-size:12px;color:#475569;padding:4px 0;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:6px}'+
    '.badge-ok{background:#dcfce7;color:#166534;padding:1px 8px;border-radius:10px;font-size:10px;font-weight:700}'+
    '.badge-no{background:#fee2e2;color:#991b1b;padding:1px 8px;border-radius:10px;font-size:10px;font-weight:700}'+
    '@media print{.no-print{display:none!important}.btn-copiar-pix{display:none!important}.pix-copiado-ok{display:none!important}.pix-codigo{border:1px solid #003DA5!important;max-height:none!important;overflow:visible!important}body{-webkit-print-color-adjust:exact;print-color-adjust:exact}}'+
    '</style></head><body>'+
    '<div class="header">'+
      '<div class="logo">IMÓVEIS RE/<em>MAX</em><div style="font-size:11px;opacity:.6;font-weight:400">Space — Caldas Novas GO</div></div>'+
      '<div class="tag">'+tipo.toUpperCase()+'</div>'+
    '</div>'+
    '<div class="foto-area">'+
      '<div class="foto-placeholder">📷<div style="font-size:14px;margin-top:8px">Adicione a foto do imóvel</div></div>'+
    '</div>'+
    '<div class="preco-bar">'+
      '<div><div class="tipo">'+tipo+' à Venda</div><div class="preco">'+preco+'</div></div>'+
      '<div style="text-align:right;color:rgba(255,255,255,.8);font-size:12px">'+
        (iv.vva||'VENDA')+
        (iv.gestao?'<div style="background:rgba(255,255,255,.2);padding:3px 10px;border-radius:10px;margin-top:4px;font-size:11px">Gestão Exclusiva</div>':'')+
      '</div>'+
    '</div>'+
    '<div class="content">'+
      '<div class="endereco">📍 <strong>'+iv.end+'</strong></div>'+
      (dets.length?'<div class="dets">'+detsHtml+'</div>':'')+
      '<div class="desc">'+
        '<div style="font-size:12px;font-weight:700;color:#0f1a35;margin-bottom:8px;text-transform:uppercase">Sobre o imóvel</div>'+
        (iv.sit||'Imóvel em excelente estado de conservação. Entre em contato para mais informações e agende sua visita.')+
      '</div>'+
      '<div class="checklists">'+
        '<div class="checklist">'+
          '<div class="ck-title">Documentação</div>'+
          '<div class="ck-item">'+(iv.contrato?'<span class="badge-ok">✓ OK</span>':'<span class="badge-no">Pendente</span>')+' Contrato assinado</div>'+
          '<div class="ck-item">'+(iv.fotos?'<span class="badge-ok">✓ OK</span>':'<span class="badge-no">Pendente</span>')+' Fotos profissionais</div>'+
          '<div class="ck-item">'+(iv.ilist?'<span class="badge-ok">✓ OK</span>':'<span class="badge-no">Pendente</span>')+' iList RE/MAX</div>'+
        '</div>'+
        '<div class="checklist">'+
          '<div class="ck-title">Divulgação</div>'+
          '<div class="ck-item">'+(iv.zap?'<span class="badge-ok">✓ Ativo</span>':'<span class="badge-no">—</span>')+' ZAP Imóveis</div>'+
          '<div class="ck-item">'+(iv.olx?'<span class="badge-ok">✓ Ativo</span>':'<span class="badge-no">—</span>')+' OLX</div>'+
          '<div class="ck-item">'+(iv.instagram?'<span class="badge-ok">✓ Ativo</span>':'<span class="badge-no">—</span>')+' Instagram</div>'+
        '</div>'+
      '</div>'+
    '</div>'+
    '<div class="footer">'+
      '<div class="cor-info">'+
        '<div class="cor-av">'+cor2.ini+'</div>'+
        '<div><div class="cor-nome">'+cor2.nome+'</div>'+
          (cor2.creci?'<div class="cor-sub">CRECI: '+cor2.creci+'</div>':'')+
          '<div class="cor-sub">'+cor2.tel+'</div>'+
          '<div class="cor-sub">'+cor2.cargo+'</div>'+
        '</div>'+
      '</div>'+
      '<div class="qr-block">'+
        '<img src="'+qr+'" width="80" height="80" style="border-radius:8px;background:#fff;padding:4px">'+
        '<div class="qr-label">Escaneie para<br>contato via WhatsApp</div>'+
      '</div>'+
    '</div>'+
    '<div class="no-print" style="text-align:center;padding:16px;background:#f8fafc;border-top:1px solid #e2e8f0">'+
      '<button onclick="window.print()" style="background:#0f1a35;color:#fff;border:none;padding:12px 28px;border-radius:8px;font-size:14px;cursor:pointer;margin-right:8px">🖨️ Imprimir / Salvar PDF</button>'+
      '<button onclick="window.close()" style="background:#f1f5f9;color:#0f1a35;border:1px solid #e2e8f0;padding:12px 20px;border-radius:8px;font-size:14px;cursor:pointer">Fechar</button>'+
    '</div>'+
    '</body></html>');
  w.document.close();
}


// ===== GERADOR DE POSTS RE/MAX SPACE =====

function gerarPost(i){
  var iv = ivD[i];
  var cor = corCad.find(function(c){ return c.nome===iv.corretor; }) || {nome:iv.corretor||'RE/MAX Space',creci:'',tel:'(64)9 9000-0000',cargo:'Corretora',ini:'R'};
  
  // Estado atual do gerador
  var estado = {
    modelo: 1,       // 1-6
    comPreco: true,
    comCreci: true,
    comFoto: false,
    fotoUrl: '',
    corretorFotoUrl: ''
  };

  function getHashtags(iv){
    var tags = ['#caldas_novas', '#caldas_novasgo', '#imoveiscaldasnovas', '#remax', '#remaxspace', '#remaxbrasil'];
    var tipo = (iv.tipo||'').toLowerCase();
    if(tipo.includes('casa')) tags.push('#casavenda','#casacaldasnovas');
    else if(tipo.includes('apto')||tipo.includes('apart')) tags.push('#apartamento','#aptovenda');
    else if(tipo.includes('lote')) tags.push('#lote','#terreno');
    else if(tipo.includes('cha')) tags.push('#chacara','#sitio');
    else if(tipo.includes('kit')) tags.push('#kitnet','#studioapartamento');
    else if(tipo.includes('chal')) tags.push('#chale','#hospedagem');
    else if(tipo.includes('sala')||tipo.includes('com')) tags.push('#salacomericial','#comercial');
    tags.push('#imoveisgois','#corretor','#imobiliaria','#venderimovei');
    if(iv.gestao) tags.push('#gestaoexclusiva','#exclusividade');
    return tags.join(' ');
  }

  function getLegenda(iv, cor){
    var tipo = iv.tipo||'Imóvel';
    var end = iv.end||'Caldas Novas - GO';
    var price = iv.valor ? '\n\n💰 ' + fmt(iv.valor) : '';
    var dets = '';
    if(iv.quartos) dets += '\n🛏 ' + iv.quartos + ' quarto(s)';
    if(iv.banheiros) dets += '\n🚿 ' + iv.banheiros + ' banheiro(s)';
    if(iv.vagas) dets += '\n🚗 ' + iv.vagas + ' vaga(s)';
    if(iv.area) dets += '\n📐 ' + iv.area + 'm²';
    return tipo.toUpperCase() + ' À VENDA\n📍 ' + end + price + dets +
      '\n\n✅ Documentação verificada\n✅ Atendimento especializado\n✅ Financiamento facilitado' +
      '\n\n📲 Entre em contato:\n📞 ' + cor.tel +
      '\n\n🔴⚪🔵 RE/MAX Space — Caldas Novas\nNinguém no mundo vende mais imóveis que a RE/MAX!\n\n' + getHashtags(iv);
  }

  function renderPost(){
    var tipo = (iv.tipo||'IMÓVEL').toUpperCase();
    var end = iv.end || 'Caldas Novas - GO';
    var preco = iv.valor ? fmt(iv.valor) : 'Consulte';
    var dets = [];
    if(iv.quartos) dets.push({i:'🛏',v:iv.quartos+' Qto'+(iv.quartos>1?'s':'')});
    if(iv.banheiros) dets.push({i:'🚿',v:iv.banheiros+' Banh.'});
    if(iv.vagas) dets.push({i:'🚗',v:iv.vagas+' Vaga'+(iv.vagas>1?'s':'')});
    if(iv.area) dets.push({i:'📐',v:iv.area+'m²'});

    var detsHtml = dets.map(function(d){
      return '<div style="background:rgba(255,255,255,.15);border-radius:6px;padding:5px 10px;font-size:11px;font-weight:700;color:#fff;display:flex;align-items:center;gap:5px">'+d.i+' '+d.v+'</div>';
    }).join('');

    var fotoStyle = estado.comFoto && estado.fotoUrl ?
      'background:linear-gradient(180deg,rgba(15,26,53,.3) 0%,rgba(15,26,53,.85) 100%),url('+estado.fotoUrl+') center/cover no-repeat' :
      'background:linear-gradient(135deg,#0f1a35 0%,#003DA5 60%,#1a3a6e 100%)';

    // Footer corretor
    var footerHtml = '';
    if(estado.modelo <= 4){
      footerHtml = '<div style="background:#0a1228;padding:12px 16px;display:flex;align-items:center;gap:10px">';
      if(estado.corretorFotoUrl){
        footerHtml += '<img src="'+estado.corretorFotoUrl+'" style="width:42px;height:42px;border-radius:50%;object-fit:cover;border:2px solid #D42028">';
      } else {
        footerHtml += '<div style="width:42px;height:42px;border-radius:50%;background:#D42028;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:900;color:#fff;flex-shrink:0">' + (cor.ini||'R') + '</div>';
      }
      footerHtml += '<div style="flex:1"><div style="font-size:13px;font-weight:700;color:#fff">'+cor.nome+'</div>';
      if(estado.comCreci && cor.creci) footerHtml += '<div style="font-size:10px;color:rgba(255,255,255,.6)">CRECI: '+cor.creci+'</div>';
      footerHtml += '<div style="font-size:10px;color:rgba(255,255,255,.6)">'+cor.tel+'</div></div>';
      footerHtml += '<div style="text-align:right"><div style="font-size:9px;font-weight:900;color:#fff;letter-spacing:1px">IMÓVEIS</div><div style="font-size:16px;font-weight:900;color:#fff;letter-spacing:-0.5px">RE/<em style="color:#D42028;font-style:normal">MAX</em></div><div style="font-size:7px;color:rgba(255,255,255,.5)">Space — Caldas Novas</div></div>';
      footerHtml += '</div>';
    }

    var m = estado.modelo;
    var html = '';

    if(m===1){
      // MODELO 1 — Clássico fundo escuro
      html = '<div style="'+fotoStyle+';width:500px;height:500px;position:relative;border-radius:12px;overflow:hidden;font-family:Arial,sans-serif">'+
        '<div style="position:absolute;top:16px;left:16px;right:16px;display:flex;justify-content:space-between;align-items:center">'+
          '<div style="background:#D42028;color:#fff;font-size:11px;font-weight:700;padding:5px 12px;border-radius:20px">VENDE-SE</div>'+
          (estado.comPreco?'<div style="background:rgba(15,26,53,.9);border:1px solid rgba(255,255,255,.2);color:#fff;font-size:13px;font-weight:800;padding:5px 14px;border-radius:20px">'+preco+'</div>':'<div style="background:#003DA5;color:#fff;font-size:11px;font-weight:700;padding:5px 12px;border-radius:20px">Consulte o Valor</div>')+
        '</div>'+
        '<div style="position:absolute;bottom:'+(footerHtml?'68px':'16px')+';left:16px;right:16px">'+
          '<div style="font-size:11px;color:rgba(255,255,255,.7);margin-bottom:4px">📍 '+end+'</div>'+
          '<div style="font-size:22px;font-weight:900;color:#fff;line-height:1.2;margin-bottom:10px">'+tipo+'</div>'+
          '<div style="display:flex;flex-wrap:wrap;gap:6px">'+detsHtml+'</div>'+
        '</div>'+
        footerHtml+
      '</div>';
    } else if(m===2){
      // MODELO 2 — Faixa diagonal / clean
      html = '<div style="'+fotoStyle+';width:500px;height:500px;position:relative;border-radius:12px;overflow:hidden;font-family:Arial,sans-serif">'+
        '<div style="position:absolute;top:0;left:0;right:0;background:linear-gradient(90deg,#D42028,#a01018);padding:12px 18px;display:flex;justify-content:space-between;align-items:center">'+
          '<div style="color:#fff;font-size:11px;font-weight:700;letter-spacing:2px">OPORTUNIDADE</div>'+
          '<div style="font-size:9px;font-weight:900;color:#fff;letter-spacing:1px">IMÓVEIS RE/<em style="font-style:normal">MAX</em></div>'+
        '</div>'+
        '<div style="position:absolute;bottom:'+(footerHtml?'68px':'16px')+';left:0;right:0;background:linear-gradient(0,rgba(15,26,53,.98),transparent);padding:16px 18px">'+
          (estado.comPreco?'<div style="background:#D42028;display:inline-block;color:#fff;font-size:18px;font-weight:900;padding:6px 16px;border-radius:6px;margin-bottom:8px">'+preco+'</div>':'')+ 
          '<div style="font-size:24px;font-weight:900;color:#fff;margin-bottom:6px">'+tipo+'</div>'+
          '<div style="font-size:12px;color:rgba(255,255,255,.8);margin-bottom:8px">📍 '+end+'</div>'+
          '<div style="display:flex;flex-wrap:wrap;gap:6px">'+detsHtml+'</div>'+
        '</div>'+
        footerHtml+
      '</div>';
    } else if(m===3){
      // MODELO 3 — Split azul + dados
      html = '<div style="width:500px;height:500px;border-radius:12px;overflow:hidden;font-family:Arial,sans-serif;display:flex;flex-direction:column">'+
        '<div style="'+fotoStyle+';flex:1;position:relative">'+
          '<div style="position:absolute;top:12px;left:12px;background:#D42028;color:#fff;font-size:11px;font-weight:700;padding:4px 12px;border-radius:20px">VENDE-SE</div>'+
          (estado.comPreco?'<div style="position:absolute;top:12px;right:12px;background:rgba(15,26,53,.9);color:#fff;font-size:14px;font-weight:800;padding:5px 14px;border-radius:20px">'+preco+'</div>':'')+
        '</div>'+
        '<div style="background:#0f1a35;padding:14px 16px">'+
          '<div style="font-size:18px;font-weight:900;color:#fff;margin-bottom:4px">'+tipo+'</div>'+
          '<div style="font-size:11px;color:rgba(255,255,255,.7);margin-bottom:8px">📍 '+end+'</div>'+
          '<div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:8px">'+detsHtml+'</div>'+
        '</div>'+
        footerHtml+
      '</div>';
    } else if(m===4){
      // MODELO 4 — Minimal branco
      html = '<div style="width:500px;height:500px;border-radius:12px;overflow:hidden;font-family:Arial,sans-serif;background:#fff;display:flex;flex-direction:column;border:2px solid #e2e8f0">'+
        '<div style="background:#0f1a35;padding:10px 16px;display:flex;justify-content:space-between;align-items:center">'+
          '<div style="color:#fff;font-size:11px;font-weight:700">RE/MAX Space — Caldas Novas</div>'+
          '<div style="background:#D42028;color:#fff;font-size:10px;font-weight:700;padding:3px 10px;border-radius:10px">VENDA</div>'+
        '</div>'+
        '<div style="'+fotoStyle+';flex:1;position:relative">'+
          (estado.comPreco?'<div style="position:absolute;bottom:10px;right:10px;background:#D42028;color:#fff;font-size:16px;font-weight:900;padding:6px 16px;border-radius:8px">'+preco+'</div>':'')+
        '</div>'+
        '<div style="padding:12px 16px;background:#fff">'+
          '<div style="font-size:20px;font-weight:900;color:#0f1a35;margin-bottom:4px">'+tipo+'</div>'+
          '<div style="font-size:11px;color:#64748b;margin-bottom:8px">📍 '+end+'</div>'+
          '<div style="display:flex;flex-wrap:wrap;gap:6px">'+dets.map(function(d){return '<div style="background:#f1f5f9;border-radius:6px;padding:4px 10px;font-size:11px;font-weight:700;color:#0f1a35">'+d.i+' '+d.v+'</div>';}).join('')+'</div>'+
        '</div>'+
        footerHtml+
      '</div>';
    } else if(m===5){
      // MODELO 5 — Stories (vertical 9:16 adaptado)
      html = '<div style="'+fotoStyle+';width:500px;height:500px;border-radius:12px;overflow:hidden;font-family:Arial,sans-serif;display:flex;flex-direction:column;justify-content:space-between;padding:0">'+
        '<div style="padding:16px;display:flex;justify-content:space-between;align-items:center">'+
          '<div style="background:#D42028;color:#fff;font-size:10px;font-weight:700;padding:4px 12px;border-radius:20px">VENDE-SE</div>'+
          '<div style="text-align:right"><div style="font-size:8px;font-weight:900;color:#fff">IMÓVEIS</div><div style="font-size:14px;font-weight:900;color:#fff">RE/<em style="color:#D42028;font-style:normal">MAX</em></div></div>'+
        '</div>'+
        '<div style="padding:16px;background:linear-gradient(0,rgba(15,26,53,.98) 60%,transparent)">'+
          (estado.comPreco?'<div style="background:rgba(212,32,40,.9);display:inline-block;color:#fff;font-size:20px;font-weight:900;padding:6px 16px;border-radius:8px;margin-bottom:8px">'+preco+'</div>':'')+
          '<div style="font-size:28px;font-weight:900;color:#fff;line-height:1.1;margin-bottom:6px">'+tipo+'</div>'+
          '<div style="font-size:12px;color:rgba(255,255,255,.8);margin-bottom:10px">📍 '+end+'</div>'+
          '<div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:12px">'+detsHtml+'</div>'+
          '<div style="display:flex;align-items:center;gap:10px;background:rgba(255,255,255,.1);padding:10px;border-radius:10px">'+
            (estado.corretorFotoUrl?'<img src="'+estado.corretorFotoUrl+'" style="width:38px;height:38px;border-radius:50%;object-fit:cover;border:2px solid #D42028">':'<div style="width:38px;height:38px;border-radius:50%;background:#D42028;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:900;color:#fff">'+cor.ini+'</div>')+
            '<div><div style="font-size:12px;font-weight:700;color:#fff">'+cor.nome+'</div>'+(estado.comCreci&&cor.creci?'<div style="font-size:10px;color:rgba(255,255,255,.6)">CRECI: '+cor.creci+'</div>':'')+
            '<div style="font-size:10px;color:rgba(255,255,255,.7)">'+cor.tel+'</div></div>'+
          '</div>'+
        '</div>'+
      '</div>';
    } else {
      // MODELO 6 — Detalhes / comparativo
      html = '<div style="width:500px;height:500px;border-radius:12px;overflow:hidden;font-family:Arial,sans-serif;display:flex;flex-direction:column">'+
        '<div style="background:#D42028;padding:12px 16px;display:flex;justify-content:space-between;align-items:center">'+
          '<div><div style="font-size:11px;color:rgba(255,255,255,.8);font-weight:700;letter-spacing:1px">'+tipo+'</div>'+
          (estado.comPreco?'<div style="font-size:22px;font-weight:900;color:#fff">'+preco+'</div>':'')+
          '</div>'+
          '<div style="text-align:right"><div style="font-size:8px;font-weight:900;color:rgba(255,255,255,.8)">IMÓVEIS</div><div style="font-size:18px;font-weight:900;color:#fff">RE/<em style="font-style:normal">MAX</em></div><div style="font-size:7px;color:rgba(255,255,255,.6)">Space Caldas Novas</div></div>'+
        '</div>'+
        '<div style="'+fotoStyle+';flex:1"></div>'+
        '<div style="background:#0f1a35;padding:12px 16px">'+
          '<div style="font-size:12px;color:rgba(255,255,255,.7);margin-bottom:6px">📍 '+end+'</div>'+
          '<div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:8px">'+dets.map(function(d){return '<div style="background:rgba(255,255,255,.1);border-radius:6px;padding:4px 10px;font-size:11px;font-weight:700;color:#fff;display:flex;align-items:center;gap:4px">'+d.i+' '+d.v+'</div>';}).join('')+'</div>'+
          '<div style="font-size:10px;color:#D42028;font-weight:700;text-transform:uppercase;letter-spacing:1px">Ninguém no mundo vende mais imóveis que a RE/MAX!</div>'+
        '</div>'+
        footerHtml+
      '</div>';
    }
    return html;
  }

  function abrirGerador(){
    var modelBtns = [1,2,3,4,5,6].map(function(n){
      return '<button onclick="estadoPost.modelo='+n+';atualizarPreview()" style="background:'+(estado.modelo===n?'#003DA5':'#f1f5f9')+';color:'+(estado.modelo===n?'#fff':'#0f1a35')+';border:2px solid '+(estado.modelo===n?'#003DA5':'#e2e8f0')+';border-radius:8px;padding:6px 14px;font-size:11px;font-weight:700;cursor:pointer" id="mbtn-'+n+'">M'+n+'</button>';
    }).join('');

    var conteudo = 
      '<div style="display:flex;gap:16px;min-height:560px">'+
        '<div style="width:200px;flex-shrink:0">'+
          '<div style="font-size:11px;font-weight:700;color:var(--lm);margin-bottom:8px;text-transform:uppercase">Modelo</div>'+
          '<div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:14px" id="model-btns">'+modelBtns+'</div>'+
          '<div style="border-top:1px solid var(--lb);padding-top:12px;margin-bottom:12px">'+
            '<div style="font-size:11px;font-weight:700;color:var(--lm);margin-bottom:8px;text-transform:uppercase">Opcoes</div>'+
            '<label style="display:flex;align-items:center;gap:8px;font-size:12px;margin-bottom:8px;cursor:pointer"><input type="checkbox" id="opt-preco" checked onchange="estadoPost.comPreco=this.checked;atualizarPreview()"> Mostrar preço</label>'+
            '<label style="display:flex;align-items:center;gap:8px;font-size:12px;margin-bottom:8px;cursor:pointer"><input type="checkbox" id="opt-creci" checked onchange="estadoPost.comCreci=this.checked;atualizarPreview()"> Mostrar CRECI</label>'+
          '</div>'+
          '<div style="border-top:1px solid var(--lb);padding-top:12px;margin-bottom:12px">'+
            '<div style="font-size:11px;font-weight:700;color:var(--lm);margin-bottom:8px;text-transform:uppercase">Foto do Imóvel</div>'+
            '<label style="display:flex;align-items:center;gap:8px;font-size:12px;margin-bottom:8px;cursor:pointer"><input type="checkbox" id="opt-foto" onchange="estadoPost.comFoto=this.checked;atualizarPreview()"> Usar foto</label>'+
            '<input type="file" id="inp-foto" accept="image/*" style="font-size:11px;width:100%" onchange="lerFotoImovel(this)">'+
            '<div style="font-size:10px;color:var(--lm);margin-top:4px">JPG, PNG até 5MB</div>'+
          '</div>'+
          '<div style="border-top:1px solid var(--lb);padding-top:12px;margin-bottom:12px">'+
            '<div style="font-size:11px;font-weight:700;color:var(--lm);margin-bottom:8px;text-transform:uppercase">Foto do Corretor</div>'+
            '<input type="file" id="inp-cor-foto" accept="image/*" style="font-size:11px;width:100%" onchange="lerFotoCorretor(this)">'+
          '</div>'+
          '<div style="border-top:1px solid var(--lb);padding-top:12px">'+
            '<button onclick="baixarPost()" class="btn btn-red" style="width:100%;margin-bottom:8px">⬇️ Baixar PNG</button>'+
            '<button onclick="copiarLegenda()" class="btn btn-primary" style="width:100%">📋 Copiar Legenda</button>'+
          '</div>'+
        '</div>'+
        '<div style="flex:1">'+
          '<div style="font-size:11px;font-weight:700;color:var(--lm);margin-bottom:8px;text-transform:uppercase">Preview — 500x500px</div>'+
          '<div id="post-preview" style="transform-origin:top left;transform:scale(0.75)">'+renderPost()+'</div>'+
        '</div>'+
      '</div>';

    oM('📸 Gerador de Post — ' + (iv.tipo||'Imóvel') + ' | ' + (iv.end||''), conteudo, null, null, true);

    // Store state globally for callbacks
    window.estadoPost = estado;
    window.ivPost = iv;
    window.corPost = cor;
    window.renderPostFn = renderPost;
  }

  window.atualizarPreview = function(){
    var el = document.getElementById('post-preview');
    if(el){ el.innerHTML = renderPost(); }
    // Update model buttons
    for(var n=1;n<=6;n++){
      var btn = document.getElementById('mbtn-'+n);
      if(btn){
        btn.style.background = estado.modelo===n?'#003DA5':'#f1f5f9';
        btn.style.color = estado.modelo===n?'#fff':'#0f1a35';
        btn.style.borderColor = estado.modelo===n?'#003DA5':'#e2e8f0';
      }
    }
  };

  window.lerFotoImovel = function(input){
    if(!input.files||!input.files[0]) return;
    var reader = new FileReader();
    reader.onload = function(e){
      estado.fotoUrl = e.target.result;
      estado.comFoto = true;
      document.getElementById('opt-foto').checked = true;
      atualizarPreview();
    };
    reader.readAsDataURL(input.files[0]);
  };

  window.lerFotoCorretor = function(input){
    if(!input.files||!input.files[0]) return;
    var reader = new FileReader();
    reader.onload = function(e){
      estado.corretorFotoUrl = e.target.result;
      atualizarPreview();
    };
    reader.readAsDataURL(input.files[0]);
  };

  window.baixarPost = function(){
    // Use html2canvas if available, else open in new window
    var w = window.open('','_blank');
    var html = renderPost();
    w.document.write('<!DOCTYPE html><html><head><meta charset="UTF-8"><style>*{margin:0;padding:0;box-sizing:border-box}body{background:#f8fafc;display:flex;flex-direction:column;align-items:center;padding:20px;font-family:Arial,sans-serif}</style></head><body>'+
      '<div style="margin-bottom:16px">'+html+'</div>'+
      '<div style="font-size:12px;color:#64748b;margin-bottom:12px">Clique com botão direito na imagem → Salvar imagem como...</div>'+
      '<button onclick="window.print()" style="background:#D42028;color:#fff;border:none;padding:10px 24px;border-radius:8px;cursor:pointer;font-size:14px">🖨️ Imprimir / Salvar</button>'+
      '</body></html>');
    w.document.close();
  };

  window.copiarLegenda = function(){
    var leg = getLegenda(iv, cor);
    navigator.clipboard.writeText(leg).then(function(){ alert('Legenda copiada! Cole no Instagram.'); })
    .catch(function(){
      var ta=document.createElement('textarea'); ta.value=leg;
      document.body.appendChild(ta); ta.select(); document.execCommand('copy');
      document.body.removeChild(ta); alert('Legenda copiada!');
    });
  };

  abrirGerador();
}

// ===== VITRINE DE IMÓVEIS =====
var _vitFiltOp = 'Todos';
var _vitFiltTipo = 'Todos';
var _vitFiltQ = 'Todos';
var _vitFiltBairro = 'Todos';

function isAdmin(){ return U&&(U.role==='admin'||U.role_key==='admin'||U.id==='tbasile'); }

function pVitrine(){
  var isAdm = isAdmin();
  var paHtml = isAdm
    ? '<button class="btn btn-red" onclick="nVitrine()">+ Novo Imóvel</button>'
    : '<span style="font-size:12px;color:#6b7280">Vitrine interna — somente visualização</span>';
  document.getElementById('pa').innerHTML = paHtml;

  var ops = ['Todos','Venda','Locação'];
  var tipos = ['Todos','Casa','Apartamento','Flat/Apart-Hotel','Chalé','Terreno/Lote','Chácara','Fazenda','Kitnet','Sala Comercial','Outro'];
  var quartos = ['Todos','1','2','3','4+'];

  function fBtn(arr, cur, fn){
    return arr.map(function(v){
      var a = cur===v;
      return '<button onclick="'+fn+'(\''+v+'\')" style="padding:5px 14px;border-radius:20px;border:1.5px solid '+(a?'#003DA5':'#e5e7eb')+';background:'+(a?'#003DA5':'#fff')+';color:'+(a?'#fff':'#6b7280')+';font-size:11px;font-weight:600;cursor:pointer;white-space:nowrap;transition:all .15s">'+v+'</button>';
    }).join('');
  }

  var filtros = '<div style="background:#fff;border-radius:14px;padding:14px 16px;border:1px solid #e5e7eb;margin-bottom:20px;box-shadow:0 1px 4px rgba(0,0,0,.04)">'+
    '<div style="display:flex;flex-wrap:wrap;align-items:center;gap:6px;margin-bottom:8px">'+
      '<span style="font-size:11px;font-weight:700;color:#9ca3af;min-width:64px;text-transform:uppercase;letter-spacing:.5px">Operação</span>'+
      fBtn(ops, _vitFiltOp, 'vitSetOp')+
    '</div>'+
    '<div style="display:flex;flex-wrap:wrap;align-items:center;gap:6px;margin-bottom:8px">'+
      '<span style="font-size:11px;font-weight:700;color:#9ca3af;min-width:64px;text-transform:uppercase;letter-spacing:.5px">Tipo</span>'+
      fBtn(tipos, _vitFiltTipo, 'vitSetTipo')+
    '</div>'+
    '<div style="display:flex;flex-wrap:wrap;align-items:center;gap:6px">'+
      '<span style="font-size:11px;font-weight:700;color:#9ca3af;min-width:64px;text-transform:uppercase;letter-spacing:.5px">Quartos</span>'+
      fBtn(quartos, _vitFiltQ, 'vitSetQ')+
    '</div>'+
  '</div>';

  var lista = vitD.filter(function(v){
    if(_vitFiltOp!=='Todos' && v.op!==_vitFiltOp) return false;
    if(_vitFiltTipo!=='Todos' && v.tipo!==_vitFiltTipo) return false;
    if(_vitFiltQ!=='Todos'){
      var q = parseInt(v.quartos)||0;
      if(_vitFiltQ==='4+' && q<4) return false;
      if(_vitFiltQ!=='4+' && q!==parseInt(_vitFiltQ)) return false;
    }
    return true;
  });

  var cards = '';
  if(!lista.length){
    cards = '<div style="text-align:center;padding:60px 20px;color:#9ca3af">'+
      '<div style="font-size:52px;margin-bottom:12px">🏠</div>'+
      '<div style="font-size:16px;font-weight:700;color:#374151">Nenhum imóvel encontrado</div>'+
      '<div style="font-size:13px;margin-top:6px">'+(isAdm?'Clique em "+ Novo Imóvel" para cadastrar':'Nenhum imóvel disponível com esses filtros')+'</div>'+
    '</div>';
  } else {
    cards = '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(290px,1fr));gap:20px">';
    lista.forEach(function(v){
      var idx = vitD.indexOf(v);
      var fotos = (v.fotos||[]).filter(Boolean);
      var foto1 = fotos[0]||'';
      var opCor = v.op==='Venda'?'#003DA5':'#059669';
      var opBg  = v.op==='Venda'?'#eff6ff':'#f0fdf4';
      var val   = v.valor?'R$ '+Number(v.valor).toLocaleString('pt-BR')+(v.op==='Locação'?'/mês':''):'Consulte';
      var qStr  = v.quartos?'<span>🛏 '+v.quartos+'</span>':'';
      var aStr  = v.area?'<span>📐 '+v.area+'m²</span>':'';
      var vStr  = v.vagas?'<span>🚗 '+v.vagas+'</span>':'';
      var bStr  = v.banheiros?'<span>🚿 '+v.banheiros+'</span>':'';
      var tags  = [qStr,aStr,vStr,bStr].filter(Boolean).join('');

      var fotoHtml = '';
      if(fotos.length){
        fotoHtml = '<div id="vit-img-'+idx+'" style="position:relative;height:210px;overflow:hidden;background:#f3f4f6">'+
          '<img src="'+foto1+'" style="width:100%;height:100%;object-fit:cover;transition:transform .3s" onmouseover="this.style.transform=\'scale(1.04)\'" onmouseout="this.style.transform=\'scale(1)\'" onerror="this.style.display=\'none\'">'+
          (fotos.length>1?
            '<button onclick="vitFotoAnterior('+idx+')" style="position:absolute;left:8px;top:50%;transform:translateY(-50%);background:rgba(0,0,0,.45);color:#fff;border:none;border-radius:50%;width:30px;height:30px;cursor:pointer;font-size:16px;display:flex;align-items:center;justify-content:center">‹</button>'+
            '<button onclick="vitFotoProxima('+idx+')" style="position:absolute;right:8px;top:50%;transform:translateY(-50%);background:rgba(0,0,0,.45);color:#fff;border:none;border-radius:50%;width:30px;height:30px;cursor:pointer;font-size:16px;display:flex;align-items:center;justify-content:center">›</button>'+
            '<span style="position:absolute;bottom:10px;right:10px;background:rgba(0,0,0,.6);color:#fff;font-size:10px;padding:3px 8px;border-radius:12px;font-weight:600">📷 '+fotos.length+'</span>'
          :'')+'</div>';
      } else {
        fotoHtml = '<div style="height:180px;background:linear-gradient(135deg,#eff6ff,#dbeafe);display:flex;align-items:center;justify-content:center;flex-direction:column;gap:8px">'+
          '<span style="font-size:44px">🏠</span>'+
          '<span style="font-size:11px;color:#93c5fd;font-weight:600">Sem foto</span>'+
        '</div>';
      }

      cards += '<div style="background:#fff;border-radius:16px;border:1px solid #e5e7eb;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.07);display:flex;flex-direction:column">'+
        fotoHtml+
        '<div style="padding:14px 16px;flex:1;display:flex;flex-direction:column;gap:8px">'+
          '<div style="display:flex;justify-content:space-between;align-items:center">'+
            '<span style="font-size:11px;font-weight:700;padding:3px 10px;border-radius:20px;background:'+opBg+';color:'+opCor+'">'+v.op+'</span>'+
            '<span style="font-size:11px;color:#9ca3af;background:#f9fafb;padding:3px 9px;border-radius:10px">'+v.tipo+'</span>'+
          '</div>'+
          '<div style="font-weight:800;font-size:15px;color:#111827;line-height:1.3">'+v.titulo+'</div>'+
          (v.bairro||v.end?'<div style="font-size:12px;color:#6b7280">📍 '+(v.bairro||v.end)+'</div>':'')+
          (tags?'<div style="display:flex;flex-wrap:wrap;gap:6px">'+
            [qStr,aStr,vStr,bStr].filter(Boolean).map(function(t){
              return '<span style="background:#f3f4f6;color:#374151;padding:4px 10px;border-radius:8px;font-size:11px;font-weight:600">'+t+'</span>';
            }).join('')+
          '</div>':'')+
          (v.descricao?'<div style="font-size:12px;color:#6b7280;line-height:1.5;flex:1">'+v.descricao.slice(0,90)+(v.descricao.length>90?'…':'')+'</div>':'')+
          '<div style="display:flex;justify-content:space-between;align-items:center;padding-top:10px;border-top:1px solid #f3f4f6;margin-top:auto">'+
            '<div style="font-size:20px;font-weight:900;color:'+opCor+'">'+val+'</div>'+
            '<div style="display:flex;gap:6px">'+
              '<button onclick="vitWhatsapp('+idx+')" style="padding:7px 12px;border-radius:8px;background:#25D366;color:#fff;border:none;font-size:11px;font-weight:700;cursor:pointer">📤 Enviar</button>'+
              (isAdm?'<button onclick="eVitrine('+idx+')" style="padding:7px 10px;border-radius:8px;background:#f3f4f6;color:#374151;border:none;font-size:12px;cursor:pointer">✏️</button>':'')+
              (isAdm?'<button onclick="delVitrine('+idx+')" style="padding:7px 10px;border-radius:8px;background:#fee2e2;color:#991b1b;border:none;font-size:12px;cursor:pointer">🗑</button>':'')+
            '</div>'+
          '</div>'+
        '</div>'+
      '</div>';
    });
    cards += '</div>';
    cards += '<div style="margin-top:24px;text-align:center">'+
      '<button onclick="vitGerarLista()" style="padding:13px 32px;background:linear-gradient(90deg,#0f1a35,#003DA5);color:#fff;border:none;border-radius:12px;font-size:14px;font-weight:700;cursor:pointer;box-shadow:0 4px 12px rgba(0,61,165,.25)">📋 Gerar lista para cliente</button>'+
    '</div>';
  }

  document.getElementById('pc').innerHTML =
    '<div class="card"><div class="chd" style="display:flex;justify-content:space-between;align-items:center">'+
      '<h3>🏠 Vitrine de Imóveis <span style="font-size:13px;font-weight:400;color:#9ca3af">('+lista.length+' disponível'+(lista.length!==1?'is':'')+')</span></h3>'+
    '</div>'+
    '<div style="padding:16px">'+filtros+cards+'</div></div>';
}

// controles de filtro
window.vitSetOp   = function(v){ _vitFiltOp=v;   pVitrine(); };
window.vitSetTipo = function(v){ _vitFiltTipo=v;  pVitrine(); };
window.vitSetQ    = function(v){ _vitFiltQ=v;     pVitrine(); };

// carrossel de fotos
var _vitFotoIdx = {};
window.vitFotoProxima = function(idx){
  var fotos = (vitD[idx].fotos||[]).filter(Boolean);
  _vitFotoIdx[idx] = ((_vitFotoIdx[idx]||0)+1) % fotos.length;
  var img = document.querySelector('#vit-img-'+idx+' img');
  if(img) img.src = fotos[_vitFotoIdx[idx]];
};
window.vitFotoAnterior = function(idx){
  var fotos = (vitD[idx].fotos||[]).filter(Boolean);
  _vitFotoIdx[idx] = ((_vitFotoIdx[idx]||0)-1+fotos.length) % fotos.length;
  var img = document.querySelector('#vit-img-'+idx+' img');
  if(img) img.src = fotos[_vitFotoIdx[idx]];
};

// Enviar pelo WhatsApp
window.vitWhatsapp = function(idx){
  var v = vitD[idx];
  var val = v.valor?'R$ '+Number(v.valor).toLocaleString('pt-BR'):'Consulte';
  var txt = '🏠 *'+v.titulo+'*\n'+
    '📍 '+( v.bairro||v.end||'')+'\n'+
    '🏷️ '+v.op+' · '+v.tipo+'\n'+
    (v.quartos?'🛏️ '+v.quartos+' quarto'+(v.quartos>1?'s':'')+'\n':'')+
    (v.area?'📐 '+v.area+'m²\n':'')+
    (v.vagas?'🚗 '+v.vagas+' vaga'+(v.vagas>1?'s':'')+'\n':'')+
    '💰 '+val+'\n'+
    (v.descricao?'\n'+v.descricao+'\n':'')+
    '\n📞 RE/MAX Space — (64) 9xxxx-xxxx';
  window.open('https://wa.me/?text='+encodeURIComponent(txt),'_blank');
};


window.vitGerarLista = function(){
  var lista = vitD.filter(function(v){
    if(_vitFiltOp!=='Todos'&&v.op!==_vitFiltOp) return false;
    if(_vitFiltTipo!=='Todos'&&v.tipo!==_vitFiltTipo) return false;
    if(_vitFiltQ!=='Todos'){var q=parseInt(v.quartos)||0;if(_vitFiltQ==='4+'&&q<4)return false;if(_vitFiltQ!=='4+'&&q!==parseInt(_vitFiltQ))return false;}
    return true;
  });
  if(!lista.length){alert('Nenhum imóvel com esses filtros.');return;}

  function qrUrl(u){return 'https://api.qrserver.com/v1/create-qr-code/?size=90x90&data='+encodeURIComponent(u||'https://remaxspace.com.br');}
  function fotoSrc(fotos){
    var f=(fotos||[]).filter(Boolean)[0]||'';
    if(!f) return '';
    // Se já é unsplash, drive público ou imgbb — usa direto
    if(/unsplash|imgbb|imgur|googleusercontent|drive\.google/i.test(f)) return f;
    // Senão tenta wsrv.nl como proxy
    return 'https://wsrv.nl/?url='+encodeURIComponent(f)+'&w=600&h=300&fit=cover&default=1';
  }

  // Texto WhatsApp
  var txt='🏠 *IMÓVEIS DISPONÍVEIS — RE/MAX Space*\n📍 Caldas Novas · GO\n━━━━━━━━━━━━━━━━━━━━━━\n\n';
  lista.forEach(function(v,i){
    var val=v.valor?(v.op==='Locação'?'R$ '+Number(v.valor).toLocaleString('pt-BR')+'/mês':'R$ '+Number(v.valor).toLocaleString('pt-BR')):'Consulte';
    txt+=(v.op==='Venda'?'🔑':'🏡')+' *'+(i+1)+'. '+v.titulo+'*\n';
    if(v.bairro) txt+='📍 '+v.bairro+'\n';
    var d=[];
    if(v.quartos) d.push('🛏 '+v.quartos+' qto'+(v.quartos>1?'s':''));
    if(v.area) d.push('📐 '+v.area+'m²');
    if(v.vagas) d.push('🚗 '+v.vagas+' vaga'+(v.vagas>1?'s':''));
    if(d.length) txt+=d.join(' · ')+'\n';
    txt+='💰 *'+val+'*\n';
    if(v.descricao) txt+='✨ '+v.descricao.slice(0,80)+'...\n';
    if(v.linkOrigem) txt+='🔗 '+v.linkOrigem+'\n';
    txt+='━━━━━━━━━━━━━━━━━━━━━━\n\n';
  });
  txt+='📲 *Gostou? Entre em contato!*\n🏢 RE/MAX Space — Caldas Novas\n📞 (64) 9 9999-9999\n🌐 remaxspace.com.br';

  // Cards visuais
  var cards=lista.map(function(v,i){
    var val=v.valor?(v.op==='Locação'?'R$ '+Number(v.valor).toLocaleString('pt-BR')+'/mês':'R$ '+Number(v.valor).toLocaleString('pt-BR')):'Consulte';
    var foto=(v.fotos||[]).filter(Boolean)[0]||'';
    var fSrc=fotoSrc(v.fotos);
    var opCor=v.op==='Venda'?'#003DA5':'#059669';
    var qrLink=v.linkOrigem||'https://remaxspace.com.br';
    var tags=[];
    if(v.quartos) tags.push('🛏 '+v.quartos+' qto'+(v.quartos>1?'s':''));
    if(v.area) tags.push('📐 '+v.area+'m²');
    if(v.vagas) tags.push('🚗 '+v.vagas+' vaga'+(v.vagas>1?'s':''));
    if(v.banheiros) tags.push('🚿 '+v.banheiros+' ban.');
    return '<div style="background:#fff;border-radius:18px;overflow:hidden;box-shadow:0 8px 32px rgba(0,0,0,.12);margin-bottom:20px;border:1px solid #e5e7eb">'+
      '<div style="position:relative;height:200px;background:linear-gradient(135deg,#0f1a35,#003DA5);overflow:hidden">'+
        (fSrc?'<img src="'+fSrc+'" style="width:100%;height:100%;object-fit:cover" onerror="this.style.display=\'none\'">':'<div style="height:100%;display:flex;align-items:center;justify-content:center;font-size:56px">🏠</div>')+
        '<div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,.75) 0%,rgba(0,0,0,.1) 50%,transparent 100%)"></div>'+
        '<div style="position:absolute;top:14px;left:14px;display:flex;gap:8px">'+
          '<span style="background:'+opCor+';color:#fff;padding:5px 14px;border-radius:20px;font-size:11px;font-weight:800;letter-spacing:.5px">'+v.op.toUpperCase()+'</span>'+
          (v.tipo?'<span style="background:rgba(255,255,255,.2);backdrop-filter:blur(4px);color:#fff;padding:5px 12px;border-radius:20px;font-size:11px">'+v.tipo+'</span>':'')+
        '</div>'+
        '<div style="position:absolute;bottom:14px;left:14px;right:14px">'+
          '<div style="color:#fff;font-weight:800;font-size:17px;line-height:1.3;text-shadow:0 2px 8px rgba(0,0,0,.5)">'+v.titulo+'</div>'+
          (v.bairro?'<div style="color:rgba(255,255,255,.85);font-size:12px;margin-top:4px">📍 '+v.bairro+'</div>':'')+
        '</div>'+
      '</div>'+
      '<div style="padding:16px;display:flex;gap:14px;align-items:flex-start">'+
        '<div style="flex:1">'+
          (tags.length?'<div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:12px">'+
            tags.map(function(t){return '<span style="background:#f0f4ff;color:#374151;padding:5px 11px;border-radius:20px;font-size:12px;font-weight:500">'+t+'</span>';}).join('')+
          '</div>':'')+
          (v.descricao?'<div style="font-size:12px;color:#6b7280;line-height:1.6;margin-bottom:12px">'+v.descricao.slice(0,110)+(v.descricao.length>110?'…':'')+'</div>':'')+
          '<div style="font-size:26px;font-weight:900;color:'+opCor+'">'+val+'</div>'+
        '</div>'+
        '<div style="text-align:center;flex-shrink:0;background:#f9fafb;border-radius:12px;padding:10px;border:1px solid #e5e7eb">'+
          '<img src="'+qrUrl(qrLink)+'" style="width:80px;height:80px;border-radius:6px;display:block">'+
          '<div style="font-size:9px;color:#9ca3af;margin-top:5px;font-weight:600;text-transform:uppercase;letter-spacing:.5px">Ver fotos</div>'+
        '</div>'+
      '</div>'+
      '<div style="background:linear-gradient(90deg,#0f1a35,#003DA5);padding:10px 16px;display:flex;justify-content:space-between;align-items:center">'+
        '<div style="display:flex;align-items:center;gap:8px">'+
          '<div style="width:6px;height:6px;background:#D42028;border-radius:50%"></div>'+
          '<span style="color:#fff;font-size:11px;font-weight:700">RE/MAX Space · Caldas Novas</span>'+
        '</div>'+
        '<span style="color:#D42028;font-size:11px;font-weight:800">(64) 9 9999-9999</span>'+
      '</div>'+
    '</div>';
  }).join('');

  document.getElementById('mt').textContent='Lista para Cliente — '+lista.length+' imóvel(is)';
  document.getElementById('mb').innerHTML=
    '<style>@media print{.no-print{display:none!important}}</style>'+
    '<div class="no-print" style="display:flex;gap:8px;margin-bottom:16px">'+
      '<button id="vit-btn-cards" onclick="vitAba(\'cards\')" style="flex:1;padding:10px;background:#003DA5;color:#fff;border:none;border-radius:8px;font-weight:700;cursor:pointer;font-size:13px">🃏 Cards Visuais</button>'+
      '<button id="vit-btn-txt" onclick="vitAba(\'txt\')" style="flex:1;padding:10px;background:#f3f4f6;color:#374151;border:none;border-radius:8px;font-weight:700;cursor:pointer;font-size:13px">💬 Texto WhatsApp</button>'+
    '</div>'+
    '<div id="vit-tab-cards">'+cards+
      '<button onclick="window.print()" class="no-print" style="width:100%;padding:12px;background:#0f1a35;color:#fff;border:none;border-radius:10px;font-weight:700;cursor:pointer;font-size:13px;margin-top:4px">🖨️ Imprimir / Salvar PDF</button>'+
    '</div>'+
    '<div id="vit-tab-txt" style="display:none">'+
      '<textarea id="vit-lista-txt" style="width:100%;height:300px;font-family:monospace;font-size:11px;border:1px solid #e5e7eb;border-radius:8px;padding:12px;resize:none;background:#f9fafb">'+txt+'</textarea>'+
      '<div style="display:flex;gap:8px;margin-top:10px">'+
        '<button onclick="navigator.clipboard.writeText(document.getElementById(\'vit-lista-txt\').value).then(function(){alert(\'Copiado! ✓\');})" style="flex:1;padding:12px;background:#003DA5;color:#fff;border:none;border-radius:8px;font-weight:700;cursor:pointer;font-size:13px">📋 Copiar</button>'+
        '<button onclick="var t=document.getElementById(\'vit-lista-txt\').value;window.open(\'https://wa.me/?text=\'+encodeURIComponent(t),\'_blank\')" style="flex:1;padding:12px;background:#25D366;color:#fff;border:none;border-radius:8px;font-weight:700;cursor:pointer;font-size:13px">📤 WhatsApp</button>'+
      '</div>'+
    '</div>';
  var mc = document.getElementById('mc'); if(mc) mc.onclick=cM;
  // Abrir modal corretamente via className
  document.getElementById('mov').className='mov open';
  document.getElementById('mbox').style.width='860px';
  document.getElementById('mok').style.display='none';
};

window.vitAba=function(aba){
  document.getElementById('vit-tab-cards').style.display=aba==='cards'?'block':'none';
  document.getElementById('vit-tab-txt').style.display=aba==='txt'?'block':'none';
  document.getElementById('vit-btn-cards').style.background=aba==='cards'?'#003DA5':'#f3f4f6';
  document.getElementById('vit-btn-cards').style.color=aba==='cards'?'#fff':'#374151';
  document.getElementById('vit-btn-txt').style.background=aba==='txt'?'#003DA5':'#f3f4f6';
  document.getElementById('vit-btn-txt').style.color=aba==='txt'?'#fff':'#374151';
};

// Adicionar campo linkOrigem no vitFormHtml e vitSalvarForm
window.vitImportarLink = async function(){
  var url = (document.getElementById('vf-import-url')||{}).value||'';
  if(!url.trim()){ alert('Cole o link do imóvel primeiro.'); return; }
  var st = document.getElementById('vf-import-status');
  if(st){ st.style.color='#2563eb'; st.textContent='⏳ Buscando dados...'; }
  var btn = document.querySelector('[onclick="vitImportarLink()"]');
  if(btn){ btn.disabled=true; btn.textContent='Carregando...'; }

  try{
    // Tentar múltiplos proxies
    var html = '';
    var proxies = [
      'https://api.allorigins.win/get?url='+encodeURIComponent(url),
      'https://corsproxy.io/?'+encodeURIComponent(url),
      'https://api.codetabs.com/v1/proxy?quest='+encodeURIComponent(url)
    ];
    for(var pi=0;pi<proxies.length;pi++){
      try{
        var pr = await fetch(proxies[pi], {signal: AbortSignal.timeout(8000)});
        if(pr.ok){
          var pj = await pr.json().catch(async function(){ return {contents: await pr.text()}; });
          html = pj.contents || pj || '';
          if(html && html.length > 200) break;
        }
      } catch(pe){ console.log('Proxy '+pi+' falhou:', pe.message); }
    }

    // Extrair metadados do HTML (se conseguiu)
    var jsonLdData='', metaTags='', texto='', imgUrls=[];
    if(html && html.length>200){
      var jlds = html.match(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)||[];
      jlds.forEach(function(m){ jsonLdData+=m+'\n'; });
      var metas = html.match(/<meta[^>]+>/gi)||[];
      metas.forEach(function(m){ metaTags+=m+'\n'; });
      var tmp=document.createElement('div');
      tmp.innerHTML=html;
      tmp.querySelectorAll('script,style,nav,footer,header,aside').forEach(function(el){el.remove();});
      texto=(tmp.innerText||tmp.textContent||'').replace(/\s+/g,' ').trim().slice(0,2000);
      var imgs=[].concat(
        (html.match(/content="(https?:\/\/[^"]+\.(jpg|jpeg|png|webp)[^"]*)"/gi)||[]).map(function(m){var x=m.match(/content="([^"]+)"/);return x?x[1]:''; }),
        (html.match(/src="(https?:\/\/[^"]+\.(jpg|jpeg|png|webp)[^"]*)"/gi)||[]).map(function(m){var x=m.match(/src="([^"]+)"/);return x?x[1]:''; })
      );
      imgUrls=imgs.filter(Boolean).filter(function(u){return u.length>20&&!/logo|icon|avatar|sprite/i.test(u);}).filter(function(u,i,a){return a.indexOf(u)===i;}).slice(0,5);
    }

    if(st){ st.style.color='#2563eb'; st.textContent='🤖 IA analisando...'; }

    // Montar prompt — mesmo sem HTML a IA usa a URL para inferir dados
    var prompt = 'Analise este anúncio imobiliário.\n\nURL: '+url+'\n\n'+(metaTags?'META TAGS:\n'+metaTags.slice(0,1000)+'\n\n':'')+(jsonLdData?'JSON-LD:\n'+jsonLdData.slice(0,1000)+'\n\n':'')+(texto?'TEXTO:\n'+texto+'\n\n':'')+(imgUrls.length?'IMAGENS:\n'+JSON.stringify(imgUrls)+'\n\n':'')+'IMPORTANTE: Use a URL para inferir dados que não estão no texto. Por exemplo "/apartamento-a-venda-3-quartos" indica 3 quartos e venda. "/alugar" ou "/locacao" indica Locação. "/caldas-novas" indica a cidade. Estime o valor se não encontrar (coloque 0 se não conseguir estimar).\n\nRetorne APENAS JSON:\n{"titulo":"","op":"Venda","tipo":"Apartamento","bairro":"","valor":0,"area":0,"quartos":0,"banheiros":0,"vagas":0,"descricao":"","fotos":[]}';

    var system = 'Você extrai e infere dados de anúncios imobiliários. Use a URL e todo contexto disponível. Retorne APENAS JSON válido. op: Venda ou Locação. tipo: Casa/Apartamento/Flat\\/Apart-Hotel/Chalé/Terreno\\/Lote/Chácara/Fazenda/Kitnet/Sala Comercial/Outro.';

    var txt = await callClaude(prompt, system, 1000);
    txt = txt.replace(/```json|```/g,'').trim();
    var ini=txt.indexOf('{'), fim=txt.lastIndexOf('}');
    if(ini>=0&&fim>ini) txt=txt.slice(ini,fim+1);
    var info = JSON.parse(txt);

    function set(id,val){ var el=document.getElementById(id); if(el&&val!==undefined&&val!==null&&val!=='') el.value=val; }
    function setNum(id,val){ var el=document.getElementById(id); if(el&&val&&val>0) el.value=val; }
    set('vf-titulo',   info.titulo);
    set('vf-bairro',   info.bairro);
    setNum('vf-valor',    info.valor);
    setNum('vf-area',     info.area);
    setNum('vf-quartos',  info.quartos);
    setNum('vf-banheiros',info.banheiros);
    setNum('vf-vagas',    info.vagas);
    var desc=document.getElementById('vf-desc'); if(desc&&info.descricao) desc.value=info.descricao;
    var selOp=document.getElementById('vf-op');
    if(selOp) selOp.value=(/loca|alugu/i.test(info.op||''))?'Locação':'Venda';
    var selTipo=document.getElementById('vf-tipo');
    if(selTipo&&info.tipo){ for(var ii=0;ii<selTipo.options.length;ii++){ if(selTipo.options[ii].value===info.tipo||selTipo.options[ii].text===info.tipo){selTipo.selectedIndex=ii;break;} } }
    var fotos=(info.fotos||[]).concat(imgUrls).filter(Boolean).filter(function(u,i,a){return a.indexOf(u)===i;}).slice(0,5);
    fotos.forEach(function(f,i){ var el=document.getElementById('vf-foto'+i); if(el) el.value=f; });

    var r=[];
    if(info.valor>0) r.push('R$ '+Number(info.valor).toLocaleString('pt-BR'));
    if(info.quartos>0) r.push(info.quartos+' qtos');
    if(info.area>0) r.push(info.area+'m²');
    if(fotos.length) r.push(fotos.length+' foto(s)');
    if(st){ st.style.color='#059669'; st.textContent='✅ Preenchido'+(r.length?' — '+r.join(', '):'')+'. Confira e ajuste se necessário.'; }

  } catch(e){
    console.error('vitImportarLink:',e);
    if(st){ st.style.color='#D42028'; st.textContent='❌ Erro ao extrair. Preencha manualmente ou tente outro link.'; }
  } finally {
    if(btn){ btn.disabled=false; btn.textContent='✨ Preencher com IA'; }
  }
};
function vitFormHtml(v){
  v = v||{};
  var fotos = v.fotos||['','','','',''];
  while(fotos.length<5) fotos.push('');
  return '<div style="background:linear-gradient(135deg,#eff6ff,#dbeafe);border-radius:10px;padding:14px;margin-bottom:16px;border:1.5px solid #bfdbfe">'+
    '<div style="font-size:12px;font-weight:700;color:#1d4ed8;margin-bottom:8px">🔗 Importar automaticamente pelo link</div>'+
    '<div style="display:flex;gap:8px;align-items:center">'+
      '<input id="vf-import-url" placeholder="Cole o link do iList, ZAP, OLX..." style="flex:1;border:1px solid #bfdbfe;border-radius:8px;padding:9px 12px;font-size:13px">'+
      '<button onclick="vitImportarLink()" style="padding:9px 18px;background:#003DA5;color:#fff;border:none;border-radius:8px;font-weight:700;font-size:13px;cursor:pointer;white-space:nowrap">✨ Preencher com IA</button>'+
    '</div>'+
    '<div id="vf-import-status" style="font-size:11px;color:#6b7280;margin-top:6px"></div>'+
  '</div>'+
  '<div class="fg2">'+
    '<div class="fg"><label>Operação *</label>'+
      '<select id="vf-op">'+
        ['Venda','Locação'].map(function(o){ return '<option'+(o===(v.op||'Venda')?' selected':'')+'>'+o+'</option>'; }).join('')+
      '</select></div>'+
    '<div class="fg"><label>Tipo *</label>'+
      '<select id="vf-tipo">'+
        ['Casa','Apartamento','Flat/Apart-Hotel','Chalé','Terreno/Lote','Chácara','Fazenda','Kitnet','Sala Comercial','Outro'].map(function(t){ return '<option'+(t===(v.tipo||'Casa')?' selected':'')+'>'+t+'</option>'; }).join('')+
      '</select></div>'+
  '</div>'+
  '<div class="fg"><label>Título do anúncio *</label><input id="vf-titulo" value="'+(v.titulo||'')+'" placeholder="Ex: Casa 3 quartos com piscina — Lago Sul"></div>'+
  '<div class="fg2">'+
    '<div class="fg"><label>Bairro / Região</label><input id="vf-bairro" value="'+(v.bairro||'')+'" placeholder="Ex: Lago Sul, Mansões, Centro..."></div>'+
    '<div class="fg"><label>Endereço (interno)</label><input id="vf-end" value="'+(v.end||'')+'" placeholder="Endereço completo (não aparece para corretores)"></div>'+
  '</div>'+
  '<div class="fg2">'+
    '<div class="fg"><label>Valor (R$)</label><input id="vf-valor" type="number" value="'+(v.valor||'')+'" placeholder="0"></div>'+
    '<div class="fg"><label>Área (m²)</label><input id="vf-area" type="number" value="'+(v.area||'')+'" placeholder="0"></div>'+
  '</div>'+
  '<div class="fg2" style="grid-template-columns:1fr 1fr 1fr">'+
    '<div class="fg"><label>Quartos</label><input id="vf-quartos" type="number" value="'+(v.quartos||'')+'" placeholder="0" min="0" max="20"></div>'+
    '<div class="fg"><label>Banheiros</label><input id="vf-banheiros" type="number" value="'+(v.banheiros||'')+'" placeholder="0" min="0" max="20"></div>'+
    '<div class="fg"><label>Vagas</label><input id="vf-vagas" type="number" value="'+(v.vagas||'')+'" placeholder="0" min="0" max="20"></div>'+
  '</div>'+
  '<div class="fg"><label>Descrição (aparece no card)</label><textarea id="vf-desc" style="width:100%;height:80px;border:1px solid #e5e7eb;border-radius:8px;padding:8px;font-size:13px;resize:none" placeholder="Descreva os diferenciais do imóvel...">'+(v.descricao||'')+'</textarea></div>'+
  '<div class="fg">'+
    '<label>Links de fotos (até 5 — cole links do iList, Drive, ZAP etc.)</label>'+
    fotos.slice(0,5).map(function(f,i){
      return '<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">'+
        '<span style="font-size:11px;color:#6b7280;min-width:16px">'+(i+1)+'.</span>'+
        '<input id="vf-foto'+i+'" value="'+(f||'')+'" placeholder="https://..." style="flex:1;border:1px solid #e5e7eb;border-radius:6px;padding:7px 10px;font-size:12px">'+
        (f?'<a href="'+f+'" target="_blank" style="font-size:18px;text-decoration:none">👁️</a>':'<span style="font-size:18px">📷</span>')+
      '</div>';
    }).join('')+
  '</div>'+
  '<div class="fg"><label>Corretor responsável</label><select id="vf-cor">'+corrSel(v.corretor)+'</select></div>'+
  '<div class="fg"><label>Link do anúncio (iList, ZAP, RE/MAX — aparece no QR Code)</label><input id="vf-link" value="'+(v.linkOrigem||'')+'" placeholder="https://www.ilist.com.br/imovel/..."></div>';
}

function vitSalvarForm(idx){
  var titulo = (document.getElementById('vf-titulo')||{}).value||'';
  if(!titulo.trim()){ alert('Informe o título do imóvel.'); return; }
  var fotos = [];
  for(var i=0;i<5;i++){
    var f = (document.getElementById('vf-foto'+i)||{}).value||'';
    if(f.trim()) fotos.push(f.trim());
  }
  var obj = {
    id: idx>=0 ? vitD[idx].id : Date.now(),
    op: document.getElementById('vf-op').value,
    tipo: document.getElementById('vf-tipo').value,
    titulo: titulo,
    bairro: (document.getElementById('vf-bairro')||{}).value||'',
    end: (document.getElementById('vf-end')||{}).value||'',
    valor: parseFloat(document.getElementById('vf-valor').value)||0,
    area: parseInt(document.getElementById('vf-area').value)||0,
    quartos: parseInt(document.getElementById('vf-quartos').value)||0,
    banheiros: parseInt(document.getElementById('vf-banheiros').value)||0,
    vagas: parseInt(document.getElementById('vf-vagas').value)||0,
    descricao: (document.getElementById('vf-desc')||{}).value||'',
    fotos: fotos,
    corretor: (document.getElementById('vf-cor')||{}).value||'',
    linkOrigem: (document.getElementById('vf-link')||{}).value||''
  };
  if(idx>=0) vitD[idx]=obj; else vitD.unshift(obj);
  cM(); salvarTudo(); pVitrine();
}

function nVitrine(){
  oM('+ Novo Imóvel na Vitrine', vitFormHtml(), function(){ vitSalvarForm(-1); }, 'Publicar', true);
}

function eVitrine(idx){
  oM('Editar Imóvel — '+(vitD[idx].titulo||''), vitFormHtml(vitD[idx]), function(){ vitSalvarForm(idx); }, 'Salvar', true);
}

function delVitrine(idx){
  excluirComSenha(
    'Vitrine — '+(vitD[idx].titulo||''),
    'Remover <b>'+(vitD[idx].titulo||'')+'</b> da vitrine?',
    function(){ vitD.splice(idx,1); salvarTudo(); pVitrine(); }
  );
}

// ===== MARKETING — Catálogo Canva =====
var _mktCat = 'Todos';
var _mktD = []; // templates cadastrados pelo admin

var _mktCats = ['Todos','Imóveis Venda','Imóveis Locação','Institucional','Recrutamento','MCMV','Redes Sociais'];

var _mktExemplos = [
  {id:'t1', cat:'Imóveis Venda',   nome:'Post Oportunidade Imperdível', tam:'Feed 1:1',  desc:'Banner vermelho com foto, título e dados do corretor', canva:'', thumb:'post-imovel'},
  {id:'t2', cat:'Imóveis Venda',   nome:'Post Venda — Rodapé Azul',     tam:'Feed 4:5',  desc:'Foto grande + rodapé azul com operação e preço',       canva:'', thumb:'post-venda'},
  {id:'t3', cat:'Imóveis Venda',   nome:'Post Grade 4 Fotos',           tam:'Feed 4:5',  desc:'Grade 2×2 com detalhes do imóvel',                     canva:'', thumb:'post-4fotos'},
  {id:'t4', cat:'Imóveis Locação', nome:'Post Novidade!',               tam:'Feed 4:5',  desc:'Fundo azul hexagonal com foto e corretor',             canva:'', thumb:'post-novidade'},
  {id:'t5', cat:'Imóveis Locação', nome:'Story 3 Fotos',                tam:'Story 9:16',desc:'Fundo azul + grade de fotos + frase de impacto',       canva:'', thumb:'story-3fotos'},
  {id:'t6', cat:'Institucional',   nome:'Post Elegância & Luxo',        tam:'Feed 1:1',  desc:'Foto imóvel com banner translúcido',                   canva:'', thumb:'post-luxo'},
  {id:'t7', cat:'Institucional',   nome:'A RE/MAX está pronta',         tam:'Story 9:16',desc:'Foto família + texto institucional',                   canva:'', thumb:'post-remax'},
  {id:'t8', cat:'Institucional',   nome:'Crachá / Credencial',          tam:'Vertical',  desc:'Crachá editável com foto, nome, CRECI e ano',         canva:'', thumb:'crecha'},
  {id:'t9', cat:'Recrutamento',    nome:'Post Recrutamento Mulheres',   tam:'Feed 1:1',  desc:'Art de captação focada em mulheres em transição',      canva:'', thumb:'post-remax'},
];

function mktThumbHtml(thumb){
  var thumbs = {
    'post-imovel':  'linear-gradient(135deg,#4a7c9f,#2a5c8f)',
    'post-venda':   'linear-gradient(135deg,#0f1a35,#003DA5)',
    'post-novidade':'linear-gradient(135deg,#003DA5,#0055cc)',
    'post-4fotos':  'linear-gradient(135deg,#1a3a5c,#0f1a35)',
    'story-3fotos': 'linear-gradient(135deg,#0f1a35,#1a2a4a)',
    'post-luxo':    'linear-gradient(135deg,#4a7c9f,#6a9cbf)',
    'post-remax':   'linear-gradient(135deg,#333,#555)',
    'crecha':       'linear-gradient(135deg,#0f1a35,#003DA5)',
  };
  var icons = {'post-imovel':'🏠','post-venda':'🔑','post-novidade':'✨','post-4fotos':'📸','story-3fotos':'📱','post-luxo':'💎','post-remax':'👨‍👩‍👧','crecha':'🪪'};
  return thumbs[thumb]||'linear-gradient(135deg,#374151,#1f2937)';
}

window.mktAbrirCanva=function(idx){var todos=_mktExemplos.concat(_mktD);var t=todos[idx];if(t&&t.canva)window.open(t.canva,"_blank");else alert("Link do Canva não configurado.");};function pMkt(){
  var isAdm = isAdmin();
  document.getElementById('pa').innerHTML = isAdm
    ? '<button class="btn btn-red" onclick="nMktTemplate()">+ Adicionar Template</button>'
    : '';

  var todos = _mktExemplos.concat(_mktD);
  var lista = todos.filter(function(t){ return _mktCat==="Todos"||t.cat===_mktCat; });

  var filtros = '<div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:20px;overflow-x:auto;padding-bottom:4px">'+
    _mktCats.map(function(c){
      var a=_mktCat===c;
      return '<button onclick="mktSetCat(\''+c+'\')" style="padding:5px 14px;border-radius:20px;border:1.5px solid '+(a?'#D42028':'#d1d5db')+';background:'+(a?'#D42028':'#fff')+';color:'+(a?'#fff':'#374151')+';font-size:11px;font-weight:700;cursor:pointer">'+c+'</button>';
    }).join('')+
  '</div>';

  var grid = '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:16px">';

  if(!lista.length){
    grid += '<div style="grid-column:1/-1;text-align:center;padding:60px 20px;color:#9ca3af">'+
      '<div style="font-size:48px;margin-bottom:12px">🎨</div>'+
      '<div style="font-size:16px;font-weight:600">Nenhum template nesta categoria</div>'+
      (isAdm?'<div style="font-size:13px;margin-top:6px">Clique em "+ Adicionar Template" para cadastrar</div>':'')+
    '</div>';
  }

  lista.forEach(function(t,idx){
    var temCanva = !!t.canva;
    var isCustom = !!t._custom;
    var bg = mktThumbHtml(t.thumb||'post-imovel');
    var icons = {'Imóveis Venda':'🔑','Imóveis Locação':'🏡','Institucional':'🏢','Recrutamento':'👥','MCMV':'🏗️','Redes Sociais':'📱'};
    var catIcon = icons[t.cat]||'🎨';
    var tamCor = t.tam&&t.tam.includes('Story')?'#7c3aed':t.tam&&t.tam.includes('Vertical')?'#059669':'#003DA5';

    grid += '<div style="background:#fff;border-radius:16px;border:1px solid #e5e7eb;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.06);transition:all .2s">'+
      // Miniatura
      '<div style="height:150px;background:'+bg+';position:relative;display:flex;align-items:center;justify-content:center">'+
        '<div style="text-align:center">'+
          '<div style="font-size:36px;margin-bottom:6px">'+(t.thumb?({'post-imovel':'🏠','post-venda':'🔑','post-novidade':'✨','post-4fotos':'📸','story-3fotos':'📱','post-luxo':'💎','post-remax':'👨‍👩‍👧','crecha':'🪪'})[t.thumb]||'🎨':'🎨')+'</div>'+
          '<div style="font-size:9px;color:rgba(255,255,255,.7);font-weight:600;letter-spacing:1px">'+t.tam+'</div>'+
        '</div>'+
        // Badge canva
        (temCanva
          ? '<div style="position:absolute;top:10px;right:10px;background:#00C4CC;color:#fff;font-size:9px;font-weight:800;padding:3px 8px;border-radius:20px">✓ CANVA</div>'
          : (isAdm?'<div style="position:absolute;top:10px;right:10px;background:rgba(0,0,0,.4);color:#fff;font-size:9px;padding:3px 8px;border-radius:20px">Sem link</div>':'')+
        '')+
        // delete button removed
      '</div>'+
      // Info
      '<div style="padding:14px">'+
        '<div style="display:flex;align-items:flex-start;gap:8px;margin-bottom:6px">'+
          '<span style="font-size:16px">'+catIcon+'</span>'+
          '<div>'+
            '<div style="font-weight:700;font-size:13px;color:#111827;line-height:1.3">'+t.nome+'</div>'+
            '<div style="font-size:10px;color:#6b7280;margin-top:2px">'+t.cat+'</div>'+
          '</div>'+
        '</div>'+
        '<div style="font-size:11px;color:#9ca3af;margin-bottom:12px;line-height:1.4">'+t.desc+'</div>'+
        '<div style="display:flex;gap:6px;align-items:center">'+
          '<span style="background:'+tamCor+'22;color:'+tamCor+';padding:3px 8px;border-radius:20px;font-size:9px;font-weight:700;flex-shrink:0">'+t.tam+'</span>'+
          (temCanva
            ? '<button onclick="mktAbrirCanva(idx)" style="flex:1;padding:8px;background:#00C4CC;color:#fff;border:none;border-radius:8px;font-size:11px;font-weight:700;cursor:pointer">✏️ Editar no Canva</button>'
            : '<button onclick="mktSemLink()" style="flex:1;padding:8px;background:#f3f4f6;color:#9ca3af;border:1px dashed #d1d5db;border-radius:8px;font-size:11px;cursor:pointer">'+(isAdm?'🔗 Adicionar link':'Em breve')+'</button>'
          )+
          (isAdm&&isCustom?'<button onclick="eMktTemplate(idx)" style="padding:8px;background:#eff6ff;color:#003DA5;border:1px solid #bfdbfe;border-radius:8px;font-size:11px;cursor:pointer">✏️</button>':'')+
        '</div>'+
      '</div>'+
    '</div>';
  });
  grid += '</div>';

  // Banner instruções para admin
  var banner = isAdm ? '<div style="background:linear-gradient(135deg,#eff6ff,#dbeafe);border-radius:12px;padding:16px;margin-bottom:20px;border:1px solid #bfdbfe;display:flex;gap:14px;align-items:flex-start">'+
    '<div style="font-size:24px">💡</div>'+
    '<div>'+
      '<div style="font-weight:700;color:#1d4ed8;margin-bottom:4px">Como adicionar seus templates do Canva</div>'+
      '<div style="font-size:12px;color:#3b82f6;line-height:1.6">'+
        '1. Abra o template no Canva → clique em <b>Compartilhar</b><br>'+
        '2. Clique em <b>Mais</b> → <b>Template</b> → copie o link<br>'+
        '3. Clique em <b>"+ Adicionar Template"</b> e cole o link<br>'+
        '4. Os corretores clicam e abrem direto no Canva para editar'+
      '</div>'+
    '</div>'+
  '</div>' : '';

  document.getElementById('pc').innerHTML =
    '<div class="card"><div class="chd"><h3>🎨 Templates de Marketing</h3></div>'+
    '<div style="padding:16px">'+banner+filtros+grid+'</div></div>';
}

window.mktSetCat = function(c){ _mktCat=c; pMkt(); };

window.mktSemLink = function(){
  alert('Link do Canva não configurado ainda.\nFale com a administração.');
};

function nMktTemplate(){
  oM('+ Novo Template',
    '<div class="fg2">'+
      '<div class="fg"><label>Nome do Template</label><input id="mt-nome" placeholder="Ex: Post Imóvel Venda"></div>'+
      '<div class="fg"><label>Categoria</label><select id="mt-cat">'+_mktCats.filter(function(c){return c!=="Todos";}).map(function(c){return '<option>'+c+'</option>';}).join('')+'</select></div>'+
    '</div>'+
    '<div class="fg2">'+
      '<div class="fg"><label>Tamanho</label><select id="mt-tam"><option>Feed 1:1</option><option>Feed 4:5</option><option>Story 9:16</option><option>Vertical</option><option>Horizontal</option></select></div>'+
      '<div class="fg"><label>Emoji ícone</label><input id="mt-icon" value="🎨" style="font-size:20px"></div>'+
    '</div>'+
    '<div class="fg"><label>Descrição curta</label><input id="mt-desc" placeholder="Para que serve este template?"></div>'+
    '<div class="fg"><label>Link do Canva (Template)</label><input id="mt-canva" placeholder="https://www.canva.com/design/..."></div>',
    function(){
      var nome = (document.getElementById('mt-nome')||{}).value||'';
      if(!nome.trim()){alert('Informe o nome.');return;}
      _mktD.push({
        id:'c'+Date.now(),
        _custom:true,
        nome:nome,
        cat:document.getElementById('mt-cat').value,
        tam:document.getElementById('mt-tam').value,
        thumb:document.getElementById('mt-icon').value,
        desc:document.getElementById('mt-desc').value||'',
        canva:document.getElementById('mt-canva').value||''
      });
      salvarTudo(); cM(); pMkt();
    },'Salvar');
}

function eMktTemplate(id){
  var t = _mktD.find(function(x){return x.id===id;});
  if(!t) return;
  oM('Editar Template — '+t.nome,
    '<div class="fg2">'+
      '<div class="fg"><label>Nome</label><input id="mt-nome" value="'+t.nome+'"></div>'+
      '<div class="fg"><label>Categoria</label><select id="mt-cat">'+_mktCats.filter(function(c){return c!=="Todos";}).map(function(c){return '<option'+(c===t.cat?" selected":"")+'>'+c+'</option>';}).join('')+'</select></div>'+
    '</div>'+
    '<div class="fg"><label>Link do Canva</label><input id="mt-canva" value="'+(t.canva||"")+'"></div>'+
    '<div class="fg"><label>Descrição</label><input id="mt-desc" value="'+(t.desc||"")+'"></div>',
    function(){
      t.nome=document.getElementById('mt-nome').value||t.nome;
      t.cat=document.getElementById('mt-cat').value;
      t.canva=document.getElementById('mt-canva').value||'';
      t.desc=document.getElementById('mt-desc').value||'';
      salvarTudo(); cM(); pMkt();
    },'Salvar');
}

function delMktTemplate(id){
  var i=_mktD.findIndex(function(x){return x.id===id;});
  if(i>=0){ _mktD.splice(i,1); salvarTudo(); pMkt(); }
}


function pIV(){
  document.getElementById('pa').innerHTML='<button class="btn btn-red" onclick="nIV()">+ Novo Imovel</button>';
  var sf=ivD.filter(function(i){return !i.fotos;}).length;
  var sc=ivD.filter(function(i){return !i.contrato;}).length;
  var cg=ivD.filter(function(i){return i.gestao;}).length;
  var r='';
  ivD.forEach(function(iv,i){
    var fl=(iv.gestao?'gestao ':'sem-gestao ')+(!iv.fotos?'sem-foto ':'')+(!iv.contrato?'sem-contrato ':'')+(!iv.ilist?'sem-ilist ':'')+(!iv.fotos&&!iv.contrato?'critico ':'');
    r+='<tr data-fl="'+fl+'" data-cor="'+iv.corretor+'" data-sr="'+(iv.prop+iv.end+iv.tipo).toLowerCase()+'">';
    r+='<td>'+sem(iv)+'</td><td style="font-weight:700;color:var(--navy)">'+iv.id+'</td>';
    r+='<td><span class="badge bgr" style="font-size:9px">'+iv.tipo+'</span></td>';
    r+='<td style="font-weight:600;max-width:80px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">'+iv.prop+'</td>';
    r+='<td style="max-width:120px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:11px">'+iv.end+'</td>';
    r+='<td style="white-space:nowrap;font-size:11px">'+(iv.valor?fmt(iv.valor):'ACM')+'</td>';
    r+='<td style="font-size:10.5px">'+iv.corretor+'</td>';
    r+='<td><span class="badge '+(iv.vva==='VENDA'?'bb':'by')+'" style="font-size:9px">'+iv.vva+'</span></td>';
    r+='<td>'+(iv.contrato?'<span class="badge bg">OK</span>':'<span class="badge br">N</span>')+'</td>';
    r+='<td>'+(iv.fotos?'<span class="badge bg">OK</span>':'<span class="badge br">N</span>')+'</td>';
    r+='<td>'+(iv.ilist?'<span class="badge bg">OK</span>':'<span class="badge br">N</span>')+'</td>';
    r+='<td>'+(iv.gestao?'<span class="badge bt">OK</span>':'<span class="badge bgr">-</span>')+'</td>';
    r+='<td style="max-width:90px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:10px;color:var(--lm)">'+iv.sit+'</td>';
    r+='<td style="display:flex;gap:3px;flex-wrap:wrap"><button class="btn btn-sm" onclick="eIV('+i+')">Editar</button><button class="btn btn-sm" style="background:#E1306C;color:#fff;border-color:#E1306C" onclick="gerarPost('+i+')">📸 Post</button><button class="btn btn-sm" style="background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#fff;border:none" onclick="gerarLegendaIA('+i+')">🤖 IA</button><button class="btn btn-sm" style="background:#059669;color:#fff;border-color:#059669" onclick="fichaImovel('+i+')">📄 Ficha</button><button class="btn btn-sm" style="background:#e8f5e9;color:#1b5e20;border:1px solid #a5d6a7;font-size:10px" onclick="pubPortais('+i+')">🌐 Portais</button><button class="btn btn-sm btn-gray" onclick="if(confirm(\'Excluir imovel #'+iv.id+'?\')){ivD.splice('+i+',1);pIV();}">Del</button></td>';
    r+='</tr>';
  });
  var cors='<option value="">Todos</option>'; var cl=[];
  ivD.forEach(function(i){if(i.corretor&&cl.indexOf(i.corretor)<0)cl.push(i.corretor);});
  cl.forEach(function(c){cors+='<option>'+c+'</option>';});
  document.getElementById('pc').innerHTML=
    '<div class="g4"><div class="kc blue"><div class="kc-l">Total</div><div class="kc-v">'+ivD.length+'</div></div>'+
    '<div class="kc green"><div class="kc-l">Com Gestao</div><div class="kc-v">'+cg+'</div></div>'+
    '<div class="kc red"><div class="kc-l">Sem Fotos</div><div class="kc-v">'+sf+'</div></div>'+
    '<div class="kc warn"><div class="kc-l">Sem Contrato</div><div class="kc-v">'+sc+'</div></div></div>'+
    '<div class="card"><div class="fbar"><input class="sinp" placeholder="Buscar..." id="iv-si">'+
    '<div class="chip on" onclick="fIV(this,\'todos\')">Todos</div>'+
    '<div class="chip" onclick="fIV(this,\'gestao\')">Com Gestao</div>'+
    '<div class="chip" onclick="fIV(this,\'sem-foto\')">Sem Foto</div>'+
    '<div class="chip" onclick="fIV(this,\'sem-contrato\')">Sem Contrato</div>'+
    '<div class="chip" onclick="fIV(this,\'sem-ilist\')">Fora iList</div>'+
    '<div class="chip" onclick="fIV(this,\'critico\')">Criticos</div>'+
    '<select class="chip" style="border:1px solid var(--lb)" onchange="fIVCor(this.value)">'+cors+'</select></div>'+
    '<div class="tw"><table><thead><tr><th></th><th>ID</th><th>Tipo</th><th>Prop.</th><th>Endereço</th><th>Valor</th><th>Corretor</th><th>V/A</th><th>CT</th><th>Foto</th><th>iList</th><th>Gestao</th><th>Situacao</th><th>Ações</th></tr></thead><tbody id="iv-b">'+r+'</tbody></table></div></div>';
  document.getElementById('iv-si').oninput=function(){var q=this.value.toLowerCase();document.querySelectorAll('#iv-b tr').forEach(function(r){r.style.display=r.dataset.sr.indexOf(q)>=0?'':'none';});};
}
function fIV(el,val){el.parentElement.querySelectorAll('.chip:not(select)').forEach(function(c){c.classList.remove('on');});el.classList.add('on');document.querySelectorAll('#iv-b tr').forEach(function(r){r.style.display=(val==='todos'||(' '+r.dataset.fl+' ').indexOf(' '+val+' ')>=0)?'':'none';});}
function fIVCor(c){document.querySelectorAll('#iv-b tr').forEach(function(r){r.style.display=(!c||r.dataset.cor===c)?'':'none';});}
async function processarFotosUpload(i, input){
  var iv = ivD[i];
  var statusEl = document.getElementById('foto-status-'+iv.id);
  var previewEl = document.getElementById('foto-preview-'+iv.id);
  if(!input.files || !input.files.length) return;
  
  if(statusEl) statusEl.innerHTML = '<span style="color:#d97706">⏳ Fazendo upload de '+input.files.length+' foto(s)...</span>';
  
  if(!iv.foto_urls) iv.foto_urls = iv.foto_url ? [iv.foto_url] : [];
  
  try{
    var novasUrls = await uploadMultiplosFotos(input.files, iv.id);
    iv.foto_urls = iv.foto_urls.concat(novasUrls);
    iv.foto_url = iv.foto_urls[0] || '';
    iv.fotos = iv.foto_urls.length > 0;
    salvarTudo();
    if(previewEl) previewEl.innerHTML = mostrarFotosImovel(iv);
    if(statusEl) statusEl.innerHTML = '<span style="color:#059669">✅ '+novasUrls.length+' foto(s) enviada(s) com sucesso!</span>';
  }catch(e){
    if(statusEl) statusEl.innerHTML = '<span style="color:#dc2626">❌ Erro: '+e.message+'</span>';
  }
}


// ===== SUPABASE STORAGE — UPLOAD DE FOTOS =====
async function uploadFotoImovel(file, ivId){
  var sb = getSB();
  if(!sb) throw new Error('Sem conexão');
  // Create bucket if needed (silent fail if exists)
  try{ await sb.storage.createBucket('imoveis', {public: true}); }catch(e){}
  var ext = file.name.split('.').pop().toLowerCase();
  var path = 'imovel-' + ivId + '-' + Date.now() + '.' + ext;
  var {data, error} = await sb.storage.from('imoveis').upload(path, file, {
    cacheControl: '3600', upsert: true
  });
  if(error) throw new Error(error.message);
  var {data: urlData} = sb.storage.from('imoveis').getPublicUrl(path);
  return urlData.publicUrl;
}

async function uploadMultiplosFotos(files, ivId){
  var urls = [];
  for(var i=0; i<files.length; i++){
    try{
      var url = await uploadFotoImovel(files[i], ivId);
      urls.push(url);
    }catch(e){ console.log('Erro upload foto:', e.message); }
  }
  return urls;
}

function mostrarFotosImovel(iv){
  var fotos = iv.foto_urls || (iv.foto_url ? [iv.foto_url] : []);
  if(!fotos.length) return '<div style="background:#f1f5f9;border-radius:8px;height:120px;display:flex;align-items:center;justify-content:center;color:var(--lm);font-size:12px">Sem fotos cadastradas</div>';
  var ivId = iv.id;
  return '<div style="display:flex;gap:8px;flex-wrap:wrap">' +
    fotos.map(function(url, idx){
      return '<div style="position:relative">' +
        '<img src="'+url+'" style="width:100px;height:80px;object-fit:cover;border-radius:8px;border:1px solid var(--lb)">' +
        '<div style="position:absolute;top:2px;right:2px;background:rgba(0,0,0,.6);border-radius:50%;width:18px;height:18px;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:10px;color:#fff" data-id="'+ivId+'" data-idx="'+idx+'" onclick="removerFoto(this.dataset.id,this.dataset.idx)">x</div>' +
      '</div>';
    }).join('') +
  '</div>';
}

function removerFoto(ivId, idx){
  ivId=parseInt(ivId)||ivId; idx=parseInt(idx);
  var iv = ivD.find(function(i){ return i.id===ivId||String(i.id)===String(ivId); });
  if(!iv) return;
  if(!iv.foto_urls) iv.foto_urls = iv.foto_url ? [iv.foto_url] : [];
  iv.foto_urls.splice(idx, 1);
  iv.foto_url = iv.foto_urls[0] || '';
  salvarTudo();
  // Refresh preview if modal open
  var prev = document.getElementById('foto-preview-'+ivId);
  if(prev) prev.innerHTML = mostrarFotosImovel(iv);
}


function eIV(i){
  var iv=ivD[i];
  function ck(f,l){return '<label style="display:flex;align-items:center;gap:6px;font-size:12px;cursor:pointer;padding:4px 8px;background:#fff;border:1px solid #e2e8f0;border-radius:6px"><input type="checkbox" id="ei-'+f+'"'+(iv[f]?' checked':'')+' onchange="ivD['+i+'].'+f+'=this.checked"> '+l+'</label>';}
  oM('Editar Imovel #'+iv.id,
    '<div class="fg2"><div class="fg"><label>Proprietario</label><input id="ei-p" value="'+iv.prop+'"></div><div class="fg"><label>Tel</label><input id="ei-t" value="'+(iv.tel||'')+'"></div></div>'+
    '<div class="fg"><label>Endereco</label><input id="ei-e" value="'+iv.end+'"></div>'+
    '<div class="fg3"><div class="fg"><label>Tipo</label><select id="ei-tp"><option>CASA</option><option>APARTAMENTO</option><option>LOTE</option><option>CHACARA</option><option>FAZENDA</option><option>CHALE</option><option>FLAT</option><option>FLAT HOTEL</option><option>TERRENO</option><option>CONDOMINIO</option></select></div>'+
    '<div class="fg"><label>Valor R$</label><input id="ei-v" type="number" value="'+iv.valor+'"></div>'+
    '<div class="fg"><label>Corretor</label><select id="ei-c">'+corrSel(iv.corretor)+'</select></div></div>'+
    '<div class="fg"><label>V/A</label><select id="ei-va"><option>VENDA</option><option>VENDA E ALUGUEL</option><option>VENDA AGIO</option></select></div>'+
    '<div style="background:#f9fafb;border-radius:8px;padding:12px;margin-bottom:10px">'+
    '<div style="font-size:11px;font-weight:700;color:var(--lm);margin-bottom:8px;text-transform:uppercase">Documentação e Divulgação</div>'+
    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px">'+
    ck('contrato','✅ Contrato assinado')+ck('fotos','📷 Fotos feitas')+
    ck('video','🎥 Vídeo')+ck('acm','📊 ACM feito')+
    ck('acm_apres','📊 ACM apresentado')+ck('ilist','🏠 No iList')+
    ck('site','🌐 Site RE/MAX')+ck('zap','🔍 ZAP Imóveis')+
    ck('olx','🔍 OLX')+ck('ig','📸 Instagram')+
    ck('trafego','💰 Tráfego pago')+ck('gestao','⭐ Gestão RE/MAX')+
    '</div></div>'+
    '<div class="fg"><label>Fotos do Imóvel</label>'+
    '<div id="foto-preview-'+iv.id+'" style="margin-bottom:8px">'+mostrarFotosImovel(iv)+'</div>'+
    '<input type="file" id="ei-fotos" accept="image/*" multiple style="font-size:11px;width:100%" onchange="processarFotosUpload('+i+', this)">'+
    '<div id="foto-status-'+iv.id+'" style="font-size:11px;color:var(--lm);margin-top:4px">Selecione até 10 fotos (JPG, PNG)</div></div>'+
    '<div class="fg3">'+
      '<div class="fg"><label>Quartos</label><input id="ei-q" type="number" min="0" value="'+(iv.quartos||0)+'"></div>'+
      '<div class="fg"><label>Banheiros</label><input id="ei-bh" type="number" min="0" value="'+(iv.banheiros||0)+'"></div>'+
      '<div class="fg"><label>Vagas</label><input id="ei-vg" type="number" min="0" value="'+(iv.vagas||0)+'"></div>'+
      '<div class="fg"><label>Área m²</label><input id="ei-ar" type="number" min="0" value="'+(iv.area||0)+'"></div>'+
    '</div>'+
    '<div class="fg"><label>Situacao / Descricao</label>'+
    '<textarea id="ei-s" rows="4">'+iv.sit+'</textarea>'+
    '<button type="button" class="btn btn-sm" style="background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#fff;border:none;margin-top:6px;width:100%" onclick="gerarDescricaoIA('+i+')">🤖 Gerar Descrição com IA</button></div>',
    function(){ivD[i].prop=document.getElementById('ei-p').value;ivD[i].tel=document.getElementById('ei-t').value;ivD[i].end=document.getElementById('ei-e').value;ivD[i].tipo=document.getElementById('ei-tp').value;ivD[i].valor=parseFloat(document.getElementById('ei-v').value)||0;ivD[i].corretor=document.getElementById('ei-c').value;ivD[i].vva=document.getElementById('ei-va').value;ivD[i].sit=document.getElementById('ei-s').value;ivD[i].quartos=parseInt(document.getElementById('ei-q').value)||0;ivD[i].banheiros=parseInt(document.getElementById('ei-bh').value)||0;ivD[i].vagas=parseInt(document.getElementById('ei-vg').value)||0;ivD[i].area=parseInt(document.getElementById('ei-ar').value)||0;cM();salvarTudo();pIV();});
  setTimeout(function(){document.getElementById('ei-tp').value=iv.tipo;document.getElementById('ei-va').value=iv.vva;},50);
}
function nIV(){
  oM('Novo Imovel',
    '<div class="fg3"><div class="fg"><label>Tipo</label><select id="ni-t"><option>CASA</option><option>APARTAMENTO</option><option>LOTE</option><option>CHACARA</option><option>FAZENDA</option><option>CHALE</option><option>FLAT</option><option>TERRENO</option></select></div><div class="fg"><label>V/A</label><select id="ni-va"><option>VENDA</option><option>VENDA E ALUGUEL</option><option>VENDA AGIO</option></select></div><div class="fg"><label>Corretor</label><select id="ni-c">'+corrSel()+'</select></div></div>'+
    '<div class="fg2"><div class="fg"><label>Prop.</label><input id="ni-p"></div><div class="fg"><label>Tel</label><input id="ni-tel"></div></div>'+
    '<div class="fg"><label>Endereco</label><input id="ni-e"></div>'+
    '<div class="fg2"><div class="fg"><label>Valor R$</label><input id="ni-v" type="number"></div><div class="fg"><label>Situacao inicial</label><input id="ni-s"></div></div>',
    function(){ivD.push({id:ivD.length+1,tipo:document.getElementById('ni-t').value,prop:document.getElementById('ni-p').value||'-',tel:document.getElementById('ni-tel').value||'',end:document.getElementById('ni-e').value||'-',valor:parseFloat(document.getElementById('ni-v').value)||0,vva:document.getElementById('ni-va').value,corretor:document.getElementById('ni-c').value,contrato:false,fotos:false,video:false,acm:false,acm_apres:false,ilist:false,site:false,zap:false,olx:false,ig:false,fb:false,trafego:false,gestao:false,sit:document.getElementById('ni-s').value||'Novo'});cM();salvarTudo();pIV();});
}

// ===== PROPRIETARIOS =====
function pProp(){
  var tot=ctD.reduce(function(s,c){return s+c.valor;},0);
  var ps=[]; ctD.forEach(function(c){if(ps.indexOf(c.prop)<0)ps.push(c.prop);});
  var r=''; ps.forEach(function(p){
    var cts=ctD.filter(function(c){return c.prop===p;}), t=cts.reduce(function(s,c){return s+c.valor;},0);
    var inad=cts.filter(function(c){return(c.rs||[])[4]==='N';}).length;
    r+='<tr><td style="font-weight:700">'+p+'</td><td>'+cts.length+'</td><td>'+fmt(t)+'</td>'+
    '<td style="color:var(--ok);font-weight:600">'+fmt(t*.1)+'</td>'+
    '<td style="font-weight:700;color:var(--navy)">'+fmt(t*.9)+'</td>'+
    '<td>'+(inad>0?'<span class="badge br">'+inad+' em atraso</span>':'<span class="badge bg">Em dia</span>')+'</td></tr>';
  });
  r+='<tr class="sum-row"><td>TOTAL</td><td>'+ps.length+'</td><td>'+fmt(tot)+'</td><td style="color:var(--ok)">'+fmt(tot*.1)+'</td><td style="color:var(--navy)">'+fmt(tot*.9)+'</td><td></td></tr>';
  document.getElementById('pc').innerHTML=
    '<div class="g3"><div class="kc green"><div class="kc-l">Total aluguel/mes</div><div class="kc-v">'+fmt(tot)+'</div></div>'+
    '<div class="kc blue"><div class="kc-l">ADM 10%</div><div class="kc-v">'+fmt(tot*.1)+'</div></div>'+
    '<div class="kc gold"><div class="kc-l">Repasse liquido</div><div class="kc-v">'+fmt(tot*.9)+'</div></div></div>'+
    '<div class="card"><div class="tw"><table><thead><tr><th>Proprietário</th><th>Contratos</th><th>Aluguel total</th><th>ADM 10%</th><th>Repasse liquido</th><th>Status</th></tr></thead><tbody>'+r+'</tbody></table></div></div>';
}

// ===== FINANCEIRO =====
// ===== COMISSÕES DOS CORRETORES =====
var COMISSOES = []; // {corretor, tipo, valor, pct, comissao, dt, obs, status}

function calcComissao(tipo, valor, pct){
  // Tabela padrão RE/MAX
  var pcts = {'VENDA':0.30, 'LOCACAO':0.50, 'CAPTACAO':0.30, 'RENOVACAO':0.30};
  var p = pct || pcts[tipo] || 0.30;
  return valor * p;
}

function pDRE(){
  var hoje = new Date();
  var mesAtual = hoje.getMonth();
  var anoAtual = hoje.getFullYear();
  // Receitas
  var recLoc = ctD.filter(function(c){return c.status!=='Inativo';}).reduce(function(s,c){return s+c.valor;},0);
  var admLoc = recLoc * 0.10;
  var recebidoMes = ctD.filter(function(c){return c.rs&&c.rs[mesAtual]==='R';}).reduce(function(s,c){return s+c.valor*.1;},0);
  // Despesas
  var despTotal = cpD.reduce(function(s,c){return s+c.val;},0);
  var despPago = cpD.filter(function(c){return c.st==='Pago';}).reduce(function(s,c){return s+c.val;},0);
  var despAVencer = cpD.filter(function(c){return c.st!=='Pago'&&c.st!=='Vencido';}).reduce(function(s,c){return s+c.val;},0);
  var despVencido = cpD.filter(function(c){return c.st==='Vencido';}).reduce(function(s,c){return s+c.val;},0);
  // Comissões
  var comTotal = COMISSOES.reduce(function(s,c){return s+(c.comissao||0);},0);
  var comPago = COMISSOES.filter(function(c){return c.status==='Pago';}).reduce(function(s,c){return s+(c.comissao||0);},0);
  // Resultado
  var resultado = admLoc - despPago - comPago;
  var meses = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
  // Gráfico de receita por mês (baseado nos repasses recebidos)
  var grafico = meses.map(function(m,mi){
    var val = ctD.filter(function(c){return c.rs&&c.rs[mi]==='R';}).reduce(function(s,c){return s+c.valor*.1;},0);
    var pct = admLoc>0?Math.round(val/admLoc*100):0;
    return '<div style="display:flex;align-items:flex-end;flex-direction:column;gap:3px;text-align:center">'
      +'<div style="background:'+(mi===mesAtual?'#003DA5':'#93c5fd')+';width:28px;height:'+Math.max(4,pct)+'px;border-radius:4px 4px 0 0;transition:height .3s"></div>'
      +'<div style="font-size:9px;color:var(--lm)">'+m+'</div>'
      +'</div>';
  }).join('');
  // Comissões por corretor
  var comPorCor = {};
  COMISSOES.forEach(function(c){
    if(!comPorCor[c.corretor]) comPorCor[c.corretor]={total:0,pago:0,count:0};
    comPorCor[c.corretor].total += c.comissao||0;
    if(c.status==='Pago') comPorCor[c.corretor].pago += c.comissao||0;
    comPorCor[c.corretor].count++;
  });
  var comRows = Object.keys(comPorCor).map(function(cor){
    var d = comPorCor[cor];
    return '<tr><td><b>'+cor+'</b></td><td>'+d.count+'</td>'
      +'<td style="font-weight:700;color:var(--ok)">'+fmt(d.total)+'</td>'
      +'<td>'+fmt(d.pago)+'</td>'
      +'<td><span class="badge '+(d.pago>=d.total?'bg':'by')+'">'+Math.round(d.pago/d.total*100||0)+'%</span></td></tr>';
  }).join('') || '<tr><td colspan="5" style="text-align:center;color:var(--lm)">Nenhuma comissão lançada</td></tr>';

  document.getElementById('pa').innerHTML = '<button class="btn btn-primary" onclick="nComissao()">+ Lançar Comissão</button>';
  document.getElementById('pc').innerHTML =
    // KPIs principais
    '<div class="g4" style="margin-bottom:16px">'
    +'<div class="kc green"><div class="kc-l">ADM Locação/mês</div><div class="kc-v">'+fmt(admLoc)+'</div><div class="kc-s">base: '+fmt(recLoc)+'</div></div>'
    +'<div class="kc blue"><div class="kc-l">Recebido no mês</div><div class="kc-v">'+fmt(recebidoMes)+'</div></div>'
    +'<div class="kc red"><div class="kc-l">Despesas pagas</div><div class="kc-v">'+fmt(despPago)+'</div><div class="kc-s" style="color:#ef4444">+'+fmt(despVencido)+' vencido</div></div>'
    +'<div class="kc '+(resultado>=0?'green':'red')+'"><div class="kc-l">Resultado líquido</div><div class="kc-v">'+fmt(resultado)+'</div></div>'
    +'</div>'
    // DRE
    +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:14px">'
    +'<div class="card"><div class="chd"><h3>DRE — '+meses[mesAtual]+'/'+anoAtual+'</h3></div><div class="cbd">'
    +'<table style="width:100%;font-size:13px"><tbody>'
    +'<tr style="background:#f0fdf4"><td><b>Receita Bruta (Aluguéis)</b></td><td style="text-align:right;font-weight:700">'+fmt(recLoc)+'</td></tr>'
    +'<tr><td style="padding-left:16px;color:var(--lm)">(-) Repasse proprietários 90%</td><td style="text-align:right;color:var(--lm)">-'+fmt(recLoc*.9)+'</td></tr>'
    +'<tr style="background:#f0fdf4"><td><b>(=) Receita ADM 10%</b></td><td style="text-align:right;font-weight:700;color:var(--ok)">'+fmt(admLoc)+'</td></tr>'
    +'<tr><td style="height:8px"></td></tr>'
    +'<tr style="background:#fef2f2"><td><b>(-) Despesas Fixas/Variáveis</b></td><td style="text-align:right;font-weight:700;color:#dc2626">-'+fmt(despPago)+'</td></tr>'
    +'<tr style="background:#fef2f2"><td><b>(-) Comissões Pagas</b></td><td style="text-align:right;font-weight:700;color:#dc2626">-'+fmt(comPago)+'</td></tr>'
    +'<tr><td style="height:8px"></td></tr>'
    +'<tr style="background:'+(resultado>=0?'#f0fdf4':'#fef2f2')+'"><td><b>(=) RESULTADO LÍQUIDO</b></td><td style="text-align:right;font-weight:800;font-size:15px;color:'+(resultado>=0?'#166534':'#dc2626')+'">'+fmt(resultado)+'</td></tr>'
    +'<tr><td style="height:8px"></td></tr>'
    +'<tr style="background:#fef9c3"><td style="color:#92400e">A vencer (despesas)</td><td style="text-align:right;color:#92400e">'+fmt(despAVencer)+'</td></tr>'
    +'<tr style="background:#fee2e2"><td style="color:#dc2626">Vencido (despesas)</td><td style="text-align:right;color:#dc2626">'+fmt(despVencido)+'</td></tr>'
    +'</tbody></table></div></div>'
    // Gráfico
    +'<div class="card"><div class="chd"><h3>Receita ADM por mês — '+anoAtual+'</h3></div><div class="cbd">'
    +'<div style="display:flex;align-items:flex-end;gap:4px;height:120px;padding-bottom:4px">'+grafico+'</div>'
    +'</div></div>'
    +'</div>'
    // Comissões
    +'<div class="card"><div class="chd" style="display:flex;justify-content:space-between;align-items:center"><h3>Comissões dos Corretores</h3><span style="font-size:12px;color:var(--lm)">Total: '+fmt(comTotal)+' | Pago: '+fmt(comPago)+'</span></div>'
    +'<div class="tw"><table><thead><tr><th>Corretor</th><th>Negócios</th><th>Total</th><th>Pago</th><th>Status</th></tr></thead><tbody>'+comRows+'</tbody></table></div>'
    +'<div class="chd" style="border-top:1px solid var(--lb);margin-top:0"><h3 style="font-size:13px">Detalhamento</h3></div>'
    +'<div class="tw"><table><thead><tr><th>Corretor</th><th>Tipo</th><th>Valor Negócio</th><th>%</th><th>Comissão</th><th>Data</th><th>Status</th><th>Ações</th></tr></thead><tbody>'
    +COMISSOES.map(function(c,i){
      return '<tr><td>'+c.corretor+'</td><td><span class="badge bb">'+c.tipo+'</span></td>'
        +'<td>'+fmt(c.valor)+'</td><td>'+Math.round(c.pct*100)+'%</td>'
        +'<td style="font-weight:700;color:var(--ok)">'+fmt(c.comissao)+'</td>'
        +'<td>'+c.dt+'</td>'
        +'<td><span class="badge '+(c.status==='Pago'?'bg':'by')+'">'+c.status+'</span></td>'
        +'<td>'+(c.status!=='Pago'?'<button class="btn btn-xs btn-green" onclick="pagarComissao('+i+')">Pagar</button>':'')
        +'</td></tr>';
    }).join('')||'<tr><td colspan="8" style="text-align:center;color:var(--lm);padding:20px">Nenhuma comissão lançada ainda</td></tr>'
    +'</tbody></table></div></div>';
}

function nComissao(){
  var corOpts = COR.map(function(c){return '<option value="'+c.nome+'">'+c.nome+'</option>';}).join('');
  oM('Lançar Comissão',
    '<div class="fg3"><div class="fg"><label>Corretor</label><select id="com-cor">'+corOpts+'</select></div>'
    +'<div class="fg"><label>Tipo</label><select id="com-tipo"><option>VENDA</option><option>LOCACAO</option><option>CAPTACAO</option><option>RENOVACAO</option></select></div></div>'
    +'<div class="fg3"><div class="fg"><label>Valor do Negócio (R$)</label><input type="number" id="com-val" placeholder="0" oninput="calcComissaoPreview()"></div>'
    +'<div class="fg"><label>% Comissão</label><input type="number" id="com-pct" value="30" oninput="calcComissaoPreview()"></div></div>'
    +'<div id="com-preview" style="background:#f0fdf4;border-radius:8px;padding:12px;margin:10px 0;text-align:center;font-size:13px;display:none"></div>'
    +'<div class="fg3"><div class="fg"><label>Data</label><input type="date" id="com-dt" value="'+new Date().toISOString().split('T')[0]+'"></div>'
    +'<div class="fg"><label>Status</label><select id="com-st"><option>A pagar</option><option>Pago</option></select></div></div>'
    +'<div class="fg"><label>Observação</label><input id="com-obs" placeholder="Ex: Venda Rua das Palmeiras 430"></div>',
    function(){
      var val = parseFloat(document.getElementById('com-val').value)||0;
      var pct = parseFloat(document.getElementById('com-pct').value)/100||0.30;
      COMISSOES.push({
        corretor:document.getElementById('com-cor').value,
        tipo:document.getElementById('com-tipo').value,
        valor:val, pct:pct, comissao:val*pct,
        dt:document.getElementById('com-dt').value,
        status:document.getElementById('com-st').value,
        obs:document.getElementById('com-obs').value
      });
      registrarLog('COMISSÃO LANÇADA', document.getElementById('com-cor').value+' — '+fmt(val*pct));
      salvarTudo(); cM(); pDRE();
    });
  setTimeout(calcComissaoPreview, 300);
}

function calcComissaoPreview(){
  var val = parseFloat(document.getElementById('com-val')?document.getElementById('com-val').value:0)||0;
  var pct = parseFloat(document.getElementById('com-pct')?document.getElementById('com-pct').value:30)/100||0.30;
  var prev = document.getElementById('com-preview');
  if(prev&&val>0){
    prev.style.display='block';
    prev.innerHTML='Comissão: <b style="font-size:16px;color:var(--ok)">'+fmt(val*pct)+'</b>';
  }
}

function pagarComissao(i){
  if(!confirm('Marcar comissão de '+fmt(COMISSOES[i].comissao)+' para '+COMISSOES[i].corretor+' como PAGO?')) return;
  COMISSOES[i].status='Pago';
  COMISSOES[i].dtPagamento=new Date().toISOString().split('T')[0];
  registrarLog('COMISSÃO PAGA', COMISSOES[i].corretor+' — '+fmt(COMISSOES[i].comissao));
  salvarTudo(); pDRE();
}

function pFD(){
  var ta=ctD.reduce(function(s,c){return s+c.valor;},0),adm=ta*.1,tpag=cpD.reduce(function(s,c){return s+c.val;},0),sal=adm-tpag;
  var rec=cpD.filter(function(c){return c.st==='Pago';}).reduce(function(s,c){return s+c.val;},0);
  var vencRec=ctD.filter(function(c){return c.rs&&c.rs[new Date().getMonth()]==='N';});
  var inadVal=vencRec.reduce(function(s,c){return s+c.valor;},0);
  document.getElementById('pc').innerHTML=
    '<div class="g4">'+
    '<div class="kc green"><div class="kc-l">Receita Locacao/mes</div><div class="kc-v">'+fmt(ta)+'</div><div class="kc-s">ADM '+fmt(adm)+'</div></div>'+
    '<div class="kc blue"><div class="kc-l">A Pagar (pendente)</div><div class="kc-v">'+fmt(tpag-rec)+'</div></div>'+
    '<div class="kc red"><div class="kc-l">Inadimplencia Maio</div><div class="kc-v">'+fmt(inadVal)+'</div><div class="kc-s">'+vencRec.length+' titulos</div></div>'+
    '<div class="kc '+(sal>=0?'gold':'red')+'"><div class="kc-l">Saldo Estimado</div><div class="kc-v">'+fmt(sal)+'</div></div></div>'+
    (inadVal>0?'<div class="card" style="border-left:4px solid var(--red)"><div class="chd"><h3 style="color:var(--red)">Alertas de Inadimplência — '+mesAno()+'</h3></div><div class="cbd">'+
    vencRec.map(function(c){return '<div class="alt alt-r"><b>NAO RECEBIDO:</b> &nbsp;'+c.prop+' / '+c.inq+' &nbsp; <b>'+fmt(c.valor)+'</b></div>';}).join('')+
    '</div></div>':'')+
    '<div class="g2">'+
    '<div class="card"><div class="chd"><h3>DRE Simplificado — '+mesAno()+'</h3><button class="btn btn-sm btn-red" onclick="exportDRE()">Exportar</button></div><div class="cbd">'+
    '<table style="width:100%"><tbody>'+
    '<tr><td style="font-weight:600;padding:5px 0;font-size:12px">RECEITAS</td></tr>'+
    '<tr><td style="padding:3px 16px;font-size:11px;color:var(--lm)">Aluguel bruto</td><td style="text-align:right;font-size:11px">'+fmt(ta)+'</td></tr>'+
    '<tr><td style="padding:3px 16px;font-size:11px;color:var(--lm)">ADM 10%</td><td style="text-align:right;font-size:11px;color:var(--ok)">'+fmt(adm)+'</td></tr>'+
    '<tr style="border-top:2px solid var(--lb)"><td style="padding:5px 0;font-weight:700;font-size:12px">Receita Total</td><td style="text-align:right;font-weight:700;color:var(--ok)">'+fmt(adm)+'</td></tr>'+
    '<tr><td style="font-weight:600;padding:8px 0 3px;font-size:12px">DESPESAS</td></tr>'+
    cpD.map(function(c){return '<tr><td style="padding:3px 16px;font-size:11px;color:var(--lm)">'+c.desc+'</td><td style="text-align:right;font-size:11px;color:var(--danger)">'+fmt(c.val)+'</td></tr>';}).join('')+
    '<tr style="border-top:2px solid var(--lb)"><td style="padding:5px 0;font-weight:700;font-size:12px">Total Despesas</td><td style="text-align:right;font-weight:700;color:var(--danger)">'+fmt(tpag)+'</td></tr>'+
    '<tr style="border-top:3px solid var(--lt)"><td style="padding:8px 0;font-weight:700;font-size:14px">RESULTADO</td><td style="text-align:right;font-weight:700;font-size:14px;color:'+(sal>=0?'var(--ok)':'var(--danger)')+'">'+fmt(sal)+'</td></tr>'+
    '</tbody></table></div></div>'+
    '<div class="card"><div class="chd"><h3>Fluxo de Caixa - 2026</h3><button class="btn btn-sm" onclick="exportCSV()">CSV</button></div><div class="cbd">'+
    '<canvas id="fc-chart" width="380" height="200"></canvas>'+
    '<div style="display:flex;gap:12px;margin-top:8px;font-size:11px">'+
    '<span style="display:flex;align-items:center;gap:4px"><span style="display:inline-block;width:12px;height:12px;background:#059669;border-radius:2px"></span>Entradas (ADM)</span>'+
    '<span style="display:flex;align-items:center;gap:4px"><span style="display:inline-block;width:12px;height:12px;background:#dc2626;border-radius:2px"></span>Saidas</span>'+
    '</div></div></div></div>';
  setTimeout(function(){
    var cv=document.getElementById('fc-chart'); if(!cv) return;
    var ctx=cv.getContext('2d'),W=380,H=200;
    var pad={t:20,r:15,b:35,l:55};
    var cW=W-pad.l-pad.r,cH=H-pad.t-pad.b;
    var ent=[2900,2900,2900,2900,2900],sai=[8500,7800,8200,7900,8450],meses=['Jan','Fev','Mar','Abr','Mai'];
    var maxV=Math.max.apply(null,ent.concat(sai))*1.2;
    ctx.clearRect(0,0,W,H);
    ctx.fillStyle='#f9fafb'; ctx.fillRect(0,0,W,H);
    for(var g=0;g<=4;g++){
      var y=pad.t+cH*(1-g/4);
      ctx.strokeStyle='#e5e7eb'; ctx.lineWidth=1;
      ctx.beginPath(); ctx.moveTo(pad.l,y); ctx.lineTo(pad.l+cW,y); ctx.stroke();
      ctx.fillStyle='#6b7280'; ctx.font='9px Arial'; ctx.textAlign='right';
      ctx.fillText((maxV*g/4/1000).toFixed(1)+'k',pad.l-3,y+3);
    }
    var gap=cW/meses.length, bW=gap*0.35;
    for(var mi=0;mi<meses.length;mi++){
      var x=pad.l+mi*gap+gap/2;
      ctx.fillStyle='rgba(5,150,105,.75)';
      ctx.fillRect(x-bW,pad.t+cH*(1-ent[mi]/maxV),bW-1,cH*(ent[mi]/maxV));
      ctx.fillStyle='rgba(220,38,38,.75)';
      ctx.fillRect(x+1,pad.t+cH*(1-sai[mi]/maxV),bW-1,cH*(sai[mi]/maxV));
      ctx.fillStyle='#374151'; ctx.font='10px Arial'; ctx.textAlign='center';
      ctx.fillText(meses[mi],x,H-10);
    }
    ctx.strokeStyle='#9ca3af'; ctx.lineWidth=1;
    ctx.beginPath(); ctx.moveTo(pad.l,pad.t); ctx.lineTo(pad.l,pad.t+cH); ctx.stroke();
  },200);
}

function exportDRE(){
  var ta=ctD.reduce(function(s,c){return s+c.valor;},0),adm=ta*.1,tpag=cpD.reduce(function(s,c){return s+c.val;},0);
  var html='<!DOCTYPE html><html><head><meta charset="UTF-8"><title>DRE RE/MAX Space</title>'+
  '<style>body{font-family:Arial;padding:40px;max-width:700px;margin:0 auto;}h1{color:#D42028;}table{width:100%;border-collapse:collapse;}td{padding:8px;border-bottom:1px solid #e5e7eb;font-size:13px;}td:last-child{text-align:right;}.total{font-weight:700;border-top:2px solid #111;}.res{font-weight:700;font-size:16px;border-top:3px solid #111;}.pos{color:#059669;}.neg{color:#dc2626;}</style>'+
  '</head><body><h1>RE/MAX Space - DRE Simplificado</h1><p><b>'+mesAno()+'</b> — Caldas Novas GO - Gerado em '+new Date().toLocaleDateString('pt-BR')+'</p>'+
  '<table><tr><td colspan="2"><b>RECEITAS</b></td></tr>'+
  '<tr><td style="padding-left:20px">Alugueis (bruto)</td><td>'+fmt(ta)+'</td></tr>'+
  '<tr><td style="padding-left:20px">Taxa ADM (10%)</td><td class="pos">'+fmt(adm)+'</td></tr>'+
  '<tr class="total"><td>Total Receitas</td><td class="pos">'+fmt(adm)+'</td></tr>'+
  '<tr><td colspan="2"><b>DESPESAS</b></td></tr>'+
  cpD.map(function(c){return '<tr><td style="padding-left:20px">'+c.desc+'</td><td class="neg">'+fmt(c.val)+'</td></tr>';}).join('')+
  '<tr class="total"><td>Total Despesas</td><td class="neg">'+fmt(tpag)+'</td></tr>'+
  '<tr class="res"><td>RESULTADO</td><td class="'+(adm-tpag>=0?'pos':'neg')+'">'+fmt(adm-tpag)+'</td></tr>'+
  '</table><br><small>RE/MAX Space - Sistema de Gestao v4.0</small></body></html>';
  var w=window.open('','_blank'); w.document.write(html); w.document.close(); setTimeout(function(){w.print();},500);
}
function exportCSV(){
  var rows=[['Mes','Entradas(ADM)','Saidas','Resultado']];
  var ent=[2900,2900,2900,2900,2900],sai=[8500,7800,8200,7900,8450],meses=['Jan','Fev','Mar','Abr','Mai'];
  meses.forEach(function(m,i){rows.push([m,ent[i],sai[i],ent[i]-sai[i]]);});
  var csv=rows.map(function(r){return r.join(';');}).join('\n');
  var blob=new Blob(['\uFEFF'+csv],{type:'text/csv;charset=utf-8;'});
  var a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='fluxo_remax.csv'; a.click();
}

function pFR(){
  var ativos=ctD.filter(function(c){return c.status!=='Inativo';});
  var tot=ativos.reduce(function(s,c){return s+c.valor;},0);
  var recTotal=ativos.filter(function(c){return c.rs&&c.rs[new Date().getMonth()]==='R';}).reduce(function(s,c){return s+c.valor;},0);
  var pendTotal=tot-recTotal;
  var r='';
  ativos.forEach(function(c,idx){
    var i=ctD.indexOf(c);
    var stCode=c.rs&&c.rs[new Date().getMonth()];
    var st=stCode==='R'?'Recebido':stCode==='P'?'Parcial':'Nao recebido';
    var stBadge=stCode==='R'?'<span class="badge bg">Recebido</span>':stCode==='P'?'<span class="badge by">Parcial</span>':'<span class="badge br">Nao recebido</span>';
    var rowBg=stCode==='R'?'':'stCode===\'P\'?"background:#fefce8;":""';
    r+='<tr style="'+(stCode==='N'||!stCode?'':'')+'">'
    +'<td><div style="font-weight:600">'+c.inq+'</div><div style="font-size:10px;color:var(--lm)">'+c.id+' — '+c.prop+'</div></td>'
    +'<td style="font-size:11px">'+c.tipo+'<br><span style="color:var(--lm)">'+c.end+'</span></td>'
    +'<td style="font-weight:700;text-align:right">'+fmt(c.valor)+'</td>'
    +'<td style="text-align:center">dia <b>'+c.venc+'</b></td>'
    +'<td style="font-size:11px">'+( c.forma||'PIX')+'<br><span style="color:var(--lm)">'+( c.banco||'-')+'</span></td>'
    +'<td style="text-align:center">'+stBadge+'</td>'
    +'<td id="fr-obs-'+i+'" style="font-size:10.5px;color:var(--lm);max-width:90px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;cursor:pointer">'+( c.obs||'—')+'</td>'
    +'<td style="white-space:nowrap">'
    +(stCode!=='R'?'<button class="btn btn-xs btn-green" onclick="marcarRecebidoCT('+i+')">✓ Recebido</button> ':'')
    +(stCode==='R'?'<button class="btn btn-xs" style="background:#fee2e2;color:#991b1b;font-size:10px" onclick="desmarcarRecebidoCT('+i+')">Desfazer</button>':'')
    +'</td></tr>';
  });
  r+='<tr class="sum-row"><td colspan="2">TOTAL</td><td style="text-align:right">'+fmt(tot)+'</td><td colspan="5"></td></tr>';
  document.getElementById('pc').innerHTML=
    '<div class="g3">'+
    '<div class="kc blue"><div class="kc-l">Total a receber</div><div class="kc-v">'+fmt(tot)+'</div></div>'+
    '<div class="kc green"><div class="kc-l">Recebido</div><div class="kc-v">'+fmt(recTotal)+'</div></div>'+
    '<div class="kc red"><div class="kc-l">Pendente</div><div class="kc-v">'+fmt(pendTotal)+'</div></div></div>'+
    '<div class="card"><div class="chd" style="display:flex;align-items:center;justify-content:space-between">'+
    '<h3>Contas a Receber — '+mesAno()+'</h3>'+
    '<button class="btn btn-sm" style="background:#0f1a35;color:#fff" onclick="exportarRelReceber()">⬇ Exportar</button></div>'+
    '<div class="tw"><table><thead><tr>'+
    '<th>Inquilino / Contrato</th><th>Tipo / End.</th><th style="text-align:right">Valor</th>'+
    '<th style="text-align:center">Venc.</th><th>Forma / Banco</th><th style="text-align:center">Status</th><th>Obs</th><th>Ação</th>'+
    '</tr></thead><tbody>'+r+'</tbody></table></div></div>';
  ativos.forEach(function(c){
    var i=ctD.indexOf(c);
    ied(document.getElementById('fr-obs-'+i),c.obs||'',function(v){ctD[i].obs=v;cM();});
  });
}
function marcarRecebidoCT(i){ctD[i].rs=ctD[i].rs||Array(12).fill('N');ctD[i].rs[new Date().getMonth()]='R';cM();salvarTudo();pFR();}
function desmarcarRecebidoCT(i){ctD[i].rs[new Date().getMonth()]='N';cM();salvarTudo();pFR();}
function exportarRelReceber(){
  var ativos=ctD.filter(function(c){return c.status!=='Inativo';});
  var rows=[['CT','Inquilino','Proprietario','Tipo','Valor','ADM 10%','Repasse','Venc','Status Maio','Forma','Banco','Obs']];
  ativos.forEach(function(c){
    var st=c.rs&&c.rs[new Date().getMonth()]==='R'?'Recebido':c.rs&&c.rs[new Date().getMonth()]==='P'?'Parcial':'Pendente';
    rows.push([c.id,c.inq,c.prop,c.tipo,c.valor,(c.valor*.1).toFixed(2),(c.valor*.9).toFixed(2),'Dia '+c.venc,st,c.forma||'PIX',c.banco||'-',c.obs||'']);
  });
  var tot=ativos.reduce(function(s,c){return s+c.valor;},0);
  rows.push(['TOTAL','','','',tot,(tot*.1).toFixed(2),(tot*.9).toFixed(2),'','','','','']);
  var csv=rows.map(function(r){return r.map(function(v){return '"'+String(v).replace(/"/g,'""')+'"';}).join(';');}).join('\n');
  var blob=new Blob(['\uFEFF'+csv],{type:'text/csv;charset=utf-8;'});
  var a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='contas_receber_maio2026.csv';a.click();
}

function pFP(){
  document.getElementById('pa').innerHTML='<button class="btn btn-red" onclick="nPag()">+ Nova Despesa</button>';
  var tPago=cpD.filter(function(c){return c.st==='Pago';}).reduce(function(s,c){return s+c.val;},0);
  var tVenc=cpD.filter(function(c){return c.st==='Vencido';}).reduce(function(s,c){return s+c.val;},0);
  var tAven=cpD.filter(function(c){return c.st!=='Pago'&&c.st!=='Vencido';}).reduce(function(s,c){return s+c.val;},0);
  var tGer=cpD.reduce(function(s,c){return s+c.val;},0);
  var r=''; cpD.forEach(function(c,i){
    var statusBadge=stPag(c.st,c.venc);
    var isPago=c.st==='Pago';
    r+='<tr data-st="'+c.st+'" style="'+(c.st==='Vencido'?'background:#fff5f5;':'')+(isPago?'opacity:.75;':'')+'">'
    +'<td style="min-width:160px">'
    +'<div id="fpd-'+i+'" style="font-weight:600;cursor:pointer">'+c.desc+'</div>'
    +'<div style="font-size:10px;margin-top:2px"><span class="badge bgr" style="font-size:9px">'+c.cat+'</span></div>'
    +'</td>'
    +'<td style="text-align:right;font-weight:700" id="fpv-'+i+'">'+fmt(c.val)+'</td>'
    +'<td style="text-align:center"><div style="font-size:12px;font-weight:600">'+fmtD(c.venc)+'</div></td>'
    +'<td style="text-align:center"><div style="font-size:11px;color:var(--lm)">'+( c.pago?fmtD(c.pago):'-')+'</div></td>'
    +'<td style="text-align:center">'+statusBadge+'</td>'
    +'<td><div id="fpf-'+i+'" style="font-size:11px;cursor:pointer">'+( c.forma||'-')+'</div>'
    +'<div id="fpo-'+i+'" style="font-size:10px;color:var(--lm);cursor:pointer;max-width:90px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">'+( c.obs||'-')+'</div></td>'
    +'<td style="white-space:nowrap">'
    +(!isPago?'<button class="btn btn-xs btn-green" style="margin-bottom:3px" onclick="marcarPago('+i+')">✓ Pago</button><br>':'')
    +'<button class="btn btn-xs" style="font-size:10px" onclick="ePag('+i+')">Editar</button>'
    +(c.st==='Vencido'?'<br><button class="btn btn-xs" style="background:#fee2e2;color:#991b1b;font-size:10px;margin-top:3px" onclick="excluirDespesa('+i+')">Excluir</button>':'')
    +'</td>'
    +'</tr>';
  });
  r+='<tr class="sum-row"><td>TOTAL GERAL</td><td style="text-align:right;font-weight:700">'+fmt(tGer)+'</td><td colspan="5"></td></tr>';
  document.getElementById('pc').innerHTML=
    '<div class="g4">'+
    '<div class="kc red"><div class="kc-l">Total despesas</div><div class="kc-v">'+fmt(tGer)+'</div></div>'+
    '<div class="kc green"><div class="kc-l">Pago</div><div class="kc-v">'+fmt(tPago)+'</div></div>'+
    '<div class="kc blue"><div class="kc-l">A vencer</div><div class="kc-v">'+fmt(tAven)+'</div></div>'+
    '<div class="kc warn"><div class="kc-l">Vencido</div><div class="kc-v">'+fmt(tVenc)+'</div></div></div>'+
    '<div class="card">'+
    '<div class="fbar"><input class="sinp" placeholder="Buscar despesa..." id="fp-si">'+
    '<div class="chip on" onclick="fSt(this,\'fp-b\',\'todos\')">Todas</div>'+
    '<div class="chip" onclick="fSt(this,\'fp-b\',\'Pago\')">Pagas</div>'+
    '<div class="chip" onclick="fSt(this,\'fp-b\',\'A vencer\')">A vencer</div>'+
    '<div class="chip" onclick="fSt(this,\'fp-b\',\'Vencido\')">Vencidas</div></div>'+
    '<div class="tw"><table><thead><tr>'+
    '<th style="min-width:160px">Descrição</th>'+
    '<th style="text-align:right">Valor</th>'+
    '<th style="text-align:center">Vencimento</th>'+
    '<th style="text-align:center">Pago em</th>'+
    '<th style="text-align:center">Status</th>'+
    '<th>Forma / Obs</th>'+
    '<th style="text-align:center">Acoes</th>'+
    '</tr></thead><tbody id="fp-b">'+r+'</tbody></table></div></div>';
  document.getElementById('fp-si').oninput=function(){var q=this.value.toLowerCase();document.querySelectorAll('#fp-b tr:not(.sum-row)').forEach(function(r){r.style.display=r.textContent.toLowerCase().indexOf(q)>=0?'':'none';});};
  cpD.forEach(function(c,i){
    ied(document.getElementById('fpd-'+i),c.desc,function(v){cpD[i].desc=v;pFP();});
    ied(document.getElementById('fpf-'+i),c.forma||'',function(v){cpD[i].forma=v;});
    ied(document.getElementById('fpo-'+i),c.obs||'',function(v){cpD[i].obs=v;});
    iedNum(document.getElementById('fpv-'+i),c.val,function(v){cpD[i].val=v;pFP();});
  });
}
function marcarPago(i){
  cpD[i].st='Pago';
  cpD[i].pago=new Date().toISOString().split('T')[0];
  cM(); pFP();
  // Sincroniza dashboard
  if(typeof pDash==='function') setTimeout(pDash,100);
}
function excluirDespesa(i){
  if(!confirm('Excluir despesa: '+cpD[i].desc+'?')) return;
  cpD.splice(i,1);
  cM(); pFP();
}
function ePag(i){
  var c=cpD[i];
  oM('Editar Despesa',
    '<div class="fg"><label>Descricao</label><input id="ep2-d" value="'+c.desc+'"></div>'+
    '<div class="fg3"><div class="fg"><label>Valor R$</label><input id="ep2-v" type="number" value="'+c.val+'"></div>'+
    '<div class="fg"><label>Vencimento</label><input type="date" id="ep2-ve" value="'+c.venc+'"></div>'+
    '<div class="fg"><label>Categoria</label><select id="ep2-c"><option>Fixo</option><option>Marketing</option><option>Variavel</option><option>Manutencao</option><option>Impostos</option></select></div></div>'+
    '<div class="fg3"><div class="fg"><label>Status</label><select id="ep2-s"><option>A vencer</option><option>Pago</option><option>Vencido</option></select></div>'+
    '<div class="fg"><label>Data pagamento</label><input type="date" id="ep2-pg" value="'+c.pago+'"></div>'+
    '<div class="fg"><label>Forma pagamento</label><select id="ep2-f"><option>PIX</option><option>TED</option><option>Deposito</option><option>Cartao</option><option>Debito auto</option><option>Dinheiro</option></select></div></div>'+
    '<div class="fg"><label>Observacoes</label><textarea id="ep2-o">'+c.obs+'</textarea></div>',
    function(){cpD[i].desc=document.getElementById('ep2-d').value;cpD[i].val=parseFloat(document.getElementById('ep2-v').value)||c.val;cpD[i].venc=document.getElementById('ep2-ve').value;cpD[i].cat=document.getElementById('ep2-c').value;cpD[i].st=document.getElementById('ep2-s').value;cpD[i].pago=document.getElementById('ep2-pg').value;cpD[i].forma=document.getElementById('ep2-f').value;cpD[i].obs=document.getElementById('ep2-o').value;cM();salvarTudo();pFP();});
  setTimeout(function(){document.getElementById('ep2-c').value=c.cat;document.getElementById('ep2-s').value=c.st;document.getElementById('ep2-f').value=c.forma||'PIX';},50);
}
function nPag(){
  oM('Nova Despesa',
    '<div class="fg"><label>Descricao</label><input id="np2-d"></div>'+
    '<div class="fg3"><div class="fg"><label>Valor R$</label><input id="np2-v" type="number"></div>'+
    '<div class="fg"><label>Vencimento</label><input type="date" id="np2-ve"></div>'+
    '<div class="fg"><label>Categoria</label><select id="np2-c"><option>Fixo</option><option>Marketing</option><option>Variavel</option></select></div></div>'+
    '<div class="fg2"><div class="fg"><label>Forma pagamento</label><select id="np2-f"><option>PIX</option><option>TED</option><option>Cartao</option></select></div>'+
    '<div class="fg"><label>Obs</label><input id="np2-o"></div></div>',
    function(){cpD.push({id:cpD.length+1,desc:document.getElementById('np2-d').value||'-',val:parseFloat(document.getElementById('np2-v').value)||0,venc:document.getElementById('np2-ve').value,pago:'',cat:document.getElementById('np2-c').value,st:'A vencer',forma:document.getElementById('np2-f').value,obs:document.getElementById('np2-o').value});cM();salvarTudo();pFP();});
}

function pFRP(){
  var ativos=ctD.filter(function(c){return c.status!=='Inativo';});
  var inativos=ctD.filter(function(c){return c.status==='Inativo';});
  var tot=ativos.reduce(function(s,c){return s+c.valor;},0);
  var r='';
  ativos.forEach(function(c,idx){
    var i=ctD.indexOf(c);
    var rec=c.rs&&c.rs[new Date().getMonth()]==='R';
    var st=rec?'<span class="badge bg">Recebido</span>':'<span class="badge br">Pendente</span>';
    r+='<tr>'+
    '<td><span id="frpn-'+i+'" style="font-weight:700;cursor:pointer" title="Clique para editar">'+c.prop+'</span></td>'+
    '<td><span id="frpiq-'+i+'" style="cursor:pointer" title="Clique para editar">'+c.inq+'</span></td>'+
    '<td><span id="frpv-'+i+'" style="cursor:pointer;font-weight:600" title="Clique para editar valor">'+fmt(c.valor)+'</span></td>'+
    '<td style="color:var(--ok);font-weight:600" id="frpadm-'+i+'">'+fmt(c.valor*.1)+'</td>'+
    '<td style="font-weight:700;color:var(--navy)" id="frpliq-'+i+'">'+fmt(c.valor*.9)+'</td>'+
    '<td style="text-align:center;font-weight:600;color:var(--navy)">dia '+( c.venc||10)+'</td>'+
    '<td id="frpst-'+i+'" style="cursor:pointer" title="Clique para alternar">'+st+'</td>'+
    '<td id="frpf-'+i+'">'+( c.forma||'PIX')+'</td>'+
    '<td id="frpb-'+i+'">'+( c.banco||'-')+'</td>'+
    '<td id="frppix-'+i+'">'+( c.pix||'-')+'</td>'+
    '<td id="frpobs-'+i+'" style="font-size:10px;color:var(--lm);max-width:80px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;cursor:pointer">'+( c.obs||'-')+'</td>'+
    '<td style="white-space:nowrap">'+
      (rec?'<button class="btn btn-xs btn-green" onclick="mFRP('+i+')">Repassar</button> ':'')+
      '<button class="btn btn-xs" style="background:#fef9c3;color:#92400e;font-size:10px" onclick="inativarCT('+i+')">Inativar</button>'+
    '</td></tr>';
  });
  r+='<tr class="sum-row"><td colspan="2">TOTAL ATIVO</td><td>'+fmt(tot)+'</td><td>'+fmt(tot*.1)+'</td><td>'+fmt(tot*.9)+'</td><td colspan="6"></td></tr>';

  var ri='';
  if(inativos.length){
    ri='<div style="margin-top:16px"><div class="chd" style="background:#f3f4f6"><h3 style="color:var(--lm)">Inativos / Contratos Encerrados</h3></div>'+
    '<div class="tw"><table><thead><tr style="background:#f9fafb"><th>Proprietário</th><th>Inquilino</th><th>Valor</th><th>Motivo</th><th>Acao</th></tr></thead><tbody>';
    inativos.forEach(function(c){
      var i=ctD.indexOf(c);
      ri+='<tr style="opacity:.6"><td>'+c.prop+'</td><td>'+c.inq+'</td><td>'+fmt(c.valor)+'</td><td>'+( c.motivoInativo||'Contrato encerrado')+'</td>'+
      '<td><button class="btn btn-xs btn-green" onclick="reativarCT('+i+')">Reativar</button></td></tr>';
    });
    ri+='</tbody></table></div></div>';
  }

  document.getElementById('pc').innerHTML=
    '<div class="g3"><div class="kc blue"><div class="kc-l">Total aluguel</div><div class="kc-v">'+fmt(tot)+'</div></div>'+
    '<div class="kc red"><div class="kc-l">ADM 10%</div><div class="kc-v">'+fmt(tot*.1)+'</div></div>'+
    '<div class="kc gold"><div class="kc-l">A repassar</div><div class="kc-v">'+fmt(tot*.9)+'</div></div></div>'+
    '<div class="card"><div class="chd"><h3>Repasses a Proprietários — '+mesAno()+'</h3><small style="color:var(--lm)">Clique nos campos para editar</small></div>'+
    '<div class="tw"><table><thead><tr><th>Proprietário</th><th>Inquilino</th><th>Aluguel</th><th>ADM 10%</th><th>Repasse liq.</th><th>Venc.</th><th>Recebido?</th><th>Forma</th><th>Banco</th><th>PIX/Conta</th><th>Acao</th></tr></thead><tbody>'+r+'</tbody></table></div>'+ri+'</div>';

  ativos.forEach(function(c){
    (function(i){
    // Proprietário editável
    ied(document.getElementById('frpn-'+i),c.prop,function(v){ctD[i].prop=v;pFRP();});
    // Inquilino editável
    ied(document.getElementById('frpiq-'+i),c.inq,function(v){ctD[i].inq=v;pFRP();});
    // Valor editável
    ied(document.getElementById('frpv-'+i),String(c.valor),function(v){
      var nv=parseFloat(v.replace('R$','').replace(/\./g,'').replace(',','.').trim())||ctD[i].valor;
      ctD[i].valor=nv;
      document.getElementById('frpadm-'+i).textContent=fmt(nv*.1);
      document.getElementById('frpliq-'+i).textContent=fmt(nv*.9);
      document.getElementById('frpv-'+i).textContent=fmt(nv);
    });
    // Status recebido clicável
    document.getElementById('frpst-'+i).onclick=function(){
      ctD[i].rs=ctD[i].rs||[null,null,null,null,null];
      ctD[i].rs[new Date().getMonth()]=(ctD[i].rs[new Date().getMonth()]==='R')?'N':'R';
      pFRP();
    };
    // Forma pagamento editável
    ied(document.getElementById('frpf-'+i),c.forma||'PIX',function(v){ctD[i].forma=v;});
    // Banco editável
    ied(document.getElementById('frpb-'+i),c.banco||'',function(v){ctD[i].banco=v;});
    // PIX editável
    ied(document.getElementById('frppix-'+i),c.pix||'',function(v){ctD[i].pix=v;});
    ied(document.getElementById('frpobs-'+i),c.obs||'',function(v){ctD[i].obs=v;});
    })(ctD.indexOf(c));
  });
}

function inativarCT(i){
  var c=ctD[i];
  oM('Inativar - '+c.prop,
    '<p style="margin-bottom:12px;color:var(--lm)">O contrato de <b>'+c.prop+'/'+c.inq+'</b> sera movido para inativos.</p>'+
    '<div class="fg"><label>Motivo</label><select id="in-mot"><option>Contrato encerrado</option><option>Distrato</option><option>Inadimplencia</option><option>Imovel vendido</option><option>Proprietario retirou</option></select></div>'+
    '<div class="fg"><label>Observacao</label><input id="in-obs" placeholder="Detalhes opcionais"></div>',
    function(){
      ctD[i].status='Inativo';
      ctD[i].motivoInativo=document.getElementById('in-mot').value+(document.getElementById('in-obs').value?' - '+document.getElementById('in-obs').value:'');
      cM();pFRP();
    });
}


function excluirCT(i){ inativarCT(i); }
window.excluirCT = excluirCT;

function gerarContratoIA(i){
  var c = ctD[i];
  if(!c){ alert('Contrato não encontrado.'); return; }

  // Busca dados completos do inquilino e proprietário
  var inq = inqCad.find(function(q){ return q.ct===c.id || q.nome===c.inq; }) || {nome:c.inq,cpf:'',rg:'',nasc:'',tel:'',email:'',end:'',fianca:''};
  var prop = propCad.find(function(p){ return p.nome===c.prop; }) || {nome:c.prop,cpf:'',tel:'',email:'',end:''};

  // Mostra modal com opções
  oM('🤖 Gerar Contrato de Locação com IA — '+c.id,
    '<div style="background:#f0f9ff;border-radius:8px;padding:12px;margin-bottom:14px;font-size:12px;border:1px solid #bae6fd">'+
      '<div style="font-weight:700;color:#0369a1;margin-bottom:8px">📋 Dados do Contrato</div>'+
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;font-size:11px">'+
        '<div><b>Contrato:</b> '+c.id+'</div>'+
        '<div><b>Tipo:</b> '+c.tipo+'</div>'+
        '<div><b>Proprietário:</b> '+c.prop+'</div>'+
        '<div><b>Inquilino:</b> '+c.inq+'</div>'+
        '<div><b>Imóvel:</b> '+c.end+'</div>'+
        '<div><b>Valor:</b> '+fmt(c.valor)+'</div>'+
        '<div><b>Vencimento:</b> Dia '+c.venc+'</div>'+
        '<div><b>Vigência:</b> '+c.inicio+' a '+c.fim+'</div>'+
      '</div>'+
    '</div>'+
    '<div class="fg2">'+
      '<div class="fg"><label>Cláusula de Multa (%)</label><input id="ct-multa" type="number" value="10" min="0" max="100"></div>'+
      '<div class="fg"><label>Reajuste Anual</label><select id="ct-reaj"><option>IGPM</option><option>IPCA</option><option>INPC</option><option>IGP-DI</option></select></div>'+
    '</div>'+
    '<div class="fg2">'+
      '<div class="fg"><label>Fiança / Garantia</label><select id="ct-fian"><option>Caução</option><option>Fiador</option><option>Seguro Fiança</option><option>Título de Capitalização</option><option>Sem garantia</option></select></div>'+
      '<div class="fg"><label>Destino do imóvel</label><select id="ct-dest"><option>Residencial</option><option>Comercial</option><option>Residencial/Comercial</option></select></div>'+
    '</div>'+
    '<div class="fg"><label>Observações especiais (opcional)</label><textarea id="ct-obs" placeholder="Ex: proibido animais, permitido sublocação..." rows="2"></textarea></div>'+
    '<div style="background:#fef9c3;border-radius:8px;padding:10px;font-size:11px;margin-top:8px">'+
      '⚠️ O contrato será gerado pela IA e deve ser revisado por Tatiana antes de assinar.'+
    '</div>',
    function(){
      var multa = document.getElementById('ct-multa').value || '10';
      var reaj = document.getElementById('ct-reaj').value;
      var fian = document.getElementById('ct-fian').value;
      var dest = document.getElementById('ct-dest').value;
      var obs = document.getElementById('ct-obs').value;
      cM();
      executarGeracaoContrato(c, inq, prop, multa, reaj, fian, dest, obs);
    }, 'Gerar Contrato com IA');
}

async function executarGeracaoContrato(c, inq, prop, multa, reaj, fian, dest, obs){
  // Show loading modal
  oM('⏳ Gerando Contrato...',
    '<div id="ct-gen-status" style="text-align:center;padding:30px">'+
      '<div style="font-size:32px;margin-bottom:12px">✍️</div>'+
      '<div style="font-size:14px;font-weight:700;color:var(--navy)">A IA está redigindo seu contrato...</div>'+
      '<div style="font-size:12px;color:var(--lm);margin-top:6px">Isso pode levar 10-20 segundos</div>'+
    '</div>',
    null, null, true
  );

  var hoje = new Date().toLocaleDateString('pt-BR',{day:'2-digit',month:'long',year:'numeric'});

  var prompt = 'Redija um CONTRATO DE LOCAÇÃO IMOBILIÁRIA completo e juridicamente válido no Brasil com os seguintes dados:\n\n'+
    '=== PARTES ===\n'+
    'LOCADOR (Proprietário): '+prop.nome+'\n'+
    (prop.cpf?'CPF do Locador: '+prop.cpf+'\n':'')+
    (prop.end?'Endereço do Locador: '+prop.end+'\n':'')+
    'LOCATÁRIA (Inquilino): '+inq.nome+'\n'+
    (inq.cpf?'CPF do Locatário: '+inq.cpf+'\n':'')+
    (inq.rg?'RG do Locatário: '+inq.rg+'\n':'')+
    (inq.nasc?'Nascimento: '+inq.nasc+'\n':'')+
    (inq.end?'Endereço do Locatário: '+inq.end+'\n':'')+
    (inq.tel?'Telefone: '+inq.tel+'\n':'')+
    '\n=== IMÓVEL ===\n'+
    'Tipo: '+c.tipo+'\n'+
    'Endereço: '+c.end+' — Caldas Novas - GO\n'+
    'Destinação: '+dest+'\n'+
    '\n=== CONDIÇÕES ===\n'+
    'Valor do aluguel: '+fmt(c.valor)+'\n'+
    'Vencimento: dia '+c.venc+' de cada mês\n'+
    'Início da vigência: '+c.inicio+'\n'+
    'Fim da vigência: '+c.fim+'\n'+
    'Reajuste anual: pelo índice '+reaj+'\n'+
    'Multa por rescisão antecipada: '+multa+'% do valor total do contrato\n'+
    'Garantia locatícia: '+fian+'\n'+
    (inq.fianca?'Detalhe da garantia: '+inq.fianca+'\n':'')+
    '\n=== ADMINISTRAÇÃO ===\n'+
    'Administradora: RE/MAX Space — Caldas Novas GO\n'+
    'Responsável: Tatiana Basile — Advogada e Corretora\n'+
    'Taxa de administração: 10% sobre o valor do aluguel\n'+
    (obs?'\n=== OBSERVAÇÕES ESPECIAIS ===\n'+obs+'\n':'')+
    '\n=== INSTRUÇÕES ===\n'+
    'Redija o contrato completo com:\n'+
    '1. Identificação das partes\n'+
    '2. Objeto do contrato\n'+
    '3. Prazo de locação\n'+
    '4. Valor e forma de pagamento\n'+
    '5. Reajuste do aluguel\n'+
    '6. Obrigações do locador\n'+
    '7. Obrigações do locatário\n'+
    '8. Garantia locatícia\n'+
    '9. Rescisão e penalidades\n'+
    '10. Disposições gerais\n'+
    '11. Foro competente (Caldas Novas - GO)\n'+
    '12. Assinatura das partes e testemunhas\n\n'+
    'Use linguagem jurídica formal. Base na Lei 8.245/91 (Lei do Inquilinato). '+
    'Data de hoje: '+hoje+'. Cidade: Caldas Novas - GO.';

  var system = 'Você é Tatiana Basile, advogada especializada em direito imobiliário com mais de 10 anos de experiência em Caldas Novas - GO. Redija contratos de locação completos, claros e juridicamente seguros, baseados na Lei 8.245/91. Use linguagem formal e técnica. Inclua todas as cláusulas necessárias para proteção de ambas as partes.';

  try{
    var contrato = await callClaude(prompt, system, 4000);

    var el = document.getElementById('ct-gen-status');
    if(el && el.parentElement){
      // Build print-ready contract
      var contratoHtml = contrato
        .replace(/\n\n/g,'</p><p style="margin-bottom:12px">')
        .replace(/\n/g,'<br>')
        .replace(/^/,'<p style="margin-bottom:12px">')
        .replace(/$/,'</p>');

      el.parentElement.innerHTML =
        '<div style="width:100%">'+
          '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">'+
            '<div style="font-size:13px;font-weight:700;color:var(--navy)">Contrato gerado — '+c.id+' — '+c.inq+'</div>'+
            '<div style="display:flex;gap:8px">'+
              '<button class="btn btn-primary" onclick="imprimirContrato()">🖨️ Imprimir / PDF</button>'+
              '<button class="btn btn-sm" style="background:#7c3aed;color:#fff;border-color:#7c3aed" onclick="gerarContratoIA(ctD.indexOf(ctD.find(function(x){return x.id===\''+c.id+'\'})))">🔄 Gerar novamente</button>'+
            '</div>'+
          '</div>'+
          '<div style="background:#fef9c3;border-radius:8px;padding:8px 12px;margin-bottom:10px;font-size:11px">'+
            '⚠️ Revise o contrato antes de assinar. A IA pode cometer erros. Verifique todos os dados.'+
          '</div>'+
          '<div id="contrato-texto" style="background:#fff;border:1px solid var(--lb);border-radius:8px;padding:20px;font-size:12px;line-height:1.8;max-height:400px;overflow-y:auto;font-family:Georgia,serif;white-space:pre-wrap">'+contrato+'</div>'+
        '</div>';

      // Store for printing
      window._contratoTexto = contrato;
      window._contratoId = c.id;
      window._contratoInq = c.inq;
    }
  } catch(e){
    var el2 = document.getElementById('ct-gen-status');
    if(el2) el2.innerHTML = '<div style="color:#dc2626;text-align:center;padding:20px">Erro ao gerar: '+e.message+'<br><br><small>Verifique se a Edge Function está ativa no Supabase.</small></div>';
  }
}


function msgCobranca(i){
  var c=ctD[i];
  if(!c) return;
  var hoje=new Date();
  var mesRef=hoje.toLocaleString('pt-BR',{month:'long',year:'numeric'});
  var vencDia=c.venc||10;
  var tel=(c.inq_tel||'').replace(/\D/g,'');
  var v=fmt(c.valor);

  function msg0(){ return 'Ola, '+c.inq+'! Tudo bem?\n\nPassando para lembrar que o aluguel de '+mesRef+' vence no dia '+vencDia+'.\n\nValor: '+v+'\nPIX: [chave pix da imobiliaria]\n\nQualquer duvida estou a disposicao!\n\nAtenciosamente,\nRE/MAX Space'; }
  function msg1(){ return 'Ola, '+c.inq+'! Tudo bem?\n\nO aluguel de '+mesRef+' vence hoje, dia '+vencDia+'.\n\nValor: '+v+'\nPIX: [chave pix da imobiliaria]\n\nFique a vontade para nos contatar.\n\nRE/MAX Space — (64) 9 9000-0000'; }
  function msg2(){ return 'Ola, '+c.inq+'. Tudo bem?\n\nNosso sistema ainda nao identificou o pagamento do aluguel de '+mesRef+' (vencimento: '+vencDia+').\n\nValor: '+v+'\nPIX: [chave pix da imobiliaria]\n\nPor favor confirme quando efetuar o pagamento.\n\nRE/MAX Space'; }
  function msg3(){ return 'Prezado(a) '+c.inq+',\n\nInformamos que o aluguel de '+mesRef+' encontra-se em aberto desde o dia '+vencDia+'.\n\nValor em aberto: '+v+'\n\nSolicitamos a regularizacao ate 48 horas para evitar notificacao formal conforme contrato.\n\nRE/MAX Space Caldas Novas\nTatiana Basile - Diretora'; }

  var labels=['Aviso Gentil (antes do vencimento)','1a Cobranca (vencimento hoje)','2a Cobranca (3-5 dias de atraso)','3a Cobranca - Formal (mais de 10 dias)'];
  var fns=[msg0,msg1,msg2,msg3];

  var btns='';
  for(var idx=0;idx<4;idx++){
    btns+='<div style="background:#f9fafb;border:1px solid #e2e8f0;border-radius:10px;padding:12px;margin-bottom:10px">'+
      '<div style="font-size:11px;font-weight:700;color:#64748b;margin-bottom:8px">'+labels[idx]+'</div>'+
      '<textarea id="cob-msg-'+idx+'" style="width:100%;height:80px;font-size:11px;border:1px solid #e2e8f0;border-radius:6px;padding:8px;resize:vertical;font-family:monospace">'+fns[idx]()+'</textarea>'+
      '<div style="display:flex;gap:8px;margin-top:6px">'+
        '<button class="btn btn-sm btn-blue" onclick="copiarMsgIdx('+idx+')">Copiar</button>'+
        (tel?'<a href="https://wa.me/55'+tel+'" target="_blank" class="btn btn-sm" style="background:#25D366;color:#fff;border-color:#25D366;text-decoration:none">WhatsApp</a>':'')+
      '</div>'+
    '</div>';
  }

  oM('Mensagem de Cobranca — '+c.inq,
    '<div style="background:#fef9c3;border-radius:8px;padding:10px;margin-bottom:12px;font-size:12px">'+
      '<b>Contrato:</b> '+c.id+' | <b>Inquilino:</b> '+c.inq+' | <b>Valor:</b> '+v+' | <b>Vencimento:</b> dia '+vencDia+
    '</div>'+btns,
    null, null, true
  );
}


function reativarCT(i){
  if(!confirm('Reativar contrato de '+ctD[i].prop+'?'))return;
  ctD[i].status='Ativo';
  ctD[i].motivoInativo='';
  cM();pFRP();
}
function marcarRecebidoRep(i){
  if(!ctD[i]) return;
  ctD[i].rs = ctD[i].rs || Array(12).fill('N');
  ctD[i].rs[new Date().getMonth()] = 'R';
  salvarTudo();
}
function desmarcarRep(i){
  if(!ctD[i]) return;
  if(ctD[i].rs) ctD[i].rs[new Date().getMonth()] = 'N';
  salvarTudo();
}
function mFRP(i){
  var c=ctD[i];
  oM('Confirmar Repasse - '+c.prop,
    '<div style="background:#f0fdf4;border-radius:10px;padding:16px;margin-bottom:14px;text-align:center">'+
    '<div style="font-size:12px;color:var(--lm)">Valor a repassar</div>'+
    '<div style="font-size:28px;font-weight:700;color:var(--ok)">'+fmt(c.valor*.9)+'</div>'+
    '<div style="font-size:11px;color:var(--lm)">Para: <b>'+c.prop+'</b></div></div>'+
    '<div class="fg3"><div class="fg"><label>Forma</label><select id="mf-f"><option>PIX</option><option>TED</option><option>Deposito</option></select></div>'+
    '<div class="fg"><label>Banco destino</label><select id="mf-b"><option>Bradesco</option><option>Itau</option><option>Caixa</option><option>BB</option><option>Nubank</option><option>Outro</option></select></div>'+
    '<div class="fg"><label>Data</label><input type="date" id="mf-dt" value="2026-05-17"></div></div>'+
    '<div class="fg"><label>Chave PIX / Conta</label><input id="mf-pix"></div>'+
    '<div class="fg"><label>Obs</label><textarea id="mf-obs">Repasse efetuado</textarea></div>',
    function(){ctD[i].forma=document.getElementById('mf-f').value;ctD[i].banco=document.getElementById('mf-b').value;ctD[i].obs=document.getElementById('mf-obs').value;ctD[i].repassado=true;alert('Repasse de '+fmt(c.valor*.9)+' para '+c.prop+' registrado!');cM();salvarTudo();pFRP();});
  setTimeout(function(){document.getElementById('mf-b').value=c.banco||'Bradesco';},50);
}

// ===== CADASTROS =====
function pCadCor(){
  document.getElementById('pa').innerHTML='<button class="btn btn-red" onclick="nCadCor()">+ Novo Corretor</button> <button class="btn btn-primary" onclick="pGerenciarSenhas()">🔐 Senhas</button>';
  var r=''; corCad.forEach(function(c,i){
    r+='<div class="cad-card"><div class="cad-av" style="background:'+c.cor+'">'+c.ini+'</div>'+
    '<div class="cad-info">'+
    '<div class="cad-name">'+c.nome+' <span class="badge '+(c.status==='Ativo'?'bg':'br')+'">'+c.status+'</span></div>'+
    '<div class="cad-det">'+c.cargo+' - CRECI: '+c.creci+'</div>'+
    '<div class="cad-det">Tel: '+c.tel+' - Email: '+c.email+'</div>'+
    '<div class="cad-det">CPF: '+c.cpf+' - Nasc.: '+fmtD(c.nasc)+'</div>'+
    '<div class="cad-det">End.: '+c.end+', '+c.bairro+' - '+c.cidade+'</div>'+
    '<div class="cad-det">Banco: '+c.banco+' Ag: '+c.agencia+' Cc: '+c.conta+' - PIX: '+c.pix+'</div>'+
    '</div>'+
    '<button class="btn btn-sm" onclick="eCadCor('+i+')">Editar</button></div>';
  });
  document.getElementById('pc').innerHTML='<div>'+r+'</div>';
}
function eCadCor(i){
  var c=corCad[i];
  oM('Editar Corretor - '+c.nome,
    '<div class="fg2"><div class="fg"><label>Nome completo</label><input id="cc-n" value="'+c.nome+'"></div><div class="fg"><label>CPF</label><input id="cc-cpf" value="'+c.cpf+'"></div></div>'+
    '<div class="fg3"><div class="fg"><label>RG</label><input id="cc-rg" value="'+c.rg+'"></div><div class="fg"><label>Nascimento</label><input type="date" id="cc-nasc" value="'+c.nasc+'"></div><div class="fg"><label>CRECI</label><input id="cc-creci" value="'+c.creci+'"></div></div>'+
    '<div class="fg2"><div class="fg"><label>Telefone</label><input id="cc-tel" value="'+c.tel+'"></div><div class="fg"><label>Email</label><input id="cc-email" value="'+c.email+'"></div></div>'+
    '<div class="fg"><label>Endereco</label><input id="cc-end" value="'+c.end+'"></div>'+
    '<div class="fg3"><div class="fg"><label>Bairro</label><input id="cc-bai" value="'+c.bairro+'"></div><div class="fg"><label>Cidade/UF</label><input id="cc-cid" value="'+c.cidade+'"></div>'+
    '<div class="fg"><label>Cargo</label><select id="cc-car"><option>Diretora/Corretora</option><option>Gerente/Corretora</option><option>Corretora</option><option>Corretor</option><option>Corretor/Marketing</option><option>Corretor Trainee</option></select></div></div>'+
    '<div class="fg3"><div class="fg"><label>Banco</label><select id="cc-ban"><option>Bradesco</option><option>Itau</option><option>Caixa</option><option>BB</option><option>Santander</option><option>Nubank</option><option>Inter</option><option>Outro</option></select></div>'+
    '<div class="fg"><label>Agencia</label><input id="cc-ag" value="'+c.agencia+'"></div><div class="fg"><label>Conta</label><input id="cc-cc" value="'+c.conta+'"></div></div>'+
    '<div class="fg2"><div class="fg"><label>Chave PIX</label><input id="cc-pix" value="'+c.pix+'"></div>'+
    '<div class="fg"><label>Status</label><select id="cc-st"><option>Ativo</option><option>Inativo</option><option>Afastado</option></select></div></div>',
    function(){corCad[i].nome=document.getElementById('cc-n').value;corCad[i].cpf=document.getElementById('cc-cpf').value;corCad[i].rg=document.getElementById('cc-rg').value;corCad[i].nasc=document.getElementById('cc-nasc').value;corCad[i].creci=document.getElementById('cc-creci').value;corCad[i].tel=document.getElementById('cc-tel').value;corCad[i].email=document.getElementById('cc-email').value;corCad[i].end=document.getElementById('cc-end').value;corCad[i].bairro=document.getElementById('cc-bai').value;corCad[i].cidade=document.getElementById('cc-cid').value;corCad[i].cargo=document.getElementById('cc-car').value;corCad[i].banco=document.getElementById('cc-ban').value;corCad[i].agencia=document.getElementById('cc-ag').value;corCad[i].conta=document.getElementById('cc-cc').value;corCad[i].pix=document.getElementById('cc-pix').value;corCad[i].status=document.getElementById('cc-st').value;cM();salvarTudo();pCadCor();});
  setTimeout(function(){document.getElementById('cc-car').value=c.cargo;document.getElementById('cc-ban').value=c.banco;document.getElementById('cc-st').value=c.status;},50);
}
function nCadCor(){corCad.push({id:corCad.length+1,nome:'Novo Corretor',cpf:'',rg:'',nasc:'',tel:'',email:'',end:'',bairro:'',cidade:'Caldas Novas GO',creci:'',banco:'Bradesco',agencia:'',conta:'',pix:'',cargo:'Corretor',status:'Ativo',cor:'#6b7280',ini:'NC'});eCadCor(corCad.length-1);}

function pCadProp(){
  document.getElementById('pa').innerHTML='<button class="btn btn-red" onclick="nCadProp()">+ Novo Proprietario</button>';
  var totAll=ctD.reduce(function(s,c){return s+c.valor;},0);
  var totalCard='<div style="background:#0f1a35;color:#fff;border-radius:12px;padding:14px;margin-bottom:14px;display:flex;gap:16px;flex-wrap:wrap;align-items:center">'+
    '<div style="font-size:13px;font-weight:700">TOTAIS DA CARTEIRA</div>'+
    '<div style="background:rgba(255,255,255,.1);border-radius:8px;padding:7px 12px;text-align:center"><div style="font-size:9px;opacity:.7">Total/mes</div><div style="font-size:16px;font-weight:700">'+fmt(totAll)+'</div></div>'+
    '<div style="background:rgba(255,255,255,.1);border-radius:8px;padding:7px 12px;text-align:center"><div style="font-size:9px;opacity:.7">ADM 10%</div><div style="font-size:16px;font-weight:700;color:#86efac">'+fmt(totAll*.1)+'</div></div>'+
    '<div style="background:rgba(255,255,255,.1);border-radius:8px;padding:7px 12px;text-align:center"><div style="font-size:9px;opacity:.7">Repasse</div><div style="font-size:16px;font-weight:700;color:#fde047">'+fmt(totAll*.9)+'</div></div>'+
  '</div>';
  var r=''; propCad.forEach(function(p,i){
    var cts=ctD.filter(function(c){return c.prop===p.nome;}), tot=cts.reduce(function(s,c){return s+c.valor;},0);
    var inad=cts.filter(function(c){return(c.rs||[])[4]==='N';}).length;
    r+='<div class="cad-card"><div class="cad-av" style="background:var(--navy)">'+p.nome.split(' ').map(function(x){return x[0];}).join('').substring(0,2)+'</div>'+
    '<div class="cad-info">'+
    '<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:3px">'+
    '<div class="cad-name" style="margin:0">'+p.nome+'</div>'+
    (cts.length?'<span class="badge bb">'+cts.length+' ct(s)</span>':'<span class="badge bgr">Sem contrato</span>')+
    (inad>0?'<span class="badge br">'+inad+' inad.</span>':cts.length?'<span class="badge bg">Em dia</span>':'')+
    '</div>'+
    '<div class="cad-det">CPF: '+p.cpf+' - Tel: '+p.tel+'</div>'+
    '<div class="cad-det">'+p.end+' - '+p.cidade+'</div>'+
    '<div class="cad-det">Banco: <b>'+p.banco+'</b> Ag: '+p.agencia+' Cc: '+p.conta+' - PIX: '+p.pix+'</div>'+
    (tot>0?'<div style="display:flex;gap:10px;margin-top:6px;flex-wrap:wrap">'+
    '<div style="background:#f0fdf4;border-radius:6px;padding:5px 10px;font-size:11px"><div style="color:var(--lm)">Aluguel</div><div style="font-weight:700">'+fmt(tot)+'</div></div>'+
    '<div style="background:#dbeafe;border-radius:6px;padding:5px 10px;font-size:11px"><div style="color:var(--lm)">ADM</div><div style="font-weight:700;color:var(--navy)">'+fmt(tot*.1)+'</div></div>'+
    '<div style="background:#fef3c7;border-radius:6px;padding:5px 10px;font-size:11px"><div style="color:var(--lm)">Repasse</div><div style="font-weight:700;color:var(--ok)">'+fmt(tot*.9)+'</div></div>'+
    '</div>':'')+
    (p.obs?'<div class="cad-det" style="color:var(--warn);margin-top:3px">Obs: '+p.obs+'</div>':'')+
    '</div>'+
    '<div style="display:flex;flex-direction:column;gap:4px"><button class="btn btn-sm" onclick="eCadProp('+i+')">Editar</button></div>'+
    '</div>';
  });
  document.getElementById('pc').innerHTML=totalCard+r;
}
function eCadProp(i){
  var p=propCad[i];
  oM('Editar Proprietario - '+p.nome,
    '<div class="fg2"><div class="fg"><label>Nome completo</label><input id="cp2-n" value="'+p.nome+'"></div><div class="fg"><label>CPF</label><input id="cp2-cpf" value="'+p.cpf+'"></div></div>'+
    '<div class="fg2"><div class="fg"><label>Telefone</label><input id="cp2-tel" value="'+p.tel+'"></div><div class="fg"><label>Email</label><input id="cp2-email" value="'+p.email+'"></div></div>'+
    '<div class="fg"><label>Endereco</label><input id="cp2-end" value="'+p.end+'"></div>'+
    '<div class="fg"><label>Cidade / UF</label><input id="cp2-cid" value="'+p.cidade+'"></div>'+
    '<div class="fg3"><div class="fg"><label>Banco</label><select id="cp2-ban"><option>Bradesco</option><option>Itau</option><option>Caixa</option><option>BB</option><option>Santander</option><option>Nubank</option><option>Inter</option><option>Outro</option></select></div>'+
    '<div class="fg"><label>Agencia</label><input id="cp2-ag" value="'+p.agencia+'"></div>'+
    '<div class="fg"><label>Conta</label><input id="cp2-cc" value="'+p.conta+'"></div></div>'+
    '<div class="fg2"><div class="fg"><label>Chave PIX</label><input id="cp2-pix" value="'+p.pix+'"></div>'+
    '<div class="fg"><label>Observacoes</label><input id="cp2-obs" value="'+p.obs+'"></div></div>',
    function(){propCad[i].nome=document.getElementById('cp2-n').value;propCad[i].cpf=document.getElementById('cp2-cpf').value;propCad[i].tel=document.getElementById('cp2-tel').value;propCad[i].email=document.getElementById('cp2-email').value;propCad[i].end=document.getElementById('cp2-end').value;propCad[i].cidade=document.getElementById('cp2-cid').value;propCad[i].banco=document.getElementById('cp2-ban').value;propCad[i].agencia=document.getElementById('cp2-ag').value;propCad[i].conta=document.getElementById('cp2-cc').value;propCad[i].pix=document.getElementById('cp2-pix').value;propCad[i].obs=document.getElementById('cp2-obs').value;cM();salvarTudo();pCadProp();});
  setTimeout(function(){document.getElementById('cp2-ban').value=p.banco;},50);
}
function nCadProp(){propCad.push({id:propCad.length+1,nome:'Novo Proprietario',cpf:'',tel:'',email:'',end:'',cidade:'Caldas Novas GO',banco:'Bradesco',agencia:'',conta:'',pix:'',obs:''});eCadProp(propCad.length-1);}

var inqCad = [
  {id:1,ct:'CT-001',nome:'Larissa Maria Tiburcio Cardoso',cpf:'521.632.741-00',rg:'',nasc:'',tel:'(64)9 8000-1111',email:'',end:'Rua 57 Qd 136 Lt 15',fianca:'Caucao',obs:''},
  {id:2,ct:'CT-002',nome:'Vitor Hugo Silveira',cpf:'',rg:'',nasc:'',tel:'(64)9 8000-2222',email:'',end:'Cond. Cesar Park',fianca:'',obs:''},
  {id:3,ct:'CT-003',nome:'Taiane Caroline',cpf:'',rg:'',nasc:'',tel:'(64)9 8000-3333',email:'',end:'Jd. dos Turistas',fianca:'',obs:''},
  {id:4,ct:'CT-004',nome:'Joao Vieira',cpf:'',rg:'',nasc:'',tel:'(64)9 8000-4444',email:'',end:'Jd. dos Turistas',fianca:'',obs:''},
  {id:5,ct:'CT-005',nome:'Maria Eduarda Amorim',cpf:'',rg:'',nasc:'',tel:'(64)9 8000-5555',email:'',end:'Jd. dos Turistas',fianca:'',obs:''},
  {id:6,ct:'CT-006',nome:'Jade Perfeito',cpf:'',rg:'',nasc:'',tel:'(64)9 8000-6666',email:'',end:'Jd. dos Turistas',fianca:'',obs:''},
  {id:7,ct:'CT-007',nome:'Yara Moreira',cpf:'',rg:'',nasc:'',tel:'(64)9 8000-7777',email:'',end:'Mansoes',fianca:'',obs:''},
  {id:8,ct:'CT-008',nome:'Keila De Abreu',cpf:'',rg:'',nasc:'',tel:'(64)9 8000-8888',email:'',end:'Mansoes',fianca:'',obs:''},
  {id:9,ct:'CT-009',nome:'Pamela Cristina De Oliveira',cpf:'',rg:'',nasc:'',tel:'(64)9 8000-9999',email:'',end:'Lago Sul',fianca:'',obs:''},
  {id:10,ct:'CT-010',nome:'Jose Antonio De Faria Junior',cpf:'',rg:'',nasc:'',tel:'(64)9 8001-0000',email:'',end:'Pirapitinga',fianca:'',obs:'Pagamento parcial fev/26'}
];
function pCadInq(){
  document.getElementById('pa').innerHTML='<button class="btn btn-red" onclick="nCadInq()">+ Novo Inquilino</button>';
  var r=''; inqCad.forEach(function(q,i){
    var ct=ctD.find(function(c){return c.id===q.ct;})||{};
    var ativo=(q.status!=='Inativo');
    r+='<div class="cad-card" style="'+(ativo?'':'opacity:.55;background:#f9fafb')+'">'+
    '<div class="cad-av" style="background:'+(ativo?'var(--ok)':'#9ca3af')+'">'+q.nome.split(' ').map(function(x){return x[0];}).join('').substring(0,2)+'</div>'+
    '<div class="cad-info">'+
    '<div class="cad-name">'+q.nome+' <span class="badge bb">'+q.ct+'</span>'+(ativo?'':'<span class="badge br" style="margin-left:4px">Inativo</span>')+'</div>'+
    (q.cpf?'<div class="cad-det">CPF: '+q.cpf+(q.rg?' - RG: '+q.rg:'')+'</div>':'')+
    '<div class="cad-det">Tel: '+q.tel+(q.email?' - '+q.email:'')+'</div>'+
    '<div class="cad-det">End.: '+q.end+'</div>'+
    '<div class="cad-det">Fianca: '+(q.fianca||'N/I')+(ct.valor?' - Aluguel: '+fmt(ct.valor):'')+'</div>'+
    (q.obs?'<div class="cad-det" style="color:var(--warn)">'+q.obs+'</div>':'')+
    '</div>'+
    '<div style="display:flex;flex-direction:column;gap:5px">'+
    '<button class="btn btn-sm" onclick="eCadInq('+i+')">Editar</button>'+
    (ativo?'<button class="btn btn-sm" style="background:#fee2e2;color:#991b1b" onclick="inativarInq('+i+')">Inativar</button>':
           '<button class="btn btn-sm btn-green" onclick="reativarInq('+i+')">Reativar</button>')+
    '</div></div>';
  });
  document.getElementById('pc').innerHTML='<div>'+r+'</div>';
}
function eCadInq(i){
  var q=inqCad[i];
  oM('Editar Inquilino',
    '<div class="fg2"><div class="fg"><label>Nome completo</label><input id="qi-n" value="'+q.nome+'"></div><div class="fg"><label>Contrato</label><select id="qi-ct">'+ctD.map(function(c){return '<option'+(c.id===q.ct?' selected':'')+'>'+c.id+'</option>';}).join('')+'</select></div></div>'+
    '<div class="fg3"><div class="fg"><label>CPF</label><input id="qi-cpf" value="'+q.cpf+'"></div><div class="fg"><label>RG</label><input id="qi-rg" value="'+q.rg+'"></div><div class="fg"><label>Nascimento</label><input type="date" id="qi-nasc" value="'+q.nasc+'"></div></div>'+
    '<div class="fg2"><div class="fg"><label>Telefone</label><input id="qi-tel" value="'+q.tel+'"></div><div class="fg"><label>Email</label><input id="qi-email" value="'+q.email+'"></div></div>'+
    '<div class="fg"><label>Endereco atual</label><input id="qi-end" value="'+q.end+'"></div>'+
    '<div class="fg2"><div class="fg"><label>Tipo de fianca</label><select id="qi-fia"><option>Caucao</option><option>Fiador</option><option>Seguro fianca</option><option>Titulo</option><option>Sem garantia</option><option>A conferir</option></select></div><div class="fg"><label>Observacoes</label><input id="qi-obs" value="'+q.obs+'"></div></div>',
    function(){inqCad[i].nome=document.getElementById('qi-n').value;inqCad[i].ct=document.getElementById('qi-ct').value;inqCad[i].cpf=document.getElementById('qi-cpf').value;inqCad[i].rg=document.getElementById('qi-rg').value;inqCad[i].nasc=document.getElementById('qi-nasc').value;inqCad[i].tel=document.getElementById('qi-tel').value;inqCad[i].email=document.getElementById('qi-email').value;inqCad[i].end=document.getElementById('qi-end').value;inqCad[i].fianca=document.getElementById('qi-fia').value;inqCad[i].obs=document.getElementById('qi-obs').value;cM();salvarTudo();pCadInq();});
  setTimeout(function(){document.getElementById('qi-fia').value=q.fianca||'A conferir';},50);
}
function nCadInq(){inqCad.push({id:inqCad.length+1,ct:'CT-001',nome:'Novo Inquilino',cpf:'',rg:'',nasc:'',tel:'',email:'',end:'',fianca:'A conferir',obs:'',status:'Ativo'});eCadInq(inqCad.length-1);}
function inativarInq(i){
  var q=inqCad[i];
  oM('Inativar Inquilino - '+q.nome,
    '<p style="margin-bottom:12px;color:#7f1d1d;background:#fef2f2;padding:12px;border-radius:8px">O inquilino <b>'+q.nome+'</b> ('+q.ct+') será marcado como inativo.<br>O contrato vinculado permanece no sistema.</p>'+
    '<div class="fg"><label>Motivo da saída</label><select id="ii-mot"><option>Contrato encerrado</option><option>Distrato</option><option>Inadimplência</option><option>Transferência</option><option>Outro</option></select></div>'+
    '<div class="fg"><label>Data de saída</label><input type="date" id="ii-dt"></div>'+
    '<div class="fg"><label>Observação</label><input id="ii-obs" placeholder="Detalhes opcionais"></div>',
    function(){
      inqCad[i].status='Inativo';
      inqCad[i].motivoSaida=document.getElementById('ii-mot').value;
      inqCad[i].dataSaida=document.getElementById('ii-dt').value;
      inqCad[i].obs=(inqCad[i].obs?inqCad[i].obs+' | ':'')+document.getElementById('ii-mot').value;
      // Inativar contrato vinculado automaticamente
      var ct=ctD.find(function(c){return c.id===inqCad[i].ct;});
      if(ct) ct.status='Inativo';
      cM(); pCadInq();
    });
}
function reativarInq(i){
  if(!confirm('Reativar inquilino '+inqCad[i].nome+'?')) return;
  inqCad[i].status='Ativo';
  inqCad[i].motivoSaida='';
  cM(); pCadInq();
}

// ===== REPASSES UNIFICADO =====
function pRepasses(){
  // Abas: 1) Repasses 2026 (mensal) 2) Repasses a Proprietários
  document.getElementById('pc').innerHTML=
    '<div style="display:flex;gap:0;margin-bottom:0;border-bottom:2px solid var(--lb)">'+
    '<button id="tab-r1" onclick="showRepTab(1)" style="padding:10px 20px;border:none;background:#0f1a35;color:#fff;font-weight:700;font-size:13px;cursor:pointer;border-radius:8px 8px 0 0">📅 Repasses Mensais 2026</button>'+
    '<button id="tab-r2" onclick="showRepTab(2)" style="padding:10px 20px;border:none;background:#f3f4f6;color:var(--lt);font-weight:600;font-size:13px;cursor:pointer;border-radius:8px 8px 0 0;margin-left:4px">💰 Repasses a Proprietários</button>'+
    '</div>'+
    '<div id="rep-panel-1"></div>'+
    '<div id="rep-panel-2" style="display:none"></div>';
  renderRepTab1();
}
function showRepTab(n){
  document.getElementById('tab-r1').style.background=n===1?'#0f1a35':'#f3f4f6';
  document.getElementById('tab-r1').style.color=n===1?'#fff':'var(--lt)';
  document.getElementById('tab-r2').style.background=n===2?'#0f1a35':'#f3f4f6';
  document.getElementById('tab-r2').style.color=n===2?'#fff':'var(--lt)';
  document.getElementById('rep-panel-1').style.display=n===1?'block':'none';
  document.getElementById('rep-panel-2').style.display=n===2?'block':'none';
  if(n===2 && !document.getElementById('rep-panel-2').innerHTML) renderRepTab2();
}
function renderRepTab1(){
  // Chama pLR mas renderiza no panel
  var tot=ctD.filter(function(c){return c.status!=='Inativo';}).reduce(function(s,c){return s+c.valor;},0);
  var hdr='<th>ID</th><th>Proprietário</th><th>Inquilino</th><th>Valor</th>';
  MES.forEach(function(m){hdr+='<th style="min-width:32px;text-align:center">'+m+'</th>';});
  hdr+='<th>ADM</th><th>Forma</th><th>Banco</th><th>Obs</th><th></th>';
  var r='';
  ctD.forEach(function(c,ci){
    if(c.status==='Inativo') return;
    var rs=c.rs||Array(12).fill('N'), cells='';
    rs.forEach(function(s,mi){
      var sym=s==='R'?'&#10003;':s==='P'?'1/2':s==='X'?'-':'&#10007;';
      cells+='<td style="text-align:center"><span class="rc r'+s+'" onclick="tRep('+ci+','+mi+');renderRepTab1()">'+sym+'</span></td>';
    });
    r+='<tr>'+
    '<td style="font-weight:700;color:var(--navy)">'+c.id+'</td>'+
    '<td id="rp2-'+ci+'" style="font-weight:600">'+c.prop+'</td>'+
    '<td>'+c.inq+'</td>'+
    '<td id="rv2-'+ci+'" style="font-weight:600">'+fmt(c.valor)+'</td>'+
    cells+
    '<td style="color:var(--ok);font-weight:600">'+fmt(c.valor*.1)+'</td>'+
    '<td id="rf2-'+ci+'">'+( c.forma||'PIX')+'</td>'+
    '<td id="rb2-'+ci+'">'+( c.banco||'-')+'</td>'+
    '<td id="ro2-'+ci+'" style="font-size:10px;color:var(--lm);max-width:60px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">'+( c.obs||'-')+'</td>'+
    '<td><button class="btn btn-sm" style="font-size:10px" onclick="eRep('+ci+')">Editar</button> '+
    '<button class="btn btn-sm" style="background:#fee2e2;color:#991b1b;font-size:10px" onclick="excluirRepasse('+ci+')">Excluir</button></td>'+
    '</tr>';
  });
  var sumRow='<tr class="sum-row"><td colspan="4">TOTAL</td>';
  MES.forEach(function(m,mi){
    var s=ctD.filter(function(c){return c.status!=='Inativo';}).reduce(function(acc,c){return acc+((c.rs&&c.rs[mi]==='R')?c.valor:0);},0);
    sumRow+='<td style="text-align:center;font-size:10px;color:var(--ok)">'+(s>0?'R$'+(s/1000).toFixed(1)+'k':'')+'</td>';
  });
  sumRow+='<td style="color:var(--ok)">'+fmt(tot*.1)+'</td><td colspan="3"></td></tr>';
  
  var panel=document.getElementById('rep-panel-1');
  if(!panel) return;
  panel.innerHTML=
    '<div class="g3" style="margin-top:12px">'+
    '<div class="kc blue"><div class="kc-l">Total/mes</div><div class="kc-v">'+fmt(tot)+'</div></div>'+
    '<div class="kc red"><div class="kc-l">ADM 10%</div><div class="kc-v">'+fmt(tot*.1)+'</div></div>'+
    '<div class="kc gold"><div class="kc-l">Repasse liquido</div><div class="kc-v">'+fmt(tot*.9)+'</div></div></div>'+
    '<div class="card" style="margin-top:12px"><div class="chd"><h3>Repasses 2026</h3><small style="color:var(--lm)">Clique no status para alternar</small></div>'+
    '<div class="tw" style="overflow-x:auto"><table style="min-width:1050px"><thead><tr>'+hdr+'</tr></thead><tbody>'+r+sumRow+'</tbody></table></div>'+
    '<div style="padding:10px 14px;font-size:11px;color:var(--lm);border-top:1px solid #f3f4f6;display:flex;gap:12px">'+
    '<span class="rc rR">&#10003;</span> Recebido &nbsp;<span class="rc rP">1/2</span> Parcial &nbsp;<span class="rc rN">&#10007;</span> Nao recebido &nbsp;<span class="rc rX">-</span> N/A</div></div>';
  ctD.forEach(function(c,ci){
    if(c.status==='Inativo') return;
    (function(idx){
      var ep=document.getElementById('rp2-'+idx); if(ep) ied(ep,c.prop,function(v){ctD[idx].prop=v; salvarTudo();});
      var ev=document.getElementById('rv2-'+idx); if(ev) iedNum(ev,c.valor,function(v){ctD[idx].valor=v; salvarTudo();});
      var ef=document.getElementById('rf2-'+idx); if(ef) ied(ef,c.forma||'PIX',function(v){ctD[idx].forma=v; salvarTudo();});
      var eb=document.getElementById('rb2-'+idx); if(eb) ied(eb,c.banco||'',function(v){ctD[idx].banco=v; salvarTudo();});
      var eo=document.getElementById('ro2-'+idx); if(eo) ied(eo,c.obs||'',function(v){ctD[idx].obs=v; salvarTudo();});
    })(ci);
  });
}
function renderRepTab2(){
  // Reutiliza pFRP mas renderiza no panel-2
  var ativos=ctD.filter(function(c){return c.status!=='Inativo';});
  var inativos=ctD.filter(function(c){return c.status==='Inativo';});
  var tot=ativos.reduce(function(s,c){return s+c.valor;},0);
  var r='';
  ativos.forEach(function(c){
    var i=ctD.indexOf(c);
    var rec=c.rs&&c.rs[new Date().getMonth()]==='R';
    var st=rec?'<span class="badge bg">Recebido</span>':'<span class="badge br">Pendente</span>';
    r+='<tr>'+
    '<td style="font-weight:700">'+c.prop+'</td>'+
    '<td>'+c.inq+'</td>'+
    '<td style="font-weight:600">'+fmt(c.valor)+'</td>'+
    '<td style="color:var(--ok);font-weight:600">'+fmt(c.valor*.1)+'</td>'+
    '<td style="font-weight:700;color:var(--navy)">'+fmt(c.valor*.9)+'</td>'+
    '<td style="text-align:center;font-weight:600">dia '+(c.venc||10)+'</td>'+
    '<td id="frpst2-'+i+'" style="cursor:pointer">'+st+'</td>'+
    '<td id="frpf2-'+i+'">'+( c.forma||'PIX')+'</td>'+
    '<td id="frpb2-'+i+'">'+( c.banco||'-')+'</td>'+
    '<td id="frppix2-'+i+'">'+( c.pix||'-')+'</td>'+
    '<td id="frpobs2-'+i+'" style="font-size:10px;color:var(--lm);cursor:pointer;max-width:70px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">'+( c.obs||'-')+'</td>'+
    '<td style="white-space:nowrap">'+
    (!rec?'<button class="btn btn-xs btn-green" style="display:block;margin-bottom:3px" onclick="marcarRecebidoRep('+i+');renderRepTab2()">✓ Recebido</button>':'')+
    (rec?'<button class="btn btn-xs" style="display:block;background:#dcfce7;color:#166534;margin-bottom:3px" onclick="mFRP('+i+')">💸 Repassar</button>'+
         '<button class="btn btn-xs" style="display:block;background:#fee2e2;color:#991b1b;font-size:10px" onclick="desmarcarRep('+i+');renderRepTab2()">Desfazer</button>':'')+
    '<button class="btn btn-xs" style="display:block;background:#fef9c3;color:#92400e;font-size:10px;margin-top:3px" onclick="inativarCT('+i+')">Inativar</button>'+
    '</td></tr>';
  });
  r+='<tr class="sum-row"><td colspan="2">TOTAL</td><td>'+fmt(tot)+'</td><td>'+fmt(tot*.1)+'</td><td>'+fmt(tot*.9)+'</td><td colspan="7"></td></tr>';
  var panel=document.getElementById('rep-panel-2');
  if(!panel) return;
  panel.innerHTML=
    '<div class="g3" style="margin-top:12px">'+
    '<div class="kc blue"><div class="kc-l">Total aluguel</div><div class="kc-v">'+fmt(tot)+'</div></div>'+
    '<div class="kc red"><div class="kc-l">ADM 10%</div><div class="kc-v">'+fmt(tot*.1)+'</div></div>'+
    '<div class="kc gold"><div class="kc-l">A repassar</div><div class="kc-v">'+fmt(tot*.9)+'</div></div></div>'+
    '<div class="card" style="margin-top:12px"><div class="chd"><h3>Repasses a Proprietários — '+mesAno()+'</h3><small style="color:var(--lm)">Clique nos campos para editar</small></div>'+
    '<div class="tw"><table><thead><tr><th>Proprietário</th><th>Inquilino</th><th>Aluguel</th><th>ADM 10%</th><th>Repasse liq.</th><th>Venc.</th><th>Recebido?</th><th>Forma</th><th>Banco</th><th>PIX/Conta</th><th>Obs</th><th>Ação</th></tr></thead><tbody>'+r+'</tbody></table></div></div>';
  ativos.forEach(function(c){
    (function(i){
      var es=document.getElementById('frpst2-'+i);
      if(es) es.onclick=function(){
        ctD[i].rs=ctD[i].rs||Array(12).fill('N');
        ctD[i].rs[new Date().getMonth()]=(ctD[i].rs[new Date().getMonth()]==='R')?'N':'R';
        salvarTudo(); renderRepTab2();
      };
      var ef=document.getElementById('frpf2-'+i); if(ef) ied(ef,c.forma||'PIX',function(v){ctD[i].forma=v; salvarTudo();});
      var eb=document.getElementById('frpb2-'+i); if(eb) ied(eb,c.banco||'',function(v){ctD[i].banco=v; salvarTudo();});
      var ep=document.getElementById('frppix2-'+i); if(ep) ied(ep,c.pix||'',function(v){ctD[i].pix=v; salvarTudo();});
      var eo=document.getElementById('frpobs2-'+i); if(eo) ied(eo,c.obs||'',function(v){ctD[i].obs=v; salvarTudo();});
    })(ctD.indexOf(c));
  });}

// ===== BOLETOS + ASAAS =====

// Config Asaas — preencher com API Key quando disponível
var ASAAS_KEY = ''; // <-- colocar a API Key do Asaas aqui
var ASAAS_URL = 'https://api.asaas.com/v3'; // produção
// Para sandbox (testes): 'https://sandbox.asaas.com/api/v3'

// ===== PIX LOCAL =====
var CHAVE_PIX = '+5511969197881';
var NOME_PIX = 'REMAX Space';
var CIDADE_PIX = 'Caldas Novas';

function gerarPixPayload(valor, txid, desc){
  txid = (txid||'REMAXSPACE').replace(/[^A-Za-z0-9]/g,'').slice(0,25)||'REMAXSPACE';
  desc = (desc||'Aluguel').replace(/[^a-zA-Z0-9 ]/g,'').slice(0,25);
  var val = parseFloat(valor).toFixed(2);
  function tlv(tag,v){ var s=String(v); return tag+('0'+s.length).slice(-2)+s; }
  var merchant = tlv('00','BR.GOV.BCB.PIX')+tlv('01',CHAVE_PIX)+tlv('02',desc);
  var payload = tlv('00','01')+tlv('26',merchant)+tlv('52','0000')+tlv('53','986')+tlv('54',val)+tlv('58','BR')+tlv('59',NOME_PIX.slice(0,25))+tlv('60',CIDADE_PIX.slice(0,15))+tlv('62',tlv('05',txid))+'6304';
  var crc=0xFFFF;
  for(var i=0;i<payload.length;i++){
    crc^=payload.charCodeAt(i)<<8;
    for(var j=0;j<8;j++){ crc=(crc&0x8000)?((crc<<1)^0x1021)&0xFFFF:(crc<<1)&0xFFFF; }
  }
  return payload+('0000'+crc.toString(16).toUpperCase()).slice(-4);
}

function gerarQrCodePix(valor, txid, desc){
  return 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data='+encodeURIComponent(gerarPixPayload(valor,txid,desc));
}

// ===== MULTA E JUROS =====
var MULTA_PCT = 10;    // 10% de multa
var JUROS_AM  = 1;     // 1% ao mês = 0.0333% ao dia

function calcularEncargos(valor, vencDia, mesRef){
  // Montar data de vencimento
  var meses = ['Janeiro','Fevereiro','Marco','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
  var hoje = new Date();
  // Tentar extrair mes/ano do mesRef (ex: "Junho de 2026")
  var partes = (mesRef||'').split(' de ');
  var nomeMes = partes[0]||'';
  var ano = parseInt(partes[1])||hoje.getFullYear();
  var idxMes = meses.findIndex(function(m){ return nomeMes.toLowerCase().startsWith(m.toLowerCase().slice(0,3)); });
  if(idxMes<0) idxMes = hoje.getMonth();
  var venc = new Date(ano, idxMes, parseInt(vencDia)||10);
  venc.setHours(23,59,59);
  if(hoje <= venc) return {multa:0, juros:0, total:valor, diasAtraso:0, vencimento:venc};
  var diasAtraso = Math.floor((hoje - venc)/(1000*60*60*24));
  var multa = valor * MULTA_PCT / 100;
  var juros = valor * (JUROS_AM/100/30) * diasAtraso;
  var total = valor + multa + juros;
  return {multa:multa, juros:juros, total:total, diasAtraso:diasAtraso, vencimento:venc};
}


function copiarPix(){
  var el = document.getElementById('pix-payload');
  if(el){ el.select(); navigator.clipboard.writeText(el.value).then(function(){ alert('Copiado!'); }); }
}


// ===== RÉGUA DE INADIMPLÊNCIA =====
// Dias antes do vencimento para enviar aviso
var REGUA = {aviso1: 5, aviso2: 2, pos1: 3, pos2: 7, pos3: 15};

// ===== STATUS ASAAS =====
// PENDING = aguardando | RECEIVED = pago | OVERDUE = vencido | REFUNDED = estornado

function statusAsaas(s){
  var m = {
    'PENDING':'<span class="badge by">Aguardando</span>',
    'RECEIVED':'<span class="badge bg">Pago</span>',
    'OVERDUE':'<span class="badge br">Vencido</span>',
    'REFUNDED':'<span class="badge bgr">Estornado</span>',
    'CONFIRMED':'<span class="badge bg">Confirmado</span>'
  };
  return m[s] || '<span class="badge bgr">'+(s||'Pendente')+'</span>';
}

// ===== VERIFICAR SE ASAAS ESTÁ CONFIGURADO =====
function asaasOk(){
  if(!ASAAS_KEY){
    oM('API Key não configurada',
      '<div style="background:#fef9c3;border-radius:10px;padding:16px;margin-bottom:14px">'+
      '<p style="font-weight:700;color:#92400e;margin-bottom:8px">Asaas ainda não conectado</p>'+
      '<p style="font-size:13px;color:#78350f">Para ativar a integração automática, insira sua API Key do Asaas abaixo.</p>'+
      '<p style="font-size:12px;color:#92400e;margin-top:8px">Onde encontrar: <b>Asaas → Configurações → Integrações → API Key</b></p></div>'+
      '<div class="fg"><label>API Key do Asaas</label>'+
      '<input id="ak-input" placeholder="$aact_..." style="font-family:monospace;font-size:12px"></div>'+
      '<div class="fg"><label>Ambiente</label>'+
      '<select id="ak-env"><option value="prod">Produção (conta real)</option><option value="sandbox">Sandbox (testes)</option></select></div>',
      function(){
        var k = document.getElementById('ak-input').value.trim();
        var env = document.getElementById('ak-env').value;
        if(!k){ alert('Informe a API Key'); return; }
        ASAAS_KEY = k;
        ASAAS_URL = env==='sandbox' ? 'https://sandbox.asaas.com/api/v3' : 'https://api.asaas.com/v3';
        salvarTudo();
        registrarLog('ASAAS CONECTADO', 'API Key configurada — ambiente: '+env);
        pBoletos();
      }, 'Salvar e Conectar');
    return false;
  }
  return true;
}

// ===== CRIAR CLIENTE NO ASAAS =====
async function criarClienteAsaas(inq, cpf, email, tel){
  try{
    var resp = await fetch(ASAAS_URL+'/customers', {
      method:'POST',
      headers:{'Content-Type':'application/json','access_token':ASAAS_KEY},
      body: JSON.stringify({name:inq, cpfCnpj:cpf||'', email:email||'', mobilePhone:tel||''})
    });
    var data = await resp.json();
    return data.id || null;
  }catch(e){ console.warn('Erro criar cliente Asaas:', e); return null; }
}

// ===== GERAR COBRANÇA NO ASAAS =====
async function gerarCobrancaAsaas(customerId, valor, vencimento, desc){
  try{
    var resp = await fetch(ASAAS_URL+'/payments', {
      method:'POST',
      headers:{'Content-Type':'application/json','access_token':ASAAS_KEY},
      body: JSON.stringify({
        customer: customerId,
        billingType: 'BOLETO',
        value: valor,
        dueDate: vencimento,
        description: desc,
        externalReference: desc
      })
    });
    var data = await resp.json();
    return data;
  }catch(e){ console.warn('Erro gerar cobrança Asaas:', e); return null; }
}

// ===== CONSULTAR STATUS COBRANÇA =====
async function consultarCobrancaAsaas(paymentId){
  try{
    var resp = await fetch(ASAAS_URL+'/payments/'+paymentId, {
      headers:{'access_token':ASAAS_KEY}
    });
    return await resp.json();
  }catch(e){ return null; }
}

// ===== TELA PRINCIPAL DE BOLETOS =====
function pBoletos(){
  var configBtn = ASAAS_KEY
    ? '<span style="font-size:11px;background:#dcfce7;color:#166534;padding:4px 10px;border-radius:10px;font-weight:600">✓ Asaas Conectado</span>'
    : '<button class="btn btn-sm" style="background:#fef9c3;color:#92400e" onclick="asaasOk()">⚙️ Conectar Asaas</button>';

  document.getElementById('pa').innerHTML =
    '<div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">'+
    '<button class="btn btn-red" onclick="gerarBoletos()">🔄 Gerar Boletos do Mês</button>'+
    '<button class="btn btn-primary" onclick="sincronizarBoletos()" style="background:#059669">↻ Sincronizar Status</button>'+
    '<button class="btn btn-primary" onclick="pLogAcoes()" style="background:#6b7280">📋 Log</button>'+
    configBtn+
    '</div>';

  var r = '';
  if(!boletosD.length){
    r = '<div style="text-align:center;padding:48px 24px;color:var(--lm)">'+
      '<div style="font-size:48px;margin-bottom:14px">📨</div>'+
      '<p style="font-size:15px;font-weight:600;margin-bottom:6px">Nenhum boleto gerado ainda</p>'+
      '<p style="font-size:13px">Clique em <b>Gerar Boletos do Mês</b> para criar os boletos de todos os '+
      ctD.filter(function(c){return c.status!=='Inativo';}).length+' contratos ativos.</p>'+
      (ASAAS_KEY ?
        '<p style="font-size:12px;margin-top:8px;color:#059669">✓ Asaas conectado — boletos serão enviados automaticamente por email/WhatsApp</p>' :
        '<p style="font-size:12px;margin-top:8px;color:#d97706">⚠️ Conecte o Asaas para envio automático</p>')+
      '</div>';
  } else {
    var total = boletosD.reduce(function(s,b){return s+b.valor;},0);
    var pagos = boletosD.filter(function(b){return b.status==='RECEIVED'||b.status==='CONFIRMED'||b.enviado;});
    var vencidos = boletosD.filter(function(b){return b.status==='OVERDUE';});
    var pendentes = boletosD.filter(function(b){return !b.enviado&&b.status!=='RECEIVED'&&b.status!=='CONFIRMED'&&b.status!=='OVERDUE';});

    r = boletosD.map(function(b,i){
      var stBadge = b.asaasId ? statusAsaas(b.status) : (b.enviado ? '<span class="badge bg">Enviado manual</span>' : '<span class="badge by">Pendente</span>');
      var dtEnvio = b.dtEnvio ? '<div style="font-size:10px;color:var(--lm);margin-top:2px">Enviado: '+b.dtEnvio+'</div>' : '';
      var linkBoleto = b.bankSlipUrl ? '<a href="'+b.bankSlipUrl+'" target="_blank" class="btn btn-xs" style="background:#dbeafe;color:#1d4ed8;font-size:10px">📄 Boleto</a> ' : '';
      var pixCode = '<button class="btn btn-xs" style="background:#dcfce7;color:#166534;font-size:10px;font-weight:700" onclick="verPix('+i+')" title="Ver QR Code e copiar PIX">💳 PIX</button> ';

      return '<tr data-status="'+( b.status||'PENDING')+'">'
        +'<td style="font-weight:700;color:var(--navy)">'+b.ctId+'</td>'
        +'<td><div style="font-weight:600">'+b.prop+'</div><div style="font-size:11px;color:var(--lm)">'+b.inq+'</div></td>'
        +'<td style="font-weight:700;text-align:right">'+fmt(b.valor)+'</td>'
        +'<td style="text-align:center"><span id="bl-venc-'+i+'" style="cursor:pointer;font-weight:600;color:var(--navy);border-bottom:1px dashed var(--navy)" title="Clique para editar dia">Dia '+b.venc+'</span></td>'
        +'<td>'+b.mes+'</td>'
        +'<td id="bl-forma-'+i+'" style="font-size:12px;cursor:pointer">'+( b.forma||'WhatsApp')+'</td>'
        +'<td id="bl-obs-'+i+'" style="font-size:11px;color:var(--lm);cursor:pointer;max-width:70px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">'+( b.obs||'—')+'</td>'
        +'<td>'+stBadge+dtEnvio+'</td>'
        +'<td style="white-space:nowrap">'
          +linkBoleto+pixCode
          +'<button class="btn btn-xs" onclick="marcarBoletoEnviado('+i+')" style="font-size:10px;background:'+(b.status==='RECEIVED'||b.status==='CONFIRMED'?'#fee2e2;color:#991b1b':'#dcfce7;color:#166534')+';border:none;border-radius:6px;padding:3px 8px;cursor:pointer;font-weight:600">'+(b.status==='RECEIVED'||b.status==='CONFIRMED'?'↩ Desfazer':'✓ Pago')+'</button> '
          +'<button class="btn btn-xs" style="background:#dbeafe;color:#1d4ed8;font-size:10px;font-weight:700" onclick="imprimirBoleto('+i+')">🖨 Boleto</button> '+'<button class="btn btn-xs" style="background:#f0fdf4;color:#166534;font-size:10px" onclick="enviarWA('+i+')">📱 WA</button>'
        +'</td></tr>';
    }).join('');
  }

  document.getElementById('pc').innerHTML =
    (boletosD.length ?
      '<div class="g4" style="margin-bottom:16px">'+
      '<div class="kc blue"><div class="kc-l">Total boletos</div><div class="kc-v">'+boletosD.length+'</div></div>'+
      '<div class="kc green"><div class="kc-l">Pagos</div><div class="kc-v">'+boletosD.filter(function(b){return b.status==='RECEIVED'||b.status==='CONFIRMED'||b.enviado;}).length+'</div></div>'+
      '<div class="kc red"><div class="kc-l">Vencidos</div><div class="kc-v">'+boletosD.filter(function(b){return b.status==='OVERDUE';}).length+'</div></div>'+
      '<div class="kc warn"><div class="kc-l">Pendentes</div><div class="kc-v">'+boletosD.filter(function(b){return !b.enviado&&b.status!=='RECEIVED'&&b.status!=='CONFIRMED'&&b.status!=='OVERDUE';}).length+'</div></div>'+
      '</div>'
    : '')+
    '<div class="card">'+
    (boletosD.length ?
      '<div class="chd" style="display:flex;justify-content:space-between;align-items:center">'+
      '<h3>Boletos — '+( boletosD[0]&&boletosD[0].mes||'Mês atual')+'</h3>'+
      '<div style="display:flex;gap:8px;align-items:center">'+
      '<select onchange="filtrarBoletos(this.value)" style="border:1.5px solid var(--lb);border-radius:8px;padding:5px 10px;font-size:12px">'+
      '<option value="todos">Todos</option><option value="PENDING">Pendentes</option><option value="RECEIVED">Pagos</option><option value="OVERDUE">Vencidos</option></select>'+
      '<small style="color:var(--lm)">Clique em Forma/Obs para editar</small></div></div>'+
      '<div class="tw"><table><thead><tr>'+
      '<th>CT</th><th>Proprietário / Inquilino</th><th style="text-align:right">Valor</th><th>Venc</th><th>Mês</th>'+
      '<th>Forma</th><th>Obs</th><th>Status</th><th>Ações</th>'+
      '</tr></thead><tbody id="bol-tbody">'+r+'</tbody></table></div>'
    : r)+
    '</div>'+
    // Régua de inadimplência
    '<div class="card" style="margin-top:14px">'+
    '<div class="chd"><h3>Régua de Cobrança Automática</h3></div>'+
    '<div class="cbd">'+
    '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:10px">'+
    '<div style="background:#dbeafe;border-radius:10px;padding:12px;text-align:center"><div style="font-size:11px;color:#1e40af;font-weight:700">5 dias antes</div><div style="font-size:12px;color:#1e3a8a;margin-top:4px">Lembrete de vencimento</div></div>'+
    '<div style="background:#fef9c3;border-radius:10px;padding:12px;text-align:center"><div style="font-size:11px;color:#92400e;font-weight:700">2 dias antes</div><div style="font-size:12px;color:#78350f;margin-top:4px">Aviso urgente</div></div>'+
    '<div style="background:#fee2e2;border-radius:10px;padding:12px;text-align:center"><div style="font-size:11px;color:#991b1b;font-weight:700">3 dias após</div><div style="font-size:12px;color:#7f1d1d;margin-top:4px">Cobrança 1ª</div></div>'+
    '<div style="background:#fee2e2;border-radius:10px;padding:12px;text-align:center"><div style="font-size:11px;color:#991b1b;font-weight:700">7 dias após</div><div style="font-size:12px;color:#7f1d1d;margin-top:4px">Cobrança 2ª</div></div>'+
    '<div style="background:#fce7f3;border-radius:10px;padding:12px;text-align:center"><div style="font-size:11px;color:#9d174d;font-weight:700">15 dias após</div><div style="font-size:12px;color:#831843;margin-top:4px">Notificação jurídica</div></div>'+
    '</div>'+
    '<p style="font-size:11px;color:var(--lm);margin-top:12px">⚡ A régua automática será ativada após conectar o Asaas. Os avisos serão enviados por WhatsApp e email automaticamente.</p>'+
    '</div></div>';

  if(boletosD.length){
    boletosD.forEach(function(b,i){
      (function(idx){
        var ef = document.getElementById('bl-forma-'+idx);
        if(ef) ied(ef, b.forma||'WhatsApp', function(v){boletosD[idx].forma=v; salvarTudo();});
        var eo = document.getElementById('bl-obs-'+idx);
        if(eo) ied(eo, b.obs||'', function(v){boletosD[idx].obs=v; salvarTudo();});
        var ev = document.getElementById('bl-venc-'+idx);
        if(ev) ied(ev, String(boletosD[idx].venc||10), function(v){
          var novoVenc = parseInt(v.replace(/\D/g,''))||boletosD[idx].venc;
          if(novoVenc>=1 && novoVenc<=31){
            boletosD[idx].venc = novoVenc;
            // Sincronizar com contrato vinculado
            var ctIdx = ctD.findIndex(function(c){return c.id===boletosD[idx].ctId;});
            if(ctIdx>=0){ ctD[ctIdx].venc = novoVenc; }
            salvarTudo();
          }
        });
      })(i);
    });
  }
}

function filtrarBoletos(val){
  document.querySelectorAll('#bol-tbody tr').forEach(function(tr){
    tr.style.display = (val==='todos'||tr.dataset.status===val) ? '' : 'none';
  });
}

function gerarBoletos(){
  var mes = new Date().toLocaleString('pt-BR',{month:'long',year:'numeric'});
  mes = mes.charAt(0).toUpperCase()+mes.slice(1);
  var ativos = ctD.filter(function(c){return c.status!=='Inativo';});
  var jaExiste = boletosD.some(function(b){return b.mes===mes;});
  if(jaExiste){
    if(!confirm('Ja existem boletos para '+mes+'. Deseja regenerar?')) return;
    boletosD = boletosD.filter(function(b){return b.mes!==mes;});
  }

  if(ASAAS_KEY){
    // Com Asaas: gerar na API
    gerarBoletosAsaas(ativos, mes);
  } else {
    // Sem Asaas: gerar manualmente
    ativos.forEach(function(c){
      boletosD.push({
        ctId:c.id, prop:c.prop, inq:c.inq, valor:c.valor,
        mes:mes, venc:c.venc||10, enviado:false, dtEnvio:'',
        forma:'WhatsApp', obs:'', status:'PENDING',
        asaasId:'', bankSlipUrl:'', pixQrCode:''
      });
    });
    registrarLog('BOLETOS GERADOS (MANUAL)', mes+' — '+ativos.length+' boletos');
    salvarTudo();
    pBoletos();
  }
}

async function gerarBoletosAsaas(ativos, mes){
  var loading = document.getElementById('pc');
  loading.innerHTML = '<div style="text-align:center;padding:40px"><div class="spinner" style="margin:0 auto 14px"></div><p>Gerando boletos no Asaas...</p></div>';
  var ok = 0, err = 0;
  for(var i=0; i<ativos.length; i++){
    var c = ativos[i];
    // Buscar ou criar cliente
    var inqCadItem = inqCad.find(function(q){return q.ct===c.id;});
    var customerId = inqCadItem && inqCadItem.asaasId ? inqCadItem.asaasId : null;
    if(!customerId){
      customerId = await criarClienteAsaas(c.inq, inqCadItem&&inqCadItem.cpf||'', inqCadItem&&inqCadItem.email||'', inqCadItem&&inqCadItem.tel||'');
      if(customerId && inqCadItem) inqCadItem.asaasId = customerId;
    }
    // Calcular data de vencimento
    var hoje = new Date();
    var ano = hoje.getMonth()>=11 ? hoje.getFullYear()+1 : hoje.getFullYear();
    var mesNum = (hoje.getMonth()+1)%12||12;
    var dataVenc = ano+'-'+(mesNum<10?'0'+mesNum:mesNum)+'-'+(c.venc<10?'0'+c.venc:c.venc);
    var payment = await gerarCobrancaAsaas(
      customerId, c.valor, dataVenc,
      'Aluguel '+mes+' — '+c.id+' — '+c.prop
    );
    if(payment && payment.id){
      boletosD.push({
        ctId:c.id, prop:c.prop, inq:c.inq, valor:c.valor,
        mes:mes, venc:c.venc||10, enviado:false, dtEnvio:'',
        forma:'Asaas (auto)', obs:'', status:payment.status||'PENDING',
        asaasId:payment.id, bankSlipUrl:payment.bankSlipUrl||'',
        pixQrCode:payment.pixQrCodeUrl||''
      });
      ok++;
    } else { err++; }
  }
  registrarLog('BOLETOS GERADOS (ASAAS)', mes+' — '+ok+' ok, '+err+' erros');
  salvarTudo();
  pBoletos();
  if(ok>0) alert('✓ '+ok+' boletos gerados no Asaas com sucesso!'+( err?' ('+err+' com erro)':'')); 
}

async function sincronizarBoletos(){
  if(!ASAAS_KEY){ asaasOk(); return; }
  var atualizados = 0;
  for(var i=0; i<boletosD.length; i++){
    if(boletosD[i].asaasId){
      var data = await consultarCobrancaAsaas(boletosD[i].asaasId);
      if(data && data.status){
        if(data.status !== boletosD[i].status){
          boletosD[i].status = data.status;
          if(data.status==='RECEIVED'||data.status==='CONFIRMED'){
            boletosD[i].enviado = true;
            boletosD[i].dtEnvio = new Date().toLocaleDateString('pt-BR');
            // Sincronizar com repasses
            var ctIdx = ctD.findIndex(function(c){return c.id===boletosD[i].ctId;});
            if(ctIdx>=0){ ctD[ctIdx].rs = ctD[ctIdx].rs||Array(12).fill('N'); ctD[ctIdx].rs[new Date().getMonth()]='R'; }
          }
          atualizados++;
        }
      }
    }
  }
  salvarTudo();
  pBoletos();
  alert('↻ Sincronizado: '+atualizados+' boletos atualizados.');
}

function marcarBoletoEnviado(i){
  var b = boletosD[i];
  if(b.status==='RECEIVED'||b.status==='CONFIRMED'){
    if(!confirm('Desfazer pagamento de '+b.prop+'?')) return;
    b.enviado=false; b.dtEnvio=''; b.status='PENDING';
    var ctIdx=ctD.findIndex(function(c){return c.id===b.ctId;});
    if(ctIdx>=0&&ctD[ctIdx].rs){ctD[ctIdx].rs[new Date().getMonth()]='N';}
    registrarLog('BOLETO DESFEITO',b.ctId+' - '+b.prop);
  } else {
    var agora=new Date();
    b.enviado=true;
    b.dtEnvio=agora.toLocaleDateString('pt-BR')+' '+agora.toLocaleTimeString('pt-BR');
    b.status='RECEIVED';
    var ctIdx=ctD.findIndex(function(c){return c.id===b.ctId;});
    if(ctIdx>=0){ctD[ctIdx].rs=ctD[ctIdx].rs||Array(12).fill('N');ctD[ctIdx].rs[new Date().getMonth()]='R';}
    registrarLog('BOLETO PAGO (MANUAL)',b.ctId+' - '+b.prop+' - '+fmt(b.valor));
  }
  salvarTudo(); pBoletos();
}

function desmarcarBoleto(i){
  boletosD[i].enviado = false;
  boletosD[i].dtEnvio = '';
  boletosD[i].status = 'PENDING';
  salvarTudo();
  pBoletos();
}

function verPix(i){
  var b = boletosD[i];
  var txid = ('REMAX'+(b.ctId||'').replace(/[^A-Z0-9]/g,'')).slice(0,25);
  var enc = calcularEncargos(b.valor, b.venc, b.mes);
  var qrUrl = b.pixQrCode || gerarQrCodePix(enc.total, txid, 'Aluguel');
  var payload = b.pixCopiaECola || gerarPixPayload(enc.total, txid, 'Aluguel');
  window._pixPayloadAtual = payload;
  var encHtml = enc.diasAtraso > 0
    ? '<div style="background:#fef2f2;border-radius:8px;padding:8px 12px;margin-bottom:12px;font-size:12px;color:#991b1b;font-weight:600">⚠️ '+enc.diasAtraso+' dia(s) de atraso — Total: '+fmt(enc.total)+'</div>'
    : '';
  oM('💳 PIX — '+b.inq,
    '<div style="padding:4px 0">'+
    encHtml+
    // Valor destaque
    '<div style="text-align:center;background:linear-gradient(135deg,#f0fdf4,#dcfce7);border-radius:12px;padding:16px;margin-bottom:16px">'+
      '<div style="font-size:11px;color:#6b7280;font-weight:700;letter-spacing:1px;text-transform:uppercase">Valor a pagar</div>'+
      '<div style="font-size:32px;font-weight:900;color:#059669;line-height:1.1">'+fmt(enc.total)+'</div>'+
      '<div style="font-size:11px;color:#6b7280;margin-top:2px">'+b.ctId+' · '+b.prop+' · '+b.mes+'</div>'+
    '</div>'+
    // QR Code
    '<div style="text-align:center;margin-bottom:16px">'+
      '<img src="'+qrUrl+'" style="width:180px;height:180px;border:3px solid #e5e7eb;border-radius:12px">'+
      '<div style="font-size:11px;color:#9ca3af;margin-top:6px">Escaneie com qualquer banco</div>'+
    '</div>'+
    // Separador
    '<div style="display:flex;align-items:center;gap:8px;margin-bottom:16px">'+
      '<div style="flex:1;height:1px;background:#e5e7eb"></div>'+
      '<span style="font-size:11px;color:#9ca3af;font-weight:600">OU USE O CÓDIGO ABAIXO</span>'+
      '<div style="flex:1;height:1px;background:#e5e7eb"></div>'+
    '</div>'+
    // Código copia e cola - clicável
    '<div id="pix-box" onclick="copiarPixModal()" style="cursor:pointer;background:#f8fafc;border:2px dashed #003DA5;border-radius:12px;padding:14px;margin-bottom:12px;transition:all .2s">'+
      '<div style="font-size:10px;color:#003DA5;font-weight:800;letter-spacing:1px;margin-bottom:8px;text-transform:uppercase">📋 Clique para copiar o código PIX</div>'+
      '<div style="font-size:9px;font-family:monospace;word-break:break-all;color:#374151;line-height:1.5;max-height:60px;overflow:hidden">'+payload+'</div>'+
    '</div>'+
    // Botão grande copiar
    '<button id="btn-copiar-pix" onclick="copiarPixModal()" style="width:100%;background:linear-gradient(135deg,#003DA5,#0050cc);color:#fff;border:none;border-radius:12px;padding:14px;font-size:15px;font-weight:800;cursor:pointer;letter-spacing:.3px;box-shadow:0 4px 12px rgba(0,61,165,.3)">'+
      '📋 COPIAR CÓDIGO PIX'+
    '</button>'+
    '<div id="pix-copiado" style="display:none;text-align:center;margin-top:10px;color:#059669;font-weight:700;font-size:13px">✅ Código copiado! Abra seu banco e cole.</div>'+
    '</div>', null, 'Fechar');
}

function copiarPixModal(){
  var payload = window._pixPayloadAtual;
  if(!payload) return;
  var btn = document.getElementById('btn-copiar-pix');
  var ok = document.getElementById('pix-copiado');
  var box = document.getElementById('pix-box');
  function sucesso(){
    if(btn){ btn.style.background='linear-gradient(135deg,#059669,#047857)'; btn.textContent='✅ COPIADO!'; }
    if(ok){ ok.style.display='block'; }
    if(box){ box.style.borderColor='#059669'; box.style.background='#f0fdf4'; }
    setTimeout(function(){
      if(btn){ btn.style.background='linear-gradient(135deg,#003DA5,#0050cc)'; btn.textContent='📋 COPIAR CÓDIGO PIX'; }
    }, 3000);
  }
  if(navigator.clipboard && navigator.clipboard.writeText){
    navigator.clipboard.writeText(payload).then(sucesso).catch(function(){
      var ta=document.createElement('textarea'); ta.value=payload;
      ta.style.cssText='position:fixed;opacity:0;top:0;left:0';
      document.body.appendChild(ta); ta.focus(); ta.select();
      document.execCommand('copy'); document.body.removeChild(ta);
      sucesso();
    });
  } else {
    var ta=document.createElement('textarea'); ta.value=payload;
    ta.style.cssText='position:fixed;opacity:0;top:0;left:0';
    document.body.appendChild(ta); ta.focus(); ta.select();
    document.execCommand('copy'); document.body.removeChild(ta);
    sucesso();
  }
}

function imprimirBoleto(i){
  var b = boletosD[i];
  var txid = ('REMAX'+(b.ctId||'').replace(/[^A-Z0-9]/g,'')).slice(0,25);
  var enc = calcularEncargos(b.valor, b.venc, b.mes);
  var valorTotal = enc.total;
  var payload = b.pixCopiaECola || gerarPixPayload(valorTotal, txid, 'Aluguel');
  var qrUrl = b.pixQrCode || gerarQrCodePix(valorTotal, txid, 'Aluguel');
  var vencFormatado = 'Dia '+b.venc+' de '+b.mes;
  var w = window.open('','_blank','width=800,height=900');
  w.document.write('<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8">'+
    '<title>Boleto '+b.ctId+'</title>'+
    '<style>'+
      'body{font-family:Arial,sans-serif;font-size:12px;color:#1a1a1a;margin:0;padding:20px;background:#fff}'+
      '.topo{background:#0f1a35;color:#fff;padding:14px 20px;border-radius:8px 8px 0 0;display:flex;justify-content:space-between;align-items:center}'+
      '.topo h1{font-size:18px;margin:0;letter-spacing:1px}'+
      '.topo span{font-size:11px;opacity:.8}'+
      '.corpo{border:1px solid #ddd;border-top:none;padding:20px;border-radius:0 0 8px 8px}'+
      '.linha{display:flex;gap:20px;margin-bottom:14px}'+
      '.campo{flex:1}'+
      '.campo label{font-size:10px;color:#888;font-weight:700;text-transform:uppercase;letter-spacing:.5px;display:block;margin-bottom:3px}'+
      '.campo span{font-size:13px;font-weight:600;color:#1a1a1a}'+
      '.valor-box{background:#f0fdf4;border:2px solid #059669;border-radius:8px;padding:12px 20px;text-align:center;margin:16px 0}'+
      '.valor-box .label{font-size:11px;color:#6b7280;font-weight:700}'+
      '.valor-box .valor{font-size:28px;font-weight:900;color:#059669}'+
      '.divider{border:none;border-top:1px dashed #ddd;margin:16px 0}'+
      '.pix-section{display:flex;gap:20px;align-items:flex-start;background:#f9fafb;border-radius:8px;padding:16px;margin-top:16px}'+
      '.pix-qr img{width:130px;height:130px;border:1px solid #e5e7eb;border-radius:6px}'+
      '.pix-info{flex:1}'+
      '.pix-info h3{font-size:13px;color:#0f1a35;margin:0 0 8px;font-weight:800}'+
      '.pix-info p{font-size:11px;color:#6b7280;margin:0 0 8px;line-height:1.5}'+
      '.pix-codigo{background:#fff;border:2px dashed #003DA5;border-radius:8px;padding:10px;font-size:8px;font-family:monospace;word-break:break-all;color:#1e293b;line-height:1.6;cursor:pointer}'+
      '.pix-label-print{font-size:10px;font-weight:700;color:#1e293b;margin:12px 0 4px;display:block}'+
      '.rodape{text-align:center;margin-top:20px;font-size:10px;color:#9ca3af;border-top:1px solid #f3f4f6;padding-top:12px}'+
      '.btn-copiar-pix{display:block;width:100%;background:linear-gradient(135deg,#003DA5,#0050cc);color:#fff;border:none;border-radius:10px;padding:14px;font-size:15px;font-weight:800;cursor:pointer;margin-top:10px;letter-spacing:.3px}'+
      '.btn-copiar-pix:active{background:#002a7a}'+
      '.pix-copiado-ok{display:none;text-align:center;margin-top:10px;color:#059669;font-weight:700;font-size:14px;padding:10px;background:#f0fdf4;border-radius:8px}'+
      '.pix-codigo{background:#fff;border:2px dashed #003DA5;border-radius:8px;padding:10px;font-size:9px;font-family:monospace;word-break:break-all;color:#374151;line-height:1.6;cursor:pointer}'+
      '@media print{body{padding:10px}.no-print{display:none!important}}'+
    '</style></head><body>'+
    '<div class="topo">'+
      '<div><h1>RE/MAX Space</h1><span>Caldas Novas — GO</span></div>'+
      '<div style="text-align:right"><span style="font-size:13px;font-weight:700">COBRANÇA DE ALUGUEL</span><br><span>'+b.ctId+'</span></div>'+
    '</div>'+
    '<div class="corpo">'+
      '<div class="linha">'+
        '<div class="campo"><label>Proprietário</label><span>'+b.prop+'</span></div>'+
        '<div class="campo"><label>Inquilino</label><span>'+b.inq+'</span></div>'+
      '</div>'+
      '<div class="linha">'+
        '<div class="campo"><label>Mês de Referência</label><span>'+b.mes+'</span></div>'+
        '<div class="campo"><label>Vencimento</label><span>'+vencFormatado+'</span></div>'+
        '<div class="campo"><label>Contrato</label><span>'+b.ctId+'</span></div>'+
      '</div>'+
      '<div class="valor-box">'+
        '<div class="label">VALOR DO ALUGUEL</div>'+
        '<div class="valor">'+fmt(b.valor)+'</div>'+
        (enc.diasAtraso>0?
          '<div style="margin-top:8px;font-size:11px;color:#b91c1c">'+
            '<b>⚠️ '+enc.diasAtraso+' dia(s) de atraso</b><br>'+
            'Multa (10%): + '+fmt(enc.multa)+' &nbsp;|&nbsp; Juros (1%a.m.): + '+fmt(enc.juros)+'<br>'+
            '<span style="font-size:14px;font-weight:900">Total com encargos: '+fmt(enc.total)+'</span>'+
          '</div>'
        :
          '<div style="font-size:10px;color:#6b7280;margin-top:6px">Após o vencimento: multa de 10% + juros de 1% a.m.</div>'
        )+
      '</div>'+
      '<hr class="divider">'+
      '<div class="pix-section">'+
        '<div class="pix-qr"><img src="'+qrUrl+'"><div style="text-align:center;font-size:9px;color:#9ca3af;margin-top:4px">Escaneie para pagar</div></div>'+
        '<div class="pix-info">'+
          '<h3>Pagamento via PIX</h3>'+
          '<p>Chave PIX (Itaú):<br><b>+55 11 96919-7881</b></p>'+
          '<span class="pix-label-print">Pix Copia e Cola:</span>'+
          '<div class="pix-codigo" onclick="copiarCodigoPix()" title="Clique para copiar">'+payload+'</div>'+
          '<button class="btn-copiar-pix no-print" onclick="copiarCodigoPix()">📋 COPIAR CÓDIGO PIX</button>'+
          '<div class="pix-copiado-ok no-print" id="pix-ok">✅ Código copiado! Abra seu banco e cole.</div>'+
        '</div>'+
      '</div>'+
      '<div class="rodape">'+
        'RE/MAX Space Consultoria Imobiliária • Caldas Novas — GO • (64) 9 9999-9999<br>'+
        'Este documento é uma cobrança de aluguel emitida pela administradora do imóvel.'+
      '</div>'+
    '</div>'+
    '<div class="no-print" style="text-align:center;margin-top:16px;display:flex;gap:10px;justify-content:center">'+
      '<button onclick="window.print()" style="background:#0f1a35;color:#fff;border:none;border-radius:8px;padding:10px 24px;font-size:13px;font-weight:700;cursor:pointer">🖨️ Imprimir / Salvar PDF</button>'+
    '</div>'+
    '<script>'+
    'var _pc="'+payload.replace(/\\/g,'\\\\').replace(/"/g,'\\"')+'";'+
    'function copiarCodigoPix(){'+
      'var ok=document.getElementById("pix-ok");'+
      'var btn=document.querySelector(".btn-copiar-pix");'+
      'function _ok(){if(ok)ok.style.display="block";if(btn){btn.style.background="#059669";btn.textContent="✅ COPIADO! Cole no seu banco";}setTimeout(function(){if(btn){btn.style.background="";btn.textContent="📋 COPIAR CÓDIGO PIX";}},4000);}'+
      'if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(_pc).then(_ok).catch(function(){_fb();});}else{_fb();}'+
      'function _fb(){var ta=document.createElement("textarea");ta.value=_pc;ta.style.cssText="position:fixed;opacity:0";document.body.appendChild(ta);ta.focus();ta.select();document.execCommand("copy");document.body.removeChild(ta);_ok();}'+
    '}'+
    '<\/script>'+
    '</body></html>');
  w.document.close();
}


function copiarPix(i){
  var b = boletosD[i];
  var txid = ('REMAX'+(b.ctId||'').replace(/[^A-Z0-9]/g,'')).slice(0,25);
  var enc = calcularEncargos(b.valor, b.venc, b.mes);
  var payload = b.pixCopiaECola || gerarPixPayload(enc.total, txid, 'Aluguel');
  if(navigator.clipboard && navigator.clipboard.writeText){
    navigator.clipboard.writeText(payload).then(function(){
      showToast('✅ PIX copiado! Cole no seu banco.');
    }).catch(function(){
      _copiarFallback(payload);
    });
  } else {
    _copiarFallback(payload);
  }
}
function _copiarFallback(txt){
  var ta = document.createElement('textarea');
  ta.value = txt;
  ta.style.position='fixed'; ta.style.opacity='0';
  document.body.appendChild(ta);
  ta.focus(); ta.select();
  try{ document.execCommand('copy'); showToast('✅ PIX copiado! Cole no seu banco.'); }
  catch(e){ showToast('Erro ao copiar. Tente manualmente.'); }
  document.body.removeChild(ta);
}

function showToast(msg){
  var t = document.getElementById('toast-nuvem');
  if(t){ t.textContent=msg; t.style.opacity='1'; setTimeout(function(){t.style.opacity='0';},3000); }
  else { alert(msg); }
}

function enviarWA(i){
  var b = boletosD[i];
  var linkBoleto = b.bankSlipUrl ? '\n\nBoleto: '+b.bankSlipUrl : '';
  var txid = ('REMAX'+(b.ctId||'').replace(/[^A-Z0-9]/g,'')).slice(0,25);
  var enc = calcularEncargos(b.valor, b.venc, b.mes);
  var pixPayload = b.pixCopiaECola || gerarPixPayload(enc.total, txid, 'Aluguel');
  var encInfo = enc.diasAtraso > 0
    ? '\n⚠️ *Em atraso: '+enc.diasAtraso+' dia(s)*\nTotal com encargos: *'+fmt(enc.total)+'*'
    : '';
  var txt = '*RE/MAX Space — Cobrança de Aluguel*\n\n'+
    '📋 Contrato: '+b.ctId+'\n'+
    '👤 Inquilino: '+b.inq+'\n'+
    '🏠 Proprietário: '+b.prop+'\n'+
    '📅 Mês: '+b.mes+' • Venc: Dia '+b.venc+'\n'+
    '💰 Valor: *'+fmt(b.valor)+'*'+encInfo+linkBoleto+
    '\n\n──────────────────────\n'+
    '💳 *PIX COPIA E COLA*\n'+
    pixPayload+
    '\n──────────────────────\n'+
    '_Copie o código acima e cole no seu aplicativo de banco para pagar._\n\n'+
    '_RE/MAX Space • Caldas Novas GO_';
  window.open('https://wa.me/?text='+encodeURIComponent(txt),'_blank');
}

// ===== REAJUSTE AUTOMÁTICO =====
var INDICES = {
  'IGP-M': {'2024-01':0.07,'2024-02':0.38,'2024-03':0.47,'2024-04':0.31,'2024-05':0.40,
             '2024-06':0.78,'2024-07':0.61,'2024-08':0.29,'2024-09':0.62,'2024-10':1.52,
             '2024-11':1.30,'2024-12':0.76,'2025-01':0.25,'2025-02':1.06,'2025-03':0.18,
             '2025-04':0.35,'2025-05':0.91,'2025-06':0.87,'2025-07':0.65,'2025-08':0.50,
             '2025-09':0.72,'2025-10':1.10,'2025-11':0.89,'2025-12':0.54},
  'IPCA':  {'2024-01':0.42,'2024-02':0.83,'2024-03':0.16,'2024-04':0.38,'2024-05':0.46,
             '2024-06':0.20,'2024-07':0.38,'2024-08':-0.02,'2024-09':0.44,'2024-10':0.56,
             '2024-11':0.39,'2024-12':0.52,'2025-01':0.16,'2025-02':1.31,'2025-03':0.56,
             '2025-04':0.43,'2025-05':0.37,'2025-06':0.24,'2025-07':0.30,'2025-08':0.44,
             '2025-09':0.53,'2025-10':0.56,'2025-11':0.39,'2025-12':0.52}
};

function calcReajuste(indice, dataInicio, dataFim){
  var idx = INDICES[indice] || INDICES['IGP-M'];
  var acum = 1.0;
  var d1 = new Date(dataInicio);
  var d2 = new Date(dataFim);
  var cur = new Date(d1);
  while(cur <= d2){
    var key = cur.getFullYear()+'-'+(cur.getMonth()<9?'0':'')+(cur.getMonth()+1);
    var taxa = idx[key] || 0;
    acum *= (1 + taxa/100);
    cur.setMonth(cur.getMonth()+1);
  }
  return ((acum - 1) * 100).toFixed(2);
}

function pReajustes(){
  var hoje = new Date();
  var anoAtual = hoje.getFullYear();
  var rows = ctD.filter(function(c){return c.status!=='Inativo';}).map(function(c,i){
    var idx = ctD.indexOf(c);
    // Verificar se completa 12 meses em breve
    var inicio = new Date(c.inicio||'2024-01-01');
    var anoAniversario = inicio.getFullYear() + Math.ceil((anoAtual - inicio.getFullYear()));
    var dataAniversario = new Date(anoAniversario, inicio.getMonth(), inicio.getDate());
    var diasParaAniversario = Math.round((dataAniversario - hoje) / 86400000);
    if(diasParaAniversario < 0) { anoAniversario++; dataAniversario.setFullYear(anoAniversario); diasParaAniversario = Math.round((dataAniversario - hoje) / 86400000); }
    var indice = c.indice || 'IGP-M';
    var dataBase = new Date(dataAniversario); dataBase.setFullYear(dataBase.getFullYear()-1);
    var pct = calcReajuste(indice, dataBase.toISOString().split('T')[0], dataAniversario.toISOString().split('T')[0]);
    var valorNovo = (c.valor * (1 + parseFloat(pct)/100)).toFixed(2);
    var urgente = diasParaAniversario <= 30;
    var badge = urgente ? '<span class="badge br">'+diasParaAniversario+' dias</span>' : '<span class="badge by">'+diasParaAniversario+' dias</span>';
    return '<tr style="'+(urgente?'background:#fff5f5':'')+'">'
      +'<td style="font-weight:700">'+c.id+'</td>'
      +'<td>'+c.prop+'</td>'
      +'<td>'+c.inq+'</td>'
      +'<td style="font-weight:600">'+fmt(c.valor)+'</td>'
      +'<td><select onchange="ctD['+idx+'].indice=this.value;pReajustes()" style="border:1px solid var(--lb);border-radius:6px;padding:3px 6px;font-size:11px">'
      +'<option value="IGP-M" '+(indice==='IGP-M'?'selected':'')+'>IGP-M</option>'
      +'<option value="IPCA" '+(indice==='IPCA'?'selected':'')+'>IPCA</option>'
      +'<option value="FIXO" '+(indice==='FIXO'?'selected':'')+'>Fixo 10%</option>'
      +'</select></td>'
      +'<td style="font-weight:700;color:var(--ok)">+'+pct+'%</td>'
      +'<td style="font-weight:700;color:var(--navy)">'+fmt(parseFloat(valorNovo))+'</td>'
      +'<td>'+badge+'</td>'
      +'<td>'+dataAniversario.toLocaleDateString('pt-BR')+'</td>'
      +'<td><button class="btn btn-xs btn-green" onclick="aplicarReajuste('+idx+','+valorNovo+',\''+pct+'\')">Aplicar</button></td>'
      +'</tr>';
  }).join('');
  var vencendo = ctD.filter(function(c){
    if(c.status==='Inativo') return false;
    var inicio = new Date(c.inicio||'2024-01-01');
    var anoAtual = new Date().getFullYear();
    var aniversario = new Date(anoAtual, inicio.getMonth(), inicio.getDate());
    var dias = Math.round((aniversario - new Date()) / 86400000);
    if(dias < 0) { aniversario.setFullYear(anoAtual+1); dias = Math.round((aniversario - new Date()) / 86400000); }
    return dias <= 30;
  }).length;
  document.getElementById('pc').innerHTML =
    '<div class="g3" style="margin-bottom:16px">'
    +'<div class="kc blue"><div class="kc-l">Contratos para reajuste</div><div class="kc-v">'+ctD.filter(function(c){return c.status!=='Inativo';}).length+'</div></div>'
    +'<div class="kc red"><div class="kc-l">Reajuste em 30 dias</div><div class="kc-v">'+vencendo+'</div></div>'
    +'<div class="kc green"><div class="kc-l">Índice padrão</div><div class="kc-v" style="font-size:18px">IGP-M</div></div>'
    +'</div>'
    +'<div class="card"><div class="chd"><h3>Calculadora de Reajuste</h3><small style="color:var(--lm)">Selecione o índice e clique em Aplicar para atualizar o valor do contrato</small></div>'
    +'<div class="tw"><table><thead><tr><th>CT</th><th>Proprietário</th><th>Inquilino</th><th>Valor Atual</th><th>Índice</th><th>Variação</th><th>Novo Valor</th><th>Aniversário</th><th>Data</th><th>Ação</th></tr></thead><tbody>'
    +rows+'</tbody></table></div></div>';
}

function aplicarReajuste(i, novoValor, pct){
  var c = ctD[i];
  oM('Aplicar Reajuste — '+c.id,
    '<div style="background:#f0fdf4;border-radius:10px;padding:16px;margin-bottom:14px">'
    +'<p style="font-size:13px">Contrato: <b>'+c.id+'</b> — '+c.prop+' / '+c.inq+'</p>'
    +'<p style="font-size:13px;margin-top:6px">Valor atual: <b>'+fmt(c.valor)+'</b></p>'
    +'<p style="font-size:15px;font-weight:700;color:var(--ok);margin-top:6px">Novo valor: '+fmt(novoValor)+' (+'+pct+'%)</p>'
    +'</div>'
    +'<div class="fg"><label>Data de vigência</label><input type="date" id="raj-dt" value="'+new Date().toISOString().split('T')[0]+'"></div>'
    +'<div class="fg"><label>Observação</label><input id="raj-obs" placeholder="Ex: Reajuste anual IGP-M"></div>',
    function(){
      var dt = document.getElementById('raj-dt').value;
      var obs = document.getElementById('raj-obs').value;
      ctD[i].valorAnterior = ctD[i].valor;
      ctD[i].valor = parseFloat(novoValor);
      ctD[i].ultimoReajuste = dt;
      ctD[i].obs = (ctD[i].obs?ctD[i].obs+' | ':'')+'Reajuste '+pct+'% em '+dt+(obs?' — '+obs:'');
      registrarLog('REAJUSTE APLICADO', c.id+' — de '+fmt(c.valor)+' para '+fmt(novoValor)+' (+'+pct+'%)');
      salvarTudo();
      cM();
      pReajustes();
    });
}


// ===== EXTRATO DO PROPRIETÁRIO =====
function filtrarExtrato(){
  selPropExtrato=document.getElementById('ext-p').value;
  pExtrato(parseInt(document.getElementById('ext-m').value),parseInt(document.getElementById('ext-a').value));
}

// ===== DESCONTOS AUTORIZADOS =====
function getDescontos(prop, mes, ano){
  var key = 'desc_'+prop.replace(/[^a-z0-9]/gi,'_')+'_'+ano+'_'+mes;
  return JSON.parse(localStorage.getItem(key)||'[]');
}
function saveDescontos(prop, mes, ano, lista){
  var key = 'desc_'+prop.replace(/[^a-z0-9]/gi,'_')+'_'+ano+'_'+mes;
  localStorage.setItem(key, JSON.stringify(lista));
}
function totalDescontos(prop, mes, ano){
  return getDescontos(prop,mes,ano).reduce(function(s,d){return s+(d.valor||0);},0);
}

function abrirDescontos(prop, mes, ano, totalBruto, totalAdm){
  var lista = getDescontos(prop, mes, ano);
  var meses = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
  var tipos = ['Conserto/Reparo','IPTU','Condomínio','Seguro','Taxa de Administração Extra','Multa','Outros'];

  function renderLista(){
    var lista2 = getDescontos(prop, mes, ano);
    var total = lista2.reduce(function(s,d){return s+(d.valor||0);},0);
    var liq = (totalBruto * 0.9) - total;
    var rows = '';
    lista2.forEach(function(d,i){
      var autTxt = d.autorizado ? 'Autorizado' : 'Pendente';
      var autBg = d.autorizado ? 'background:#f0fdf4;color:#1a6e3a' : 'background:#fffbeb;color:#b45309';
      rows += "<tr style=\"border-bottom:1px solid #f4f6f8\">";
      rows += "<td style=\"padding:8px 12px;font-size:12px;font-weight:600;color:#0d1829\">" + d.tipo + "</td>";
      rows += "<td style=\"padding:8px 12px;font-size:12px;color:#4a5568\">" + d.desc + "</td>";
      rows += "<td style=\"padding:8px 12px;font-size:12px;color:#4a5568\">" + d.data + "</td>";
      rows += "<td style=\"padding:8px 12px;font-weight:700;color:#b91c1c;text-align:right\">- " + fmt(d.valor) + "</td>";
      rows += "<td style=\"padding:8px 12px;text-align:center\"><span style=\"font-size:10px;font-weight:700;padding:2px 8px;border-radius:4px;" + autBg + "\">" + autTxt + "</span></td>";
      rows += "<td style=\"padding:8px 12px;text-align:center\"><button class=\"btn-rm-desc\" data-i=\"" + i + "\" style=\"background:#fef2f2;color:#b91c1c;border:none;border-radius:6px;padding:3px 8px;font-size:11px;cursor:pointer\">Remover</button></td>";
      rows += "</tr>";
    });


    var mb = document.getElementById('desc-container');
    if(!mb) return;
    mb.innerHTML =
      '<div style="margin-bottom:16px">'+
        '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:16px">'+
          '<div style="background:#f0fdf4;border-radius:10px;padding:12px;text-align:center">'+
            '<div style="font-size:10px;color:#4a5568;font-weight:700;text-transform:uppercase;letter-spacing:1px">Aluguel Bruto</div>'+
            '<div style="font-size:18px;font-weight:800;color:#1a6e3a">'+fmt(totalBruto)+'</div>'+
          '</div>'+
          '<div style="background:#fef2f2;border-radius:10px;padding:12px;text-align:center">'+
            '<div style="font-size:10px;color:#4a5568;font-weight:700;text-transform:uppercase;letter-spacing:1px">Total Descontos</div>'+
            '<div style="font-size:18px;font-weight:800;color:#b91c1c">- '+fmt(total)+'</div>'+
          '</div>'+
          '<div style="background:#eff6ff;border-radius:10px;padding:12px;text-align:center">'+
            '<div style="font-size:10px;color:#4a5568;font-weight:700;text-transform:uppercase;letter-spacing:1px">Repasse Líquido</div>'+
            '<div style="font-size:18px;font-weight:800;color:#0d1f4e">'+fmt(Math.max(0,liq))+'</div>'+
          '</div>'+
        '</div>'+
        (lista2.length?
          '<div style="overflow-x:auto;margin-bottom:16px"><table style="width:100%;border-collapse:collapse">'+
            '<thead><tr style="background:#fafbfd">'+
              '<th style="padding:8px 12px;font-size:10px;font-weight:800;color:#4a5568;text-align:left;text-transform:uppercase">Tipo</th>'+
              '<th style="padding:8px 12px;font-size:10px;font-weight:800;color:#4a5568;text-align:left;text-transform:uppercase">Descrição</th>'+
              '<th style="padding:8px 12px;font-size:10px;font-weight:800;color:#4a5568;text-align:left;text-transform:uppercase">Data</th>'+
              '<th style="padding:8px 12px;font-size:10px;font-weight:800;color:#4a5568;text-align:right;text-transform:uppercase">Valor</th>'+
              '<th style="padding:8px 12px;font-size:10px;font-weight:800;color:#4a5568;text-align:center;text-transform:uppercase">Status</th>'+
              '<th></th>'+
            '</tr></thead>'+
            '<tbody>'+rows+'</tbody>'+
          '</table></div>':
          '<div style="text-align:center;padding:16px;color:#94a3b8;font-size:12px;margin-bottom:16px">Nenhum desconto lançado para '+meses[mes]+'/'+ano+'</div>')+
        '<div style="background:#fafbfd;border-radius:12px;padding:16px;border:1px solid #e8edf2">'+
          '<div style="font-size:11px;font-weight:800;color:#0d1f4e;letter-spacing:1px;text-transform:uppercase;margin-bottom:12px">+ Adicionar Desconto</div>'+
          '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:10px">'+
            '<div><label style="font-size:11px;font-weight:600;color:#4a5568;display:block;margin-bottom:4px">Tipo</label>'+
              '<select id="desc-tipo" style="width:100%;padding:8px 10px;border:1px solid #e2e8f0;border-radius:8px;font-size:12px">'+
                tipos.map(function(t){return '<option>'+t+'</option>';}).join('')+
              '</select></div>'+
            '<div><label style="font-size:11px;font-weight:600;color:#4a5568;display:block;margin-bottom:4px">Valor (R$)</label>'+
              '<input id="desc-valor" type="number" placeholder="0,00" style="width:100%;padding:8px 10px;border:1px solid #e2e8f0;border-radius:8px;font-size:12px;box-sizing:border-box"></div>'+
          '</div>'+
          '<div style="display:grid;grid-template-columns:2fr 1fr;gap:10px;margin-bottom:10px">'+
            '<div><label style="font-size:11px;font-weight:600;color:#4a5568;display:block;margin-bottom:4px">Descrição / Observação</label>'+
              '<input id="desc-desc" type="text" placeholder="Ex: Conserto do chuveiro autorizado em 15/05" style="width:100%;padding:8px 10px;border:1px solid #e2e8f0;border-radius:8px;font-size:12px;box-sizing:border-box"></div>'+
            '<div><label style="font-size:11px;font-weight:600;color:#4a5568;display:block;margin-bottom:4px">Data</label>'+
              '<input id="desc-data" type="date" value="'+new Date().toISOString().slice(0,10)+'" style="width:100%;padding:8px 10px;border:1px solid #e2e8f0;border-radius:8px;font-size:12px;box-sizing:border-box"></div>'+
          '</div>'+
          '<div style="display:flex;align-items:center;gap:10px;margin-bottom:12px">'+
            '<input id="desc-aut" type="checkbox" checked style="width:16px;height:16px;cursor:pointer">'+
            '<label for="desc-aut" style="font-size:12px;color:#4a5568;cursor:pointer">Proprietário autorizou este desconto</label>'+
          '</div>'+
          '<button id="btn-add-desc" style="background:#0d1f4e;color:#fff;border:none;border-radius:8px;padding:10px 20px;font-size:13px;font-weight:700;cursor:pointer;width:100%">+ Lançar Desconto</button>'+
        '</div>'+
      '</div>';
  }

  oM('💰 Descontos Autorizados — '+prop+' · '+meses[mes]+'/'+ano,
    '<div id="desc-container"></div>', null, null, true);
  
  setTimeout(function(){
    renderLista();
    // Event delegation para botões remover
    // Botão adicionar desconto
    setTimeout(function(){
      var btnAdd = document.getElementById('btn-add-desc');
      if(btnAdd) btnAdd.onclick = function(){ addDesconto(prop, mes, ano); };
    }, 100);
    var mb2=document.getElementById('desc-container');
    if(mb2) mb2.addEventListener('click', function(e){
      var btn=e.target.closest('.btn-rm-desc');
      if(btn){
        var idx=parseInt(btn.dataset.i);
        if(!confirm('Remover este desconto?')) return;
        var lista=getDescontos(prop,mes,ano);
        lista.splice(idx,1);
        saveDescontos(prop,mes,ano,lista);
        var contratos=ctD.filter(function(c){return c.prop===prop&&c.status!=='Inativo';});
        var tb=contratos.reduce(function(s,c){return s+c.valor;},0);
        abrirDescontos(prop,mes,ano,tb,tb*.1);
      }
    });
  }, 50);
  window._descProp=prop; window._descMes=mes; window._descAno=ano;
}

function addDesconto(prop, mes, ano){
  var tipo=(document.getElementById('desc-tipo')||{value:''}).value;
  var valor=parseFloat((document.getElementById('desc-valor')||{value:0}).value)||0;
  var desc=(document.getElementById('desc-desc')||{value:''}).value;
  var data=(document.getElementById('desc-data')||{value:''}).value;
  var aut=(document.getElementById('desc-aut')||{checked:true}).checked;
  if(!valor||valor<=0){alert('Informe o valor do desconto.');return;}
  var lista=getDescontos(prop,mes,ano);
  lista.push({tipo:tipo,valor:valor,desc:desc,data:data,autorizado:aut});
  saveDescontos(prop,mes,ano,lista);
  // Reabrir para atualizar
  var contratos=ctD.filter(function(c){return c.prop===prop&&c.status!=='Inativo';});
  var tb=contratos.reduce(function(s,c){return s+c.valor;},0);
  abrirDescontos(prop,mes,ano,tb,tb*.1);
}

// removerDesconto movida para event delegation


function pExtrato(selMes, selAno){
  var hoje = new Date();
  var mesAtual = (selMes!==undefined) ? selMes : hoje.getMonth();
  var anoAtual = (selAno!==undefined) ? selAno : hoje.getFullYear();
  var meses = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];

  // Filtro de proprietário
  var propFilt = (typeof selPropExtrato !== 'undefined' && selPropExtrato) ? selPropExtrato : '';

  // Selector de mês/ano
  var mOpts = meses.map(function(m,i){
    return '<option value="'+i+'"'+(i===mesAtual?' selected':'')+'>'+m+'</option>';
  }).join('');
  var aOpts = [2024,2025,2026,2027].map(function(a){
    return '<option value="'+a+'"'+(a===anoAtual?' selected':'')+'>'+a+'</option>';
  }).join('');

  var propList = {};
  ctD.filter(function(c){return c.status!=='Inativo';}).forEach(function(c){
    if(!propList[c.prop]) propList[c.prop] = [];
    propList[c.prop].push(c);
  });
  var props = Object.keys(propList).sort().filter(function(p){ return !propFilt||p===propFilt; });
  var allProps = Object.keys(propList).sort();

  var propOpts = '<option value="">Todos proprietários</option>'+allProps.map(function(p){
    return '<option value="'+p+'"'+(p===propFilt?' selected':'')+'>'+p+'</option>';
  }).join('');

  document.getElementById('pa').innerHTML = '';

  var cards = props.map(function(prop){
    var contratos = propList[prop];
    var totalBruto = contratos.reduce(function(s,c){return s+c.valor;},0);
    var totalAdm = totalBruto * 0.10;
    var totalLiq = totalBruto * 0.90;
    var recebidos = contratos.filter(function(c){return c.rs&&c.rs[mesAtual]==='R';}).length;

    var rows = contratos.map(function(c){
      var st = c.rs&&c.rs[mesAtual]==='R'
        ? '<span class="badge bg">Recebido</span>'
        : '<span class="badge br">Pendente</span>';
      return '<tr>'
        +'<td>'+c.id+'</td>'
        +'<td>'+c.inq+'</td>'
        +'<td>'+c.tipo+'</td>'
        +'<td style="text-align:right">'+fmt(c.valor)+'</td>'
        +'<td style="text-align:right;color:var(--ok)">'+fmt(c.valor*.9)+'</td>'
        +'<td style="text-align:center">dia '+c.venc+'</td>'
        +'<td>'+st+'</td>'
        +'</tr>';
    }).join('');

    var hist = meses.map(function(m,mi){
      var rec = contratos.filter(function(c){return c.rs&&c.rs[mi]==='R';});
      var val = rec.reduce(function(s,c){return s+c.valor*.9;},0);
      var pct = totalLiq>0?Math.round(val/totalLiq*100):0;
      return '<div style="text-align:center">'
        +'<div style="background:'+(mi===mesAtual?'#003DA5':'#93c5fd')+';width:22px;height:'+Math.max(3,pct)+'px;border-radius:3px 3px 0 0;margin:0 auto"></div>'
        +'<div style="font-size:8px;color:var(--lm);margin-top:2px">'+m+'</div>'
        +'</div>';
    }).join('');

    return '<div class="card" style="margin-bottom:16px">'
      +'<div class="chd" style="background:#0f1a35;color:#fff;border-radius:12px 12px 0 0">'
      +'<div style="display:flex;justify-content:space-between;align-items:center">'
      +'<div><h3 style="color:#fff;font-size:16px">'+prop+'</h3>'
      +'<div style="font-size:11px;opacity:.7">'+contratos.length+' contrato(s) — '+meses[mesAtual]+'/'+anoAtual+'</div></div>'
      +'<div style="display:flex;gap:8px">'
      +'<button onclick="abrirDescontos(\''+prop+'\',' +mesAtual+','+anoAtual+','+totalBruto+','+totalAdm+')" style="background:rgba(255,255,255,.15);color:#fff;border:none;border-radius:8px;padding:7px 14px;font-size:12px;cursor:pointer">💸 Descontos</button>'
      +'<button class="btn-extrato-wa" data-prop="'+prop+'" style="background:rgba(255,255,255,.15);color:#fff;border:none;border-radius:8px;padding:7px 14px;font-size:12px;cursor:pointer">📱 WhatsApp</button>'
      +'<button class="btn-extrato-pdf" data-prop="'+prop+'" style="background:#D42028;color:#fff;border:none;border-radius:8px;padding:7px 14px;font-size:12px;cursor:pointer">📄 PDF</button>'
      +'</div></div></div>'
      +'<div class="cbd">'
      +'<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:14px">'
      +'<div style="background:#f0fdf4;border-radius:8px;padding:10px;text-align:center"><div style="font-size:10px;color:var(--lm)">Aluguel bruto</div><div style="font-size:16px;font-weight:700;color:#166534">'+fmt(totalBruto)+'</div></div>'
      +'<div style="background:#fef2f2;border-radius:8px;padding:10px;text-align:center"><div style="font-size:10px;color:var(--lm)">ADM 10%</div><div style="font-size:16px;font-weight:700;color:#dc2626">'+fmt(totalAdm)+'</div></div>'
      +'<div style="background:#eff6ff;border-radius:8px;padding:10px;text-align:center"><div style="font-size:10px;color:var(--lm)">Repasse líq.</div><div style="font-size:16px;font-weight:700;color:#1d4ed8">'+fmt(totalLiq)+'</div></div>'
      +'<div style="background:#fefce8;border-radius:8px;padding:10px;text-align:center"><div style="font-size:10px;color:var(--lm)">Status</div><div style="font-size:13px;font-weight:700">'+recebidos+'/'+contratos.length+'<span style="font-size:10px;color:var(--lm)"> rec.</span></div></div>'
      +'</div>'
      +'<div class="tw"><table><thead><tr><th>CT</th><th>Inquilino</th><th>Tipo</th><th style="text-align:right">Aluguel</th><th style="text-align:right">Repasse</th><th>Venc</th><th>Status</th></tr></thead><tbody>'+rows+'</tbody></table></div>'
      +'<div style="margin-top:12px"><div style="font-size:11px;color:var(--lm);margin-bottom:6px;font-weight:600">Histórico de repasses '+anoAtual+'</div>'
      +'<div style="display:flex;align-items:flex-end;gap:3px;height:60px">'+hist+'</div></div>'
      +'</div></div>';
  }).join('');

  var totalRep = ctD.filter(function(c){return c.status!=='Inativo';}).reduce(function(s,c){return s+c.valor*.9;},0);
  var totalAdmG = ctD.filter(function(c){return c.status!=='Inativo';}).reduce(function(s,c){return s+c.valor*.1;},0);

  document.getElementById('pc').innerHTML =
    '<div style="background:#fff;border:1px solid var(--lb);border-radius:12px;padding:12px 14px;margin-bottom:14px;display:flex;gap:10px;flex-wrap:wrap;align-items:center">'
    +'<div style="font-size:12px;font-weight:700;color:var(--lm)">FILTRAR:</div>'
    +'<select class="sinp" id="ext-m" style="width:100px">'+mOpts+'</select>'
    +'<select class="sinp" id="ext-a" style="width:80px">'+aOpts+'</select>'
    +'<select class="sinp" id="ext-p" style="width:200px">'+propOpts+'</select>'
    +'<button class="btn btn-primary" onclick="filtrarExtrato()">Filtrar</button>'
    +'</div>'
    +'<div class="g3" style="margin-bottom:16px">'
    +'<div class="kc blue"><div class="kc-l">Proprietários</div><div class="kc-v">'+props.length+'</div></div>'
    +'<div class="kc green"><div class="kc-l">Total repasses/mês</div><div class="kc-v">'+fmt(totalRep)+'</div></div>'
    +'<div class="kc gold"><div class="kc-l">ADM total/mês</div><div class="kc-v">'+fmt(totalAdmG)+'</div></div>'
    +'</div>'
    +cards;

  document.querySelectorAll('.btn-extrato-wa').forEach(function(btn){
    btn.onclick = function(){ gerarExtratoWA(this.dataset.prop, mesAtual, anoAtual); };
  });
  document.querySelectorAll('.btn-extrato-pdf').forEach(function(btn){
    btn.onclick = function(){ gerarExtratoPDF(this.dataset.prop, mesAtual, anoAtual); };
  });
}
var selPropExtrato = '';

function gerarExtratoWA(prop){
  var contratos = ctD.filter(function(c){return c.prop===prop&&c.status!=='Inativo';});
  var total = contratos.reduce(function(s,c){return s+c.valor;},0);
  var hoje = new Date();
  var mes = hoje.toLocaleString('pt-BR',{month:'long',year:'numeric'});
  var linhas = ['*RE/MAX Space - Extrato de Repasse*','','Proprietario: *'+prop+'*','Competencia: *'+mes.charAt(0).toUpperCase()+mes.slice(1)+'*',''];
  contratos.forEach(function(c){
    var st = c.rs&&c.rs[hoje.getMonth()]==='R'?'Recebido':'Pendente';
    linhas.push('CT '+c.id+' - '+c.inq);
    linhas.push('Aluguel: '+fmt(c.valor));
    linhas.push('Repasse 90%: *'+fmt(c.valor*.9)+'*');
    linhas.push('Status: '+st);
    linhas.push('');
  });
  linhas.push('Total bruto: '+fmt(total));
  linhas.push('ADM 10%: '+fmt(total*.1));
  linhas.push('*Repasse total: '+fmt(total*.9)+'*');
  linhas.push('');
  linhas.push('_RE/MAX Space - Caldas Novas GO_');
  linhas.push('_CRECI 41.377-J_');
  var txt = linhas.join('\n');
  window.open('https://wa.me/?text='+encodeURIComponent(txt),'_blank');
}

function gerarExtratoPDF(prop, mesParam, anoParam){
  var hoje = new Date();
  var mesAtual = (mesParam !== undefined) ? mesParam : hoje.getMonth();
  var anoAtual = (anoParam !== undefined) ? anoParam : hoje.getFullYear();
  var meses = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
  var mesesAbr = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
  var mesNome = meses[mesAtual];
  var contratos = ctD.filter(function(c){ return c.prop===prop && c.status!=='Inativo'; });
  if(!contratos.length){ alert('Nenhum contrato ativo para '+prop); return; }

  var totalBruto = contratos.reduce(function(s,c){ return s+c.valor; }, 0);
  var totalAdm = totalBruto * 0.10;
  var totalLiq = totalBruto * 0.90;
  var recebidos = contratos.filter(function(c){ return c.rs && c.rs[mesAtual]==='R'; });
  var totalRec = recebidos.reduce(function(s,c){ return s+c.valor*.9; }, 0);

  // Descontos do mês
  var descKey = prop+'_'+mesAtual+'_'+anoAtual;
  var descs = (typeof descontosExtra!=='undefined' && descontosExtra[descKey]) ? descontosExtra[descKey] : [];
  var totalDesc = descs.reduce(function(s,d){ return s+d.valor; }, 0);
  var totalFinal = totalLiq - totalDesc;

  // Rows de contratos
  var rows = contratos.map(function(c){
    var st = c.rs && c.rs[mesAtual]==='R';
    var stTag = st
      ? '<span style="background:#dcfce7;color:#16a34a;padding:3px 10px;border-radius:20px;font-size:10px;font-weight:700">✓ Recebido</span>'
      : '<span style="background:#fee2e2;color:#dc2626;padding:3px 10px;border-radius:20px;font-size:10px;font-weight:700">⚠ Pendente</span>';
    return '<tr>'+
      '<td style="padding:9px 12px;font-weight:600;color:#1e293b">'+c.id+'</td>'+
      '<td style="padding:9px 12px">'+c.inq+'</td>'+
      '<td style="padding:9px 12px">'+c.tipo+'</td>'+
      '<td style="padding:9px 12px">'+c.end+'</td>'+
      '<td style="padding:9px 12px;text-align:center">Dia '+c.venc+'</td>'+
      '<td style="padding:9px 12px;text-align:right;font-weight:600">R$ '+c.valor.toLocaleString("pt-BR",{minimumFractionDigits:2})+'</td>'+
      '<td style="padding:9px 12px;text-align:right;color:#16a34a;font-weight:700">R$ '+(c.valor*.9).toLocaleString("pt-BR",{minimumFractionDigits:2})+'</td>'+
      '<td style="padding:9px 12px;text-align:center">'+stTag+'</td>'+
      '</tr>';
  }).join('');

  // Rows de descontos
  var descRows = descs.length ? descs.map(function(d){
    return '<tr><td colspan="6" style="padding:8px 12px;color:#dc2626">'+d.desc+'</td>'+
      '<td style="padding:8px 12px;text-align:right;color:#dc2626;font-weight:600">- R$ '+d.valor.toLocaleString("pt-BR",{minimumFractionDigits:2})+'</td><td></td></tr>';
  }).join('') : '';

  // Histórico 12 meses
  var histRows = mesesAbr.map(function(m,mi){
    var rec = contratos.filter(function(c){ return c.rs && c.rs[mi]==='R'; });
    var val = rec.reduce(function(s,c){ return s+c.valor*.9; }, 0);
    var pct = totalLiq > 0 ? Math.round(val/totalLiq*100) : 0;
    var isCurrent = mi === mesAtual;
    return '<tr style="background:'+(mi%2===0?'#f8fafc':'#fff')+';'+(isCurrent?'border-left:3px solid #D42028;':'')+'">' +
      '<td style="padding:8px 12px;font-weight:'+(isCurrent?'700':'400')+';color:'+(isCurrent?'#D42028':'#475569')+'">'+m+'/'+anoAtual+'</td>'+
      '<td style="padding:8px 12px;text-align:center">'+rec.length+'/'+contratos.length+'</td>'+
      '<td style="padding:8px 12px;text-align:right;font-weight:'+(isCurrent?'700':'400')+';color:'+(isCurrent?'#D42028':'#1e293b')+'">R$ '+val.toLocaleString("pt-BR",{minimumFractionDigits:2})+'</td>'+
      '<td style="padding:8px 12px"><div style="background:#e2e8f0;border-radius:99px;height:10px;width:100%"><div style="background:'+(isCurrent?'#D42028':'#003DA5')+';height:10px;border-radius:99px;width:'+pct+'%;transition:width .3s"></div></div><span style="font-size:10px;color:#94a3b8">'+pct+'%</span></td>'+
      '</tr>';
  }).join('');

  // Logo SVG RE/MAX

  var gerado = new Date().toLocaleDateString('pt-BR')+' às '+new Date().toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'});

  var html = '<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8">'+
    '<title>Extrato — '+prop+' — '+mesNome+'/'+anoAtual+'</title>'+
    '<style>'+
      '*{box-sizing:border-box;margin:0;padding:0}'+
      'body{font-family:"Segoe UI",Arial,sans-serif;color:#1e293b;background:#f1f5f9;print-color-adjust:exact;-webkit-print-color-adjust:exact}'+
      '.page{background:#fff;max-width:900px;margin:0 auto;padding:0}'+
      '.header{background:linear-gradient(135deg,#0f1a35 0%,#1e3a5f 100%);color:#fff;padding:28px 36px;display:flex;justify-content:space-between;align-items:flex-start}'+
      '.header-left{display:flex;align-items:center;gap:16px}'+
      '.header-title{font-size:22px;font-weight:800;letter-spacing:.5px}'+
      '.header-sub{font-size:12px;opacity:.75;margin-top:4px}'+
      '.header-right{text-align:right;font-size:12px;opacity:.8}'+
      '.header-right strong{display:block;font-size:18px;font-weight:800;opacity:1;margin-bottom:2px}'+
      '.info-bar{background:#0f1a35;color:#fff;padding:10px 36px;display:flex;gap:24px;font-size:11px;opacity:.85}'+
      '.info-bar span strong{opacity:1}'+
      '.cards{display:grid;grid-template-columns:repeat(4,1fr);gap:0;border-bottom:3px solid #e2e8f0}'+
      '.card-kpi{padding:18px 20px;text-align:center;border-right:1px solid #e2e8f0}'+
      '.card-kpi:last-child{border-right:none}'+
      '.card-kpi .label{font-size:10px;color:#94a3b8;font-weight:600;text-transform:uppercase;letter-spacing:.5px;margin-bottom:6px}'+
      '.card-kpi .value{font-size:20px;font-weight:800}'+
      '.card-kpi .sub{font-size:10px;color:#94a3b8;margin-top:3px}'+
      '.section{padding:24px 36px}'+
      '.section-title{font-size:13px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:.8px;margin-bottom:12px;display:flex;align-items:center;gap:8px}'+
      '.section-title::after{content:"";flex:1;height:1px;background:#e2e8f0}'+
      'table{width:100%;border-collapse:collapse;font-size:12px}'+
      'thead th{background:#0f1a35;color:#fff;padding:10px 12px;text-align:left;font-size:11px;font-weight:600;letter-spacing:.3px}'+
      'tbody tr:nth-child(even){background:#f8fafc}'+
      'tbody tr:hover{background:#f0f9ff}'+
      'tfoot td{background:#0f1a35;color:#fff;padding:10px 12px;font-weight:700}'+
      '.footer{background:#f8fafc;border-top:2px solid #e2e8f0;padding:16px 36px;display:flex;justify-content:space-between;align-items:center;font-size:10px;color:#94a3b8}'+
      '.badge-ok{background:#dcfce7;color:#16a34a;padding:3px 10px;border-radius:20px;font-size:10px;font-weight:700}'+
      '.badge-pend{background:#fee2e2;color:#dc2626;padding:3px 10px;border-radius:20px;font-size:10px;font-weight:700}'+
      '@media print{body{background:#fff}.page{box-shadow:none}@page{margin:10mm;size:A4;margin-top:0;margin-bottom:0}header,footer{display:none!important}}'+
    '</style></head><body>'+
    '<div class="page">'+
      '<div class="header">'+
        '<div style="display:flex;justify-content:space-between;align-items:center">'+
          '<div>'+
            '<div style="font-size:28px;font-weight:900;letter-spacing:-0.5px"><span style="color:#D42028">RE/MAX</span><span style="color:#fff;font-weight:300"> Space</span></div>'+
            '<div style="font-size:11px;opacity:.65;margin-top:3px">Extrato de Repasse ao Proprietário · CRECI 41.377-J · Caldas Novas - GO</div>'+
          '</div>'+
          '<div style="text-align:right">'+
            '<div style="font-size:22px;font-weight:800;color:#B9975B">'+mesNome+' / '+anoAtual+'</div>'+
            '<div style="font-size:11px;opacity:.65;margin-top:2px">Gerado em '+gerado+'</div>'+
            '<div style="font-size:14px;font-weight:700;margin-top:4px">'+prop+'</div>'+
          '</div>'+
        '</div>'+
      '</div>'+
      '<div class="info-bar">'+
        '<span>📋 <strong>'+contratos.length+'</strong> contrato(s) ativo(s)</span>'+
        '<span>✅ <strong>'+recebidos.length+'</strong> recebido(s)</span>'+
        '<span>📅 Vencimentos: dia(s) '+contratos.map(function(c){return c.venc;}).filter(function(v,i,a){return a.indexOf(v)===i;}).join(', ')+'</span>'+
      '</div>'+
      '<div class="cards">'+
        '<div class="card-kpi"><div class="label">Aluguel Bruto</div><div class="value" style="color:#1e293b">R$ '+totalBruto.toLocaleString("pt-BR",{minimumFractionDigits:2})+'</div><div class="sub">soma dos contratos</div></div>'+
        '<div class="card-kpi"><div class="label">Taxa ADM 10%</div><div class="value" style="color:#dc2626">- R$ '+totalAdm.toLocaleString("pt-BR",{minimumFractionDigits:2})+'</div><div class="sub">gestão RE/MAX Space</div></div>'+
        (descs.length ? '<div class="card-kpi"><div class="label">Descontos</div><div class="value" style="color:#d97706">- R$ '+totalDesc.toLocaleString("pt-BR",{minimumFractionDigits:2})+'</div><div class="sub">manutenção / outros</div></div>' : '')+
        '<div class="card-kpi" style="background:#f0fdf4"><div class="label">Repasse Líquido</div><div class="value" style="color:#16a34a;font-size:22px">R$ '+totalFinal.toLocaleString("pt-BR",{minimumFractionDigits:2})+'</div><div class="sub">a transferir</div></div>'+
        '<div class="card-kpi"><div class="label">Recebido</div><div class="value" style="color:#003DA5">R$ '+totalRec.toLocaleString("pt-BR",{minimumFractionDigits:2})+'</div><div class="sub">'+recebidos.length+'/'+contratos.length+' contratos</div></div>'+
      '</div>'+
      '<div class="section">'+
        '<div class="section-title">🏠 Contratos — '+mesNome+'/'+anoAtual+'</div>'+
        '<table>'+
          '<thead><tr><th>CT</th><th>Inquilino</th><th>Tipo</th><th>Endereço</th><th style="text-align:center">Venc.</th><th style="text-align:right">Aluguel</th><th style="text-align:right">Repasse</th><th style="text-align:center">Status</th></tr></thead>'+
          '<tbody>'+rows+descRows+'</tbody>'+
          '<tfoot><tr>'+
            '<td colspan="5"><b>TOTAL</b></td>'+
            '<td style="text-align:right"><b>R$ '+totalBruto.toLocaleString("pt-BR",{minimumFractionDigits:2})+'</b></td>'+
            '<td style="text-align:right"><b>R$ '+totalFinal.toLocaleString("pt-BR",{minimumFractionDigits:2})+'</b></td>'+
            '<td></td>'+
          '</tr></tfoot>'+
        '</table>'+
      '</div>'+
      '<div class="section" style="padding-top:0">'+
        '<div class="section-title">📊 Histórico de Repasses '+anoAtual+'</div>'+
        '<table>'+
          '<thead><tr><th>Mês</th><th style="text-align:center">Recebidos</th><th style="text-align:right">Valor Repassado</th><th>Progressão</th></tr></thead>'+
          '<tbody>'+histRows+'</tbody>'+
        '</table>'+
      '</div>'+
      '<div class="footer">'+
        '<div>'+
          '<strong style="color:#1e293b;font-size:11px">RE/MAX Space</strong> · Caldas Novas - GO<br>'+
          'CRECI 41.377-J · (64) 9 9914-5346'+
        '</div>'+
        '<div style="text-align:center">'+
          '<div style="font-size:9px;color:#cbd5e1;margin-bottom:6px">Assinatura do Responsável</div>'+
          '<div style="border-top:1px solid #cbd5e1;width:180px;padding-top:4px;font-size:9px">Tatiana Basile — Responsável</div>'+
        '</div>'+
        '<div style="text-align:right">'+
          'Documento gerado em '+gerado+'<br>'+
          '<span style="color:#cbd5e1">via Sistema RE/MAX Space</span>'+
        '</div>'+
      '</div>'+
    '</div>'+
    '</body></html>';

  // Gerar PDF via html2pdf para download direto
  var meses = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
  var mesNomePDF = meses[(mesParam !== undefined) ? mesParam : new Date().getMonth()];
  var anoPDF = (anoParam !== undefined) ? anoParam : new Date().getFullYear();
  var nomeArq = 'Extrato_'+prop.replace(/\s+/g,'_')+'_'+mesNomePDF+anoPDF+'.pdf';

  if(typeof html2pdf !== 'undefined'){
    var container = document.createElement('div');
    container.innerHTML = html;
    document.body.appendChild(container);
    html2pdf().set({
      margin: 0,
      filename: nomeArq,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, letterRendering: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['avoid-all','css','legacy'] }
    }).from(container).save().then(function(){
      document.body.removeChild(container);
      registrarLog('Extrato PDF', 'Extrato de '+prop+' — '+mesNomePDF+'/'+anoPDF+' gerado');
    });
  } else {
    // Fallback: abrir para imprimir se html2pdf não carregou
    var w = window.open('','_blank');
    w.document.write(html);
    w.document.close();
    console.warn('html2pdf não disponível — usando window.print como fallback');
  }
}


// ===== PUBLICAÇÃO EM PORTAIS =====
function pubPortais(i){
  var iv = ivD[i];
  if(!iv){ return; }

  var val = iv.valor ? 'R$ '+iv.valor.toLocaleString('pt-BR') : 'A consultar';
  var titulo = iv.tipo+' à '+iv.vva+' — '+iv.end;
  var desc = encodeURIComponent(titulo+' | '+val+' | Corretor: '+iv.corretor+' | RE/MAX Space Caldas Novas | (64) 9 9914-5346');
  var tituloEnc = encodeURIComponent(titulo);

  // URLs de publicação dos portais
  var portais = [
    {
      nome: 'ZAP Imóveis',
      cor: '#ff6b00',
      icon: '🏠',
      url: 'https://www.zapimoveis.com.br/anuncie/',
      obs: 'Acesse o painel do ZAP e crie o anúncio com os dados abaixo'
    },
    {
      nome: 'OLX',
      cor: '#6e0ad6',
      icon: '🟣',
      url: 'https://www.olx.com.br/anunciar/imoveis',
      obs: 'Clique em "Publicar anúncio" no OLX e use os dados abaixo'
    },
    {
      nome: 'VivaReal',
      cor: '#00a550',
      icon: '🟢',
      url: 'https://vivareal.com.br/anuncie/',
      obs: 'Acesse o painel VivaReal e crie o anúncio'
    },
    {
      nome: 'Chaves na Mão',
      cor: '#0057b8',
      icon: '🔑',
      url: 'https://admin.chavesnamao.com.br/anuncios/novo',
      obs: 'Acesse o painel Chaves na Mão e publique'
    },
    {
      nome: 'Imovelweb',
      cor: '#e30613',
      icon: '🔴',
      url: 'https://www.imovelweb.com.br/noticias/anuncie/',
      obs: 'Acesse o painel Imovelweb e publique'
    }
  ];

  var btns = portais.map(function(p){
    return '<a href="'+p.url+'" target="_blank" style="display:flex;align-items:center;gap:10px;padding:12px 16px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;text-decoration:none">'+
      '<span style="font-size:22px">'+p.icon+'</span>'+
      '<div>'+
        '<div style="font-weight:700;color:'+p.cor+';font-size:13px">'+p.nome+'</div>'+
        '<div style="font-size:11px;color:#64748b">'+p.obs+'</div>'+
      '</div>'+
      '<span style="margin-left:auto;color:'+p.cor+'">→</span>'+
    '</a>';
  }).join('');

  // Dados prontos para copiar
  var dados =
    '<div style="background:#0f1a35;color:#fff;border-radius:10px;padding:14px;font-size:12px;font-family:monospace;margin-bottom:14px;position:relative">'+
    '<button onclick="copiarDadosPortal()" style="position:absolute;top:8px;right:8px;background:rgba(255,255,255,.15);color:#fff;border:none;border-radius:6px;padding:4px 10px;font-size:11px;cursor:pointer">📋 Copiar</button>'+
    '<div id="dados-portal-txt">'+
    'Título: '+titulo+'\n'+
    'Tipo: '+iv.tipo+'\n'+
    'Finalidade: '+iv.vva+'\n'+
    'Endereço: '+iv.end+'\n'+
    'Valor: '+val+'\n'+
    'Corretor: '+iv.corretor+'\n'+
    'Contato: (64) 9 9914-5346\n'+
    'Imobiliária: RE/MAX Space — Caldas Novas GO\n'+
    'CRECI: 41.377-J'+
    '</div></div>';

  oM('🌐 Publicar em Portais — '+iv.tipo+' #'+iv.id,
    dados+
    '<div style="display:flex;flex-direction:column;gap:8px">'+btns+'</div>',
    null, null
  );
}
window.pubPortais = pubPortais;

function copiarDadosPortal(){
  var txt = document.getElementById('dados-portal-txt');
  if(!txt) return;
  var t = txt.innerText || txt.textContent;
  navigator.clipboard.writeText(t).then(function(){
    var btn = document.querySelector('[onclick="copiarDadosPortal()"]');
    if(btn){ btn.textContent = '✓ Copiado!'; setTimeout(function(){ btn.textContent = '📋 Copiar'; }, 2000); }
  });
}
window.copiarDadosPortal = copiarDadosPortal;

// ===== ASSINATURA DIGITAL D4SIGN =====
function assinarD4Sign(i){
  var c = ctContratos[i];
  if(!c){ return; }

  var d4Key = localStorage.getItem('d4sign_key') || '';
  var d4Crypt = localStorage.getItem('d4sign_crypt') || '';

  oM('✍️ Assinatura Digital — D4Sign',
    '<div style="background:#f0f9ff;border:1px solid #bae6fd;border-radius:10px;padding:14px;margin-bottom:14px;font-size:13px">'+
      '<div style="font-weight:700;color:#0369a1;margin-bottom:6px">📋 Contrato #'+(i+1)+' — '+(c.prop1_nome||'Proprietário')+'</div>'+
      '<div style="color:#475569">Imóvel: '+(c.im_tipo||'')+' '+(c.im_end||'')+'</div>'+
      '<div style="color:#475569">Valor: R$ '+(c.comissao||'—')+'%</div>'+
    '</div>'+
    '<div style="margin-bottom:14px">'+
      '<div style="font-size:12px;font-weight:700;color:#64748b;margin-bottom:8px;text-transform:uppercase;letter-spacing:.5px">Credenciais D4Sign</div>'+
      '<div class="fg"><label>Token API</label><input id="d4-key" value="'+d4Key+'" placeholder="Sua API Key do D4Sign"></div>'+
      '<div class="fg"><label>Crypt Key</label><input id="d4-crypt" value="'+d4Crypt+'" placeholder="Sua Cryptkey do D4Sign"></div>'+
    '</div>'+
    '<div style="background:#fefce8;border:1px solid #fde68a;border-radius:8px;padding:12px;font-size:12px;color:#92400e;margin-bottom:14px">'+
      '⚠️ <strong>Como funciona:</strong><br>'+
      '1. Gere o PDF do contrato (botão PDF)<br>'+
      '2. Suba o PDF no D4Sign manualmente (ou via API abaixo)<br>'+
      '3. Adicione os signatários e envie para assinatura<br>'+
      '4. As partes assinam pelo link que recebem por e-mail/WhatsApp'+
    '</div>'+
    '<div style="display:flex;flex-direction:column;gap:8px">'+
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:4px">'+
      '<a href="https://app.d4sign.com.br" target="_blank" style="display:flex;align-items:center;gap:8px;padding:10px 14px;background:#4f46e5;color:#fff;border-radius:8px;text-decoration:none;font-size:13px;font-weight:600">'+
        '<span style="font-size:18px">✍️</span><div><div>D4Sign</div><div style="font-size:10px;opacity:.8">Mais usado no BR</div></div>'+
      '</a>'+
      '<a href="https://app.clicksign.com" target="_blank" style="display:flex;align-items:center;gap:8px;padding:10px 14px;background:#00b894;color:#fff;border-radius:8px;text-decoration:none;font-size:13px;font-weight:600">'+
        '<span style="font-size:18px">🖊️</span><div><div>ClickSign</div><div style="font-size:10px;opacity:.8">Alternativa popular</div></div>'+
      '</a>'+
      '<a href="https://assinador.iti.br" target="_blank" style="display:flex;align-items:center;gap:8px;padding:10px 14px;background:#1351B4;color:#fff;border-radius:8px;text-decoration:none;font-size:13px;font-weight:600">'+
        '<span style="font-size:18px">🇧🇷</span><div><div>Gov.br</div><div style="font-size:10px;opacity:.8">Gratuito — assinatura ICP</div></div>'+
      '</a>'+
      '<a href="https://www.autentique.com.br" target="_blank" style="display:flex;align-items:center;gap:8px;padding:10px 14px;background:#0f1a35;color:#fff;border-radius:8px;text-decoration:none;font-size:13px;font-weight:600">'+
        '<span style="font-size:18px">📝</span><div><div>Autentique</div><div style="font-size:10px;opacity:.8">Plano grátis disponível</div></div>'+
      '</a>'+
    '</div>'+
    '<button class="btn btn-sm btn-outline" onclick="salvarCredsD4Sign()" style="width:100%">💾 Salvar credenciais D4Sign</button>'+
    '</div>',
    null, null
  );
}
window.assinarD4Sign = assinarD4Sign;

function salvarCredsD4Sign(){
  var key = document.getElementById('d4-key');
  var crypt = document.getElementById('d4-crypt');
  if(key) localStorage.setItem('d4sign_key', key.value);
  if(crypt) localStorage.setItem('d4sign_crypt', crypt.value);
  var btn = document.querySelector('[onclick="salvarCredsD4Sign()"]');
  if(btn){ btn.textContent = '✓ Salvo!'; setTimeout(function(){ btn.textContent = '💾 Salvar credenciais'; }, 2000); }
}
window.salvarCredsD4Sign = salvarCredsD4Sign;


// ===== ORDENS DE SERVIÇO =====
function pOS(){
  document.getElementById('pa').innerHTML =
    '<button class="btn btn-red" onclick="nOS()">+ Nova OS</button>';

  var abertos = osD.filter(function(o){return o.status!=='Concluído'&&o.status!=='Cancelado';}).length;
  var urgentes = osD.filter(function(o){return o.prioridade==='Alta'&&o.status!=='Concluído';}).length;

  var r = '';
  if(!osD.length){
    r = '<div style="text-align:center;padding:48px;color:var(--lm)">'
      +'<div style="font-size:48px;margin-bottom:14px">🔧</div>'
      +'<p style="font-size:15px;font-weight:600">Nenhuma ordem de serviço</p>'
      +'<p style="font-size:13px;margin-top:6px">Clique em + Nova OS para registrar uma manutenção</p>'
      +'</div>';
  } else {
    r = osD.map(function(o,i){
      var stBadge = {
        'Aberto':'<span class="badge by">Aberto</span>',
        'Em andamento':'<span class="badge bb">Em andamento</span>',
        'Aguardando':'<span class="badge bgr">Aguardando</span>',
        'Concluído':'<span class="badge bg">Concluído</span>',
        'Cancelado':'<span class="badge" style="background:#f3f4f6;color:#6b7280">Cancelado</span>'
      }[o.status]||'<span class="badge by">'+o.status+'</span>';
      var prioBadge = o.prioridade==='Alta'
        ? '<span class="badge br">🔴 Alta</span>'
        : o.prioridade==='Média'
        ? '<span class="badge by">🟡 Média</span>'
        : '<span class="badge" style="background:#f0fdf4;color:#166534">🟢 Baixa</span>';

      return '<tr style="'+(o.prioridade==='Alta'&&o.status!=='Concluído'?'background:#fff5f5':'')+'"><td style="font-weight:700;color:var(--navy)">#'+String(i+1).padStart(3,'0')+'</td>'
        +'<td><div style="font-weight:600">'+o.imovel+'</div><div style="font-size:11px;color:var(--lm)">'+o.prop+' / '+o.inq+'</div></td>'
        +'<td><span class="badge bgr" style="font-size:10px">'+o.categoria+'</span></td>'
        +'<td style="max-width:200px"><div style="font-weight:500">'+o.descricao+'</div>'+(o.obs?'<div style="font-size:10px;color:var(--lm)">'+o.obs+'</div>':'')+'</td>'
        +'<td>'+prioBadge+'</td>'
        +'<td>'+stBadge+'</td>'
        +'<td style="font-size:11px">'+o.fornecedor+'<br><span style="color:var(--lm)">'+fmt(o.valor||0)+'</span></td>'
        +'<td style="font-size:11px">'+o.dtAbertura+'<br>'+(o.dtConclusao?'<span style="color:var(--ok)">'+o.dtConclusao+'</span>':'<span style="color:var(--lm)">—</span>')+'</td>'
        +'<td style="white-space:nowrap">'
        +(o.status!=='Concluído'&&o.status!=='Cancelado'?
          '<button class="btn btn-xs btn-green" onclick="concluirOS('+i+')" style="margin-bottom:3px;display:block">✓ Concluir</button>':
          '')
        +'<button class="btn btn-xs" style="font-size:10px;display:block" onclick="editOS('+i+')">Editar</button>'
        +'</td></tr>';
    }).join('');
  }

  document.getElementById('pc').innerHTML =
    '<div class="g4" style="margin-bottom:16px">'
    +'<div class="kc blue"><div class="kc-l">Total OS</div><div class="kc-v">'+osD.length+'</div></div>'
    +'<div class="kc warn"><div class="kc-l">Em aberto</div><div class="kc-v">'+abertos+'</div></div>'
    +'<div class="kc red"><div class="kc-l">Urgentes</div><div class="kc-v">'+urgentes+'</div></div>'
    +'<div class="kc green"><div class="kc-l">Concluídas</div><div class="kc-v">'+osD.filter(function(o){return o.status==='Concluído';}).length+'</div></div>'
    +'</div>'
    +'<div class="card"><div class="chd" style="display:flex;justify-content:space-between;align-items:center">'
    +'<h3>Ordens de Serviço</h3>'
    +'<div style="display:flex;gap:6px">'
    +'<select onchange="filtrarOS(this.value)" style="border:1.5px solid var(--lb);border-radius:8px;padding:5px 10px;font-size:12px">'
    +'<option value="todos">Todas</option>'
    +'<option value="Aberto">Abertas</option>'
    +'<option value="Em andamento">Em andamento</option>'
    +'<option value="Concluído">Concluídas</option>'
    +'<option value="Alta">Urgentes</option>'
    +'</select>'
    +'</div></div>'
    +'<div class="tw"><table><thead><tr><th>#</th><th>Imóvel / Contrato</th><th>Categoria</th><th>Descrição</th><th>Prioridade</th><th>Status</th><th>Fornecedor / Valor</th><th>Datas</th><th>Ações</th></tr></thead><tbody id="os-tbody">'+r+'</tbody></table></div></div>';
}

function filtrarOS(val){
  document.querySelectorAll('#os-tbody tr').forEach(function(tr){
    if(val==='todos') tr.style.display='';
    else if(val==='Alta') tr.style.display=tr.innerHTML.indexOf('Alta')>=0&&tr.innerHTML.indexOf('Concluído')<0?'':'none';
    else tr.style.display=tr.innerHTML.indexOf(val)>=0?'':'none';
  });
}

function nOS(){
  var ctOpts = ctD.filter(function(c){return c.status!=='Inativo';})
    .map(function(c){return '<option value="'+c.id+'|'+c.prop+'|'+c.inq+'">'+c.id+' — '+c.prop+' / '+c.inq+'</option>';}).join('');
  oM('Nova Ordem de Serviço',
    '<div class="fg3"><div class="fg"><label>Contrato / Imóvel</label><select id="os-ct">'+ctOpts+'</select></div>'
    +'<div class="fg"><label>Categoria</label><select id="os-cat">'
    +'<option>Hidráulica</option><option>Elétrica</option><option>Alvenaria</option>'
    +'<option>Pintura</option><option>Marcenaria</option><option>Limpeza</option>'
    +'<option>Ar condicionado</option><option>Portão/Interfone</option><option>Outros</option>'
    +'</select></div></div>'
    +'<div class="fg"><label>Descrição do problema</label><textarea id="os-desc" rows="2" placeholder="Descreva o problema detalhadamente"></textarea></div>'
    +'<div class="fg3"><div class="fg"><label>Prioridade</label><select id="os-prio"><option>Baixa</option><option>Média</option><option>Alta</option></select></div>'
    +'<div class="fg"><label>Status</label><select id="os-st"><option>Aberto</option><option>Em andamento</option><option>Aguardando</option></select></div></div>'
    +'<div class="fg3"><div class="fg"><label>Fornecedor</label><input id="os-forn" placeholder="Nome do prestador"></div>'
    +'<div class="fg"><label>Valor estimado (R$)</label><input type="number" id="os-val" placeholder="0"></div></div>'
    +'<div class="fg3"><div class="fg"><label>Data abertura</label><input type="date" id="os-dt" value="'+new Date().toISOString().split('T')[0]+'"></div>'
    +'<div class="fg"><label>Previsão conclusão</label><input type="date" id="os-prev"></div></div>'
    +'<div class="fg"><label>Observações</label><input id="os-obs" placeholder="Informações adicionais"></div>',
    function(){
      var ctVal = document.getElementById('os-ct').value.split('|');
      var novaOS = {
        ctId: ctVal[0], imovel: ctVal[0], prop: ctVal[1]||'', inq: ctVal[2]||'',
        categoria: document.getElementById('os-cat').value,
        descricao: document.getElementById('os-desc').value,
        prioridade: document.getElementById('os-prio').value,
        status: document.getElementById('os-st').value,
        fornecedor: document.getElementById('os-forn').value||'A definir',
        valor: parseFloat(document.getElementById('os-val').value)||0,
        dtAbertura: document.getElementById('os-dt').value,
        dtPrevisao: document.getElementById('os-prev').value,
        dtConclusao: '',
        obs: document.getElementById('os-obs').value
      };
      if(!novaOS.descricao){ alert('Informe a descrição'); return; }
      osD.unshift(novaOS);
      registrarLog('OS ABERTA', novaOS.imovel+' — '+novaOS.categoria+' — '+novaOS.prioridade);
      salvarTudo(); cM(); pOS();
    });
}

function editOS(i){
  var o = osD[i];
  oM('Editar OS #'+String(i+1).padStart(3,'0'),
    '<div class="fg"><label>Descrição</label><textarea id="eos-desc" rows="2">'+o.descricao+'</textarea></div>'
    +'<div class="fg3"><div class="fg"><label>Status</label><select id="eos-st">'
    +'<option '+(o.status==='Aberto'?'selected':'')+'>Aberto</option>'
    +'<option '+(o.status==='Em andamento'?'selected':'')+'>Em andamento</option>'
    +'<option '+(o.status==='Aguardando'?'selected':'')+'>Aguardando</option>'
    +'<option '+(o.status==='Concluído'?'selected':'')+'>Concluído</option>'
    +'<option '+(o.status==='Cancelado'?'selected':'')+'>Cancelado</option>'
    +'</select></div>'
    +'<div class="fg"><label>Prioridade</label><select id="eos-prio">'
    +'<option '+(o.prioridade==='Baixa'?'selected':'')+'>Baixa</option>'
    +'<option '+(o.prioridade==='Média'?'selected':'')+'>Média</option>'
    +'<option '+(o.prioridade==='Alta'?'selected':'')+'>Alta</option>'
    +'</select></div></div>'
    +'<div class="fg3"><div class="fg"><label>Fornecedor</label><input id="eos-forn" value="'+o.fornecedor+'"></div>'
    +'<div class="fg"><label>Valor real (R$)</label><input type="number" id="eos-val" value="'+(o.valor||0)+'"></div></div>'
    +'<div class="fg3"><div class="fg"><label>Data conclusão</label><input type="date" id="eos-dt" value="'+(o.dtConclusao||'')+'"></div></div>'
    +'<div class="fg"><label>Observações</label><input id="eos-obs" value="'+(o.obs||'')+'"></div>',
    function(){
      osD[i].descricao = document.getElementById('eos-desc').value;
      osD[i].status = document.getElementById('eos-st').value;
      osD[i].prioridade = document.getElementById('eos-prio').value;
      osD[i].fornecedor = document.getElementById('eos-forn').value;
      osD[i].valor = parseFloat(document.getElementById('eos-val').value)||0;
      osD[i].dtConclusao = document.getElementById('eos-dt').value;
      osD[i].obs = document.getElementById('eos-obs').value;
      salvarTudo(); cM(); pOS();
    });
}

function concluirOS(i){
  osD[i].status = 'Concluído';
  osD[i].dtConclusao = new Date().toISOString().split('T')[0];
  registrarLog('OS CONCLUÍDA', osD[i].imovel+' — '+osD[i].categoria+' — '+fmt(osD[i].valor||0));
  salvarTudo(); pOS();
}

// ===== RANKING =====
// ===== METAS POR CORRETOR =====
function pMetas(){
  var COR_ativos=COR.filter(function(c){
    var cc=corCad.find(function(x){return x.nome===c.nome||x.ini===c.initials;});
    return !cc||(cc.status==='Ativo'||cc.status==='Afastado');
  });

  function getMeta(nome, campo){ return (metasD[nome]&&metasD[nome][campo])||0; }
  function getReal(nome, campo){
    if(campo==='cap') return ivD.filter(function(iv){return (iv.corretor||'').indexOf(nome)>=0;}).length;
    if(campo==='leads') return ldD.filter(function(l){return l.cor===nome;}).length + llD.filter(function(l){return l.cor===nome;}).length;
    if(campo==='vis') return vD.filter(function(v){return v.cor===nome;}).length;
    if(campo==='fech') return ldD.filter(function(l){return l.cor===nome&&l.st==='Fechado';}).length;
    if(campo==='com') return COMISSOES.filter(function(x){return x.corretor===nome;}).reduce(function(s,x){return s+(x.comissao||0);},0);
    return 0;
  }

  var campos = [{k:'cap',l:'Captações'},{k:'leads',l:'Leads'},{k:'vis',l:'Visitas'},{k:'fech',l:'Fechamentos'},{k:'com',l:'Comissão R$'}];

  document.getElementById('pa').innerHTML = '<button class="btn btn-primary" onclick="eMetas()">✏️ Definir Metas</button>';

  var cards = COR_ativos.map(function(c){
    var barras = campos.map(function(campo){
      var meta = getMeta(c.nome, campo.k);
      var real = getReal(c.nome, campo.k);
      var pct  = meta>0 ? Math.min(100, Math.round(real/meta*100)) : 0;
      var cor  = pct>=100?'#059669':pct>=70?'#d97706':'#D42028';
      var label = campo.k==='com' ? fmt(real)+(meta>0?' / '+fmt(meta):'') : real+(meta>0?' / '+meta:'');
      return '<div style="margin-bottom:10px">'
        +'<div style="display:flex;justify-content:space-between;margin-bottom:3px">'
        +'<span style="font-size:11px;font-weight:600;color:var(--lm)">'+campo.l+'</span>'
        +'<span style="font-size:11px;font-weight:700;color:'+(pct>=100?'#059669':'var(--lt)')+'">'+label+(meta>0?' ('+pct+'%)':'')+'</span>'
        +'</div>'
        +'<div style="background:#f3f4f6;border-radius:4px;height:7px">'
        +(meta>0?'<div style="background:'+cor+';height:7px;border-radius:4px;width:'+pct+'%;transition:width .5s"></div>':'<div style="font-size:10px;color:var(--lm);padding:1px 6px">sem meta definida</div>')
        +'</div>'
        +'</div>';
    }).join('');

    var totalPct = campos.filter(function(f){return f.k!=='com';}).reduce(function(s,campo){
      var meta=getMeta(c.nome,campo.k);
      var real=getReal(c.nome,campo.k);
      return s+(meta>0?Math.min(100,Math.round(real/meta*100)):0);
    },0);
    var nMeta = campos.filter(function(f){return f.k!=='com'&&getMeta(c.nome,f.k)>0;}).length;
    var avgPct = nMeta>0?Math.round(totalPct/nMeta):0;

    return '<div class="card">'
      +'<div style="display:flex;align-items:center;gap:10px;margin-bottom:14px">'
        +'<div style="width:40px;height:40px;border-radius:50%;background:'+c.cor+';display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;color:#fff">'+c.initials+'</div>'
        +'<div style="flex:1"><div style="font-size:14px;font-weight:700">'+c.nome+'</div>'
        +'<div style="font-size:11px;color:var(--lm)">Meta mensal — '+mesAno()+'</div></div>'
        +'<div style="text-align:center;background:'+(avgPct>=100?'#f0fdf4':avgPct>=70?'#fef9c3':'#fef2f2')+';border-radius:10px;padding:8px 14px">'
          +'<div style="font-size:20px;font-weight:800;color:'+(avgPct>=100?'#166534':avgPct>=70?'#92400e':'#dc2626')+'">'+avgPct+'%</div>'
          +'<div style="font-size:9px;color:var(--lm)">atingimento</div>'
        +'</div>'
      +'</div>'
      +barras
      +'</div>';
  }).join('');

  document.getElementById('pc').innerHTML =
    '<div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:10px;padding:12px 16px;margin-bottom:14px;font-size:12px;color:#1d4ed8">'
    +'<b>Como funciona:</b> As metas são definidas manualmente por mês. Os realizados são calculados automaticamente com base nos dados do sistema.'
    +'</div>'
    + cards;
}

function eMetas(){
  var COR_ativos=COR.filter(function(c){
    var cc=corCad.find(function(x){return x.nome===c.nome||x.ini===c.initials;});
    return !cc||(cc.status==='Ativo'||cc.status==='Afastado');
  });
  var campos=[{k:'cap',l:'Captações'},{k:'leads',l:'Leads'},{k:'vis',l:'Visitas'},{k:'fech',l:'Fechamentos'}];
  var rows=COR_ativos.map(function(c){
    return '<div style="background:#f9fafb;border-radius:10px;padding:12px;margin-bottom:10px">'
      +'<div style="font-size:13px;font-weight:700;margin-bottom:10px;display:flex;align-items:center;gap:8px">'
        +'<div style="width:26px;height:26px;border-radius:50%;background:'+c.cor+';display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:#fff">'+c.initials+'</div>'
        + c.nome
      +'</div>'
      +'<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px">'
      +campos.map(function(f){
        var v=(metasD[c.nome]&&metasD[c.nome][f.k])||'';
        return '<div class="fg"><label style="font-size:10px">'+f.l+'</label><input type="number" min="0" id="mt-'+c.nome.replace(/\s/g,'_')+'-'+f.k+'" value="'+v+'" placeholder="0" style="width:100%"></div>';
      }).join('')
      +'</div></div>';
  }).join('');

  oM('Definir Metas — '+mesAno(),
    '<div style="font-size:11px;color:var(--lm);margin-bottom:12px">Defina as metas mensais de cada corretor para o mês atual</div>'+rows,
    function(){
      COR_ativos.forEach(function(c){
        if(!metasD[c.nome]) metasD[c.nome]={};
        campos.forEach(function(f){
          var el=document.getElementById('mt-'+c.nome.replace(/\s/g,'_')+'-'+f.k);
          if(el) metasD[c.nome][f.k]=parseInt(el.value)||0;
        });
      });
      salvarTudo(); cM(); pMetas();
    }, 'Salvar Metas');
}

function pRank(){
  var COR_ativos=COR.filter(function(c){
    var cc=corCad.find(function(x){return x.nome===c.nome||x.ini===c.initials;});
    return !cc||(cc.status==='Ativo'||cc.status==='Afastado');
  });
  var dados=COR_ativos.map(function(c){
    var cap=ivD.filter(function(iv){return (iv.corretor||'').indexOf(c.nome)>=0;}).length;
    var leads=ldD.filter(function(l){return l.cor===c.nome;}).length;
    var leadsL=llD.filter(function(l){return l.cor===c.nome;}).length;
    var vis=vD.filter(function(v){return v.cor===c.nome;}).length;
    var prosp=prD.filter(function(p){return p.cor===c.nome;}).length;
    var fech=ldD.filter(function(l){return l.cor===c.nome&&l.st==='Fechado';}).length;
    var com=COMISSOES.filter(function(x){return x.corretor===c.nome;}).reduce(function(s,x){return s+(x.comissao||0);},0);
    var pts=cap*5+(leads+leadsL)*2+vis*3+prosp*1+fech*15;
    return {c:c,cap:cap,leads:leads+leadsL,vis:vis,prosp:prosp,fech:fech,com:com,pts:pts};
  });
  dados.sort(function(a,b){return b.pts-a.pts;});
  var maxPts=Math.max.apply(null,dados.map(function(d){return d.pts;}))||1;
  var medalhas=['🥇','🥈','🥉'];
  var rk=dados.map(function(d,i){
    var pct=Math.round(d.pts/maxPts*100)||2;
    var conv=d.leads>0?Math.round(d.fech/d.leads*100):0;
    var medal=medalhas[i]||('<span style="font-size:14px;font-weight:700;color:var(--lm)">'+(i+1)+'</span>');
    return '<div style="background:#fff;border:1px solid var(--lb);border-radius:12px;padding:12px 14px;margin-bottom:8px">'+
      '<div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">'+
        '<div style="font-size:20px;width:28px;text-align:center">'+medal+'</div>'+
        '<div style="width:36px;height:36px;border-radius:50%;background:'+d.c.cor+';display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#fff;flex-shrink:0">'+d.c.initials+'</div>'+
        '<div style="flex:1"><div style="font-size:13px;font-weight:700;color:var(--lt)">'+d.c.nome+'</div>'+
        '<div style="font-size:10px;color:var(--lm)">'+d.pts+' pts &nbsp;·&nbsp; conversão: '+conv+'%</div></div>'+
        '<div style="font-size:18px;font-weight:800;color:'+(i===0?'#B9975B':i===1?'#64748b':i===2?'#854F0B':'var(--lm)')+'">'+d.pts+'</div>'+
      '</div>'+
      '<div style="display:grid;grid-template-columns:repeat(5,1fr);gap:6px;margin-bottom:8px">'+
        '<div style="text-align:center;background:#f9fafb;border-radius:6px;padding:4px"><div style="font-size:14px;font-weight:700;color:var(--navy)">'+d.cap+'</div><div style="font-size:9px;color:var(--lm)">Captações</div></div>'+
        '<div style="text-align:center;background:#f9fafb;border-radius:6px;padding:4px"><div style="font-size:14px;font-weight:700;color:var(--warn)">'+d.leads+'</div><div style="font-size:9px;color:var(--lm)">Leads</div></div>'+
        '<div style="text-align:center;background:#f9fafb;border-radius:6px;padding:4px"><div style="font-size:14px;font-weight:700;color:#7c3aed">'+d.vis+'</div><div style="font-size:9px;color:var(--lm)">Visitas</div></div>'+
        '<div style="text-align:center;background:#f9fafb;border-radius:6px;padding:4px"><div style="font-size:14px;font-weight:700;color:var(--lm)">'+d.prosp+'</div><div style="font-size:9px;color:var(--lm)">Prosp.</div></div>'+
        '<div style="text-align:center;background:'+(d.fech>0?'#f0fdf4':'#f9fafb')+';border-radius:6px;padding:4px"><div style="font-size:14px;font-weight:700;color:var(--ok)">'+d.fech+'</div><div style="font-size:9px;color:var(--lm)">Fechados</div></div>'+
      '</div>'+
      '<div style="background:#f3f4f6;border-radius:4px;height:6px"><div style="background:'+d.c.cor+';height:6px;border-radius:4px;width:'+pct+'%"></div></div>'+
    '</div>';
  }).join('');
  var tabRows=dados.map(function(d,i){
    var conv=d.leads>0?Math.round(d.fech/d.leads*100):0;
    return '<tr>'+
      '<td><b>'+(i+1)+'</b></td>'+
      '<td><div style="display:flex;align-items:center;gap:7px">'+
        '<div style="width:26px;height:26px;border-radius:50%;background:'+d.c.cor+';display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:#fff">'+d.c.initials+'</div>'+
        '<b>'+d.c.nome+'</b></div></td>'+
      '<td style="text-align:center;font-weight:700;color:var(--navy)">'+d.cap+'</td>'+
      '<td style="text-align:center;font-weight:700;color:var(--warn)">'+d.leads+'</td>'+
      '<td style="text-align:center;font-weight:700;color:#7c3aed">'+d.vis+'</td>'+
      '<td style="text-align:center;font-weight:700;color:var(--lm)">'+d.prosp+'</td>'+
      '<td style="text-align:center;font-weight:700;color:var(--ok)">'+d.fech+'</td>'+
      '<td style="text-align:center"><div style="background:'+(conv>=20?'#dcfce7':conv>=10?'#fef9c3':'#fee2e2')+';color:'+(conv>=20?'#166534':conv>=10?'#92400e':'#991b1b')+';padding:2px 8px;border-radius:8px;font-weight:700;font-size:11px">'+conv+'%</div></td>'+
      '<td style="text-align:center"><b style="color:'+(i===0?'#B9975B':i===1?'#64748b':i===2?'#854F0B':'var(--lm)')+'">'+d.pts+'</b></td>'+
    '</tr>';
  }).join('');
  var destaque=dados[0]?dados[0].c.nome:'—';
  document.getElementById('pc').innerHTML=
    '<div class="g4" style="margin-bottom:14px">'+
      '<div class="kc"><div class="kc-l">Período</div><div class="kc-v" style="font-size:15px">'+mesAno()+'</div></div>'+
      '<div class="kc blue"><div class="kc-l">Corretores Ativos</div><div class="kc-v">'+COR_ativos.length+'</div></div>'+
      '<div class="kc green"><div class="kc-l">🥇 Destaque</div><div class="kc-v" style="font-size:15px">'+destaque+'</div></div>'+
      '<div class="kc gold"><div class="kc-l">Pontuação máx</div><div class="kc-v">'+maxPts+'</div><div class="kc-s">cap×5 · lead×2 · vis×3 · fech×15</div></div>'+
    '</div>'+
    '<div class="g2">'+
      '<div class="card"><div class="chd"><h3>Pódio — '+mesAno()+'</h3></div><div class="cbd">'+rk+'</div></div>'+
      '<div class="card"><div class="chd"><h3>Tabela Completa</h3></div>'+
        '<div class="tw"><table><thead><tr><th>#</th><th>Corretor</th><th>Captações</th><th>Leads</th><th>Visitas</th><th>Prosp.</th><th>Fechados</th><th>Conversão</th><th>Pts</th></tr></thead><tbody>'+tabRows+'</tbody></table></div>'+
        '<div style="padding:10px 14px;font-size:10px;color:var(--lm);background:#f9fafb;border-top:1px solid var(--lb)">Fórmula: Captação×5 + Lead×2 + Visita×3 + Prospecção×1 + Fechamento×15</div>'+
      '</div>'+
    '</div>';
}



// HELPERS
function fBRL(v){return 'R$ '+Number(v).toLocaleString('pt-BR');}

function btnRel(mod){
  return ' <button class="btn btn-sm" style="background:#25D366;color:#fff" onclick="envRel(\'' + mod + '\')">&#128228; WhatsApp</button>';
}

function envRel(mod){
  var d=new Date().toLocaleDateString('pt-BR');
  var txt='*RE/MAX Space*\n'+d+'\n\n';
  if(mod==='rep'){var tot=ctD.reduce(function(s,c){return s+c.valor;},0);txt+='*Repasses*\n'+fBRL(tot)+'\n';ctD.forEach(function(c){txt+=(c.rs&&c.rs[new Date().getMonth()]==='R'?'OK':'--')+' '+c.id+' '+c.prop+' '+fBRL(c.valor)+'\n';});}
  else if(mod==='loc'){txt+='*Contratos ('+ctD.length+')*\n';ctD.forEach(function(c){txt+='- '+c.id+' '+c.prop+' '+fBRL(c.valor)+'\n';});}
  else if(mod==='ld'){txt+='*Leads ('+ldD.length+')*\n';ldD.forEach(function(l){txt+='- '+l.nome+' '+l.st+'\n';});}
  else if(mod==='pr'){txt+='*Prospecao*\n';prD.forEach(function(p){txt+='- '+p.cli+' '+p.st+'\n';});}
  else if(mod==='vis'){txt+='*Visitas*\n';vD.forEach(function(v){txt+='- '+v.dt+' '+v.cli+'\n';});}
  else if(mod==='acm'){txt+='*ACMs*\n';acmD.forEach(function(a){txt+='- '+a.im+' '+a.prop+'\n';});}
  else if(mod==='iv'){txt+='*Imoveis ('+ivD.length+')*\n';ivD.forEach(function(iv){txt+='- '+iv.tipo+' '+iv.prop+'\n';});}
  else if(mod==='mc'){txt+='*MCMV*\n';mcmvD.forEach(function(m){txt+='- '+m.nome+' '+m.st+'\n';});}
  else if(mod==='fin'){var pg=cpD.filter(function(c){return c.st==='Pago';}).reduce(function(s,c){return s+c.val;},0);txt+='*Financeiro*\nPago: '+fBRL(pg)+'\n';}
  else if(mod==='ctr'){txt+='*Contratos Rep ('+ctContratos.length+')*\n';ctContratos.forEach(function(c,i){txt+='- '+(c.prop1_nome||'?')+' '+( c.im_end||'?')+'\n';});}
  txt+='\n_RE/MAX Space_';
  window.open('https://wa.me/?text='+encodeURIComponent(txt),'_blank');
}

var _pLC=pLC; pLC=function(){_pLC();var e=document.getElementById('pa');if(e)e.innerHTML+=btnRel('loc');};
// wrapper pLR removido
var _pLeads=pLeads; pLeads=function(){_pLeads();var e=document.getElementById('pa');if(e)e.innerHTML+=btnRel('ld');};
var _pProsp=pProsp; pProsp=function(){_pProsp();var e=document.getElementById('pa');if(e)e.innerHTML+=btnRel('pr');};
var _pVis=pVis; pVis=function(){_pVis();var e=document.getElementById('pa');if(e)e.innerHTML+=btnRel('vis');};
var _pIV=pIV; pIV=function(){_pIV();var e=document.getElementById('pa');if(e)e.innerHTML+=btnRel('iv');};
var _pMCMV=pMCMV; pMCMV=function(){_pMCMV();var e=document.getElementById('pa');if(e)e.innerHTML+=btnRel('mc');};
var _pFD=pFD; pFD=function(){_pFD();var e=document.getElementById('pa');if(e)e.innerHTML+=btnRel('fin');};

// ACM
function calcACM(area,am){
  var v=(am||[]).filter(function(a){return a.area>0&&a.valor>0;});
  if(!v.length)return null;
  var med=v.reduce(function(s,a){return s+(a.valor/a.area);},0)/v.length;
  return {m2:Math.round(med),comp:Math.round(med*area*0.93),merc:Math.round(med*area),otim:Math.round(med*area*1.07)};
}
function gerarLinks(tipo,end){
  var t={'CASA':'casas','APARTAMENTO':'apartamentos','LOTE':'terrenos','CHACARA':'chacaras','FAZENDA':'fazendas','CHALE':'casas','FLAT':'apartamentos'}[tipo]||'imoveis';
  var q=encodeURIComponent(end+' Caldas Novas');
  return {zap:'https://www.zapimoveis.com.br/venda/'+t+'/go+caldas-novas/?q='+q,olx:'https://www.olx.com.br/imoveis/estado-go?q='+encodeURIComponent(tipo+' '+end),viva:'https://www.vivareal.com.br/venda/'+t+'/caldas-novas/?q='+q};
}

pAcm=function(){
  document.getElementById('pa').innerHTML='<button class="btn btn-red" onclick="nAcm()">+ Nova ACM</button>'+btnRel('acm');
  acmD=acmD.map(function(a){if(!a.amostras)a.amostras=[];if(a.area===undefined)a.area='';return a;});
  var r='';
  acmD.forEach(function(a,i){
    var res=a.area?calcACM(parseFloat(a.area),a.amostras):null;
    r+='<tr><td style="font-weight:700">'+a.im+'</td><td><span class="badge bgr">'+a.tipo+'</span></td>'+
      '<td>'+a.prop+'</td><td>'+a.cor+'</td><td>'+a.dt+'</td>'+
      '<td>'+(res?('<strong>'+fBRL(res.merc)+'</strong>'):(a.val||'-'))+'</td>'+
      '<td>'+(a.amostras.length?'<span class="badge bg">'+a.amostras.length+'</span>':'<span class="badge br">0</span>')+'</td>'+
      '<td>'+(a.feito?'<span class="badge bg">OK</span>':'<span class="badge br">Pend</span>')+'</td>'+
      '<td>'+(a.apres?'<span class="badge bg">Sim</span>':'<span class="badge bgr">Nao</span>')+'</td>'+
      '<td style="display:flex;gap:3px">'+
      '<button class="btn btn-xs btn-blue" onclick="abrirACM('+i+')">Abrir</button>'+
      '<button class="btn btn-xs btn-red" onclick="pdfACM('+i+')">PDF</button>'+
      '</td></tr>';
  });
  document.getElementById('pc').innerHTML='<div class="card"><div class="tw"><table><thead><tr><th>Imovel</th><th>Tipo</th><th>Proprietário</th><th>Corretor</th><th>Data</th><th>Valor</th><th>Amostras</th><th>Feito</th><th>Apres.</th><th>Ações</th></tr></thead><tbody>'+r+'</tbody></table></div></div>';
};

function abrirACM(i){
  var a=acmD[i];if(!a.amostras)a.amostras=[];
  var lk=gerarLinks(a.tipo,a.im);
  var res=a.area?calcACM(parseFloat(a.area),a.amostras):null;
  var rows=a.amostras.map(function(am,ai){
    return '<tr><td>'+am.fonte+'</td><td>'+am.area+'m2</td><td>'+fBRL(am.valor)+'</td><td>R$ '+Math.round(am.valor/am.area).toLocaleString('pt-BR')+'/m2</td><td>'+am.local+'</td>'+
      '<td><button class="btn btn-xs" style="background:#fee2e2;color:#b91c1c" onclick="acmD['+i+'].amostras.splice('+ai+',1);abrirACM('+i+')">X</button></td></tr>';
  }).join('');
  var cens='<p style="color:#6b7280">Adicione amostras para ver o calculo.</p>';
  if(res){cens='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin:10px 0">'+
    '<div style="border:1px solid #e2e5ed;border-radius:8px;padding:10px;text-align:center"><div style="font-size:9px;font-weight:700;color:#6b7280">COMPETITIVO</div><div style="font-size:16px;font-weight:800">'+fBRL(res.comp)+'</div></div>'+
    '<div style="border:2px solid #003DA5;border-radius:8px;padding:10px;text-align:center;background:#f0f4ff"><div style="font-size:9px;font-weight:700;color:#003DA5">MERCADO</div><div style="font-size:16px;font-weight:800;color:#003DA5">'+fBRL(res.merc)+'</div></div>'+
    '<div style="border:1px solid #e2e5ed;border-radius:8px;padding:10px;text-align:center"><div style="font-size:9px;font-weight:700;color:#6b7280">OTIMISTA</div><div style="font-size:16px;font-weight:800">'+fBRL(res.otim)+'</div></div></div>';}
  var corpo='<div style="margin-bottom:12px;padding:10px;background:#f0f4ff;border-radius:8px">'+
    '<div style="font-size:11px;font-weight:700;color:#003DA5;margin-bottom:6px">Links para pesquisa</div>'+
    '<div style="display:flex;gap:6px">'+
    '<a href="'+lk.zap+'" target="_blank" style="background:#F26522;color:#fff;padding:4px 10px;border-radius:5px;font-size:11px;font-weight:700;text-decoration:none">ZAP</a>'+
    '<a href="'+lk.olx+'" target="_blank" style="background:#6E2B87;color:#fff;padding:4px 10px;border-radius:5px;font-size:11px;font-weight:700;text-decoration:none">OLX</a>'+
    '<a href="'+lk.viva+'" target="_blank" style="background:#00A650;color:#fff;padding:4px 10px;border-radius:5px;font-size:11px;font-weight:700;text-decoration:none">VivaReal</a>'+
    '</div></div>'+
    '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:10px">'+
    '<div class="fg"><label>Area (m2)</label><input type="number" id="acm-a" value="'+(a.area||'')+'" oninput="acmD['+i+'].area=this.value"></div>'+
    '<div class="fg"><label>Valor Prop (R$)</label><input type="number" id="acm-vp" value="'+(a.valprop||'')+'" oninput="acmD['+i+'].valprop=this.value"></div>'+
    '<div class="fg"><label>Status</label><select onchange="acmD['+i+'].feito=this.value!=\'Pendente\';acmD['+i+'].apres=this.value==\'Apresentado\'">'+
    '<option '+((!a.feito&&!a.apres)?'selected':'')+'>Pendente</option>'+
    '<option '+(a.feito&&!a.apres?'selected':'')+'>Feito</option>'+
    '<option '+(a.apres?'selected':'')+'>Apresentado</option></select></div></div>'+
    cens+
    '<div style="font-weight:700;font-size:12px;margin:8px 0">Amostras</div>'+
    (rows?'<div style="overflow-x:auto;margin-bottom:10px"><table style="width:100%;font-size:11px;border-collapse:collapse"><thead><tr><th style="padding:4px 6px;background:#f8f9fc;text-align:left">Fonte</th><th style="padding:4px 6px;background:#f8f9fc">Area</th><th style="padding:4px 6px;background:#f8f9fc">Valor</th><th style="padding:4px 6px;background:#f8f9fc">R$/m2</th><th style="padding:4px 6px;background:#f8f9fc">Ref</th><th style="background:#f8f9fc"></th></tr></thead><tbody>'+rows+'</tbody></table></div>'
    :'<div style="padding:8px;background:#f8f9fc;border-radius:6px;font-size:12px;color:#6b7280;margin-bottom:8px">Nenhuma amostra ainda.</div>')+
    '<div style="background:#f8f9fc;border-radius:8px;padding:10px">'+
    '<div style="font-weight:700;font-size:11px;margin-bottom:6px">+ Adicionar</div>'+
    '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin-bottom:6px">'+
    '<div class="fg"><label>Fonte</label><select id="am-f"><option>ZAP</option><option>OLX</option><option>VivaReal</option><option>Manual</option></select></div>'+
    '<div class="fg"><label>Area m2</label><input type="number" id="am-a" placeholder="80"></div>'+
    '<div class="fg"><label>Valor R$</label><input type="number" id="am-v" placeholder="250000"></div></div>'+
    '<div class="fg" style="margin-bottom:6px"><label>Referencia</label><input id="am-l" placeholder="Ex: Lagoa Quente"></div>'+
    '<button class="btn btn-blue btn-sm" onclick="addAm('+i+')">+ Adicionar</button></div>'+
    '<div class="fg" style="margin-top:8px"><label>Parecer</label><textarea id="acm-par" rows="2" oninput="acmD['+i+'].parecer=this.value">'+(a.parecer||'')+'</textarea></div>';
  oM('ACM - '+a.im,corpo,function(){pAcm();},'Salvar');
}

function addAm(i){
  var area=parseFloat(document.getElementById('am-a').value);
  var valor=parseFloat(document.getElementById('am-v').value);
  if(!area||!valor){alert('Informe area e valor.');return;}
  acmD[i].amostras.push({fonte:document.getElementById('am-f').value,area:area,valor:valor,local:document.getElementById('am-l').value||''});
  abrirACM(i);
}

function pdfACM(i){
  var a=acmD[i];var res=a.area?calcACM(parseFloat(a.area),a.amostras||[]):null;
  var rows=(a.amostras||[]).map(function(am,j){return '<tr><td>'+(j+1)+'</td><td>'+am.fonte+'</td><td>'+am.local+'</td><td>'+am.area+'m2</td><td>'+fBRL(am.valor)+'</td><td>R$ '+Math.round(am.valor/am.area).toLocaleString('pt-BR')+'</td></tr>';}).join('');
  var cens=res?'<div style="display:flex;gap:10px;margin:12px 0">'+
    '<div style="flex:1;border:1px solid #e2e5ed;border-radius:6px;padding:10px;text-align:center"><div style="font-size:9px;font-weight:700;color:#6b7280;text-transform:uppercase">Competitivo</div><div style="font-size:17px;font-weight:900">'+fBRL(res.comp)+'</div></div>'+
    '<div style="flex:1;border:2px solid #003DA5;border-radius:6px;padding:10px;text-align:center;background:#f0f4ff"><div style="font-size:9px;font-weight:700;color:#003DA5;text-transform:uppercase">Mercado</div><div style="font-size:17px;font-weight:900;color:#003DA5">'+fBRL(res.merc)+'</div></div>'+
    '<div style="flex:1;border:1px solid #e2e5ed;border-radius:6px;padding:10px;text-align:center"><div style="font-size:9px;font-weight:700;color:#6b7280;text-transform:uppercase">Otimista</div><div style="font-size:17px;font-weight:900">'+fBRL(res.otim)+'</div></div></div>':'<p>Sem amostras.</p>';
  var h='<!DOCTYPE html><html><head><meta charset="UTF-8"><style>body{font-family:Arial,sans-serif;font-size:12px;color:#111;margin:0}.c{background:#0f1a35;color:#fff;padding:32px 40px}.s{padding:16px 40px;border-bottom:1px solid #e2e5ed}.s h2{font-size:11px;font-weight:800;color:#D42028;text-transform:uppercase;margin-bottom:8px}table{width:100%;border-collapse:collapse;font-size:11px}th{background:#f0f4ff;padding:5px 8px;text-align:left;font-size:9px;text-transform:uppercase}td{padding:5px 8px;border-bottom:1px solid #e2e5ed}.ft{background:#0f1a35;color:#fff;padding:8px 40px;font-size:9px;display:flex;justify-content:space-between}@media print{body{-webkit-print-color-adjust:exact}}</style></head><body>'+
    '<div class="c"><div style="font-size:15px;font-weight:900;letter-spacing:2px">RE/MAX SPACE</div><div style="font-size:10px;opacity:.6;margin-bottom:12px">CRECI 41.377-J - Caldas Novas GO</div><div style="font-size:19px;font-weight:900">ESTUDO DE MERCADO</div><div style="opacity:.7;font-size:12px;margin-top:3px">'+a.im+'</div></div>'+
    '<div class="s"><h2>Imovel</h2><table><tr><th>Proprietário</th><th>Tipo</th><th>Area</th><th>Corretor</th></tr><tr><td>'+a.prop+'</td><td>'+a.tipo+'</td><td>'+(a.area||'-')+'m2</td><td>'+a.cor+'</td></tr></table></div>'+
    '<div class="s"><h2>Cenarios</h2>'+cens+'</div>'+
    (rows?'<div class="s"><h2>Amostras</h2><table><thead><tr><th>#</th><th>Fonte</th><th>Ref</th><th>Area</th><th>Valor</th><th>R$/m2</th></tr></thead><tbody>'+rows+'</tbody></table></div>':'')+
    (a.parecer?'<div class="s"><h2>Parecer</h2><p>'+a.parecer+'</p></div>':'')+
    '<div class="ft"><span>RE/MAX Space</span><span>CRECI 41.377-J</span><span>'+new Date().toLocaleDateString('pt-BR')+'</span></div></body></html>';
  var w=window.open('','_blank');w.document.write(h);w.document.close();setTimeout(function(){w.print();},500);
}

function nAcm(){
  acmD.push({id:acmD.length+1,im:'Novo',tipo:'CASA',prop:'',cor:corCad[0].nome,dt:new Date().toLocaleDateString('pt-BR'),val:'',feito:false,apres:false,obs:'',amostras:[],area:'',valprop:'',parecer:''});
  abrirACM(acmD.length-1);
}

// CONTRATOS
var ctContratos=[];
var ctDraft={};
var ctStep=0;

function pContratos(){
  var temChave=!!localStorage.getItem('rmxk');
  document.getElementById('pa').innerHTML=
    '<button class="btn btn-red" onclick="novoCT()">+ Novo Contrato</button>'+
    btnRel('ctr')+
    ' <button class="btn btn-sm btn-outline" onclick="cfgChave()">'+(temChave?'OK Chave API':'Configurar IA')+'</button>';
  var r='';
  ctContratos.forEach(function(c,i){
    var ok=[c.prop1_nome,c.im_end,c.comissao].filter(Boolean).length;
    r+='<tr><td>#'+(i+1)+'</td><td>'+(c.prop1_nome||'-')+'</td><td style="font-size:11px">'+(c.im_tipo||'-')+' '+(c.im_end||'-')+'</td>'+
      '<td>'+(c.comissao||'-')+'%</td><td>'+(c.dt_assin||'-')+'</td>'+
      '<td><span class="badge '+(ok>=3?'bg':ok>=2?'by':'br')+'">'+(ok>=3?'Completo':ok>=2?'Parcial':'Rascunho')+'</span></td>'+
      '<td style="display:flex;gap:3px">'+
      '<button class="btn btn-xs btn-blue" onclick="editCT('+i+')">Editar</button>'+
      '<button class="btn btn-xs btn-green" onclick="pdfCT('+i+',false)">PDF</button>'+
      '<button class="btn btn-xs" style="background:#7c3aed;color:#fff" onclick="pdfCT('+i+',true)">PDF s/capa</button>'+
      '<button class="btn btn-xs" style="background:#7c3aed;color:#fff" onclick="assinarD4Sign('+i+')">✍️ Assinar</button>'+
      '<button class="btn btn-xs" style="background:#fee2e2;color:#b91c1c" onclick="if(confirm(\'Excluir?\'))ctContratos.splice('+i+',1),pContratos()">Del</button>'+
      '</td></tr>';
  });
  document.getElementById('pc').innerHTML='<div class="card">'+
    (ctContratos.length?'<div class="tw"><table><thead><tr><th>#</th><th>Proprietário</th><th>Imovel</th><th>Comissao</th><th>Data</th><th>Status</th><th>Ações</th></tr></thead><tbody>'+r+'</tbody></table></div>'
    :'<div style="text-align:center;padding:40px;color:#6b7280"><div style="font-size:32px">📄</div><div style="margin-top:8px;font-weight:700">Nenhum contrato</div><div style="font-size:12px">Clique em + Novo Contrato</div></div>')+'</div>';
}

function cfgChave(){
  oM('Configurar Chave API',
    '<div style="font-size:12px;margin-bottom:10px;color:#374151">A chave permite que a IA leia RG/CNH e preencha automaticamente.<br>Obtenha em <strong>console.anthropic.com</strong></div>'+
    '<div class="fg"><label>Chave (sk-ant-...)</label><input type="text" id="cfg-k" value="'+(localStorage.getItem('rmxk')||'')+'" placeholder="sk-ant-api03-..."></div>',
    function(){var k=document.getElementById('cfg-k').value.trim();if(k)localStorage.setItem('rmxk',k);else localStorage.removeItem('rmxk');pContratos();},
    'Salvar');
}

function novoCT(){
  ctDraft={prop1_nome:'',prop1_rg:'',prop1_cpf:'',prop1_end:'',prop1_ec:'',prop1_email:'',prop1_tel:'',prop1_nac:'Brasileira',
    prop2_nome:'',prop2_cpf:'',prop2_rg:'',prop2_ec:'',
    im_tipo:'',im_end:'',im_comp:'',im_bairro:'',im_cep:'',im_cidade:'Caldas Novas',im_estado:'GO',
    im_itpu:'',im_matricula:'',im_cartorio:'',im_valor:'',im_obs:'',
    comissao:'6',prazo:'180',corretor_nome:'',corretor_creci:'',corretor_cpf:'',
    test1_nome:'',test1_cpf:'',test2_nome:'',test2_cpf:'',dt_assin:''};
  ctStep=0;wizCT(-1);
}
function editCT(i){ctDraft=JSON.parse(JSON.stringify(ctContratos[i]));ctStep=0;wizCT(i);}

// Aliases para compatibilidade
function eCT(i){ editCT(i); }
window.eCT = eCT;


function fld(id,lbl,tipo,val,opts){
  val=val||'';
  var key=id.replace(/-/g,'_');
  if(tipo==='sel'){var op=(opts||'').split(',').map(function(o){return '<option '+(val===o?'selected':'')+'>'+o+'</option>';}).join('');
    return '<div class="fg"><label>'+lbl+'</label><select id="'+id+'" onchange="ctDraft.'+key+'=this.value"><option value="">-</option>'+op+'</select></div>';}
  if(tipo==='ta') return '<div class="fg"><label>'+lbl+'</label><textarea id="'+id+'" oninput="ctDraft.'+key+'=this.value" style="min-height:48px">'+val+'</textarea></div>';
  return '<div class="fg"><label>'+lbl+'</label><input id="'+id+'" type="'+tipo+'" value="'+val.replace(/"/g,'&quot;')+'" oninput="ctDraft.'+key+'=this.value"></div>';
}

function wizCT(idx){
  var steps=['Proprietario','Imovel','Condicoes','Corretor'];
  var sw='<div style="display:flex;margin-bottom:16px">'+steps.map(function(s,si){
    var a=si===ctStep,d=si<ctStep;
    return '<div style="flex:1;text-align:center">'+
      '<div style="width:26px;height:26px;border-radius:50%;background:'+(d?'#059669':a?'#003DA5':'#e2e5ed')+';color:#fff;font-size:12px;font-weight:700;display:flex;align-items:center;justify-content:center;margin:0 auto 3px">'+(d?'&#10003;':si+1)+'</div>'+
      '<div style="font-size:9px;color:'+(a?'#003DA5':'#6b7280')+';font-weight:'+(a?'700':'400')+'">'+s+'</div></div>';
  }).join('')+'</div>';

  var body=sw;
  if(ctStep===0){
    body+='<div class="ct-section"><div class="ct-section-title">Upload RG/CNH - foto abre ao lado</div>'+
      '<div class="upload-zone" onclick="document.getElementById(\'up-doc\').click()">'+
      '<input type="file" id="up-doc" accept="image/*" onchange="prevDoc(this,\'pv-doc\',false)">'+
      '<div style="font-size:22px">&#128247;</div><div style="font-size:12px;font-weight:600">Foto do RG / CNH</div>'+
      '<div style="font-size:11px;color:#6b7280">'+(localStorage.getItem('rmxk')?'IA ativa - preenchimento automatico':'Foto abre ao lado para facilitar')+'</div></div>'+
      '<div id="pv-doc"></div></div>'+
      '<div class="ct-section"><div class="ct-section-title">Proprietario 1</div>'+
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">'+
      fld('prop1_nome','Nome Completo','text',ctDraft.prop1_nome)+fld('prop1_cpf','CPF','text',ctDraft.prop1_cpf)+
      fld('prop1_rg','RG','text',ctDraft.prop1_rg)+fld('prop1_ec','Estado Civil','sel',ctDraft.prop1_ec,'Solteiro,Solteira,Casado,Casada,Divorciado,Divorciada,Viuvo,Viuva,Uniao Estavel')+
      fld('prop1_tel','Telefone','text',ctDraft.prop1_tel)+fld('prop1_nac','Nacionalidade','text',ctDraft.prop1_nac||'Brasileira')+'</div>'+
      fld('prop1_end','Endereco','text',ctDraft.prop1_end)+fld('prop1_email','Email','email',ctDraft.prop1_email)+'</div>'+
      '<div class="ct-section"><div class="ct-section-title">Proprietario 2 (conjuge - opcional)</div>'+
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">'+
      fld('prop2_nome','Nome','text',ctDraft.prop2_nome)+fld('prop2_cpf','CPF','text',ctDraft.prop2_cpf)+
      fld('prop2_rg','RG','text',ctDraft.prop2_rg)+fld('prop2_ec','Estado Civil','sel',ctDraft.prop2_ec,'Solteiro,Solteira,Casado,Casada,Divorciado,Divorciada')+'</div></div>';
  }
  if(ctStep===1){
    body+='<div class="ct-section"><div class="ct-section-title">Upload Certidao/Matricula</div>'+
      '<div class="upload-zone" onclick="document.getElementById(\'up-cert\').click()">'+
      '<input type="file" id="up-cert" accept="image/*" onchange="prevDoc(this,\'pv-cert\',true)">'+
      '<div style="font-size:22px">&#128196;</div><div style="font-size:12px;font-weight:600">Certidao / Matricula</div>'+
      '<div style="font-size:11px;color:#6b7280">Foto abre ao lado para facilitar</div></div>'+
      '<div id="pv-cert"></div></div>'+
      '<div class="ct-section"><div class="ct-section-title">Dados do Imovel</div>'+
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">'+
      fld('im_tipo','Tipo','sel',ctDraft.im_tipo,'Casa,Apartamento,Terreno/Lote,Chacara,Fazenda,Flat/Hotel,Sala Comercial,Chale')+
      fld('im_cep','CEP','text',ctDraft.im_cep)+'</div>'+
      fld('im_end','Endereco','text',ctDraft.im_end)+
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">'+
      fld('im_comp','Complemento','text',ctDraft.im_comp)+fld('im_bairro','Bairro','text',ctDraft.im_bairro)+
      fld('im_cidade','Cidade','text',ctDraft.im_cidade)+fld('im_estado','Estado','text',ctDraft.im_estado)+
      fld('im_matricula','Matricula','text',ctDraft.im_matricula)+fld('im_itpu','ITPU','text',ctDraft.im_itpu)+'</div>'+
      fld('im_cartorio','Cartorio','text',ctDraft.im_cartorio)+fld('im_valor','Valor','text',ctDraft.im_valor)+fld('im_obs','Observacoes','ta',ctDraft.im_obs)+'</div>';
  }
  if(ctStep===2){
    body+='<div class="ct-section"><div class="ct-section-title">Condicoes</div>'+
      '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px">'+
      fld('comissao','Comissao %','text',ctDraft.comissao||'6')+fld('prazo','Prazo dias','text',ctDraft.prazo||'180')+fld('dt_assin','Data Assinatura','date',ctDraft.dt_assin)+'</div></div>'+
      '<div class="ct-section"><div class="ct-section-title">Testemunhas</div>'+
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">'+
      fld('test1_nome','Testemunha 1 Nome','text',ctDraft.test1_nome)+fld('test1_cpf','Testemunha 1 CPF','text',ctDraft.test1_cpf)+
      fld('test2_nome','Testemunha 2 Nome','text',ctDraft.test2_nome)+fld('test2_cpf','Testemunha 2 CPF','text',ctDraft.test2_cpf)+'</div></div>';
  }
  if(ctStep===3){
    var corOpts=corCad.map(function(c){return '<option '+(ctDraft.corretor_nome===c.nome?'selected':'')+'>'+c.nome+'</option>';}).join('');
    body+='<div class="ct-section"><div class="ct-section-title">Corretor</div>'+
      '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px">'+
      '<div class="fg"><label>Corretor</label><select id="sel-cor" onchange="var c=corCad.find(function(x){return x.nome===this.value;},this);ctDraft.corretor_nome=this.value;if(c){ctDraft.corretor_creci=c.creci||\'\';ctDraft.corretor_cpf=c.cpf||\'\';document.getElementById(\'cor-creci\').value=ctDraft.corretor_creci;document.getElementById(\'cor-cpf\').value=ctDraft.corretor_cpf;}"><option value="">-</option>'+corOpts+'</select></div>'+
      '<div class="fg"><label>CRECI</label><input id="cor-creci" value="'+(ctDraft.corretor_creci||'')+'" oninput="ctDraft.corretor_creci=this.value"></div>'+
      '<div class="fg"><label>CPF Corretor</label><input id="cor-cpf" value="'+(ctDraft.corretor_cpf||'')+'" oninput="ctDraft.corretor_cpf=this.value"></div></div></div>'+
      '<div class="ct-section" style="background:#f0fdf4;border-color:#86efac"><div class="ct-section-title" style="color:#15803d">Resumo</div>'+
      '<div style="font-size:12px;line-height:2">'+
      '<div>Proprietario: <strong>'+(ctDraft.prop1_nome||'-')+'</strong></div>'+
      '<div>Imovel: '+(ctDraft.im_tipo||'-')+' - '+(ctDraft.im_end||'-')+'</div>'+
      '<div>Valor: '+(ctDraft.im_valor||'-')+' | Comissao: '+(ctDraft.comissao||'-')+'% | Prazo: '+(ctDraft.prazo||'180')+' dias</div>'+
      '</div></div>';
  }

  body+='<div style="display:flex;justify-content:flex-end;gap:8px;margin-top:14px;padding-top:12px;border-top:1px solid #e2e5ed">'+
    (ctStep>0?'<button class="btn btn-gray btn-sm" onclick="saveCT();ctStep--;wizCT('+idx+')">Voltar</button>':'')+
    '<button class="btn btn-outline btn-sm" onclick="cM()">Cancelar</button>'+
    (ctStep<3?'<button class="btn btn-blue" onclick="saveCT();ctStep++;wizCT('+idx+')">Proximo</button>'
    :'<button class="btn btn-red" onclick="saveCT();storeCT('+idx+');cM();pContratos()">Salvar</button>'+
     ' <button class="btn btn-green" onclick="saveCT();storeCT('+idx+');pdfCT('+(idx>=0?idx:'ctContratos.length-1')+',false)">PDF</button>')+'</div>';

  oM('Contrato - Etapa '+(ctStep+1)+'/4',body,null);
}

function saveCT(){
  document.querySelectorAll('#mb input,#mb select,#mb textarea').forEach(function(el){
    if(el.id&&el.id!=='up-doc'&&el.id!=='up-cert') ctDraft[el.id.replace(/-/g,'_')]=el.value;
  });
}
function storeCT(idx){saveCT();if(idx>=0)ctContratos[idx]=JSON.parse(JSON.stringify(ctDraft));else ctContratos.push(JSON.parse(JSON.stringify(ctDraft)));}

function prevDoc(input,divId,isImovel){
  var file=input.files[0];if(!file)return;
  var reader=new FileReader();
  reader.onload=function(e){
    var src=e.target.result;var b64=src.split(',')[1];var mime=file.type||'image/jpeg';
    var div=document.getElementById(divId);if(!div)return;
    var key=localStorage.getItem('rmxk')||'';
    div.innerHTML='<div style="margin-top:8px;border:1px solid #e2e5ed;border-radius:8px;overflow:hidden">'+
      '<div style="background:#003DA5;color:#fff;padding:6px 10px;font-size:11px;font-weight:700">'+(key?'IA lendo...':'Documento carregado')+'</div>'+
      '<div style="display:grid;grid-template-columns:1fr 1fr">'+
      '<div style="padding:8px;background:#f8f9fc;border-right:1px solid #e2e5ed">'+
      '<img src="'+src+'" style="width:100%;max-height:240px;object-fit:contain;cursor:zoom-in" onclick="zoomFoto(this)">'+
      '<div style="font-size:10px;color:#6b7280;text-align:center">Toque para ampliar</div></div>'+
      '<div id="ai-r" style="padding:10px;font-size:11px">'+(key?
        '<div style="color:#003DA5">Lendo...</div>':
        '<div style="color:#6b7280">Olhe a foto e preencha os campos abaixo.<br><br>Para automatico configure a chave API.</div>')+
      '</div></div></div>';
    if(!key)return;
    var prompt=isImovel?
      'Analise este documento de imovel. Retorne SOMENTE JSON valido: {"tipo_imovel":"","endereco":"","complemento":"","bairro":"","cep":"","cidade":"","estado":"","numero_matricula":"","cartorio":"","classificacao_itpu":"","observacoes":""}':
      'Analise este documento de identidade brasileiro. Retorne SOMENTE JSON valido: {"nome":"","cpf":"","rg":"","estado_civil":"","telefone":"","email":""}';
    fetch('https://api.anthropic.com/v1/messages',{method:'POST',
      headers:{'Content-Type':'application/json','x-api-key':key,'anthropic-version':'2023-06-01','anthropic-dangerous-direct-browser-access':'true'},
      body:JSON.stringify({model:'claude-sonnet-4-5',max_tokens:500,messages:[{role:'user',content:[{type:'image',source:{type:'base64',media_type:mime,data:b64}},{type:'text',text:prompt}]}]})
    }).then(function(r){return r.json();}).then(function(d){
      var res=document.getElementById('ai-r');if(!res)return;
      if(d.error){res.innerHTML='<div style="color:#b91c1c">Erro: '+d.error.message+'</div>';return;}
      try{
        var txt=d.content[0].text.replace(/```json|```/g,'').trim();
        var dd=JSON.parse(txt);
        if(isImovel){
          var mp={tipo_imovel:'im_tipo',endereco:'im_end',complemento:'im_comp',bairro:'im_bairro',cep:'im_cep',cidade:'im_cidade',estado:'im_estado',numero_matricula:'im_matricula',cartorio:'im_cartorio',classificacao_itpu:'im_itpu',observacoes:'im_obs'};
          Object.keys(mp).forEach(function(k){if(dd[k]){var el=document.getElementById(mp[k]);if(el){el.value=dd[k];el.style.background='#f0fdf4';}ctDraft[mp[k]]=dd[k];}});
          res.innerHTML='<div style="color:#15803d;font-weight:700">OK - Preenchido!</div><div style="font-size:10px;margin-top:4px;color:#374151">'+(dd.endereco||'')+' '+(dd.numero_matricula?'Mat:'+dd.numero_matricula:'')+'</div><div style="font-size:10px;color:#6b7280;margin-top:4px">Revise os campos em verde.</div>';
        }else{
          if(dd.nome){var el=document.getElementById('prop1_nome');if(el){el.value=dd.nome;el.style.background='#f0fdf4';}ctDraft.prop1_nome=dd.nome;}
          if(dd.cpf){var el=document.getElementById('prop1_cpf');if(el){el.value=dd.cpf;el.style.background='#f0fdf4';}ctDraft.prop1_cpf=dd.cpf;}
          if(dd.rg){var el=document.getElementById('prop1_rg');if(el){el.value=dd.rg;el.style.background='#f0fdf4';}ctDraft.prop1_rg=dd.rg;}
          if(dd.estado_civil){var el=document.getElementById('prop1_ec');if(el)el.value=dd.estado_civil;ctDraft.prop1_ec=dd.estado_civil;}
          if(dd.telefone){var el=document.getElementById('prop1_tel');if(el){el.value=dd.telefone;el.style.background='#f0fdf4';}ctDraft.prop1_tel=dd.telefone;}
          res.innerHTML='<div style="color:#15803d;font-weight:700">OK - Preenchido!</div><div style="font-size:10px;margin-top:4px;color:#374151">'+(dd.nome||'')+' CPF:'+(dd.cpf||'')+'</div><div style="font-size:10px;color:#6b7280;margin-top:4px">Revise os campos em verde.</div>';
        }
      }catch(e){res.innerHTML='<div style="color:#b91c1c">Nao consegui ler - preencha manualmente.</div>';}
    }).catch(function(e){var res=document.getElementById('ai-r');if(res)res.innerHTML='<div style="color:#b91c1c">Erro de conexao.</div>';});
  };reader.readAsDataURL(file);
}

function zoomFoto(el){var ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,.85);z-index:9999;display:flex;align-items:center;justify-content:center;cursor:zoom-out';ov.onclick=function(){document.body.removeChild(ov);};var img=document.createElement('img');img.src=el.src;img.style.cssText='max-width:90vw;max-height:90vh;border-radius:8px';ov.appendChild(img);document.body.appendChild(ov);}

function pdfCT(i,semCapa){
  var c=typeof i==='number'?ctContratos[i]:ctDraft;
  if(!c)return;
  if(semCapa===undefined)semCapa=false;
  var dt=c.dt_assin?new Date(c.dt_assin).toLocaleDateString('pt-BR',{day:'2-digit',month:'long',year:'numeric'}):'_____ de _____________ de 2025';
  var pct=c.comissao||'6';
  var pctx={'1':'um','2':'dois','3':'tres','4':'quatro','5':'cinco','6':'seis','7':'sete','8':'oito'}[pct]||pct;
  var pr=c.prazo||'180';
  var prx={'90':'noventa','120':'cento e vinte','180':'cento e oitenta','360':'trezentos e sessenta'}[pr]||pr;

  var CSS = [
    '@page{margin:15mm 16mm;}',
    'body{font-family:Arial,sans-serif;font-size:10.5px;color:#111;line-height:1.7;margin:0;}',
    // CAPA
    '.capa{background:#D42028;min-height:100vh;display:flex;flex-direction:column;page-break-after:always;overflow:hidden;}',
    '.capa-top{padding:28px 36px 0;color:#fff;flex:1;}',
    '.capa-sub{font-size:8px;letter-spacing:2px;text-transform:uppercase;opacity:.8;margin-bottom:20px;}',
    '.capa-top h1{font-size:20px;font-weight:900;margin:0 0 3px;color:#fff;}',
    '.capa-top h2{font-size:28px;font-weight:900;margin:0 0 20px;color:#fff;line-height:1.2;}',
    '.capa-img{background:#d4c4b0;min-height:200px;display:flex;align-items:center;justify-content:center;color:#999;font-size:12px;}',
    '.capa-bot{background:#fff;padding:12px 36px;display:flex;justify-content:space-between;align-items:center;}',
    // PAGINA 2 - BEM VINDO
    '.pg2{page-break-after:always;padding:28px 36px;}',
    '.sep{border-top:2px solid #ccc;border-bottom:2px solid #ccc;padding:18px 0;margin-bottom:0;}',
    '.bvt{font-size:22px;font-weight:900;color:#003DA5;margin-bottom:10px;}',
    '.bvt span{color:#D42028;}',
    '.bvtx{font-size:10px;line-height:1.85;column-count:2;column-gap:22px;}',
    '.bv-logos{font-size:8.5px;color:#888;margin-top:10px;border-top:1px solid #ccc;padding-top:8px;}',
    // CORPO
    '.corpo{padding:22px 36px 28px;}',
    '.intro{font-size:10.5px;margin-bottom:14px;line-height:1.7;}',
    'h3{font-size:9.5px;font-weight:900;text-transform:uppercase;color:#D42028;letter-spacing:.5px;margin:14px 0 4px;}',
    '.tbl-h{background:#003DA5;color:#fff;padding:4px 7px;font-size:8.5px;font-weight:700;text-transform:uppercase;}',
    'table.t{width:100%;border-collapse:collapse;margin-bottom:12px;}',
    'table.t td{border:1px solid #003DA5;padding:5px 7px;font-size:10px;vertical-align:top;}',
    'table.t td.lb{background:#003DA5;color:#fff;font-weight:700;font-size:8px;text-transform:uppercase;width:26%;}',
    '.ig{display:grid;grid-template-columns:1fr 1fr;gap:0;border:1px solid #003DA5;margin-bottom:12px;}',
    '.ic{padding:4px 7px;border-right:1px solid #003DA5;border-bottom:1px solid #003DA5;}',
    '.ic:nth-child(2n){border-right:none;}',
    '.if{grid-column:1/3;border-right:none;}',
    '.ic label{font-size:7.5px;color:#003DA5;font-weight:700;text-transform:uppercase;display:block;margin-bottom:1px;}',
    '.ic span{font-size:10.5px;font-weight:600;}',
    '.cl{margin-bottom:7px;font-size:10.5px;line-height:1.7;}',
    '.nota{font-size:8.5px;color:#555;margin-top:8px;border-top:1px solid #ccc;padding-top:6px;}',
    '.sg{display:flex;gap:30px;margin:28px 0 10px;}',
    '.sb{flex:1;text-align:center;border-top:1px solid #111;padding-top:5px;font-size:9.5px;}',
    '.tg{display:grid;grid-template-columns:1fr 1fr;gap:30px;margin-top:22px;}',
    '.ft{background:#003DA5;color:#fff;padding:7px 36px;display:flex;justify-content:space-between;font-size:8.5px;margin-top:18px;}',
    '@media print{body{-webkit-print-color-adjust:exact;print-color-adjust:exact;}}'
  ].join('');

  var anoDoc = new Date().getFullYear();
  var nomeImovel = (c.im_tipo||'Imóvel')+' — '+(c.im_end||'Endereço a definir');
  var nomeProp = c.prop1_nome || '';
  var CAPA = semCapa ? '' :
    '<div style="background:#0f1a35;min-height:100vh;display:flex;flex-direction:column;page-break-after:always;font-family:Arial,sans-serif;">'+

      // TOPO — faixa vermelha fina
      '<div style="background:#D42028;height:6px;width:100%"></div>'+

      // HEADER BRANCO
      '<div style="background:#fff;padding:24px 40px;display:flex;justify-content:space-between;align-items:center">'+
        '<div style="display:flex;align-items:center;gap:14px">'+
          // Balão SVG correto 4 quadrantes
          '<img src="data:image/png;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAQ4BDgDASIAAhEBAxEB/8QAHQABAAEFAQEBAAAAAAAAAAAAAAgEBQYHCQMBAv/EAFkQAQABAwIDAwULCQUFAwgLAAABAgMEBQYHESESMUEIE1FWYRQWGCIyQnGBlJXSFSM1UmJyc5HTM4KSobEkQ1OiwWODsgkXJTR1wtHwJjY3RFdkk6OztOH/xAAcAQEAAgMBAQEAAAAAAAAAAAAABAUCAwYHAQj/xAA/EQEAAQMBAwcJCAICAgIDAAAAAQIDBBEFEjEhQVFhkbHRBhMUFSJSU3GBFjIzNFRyocFC8AcjkuEkQ2Ki8f/aAAwDAQACEQMRAD8AjUA6NSgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAvW39p7o3Dy/IO3dW1OJnl2sTDuXaY+maYmIbD0HycOLeq8qq9u2tOtzMR283Lt0f8sTNX+TCq5RTxllFFVXCGohJfRfJB3Te7M6zu3R8KJ7/ctm5kTHX9rseDMdK8kDbNvs/lXd+r5Xp9zWLdjn/i7ftaZy7Uc7bGPcnmQ3E79O8lnhXi9nz9rWc7lHXz+dy59P8As6afpX3E8nng9jUdmnZ1u5MxETVdzciuZ5ePW5yj6uTCc631s4xa3PMdI8fgzwrsVTVRsTRJmY5fHsduP5Vc1Xj8KuGdiZmjYG2Z59/b0y1X/wCKmeTD0+joffRKulzRHTT/AM2fDf8A/D7af3Nj/gU1zhLwxrrqrq2DtyJmec9nT7cR/KI5Qen09B6JV0uag6O5XBDhPkRVFzY2l09qec+biq3/AC7Mxy+iFnzvJw4PZPOadrV49UzzmqzqGRH+U1zEfyZRn2+iXz0Svpc+hOTUvJP4aZMTOLmbhwauXTzWXbqp+uK7cz/mxXVvI8wK+1Ok75ybPopycCm5z+umun/RnGZannYzjXIRFEhtb8krf+Lzr0zWNB1GiO6mbtyzcn6pomn/AJmBa/wK4saLFVWTsvPyKI7qsKaMrn9Vuap/ybab9urhU1zarjjDWwq9T03UdLyPc+pYGVhXv+HkWardX8qoiVI2sAAfAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHri49/KyLeNi2Lt+/cqim3bt0TVVVM+ERHWZB5DdPD7yauI+6KbeTqGJZ25g1dfOahMxemPZaj43P2VdlIPYfkv8O9A83f1qMvcmZT1mcqrzdjn7LVE93sqqqR7mVbo59W+ixXVzIR6Foes69mRh6JpOdqeRPL81iWKrtUfTFMTybh2d5L3EzW+xd1S1gbfx56zOZf7d3l7KLfa6+yqaU49H0rTNGwaMHSNOxNPxaPk2cWzTaoj6KaYiFYh159U/djRIpxKY+9KOW0/JJ2bgxTc3FruqazdjvosxTjWp9kxHaq/lVDbG2OE3DfbdNP5J2bpFu5R8m7esefux9FdztVR/Nmoi13rlfGW+m1RTwh8pppppimmmKaYjlERHKIh9WPce8dp7ciZ17cmk6ZMfMycuiiufopmec/VDXG4PKX4S6V2qbOt5Wq3Kek0YOHXP8qq4ppn6pR6rlNPGUy1iX734dEz9G4xF/W/LC0O12o0TZeo5ff2aszLosfRMxTFf8ubDNX8rze17tRpe29Aw6Z58pvRdvVR3+MVUxz7vBqnKtRzp9vYWbX/AIafOYTTEA9S8pzi7lTM2NawcDn3Rj6fanl1/wC0ir6Fgy+OvFvKnnd3xqNPf/ZU27ff+7TDCc2jolKp8m8qeNVMdvg6NjmdkcVeJl/s9vf+547Pd5vU71H8+zVHNR5HELf2RVFWRvjc16YjlE16rfq5fzqY+m09DdHkzd564dPRy99/W9vXHcP3ne/ErKeJ3EmJiY4g7s6deusZE/8AvvnptPQT5MXea5HY6bDmzjcZuKmPMzb33rdXPlz85kTc7v3ufJkGkeUJxppr7FjdFeXHjTc0/Hr/AM/N84/m++nW45ZhjHkvlVzu26omfr4OgwhjovlIcW7Mx7uw9s5VPjF7HuU1fVNuuIZnpflQanRRFOqbNw71XjXjahVbj/DVbq/1YetMXnqS/sHt2Y1psa/WI75hJsaS0rylNmZFFuNQ0rWcK7Pyuzbt3bdP1xVFU/4Wb6LxZ4c6vXVRibu063NMc591VVY3P6POxTz+pvt5mPc+7XHaqsvya2tict7HriOnSZjtjWGXajgYOpYtWLqOFjZlir5Vq/apuUT9MTEw1xurgFwp3D267u1cfT79Xdd06urG7P0U0/E/nTLZeLkY+Xj0ZGLftX7NyOdFy3XFVNUemJjpL0S6a6qeWmVHVRE8lUIq7u8kDGqiq7tPd123PzbGp2Yrif8AvLfLl/glpnefAPiltjt3L+27up41H+/0yr3RTPt7MfHiPbNMOiAk0ZtynjytFWNRPDkcor9q7YvV2b9qu1dons1UV0zFVM+iYnufh0+3jsbZ+8LM2ty7d07Up7PZi7dtRF2mP2bkcq6fqmGh9++SRoWZFzJ2Xr2Rpl6ecxi50eeszPoiuOVdMe2e3KXbzqKvvciPXi1Rw5UORn/ELg7xD2NFy9rW379zBo787D/P2OXpmqnrRH78UsATKaoqjWJR5pmmdJAH1iAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAArNG0vUtZ1KzpukYGTn5t+ezasY9ua6659kR1H1RrltzQda3HqVGm6DpWZqWZX3Wsa1NdUR6Z5d0e2ekJI8J/JRzcum1qXEPPqwbc8qo0zDriq7Mei5c600/RTz+mJSk2jtbbu0tLp0zbej4mmYscudFijlNcx41VT8aufbVMyh3c2inkp5ZSbeNVVy1ciK/DPyTNUzItZu/tWp061PKfcGBVFy9PsquTzopn92K/phJfYXDvZmxsaLW2dAxMK5NPZryOz279z965VzqmPZz5eiGVCuuX67n3pTKLVFHCAa14i8cuHOx/OWM/XKM/UKO/B07lfuxPoqmJ7NE+yqqJRy4geVju/VJuY20dNxNAxp6U37sRkZHL0x2o7FP0dmr6UOvIt0cZW2LsnKyeWmnSOmeRM7U9QwNLwq83Us3GwsW3HOu9kXabdFP01VTEQ1DvTyl+F23puWcTUcnXsmieXm9Ns9qjn/EqmmiY9tM1IM7n3NuHc+dObuHWs/VL/OZirJv1V9nn4UxPSmPZHKFpRK82qfuw6DH8mrdPLeq1+XJ/v8ACSm7/K63XmzXa2xt7TdJtT0i7k11ZN2PbHyaY+iYqai3Vxb4k7n7dOr7x1Wu1X8qzYu+57Ux6Jot9mmfrhhAjVXq6uMrmxs7Fsfcojvntl9qqqqqmqqqaqpnnMzPOZl8BrTQAAAAAAiJmeURzmRk22tLi3RTm5FPOurrbpn5sen6Wm9eptU70rDZmzru0L8WqPrPRDy0jQO1EXs6JiJ6xajpP1//AAZDat27VEUWqKaKY7opjlD9iku3q7s61S9T2fszHwKN21Ty8888gDSsAAFZpGq6po+V7q0nUszT7/KY87i36rVfKfbTMS2HtrjvxF0bsUXdUsatYop7MW8+xFc/TNdPZrmfpqlrAbrWRdtfcqmFdnbHwM+NMmzTX84jXt4wk/tjymdIvxTb3Ht7Lwq+URN7DuReomfGZpq7M0x9E1S2ztTf+zd01U29C3Fg5V6qZimxNU2708o5zyt1xFUx7eSA4s7O279H34ir+P8Aexw20v8Ai/ZeRrOLVVan/wAo7J5f/wBnR4Qe2dxe39tebdvE1y7m4tHZj3Ln879vsxHKKYmZ7VMRHhTVDduyPKQ29qHYx906ff0e/MRE5FnnesTPLrMxEdunnPdERV7ZXFja+Pd5Jndnr8XnO1v+O9sYGtVunztPTTx/8ePZq3pMRMcp6w1XxJ4B8Ot6xcyLmkxo+pV86vdmmxFqqqqfGujl2K+vfMxz9sNi6HrOk67gU52jali6hjVf7zHuxXET6J5d0+yesK9a0XJj2qZcLdtTTM0XI0mOaUDeJvk0792p5zL0a1TubTaecxXhUTGRTH7VnrM/3JqaTu267Vyq1doqouUTNNVNUcppmO+Jjwl1eYBxQ4QbG4h2bletaVRZ1GaeVGo4vK3kUz4c5jpXEeiqJj0ck+1nTHJXCFcxY40ubw3Txb8nPeuyou6hpVudx6PTzmb+Janz1qP27XWeXtp7Uenk0ssaLlNca0yh1UTTOkgDJiAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC+7H2huLeuu29F21pl7Oy6+tXZjlRap/XrqnpTT7Z+jvTS4IeTrtvY/mNY3D5nXdwU8qqaq6OePjVd/wCbpn5Ux+vV16c4ilovZFFqOXi227NVzgj/AMF/Jz3VveLOq6753b+hV8qqbl23/tGRT3/m6J7omPnVdO6YipMbhzw72jw/0z3FtnSbWNVVTEXsqv4+Rf8AbXXPWevXlHKI8IhlYqr2RXd48Fhbs00cOI+V1U0UVV11RTTTHOqqZ5REelqPi/5QGydgTdwLV78u63RM0zg4dyOVqr0XbnWKPojnV7EP+KvGffXES7ctarqU4el1T8XTcKZt2OX7XXnXP70z7IhAu5NFHJxle4OxcjK0qn2aemf6hK7in5SuxdoTdwtFr982qUc483iXIjHon9q91if7sVe3kizxM46cQ99Tex8zV6tN0y5zj3Bp/O1bmn0Vzz7Vf96Zj2Q1iK+5kV18/I6zD2RjYvLEaz0z/vIANK0AAAAAAAAAAAAV+g4cZmoUUVRzt0fHr9sR4M2WTaFiKMG5fmOtyvl9Uf8A+zK9qTNub9zTmh6j5MYUY+FFf+VfLPy5v45fqAIbogAAAAAAAAAFw0HW9X0HOjO0XUsrT8mOnnMe7NEzHonl3x7J6N5bA8pLPxooxN6abGdbjp7tw6You+PWq30pq8PkzTyiO6UfRJx8y9jz/wBdX05lJtfyc2btenTLtRM9PCqPrHL9OHU6B7R3Zt3dmD7s29q2PnW45dumieVy3z58u3RPKqnunviOa9udek6lqGkaha1DS83Iwsu1PO3esXJorp+uG/uGnlG5Fqq1p++sWL9uZ7P5SxbcU109e+5bjpMde+jl0j5My6HF21buezd9mf4/9PHtv/8AGeZh63cCfO0dH+Uf1V9NJ6klmoeMXADZu/6b2oY1mnQtdr51e7cW3HYu1f8Aa2+kVfTHKr2z3Nn6BrOla/plrU9F1DHz8O7HxbtmuKo58ufKfGKo59YnlMeMK9e27k0+1RLzG7ZmmZouRpMcYlzW4p8Lt4cONQ8xuDT5nErq5WM+xzrx730Vcuk/s1cp9nLqwh1W1bTsDV9Ov6bqmFj5uHkUzRdsX7cV0Vx6JieiJ/HHyXr2JTe1zhtFeRZjnXd0i5XzuUx/2NU/K/dqnn6JnpCzsZkVclfJKvu4008tKLI9Mmxfxcm5jZNm5Yv2qpouW7lM01UVRPKYmJ6xMT4PNORAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH2ImZ5RHOQfG3eBHAvcPEnJt6jlec0nbdNX5zNro+Pf5T1ps0z8qf2p+LHtmOTYnk7eTdd1GMfdHETFuWMOeVzF0mvnTXejviq9400/sd8+PKOky7xrFjFxreNjWbdixapii3bt0xTTRTEcoiIjpERHggZGZFPs0cUuzj68tSxbA2XtzYug29G23p1vEx6eU3K++5eq/Xrq76p/wBO6OUdGQjQfHjyjtE2XVkaFtTzGta/RzouV8+1jYlXoqmJ+PXH6tM9OvOYmOSpuXYp9qqVti4lzIri3ap1bZ4gb42xsPRKtW3NqdrDs9YtW/lXb1X6tFEdap/yjx5Qhpxn8pLdW8pv6Xtub23dDr50zFuvllX6f264+TE/q0+mYmaoai3hufX93a3d1nceqZGo5tzpNy7V0pjwpppjpTT7IiIWdWXsqqvkjkh2mz9h2cbSu57VX8R8vEmZmec9ZARl6AAAAAAAAAAAAAAAAzbb1PZ0fHj00zP85mVeotD/AERjfuK1zl38Sr5y9n2fERiWoj3ae6ABrTAAAAAAAAAAAAAAF82buzcG0NTjUNv6lew7s8vOURPO3diPCuielUdZ7+7n05SlDwo476DujzOm7h81ousVcqYmqrljX6v2ap+RMz82r2cqpmUQhOxM+7jT7M6x0OX8oPJHZ+3KZm9Tu3OauOP16Y6p+kw6PCHvCHjfrez4s6VrcXdX0OnlTTTNXO/jUx/w6pnrHL5lXTpHKaevOV21tw6NujR7eraFn2s3Drmae3Rziaao76aonrTV1jpMRPWPS6vEzrWVHs8eh4D5Q+SudsK5pfjWieFUcJ8J6p+mrX3HHgjtniXi15sU0aXuGinla1G1R/aco6U3aY+XT3Rz+VHhPLpMGeIuxty7B1+vRty6fVjXus2btPxrORTHz7dXzo/zjumIno6dsf39s3b2+dvXdD3Jp9GXi19aKu65Zr8K6Ku+mqPT9U84mYW9jKqt8k8sOSu2Ir5Y4uX42lx34Ma/wx1Gcie3qO379fLG1Cij5M+FF2I+TX6PCrlzjxiNWraiuK41pV9VM0zpIAyYgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPfT8PL1HPsYGBjXcrKyLkW7Nm1TNVdyqZ5RTER3zMj6/OJj5GXlWsXEsXcjIvVxbtWrVE1V11TPKKaYjrMzPhCZ/k1+T3jbYoxt2b2x7WTrkxFzFwaoiq3heiqrwqu/5Uz3c56xefJs4E4WwcWzuPcVu3l7pu0dI5xVbwYmPk0emvl0mv6Yjpzmrearycve9mjgnWMfT2qhSaxqWn6PpmRqmq5ljCwsaibl6/erimiimPGZla9/bx2/sbbl/Xtx51OLiWulNPfcvV+FFFPzqp9H1zyiJlAjjnxj3DxP1WaL1Ven6FZr54um0V86Yn9e5Pz6/b3Rz5R4zNTev02o61/s3Zd3Nq14UxxnwZ95QflIajuicjbmxrt/TdEmZovZsTNGRmR3TEeNu3Po+VMd/KJmlHQFXXcqrnWp3eLiWsWjctRpHf8AMAYJIAAAAAAAAAAAAAAAAADOND/RGN+4rVFof6Ixv3Fa5y79+r5vaMD8ra/bHdAA1pYAAAAAAAAAAAAAAAAyDYm8df2VrNOqaDmTZr5x56zXzmzfpj5tdPPrHWfRMc+kxPVj4yorqoqiqmdJhpyMa1k2qrN6mKqZ4xPLEpv8I+Keg8QMLzdmYwdYtU87+Bcr51cv17c/Pp/zjxiOcTOfudGnZuXp2dZzsDJu42VYriu1dtVTTVRVHjEwlfwM414u64saBuauzia70os3o+LbzZ9kd1Nz9numfk8ufZjqdn7Vi9pbu8lXf/7eD+WHkBc2bvZeBE1WuMxxmnxp6+Mc/S29q2nYOraZkaZqeJZzMLJtzbvWLtMVUV0z3xMShD5SHAPN2Hevbj2xbvZu2K6pquUdarmBMz0pqnvqo69K++O6rwmZ0PxkWbORj3MfItUXrN2maLluumKqa6ZjlMTE9JiY8HQWb9VqdY4PLrlqLkcrlEJF+VDwEr2pXf3hs3FruaBVPbzMOjnVVgz+tT4za/8AD9HdHRdW7lNynepVldE0TpIAzYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPsRMzyiOcg9MXHv5eVaxcWzcv371cW7Vu3TNVVdUzyimIjrMzM8uSc/kwcEbOwNOo3FuOxZvboyaPix0qjAtzHyKZ7prn51Ufux05zVZfJN4I07aw7G+N2Yn/AKcyKO1g4l2jrhW5j5dUT3XZj/DE8u+Z5SOVeXk73sU8E/Hsae1UMQ4s8QtA4b7Wua5rl7tV1c6MTEoqjzuVc5fJp9npq7oj6on88XeIeh8NtpXtc1e5Fd6YmjDw6a+VzKu8ulNPojxmruiPqieeXEjfG4N/7mv69uHLm7ermYs2aZmLWPR4UW6fCI/nPfPOeqnyMiLcaRxdLsnZNWZVv18lEfz1QrOLHEXcXEjctesa7kTFqiZjEw6Kp81i0T82mPTPKOdXfM/VEYcCrmZqnWXd27dNumKKI0iAB8ZgAAAAAAAAAAAAAAAAAAAM40P9EY37itUWh/ojG/cVrnLv36vm9owPytr9sd0ADWlgAAAAAAAAAAAAAAAAABEzE84nlMACTXAHjb7u9z7W3plz7smYt4Wo3Jjle8Iouz+v3RFfzvHr1qkI5wpJ+Tvxm877m2hu/L/OdLeBn3avleEWrkz4+EVT3909eUz0mzNqa6Wr0/KfF4r5ceQkW4q2hs6nk41URzddMdHTHNxjk4SJu26Ltuq1doprt1xNNVNUc4qie+JjxhCjyp+BdW0ci7vDaOJXVt+9VNWXjURz9wVzPfH/AGUzP92endMJsvLLx8fLxb2JlWbd/HvUVW7tq5TFVNdFUcppmJ6TExPLk6ezeqtVaw8auW4uRpLlIN2eU/wZvcO9anW9DtXLm2M67Pm/GcO5POfNVT3zT+rVPh0nrHOdJruiuK6d6lV1UzTOkgDJiAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJO+R7wZp1a/Z4hbpxIqwLNfPScW7Tzi/cif7aqJ+bTMfFjxqjn3RHa115NPCi9xL3f5zOort7d02qm5n3Y5x52e+mzTPpq5dZjujn4zHPoHiY+PiYtnExbNuxj2aKbdq1bpimmiimOUUxEdIiIjlyQMzI3Y3KeKXjWd72perGeJm9tD4f7Sydxa7f7Fm1HZs2aZjzmRdmJ7NuiPGZ5fVETM9Ildty63pe3NBzdc1nLoxNPwrU3b92vupiPCI8ZmeUREdZmYiOsud/HfijqvFDd1eo5HnMbSsbnb07C7XOLVHjVPhNdXLnM/RHdEKS/ei3HW6TZWzas25y8lEcZ/paOKu/dc4i7tyNf1u7MdqexjY1NUzbxrXPpRT/ANZ8Z5yxMFTMzM6y9At26bdMUUxpEAD4zAAAAAAAAAAAAAAAAAAAAAAZxof6Ixv3FaotD/RGN+4rXOXfv1fN7RgflbX7Y7oAGtLAAAAAAAAAAAAAAAAAAAAAASg8m3i9+VKcfZm6Mn/b6KYt6dl1/wD3imI6Wq5/XiI6T87un43Ltb+c4qK6rddNdFVVNdM86aonlMT6YTA8nfipTvTS/wAh61dpp3Bh2+tU8ojMtx8+P24+dH0THfMU9PsraPnNLNyeXmnpeF+X/kZGJM7Swqf+ufvUx/jPTHVPPHNPVw2duLRtN3DoeZousYlvLwMy1Nq/arjnFUT/AKTE8pie+JiJhzw48cMdR4Ybyr0275zI0rK7V3Tcyqn+1t8+tM8unbp5xEx9E8oiYdHmI8W9haTxG2Zlbe1SmKK6vzmJkxTzqxr0R8WuP9JjxiZh0+Nfm1Vy8HkV615yOtzNF33jt3Vdp7mztva1jzYzsK7Nu5T4VeMVUz40zExMT6JhaF1E6xrCsmNAAfAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABetj7Z1XeG6tP23o1nzuZm3Yop5/Jop76q6vRTTETM+yFlTm8jzhd70No++vWMbsa5rNqKqKa4+NjY08ppp5eFVXSqf7sdJiWm/ei1Rrzttq35yrRtbhns3SdhbNwdtaPR+ax6ed27Mcq792fl3KvbM/yiIjuiGSVTFNM1VTEREc5mfARp8s3i5OiaZXw929ldnUs61z1S9bq62LFUdLXOO6quO/0U/vRMUF27uxNVS+wsSvJuxat/8A8hqfysOMVe+9wTtrQcn/AOjWm3Z+PRPTNvR0m5P7EdYpjx61eMRGigUtdc11b0vSMbGoxrUW7cckADFvAAAAAAAAAAAAAAAAAAAAAAAAZxof6Ixv3FaotD/RGN+4rXOXfv1fN7RgflbX7Y7oAGtLAAAAAAAAAAAAAAAAAAAAAAFZomqZ+i6tjarpeTcxczFuRcs3aJ60zH+seExPSYmYlRj7EzE6wxropuUzRXGsTyTHTCdvCLfmBv8A2pa1OxNu1nWeVvPxonrZu8u+Inr2Ku+mfpjvieWYoHcJ98Z+wt22NXxZquYtfK1m43heszPWI/ajvpn0x6JmJnLoup4Os6Ti6rpuRTkYeVapu2blPdVTMf5T6YnrE9Jdls3OjKt6Vfejj4vzV5a+S9Ww8zetR/018tPV00z8ubpjr1aV8rjhNG9trzubRcbnuHSbUz2aKfjZePHOarfpmqnrVT/ejxjlBV1gQa8sLhb7z92++rRsWKNC1m5M10URypxsmec1UcvCmrrVH96OkRDo8K//APXP0efZNr/OGhAFkhAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPfT8TJ1DPx8DCs138rJu02bNqiOdVddUxFNMe2ZmIH1t3yUeGcb+3/Tnanj9vQdGmm/lxVHxb9zn+bs+2JmOdUfq0zHjCfkRERyjpDCuCexMXh1w80/btnsV5UR57OvU/73IqiO3P0RyimPZTDNK6qaKKq66opppjnVVM8oiPSpMm952vXmWlm3uU6c7CeNvEDC4b7AzNwZHYu5c/mcDHqn+2v1R8WP3Y61T7Inx5OcGu6rn65rOZrGq5NeVnZl6q9fu1z1qqqnnM+z6PBsnynOJlfEbiFdqwr01aFpc1Y+nUx3XI5/HvfTXMRy/Zinx5tUqHJvecq0jhD0TY2z/RLO9VHtVcerqAEdcgAAAAAAAAAAAAAAAAAAAAAAAAAM40P9EY37itUWh/ojG/cVrnLv36vm9owPytr9sd0ADWlgAAAAAAAAAAAAAAAAAAAAAAADfPkqcRatL1aNkavkT7gzq+en1V1dLN+e+317or8I/W7o+NMtDP1brrt3KbluuqiuiYqpqpnlMTHdMSkYuRVj3YuUqjbmx7O2MKvEvc/Ceieafp/Maxzujiw8Qdq6ZvbZ2o7Z1ajnjZtqaYriOdVquOtFyn201RE/VyY5wH37RvvZVu/k3KZ1fB5WNQp6R2quXxbkRHhXEc+6PjRVEdIbBd1Zuxcpi5RPJL8q5+DdwcivGvxpVTOk/70TzdTlvvPbupbT3TqO3NXtebzMC9Nq5y7qo8Ko/ZqiYmPZMLOmP5cHDiNT0OxxB0rH55enUxY1KKI63MeZ+Lcn0zRVPKfZV6KUOHQ2LsXaIqc/dt7lWgA2tYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkl5DvD38r7oyd+aja54ekTNjCiqnpcyaqetX9ymf510z4I7aXg5ep6li6bgWKr+XlXqLNi1T3111TEUxH0zMOmPC7aOHsXYelbYw+zVGHZiL12I5eduz8a5X9dUzMeiOUeCHmXdyjdjjKTjW96rWeZkzQPlocSJ2rsenaWmX5o1bXqKqbs0VcqrOJHSufZNc/Ej2dv0N7apnYmmaZlaln36bGJi2a71+7V3UUUxM1TP0REuZ/FveeZv/f+qbmy5qpoyLvZxrVX+5sU9LdH1Ry5+mZmfFz2Vd3KNI4y63YWD6Rf36o9mnl+vMxQBVu8AAAAAAAAAAAAAAAAAAAAAAAAAAAAZxof6Ixv3FaotD/RGN+4rXOXfv1fN7RgflbX7Y7oAGtLAAAAAAAAAAAAAAAAAAAAAAAAAAZxwS3vc2LvrF1G7cq/JuR/s+oUR152qp+Vy5T1pnlVHLrPKY8ZTktXLd21RdtV03LddMVU1UzziqJ7pifGHONLbyUt7/l7Z9W2c672s/RqYptTVVzquY0z8Tvn5k/E9ER2PS6DYmXpM2Kuflh5D/yh5P8AnLdO1LMctPs1/Lmn6TyT846G4NSwsTUtOydOz7FGRiZVqqzftVxzproqiYqpn2TEzDmtxh2Tl8P+IWp7ayYrqs2bnnMO7V/vseqZm3X9PLpPtiY8HTFHjy39hzrux8beOBYirN0Ors5PZj41eLXPX6exVyn2RVXLsMO7uV6Twl4Vk296nXoQmAXCtAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASG8h7Y/5c37k7uzbM1YehUcrEzHSrJuRMR9PZp7U+yZolNprzyddlxsbhNpGk3bUW8+/R7szunKfPXIiZpn2009mj+62Bfu2rFi5fv3Kbdq3TNdddU8oppiOczM+EKPJuecuTPMtbFG7REI5+XLv6dG2hibHwL005ms/nsuaZ60YtFXSP79ccvooqjxQrZjxo3nd37xK1jclVVc4969NvDoq+Zj0fFtxy8J5Rzn2zLDnP37nnK5l6bsvE9ExqaJ48Z+f+8gA1LAAAAAAAAAAAAAAAAAAAAAAAAAAAABnGh/ojG/cVqi0P9EY37itc5d+/V83tGB+VtftjugAa0sAAAAAAAAAAAAAAAAAAAAAAAAAAZVwn3Zd2XvzTdciuuMai55rMop5z27FXSuOXOOcxHxoj9amGKjO3XNuqK6eMI+Xi28uxXYuxrTVExPyl0bsXbV+xbv2LlF21cpiuiuiqJpqpmOcTEx3xMPLU8LF1LTcrTs6zTfxMqzXYv2qu6uiqJpqpn2TEzDVfkr7tncHDuNIybk15uh1RjVc55zNiec2p7uXSIqoiPRb9rbjvbF6L1um5TzvyZtXZ1zZuZcxLvGiZj5xzT9Y0lzD4nbVydk791ja+VM1VYORNFuuY5ectT8a3X9dE0z9bG0svL12Zzt6NvzEtdaZ/J+dMejrVaq/8cTPtphE10di55yiKnM3aNyqYAG1rAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGx/Js2hG9OMGi6bet+cwsW57uzI8JtWuVXKfZVV2Kf7zXCYvkE7V9y7Z1veGRb5XM+/Th40z/w7fxq5j2TVVEf9205FzctzLbZo3q4hJtYOIWiV7l2Zqe3qNRvad+UbE49eRZpiqumir5cRE9OtPOn61/UmVVzucvCFBXwXFuqaaoqjjCM3wRtuet2q/Z7Z8Ebbnrdqv2e2koInmaOhaeuM34nd4I1/BG2563ar9ntnwRtuet2q/Z7aSgeZo6D1xm/E7vBGv4I23PW7Vfs9s+CNtz1u1X7PbSUDzNHQeuM34nd4I1/BG2563ar9ntnwRtuet2q/Z7aSgeZo6D1xm/E7vBGv4I23PW7Vfs9s+CNtz1u1X7PbSUDzNHQeuM34nd4I1/BG2563ar9ntnwRtuet2q/Z7aSgeZo6D1xm/E7vBGv4I23PW7Vfs9s+CNtz1u1X7PbSUDzNHQeuM34nd4I1/BG2563ar9ntnwRtuet2q/Z7aSgeZo6D1xm/E7vBGv4I23PW7Vfs9s+CNtz1u1X7PbSUDzNHQeuM34nd4I1/BG2563ar9ntnwRtuet2q/Z7aSgeZo6D1xm/E7vBGv4I23PW7Vfs9s+CNtz1u1X7PbSUDzNHQeuM34nd4I1/BG2563ar9ntnwRtuet2q/Z7aSgeZo6D1xm/E7vBGv4I23PW7Vfs9s+CNtz1u1X7PbSUDzNHQeuM34nd4I1/BG2563ar9ntnwRtuet2q/Z7aSgeZo6D1xm/E7vBGv4I23PW7Vfs9s+CNtz1u1X7PbSUDzNHQeuM34nd4I1/BG2563ar9ntnwRtuet2q/Z7aSgeZo6D1xm/E7vBHvH8mLAx7NFizu/J83RHKnt4NMzy9sxXD9/BoxfW+99gj+okCI87OxpnWae9cUeW+3bdMUU5E6RycKfBH74NGL633vsEf1D4NGL633vsEf1EgR89W43ud7P7dbf/UT2U+CP3waMX1vvfYI/qHwaMX1vvfYI/qJAh6txvc7z7dbf/UT2U+CP3waMX1vvfYI/qHwaMX1vvfYI/qJAh6txvc7z7dbf/UT2U+CP3waMX1vvfYI/qHwaMX1vvfYI/qJAh6txvc7z7dbf/UT2U+CP3waMX1vvfYI/qHwaMX1vvfYI/qJAh6txvc7z7dbf/UT2U+CP3waMX1vvfYI/qHwaMX1vvfYI/qJAh6txvc7z7dbf/UT2U+CP3waMX1vvfYI/qHwaMX1vvfYI/qJAh6txvc7z7dbf/UT2U+CP3waMX1vvfYI/qHwaMX1vvfYI/qJAh6txvc7z7dbf/UT2U+CP3waMX1vvfYI/qHwaMX1vvfYI/qJAh6txvc7z7dbf/UT2U+CP3waMX1vvfYI/qHwaMX1vvfYI/qJAh6txvc7z7dbf/UT2U+CP3waMX1vvfYI/qHwaMX1vvfYI/qJAh6txvc7z7dbf/UT2U+CP3waMX1vvfYI/qHwaMX1vvfYI/qJAh6txvc7z7dbf/UT2U+CP3waMX1vvfYI/qHwaMX1vvfYI/qJAh6txvc7z7dbf/UT2U+CP3waMX1vvfYI/qHwaMX1vvfYI/qJAh6txvc7z7dbf/UT2U+CP3waMX1vvfYI/qHwaMX1vvfYI/qJAh6txvc7z7dbf/UT2U+DWPCDhH/5v9z3NWx9yXM2i/j1Y92xViRRFUTMTE8+3PWJpjw8Z9Lby3q63V2qIq9Kdj2qLVO5RGkOd2ltHJ2lf9Iyqt6ueTXSI4fKIY1xW2ta3rw71vbNyKe1m4tVNmau6m9T8a3V9VdNMuZN+1csX7li9RVbu26porpqjlNMxPKYl1dc+fK02r71+NerVWrfYxNWinUrHLu/Oc/Of/uU1/VMLjAucs0KPLo5IqalAWaCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA+0xNUxTTEzM9IiPF014RbajZ/DPQNudimi7h4VEX4pjpN6r49yfrrqqQF8n3bkbp4yba0mujt2PdlOTfiY6TbtRNyqJ9kxR2frdJFbn18KU7Ep41PlU9mmZ9EKGZ5zMz4qrKq5W+XplSKmueVPpAGDIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVOJV8WafR1Uz0x6uzdj29GVM6S+TwViNfl67Z927L0bdVmjnd0zLnGvTEdfNXo6TM+iK6KY/vpKMR4zbcjdnCzceg+b85dyMGuqxTy5/nqPj2/+emlLs17lyJR7tO9RMOZoC+VIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACS/kC6DGVvPcG47lHOnT8KjGtzMfPvVc+ce2KbUx/e9qZLQvkNaL+T+Dt3VK6OVeq6ldu01em3RFNuI+qqiv8Am30pMqreuytLFOluFLl1c64p9EPF+7s9q5VPtfhAmdZSo4AD4+gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABHSeYAr6Z50xPph9eeNPO1Hs6PRvidYapcy+MOgRtjijuTQqaOxaxdQu+Zp9Fqqe1b/5KqWJt+eXNosafxhs6pbo5Uarptq7XV6blE1W5j/DTb/m0G6CzVvURKouU7tUwANjAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB76di3M7UMbCs/wBpkXabVH01TER/qPrpHwG0j8h8Gtp6f2OxVGmWr1yn0V3Y85VH+KuWa1TypmfRDzw8e1iYlnFsU9m1Zt026I9FMRyj/R+sieVmpztdWszK4pjSIhRAIzcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAqMOelUfWqFLizyu8vTCqbqODXVxRf8A/KA6T53bm1tdimf9my72JVMR3+doiuOc/wDdVfzlD9Pnyz9M/KHAfUcjs9qrT8vGyY6em5FuZ/lclAZdYVWtrToVmTGlwAS0cAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZjwQwfylxh2jiTHOmrWMauuPTTRciqqP5Uyw5tXyS8P3Z5QG2aaqedFqrIvVd3Ts49yYn/FyYXZ0omepnRGtUQ6FvHLn83EemXsp8yelMfS52rguI4qcBpbAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH7sTyu0/SrVDRPKumfarm2jgwqYN5QGDGo8FN4Y809rs6VevxHtt0+cj/wADmw6l7xxfd20dZwpiJ90YF+1ymeXyrdUf9XLRb4E+zMK/LjliQBPQwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABu/wAibH8/xzxrvY7XufT8i5z5/J5xFPP/AJuX1tIN/eQlZqu8Zs2uJiItaJfrnn4x52zT/wC805H4VTbZ+/CcSmzPlUx7FSpcv+0j6FBXwW1PF4gNLYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALgt64U/JhstsKiqIqiaaoiYnpMT4uUmXZnHyr2PVVFU2q6qJmPHlPJ1bcs9226LW69XtW6ezRRnXqaY9ERcq5LXZ88tSDmcy1gLJBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEhPIJ/wDtg1X/ANgXv/7GOj2395CN6bXGXNoimJ87ol+ifZ+ds1f+605P4VTbZ/EhOJS5f9pH0KpS5f8AaR9Cgr4Leni8QGlmAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAK+n5MfQoFfT8mPobLbCp9ctd5//XDWv/aF/wD/AJKnUpyz3dXRd3Xq9y3VFVFedfqpmPGJuVclps/jUg5fCFrAWaCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAN3+RLkTZ4549vtxT5/T8i3y5fK5RFXL/l5/U0g2t5JOX7j8oDbUzPKi7VkWao6de1j3Ijv9vJqvxrbq+TZanSuHQpTZny6Z9ipU+ZHyZ+lz9fBb08VOA0tgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAuCgojnXEe1XtlthUTMRHOekOUmZenIy72RNPZm7cqr5c+fLnPPk6jbwy4wNpaznTy5Y+Bfu9Y5x8W3VPh9Dlottnx96UDLngALFCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGZcDs78m8YtoZcz2aY1jGoqn0U13Iomf5VSw1UaZl3MDUsXPs/2mNeovUfTTMTH+j5VGsTD7E6Tq6sPHLj83E+19xL9rKxbOVYqiu1eopuUVR40zHOJ/k+5Mc7Mucq4LqOKjAaGwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB+7Mc7tP0q1SYsc7vP0Qq22jgwq4sG4/wCfGm8FN4ZEzEdrSb9iJn03afNx/wCNzYT58s/U4wOA+pY/b7NWoZeNjU9es8rkXJj+VuUBlzgRpbmetW5c+3EACaigAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOlfAnV/y5wc2pqM1TXXVplm1cqnxrt0+bqn/FRLNK450THphojyHNajUeDdel1V869K1G9ZimZ7qK+V2J+iaq6/5S3woL1O7XMLe3VrREreP1cjs3Ko9r8oaQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAqMOOtVX1Kh5YscrXP0zzerdTwa54ov/wDlAdW83tza2hxV/wCsZl7Lqp5/8OiKImY/72r/ADQ/b88ubWo1DjDY0u3Xzo0vTbVqunn3XK5quT/y1UfyaDXuLTu2oVV+dbkgCQ0gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJMeQLr0Y28dwbcuVxFOfhUZVuJnvrs18piPbMXZn+77EyHNzyetxRtfjNtnVa6+xYnMpxr8zPSLd6JtVTPsjt9r6nSNUZ1GlzXpWOLVrRp0KXKjlc5+mHi/WuZuDpunV5+o5mPh4tnl5y/kXYt26OcxEc6qpiI6zEfWxv3+bG9c9ufedn8SumiZnkhMiY0ZEMd9/mxvXPbn3nZ/Ee/wA2N657c+87P4nzcq6H3WGRDHff5sb1z25952fxHv8ANjeue3PvOz+I3Kug1hkQx33+bG9c9ufedn8R7/Njeue3PvOz+I3Kug1hkQx33+bG9c9ufedn8R7/ADY3rntz7zs/iNyroNYZEMd9/mxvXPbn3nZ/Ee/zY3rntz7zs/iNyroNYZEMd9/mxvXPbn3nZ/Ee/wA2N657c+87P4jcq6DWGRDHff5sb1z25952fxHv82N657c+87P4jcq6DWGRDHff5sb1z25952fxHv8ANjeue3PvOz+I3Kug1hkQx33+bG9c9ufedn8R7/Njeue3PvOz+I3Kug1hkQx33+bG9c9ufedn8R7/ADY3rntz7zs/iNyroNYZEMd9/mxvXPbn3nZ/Ee/zY3rntz7zs/iNyroNYZEMd9/mxvXPbn3nZ/Ee/wA2N657c+87P4jcq6DWGRDHff5sb1z25952fxHv82N657c+87P4jcq6DWGRDHff5sb1z25952fxHv8ANjeue3PvOz+I3Kug1hkQx33+bG9c9ufedn8R7/Njeue3PvOz+I3Kug1hkQx33+bG9c9ufedn8R7/ADY3rntz7zs/iNyroNYZEMd9/mxvXPbn3nZ/Ee/zY3rntz7zs/iNyroNYZEMd9/mxvXPbn3nZ/Ee/wA2N657c+87P4jcq6DWGRDHff5sb1z25952fxPnv82N657c+9LP4mdFi7X92mZ+jGa6Y4yyMY57/djeue3PvSz+I9/uxvXPbn3pZ/E2eh5Hw57JfPPW/ejtZGMc9/uxvXPbn3pZ/Ee/3Y3rntz70s/iPQ8j4c9knnrfvR2sjGOe/wB2N657c+9LP4j3+7G9c9ufeln8R6HkfDnsk89b96O1kYxz3+7G9c9ufeln8R7/AHY3rntz70s/iPQ8j4c9knnrfvR2sjGOe/3Y3rntz70s/iPf7sb1z2596WfxHoeR8OeyTz1v3o7WRjHPf7sb1z2596WfxHv92N657c+9LP4j0PI+HPZJ56370drIxjnv92N657c+9LP4j3+7G9c9ufeln8R6HkfDnsk89b96O1kYxz3+7G9c9ufeln8R7/djeue3PvSz+I9DyPhz2Seet+9HayMY57/djeue3PvSz+I9/uxvXPbn3pZ/Eeh5Hw57JPPW/ejtZGMc9/uxvXPbn3pZ/Ee/3Y3rntz70s/iPQ8j4c9knnrfvR2sjGOe/wB2N657c+9LP4j3+7G9c9ufeln8R6HkfDnsk89b96O1kYxz3+7G9c9ufeln8R7/AHY3rntz70s/iPQ8j4c9knnrfvR2sjGOe/3Y3rntz70s/iPf7sb1z2596WfxHoeR8OeyTz1v3o7WRjHPf7sb1z2596WfxK7Q907X1jUaMLS9yaNn5NUTVFnGzrd2uYjrM9mmqZfJxL9MazRMR8pIu0TwmGSUR2aIp9EPoxPjHuL3p8Ltx7gpuebu4uDX5irn3Xq/iW/+eql9pjWYiGMzpGsufPGbXo3NxV3LrdNzzlrI1C7Fmrn32qJ7Fv8A5KaWIg6GmNI0U8zrOoA+vgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD7TM0zFVMzEx1iY8HTXhHuWneHDTQNx+ciu7mYVE35jui9T8W7H1V01Q5kpieQTuuMrbetbNyLvO7g3ozcWmZ6zaufFriPZTXET9NxDzqN63vdCVi1aV6dLfvEbbdjd+w9b2xkTFNOpYVzHpqn5lc0z2Kvqq5T9TlFm41/CzL+HlWqrWRYuVWrturvoqpnlMT9Ew6+OdnlqbLnanGvNz7FrsYGvURqNmYjpFyZ5Xqfp7cTV9FcNGBc0qmhJv08mrSIC1RgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFw0LSr2qZXYp50Wqety5y7o9H0t2Pj3Mm7Fq1GtU8IYXLlNumaqp0iFPp+DlZ97zWLamurxnwp+mWWaZtTFtRFedXN+v9WmZppj/rK+YGJj4WPTYxrcUUR/OZ9M+1UPT9k+SWLi0xXkxv1/xH05/r2OZytq3bs6W/Zj+XjjYuNjU9nHx7VqP2aYh7A6yiimiN2mNIVc1TVOsgDJ8AAAAAAAAAAAAAAAAAAAAAAAAEjvIr25NeZre7L1E9m1RTgY1XhNU8q7n1xEWv8AFKOKe3BPa3vP4aaRpF235vMm17ozImmIqi9c+NVTPLvmnnFHP0Uw4by+2j6Ns3zET7VydPpHLP8AUfVdbCx/OZG/PCnv5mZo2eXpuaMLZOj7Vs3OV7U8uci9Ef8ACtR0ifprrpmP3JSTc+fK03X76eNOqU2bsXMPSYjTcflPT83z85P/AOpVX19EQ8aw6N65r0Otyat2j5tSgLlWAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADYXk77x94/FvRtXvXZt4N257kzuvKPM3fizM+ymezX/ca9HyqmKomJZUzuzrDrA0R5buxffbwfu6ziWe3qO3K5zbfKOs2JiIv0/R2Yiv8A7tkvku73je/CPTb+Rd7epabHuDN5981W4js1+3tUTTMz6e16Gz8izayLFzHv26Ltq7TNFdFcc6aqZjlMTHjEwoombNzrha8ldPzcgRnXHnYV/hvxQ1XbVVNfuOmvz+n3Kv8AeY1fOaJ5+Mx1pmf1qZYKvqaoqjWEOY0nQAZPgAAAAAAAAAAAAAAAAAAAAAAAAAAAD0xrNzIyLdi1T2q7lUU0x7WydKwbWn4NGNaju61VfrVeMsX2Hhxcyr2bXHS1HZo+me//AC/1Zm9N8jNmU2secuuPaq5I6ojxnuhzW2Mmarnmo4R3gDtlMAAAAAAAAAAAAAAAAAAAAAAAAAAAA2L5O20ffdxP0+zftdvA0/8A27L58uU00THZpnn0ntVzTEx6O16E5GofJU2dO2uHVOrZVqaM/XJpya+ffFiInzMd/Luqqr9Px+U9zbzwPyy2t6x2lVFE+xR7MfTjP1n+Ih3WyMX0fGjXjVyz/TFOLu7bWx+HOtblrqoi7i48xjU1fPv1fFt0+340xz9nNzNvXbl+9XevV1XLlyqaq66p5zVMzzmZn0pReXhviMjUtL2DhXomjE5Z2oRTP+8qiYtUT7Ypmqrl+3T6EWlVhW92jennZ5Ne9Xp0ACYjAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAN2eR3vyNo8UKNJzb829L1+mnEuc55U0X+f5mufrmaP7/AD8E9HKGiqqiumuiqaaqZ501RPKYn0ui3k5cQaeInDTC1LIu01ath/7JqVPdPnaY6V8vRXTyq9HOZjwVuda5d+E7Fuf4y195c/DirdXDu3u7Tcft6pt2Krl2KY+NcxJ/tI9vYmIr9kRX6UB3X6/atX7Fyxft0XbVymaK6K6YqpqpmOUxMT3xMOZvlJ8NrvDLibmaTZt1fkjL55el3Jnnzs1TPxJn9aiedM/RE+LPBvax5uWd6n/JrMBYtAAAAAAAAAAAAAAAAAAAAAAAAAAAADPtl2YtaDbq5cpu11Vz/Pl/0XpbdsxFOg4kR+pz/wA5XJ7nsm3FvBs0x7tPc4jKq3r9c9cgCwaAAAAAAAAAAAAAAAAAAAAAAAAAABnHBDZVW+uIOFpV2iqdPs/7Tn1R4WaZjnT3x1qmYp6dY7XPwYOm15Nuw69k7Dpu59ibWsarNOTmU1UzFVqnl+btTE+NMTMzHhVVVHhDlvK7bXqrAmaJ/wCyvkp/ufpH86LPZWH6VfjX7scs+H1bOoppooiiimKaaY5RERyiIWveGv4G1traluLU6+xiafj1X7nXlNXKOlMe2Z5REemYXVE3y6eIVNdWHw502/z7M05mqTTPj/urU/8AjmP3Hgtm3NyuKXb3K9ynVGfeOv5+6t06luLVK+3l6hkVXrnXpTznpTHsiOUR7IhaQX0RpGkKqZ1AB8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAG1/Je4jzw94j2Zzr80aHqvZxdQiZ+Lb6/Evf3Jnr+zVU1QMa6IrpmmWVNU0zrDrBTMVRFVMxMT1iY8WqfKh4X0cT+G97ExLVH5d03tZWl1zyiaq+XxrXPwiuIiPR2opme5jPkb8To3Zs33parkdrWtDtRTbmqfjZGL0iir2zR0on2dieszLfijmKrNzrha0zFynVyAvWrlm9XZvW67dy3VNNdFccqqZjpMTE90vylD5c/CWdD17/zj6FjctM1O7FGp27dPSxkz3XOndTc8Z/X59fjxCLy8tXIuUxVCJVTuzoANjEAAAAAAAAAAAAAAAAAAAAAAAAABsfbf6CxP4a4rdtv9BYn8NcXu+zvydr9tPdDhsj8Wr5z3gCY1AAAAAAAAAAAAAAAAAAAAAAAAALltbQ9R3LuHC0LSbPnczMuxbt09eUeM1Ty7qYiJmZ8IiZYXLlFqia650iOWZ6n2mmapimOMtn+S7w+nde8I17UbE1aPo9dNye1T8W/kd9Fv2xHyqu/upiY5VJkLDw+2tp+zNpYO3tNjtW8aj85dmnlVeuT1ruT7Znw59I5R3RC/Pzz5Sbaq2vm1Xv8ACOSmOrxnjPZzO+2dhxiWYo554/NjXE7eGn7E2RqW59SmJoxLX5q1z5Teuz0otx9NXL6I5z4Oam5NY1DcOv52uarfm/nZ1+q/fr7udVU855R4RHdEeEcobp8sXibG8N5xtfSsjt6Lodyqmqqir4uRld1dftinrRE/vTHSWhmjEs7lO9PGWORc36tI4QAJaMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAv/AA93Xqeyd4adubSK+WThXe1NEz8W7RPSu3V7KqZmPr598Ok2xN0aXvLaen7k0a728TNtRXETPxrdXdVRV6KqZiYn6HLpvXyR+LHvH3T729ayext7V7sRNdc8qcXInlFNznPdTPSmr6p8J5w8ux5ynejjCTj3dydJ4Sm1ufQ9L3Lt7O0DWsWjK0/Os1Wb9qr51M+ifCY74mOsTETHc5i8bOHeqcMt/Zm29Qiu5YifO4OVMcoybEzPZr+nviqPCqJ8OUupbV3lJ8KcTipsO5hWqbdrXcGKr+lZFXTlc5dbVU/qV8oifRMUz4IWLf8ANVaTwlNuUb0OZ4qNTwczTNRydO1DGu4uZi3arN+zcp5VW66Z5VUzHhMTCnXaGAAAAAAAAAAAAAAAAAAAAAAAAAA2Ptv9BYn8NcVu23+gsT+GuL3fZ35O1+2nuhw2R+LV857wBMagAAAAAAAAAAAAAAAAAAAAAAABL3yW+GnvX0H306xj1Uazqdr81br6TjY88piOXhVVyiZ590dmOk9rnqnyYuGXvs1/3yazjRVoem3Imii5Tzpyr8dYo5eNFPSavCekdYmeUwnlPl55Ra67Nx5/fPdT/c9nS6jYez9P/kXI+Xj4DS/lX8Uo2DsmdJ0rJ7G4dYoqtY/Yq+Nj2u6u97J+bT7Z5x8mWzt8bm0rZ21c/cetX4tYeFamurr8aurupop9NVU8oiPTLm7xL3jqu/N5Z25dXrmb2TXytWonnTYtR8i3T7Ij+c8575l5xiWPOVb08IX2Rd3I0jjLHJmZnnM85fAXCtAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAATa8j3i376dCp2Tr+V2tb021/sl25V8bLx6fD210R0nxmnlPhVKQzldt7WNR0DW8PWtIyq8XOw7sXbF2jvpqj/WPCY8YmYdFuB/EfTeJeybGs4027OfaiLWo4kT1sXuXXl49mrvpn0dO+JVOXY3J36eErDHu70bs8Wj/Ld4Lzq+Fd4l7YxOeoYtuPyxj26et+zTHKL8R41URERV6aYifm9YUuwFdNNdM0V0xVTVHKYmOcTDn/5YHBWrh/uKd0bexZ96+qXZ+JRHTBvzzmbfsonrNM+HWnwiZ3YWRr/11fRlet/5Qj+AskcAAAAAAAAAAAAAAAAAAAAAAABsfbf6CxP4a4rdtv8AQWJ/DXF7vs78na/bT3Q4bI/Fq+c94AmNQAAAAAAAAAAAAAAAAAAAAAAyvhVsfUt/btsaLg87ViPzmZkzHOmxZietXtqnuiPGZjujnMWHQtK1DXNYxdI0rFrys3Luxas2qO+qqfbPSIjvmZ6RETM9ITp4P7B0/h9tO3pePFF3OvcruflRHW9d5d0TPXsU91MfTPfM8+S8rPKOnZGNuW5/7a+HV/8AlP8AXTPylabK2fOXc1q+7HHwZHtvRtO29oWHouk49OPhYduLdqiPR4zM+MzPOZnxmZlcKpimJqqmIiOszPgIz+WRxfjR9Ou8PduZXLUsu3y1W/bq649mqP7KJ/Wrievop/e6eFU0137nLOszxn+3bVVU26eqGp/Kw4te/wB3R+QdEyZq25pVyYt1UT8XLvd1V320x1in2c5+d00eC6t0RRTFMKuuqa51kAZsQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABnHBXiLqnDTetjXMLtXsOvlaz8TtcqcizM9Y9lUd9M+E+yZicHHyqmKo0l9iZidYdTtra7pe5tv4WvaNk05OBm2ou2bkeie+JjwmJ5xMeExMG6NC0rc23s7QNcw7eZp2dam1fs191VM+MT3xMTymJjrExEx1hCHyVuMNewNwfkDXcmr3s6jdjt1VTzjDuz0i7H7M9Iqj0RE+HWd9uui5bpuW66a6KoiaaqZ5xMT3TEqS/ZmzX3LS1ci5S5g8e+F2q8Kt8XdGy/OX9NyOd3TM2Y6ZFnn3Ty6RXTziKo9PKe6YmdeupnGfhzovE7ZGTt3VqYt3f7TCy4p514t6I+LXHpjwmPGJnunlMczt97V1rZW6s7bWv4tWNn4dzs1R82un5tdM+NNUdYn2rTFyPO06TxhouUbs9SyAJTWAAAAAAAAAAAAAAAAAAAAAA2Ptv9BYn8NcVu23+gsT+GuL3fZ35O1+2nuhw2R+LV857wBMagAAAAAAAAAAAAAAAAAAAAiJmeUdZEjfJX4VTfvY+/tw40eZt1drSce5T1rqif7eY9ET8j2/G6cqZmq2ztexsnFqyLv0jnmeaPHohJw8SvKuxbo+vVDN/Jr4VRs7SffDrlj/ANP51vlTbrjrh2p69j9+ek1T4dKfTz3KMd4jbx0fYm0czcmt3uxj49PKi3E/Hv3J+Tbojxqmf5RzmekS/PW0M+/tLJqv3p1qq/2Ijqh31ixbxrcUUcIYn5RPFXD4ZbPqu2Krd7X86mq3puNV15T43ao/Up58/bPKPGZjnrqedmanqORqOoZFzJy8m5VdvXrk86q66p5zMz6ZlfeJW9NZ39u/M3Jrd3nevzytWqZ+Jj2o+Tboj0R/nPOZ6zLGk3HsRap60K9d85PUAJDSAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJY+R1xmiYx+HG6cvlMfF0bKu1d//AOXqmf8Ak5/u/qwic/Vq5XauU3bVdVFyiYqpqpnlNMx3TE+Etd21F2ndlst3Joq1h1eab8qHgvicU9sRl6dRax90adRM4N+r4sX6e+bFc/qzPWJn5M+yaudD5LHGa3v7Radu7gyaadz4NvrVVMR7utR/vI/bj50f3o75iN5KX27FfXCziablOrkLqWFmabqGRp+oYt7Fy8a5VavWbtE01264nlNMxPWJiXgnl5XXAWne+Dc3ntHDpjc2Nb/2nGtxEflC3Ef53aY7p+dEdn9VA6umqiqaK6ZpqpnlMTHKYldWL0XadYRa6JpnR8AbmAAAAAAAAAAAAAAAAAAAADY+2/0Fifw1xW7bf6CxP4a4vd9nfk7X7ae6HDZH4tXznvAExqAAAAAAAAAAAAAAAAAAAZ/wU4Z6jxE3BFr85i6NjVROdmRT3R3+bo59Jrn/ACjrPPpExc3Ms4Viq/fq0pp4/wC9LZZs13q4oojWZXzyduFNzfOsRrGsWq6NuYVz8515Tl3I5T5qJ74p6xNU+jpHKZ5xMy1bt2bVFq1RTbt0UxTRRTHKKYjuiI8IUuh6Vp+iaRi6TpWJbxMLFtxbs2aO6mmPp6zPjMz1mZmZ5zKsmYiOc9Ifn/yg27e2zledr5KY5KY6I8Z5/CHeYGDRh292OM8ZU2q5+FpWm5Opajk28XDxbVV2/euTypt0UxzmZn6HPjyieK+bxO3bNyxNyxoGDVVRp2NV0mY8btcfr1cvqjlHpmc28rXjR77tRubM2zlc9Aw7n+1ZFE9M29TPdE+Nume70zHPrEUyjyjYmPuRv1cWORe3p3Y4ACcigAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAK7QdW1HQtZxNY0jLuYmfiXYu2L1ueU0VR/rHhMT0mOcS6CeT5xa03iftntV+bxdfwqKY1DEieXOe7ztuOfOaJn/DPSfCZ52r1snc+s7O3Nh7h0HKnGzsSrnRMxzprielVFUeNMx0mP8Aqj5FiLtPW3Wbs256nUZFLywPJ+/LFGXxD2Rh0xqFuibuq6dap5e6YjnNV63Ef7zl8qn53LnHxufa3jwU4naJxN2rRqWn102NRsU006hgzV8fHuTHh6aJ5T2avH2TExGeKqiuuxX1rGYpuUuPwmF5X/k+Ueby+IexMCYriZu6tptijpMd9V+3TH86qY/ejx5w9XVq7Tdp3oRKqZpnSQBtYgAAAAAAAAAAAAAAAAANj7b/AEFifw1xW7bf6CxP4a4vd9nfk7X7ae6HDZH4tXznvAExqAAAAAAAAAAAAAAAAAZXwv2HrXEDcdOlaVR5uzb5V5mZXTM28a3M98+mqeU9mnvmfRETMaMnJtYtqq9eq3aaeWZlnbt1XaooojWZe3Cfh9rHELclOm6fTNnDszTXnZtVPxMe3M/51zyns0+Mx4REzE4dn7b0jae38bQ9ExYx8SxHTxqrqnvrqnxqnxn/AKcoeGw9p6NsrbdjQtEsTbx7fxrldXW5euTEdq5XPjVPKPZERERyiIhfng/lP5S3ds3tKeS1Twjp656+7t17jZuzqcOjWeWqeM/1Ain5XPHCmijK4e7PzIqrqiber5tmrnFMdYqx6J9P60x3fJ/W5X7yq+OlO2LGRsnaGXP5duU9nOzLc/8AqVMx8imf+LMT3/NifT3QuqqqrqmqqqaqpnnMzPOZlT4mNr7dX0b8i/p7NL4AskEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABknDjemu7B3Vj7i2/keayLXxLlurrbv25mO1brjxpnlHtiYiY5TES6E8IOI2hcS9q0a1pFU2r9vlbzcOurncxrnL5M+mme+KvGPRMTEc0mU8MN96/w83TZ17Qcjs10/FyMeuZ81k2+fWiuPR6J74nrCNkY8XY1ji32b0250ng6boceVv5O3uf3Xv8A2Bg/met7VNLs0/I8ar1qmPm+NVEd3fHTnESY4T8QtA4j7Wt63ol3s108qMvErqjzuLc5fJq9noq7pj64jL1XbuV2K1hMRXDj8Jd+Vt5Os2Jy9/cP8Dnannd1TSrFHyPGq9Zpjw8aqI7u+OnOIiIurV2m7TvUolVM0zpIA2sQAAAAAAAAAAAAAAAGx9t/oLE/hrit22/0Fifw1xe77O/J2v2090OGyPxavnPeAJjUAAAAAAAAAAAAAAAyvhfsPWuIG46dK0qjzdm3yrzMyumZt41uZ759NU8p7NPfM+iImY0ZOTaxbVV69Vu008szLO3bqu1RRRGsy8+GuyNa35uO3pGkWuVMcqsnJrifN49vn8qr2+iO+Z+uYnDw92hpGyNs4+haPa5W7fxrt6qI85fuT311zHfM/wCURER0h84e7M0TY23rejaJYmmiPjXr1fKbl+vxrrnxn2d0R0hkTwryo8p7u2Lu5RyWqeEdPXP9RzO22Zs2nEp3quWqePhA0F5UfHG3sjDubW2tk27m5cijlfu0/GjAomO+fDzkx3R4R1nw5+vlN8dMfYmJd2ztm9byNz3qOVy5HKqjApmPlVeE3JjrFPh3z05RVBzMycjMy72Xl37mRkXq5uXbtyqaq66pnnNUzPWZmfFRYuLve3XwSr9/T2aeL5kXr2RkXMjIu13r12qa7lyuqaqq6pnnMzM9ZmZ8XmC0QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGU8MN96/wAPN02de0HI7NdPxcjHrmfNZNvn1orj0eie+J6w6EcJ+IWgcR9rW9b0S72a6eVGXiV1R53Fucvk1ez0Vd0x9cRzOZPw13zuHh/uW1ru3subV2OVN+zV1tZFvnzmiunxif5x3xMSjZGNF2NY4t9m9NudJ4OnKInlb+Tt5/3Zv/YGD+e63tU0uzT8vxqvWqY8fGqiO/vjrziZD8H+JGg8S9r0axo9zzWRb5UZuFXVE3Ma5y7p9NM9eVXdMeiYmIzRV0V12K1hMU10uP0xMTymOUwJq+Vh5OU63cyt88P8KmNSntXdS0y1HKMnxm7aj/iemn53fHxufahXXTVRVNFdM01UzymJjlMSurN6m7TrCJVTNM6S+ANrEAAAAAAAAAAAAABsfbf6CxP4a4rdtv8AQWJ/DXF7vs78na/bT3Q4bI/Fq+c94AmNQAAAAAAAAAAAADNeEnDnWeIeu+4sHnjYNnlOZnV0c6LNM+ER07VU+FPP+Uc5R8vLs4dmq9fq3aaeMs7Vqu7XFFEazKn4W8P9c4g6/GnaTb81jWuzVmZtdP5vGome+f1qp5TypjrPKe6ImYm9sLaOi7K25Y0PQ8fzdi38a5cq5Tcv3Jjrcrnxqnl9ERyiOUREP3sja2jbO27j6FoWN5jFtdaqquty9XPLtXK6vnVTyjr7IiIiIiIvbwnym8p722bu7T7NqOEdPXPX3fy7fZuzaMOnWeWqeM/1A0P5TfHTH2JiXds7ZvW8jc96jlcuRyqowKZj5VXhNyY6xT4d89OUVeXlL8esXZFnI2tta7Rk7muUdm7ejlVbwImO+fTc5d1PdHfPhEwhzMnIzMu9l5d+5kZF6ubl27cqmquuqZ5zVMz1mZnxUmLi73t18Em/f09mkzMnIzMu9l5d+5kZF6ubl27cqmquuqZ5zVMz1mZnxeQLRAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZFw93nuDYm5LOvbdzZx8m38W5RPW3fo5xM266fGmeX0x3xMTES6BcGOKGgcTdt0ahptynH1C1ERnafXXE3Mev0/tUT4VePsmJiOba97I3VrezNyYu4Nv5lWLm489J76blPjRXHzqZ8Y/6xEo2RjxdjXnb7N6bc9TqKjJ5VXk52d128neexMOizuHnNzNwaJimjP9NdPhTd8Z7oq/e79qcC+LWicUdBqvY0U4WsY0R7u0+qvnVR6K6J+dRPp8J6T4c9jqumquxX1rD2blLkDk2L2NkXMbJs3LN61XNFy3cpmmqiqJ5TExPWJienJ+E/PKi8nnD3/Yvbo2lYs4e66I7V63z7FvUKYjuq8KbkR3VePdV4TTArUsLM03UMjT9Qxb2Ll41yq1es3aJprt1xPKaZiesTErmzfpu06wi10TTLwAbmAAAAAAAAAAAADY+2/wBBYn8NcVu23+gsT+GuL3fZ35O1+2nuhw2R+LV857wBMagAAAAAAAAAAGy+CHCbU+Ieo+6siq5g6Bj3IjJyoj412Y77drn0mr0z3U8+c8+kTDz8+xgWKr+RVpTH+6R0y22LFd+uKLcazKj4M8L9X4i6tV5qasPRsauIzM2qOkd0+bt/rVzHX0RHWe+Imau1NvaPtfRLGjaHhW8TDsx0ppjrXVy61VT31VTy6zPV76Bo+maDpGPpGj4VnCwcajsWrNqOURHpnxmZnrMzzmZmZmZmVc8H8ovKS/tm9y+zbjhT/c9M93N19xs/Z1GHR01TxkR38pvj7a2jGRtHZ1+3f1+qmaMvLiYqowOfzY8Ju/5U+POekW7ynvKBt6LRl7L2Nl9vVetrP1G1PxcXwm3bnxueE1fN8PjfJh1duV3blV27XVXcrmaqqqp5zVM98zPjKrxcXX2622/kaezS/WRevZGRcyMi7XevXapruXK6pqqrqmeczMz1mZnxeYLNBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAXPa2v6vtjXsTXNDzbmFqGJX27V2ie70xMd0xMdJiekxPKU9/J/4z6PxO0n3Pfizp+48en/acHt9Lkf8S1z6zT6Y76e6eccpnnqrdE1XUdE1fF1bScy9h52Lci5Yv2quVVFUf/Pd3THSWi/j03Y6261dm3PU6ptIeUvwE0rifgV6zo8WNO3Xj2/zeR2eVGZER0t3eXj4RX3x3Tzju9fJy456dxFw7eia1VZwd02aJmq1HxbeZTHfXb/a5dZo8Osx058t1Kj27FfRKxiablLkbuHRdV29rWVo2t4F/A1DFr7F/HvU9mqie/8AlMcpiY6TExMKB0p8obgnoPFfRfOfmtO3HjUcsPUoo584jnPmrsR8qiec+2meseMTzw3ttXXtmbjydv7j0+7g5+PVyqorjpXTznlXRPdVTPLpVHSVxj5FN6OtFrtzTKygJDAAAAAAAAAABsfbf6CxP4a4rdtv9BYn8NcXu+zvydr9tPdDhsj8Wr5z3gCY1AAAAAAAAAN58AOCV/cs4+5t12bmPonOLmNi1R2a82O+Jnxpt+3vqju5R1mu2ptXG2XjzfyKtI5o55noj/fmkY2Lcybm5bj/ANLVwF4N5m+cijW9bpvYe27dU8qons3MyqJ5TTR6KInpVX7JpjrzmmYemYOHpmn2NP0/GtY2Jj0Rbs2bdPZpopjuiIemNYsYuNaxsazbsWLNEW7Vq3TFNNFMRyimIjpERHTlD9XblFq3Vdu100W6ImqqqqeUUxHfMz4Q8F29t/J2zf37vJTH3aeaPGemf6dxg4NvDo3aePPL9IpeU55QvY91bM4f51UXKaptZ+rWau7l327NUePfE1/VT6Vm8pvyhKtbjK2bsTLmnS5/N5up2qpirK/Wt258LfhNXzu6Pi/KjKiY2J/nX2Pt/I/xpfZmZnnM85fAWKEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA9sLKycHLtZmFkXcbJs1xXau2q5proqjumJjrEps+TXx/xd528fa27r1rE3HERbx8ifi28/p/Km507u6rw9EQgfq1crtXKbtquqi5RMVU1UzymmY7pifCWm9ZpuxpLbbuzbnWHV5r3jhwm23xV23On6tbjF1KxTPuDUrdETdxqp8PDtUT40zPXw5TymNReTN5Q1Gqe5dm79y6aM/4tnA1S5PTInui3dnwr7oiruq8evWqT6ororsV9axprpuU8jlPxQ2DuThzum9oG5MObN6nnVYv085tZNvnyi5bq8Yn+cd0xEsWdVOK3DzbXEra13Qdx4nbp61Y2TbiIvYtz9e3VMdJ9Md0x0mJc6ONfCrcvCvcs6ZrVrz+FemqrB1C3TPmsmiJ/5a46c6J6xz8YmJm0xsqLsaTxaLluaeXmYEAltQAAAAAAADY+2/0Fifw1xW7bf6CxP4a4vd9nfk7X7ae6HDZH4tXznvAExqAAAAAAB+rFq7fvUWbNuu7duVRRRRRTM1VVTPKIiI75mUp/J94HUaPOPureePTc1KOVzC0+uOdON4xXcjxueinup7+tXLs0u29u42x7Hnb06zPCnnmfDpnm/hMwsK5l17tHDnnoWLyf+Bc5NWPunfGHMY8crmHpl2mPzvTnFd6P1fRRPf8AO6dJk7TEUxEREREdIiPAUOv6xpegaPk6xrOdZwcDFo7d6/dq5U0x/wBZmekRHWZmIh4NtfbGVtfI89fn5RzRHRH+8ruMTEtYlvco+s9Koz8vFwMK9m52TZxcWxRNy9evVxRRbpiOc1VVT0iI9MoTeUrx+yt53cja20b13E25TM0X8iJmm5qH0+NNv0U99XfPoiy+UTxy1TiPmV6PpE3tP2vZr+JY7XKvLmJ6XLvLw6RMUd0d8855ctMGNi7vtV8Wq/kb3s08ABORAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABKDyaPKIr0z3Ls/f+ZNeB8W1g6rdq64/hFF6Z76O6Ir+b49OtMXxru2qblOlTOiuaJ1h1etXKLtum7arprt1xFVNVM84qie6YnxhZt87T0Deu28nb25NPt52n5EfGoq6VUVR3V0VR1pqjwmEOPJu4/5mya7G2d2Xb2ZtuZimze613cD93xqt/s+HfHombenZuJqOBYz8DJtZWLkURcs3rVcVUXKZjnExMd8Ke7Zrs1f2srdym5Dm75QvBHX+FGseembmo7cybnZw9Rinlynv81diPk1xH1VRHOPGI1O656/pGma9o+Vo+s4NnOwMu3Nu/YvU86a6Z/8AnpMdYnrCAnlM+T5qfDfJvbh29Te1HadyvnNfyrmBMz0ouemnnPKK/qnlPKarDGy4r9mvi1XLW7yw0OAnNIAAAAADY+2/0Fifw1xW7bf6CxP4a4vd9nfk7X7ae6HDZH4tXznvAExqAAAAFRpuFmaln2MDT8a7lZWRXFu1ZtUzVVXVPdERCp21oWrbk1mxo+iYVzMzb88qLdH+czM9IiPGZ6QmdwT4S6Tw90+Mq/NvP3Beo5ZGZyns24nlzt2onupj9bvq755RypjmvKLylx9jWtJ9q5PCn+56I7+bqsdn7OuZlXRTHGfBZeAvBbD2ZZta9uGi1l7irp50UdKreDE+FM91Vfpq8O6npzmrcgxTijv/AG7w621c1rX8ns8+dONjUdbuTciOfYoj+XOZ6R4vCs/PydpZE3r9W9VP8dUdEO2s2LeNb3KI0iFx3tunQ9m7dyde3DnUYmFYjrM9aq6vCiinvqqnwiP9EB+PHGLXeJ+sdiubmBoGPXM4en019J7+Vy5y6VXOX1U90d8zNp4w8TNw8TNxzqWsXfNYdmaowcG3P5vGonwj9aqeUc6p6z7IiIjB0rGxYt+1VxRb1+a+SOAAlowAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA2/wCT3xu1fhpn06bned1HbN65zvYnPnVjzM9blrn3T4zT3VeyerUAxroprjdqZU1TTOsOpu19f0jc+hYuuaFnWs7T8qjt2rtue/0xMd8THdMT1iekq/JsWMrGuY2TZt37F2maLlu5TFVNdMxymJiekxPoc5eCfFjcPDDXPdGn1Tl6VkVxObp1yrlReju7VM/NriO6qPonnHRPvh3vbb2/duWtc25mxfsVdLlurlF2xX40XKfmz/lPfHOOqnv49VqdeZZWr0XI60QvKh8mu/tuMrePD/FuZGiRE3MzTKOdVzCjxrt9Zmu33zMd9Pf1p+TF52BRM8qHyZ6NQ91bz4b4VNvM63c7RrNPKm93zNdiI7q/TRHSfm9elUrGzP8AG52sblrnpQxH6u27lq7Xau0VW7lFU01U1RymmY74mPCX5WSOAAAA2Ptv9BYn8NcVu23+gsT+GuL3fZ35O1+2nuhw2R+LV857wBMagABkOwNm67vfXrej6Fi+cuTym7er5xasUfr11cukf5z3REyunCfhtrvEPWPc2n0e5tPs1R7rz7lEzbsx6I/Wr5d1MT9MxHVNXYe0NC2VoFrRtBxPNWaety7Xym7fr8a7lURHaq/yjuiIiIhxflP5XWtlUzYsaVXp7Keuevojt67jZuyqsqd+vko7/l4rXwo4c6Fw80X3HptPujOvUx7szrlPK5fqj2dezTHhTH1855zOZjUPlB8btI4aYFWm4PmtR3Net87OJz5048THS5d5d0eMU99Xsjq8UvXr+bem5cmaqquMy7Gmm3YoimmNIhfeNfFfb3DDQvdOoVRl6rfpn3Fp1uvlcvT3dqr9WiJ76p+iOc9EBOIu9tw793Jd13cWZN/Ir+Lbt09LVijwoop+bH+cz1nnPVbt06/rG59dydb17PvZ2fk1dq5duT/KIjuppjuiI6RHctiyx8em1HWg3b03J6gBIaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABlXDHf24+Hm46Na29l9iqeVORj3Oc2cmj9WumJ6x38p748Jhio+TEVRpL7EzE6w6S8G+KO3OJuge7tJue586zERm6fdqjzuPVPj+1RPhVHf48p5xGduW20Nya3tLX8bXdv593Bz8eedFyiekx401R3VUz4xPSU8OAPGzReJun04OT5rTdyWaOd/Cmr4t2I77lmZ61U+M099PjzjlM1ORizb9qngsLN+K+SeLE/Kb8nTT9/2sjc+0rVjA3TTTNd230otajy8KvCm56K+6e6r0xA7WdM1DRtVydK1bCv4Wdi3Jt37F6iaa7dUd8TEuuzUflD8DdA4raVOVb81pu5se3yxNQinpciO63e5Rzqo9E99PfHOOdM5Y2XNHs18Gdy1ryw5tC9742pr+ytyZO3tyafcwdQx5+NRV1prpnuroqjpVTPhMLItomJjWEUAfRsfbf6CxP4a4rdtv8AQWJ/DXF7vs78na/bT3Q4bI/Fq+c94AmNQ2hwR4QarxAy6NQzJu6ft63Xyu5XL49/lPWi1z758Jq6xHtmOTIeA3A7J3RGPuPdlq7i6HPK5Yxuc03M2PCZ8aLc+nvqju5RMVJZ4eNjYWJaxMPHtY2PZoi3atWqIoot0xHKKaaY6RER4Q848qvLSnF3sTBnWvhNXNT1R0z/ABHz4dDszY83dLt+OTmjp/8ASk27oulbe0fH0jRcG1hYOPT2bdq3HSPTMzPWZnvmZmZmesyuBMxEc56Qil5SXlG9j3TtHh3m/H628zWLVXyfCaLEx4+E3P8AD4VPJKabmRXMzOszxmf7dTVVTapZX5SHlBYezacjbGz71nM3Fymi/kxyrtYE/wCldz9nujx7uyhRqGZl6jn38/PybuVlZFybl69dqmqu5VM85qmZ75mXjVVVXVNVVU1VTPOZmeczL4t7Nmm1GkK65dm5OsgDc1AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACp0zPzdL1CxqGnZd/EzMeuLlm/Zrmiu3VHdMTHWJUwPqcPk4+UFhb0px9s7uu2MHcfKKLF/wCRaz59nhRc/Z7pn5P6sb/coKaqqKoqpqmmqJ5xMTymJSy8m7yjvOTjbS4i5vx5mLeHrF2fleEUX59Pouf4vGpWZOJp7VHYm2cjX2am8+MvC3bHFLbk6Xr1ibeVaiZws+1Eeexa55dYme+meUc6Z6THonlMc7eL/DLc/DDctWj7hxedq5zqxM21EzZyqI+dTPhMeNM9Y+iYmepdNVNVMVU1RVTMc4mJ5xMLDv8A2dt7fW2cjb25cCjMwr0c459K7VfKYi5RV82uOc8p+rrEzDTj5NVqdJ4JFy3FXzcnRt3ygOBO5eFuoXMyii7qm2rlfLH1Kij+z591F6I+RV4c+6rw9EaiXNFdNca0okxMTpLY+2/0Fifw1xW7bf6CxP4a+aNpmoazqmPpelYd7MzcirsWrNqntVVT/wDCI5zM90REzL3fBrpowrdVU6RFMd0OGvxM3qojpnvUlMTVVFNMTMzPKIjxSY4D8BYt04+5d+YnO50uYuk3YiYpjwqvx6fHzfh87rzpjKeBPBLC2fRZ17clNnO3BMRVbt8oqtYXjHZ/Wuemvujup7u1Vuh5h5U+W0397FwJ0p4TVzz1R0R18/y49LszY0UaXb8cvNHR8x4ahmYmn4N/Ozsmzi4tiibl69drimi3TEc5qmZ6REQot17h0ba2g5Oua/n2cHAxqe1cu3J/lTEd9VU90RHWZQR8oHjhrPEvNr07B89pu2bVfOzh84iu/Md1y9Md8+imJ5R7Z6vO7Fiq7PJwX127FuOtlPlI+UJlbunJ2rsy9dxNv9beTl8uzdzo7piPGm1Po76o7+UTNKPALm3bpt06Uq2uua51kAZsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEg/Jy8oXN2dOPtneN29nbe6UWMnrXewY7oj01W4/V748O7spp6RqOBq+m4+p6XmWM3CyKIrs37NcV0V0+mJhypbB4P8XN28M86Z0jJjJ0y7X2sjTciZmzc9Mx40VcvnR6I5xMRyQsjEiv2qOKVZyJp5KuDo1mY2NmYl3EzMe1kY96iaLtq7RFdFdM9JiqJ6TE+iUaOKvkh7Z1zLualsfVKtuZFc9qrCu0TexZn9nr2rf8AzR4RENj8LOPWwd927WPTqFOi6tVERVgZ9cUTNXot1/Jr9kRyq/ZhtVXxVcsVdCb7NyOlEvaPkrbmx6bGJrm5dIsYtqnlNzDpuXrlXX9WqmiI5+nnPL2pEcO+Hm1dh4c2dBwOzkV09m9mX5ivIux06TVyjlHSPi0xFPOOfLmyxT6jnYWm4dzN1HMx8PFtRzuXr92LdFEemapmIhZ5239oZ1qmxduexERGkckcnTpx+qNZwLFiqa6aeWedUMR4o8RNs8OtBq1XcOZFNdUTGNiW+U38mqPm0U/6zPKI8Zae4veVLt/RrV7Tdh2qdb1HlNPu27TNOLan0xHSq5Pf3cqe6ec9yIm7Nya7uvW72s7i1PI1HOvT8a7dq7o8KaYjpTTHhEREQh2MOqvlr5IZ3cmKeSnllk3GTiluPibrvu3VrvufAs1T7i0+1VPmseJ8f2q58ap+rlHKGBgtaaYpjSFfMzVOsgD6+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADLNscSd+7ZtUWdD3dq+HYo5dixGTVVap+iirnT/kxMfJpieL7EzHBsy5x74u10VUVb2zYiqOU9mzZif5xRzhhW5Nzbi3LkU5G4Nd1LVblPyZy8mu72f3Yqnp9S0D5FFNPCH2a6p4yAMmIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//2Q==" style="width:64px;height:64px;object-fit:contain">'+
          '<div>'+
            '<div style="font-size:26px;font-weight:900;line-height:1;letter-spacing:-0.5px"><span style="color:#D42028">RE/MAX</span> <span style="color:#003DA5">Space</span></div>'+
            '<div style="font-size:10px;color:#888;margin-top:3px;letter-spacing:0.5px">CRECI 41.377-J · Caldas Novas - GO · (64) 9 9914-5346</div>'+
          '</div>'+
        '</div>'+
        '<div style="text-align:right">'+
          '<div style="font-size:9px;color:#aaa;text-transform:uppercase;letter-spacing:2px">Documento Particular</div>'+
          '<div style="font-size:11px;color:#003DA5;font-weight:700;margin-top:2px">'+anoDoc+'</div>'+
        '</div>'+
      '</div>'+

      // CORPO ESCURO — título
      '<div style="flex:1;background:#0f1a35;padding:50px 40px;display:flex;flex-direction:column;justify-content:center">'+
        '<div style="color:#B9975B;font-size:11px;font-weight:700;letter-spacing:4px;text-transform:uppercase;margin-bottom:16px">Instrumento Particular</div>'+
        '<div style="color:rgba(255,255,255,0.5);font-size:15px;font-weight:300;margin-bottom:6px">Contrato de</div>'+
        '<div style="color:#fff;font-size:52px;font-weight:900;line-height:1;margin-bottom:4px">Intermediação</div>'+
        '<div style="color:#D42028;font-size:52px;font-weight:900;line-height:1;margin-bottom:4px">e Representação</div>'+
        '<div style="color:rgba(255,255,255,0.7);font-size:20px;font-weight:300;margin-bottom:40px">Imobiliária</div>'+
        '<div style="border-top:1px solid rgba(255,255,255,0.15);padding-top:28px;display:flex;gap:40px">'+
          '<div>'+
            '<div style="color:#B9975B;font-size:9px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin-bottom:4px">Imóvel</div>'+
            '<div style="color:#fff;font-size:13px;font-weight:600">'+nomeImovel+'</div>'+
          '</div>'+
          (nomeProp ? '<div>'+
            '<div style="color:#B9975B;font-size:9px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin-bottom:4px">Proprietário</div>'+
            '<div style="color:#fff;font-size:13px;font-weight:600">'+nomeProp+'</div>'+
          '</div>' : '')+
        '</div>'+
      '</div>'+

      // RODAPÉ VERMELHO
      '<div style="background:#D42028;padding:16px 40px;display:flex;justify-content:space-between;align-items:center">'+
        '<div style="color:#fff;font-size:11px;font-weight:600">RE/MAX Space · A maior rede imobiliária do mundo</div>'+
        '<div style="color:rgba(255,255,255,0.7);font-size:10px">Gerado em '+new Date().toLocaleDateString('pt-BR')+'</div>'+
      '</div>'+

    '</div>';
  var PG2 = [
    '<div class="pg2">',
      '<div class="sep">',
        '<div class="bvt">SEJA BEM-VINDO(A) AO MUNDO <span>RE/MAX.</span></div>',
        '<div class="bvtx">',
          'Se você está lendo este texto, é porque pretende tomar a (sábia) decisão de ser representado por um profissional da RE/MAX, maior rede imobiliária do mundo que vende um imóvel a cada 20 segundos.',
          '<br><br>Presente em mais de 110 países com mais de 144 mil agentes, com mais de 50 anos de mercado, metodologia NORTE AMERICANA, a RE/MAX trabalha com profissionais altamente treinados nas melhores práticas do mercado imobiliário para alcançar o melhor resultado para você.',
          '<br><br>Para isso, utilizamos um conceito de representação que vai muito além de intermediar uma venda. Como representante do cliente vendedor, nossos corretores se comprometem a realizar um trabalho consistente que inclui um <strong>estudo de precificação correta</strong> (com base em análise de dados, e não em opiniões), <strong>plano de marketing estratégico personalizado</strong> (com fotos e vídeos profissionais, além de divulgação em portais, sites, redes sociais), reuniões de feedback semanais e acompanhamento de documentações e clientes.',
          '<br><br><u>E o melhor é que você não precisa pagar nada a mais por isso.</u>',
          '<br><br>Sua única contrapartida será garantir, em prazo delimitado, que o corretor RE/MAX será o seu único representante para tratar da venda do seu imóvel.',
          '<br><br><strong>Não se preocupe:</strong> <u>isso não significa que ele será o único corretor apto a vendê-lo.</u> Ao escolher um representante da RE/MAX, seu imóvel será divulgado profissionalmente num cadastro acessado por milhares de corretores da RE/MAX no Brasil e no mundo, além de corretores autônomos e imobiliárias parceiras. Toda a mediação e agendamento de visitas, contudo, será realizada por seu representante.',
          '<br><br>De um lado, o contrato assegura que você terá um representante altamente capacitado que investirá tempo e outros recursos para vender o seu imóvel no <strong>valor adequado e no menor tempo possível.</strong> Do outro, garante que todo investimento feito por esse corretor não será em vão.',
          '<br><br>Nós, da família RE/MAX Brasil, temos a convicção de que este relacionamento irá muito além deste primeiro encontro, construindo laços sólidos e duradouros baseados em confiança, excelência e comprometimento.',
        '</div>',
        '<div class="bv-logos">Cada unidade franqueada é jurídica e financeiramente independente de outras unidades RE/MAX &nbsp;·&nbsp; CRECI 41377-J &nbsp;·&nbsp; 2025</div>',
      '</div>',
    '</div>'
  ].join('');

  var PROP1 = [
    '<div class="tbl-h">Contratante / Proprietário 1</div>',
    '<table class="t">',
      '<tr><td class="lb">Nome Completo</td><td colspan="3">'+(c.prop1_nome||'')+'</td></tr>',
      '<tr><td class="lb">RG</td><td>'+(c.prop1_rg||'')+'</td><td class="lb">CPF</td><td>'+(c.prop1_cpf||'')+'</td></tr>',
      '<tr><td class="lb">Endereço</td><td colspan="3">'+(c.prop1_end||'')+'</td></tr>',
      '<tr><td class="lb">Email</td><td>'+(c.prop1_email||'')+'</td><td class="lb">Estado Civil</td><td>'+(c.prop1_ec||'')+'</td></tr>',
      '<tr><td class="lb">Telefone</td><td>'+(c.prop1_tel||'')+'</td><td class="lb">Nacionalidade</td><td>'+(c.prop1_nac||'Brasileira')+'</td></tr>',
    '</table>'
  ].join('');

  var PROP2 = c.prop2_nome ? [
    '<div class="tbl-h">Proprietário 2 / Cônjuge</div>',
    '<table class="t">',
      '<tr><td class="lb">Nome</td><td colspan="3">'+c.prop2_nome+'</td></tr>',
      '<tr><td class="lb">RG</td><td>'+c.prop2_rg+'</td><td class="lb">CPF</td><td>'+c.prop2_cpf+'</td></tr>',
    '</table>'
  ].join('') : '';

  var IMOVEL = [
    '<h3>Proprietários / Titulares de Direitos do Imóvel:</h3>',
    '<div class="ig">',
      '<div class="ic if"><label>Tipo do Imóvel</label><span>'+(c.im_tipo||'')+'</span></div>',
      '<div class="ic if"><label>Endereço</label><span>'+(c.im_end||'')+'</span></div>',
      '<div class="ic"><label>Complemento</label><span>'+(c.im_comp||'')+'</span></div>',
      '<div class="ic"><label>Bairro</label><span>'+(c.im_bairro||'')+'</span></div>',
      '<div class="ic"><label>CEP</label><span>'+(c.im_cep||'')+'</span></div>',
      '<div class="ic"><label>Cidade / Estado</label><span>'+(c.im_cidade||'Caldas Novas')+' — '+(c.im_estado||'GO')+'</span></div>',
      '<div class="ic"><label>Classificação Fiscal (ITPU)</label><span>'+(c.im_itpu||'')+'</span></div>',
      '<div class="ic"><label>Nº Matrícula</label><span>'+(c.im_matricula||'')+'</span></div>',
      '<div class="ic if"><label>Cartório de Registro de Imóveis</label><span>'+(c.im_cartorio||'')+'</span></div>',
      '<div class="ic if"><label>Valor do Imóvel</label><span style="font-size:13px;font-weight:800;color:#003DA5">'+(c.im_valor||'')+'</span></div>',
      (c.im_obs ? '<div class="ic if"><label>Observações</label><span>'+(c.im_obs||'')+'</span></div>' : ''),
    '</div>'
  ].join('');

  var CLAUSULAS = [
    '<h3>Objeto</h3>',
    '<div class="cl"><strong>1.</strong> O presente contrato tem por objeto a prestação de Serviços de Intermediação e Representação Imobiliária pela CONTRATADA ao(s) CONTRATANTE(s), nos termos dos artigos 722 e seguintes do Código Civil Brasileiro, com relação ao imóvel descrito no presente instrumento.</div>',
    '<div class="cl"><strong>1.1.</strong> Adicionalmente aos serviços de intermediação previstos em lei, a CONTRATADA prestará ao(s) CONTRATANTE(S) os serviços profissionais previstos na cláusula 2.1, correndo por conta da CONTRATADA os respectivos custos e investimentos necessários para tanto.</div>',
    '<div class="cl"><strong>1.2.</strong> Como contrapartida, o(s) CONTRATANTE(s) garantirá(ão) à CONTRATADA o exercício exclusivo da representação imobiliária relativamente ao imóvel pelo prazo de <strong><u>'+pr+' ('+prx+')</u></strong> dias contados da data de assinatura do presente instrumento, renováveis por igual período, salvo manifestação contrária das Partes.</div>',
    '<div class="cl"><strong>1.3.</strong> O(s) CONTRATANTE(s) reconhece(m) que o prazo concedido na cláusula 1.2 é essencial para o desenvolvimento dos serviços descritos na cláusula 2.1 e que a concessão deste prazo é condição essencial para a realização dos investimentos da CONTRATADA na divulgação e prospecção de oportunidades de negócio em favor do(s) CONTRATANTE(s).</div>',
    '<h3>Compromissos da Contratada para a Representação Imobiliária</h3>',
    '<div class="cl"><strong>2.</strong> A vigência do presente contrato sujeita-se ao cumprimento das obrigações previstas nesta cláusula.</div>',
    '<div class="cl"><strong>2.1.</strong> A CONTRATADA compromete-se a:<br>• Prestar os serviços dentro das normas profissionais e éticas da atividade imobiliária;<br>• Entregar e cumprir os termos do <strong>Plano de Marketing Personalizado</strong> criado para o imóvel;<br>• Apresentar um estudo de <strong>Análise Comparativa de Mercado</strong> embasando a precificação do imóvel dentro do momento atual de oferta e demanda do mercado imobiliário;<br>• Prestar contas ao(s) CONTRATANTE(s) sempre que solicitado;<br>• Comunicar imediatamente o(s) CONTRATANTE(s) caso a imobiliária deixe de fazer parte da rede RE/MAX.</div>',
    '<h3>Encerramento Antecipado da Representação Imobiliária</h3>',
    '<div class="cl"><strong>3.</strong> O(s) CONTRATANTE(s) poderá(ão) dar por encerrada a representação imobiliária de forma antecipada caso a CONTRATADA descumpra as obrigações previstas na cláusula 2.1.</div>',
    '<div class="cl"><strong>3.1.</strong> O(s) CONTRATANTE(s) comunicará(ão) a CONTRATADA acerca da infração, concedendo prazo de <u>45 (quarenta e cinco)</u> dias úteis para solução ou apresentação de justificativa.</div>',
    '<div class="cl"><strong>3.2.</strong> Caso não solucionada ou justificada a ocorrência pela CONTRATADA, a representação será dada como encerrada a partir do vencimento do prazo previsto na cláusula 3.1.</div>',
    '<div class="cl"><strong>3.3.</strong> Caso a imobiliária deixe de fazer parte da rede RE/MAX, o(s) CONTRATANTE(s) terá(ão) o direito de optar pela continuidade da representação ou requerer a rescisão do presente contrato.</div>',
    '<h3>Remuneração</h3>',
    '<div class="cl"><strong>4.</strong> Pelos serviços de Intermediação e Representação Imobiliária o(s) CONTRATANTE(s) pagará(ão) à CONTRATADA, ou a quem esta indicar, uma remuneração correspondente a <strong><u>'+pct+'% ('+pctx+' por cento)</u></strong> do valor bruto de venda do imóvel.</div>',
    '<div class="cl"><strong>4.1.</strong> A remuneração à CONTRATADA será também devida nos casos de (i) venda direta do imóvel ou através de terceiros durante a vigência do prazo previsto na cláusula 1.2; (ii) venda do imóvel após o período previsto na cláusula 1.2, para interessados prospectados pela CONTRATADA (RE/MAX).<sup>(1)(2)</sup></div>',
    '<h3>Proteção de Dados Pessoais</h3>',
    '<div class="cl"><strong>5.</strong> Na execução deste Contrato a CONTRATADA poderá ter acesso a informações pessoais e sigilosas do(s) CONTRATANTE(s), sendo legalmente responsável pela guarda, proteção e utilização consciente dos dados pessoais, nos termos da Lei nº 13.709/2018 (LGPD).</div>',
    '<div class="cl"><strong>5.1.</strong> Por dados pessoais entende-se toda e qualquer informação capaz de identificar direta ou indiretamente qualquer pessoa, tais como nome, RG, CPF, gênero, data e local de nascimento, endereço residencial ou comercial, número de telefone, dados de contato, entre outros.</div>',
    '<div class="cl"><strong>5.2.</strong> O(s) CONTRATANTE(s) expressamente consentem com a coleta, uso e compartilhamento dos dados pessoais necessários para o desenvolvimento da atividade profissional de intermediação imobiliária.</div>',
    '<h3>Disposições Gerais</h3>',
    '<div class="cl"><strong>6.</strong> As partes declaram ter recebido o presente instrumento com antecedência necessária para a correta e atenta leitura e compreensão de todos os seus termos, direitos e obrigações, e, ainda, que entendem e concordam com os termos e condições aqui ajustados, sendo presente contrato assinado de forma irrevogável e irretratável.</div>',
    '<div class="cl"><strong>7.</strong> Fica eleito o Foro da Comarca de <strong>Caldas Novas</strong>, Estado de <strong>Goiás</strong>, para dirimir quaisquer dúvidas e/ou controvérsias oriundas do presente instrumento.</div>',
    '<div class="cl" style="font-size:9.5px">As partes aceitam integralmente que as assinaturas do presente instrumento poderão ser realizadas na forma eletrônica nos termos do parágrafo 2º do artigo 10, da MP 2.200-2/2001. Em caso de assinatura em documento físico, as partes firmarão o presente Contrato em 02 (duas) vias de igual teor e forma. Em ambos os casos as Partes assinam na presença de duas testemunhas.</div>',
    '<div class="nota"><div>(1) Artigo 726 do Código Civil.</div><div>(2) Artigo 727 do Código Civil.</div></div>'
  ].join('');

  var ASSIN = [
    '<div class="sg" style="margin-top:24px">',
      '<div style="font-size:10.5px;font-weight:700;text-decoration:underline;flex:0 0 auto">CALDAS NOVAS, '+dt+'</div>',
    '</div>',
    '<div class="sg">',
      '<div class="sb">'+(c.prop1_nome||'CONTRATANTE')+'<br><span style="font-size:8.5px;color:#555">CPF: '+(c.prop1_cpf||'')+'</span></div>',
      '<div class="sb">IMOBILIÁRIA RE/MAX SPACE<br><span style="font-size:8.5px;color:#555">CONTRATADA · CNPJ 53.172.343/0001-08</span></div>',
    '</div>',
    (c.corretor_nome ? '<div style="border:1px solid #e2e5ed;border-radius:4px;padding:7px 10px;font-size:9.5px;margin-bottom:10px"><strong>Nome do Corretor:</strong> '+c.corretor_nome+' &nbsp;|&nbsp; <strong>CRECI:</strong> '+(c.corretor_creci||'')+' &nbsp;|&nbsp; <strong>CPF:</strong> '+(c.corretor_cpf||'')+'</div>' : ''),
    '<div class="tg">',
      '<div style="border-top:1px solid #111;padding-top:5px;font-size:9px"><strong>TESTEMUNHA 1</strong><br><br>'+(c.test1_nome||'')+'<br>CPF: '+(c.test1_cpf||'')+'</div>',
      '<div style="border-top:1px solid #111;padding-top:5px;font-size:9px"><strong>TESTEMUNHA 2</strong><br><br>'+(c.test2_nome||'')+'<br>CPF: '+(c.test2_cpf||'')+'</div>',
    '</div>'
  ].join('');

  var h = '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Contrato RE/MAX Space</title><style>'+CSS+'</style></head><body>' +
    CAPA +
    PG2 +
    '<div class="corpo">' +
      '<div class="intro">Têm entre si justo e acordado o seguinte <strong>Contrato de Intermediação e Representação Imobiliária</strong>, o que fazem nos seguintes termos:</div>' +
      '<div class="intro"><u>Imobiliária <strong>RE/MAX SPACE</strong></u> com sede na Galeria Verano - Loja, 4, Rua Pedro Branco de Souza, 214 - quadra 9, Lote 11 no Município de Caldas Novas, Estado de Goiás, inscrita no CNPJ/ME sob nº <strong>53.172.343/0001-08</strong>, doravante denominada <strong>CONTRATADA</strong>; e de outro lado, denominado(s) <strong>CONTRATANTE(s)</strong>:</div>' +
      PROP1 + PROP2 + IMOVEL + CLAUSULAS + ASSIN +
    '</div>' +
    '<div class="ft"><span>RE/MAX Space — Caldas Novas GO</span><span>CRECI 41377-J · CNPJ 53.172.343/0001-08</span><span>'+new Date().toLocaleDateString('pt-BR')+'</span></div>' +
    '</body></html>';

  var w=window.open('','_blank');
  w.document.write(h);
  w.document.close();
  // Injeta banner de assinatura digital
  setTimeout(function(){
    try {
      var banner = w.document.createElement('div');
      banner.id = 'sign-banner';
      banner.style.cssText = 'position:fixed;top:0;left:0;right:0;z-index:9999;background:#1351B4;color:#fff;padding:10px 20px;display:flex;align-items:center;justify-content:space-between;font-family:Arial,sans-serif;font-size:13px;box-shadow:0 2px 8px rgba(0,0,0,.3)';
      banner.innerHTML =
        '<div style="display:flex;align-items:center;gap:12px">'+
          '<span style="font-size:20px">✍️</span>'+
          '<div>'+
            '<div style="font-weight:700">Assinatura Digital</div>'+
            '<div style="font-size:11px;opacity:.85">Suba este PDF para coletar assinaturas eletrônicas</div>'+
          '</div>'+
        '</div>'+
        '<div style="display:flex;gap:8px">'+
          '<a href="https://assinador.iti.br" target="_blank" style="background:#fff;color:#1351B4;padding:6px 12px;border-radius:6px;text-decoration:none;font-size:12px;font-weight:700">🇧🇷 Gov.br</a>'+
          '<a href="https://app.d4sign.com.br" target="_blank" style="background:#4f46e5;color:#fff;padding:6px 12px;border-radius:6px;text-decoration:none;font-size:12px;font-weight:700">D4Sign</a>'+
          '<a href="https://app.clicksign.com" target="_blank" style="background:#00b894;color:#fff;padding:6px 12px;border-radius:6px;text-decoration:none;font-size:12px;font-weight:700">ClickSign</a>'+
          '<a href="https://www.autentique.com.br" target="_blank" style="background:#0f1a35;color:#fff;padding:6px 12px;border-radius:6px;text-decoration:none;font-size:12px;font-weight:700">Autentique</a>'+
          '<button onclick="window._hidePrint()" style="background:#D42028;color:#fff;padding:6px 14px;border-radius:6px;border:none;font-size:12px;font-weight:700;cursor:pointer">🖨️ Imprimir/PDF</button>'+
        '</div>';
      w.document.body.insertBefore(banner, w.document.body.firstChild);
      w.document.body.style.marginTop = '70px';
      w._hidePrint = function(){ var b=w.document.getElementById('sign-banner'); if(b) b.style.display='none'; w.print(); };
    } catch(e){ w.print(); }
  }, 800);
}


// ===== BUSCA GLOBAL =====
var _gsOpen = false;
document.addEventListener('keydown', function(e){
  if((e.ctrlKey||e.metaKey) && e.key==='k'){
    e.preventDefault();
    toggleGS();
  }
  if(e.key==='Escape') closeGS();
});

function toggleGS(){
  var wrap = document.getElementById('gs-wrap');
  if(!wrap) return;
  _gsOpen = !_gsOpen;
  wrap.style.display = _gsOpen ? 'block' : 'none';
  if(_gsOpen){ setTimeout(function(){ document.getElementById('gs-inp').focus(); },50); }
  else { closeGS(); }
}

function closeGS(){
  var wrap = document.getElementById('gs-wrap');
  if(wrap) wrap.style.display='none';
  var inp = document.getElementById('gs-inp');
  if(inp){ inp.value=''; }
  var res = document.getElementById('gs-res');
  if(res){ res.style.display='none'; res.innerHTML=''; }
  _gsOpen=false;
}

function runGS(q){
  if(!q||q.length<2){ document.getElementById('gs-res').style.display='none'; return; }
  var ql = q.toLowerCase();
  var results = [];

  // Contratos de locação
  ctD.forEach(function(c){
    if((c.prop+c.inq+c.id+c.end).toLowerCase().indexOf(ql)>=0){
      results.push({tag:'Locação',tagC:'loc',titulo:c.id+' — '+c.prop,sub:c.inq+' · '+fmt(c.valor),fn:function(){closeGS();gP('lc');}});
    }
  });
  // Leads venda
  ldD.forEach(function(l){
    if((l.nome+(l.tel||'')+(l.cor||'')).toLowerCase().indexOf(ql)>=0){
      results.push({tag:'Lead Venda',tagC:'lead',titulo:l.nome,sub:(l.tel||'')+(l.cor?' · '+l.cor:''),fn:function(){closeGS();gP('leads');}});
    }
  });
  // Leads locação
  llD.forEach(function(l){
    if((l.nome+(l.tel||'')+(l.cor||'')+(l.bairro||'')).toLowerCase().indexOf(ql)>=0){
      results.push({tag:'Lead Locação',tagC:'loc',titulo:l.nome,sub:(l.tipo||'')+(l.bairro?' · '+l.bairro:'')+(l.cor?' · '+l.cor:''),fn:function(){closeGS();gP('loc-l');}});
    }
  });
  // Imóveis venda
  ivD.forEach(function(iv){
    if((iv.prop+iv.end+(iv.tipo||'')).toLowerCase().indexOf(ql)>=0){
      results.push({tag:'Imóvel Venda',tagC:'venda',titulo:iv.tipo+' — '+iv.end,sub:'Prop: '+iv.prop+' · '+fmt(iv.valor),fn:function(){closeGS();gP('iv');}});
    }
  });
  // MCMV
  mcmvD.forEach(function(m){
    if((m.nome+(m.tel||'')).toLowerCase().indexOf(ql)>=0){
      results.push({tag:'MCMV',tagC:'mcmv',titulo:m.nome,sub:(m.faixa||'')+(m.corretor?' · '+m.corretor:''),fn:function(){closeGS();gP('mcmv');}});
    }
  });
  // Proprietários
  propCad.forEach(function(p){
    if((p.nome+(p.tel||'')).toLowerCase().indexOf(ql)>=0){
      results.push({tag:'Proprietário',tagC:'prop',titulo:p.nome,sub:(p.tel||''),fn:function(){closeGS();gP('cad-prop');}});
    }
  });
  // Inquilinos
  inqCad.forEach(function(iq){
    if((iq.nome+(iq.tel||'')).toLowerCase().indexOf(ql)>=0){
      results.push({tag:'Inquilino',tagC:'loc',titulo:iq.nome,sub:(iq.tel||''),fn:function(){closeGS();gP('cad-inq');}});
    }
  });

  var res = document.getElementById('gs-res');
  if(results.length===0){
    res.innerHTML='<div style="padding:14px;text-align:center;color:var(--lm);font-size:12px">Nenhum resultado encontrado para "'+q+'"</div>';
  } else {
    res.innerHTML = results.slice(0,12).map(function(r,i){
      return '<div class="gs-item" id="gsi-'+i+'">'
        +'<span class="gs-tag '+r.tagC+'">'+r.tag+'</span>'
        +'<div style="flex:1;min-width:0"><div style="font-size:13px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">'+r.titulo+'</div>'
        +'<div style="font-size:11px;color:var(--lm);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">'+r.sub+'</div></div>'
        +'</div>';
    }).join('')+(results.length>12?'<div style="padding:8px;text-align:center;font-size:11px;color:var(--lm)">+'+(results.length-12)+' resultados — refine a busca</div>':'');
    results.slice(0,12).forEach(function(r,i){
      var el=document.getElementById('gsi-'+i);
      if(el) el.onclick=r.fn;
    });
  }
  res.style.display='block';
}

document.addEventListener('click', function(e){
  var wrap=document.getElementById('gs-wrap');
  if(wrap&&!wrap.contains(e.target)) closeGS();
});


// ===== MODELOS DE CONTRATOS (só admin) =====
var MODELOS_ADM = [
  {
    cat:'Locação',cor:'#0d1f4e',icone:'🏠',
    docs:[
      {nome:'Contrato de Locação Residencial',desc:'Modelo padrão para locação de imóveis residenciais'},
      {nome:'Contrato de Locação Comercial',desc:'Modelo para locação de salas e espaços comerciais'},
      {nome:'Contrato de Locação por Temporada',desc:'Locação por período determinado — temporada'},
      {nome:'Aditivo de Reajuste',desc:'Aditivo contratual para reajuste de valor de aluguel'},
      {nome:'Aditivo de Prorrogação',desc:'Prorrogação de prazo do contrato de locação'},
    ]
  },
  {
    cat:'Representação',cor:'#1a6e3a',icone:'🤝',
    docs:[
      {nome:'Contrato de Representação / Gestão Exclusiva',desc:'Captação exclusiva com autorização de venda'},
      {nome:'Autorização de Venda Simples',desc:'Autorização não exclusiva para intermediação'},
      {nome:'Renovação de Representação',desc:'Renovação do prazo de exclusividade'},
    ]
  },
  {
    cat:'Prestação de Serviços',cor:'#5b21b6',icone:'⚙️',
    docs:[
      {nome:'Contrato de Prestação de Serviços Imobiliários',desc:'Serviços de consultoria e intermediação'},
      {nome:'Proposta de Compra e Venda',desc:'Proposta formal com condições de pagamento'},
      {nome:'Instrumento Particular de Compra e Venda',desc:'Compromisso de compra e venda'},
    ]
  },
  {
    cat:'Notificações',cor:'#b45309',icone:'📨',
    docs:[
      {nome:'Notificação de Rescisão Contratual',desc:'Comunicação formal de rescisão de contrato'},
      {nome:'Notificação de Inadimplência',desc:'Notificação por falta de pagamento'},
      {nome:'Notificação de Desocupação',desc:'Comunicado formal para desocupação do imóvel'},
      {nome:'Notificação Extrajudicial',desc:'Notificação com valor legal extrajudicial'},
    ]
  },
  {
    cat:'Declarações',cor:'#0e7490',icone:'📋',
    docs:[
      {nome:'Declaração de Quitação',desc:'Declaração de inexistência de débitos'},
      {nome:'Declaração de Residência',desc:'Declaração de endereço para fins legais'},
      {nome:'Declaração de Vistoria',desc:'Declaração de estado do imóvel na entrega'},
      {nome:'Declaração de Anuência',desc:'Anuência de proprietário ou cônjuge'},
    ]
  },
  {
    cat:'Recibos',cor:'#b91c1c',icone:'🧾',
    docs:[
      {nome:'Recibo de Aluguel',desc:'Comprovante de pagamento de aluguel'},
      {nome:'Recibo de Comissão',desc:'Comprovante de pagamento de honorários'},
      {nome:'Recibo de Depósito / Caução',desc:'Comprovante de depósito de garantia'},
      {nome:'Recibo de Entrega de Chaves',desc:'Confirmação de entrega das chaves do imóvel'},
    ]
  }
];

function pModeloRepresentacao(){
  function mCampo(label,id,tipo){
    return '<div style="margin-bottom:10px"><label style="font-size:11px;font-weight:600;color:#4a5568;display:block;margin-bottom:4px">'+label+'</label><input id="'+id+'" type="'+tipo+'" style="width:100%;padding:8px 12px;border:1px solid #e2e8f0;border-radius:8px;font-size:12px;color:#0d1829;box-sizing:border-box"></div>';
  }
  var pc=document.getElementById('pc');
  pc.innerHTML=
    '<div style="background:#fff;border-radius:14px;border:1px solid #e8edf2;overflow:hidden;max-width:860px;margin:0 auto">'+
      '<div style="background:#1a6e3a;padding:20px 28px;display:flex;align-items:center;gap:12px">'+
        '<span style="font-size:28px">🤝</span>'+
        '<div><div style="font-size:15px;font-weight:800;color:#fff">Contrato de Representação / Gestão Exclusiva</div>'+
        '<div style="font-size:12px;color:rgba(255,255,255,.6)">Captação com exclusividade — RE/MAX Space</div></div>'+
      '</div>'+
      '<div style="padding:24px 28px">'+
        '<div style="font-size:12px;color:#64748b;margin-bottom:20px;background:#f0fdf4;border-radius:8px;padding:12px 16px;border-left:3px solid #1a6e3a">'+
          '📌 Preencha os dados e clique em Gerar para baixar o contrato preenchido.'+
        '</div>'+
        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:20px">'+
          '<div><div style="font-size:10px;font-weight:800;color:#4a5568;letter-spacing:1px;text-transform:uppercase;margin-bottom:14px">Dados do Proprietário</div>'+
            mCampo('Nome completo','mod-prop-nome','text')+
            mCampo('CPF','mod-prop-cpf','text')+
            mCampo('RG','mod-prop-rg','text')+
            mCampo('Telefone','mod-prop-tel','text')+
            mCampo('E-mail','mod-prop-email','email')+
            mCampo('Endereço','mod-prop-end','text')+
          '</div>'+
          '<div><div style="font-size:10px;font-weight:800;color:#4a5568;letter-spacing:1px;text-transform:uppercase;margin-bottom:14px">Dados do Imóvel</div>'+
            mCampo('Tipo do imóvel','mod-im-tipo','text')+
            mCampo('Endereço do imóvel','mod-im-end','text')+
            mCampo('Área (m²)','mod-im-area','text')+
            mCampo('Valor de venda (R$)','mod-im-valor','text')+
            mCampo('Prazo exclusividade (dias)','mod-im-prazo','number')+
            mCampo('Comissão (%)','mod-im-com','number')+
          '</div>'+
        '</div>'+
        '<div style="margin-bottom:20px"><div style="font-size:10px;font-weight:800;color:#4a5568;letter-spacing:1px;text-transform:uppercase;margin-bottom:10px">Corretor Responsável</div>'+
          '<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">'+
            mCampo('Nome do corretor','mod-cor-nome','text')+
            mCampo('CRECI','mod-cor-creci','text')+
          '</div>'+
        '</div>'+
        '<div style="display:flex;justify-content:flex-end">'+
          '<button onclick="gerarModeloRep()" style="background:#1a6e3a;color:#fff;border:none;border-radius:8px;padding:12px 28px;font-size:13px;font-weight:700;cursor:pointer">📄 Gerar e Baixar Contrato</button>'+
        '</div>'+
      '</div>'+
    '</div>';
  // Preencher nome do corretor logado
  var el=document.getElementById('mod-cor-nome');
  if(el&&U) el.value=U.nome||'';
}

function gerarModeloRep(){
  var g=function(id){return (document.getElementById(id)||{value:'_______________'}).value||'_______________';};
  var nome=g('mod-prop-nome'),cpf=g('mod-prop-cpf'),rg=g('mod-prop-rg');
  var tel=g('mod-prop-tel'),email=g('mod-prop-email'),end=g('mod-prop-end');
  var imTipo=g('mod-im-tipo'),imEnd=g('mod-im-end'),imArea=g('mod-im-area');
  var imValor=g('mod-im-valor'),prazo=g('mod-im-prazo')||'180',com=g('mod-im-com')||'6';
  var corNome=g('mod-cor-nome'),corCreci=g('mod-cor-creci');
  var hoje=new Date().toLocaleDateString('pt-BR');

  var html='<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8"><title>Contrato de Representação — '+nome+'</title>'+
    '<style>@page{margin:3cm 2.5cm}body{font-family:Arial,sans-serif;font-size:11pt;line-height:1.8;color:#000;max-width:800px;margin:40px auto;padding:40px}'+
    'h1{text-align:center;font-size:13pt;text-transform:uppercase;margin-bottom:4px}'+
    '.sub{text-align:center;font-size:10pt;color:#555;margin-bottom:24px;border-bottom:2px solid #000;padding-bottom:10px}'+
    'h2{font-size:11pt;font-weight:bold;margin:18px 0 6px;text-transform:uppercase}'+
    'p{margin:0 0 10px;text-align:justify}.logo{text-align:center;font-size:16pt;font-weight:900;color:#003DA5;letter-spacing:2px;margin-bottom:6px}'+
    '.ass{margin-top:60px;display:grid;grid-template-columns:1fr 1fr;gap:40px}'+
    '.al{border-top:1px solid #000;padding-top:8px;text-align:center;font-size:10pt}'+
    '.noprint{background:#0d1f4e;color:#fff;padding:12px 20px;margin:-40px -40px 30px;display:flex;align-items:center;justify-content:space-between}'+
    '@media print{.noprint{display:none}}</style></head><body>'+
    '<div class="noprint"><span style="font-size:13px;font-weight:700">📄 Contrato de Representação — '+nome+'</span>'+
    '<button onclick="window.print()" style="background:#D42028;color:#fff;border:none;border-radius:6px;padding:8px 20px;font-size:12px;font-weight:700;cursor:pointer">🖨️ Imprimir / Salvar PDF</button></div>'+
    '<div class="logo">RE/MAX SPACE</div>'+
    '<h1>Contrato de Representação Imobiliária com Exclusividade</h1>'+
    '<div class="sub">Caldas Novas — GO, '+hoje+'</div>'+
    '<h2>Das Partes</h2>'+
    '<p><b>OUTORGANTE:</b> '+nome+', CPF nº '+cpf+', RG nº '+rg+', residente em '+end+', tel. '+tel+', e-mail '+email+'.</p>'+
    '<p><b>OUTORGADA:</b> RE/MAX Space Consultoria Imobiliária, Caldas Novas — GO, representada por '+corNome+(corCreci?', CRECI nº '+corCreci:'')+'.</p>'+
    '<h2>Cláusula 1ª — Do Objeto</h2>'+
    '<p>Autorização exclusiva para intermediação do imóvel: <b>'+imTipo+'</b>, localizado em <b>'+imEnd+'</b>'+(imArea!=='_______________'?', área de '+imArea+' m²':'')+', valor de oferta: <b>R$ '+imValor+'</b>.</p>'+
    '<h2>Cláusula 2ª — Da Exclusividade e Prazo</h2>'+
    '<p>Exclusividade por <b>'+prazo+' dias</b>, renovável. Proibida negociação paralela sob pena de comissão integral devida.</p>'+
    '<h2>Cláusula 3ª — Da Comissão</h2>'+
    '<p>Comissão de <b>'+com+'%</b> sobre o valor efetivo da transação, paga na assinatura do instrumento definitivo.</p>'+
    '<h2>Cláusula 4ª — Das Obrigações da Outorgada</h2>'+
    '<p>Divulgar o imóvel, realizar visitas, apresentar propostas e acompanhar a negociação até a conclusão.</p>'+
    '<h2>Cláusula 5ª — Das Obrigações do Outorgante</h2>'+
    '<p>Manter o imóvel disponível, fornecer documentação e não negociar diretamente com compradores apresentados.</p>'+
    '<h2>Cláusula 6ª — Do Foro</h2>'+
    '<p>Foro da Comarca de Caldas Novas — GO. Por estarem de acordo, assinam em 2 vias.</p>'+
    '<div class="ass">'+
    '<div class="al">'+nome+'<br>CPF: '+cpf+'<br><small>Proprietário</small></div>'+
    '<div class="al">'+corNome+'<br>RE/MAX Space — Caldas Novas<br><small>Corretor Responsável</small></div>'+
    '</div>'+
    '<p style="margin-top:40px;text-align:center;font-size:10pt">Testemunhas:<br><br>1. _________________________________ CPF: _____________________<br><br>2. _________________________________ CPF: _____________________</p>'+
    '</body></html>';

  var blob=new Blob([html],{type:'text/html;charset=utf-8'});
  var url=URL.createObjectURL(blob);
  var a=document.createElement('a');
  a.href=url;
  a.download='Representacao_'+nome.split(' ')[0]+'_'+new Date().toISOString().slice(0,10)+'.html';
  a.click();
  URL.revokeObjectURL(url);
  alert('Contrato gerado! Abra o arquivo e clique em Imprimir para salvar como PDF.');
}


// ===== STORAGE DE MODELOS =====
var modelosUpload = {}; // cache local dos uploads

async function uploadModelo(nome, file){
  // Ler arquivo como dataURL para salvar localmente
  var dataURL = await new Promise(function(resolve){
    var reader = new FileReader();
    reader.onload = function(e){ resolve(e.target.result); };
    reader.readAsDataURL(file);
  });
  var refs = JSON.parse(localStorage.getItem('modelos_refs')||'{}');
  // Tentar Supabase Storage
  var path = null;
  if(sb){
    try{
      var slug = nome.replace(/[^a-zA-Z0-9]/g,'_').toLowerCase();
      var ext = file.name.split('.').pop();
      path = 'modelos/' + slug + '.' + ext;
      var {data, error} = await sb.storage.from('documentos').upload(path, file, {upsert:true});
      if(error) path = null;
    }catch(e){ path = null; }
  }
  // Salvar referência + dataURL no localStorage (funciona offline também)
  refs[nome] = {path:path, nome:file.name, data:new Date().toLocaleDateString('pt-BR'), dataURL:dataURL};
  try{ localStorage.setItem('modelos_refs', JSON.stringify(refs)); }catch(e){
    // Se localStorage cheio, salvar sem dataURL
    refs[nome] = {path:path, nome:file.name, data:new Date().toLocaleDateString('pt-BR')};
    localStorage.setItem('modelos_refs', JSON.stringify(refs));
  }
  return path||'local';
}

async function downloadModeloReal(nome){
  var refs = JSON.parse(localStorage.getItem('modelos_refs')||'{}');
  var ref = refs[nome];
  if(!ref){ baixarModelo(nome); return; }
  // Tentar Supabase Storage
  if(ref.path && sb){
    try{
      var {data} = await sb.storage.from('documentos').createSignedUrl(ref.path, 3600);
      if(data&&data.signedUrl){ window.open(data.signedUrl,'_blank'); return; }
    }catch(e){}
  }
  // Fallback: verificar se temos o arquivo em IndexedDB/cache local
  if(ref.dataURL){
    var a=document.createElement('a');
    a.href=ref.dataURL;
    a.download=ref.nome;
    a.click();
    return;
  }
  // Informar e pedir novo upload
  if(confirm('O arquivo "'+ref.nome+'" foi registrado em '+ref.data+' mas não está acessível agora.\n\nClique OK para fazer o upload novamente.')){
    triggerUploadModelo(nome);
  }
}

function triggerUploadModelo(nome){
  var input = document.createElement('input');
  input.type = 'file';
  input.accept = '.doc,.docx,.pdf';
  input.onchange = async function(){
    var file = input.files[0]; if(!file) return;
    var btn = document.getElementById('upload-btn-'+nome.replace(/[^a-z0-9]/gi,'_'));
    if(btn){ btn.textContent = '⏳ Enviando...'; btn.disabled=true; }
    await uploadModelo(nome, file);
    if(btn){ btn.textContent = '✅ '+file.name.substring(0,20)+(file.name.length>20?'...':''); btn.style.background='#f0fdf4'; btn.style.color='#1a6e3a'; btn.disabled=false; }
    // Atualizar o botão de baixar
    var dlBtn = document.getElementById('dl-btn-'+nome.replace(/[^a-z0-9]/gi,'_'));
    if(dlBtn){ dlBtn.style.background='#0d1f4e'; dlBtn.style.color='#fff'; dlBtn.textContent='⬇ Baixar'; }
  };
  input.click();
}

function pModelos(){
  if(!isA()){
    document.getElementById('pc').innerHTML='<div style="text-align:center;padding:60px;color:#94a3b8">Acesso restrito ao administrador.</div>';
    return;
  }
  var pc=document.getElementById('pc');
  pc.innerHTML='';
  var grid=document.createElement('div');
  grid.style.cssText='display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px;margin-bottom:20px';
  MODELOS_ADM.forEach(function(cat){
    var card=document.createElement('div');
    card.style.cssText='background:#fff;border-radius:14px;border:1px solid #e8edf2;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.04)';
    var head=document.createElement('div');
    head.style.cssText='background:'+cat.cor+';padding:16px 20px;display:flex;align-items:center;gap:10px';
    head.innerHTML='<span style="font-size:22px">'+cat.icone+'</span><div><div style="font-size:13px;font-weight:800;color:#fff">'+cat.cat+'</div><div style="font-size:11px;color:rgba(255,255,255,.6)">'+cat.docs.length+' modelos</div></div>';
    card.appendChild(head);
    var body=document.createElement('div');
    cat.docs.forEach(function(doc){
      var refs=JSON.parse(localStorage.getItem('modelos_refs')||'{}');
      var ref=refs[doc.nome];
      var slugId=doc.nome.replace(/[^a-z0-9]/gi,'_');
      var row=document.createElement('div');
      row.style.cssText='display:flex;align-items:center;justify-content:space-between;padding:10px 16px;border-bottom:1px solid #f8fafc';
      var info=document.createElement('div');
      info.style.cssText='flex:1;min-width:0';
      info.innerHTML='<div style="font-size:12px;font-weight:600;color:#0d1829">'+doc.nome+'</div>'+
        '<div style="font-size:10px;color:#94a3b8;margin-top:1px">'+doc.desc+'</div>'+
        (ref?'<div style="font-size:10px;color:#1a6e3a;margin-top:2px">✅ '+ref.nome+' · '+ref.data+'</div>':'');
      var btns=document.createElement('div');
      btns.style.cssText='display:flex;gap:5px;flex-shrink:0;margin-left:8px';
      var dlBtn=document.createElement('button');
      dlBtn.id='dl-btn-'+slugId;
      dlBtn.textContent=ref?'⬇ Baixar':'⬇ Modelo';
      dlBtn.style.cssText='background:'+(ref?'#0d1f4e':'#eff6ff')+';color:'+(ref?'#fff':'#0d1f4e')+';border:none;border-radius:6px;padding:4px 8px;font-size:10px;font-weight:700;cursor:pointer';
      dlBtn.onclick=function(e){e.stopPropagation(); ref?downloadModeloReal(doc.nome):baixarModelo(doc.nome);};
      var upBtn=document.createElement('button');
      upBtn.id='upload-btn-'+slugId;
      upBtn.textContent=ref?'🔄 Trocar':'📎 Upload';
      upBtn.style.cssText='background:'+(ref?'#f0fdf4':'#fafbfd')+';color:'+(ref?'#1a6e3a':'#64748b')+';border:1px solid '+(ref?'#bbf7d0':'#e2e8f0')+';border-radius:6px;padding:4px 8px;font-size:10px;font-weight:700;cursor:pointer';
      upBtn.onclick=function(e){e.stopPropagation();triggerUploadModelo(doc.nome);};
      btns.appendChild(dlBtn);
      btns.appendChild(upBtn);
      row.appendChild(info);
      row.appendChild(btns);
      body.appendChild(row);
    });
    card.appendChild(body);
    grid.appendChild(card);
  });
  pc.appendChild(grid);
  var info=document.createElement('div');
  info.style.cssText='background:#fafbfd;border-radius:12px;border:1px solid #e8edf2;padding:20px';
  info.innerHTML='<div style="font-size:12px;font-weight:700;color:#0d1829;margin-bottom:8px">📌 Como usar os modelos</div><div style="font-size:12px;color:#64748b;line-height:1.8">• Clique em <b>Baixar</b> para obter o modelo em Word pronto para preencher<br>• Os modelos seguem o padrão jurídico da RE/MAX Space<br>• Após assinar, salve o documento para registro<br>• Dúvidas: consulte Tatiana Basile — Especialista em Contratos</div>';
  pc.appendChild(info);
}

function abrirModelo(nome){
  var body = document.createElement('div');
  body.style.cssText = 'padding:10px 0';
  var desc = document.createElement('div');
  desc.style.cssText = 'font-size:12px;color:#64748b;margin-bottom:16px';
  desc.textContent = 'Escolha o que deseja fazer com este modelo:';
  body.appendChild(desc);
  var btnDl = document.createElement('button');
  btnDl.textContent = '⬇️ Baixar modelo em branco (.doc)';
  btnDl.style.cssText = 'background:#0d1f4e;color:#fff;border:none;border-radius:8px;padding:12px;font-size:13px;font-weight:700;cursor:pointer;text-align:left;width:100%;margin-bottom:8px';
  btnDl.onclick = function(){ baixarModelo(nome); };
  body.appendChild(btnDl);
  var btnClose = document.createElement('button');
  btnClose.textContent = '✕ Fechar';
  btnClose.style.cssText = 'background:#f1f5f9;color:#334155;border:none;border-radius:8px;padding:12px;font-size:13px;font-weight:700;cursor:pointer;text-align:left;width:100%';
  btnClose.onclick = function(){ cM(); };
  body.appendChild(btnClose);
  var mt = document.getElementById('mt');
  var mb = document.getElementById('mb');
  var mf = document.getElementById('mf');
  if(mt) mt.textContent = '📄 ' + nome;
  if(mb) { mb.innerHTML=''; mb.appendChild(body); }
  if(mf) mf.style.display='flex';
}

function baixarModelo(nome){
  var hoje = new Date().toLocaleDateString('pt-BR');
  var html = '<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8">'+
    '<title>'+nome+'</title>'+
    '<style>'+
      '@page{margin:3cm 2.5cm}'+
      'body{font-family:Arial,sans-serif;font-size:12pt;line-height:1.8;color:#000;max-width:800px;margin:40px auto;padding:40px}'+
      'h1{text-align:center;font-size:13pt;text-transform:uppercase;margin-bottom:4px;letter-spacing:1px}'+
      '.sub{text-align:center;font-size:10pt;color:#555;margin-bottom:30px;border-bottom:2px solid #000;padding-bottom:10px}'+
      'h2{font-size:11pt;font-weight:bold;margin:20px 0 6px;text-transform:uppercase;letter-spacing:.5px}'+
      'p{margin:0 0 10px;text-align:justify}'+
      '.campo{display:inline-block;border-bottom:1px solid #000;min-width:200px;padding:0 4px}'+
      '.ass{margin-top:60px;display:grid;grid-template-columns:1fr 1fr;gap:40px}'+
      '.al{border-top:1px solid #000;padding-top:8px;text-align:center;font-size:10pt}'+
      '.test{margin-top:40px;text-align:center;font-size:10pt}'+
      '.header-logo{text-align:center;margin-bottom:20px;font-size:16pt;font-weight:900;color:#003DA5;letter-spacing:2px}'+
      '@media print{.no-print{display:none}body{margin:0;padding:0}}'+
    '</style></head><body>'+
    '<div class="no-print" style="background:#0d1f4e;color:#fff;padding:12px 20px;margin:-40px -40px 30px;display:flex;align-items:center;justify-content:space-between">'+
      '<div style="font-size:13px;font-weight:700">📄 '+nome+'</div>'+
      '<button onclick="window.print()" style="background:#D42028;color:#fff;border:none;border-radius:6px;padding:8px 20px;font-size:12px;font-weight:700;cursor:pointer">🖨️ Imprimir / Salvar PDF</button>'+
    '</div>'+
    '<div class="header-logo">RE/MAX SPACE</div>'+
    '<div style="text-align:center;font-size:10pt;color:#555;margin-bottom:20px">Caldas Novas — Goiás</div>'+
    '<h1>'+nome+'</h1>'+
    '<div class="sub">Caldas Novas — GO, '+hoje+'</div>'+
    '<h2>Das Partes</h2>'+
    '<p><b>PARTE 1 — CONTRATANTE:</b></p>'+
    '<p>Nome: <span class="campo">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></p>'+
    '<p>CPF: <span class="campo">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> &nbsp;&nbsp; RG: <span class="campo">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></p>'+
    '<p>Endereço: <span class="campo" style="min-width:350px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></p>'+
    '<p><b>PARTE 2 — CONTRATADA:</b></p>'+
    '<p>RE/MAX Space Consultoria Imobiliária Ltda — Caldas Novas — GO</p>'+
    '<h2>Cláusula 1ª — Do Objeto</h2>'+
    '<p>_______________________________________________________________________________________</p>'+
    '<p>_______________________________________________________________________________________</p>'+
    '<h2>Cláusula 2ª — Do Prazo</h2>'+
    '<p>_______________________________________________________________________________________</p>'+
    '<h2>Cláusula 3ª — Do Valor e Forma de Pagamento</h2>'+
    '<p>_______________________________________________________________________________________</p>'+
    '<h2>Cláusula 4ª — Das Obrigações das Partes</h2>'+
    '<p>_______________________________________________________________________________________</p>'+
    '<p>_______________________________________________________________________________________</p>'+
    '<h2>Cláusula 5ª — Do Foro</h2>'+
    '<p>Fica eleito o foro da Comarca de Caldas Novas — GO para dirimir quaisquer controvérsias.</p>'+
    '<p>Por estarem justas e acordadas, as partes assinam o presente instrumento em 2 (duas) vias.</p>'+
    '<div class="ass">'+
      '<div class="al">Contratante<br><br>Nome: ___________________________<br>CPF: ____________________________</div>'+
      '<div class="al">RE/MAX Space<br>Tatiana Basile — CRECI GO<br>Especialista em Contratos</div>'+
    '</div>'+
    '<div class="test">Testemunhas:<br><br>'+
      '1. _________________________________ CPF: _____________________<br><br>'+
      '2. _________________________________ CPF: _____________________'+
    '</div>'+
    '</body></html>';

  var blob = new Blob([html], {type:'text/html;charset=utf-8'});
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href = url;
  a.download = nome.replace(/[^a-zA-Z0-9 ]/g,'_') + '.html';
  a.click();
  URL.revokeObjectURL(url);
  cM();
}

function gerarModeloRep(){
  var g=function(id){return (document.getElementById(id)||{}).value||'_______________';};
  var nome=g('mod-prop-nome'), cpf=g('mod-prop-cpf'), rg=g('mod-prop-rg');
  var tel=g('mod-prop-tel'), email=g('mod-prop-email'), end=g('mod-prop-end');
  var imTipo=g('mod-im-tipo'), imEnd=g('mod-im-end'), imArea=g('mod-im-area');
  var imValor=g('mod-im-valor'), prazo=g('mod-im-prazo')||'180', com=g('mod-im-com')||'6';
  var corNome=g('mod-cor-nome')||U.nome, corCreci=g('mod-cor-creci');
  var hoje=new Date().toLocaleDateString('pt-BR');

  var doc='<!DOCTYPE html><html><head><meta charset="UTF-8">'+
    '<style>body{font-family:Arial,sans-serif;font-size:11pt;line-height:1.8;margin:2.5cm;color:#000}'+
    'h1{text-align:center;font-size:13pt;text-transform:uppercase;margin-bottom:6px}'+
    '.sub{text-align:center;font-size:10pt;color:#444;margin-bottom:30px}'+
    'h2{font-size:11pt;font-weight:bold;margin-top:20px;margin-bottom:6px}'+
    'p{margin-bottom:10px;text-align:justify}'+
    '.ass{margin-top:60px;display:grid;grid-template-columns:1fr 1fr;gap:40px;text-align:center}'+
    '.al{border-top:1px solid #000;padding-top:8px;font-size:10pt}'+
    '@media print{body{margin:2cm}}</style></head><body>'+
    '<div style="text-align:center;margin-bottom:6px"><b>RE/MAX SPACE — CALDAS NOVAS</b></div>'+
    '<h1>Contrato de Representação Imobiliária<br>com Exclusividade</h1>'+
    '<div class="sub">Caldas Novas — GO, '+hoje+'</div>'+

    '<h2>DAS PARTES</h2>'+
    '<p><b>OUTORGANTE (PROPRIETÁRIO):</b> '+nome+', portador do CPF nº '+cpf+', RG nº '+rg+', '+
    'residente e domiciliado em '+end+', telefone '+tel+', e-mail '+email+'.</p>'+
    '<p><b>OUTORGADA (IMOBILIÁRIA):</b> RE/MAX Space Consultoria Imobiliária, com sede em Caldas Novas — GO, '+
    'representada pela Corretora Tatiana Basile, inscrita no CRECI/GO, e pelo Corretor '+corNome+
    (corCreci?', CRECI nº '+corCreci:'')+'.</p>'+

    '<h2>CLÁUSULA 1ª — DO OBJETO</h2>'+
    '<p>O presente instrumento tem por objeto a autorização exclusiva conferida pelo OUTORGANTE à OUTORGADA '+
    'para promover a intermediação imobiliária referente ao imóvel: <b>'+imTipo+'</b>, localizado em <b>'+imEnd+'</b>'+
    (imArea&&imArea!=='_______________'?', com área de '+imArea+' m²':'')+', doravante denominado simplesmente "IMÓVEL".</p>'+

    '<h2>CLÁUSULA 2ª — DA EXCLUSIVIDADE E DO PRAZO</h2>'+
    '<p>A presente autorização é concedida em caráter de EXCLUSIVIDADE, pelo prazo de <b>'+prazo+' ('+
    (prazo==='180'?'cento e oitenta':prazo==='90'?'noventa':prazo==='120'?'cento e vinte':prazo)+
    ') dias</b>, contados da data de assinatura deste instrumento, renovável por igual período, salvo manifestação contrária das partes.</p>'+
    '<p>Durante a vigência desta exclusividade, o OUTORGANTE se compromete a não celebrar qualquer outro instrumento de representação com terceiros para o mesmo imóvel, sob pena de responder pelas comissões devidas à OUTORGADA.</p>'+

    '<h2>CLÁUSULA 3ª — DO VALOR E DA COMISSÃO</h2>'+
    '<p>O imóvel é ofertado pelo valor de <b>R$ '+imValor+'</b>. A comissão devida à OUTORGADA é de <b>'+com+'% ('+
    (com==='6'?'seis':com==='5'?'cinco':com==='7'?'sete':com)+'por cento)</b> sobre o valor efetivo da transação, a ser paga no ato da assinatura do instrumento definitivo ou liberação do financiamento.</p>'+

    '<h2>CLÁUSULA 4ª — DAS OBRIGAÇÕES DA OUTORGADA</h2>'+
    '<p>A OUTORGADA se compromete a: (i) divulgar o imóvel em portais imobiliários, redes sociais e demais canais de marketing; (ii) realizar visitas com potenciais compradores; (iii) apresentar propostas ao OUTORGANTE; (iv) acompanhar toda a negociação até a conclusão da transação.</p>'+

    '<h2>CLÁUSULA 5ª — DAS OBRIGAÇÕES DO OUTORGANTE</h2>'+
    '<p>O OUTORGANTE se compromete a: (i) manter o imóvel disponível para visitas; (ii) fornecer toda a documentação necessária; (iii) não negociar diretamente com compradores apresentados pela OUTORGADA sem o seu conhecimento.</p>'+

    '<h2>CLÁUSULA 6ª — DO FORO</h2>'+
    '<p>Fica eleito o foro da Comarca de Caldas Novas — Estado de Goiás para dirimir quaisquer controvérsias oriundas deste instrumento, com renúncia expressa a qualquer outro, por mais privilegiado que seja.</p>'+

    '<p>Por estarem justas e acordadas, as partes assinam o presente instrumento em 2 (duas) vias de igual teor e forma.</p>'+

    '<div class="ass">'+
    '<div class="al">'+nome+'<br>CPF: '+cpf+'<br><span style="font-size:9pt;color:#666">Proprietário</span></div>'+
    '<div class="al">Tatiana Basile / '+corNome+'<br>RE/MAX Space — Caldas Novas<br><span style="font-size:9pt;color:#666">Corretora Responsável</span></div>'+
    '</div>'+
    '<p style="text-align:center;margin-top:40px;font-size:10pt">Testemunhas:<br>'+
    '1. _________________________________ CPF: _______________________<br>'+
    '2. _________________________________ CPF: _______________________</p>'+
    '</body></html>';

  var blob=new Blob([doc],{type:'application/msword'});
  var url=URL.createObjectURL(blob);
  var a=document.createElement('a');
  a.href=url;
  a.download='Contrato_Representacao_'+nome.split(' ')[0]+'_'+new Date().toISOString().slice(0,10)+'.doc';
  a.click();
  URL.revokeObjectURL(url);
  alert('Contrato gerado e baixado com sucesso!');
}


