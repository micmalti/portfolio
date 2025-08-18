  document.querySelector(`#note-${Astro.props.post.slug}`)?.addEventListener('click', () => {
    const visited = JSON.parse(localStorage.getItem('visitedNotes') || []);
    if (!visited.includes('${slug}')) {
      localStorage.setItem(
        'visitedNotes', 
        JSON.stringify([...visited, '${slug}'])
      );
    }
  });