 // Trocar categorias
  const buttons = document.querySelectorAll('.category-button');
  const itemLists = document.querySelectorAll('.item-list');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Ativa botão
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Ativa lista
      const selectedId = btn.dataset.category;
      itemLists.forEach(list => {
        if (list.id === selectedId) {
          list.classList.add('active');
        } else {
          list.classList.remove('active');
        }
      });
    });
  });

  // Animação do botão "+"
  const addButtons = document.querySelectorAll('.add-button');
  addButtons.forEach(button => {
    button.addEventListener('click', () => {
      button.classList.add('clicked');
      setTimeout(() => {
        button.classList.remove('clicked');
      }, 200);
    });
  });
