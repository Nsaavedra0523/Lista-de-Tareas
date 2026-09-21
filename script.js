/* ---------- Estado ---------- */
const STORAGE_KEY = 'tareas.v1';
let tasks = [];
let filter = 'all';

/* ---------- Persistencia ---------- */
function load(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    tasks = raw ? JSON.parse(raw) : [];
    if(!Array.isArray(tasks)) tasks = [];
  }catch(e){
    tasks = [];
  }
  if(tasks.length === 0){
    tasks = [
      { id: uid(), text: 'Terminar el portafolio', done: false, created: Date.now() },
      { id: uid(), text: 'Subir los proyectos a GitHub', done: false, created: Date.now() },
      { id: uid(), text: 'Repasar Flexbox y Grid', done: true, created: Date.now() },
    ];
  }
}
function save(){
  try{ localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks)); }
  catch(e){ showError('No se pudo guardar. Revisa el almacenamiento del navegador.'); }
}
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

/* ---------- Elementos ---------- */
const $list = document.getElementById('list');
const $input = document.getElementById('input');
const $add = document.getElementById('add');
const $error = document.getElementById('error');
const $counter = document.getElementById('counter');
const $footerBar = document.getElementById('footerBar');

/* ---------- Acciones ---------- */
function addTask(){
  const text = $input.value.trim();
  if(!text){ showError('Escribe una tarea antes de agregarla.'); $input.focus(); return; }
  if(tasks.some(t => t.text.toLowerCase() === text.toLowerCase())){
    showError('Esa tarea ya está en la lista.'); return;
  }
  tasks.unshift({ id: uid(), text, done:false, created: Date.now() });
  $input.value = '';
  showError('');
  save(); render();
  $input.focus();
}
function toggle(id){
  const t = tasks.find(t => t.id === id);
  if(t){ t.done = !t.done; save(); render(); }
}
function remove(id){
  tasks = tasks.filter(t => t.id !== id);
  save(); render();
}
function rename(id, text){
  const t = tasks.find(t => t.id === id);
  if(!t) return;
  const clean = text.trim();
  if(clean) t.text = clean;
  save(); render();
}
function clearDone(){
  tasks = tasks.filter(t => !t.done);
  save(); render();
}
function showError(msg){ $error.textContent = msg; }

/* ---------- Render ---------- */
function visible(){
  if(filter === 'active') return tasks.filter(t => !t.done);
  if(filter === 'done') return tasks.filter(t => t.done);
  return tasks;
}
function formatDate(ts){
  const d = new Date(ts);
  return d.toLocaleDateString('es-ES', { day:'2-digit', month:'short' });
}
function render(){
  const items = visible();
  $list.innerHTML = '';

  if(items.length === 0){
    const msg = filter === 'done'
      ? ['Nada completado aún', 'Marca una tarea como lista y aparecerá aquí.']
      : filter === 'active'
      ? ['Todo al día', 'No te queda nada pendiente.']
      : ['Lista vacía', 'Agrega tu primera tarea arriba.'];
    const div = document.createElement('div');
    div.className = 'empty';
    div.innerHTML = `<strong>${msg[0]}</strong>${msg[1]}`;
    $list.appendChild(div);
  }

  items.forEach(task => {
    const li = document.createElement('li');
    li.className = 'task' + (task.done ? ' done' : '');
    li.dataset.id = task.id;

    const btn = document.createElement('button');
    btn.className = 'check';
    btn.setAttribute('aria-label', task.done ? 'Marcar como pendiente' : 'Marcar como completada');
    btn.innerHTML = '<svg viewBox="0 0 12 12" fill="none"><path d="M1 6l3.2 3.2L11 2.5" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    btn.addEventListener('click', () => toggle(task.id));

    const span = document.createElement('span');
    span.className = 'label';
    span.textContent = task.text;
    span.title = 'Doble clic para editar';
    span.addEventListener('dblclick', () => startEdit(li, task));

    const meta = document.createElement('span');
    meta.className = 'meta';
    meta.textContent = formatDate(task.created);

    const del = document.createElement('button');
    del.className = 'del';
    del.textContent = '×';
    del.setAttribute('aria-label', 'Eliminar tarea');
    del.addEventListener('click', () => remove(task.id));

    li.append(btn, span, meta, del);
    $list.appendChild(li);
  });

  const pending = tasks.filter(t => !t.done).length;
  $counter.textContent = `${pending} pendiente${pending === 1 ? '' : 's'} / ${tasks.length} total`;
  $footerBar.hidden = !tasks.some(t => t.done);
}

function startEdit(li, task){
  const input = document.createElement('input');
  input.className = 'label-edit';
  input.value = task.text;
  li.replaceChild(input, li.querySelector('.label'));
  input.focus();
  input.setSelectionRange(input.value.length, input.value.length);

  const commit = () => rename(task.id, input.value);
  input.addEventListener('blur', commit, { once:true });
  input.addEventListener('keydown', e => {
    if(e.key === 'Enter') input.blur();
    if(e.key === 'Escape'){ input.removeEventListener('blur', commit); render(); }
  });
}

/* ---------- Eventos ---------- */
$add.addEventListener('click', addTask);
$input.addEventListener('keydown', e => { if(e.key === 'Enter') addTask(); });
$input.addEventListener('input', () => { if($error.textContent) showError(''); });
document.getElementById('clearDone').addEventListener('click', clearDone);
document.querySelectorAll('.filters button').forEach(b => {
  b.addEventListener('click', () => {
    filter = b.dataset.filter;
    document.querySelectorAll('.filters button').forEach(x =>
      x.setAttribute('aria-pressed', String(x === b)));
    render();
  });
});

/* ---------- Inicio ---------- */
document.getElementById('today').textContent =
  new Date().toLocaleDateString('es-ES', { weekday:'long', day:'numeric', month:'long' });
load();
render();
