function initializeRail(shell: HTMLElement): void {
  const rail = shell.querySelector<HTMLElement>('.recipe-rail');
  const cards = Array.from(shell.querySelectorAll<HTMLElement>('.recipe-card'));
  const current = shell.querySelector<HTMLElement>('[data-rail-current]');
  const previous = shell.querySelector<HTMLButtonElement>('[data-rail-previous]');
  const next = shell.querySelector<HTMLButtonElement>('[data-rail-next]');
  if (!rail || cards.length === 0 || !current) return;

  let index = 0;
  let frame = 0;

  const update = (): void => {
    const railLeft = rail.getBoundingClientRect().left;
    index = cards.reduce((closest, card, cardIndex) => {
      const distance = Math.abs(card.getBoundingClientRect().left - railLeft);
      const closestDistance = Math.abs(cards[closest]!.getBoundingClientRect().left - railLeft);
      return distance < closestDistance ? cardIndex : closest;
    }, 0);
    current.textContent = String(index + 1);
    if (previous) previous.disabled = index === 0;
    if (next) next.disabled = index === cards.length - 1;
  };

  const requestUpdate = (): void => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(update);
  };

  const goTo = (targetIndex: number): void => {
    const target = cards[Math.max(0, Math.min(cards.length - 1, targetIndex))];
    target?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'nearest',
      inline: 'start',
    });
  };

  rail.addEventListener('scroll', requestUpdate, { passive: true });
  previous?.addEventListener('click', () => goTo(index - 1));
  next?.addEventListener('click', () => goTo(index + 1));
  window.addEventListener('resize', requestUpdate, { passive: true });
  update();
}

document.querySelectorAll<HTMLElement>('[data-recipe-rail]').forEach(initializeRail);
