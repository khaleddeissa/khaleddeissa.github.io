let diagramId = 0;
const icons: Record<string, string> = {
  up: '<path d="m7 14 5-5 5 5"/>',
  down: '<path d="m7 10 5 5 5-5"/>',
  left: '<path d="m14 7-5 5 5 5"/>',
  right: '<path d="m10 7 5 5-5 5"/>',
  reset: '<path d="M3 10a9 9 0 0 1 15-6l3 3M21 3v4h-4M21 14a9 9 0 0 1-15 6l-3-3M3 21v-4h4"/>',
  plus: '<circle cx="10" cy="10" r="7"/><path d="m15 15 6 6M7 10h6M10 7v6"/>',
  minus: '<circle cx="10" cy="10" r="7"/><path d="m15 15 6 6M7 10h6"/>',
  fit: '<path d="M3 8V3h5M16 3h5v5M21 16v5h-5M8 21H3v-5"/>',
  close: '<path d="m6 6 12 12M6 18 12-12"/>',
  copy: '<rect x="8" y="3" width="12" height="14" rx="2"/><path d="M16 17v4H4V7h4"/>',
};

async function setupMermaid() {
  const sources = [...document.querySelectorAll<HTMLPreElement>('pre.mermaid')]
    .filter((source) => !source.dataset.rendering);
  if (!sources.length) return;
  sources.forEach((source) => { source.dataset.rendering = 'true'; });
  try {
    const { default: mermaid } = await import('mermaid');
    mermaid.initialize({ startOnLoad: false, securityLevel: 'strict', theme: 'dark',
      fontFamily: 'Arial, sans-serif', flowchart: { htmlLabels: false, useMaxWidth: false } });
    for (const source of sources) {
      const code = source.textContent?.trim() ?? '';
      try {
        const { svg } = await mermaid.render(`blog-mermaid-${++diagramId}`, code);
        if (!source.isConnected) continue;
        const panel = document.createElement('section');
        panel.className = 'mermaid-panel';
        panel.setAttribute('aria-label', 'Interactive architecture diagram');
        const stage = document.createElement('div');
        stage.className = 'mermaid-stage';
        const viewport = document.createElement('div');
        viewport.className = 'mermaid-viewport';
        viewport.tabIndex = 0;
        viewport.setAttribute('role', 'region');
        viewport.setAttribute('aria-label', 'Architecture diagram. Drag to move, pinch to zoom, or use arrow keys and plus or minus.');
        viewport.innerHTML = svg;
        const drawing = viewport.querySelector('svg')!;
        const { width, height } = drawing.viewBox.baseVal;
        drawing.style.width = `${width}px`;
        drawing.style.height = `${height}px`;
        drawing.style.maxWidth = 'none';
        let zoom = 1, x = 0, y = 0;
        function paint() {
          const fit = Math.min((viewport.clientWidth - 32) / width, (viewport.clientHeight - 40) / height);
          drawing.style.transform = `translate(${viewport.clientWidth / 2 + x}px, ${viewport.clientHeight / 2 + y}px) scale(${fit * zoom}) translate(-50%, -50%)`;
        }
        const status = document.createElement('span');
        status.className = 'mermaid-status';
        status.setAttribute('aria-live', 'polite');
        function changeZoom(next: number) {
          const previous = zoom;
          zoom = Math.max(0.5, Math.min(12, next));
          x *= zoom / previous; y *= zoom / previous;
          paint();
          status.textContent = `Zoom ${Math.round(zoom * 100)} percent`;
        }
        function reset() { zoom = 1; x = 0; y = 0; paint(); status.textContent = 'Diagram fitted to view'; }
        function move(dx: number, dy: number) { x += dx; y += dy; paint(); }
        function button(parent: HTMLElement, name: string, icon: string, action: () => void, position: string) {
          const b = document.createElement('button');
          b.type = 'button'; b.title = name; b.setAttribute('aria-label', name);
          b.className = `mermaid-control mermaid-${position}`;
          b.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${icons[icon]}</svg>`;
          b.addEventListener('click', action); parent.append(b);
          return b;
        }
        const navigation = document.createElement('div');
        navigation.className = 'mermaid-navigation';
        navigation.setAttribute('role', 'group'); navigation.setAttribute('aria-label', 'Diagram navigation');
        button(navigation, 'Move up', 'up', () => move(0, -60), 'up');
        button(navigation, 'Move left', 'left', () => move(-60, 0), 'left');
        button(navigation, 'Reset view', 'reset', reset, 'reset');
        button(navigation, 'Move right', 'right', () => move(60, 0), 'right');
        button(navigation, 'Move down', 'down', () => move(0, 60), 'down');
        button(navigation, 'Zoom in', 'plus', () => changeZoom(zoom * 1.4), 'plus');
        button(navigation, 'Zoom out', 'minus', () => changeZoom(zoom / 1.4), 'minus');
        const tools = document.createElement('div'); tools.className = 'mermaid-tools';
        const dialog = document.createElement('dialog');
        dialog.className = 'mermaid-fullscreen';
        dialog.setAttribute('aria-label', 'Expanded architecture diagram');
        let previousOverflow = '';
        const expand = button(tools, 'Expand diagram', 'fit', () => {
          if (dialog.open) { dialog.close(); return; }
          previousOverflow = document.body.style.overflow;
          document.body.append(dialog);
          dialog.append(stage);
          dialog.showModal();
          document.body.style.overflow = 'hidden';
          expand.title = 'Close expanded diagram';
          expand.setAttribute('aria-label', 'Close expanded diagram');
          expand.setAttribute('aria-expanded', 'true');
          expand.querySelector('svg')!.innerHTML = icons.close;
          reset();
          expand.focus();
        }, 'expand');
        expand.setAttribute('aria-expanded', 'false');
        expand.setAttribute('aria-haspopup', 'dialog');
        dialog.addEventListener('close', () => {
          panel.prepend(stage);
          dialog.remove();
          document.body.style.overflow = previousOverflow;
          expand.title = 'Expand diagram';
          expand.setAttribute('aria-label', 'Expand diagram');
          expand.setAttribute('aria-expanded', 'false');
          expand.querySelector('svg')!.innerHTML = icons.fit;
          reset();
          expand.focus({ preventScroll: true });
        });
        button(tools, 'Copy Mermaid source', 'copy', async () => {
          try { await navigator.clipboard.writeText(code); status.textContent = 'Mermaid source copied'; }
          catch { status.textContent = 'Open View Mermaid source to copy the diagram'; }
        }, 'copy');
        const footer = document.createElement('div'); footer.className = 'mermaid-footer';
        const hint = document.createElement('span'); hint.textContent = 'Drag to move · Pinch or use + / − to zoom';
        const live = document.createElement('a');
        const state = JSON.stringify({ code, mermaid: { theme: 'dark' }, autoSync: true, updateDiagram: true });
        const encoded = btoa(Array.from(new TextEncoder().encode(state), (byte) => String.fromCharCode(byte)).join(''))
          .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
        live.href = `https://mermaid.live/edit#base64:${encoded}`;
        live.target = '_blank'; live.rel = 'noopener noreferrer'; live.textContent = 'Edit in Mermaid Live ↗';
        footer.append(hint, live);
        const details = document.createElement('details');
        const summary = document.createElement('summary'); summary.textContent = 'View Mermaid source';
        source.replaceWith(panel); source.classList.remove('mermaid');
        details.append(summary, source); stage.append(viewport, tools, navigation);
        panel.append(stage, footer, details, status); reset();
        const pointers = new Map<number, { x: number; y: number }>();
        viewport.addEventListener('pointerdown', (event) => {
          if (event.button !== 0) return;
          pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
          viewport.setPointerCapture(event.pointerId); viewport.focus({ preventScroll: true });
        });
        viewport.addEventListener('pointermove', (event) => {
          const previous = pointers.get(event.pointerId); if (!previous) return;
          const other = [...pointers.entries()].find(([id]) => id !== event.pointerId)?.[1];
          if (other) {
            const before = Math.hypot(previous.x - other.x, previous.y - other.y);
            const after = Math.hypot(event.clientX - other.x, event.clientY - other.y);
            if (before > 0) changeZoom(zoom * after / before);
          } else move(event.clientX - previous.x, event.clientY - previous.y);
          pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
        });
        for (const event of ['pointerup', 'pointercancel', 'lostpointercapture']) {
          viewport.addEventListener(event, (e) => pointers.delete((e as PointerEvent).pointerId));
        }
        viewport.addEventListener('keydown', (event) => {
          const actions: Record<string, () => void> = {
            ArrowUp: () => move(0, -60), ArrowDown: () => move(0, 60),
            ArrowLeft: () => move(-60, 0), ArrowRight: () => move(60, 0),
            '+': () => changeZoom(zoom * 1.4), '=': () => changeZoom(zoom * 1.4),
            '-': () => changeZoom(zoom / 1.4), '0': reset,
          };
          if (actions[event.key]) { event.preventDefault(); actions[event.key](); }
        });
        const observer = new ResizeObserver(paint); observer.observe(viewport);
        document.addEventListener('astro:before-swap', () => {
          observer.disconnect();
          if (dialog.open) {
            dialog.close();
            document.body.style.overflow = previousOverflow;
          }
          dialog.remove();
        }, { once: true });
      } catch (error) {
        console.error('Could not render Mermaid diagram', error); delete source.dataset.rendering;
      }
    }
  } catch (error) {
    sources.forEach((source) => { delete source.dataset.rendering; });
    console.error('Could not load Mermaid', error);
  }
}
document.addEventListener('astro:page-load', setupMermaid);
setupMermaid();
