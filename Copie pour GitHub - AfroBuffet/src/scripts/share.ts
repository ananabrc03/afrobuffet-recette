async function copyText(value: string): Promise<void> {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }
  const field = document.createElement('textarea');
  field.value = value;
  field.setAttribute('readonly', '');
  field.style.position = 'fixed';
  field.style.opacity = '0';
  document.body.append(field);
  field.select();
  document.execCommand('copy');
  field.remove();
}

document.querySelectorAll<HTMLButtonElement>('[data-share-button]').forEach((button) => {
  button.addEventListener('click', async () => {
    const url = button.dataset.shareUrl ?? window.location.href;
    const title = button.dataset.shareTitle ?? document.title;
    const text = button.dataset.shareText ?? '';
    const status = button.closest('.recipe-meta')?.querySelector<HTMLElement>('[data-share-status]');

    try {
      if (navigator.share) {
        await navigator.share({ title, text, url });
        if (status) status.textContent = 'Recette partagée';
      } else {
        await copyText(url);
        if (status) status.textContent = 'Lien copié';
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return;
      try {
        await copyText(url);
        if (status) status.textContent = 'Lien copié';
      } catch {
        if (status) status.textContent = 'Copie impossible';
      }
    }
  });
});

document.querySelectorAll<HTMLButtonElement>('[data-print-button]').forEach((button) => {
  button.addEventListener('click', () => window.print());
});
