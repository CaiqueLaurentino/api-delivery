// Função para detectar a categoria visível na tela
document.addEventListener('scroll', function () {
  const categories = document.querySelectorAll('.category-section')
  const categoryLinks = document.querySelectorAll('#category-list a')

  let activeCategory = null

  categories.forEach((category) => {
    const rect = category.getBoundingClientRect()
    if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
      activeCategory = category
    }
  })

  if (activeCategory) {
    const activeCategoryId = activeCategory.getAttribute('id')

    categoryLinks.forEach((link) => {
      if (link.getAttribute('href') === `#${activeCategoryId}`) {
        link.classList.add('active-category')
      } else {
        link.classList.remove('active-category')
      }
    })
  }
})

// Função para abrir o carrinho (você pode modificar para direcionar ou abrir modal)
function openCart() {
  alert('Carrinho aberto!')
  // Aqui você pode implementar a navegação para a página de checkout ou abrir um modal
}

// Atualizar o total de itens e o valor total (exemplo de valores estáticos para fins de demonstração)
function updateCartSummary(totalItems, totalAmount) {
  document.getElementById('total-items').textContent = totalItems
  document.getElementById('total-amount').textContent = totalAmount.toFixed(2)
}

// Exemplo de atualização do carrinho (substitua com dados reais)
updateCartSummary(3, 120.5) // Exemplo: 3 itens no carrinho, total de R$ 120,50
