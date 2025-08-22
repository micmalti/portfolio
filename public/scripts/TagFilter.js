document.addEventListener('DOMContentLoaded', function() {
  const filterButtons = document.querySelectorAll('#tagFilter');

  filterButtons.forEach(button => {
    button.addEventListener('click', function(event) {
      const selectedTag = event.currentTarget.getAttribute('data-type');
      const postCards = document.querySelectorAll('.post-card');

      postCards.forEach(card => {
        card.style.display = 'flex';
      });

      postCards.forEach(card => {
        const anchorTag = card.querySelector('a[data-tags]');
        const cardTags = anchorTag.getAttribute('data-tags');
        const tagsArray = JSON.parse(cardTags);
        if (!tagsArray.includes(selectedTag)) {
          card.style.display = 'none';
        }
      });
      updateActiveButton(event.currentTarget);
    });
  });

  function updateActiveButton(activeButton) {
    filterButtons.forEach(button => {
      button.classList.remove('active-tag');
    });
    activeButton.classList.add('active-tag');
  }
});
